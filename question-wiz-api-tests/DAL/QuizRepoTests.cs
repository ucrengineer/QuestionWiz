using Moq;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.models;
using question_wiz_api.DAL.Repositories;
using question_wiz_api_tests.Utilities;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace question_wiz_api_tests.DAL
{
    public class QuizRepoTests
    {
        private readonly Mock<IUserRepo> _UserRepoMock = new Mock<IUserRepo>();
        private readonly IQuizRepo _quizRepo;
        private readonly IQuizRepo _quizRepoBadConn;

        #region Utils

        #endregion

        public QuizRepoTests()
        {

            _quizRepo = new QuizRepo(Utilites.GetSqlConnection());
            _quizRepoBadConn = new QuizRepo(Utilites.GetBadSqlConnection());
        }

        [Fact]
        public void GetQuiz_ShouldReturnQuiz()
        {
            //arrange
            string category = "object_oriented_programming";

            //act
            var quiz = _quizRepo.GetQuiz(category);

            //assert
            Assert.IsType<Quiz>(quiz);
        }
    }
}
