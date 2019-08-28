using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookListing.Website.Models
{
    public class VMUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }

        public User ToDbUser()
        {
            return new User
            {
                FirstName = this.FirstName,
                LastName = this.LastName,
                Username = this.Username,
                Role = this.Role,
            };
        }
    }
}
