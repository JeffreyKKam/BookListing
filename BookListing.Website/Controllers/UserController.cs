using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListing.DataAccess.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookListing.DataAccess.Models;
using BookListing.Website.Models;

namespace BookListing.Website.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserService UserService;

        public UsersController(IUserService userService)
        {
            UserService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]VMUser userParam)
        {
            var user = UserService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = UserService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var user = UserService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            // only allow admins to access other user records
            var currentUserId = Guid.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            return Ok(user);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public IActionResult AddUser(VMUser user)
        {
            try
            {
                var dbUser = user.ToDbUser();
                dbUser.Password = UserService.HashPassword(user.Password);
                UserService.AddUser(dbUser);
                return Ok(dbUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut]
        public IActionResult UpdateUser(VMUser user)
        {
            try
            {
                if (UserService.GetById(user.Id) == null)
                {
                    return NotFound();
                }
                var dbUser = user.ToDbUser();
                UserService.UpdateUser(dbUser);
                return Ok(dbUser);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("password")]
        public IActionResult UpdatePassword(Guid id, string password)
        {
            try
            {
                if (UserService.GetById(id) == null)
                {
                    return NotFound();
                }
                var hashed = UserService.HashPassword(password);
                UserService.UpdatePassword(id, hashed);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                if (UserService.GetById(id) == null)
                {
                    return NotFound();
                }
                UserService.DeleteUser(id);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}