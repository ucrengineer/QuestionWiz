using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using question_wiz_api.Security.Repositories;
using question_wiz_api.Security.Interface;
using question_wiz_api.DAL.Interfaces;
using question_wiz_api.DAL.Repositories;
using System.Data;
using System.Data.SqlClient;

namespace question_wiz_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateActor = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "https://localhost:5001",
                    ValidAudience = "https://localhost:5001",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                };
              

            });

            // add repositories here
            services.AddTransient<ISecurityHelper, SecurityHelper>();
            services.AddTransient<IUserRepo, UserRepo>();
            services.AddTransient<IDbConnection>(
                db => new SqlConnection(Configuration.GetSection("DataConnections").GetSection("ConnectionString").Value)
             );


            // add dbconnection here

            // Need this for Development
            services.AddCors(opt =>
            {
                // this defines a CORS policy called "default"
                opt.AddPolicy("default",
                  builder => builder.SetIsOriginAllowedToAllowWildcardSubdomains()
                                .WithOrigins(Configuration.GetSection("CrossOriginConfig").Get<string[]>())
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                  );
            });


            // swagger
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo { Title = "Quiz Wiz API", Version = "v1" });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            if (env.IsDevelopment())
            {
                app.UseCors("default");
                app.UseDeveloperExceptionPage();
                app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Quiz Wiz API");
                });
            }
            else
            {
                app.UseSwaggerUI(config =>
                {
                    // when deploying to IIS need to have the './' and remove the first 'swagger'
                    config.SwaggerEndpoint("./v1/swagger.json", "Quiz Wiz API");
                });
            }

            app.UseCors("default");
            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
