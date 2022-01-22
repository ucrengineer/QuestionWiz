using Moq;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.Models;
using question_wiz_api.DAL.Repositories;
using question_wiz_api_tests.Utilities;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using Xunit;
using Xunit.Sdk;

namespace question_wiz_api_tests
{

    public class UserRepoTests 
    {
         private readonly Mock<IUserRepo> _UserRepoMock = new Mock<IUserRepo>();
        private readonly IUserRepo _userRepo;
        private readonly IUserRepo _userRepoBadConn;

        #region Utils

        #endregion

        public UserRepoTests()
        {

            _userRepo = new UserRepo(Utilites.GetSqlConnection());
            _userRepoBadConn = new UserRepo(Utilites.GetBadSqlConnection());
        }
        
        [Fact]
        public void GetUser_ShouldReturnUser()
        {
   
            //Arrange
            var User = new User
            {
                Email = "test@gmail.com",
                Password = "testpassword"
            };
            //Act
           var UserDto = _userRepo.GetUser(User);
            //Assert
            Assert.Equal(UserDto.Email,User.Email);
        }
        [Fact]
        public void GetUser_ShouldReturnNull()
        {
            //Arrange
            var User = new User
            {

            };
            // Act 
            var userDto = _userRepo.GetUser(User);

            // Assert
            Assert.Null(userDto);
        }

        [Fact]
        public void CreateUser_ShouldReturnErrorString()
        {
            //Arrange
                // this user is already in the db, so an error message will be returned
            var User = new User
            {
                Email = "string",
                UserName = "string",
                Hashed_Password = "string",
                Salt = "String"
            };

            //Act 
            var result = _userRepo.CreateUser(User);

            //Assert
            Assert.IsType<string>(result);
        }

        [Fact]
        public void CreateUser_ShouldReturnNull()
        {



            //Arrange
            // create random string
            var bytes = new byte[128 / 8];
            var rng = new RNGCryptoServiceProvider();
            rng.GetBytes(bytes);

            var User = new User
            {
                Email = Convert.ToBase64String(bytes),
                UserName = Convert.ToBase64String(bytes),
                Hashed_Password = Convert.ToBase64String(bytes),
                Salt = Convert.ToBase64String(bytes)
            };

            //Act 
            var result = _userRepo.CreateUser(User);

            //Assert 
            Assert.Null(result);
                 
        

        }

  
    }
}
