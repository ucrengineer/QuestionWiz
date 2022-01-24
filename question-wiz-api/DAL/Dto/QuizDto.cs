using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Dto
{
    public class QuizDto
    {
        public int answerId { get; set; }
        public int ansQuesId { get; set; }
        public string answerDesc { get; set; }
        public int questionId { get; set; }
        public string category { get; set; }
        public string questionDesc { get; set; }
        public int questAnsId { get; set; }
    }
}
