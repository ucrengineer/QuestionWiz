using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.Models;
using question_wiz_api.Security.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace question_wiz_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ISecurityHelper _security;
        private readonly IUserRepo _userRepo;

        public UserController(ISecurityHelper securityHelper, IUserRepo userRepo)
        {
            _security = securityHelper;
            _userRepo = userRepo;
        }


        [HttpPost, Route("create")]
        public IActionResult Create([FromBody] User user)
        {
            #region security class

            // take in user password 
            // add "salt" (random generator)
            user.Salt =  _security.GenerateSalt();
            user.Hashed_Password = _security.ComputeHash(Encoding.UTF8.GetBytes(user.Password), Encoding.UTF8.GetBytes(user.Salt));
            // call hash function 
            // save "salt" and hash to db
            #endregion

            #region user class repo
            // submit user info to database
            var result  = _userRepo.CreateUser(user);
            #endregion
            if(result != null)
            {
                return BadRequest(result);

            }
            return Ok();
            // return Ok();
        }

        [HttpPost, Route("updatePoints")]
        public IActionResult UpdatePoints([FromBody] User user)
        {
            _userRepo.UpdateUserPoints(user);
            return Ok();
        }

        [HttpPost, Route("delete")]
        public IActionResult Delete([FromBody] User user)
        {
            return Ok();
        }
    }
}
