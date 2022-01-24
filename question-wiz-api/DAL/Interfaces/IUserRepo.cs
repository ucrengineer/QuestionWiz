using question_wiz_api.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Interfaces
{
    public interface IUserRepo
    {
        public User GetUser(User user);

        public void CreateUser(User user);

        public void UpdateUserPoints(User user);

        public IEnumerable<User> GetAllUsers();

    }
}
