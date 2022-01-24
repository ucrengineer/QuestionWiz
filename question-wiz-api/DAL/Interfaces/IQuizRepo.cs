using question_wiz_api.DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Interfaces
{
    public interface IQuizRepo
    {
        public Quiz GetQuiz(string category);
    }
}
