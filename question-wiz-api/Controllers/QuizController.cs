using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.models;
using question_wiz_api.DAL.Repositories;
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
        private readonly IQuizRepo _quizRepo;

        public QuizController(IQuizRepo quizRepo)
        {
            _quizRepo = quizRepo;
        }

        [HttpGet("{category}")]
        public IActionResult Get(string category)
        {
            var quiz = _quizRepo.GetQuiz(category);
            return new JsonResult(quiz);
 

        }
          
    }
}
