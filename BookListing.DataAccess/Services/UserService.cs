using BookListing.DataAccess.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace BookListing.DataAccess.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings AppSettings;
        private readonly BookContext Context;

        public UserService(BookContext context, IOptions<AppSettings> appSettings)
        {
            AppSettings = appSettings.Value;
            Context = context;
        }

        public User Authenticate(string username, string password)
        {
            var user = Context.Users.SingleOrDefault(x => x.Username == username);

            // return null if user not found
            if (user == null) return null;
            if (!HasValidPassword(password, user.Password)) return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public byte[] HashPassword(string password)
        {
            PasswordHash hash = new PasswordHash(password);
            return hash.ToArray();
        }

        /// <summary>
        /// </summary>
        /// <param name="password"></param>
        /// <param name="hashedPassword"></param>
        private bool HasValidPassword(string password, byte[] hashedPassword)
        {
            //Check password against a stored hash
            PasswordHash hash = new PasswordHash(hashedPassword);
            return hash.Verify(password);
        }

        public IEnumerable<User> GetAll()
        {
            return Context.Users.ToList();
        }

        public User GetById(Guid id)
        {
            return Context.Users.Find(id);
        }

        private bool DoesUsernameExists(User user)
        {
            return (Context.Users.Any(m => m.Username == user.Username && m.Id != user.Id));
        }

        public User AddUser(User user)
        {
            if (DoesUsernameExists(user))
            {
                throw new Exception("Username already exists");
            }
            Context.Users.Add(user);
            Context.SaveChanges();
            return user;
        }

        public User UpdateUser(User user)
        {
            var userToUpdate = GetById(user.Id);
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Role = user.Role;
            Context.Users.Update(userToUpdate);
            Context.SaveChanges();
            return user;
        }

        public void UpdatePassword(Guid id, byte[] password)
        {
            var userToUpdate = GetById(id);
            userToUpdate.Password = password;
            Context.Users.Update(userToUpdate);
            Context.SaveChanges();

        }

        public void DeleteUser(Guid id)
        {
            var user = Context.Users.SingleOrDefault(m => m.Id == id);
            if(user == null)
            {
                throw new KeyNotFoundException();
            }
            Context.Users.Remove(user);
            Context.SaveChanges();
        }
    }
}
