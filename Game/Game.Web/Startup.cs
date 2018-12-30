using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Web.Hubs;
using Game.Web.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Game.Web
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
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
      {
          builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowAnyOrigin()
              .AllowCredentials();
      }));
            services.AddMvc();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime applicationLifetime)
        {
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chatHub");
            });
            app.UseMvcWithDefaultRoute();


            applicationLifetime.ApplicationStarted.Register(OnStart);
            applicationLifetime.ApplicationStopping.Register(OnStopping);
            applicationLifetime.ApplicationStopped.Register(OnStopped);

        }

        private void OnStart()
        {
            GameActorSystem.Create();
        }
        private void OnStopping()
        {
            GameActorSystem.Shutdown();
        }
        private void OnStopped()
        {
            //stop
        }
    }
}
