using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.models
{
    public class Quiz
    {
        // will create separate models for questions & answers..
        public IEnumerable<string> Questions { get; set; }
        public IEnumerable<string> Answers { get; set; }
    }
}
