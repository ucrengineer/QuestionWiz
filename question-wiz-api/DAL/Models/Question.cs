using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Models
{
    public class Question
    {
        public int id { get; set; }
        public int answerId { get; set; }

        public string category { get; set; }
        public string description { get; set; }
    }
}
