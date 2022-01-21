using Microsoft.VisualStudio.TestTools.UnitTesting;
using question_wiz_api.Security.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace question_wiz_api.Security.Repositories.Tests
{
    [TestClass()]
    public class SecurityHelperTests
    {
        [TestMethod()]
        public void ComputeHashTest()
        {
            // arrange
            var password = "Password"; var salt = "ThisIsATestAtTesting";
            // act
            var security = new SecurityHelper();
            var hash_pass = security.ComputeHash(Encoding.UTF8.GetBytes(password), Encoding.UTF8.GetBytes(salt));
            // assert
            Assert.AreNotEqual(password+salt, hash_pass);
        }

        [TestMethod()]
        public void GenerateSaltTest()
        {
            // arrange

            // act
            var security = new SecurityHelper();
            var newSalt = security.GenerateSalt();
            // assert
            Assert.IsFalse(newSalt == null);
          //  Assert.AreNotEqual("test", security.GenerateSalt());
        }
    }
}