using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.Models;
using question_wiz_api.Security.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace question_wiz_api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ISecurityHelper _security;
        private readonly IUserRepo _userRepo;

        public AuthController(ISecurityHelper securityHelper, IUserRepo userRepo)
        {
            _security = securityHelper;
            _userRepo = userRepo;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            // get user information repo
            var userDb = _userRepo.GetUser(user);
            user.Hash_Password =_security.ComputeHash(Encoding.UTF8.GetBytes(user.Password), Encoding.UTF8.GetBytes(userDb.Salt));

            if (userDb == null)
            {
                return Unauthorized("User does not exist");
            }
            // take password + salt => hash vs db_hash
            if (user.Email == userDb.Email && user.Hash_Password == userDb.Hash_Password)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("supereSecurityKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                    );


                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString });
            }

            return Unauthorized("User does not Exist");
        }

  


    }
}