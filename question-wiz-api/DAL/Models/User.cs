using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Models
{
    public class User
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hashed_Password { get; set; }
        public string Salt { get; set; }
        public string Country { get; set; }
        public int Points { get; set; }
    }
}
