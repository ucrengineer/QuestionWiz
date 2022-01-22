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

        public string CreateUser(User user);

        public string UpdateUserPoints(User user);

    }
}
