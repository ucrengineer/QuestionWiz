using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using question_wiz_api.DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public Quiz Get()
        {
            IEnumerable<string> questions = null;
            questions.Append("test");

            IEnumerable<string> answers = null;
            answers.Append("Me");




            return new Quiz
            {
                Answers = answers,

                Questions = questions

            };

        }
          
    }
}
