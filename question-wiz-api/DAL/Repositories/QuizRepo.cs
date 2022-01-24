using Dapper;
using question_wiz_api.DAL.Dto;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.models;
using question_wiz_api.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Repositories
{
    public class QuizRepo : IQuizRepo
    {

       private readonly SqlConnection _connection;

       public QuizRepo(IDbConnection connection)
        {
            _connection = (SqlConnection)connection;
            
        }
       public Quiz GetQuiz(string category)
        {
            string procName = Constants.GetQuiz;

            #region params
            var dyParam = new DynamicParameters();
            dyParam.Add("@category", category);


            #endregion
            try
            {
                using (_connection)
                {
                    var result = SqlMapper.Query<QuizDto>(_connection, procName, param: dyParam, commandType: CommandType.StoredProcedure);

                    // create new quiz object
                    var Quiz = new Quiz();
                    Quiz.Answers = new List<Answer>();
                    Quiz.Questions = new List<Question>();
                    foreach(var row in result)
                    {

                        Quiz.Answers.Add(new Answer
                        {
                            id = row.answerId,
                            description = row.answerDesc,
                            questionId = row.ansQuesId
                        });
                        
                        if(!Quiz.Questions.Any(x => x.id == row.questionId) && row.category != null)
                        {
                            Quiz.Questions.Add(new Question
                            {
                                id = row.questionId,
                                description = row.questionDesc,
                                category = row.category,
                                answerId = row.questAnsId
                            });
                        }
                    }

                    return Quiz;

                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
