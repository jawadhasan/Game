using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Akka.Actor;
using Game.ActorModel.Actors;

namespace Game.Web.Models
{
    public static class GameActorSystem
    {
      //this field will hold the instance of our actorSystem in memory
      private static ActorSystem ActorSystem;

      /// <summary>
      /// This method will initialize our actorSystem when
      /// ASP .NET application starts
      /// </summary>
      public static void Create()
      {
        ActorSystem = ActorSystem.Create("GameSystem");

        //Create an instance of GameControllerActor and store it
        ActorReferenes.GameController = ActorSystem.ActorOf<GameControllerActor>();
      }

      public static void Shutdown()
      {
        ActorSystem.Terminate();
      }



      /// <summary>
      /// Nested class: this will allow us an easy way to get access to our
      /// top-level actors in our actor system when we create them
      /// </summary>
      public static class ActorReferenes
      {
        public static IActorRef GameController { get; set; }
      }

    }
}
