using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Authenticates the user with the given password
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        User Authenticate(string username, string password);

        /// <summary>
        /// Gets all users in the database
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetAll();

        /// <summary>
        /// Gets a give user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        User GetById(Guid id);

        /// <summary>
        /// Hashes the password string
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        byte[] HashPassword(string password);

        /// <summary>
        /// Adds a new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        User AddUser(User user);

        /// <summary>
        /// Updates the user information (ie the first name and last name of a user)
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        User UpdateUser(User user);

        /// <summary>
        /// Updates a user password
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        void UpdatePassword(Guid id, byte[] password);

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="id"></param>
        void DeleteUser(Guid id);
    }
}
