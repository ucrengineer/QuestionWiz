using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace question_wiz_api_tests.Utilities
{
    public static class Utilites
    {
        ///<summary>
        ///Returns a database connection
        /// </summary>
        /// <returns>Oracle Data Connection</returns>
        /// 

        public static IDbConnection GetSqlConnection()
        {
            SqlConnection connection = new SqlConnection(GetConnectionString().ConnectionString);
            return connection;
        }
        public static IDbConnection GetBadSqlConnection()
        {
            SqlConnection connection = new SqlConnection(GetBadConnectionString().ConnectionString);
            return connection;
        }
        private static TestSettings GetConnectionString()
        {
               var jsonString = File.ReadAllText("testsettings.json");
            return JsonConvert.DeserializeObject<TestSettings>(jsonString);
        }

        private static TestSettings GetBadConnectionString()
        {
            var jsonString = File.ReadAllText("badtestsettings.json");
            return JsonConvert.DeserializeObject<TestSettings>(jsonString);
        }
    }
}
