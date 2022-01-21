using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Models
{
    public class Answer
    {
        public int id { get; set; }
        public int questionId { get; set; }
        public string description { get; set; }
    }
}
