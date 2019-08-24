using BookListing.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        byte[] HashPassword(string password);
    }
}
