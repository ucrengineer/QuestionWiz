using Dapper;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.DAL.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly SqlConnection _connection;
        public UserRepo(IDbConnection connection)
        {
            _connection =(SqlConnection)connection;
        }


        public User GetUser(User user)
        {
            string procName = Constants.GetUser;

            #region params
            var dyParam = new DynamicParameters();
            dyParam.Add("@email", user.Email);
            #endregion
            try
            {
                using (_connection)
                {
                    var result = SqlMapper.Query<User>(_connection, procName,param:dyParam, commandType: CommandType.StoredProcedure);
 
                    return result.FirstOrDefault();
                }
            }

            catch(Exception ex)
            {

                throw ex;
            }

        }

        public void CreateUser(User user)
        {
            string procName = Constants.CreateUser;

            #region params
            var dyParam = new DynamicParameters();
            dyParam.Add("@email", user.Email);
            dyParam.Add("@userName", user.UserName);
            dyParam.Add("@Hash_Password",user.Hashed_Password);
            dyParam.Add("@Salt",user.Salt);

            #endregion
            try
            {
                using (_connection)
                {
                    var result = SqlMapper.Query(_connection, procName, param: dyParam, commandType: CommandType.StoredProcedure);
                    if (result.Any())
                    {
                        var ErrorMessage = (IDictionary<string, object>)result.FirstOrDefault();
                        var Error = ErrorMessage["ErrorMessage"];
                        throw (new Exception(Error.ToString()));
                      //  return Error.ToString();
                    }

                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateUserPoints(User user)
        {
            string procName = Constants.UpdatePoints;

            #region params
            var dyParam = new DynamicParameters();
            dyParam.Add("@email", user.Email);
            dyParam.Add("@points", user.Points);


            #endregion
            try
            {
                using (_connection)
                {
                    var result = SqlMapper.Query(_connection, procName, param: dyParam, commandType: CommandType.StoredProcedure);
                    // cant get error message!!!
                    if (result.Any())
                    {
                        var ErrorMessage = (IDictionary<string, object>)result.FirstOrDefault();
                        var Error = ErrorMessage["ErrorMessage"];
                        throw (new Exception(Error.ToString()));
                       // return Error.ToString();
                    }

                    // return result;
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<User> GetAllUsers()
        {
            string procName = Constants.GetAllUsers;

            #region params
            var dyParam = new DynamicParameters();


            #endregion
            try
            {
                using (_connection)
                {
                    var result = SqlMapper.Query<User>(_connection, procName, param: dyParam, commandType: CommandType.StoredProcedure);


                    return result ;
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
    }


}
