using System.Collections.Generic;
using Akka.Actor;
using Game.ActorModel.Messages;

namespace Game.ActorModel.Actors
{
    /// <summary>
    /// Responsbile for creating child PlayerActor(s)
    /// Also responsible for forwarding messages onto our specific actors
    /// </summary>
    public class GameControllerActor : ReceiveActor
    {
        private readonly Dictionary<string, IActorRef> _players;

        public GameControllerActor()
        {
           _players = new Dictionary<string, IActorRef>();

            Receive<JoinGameMessage>(message => JoinGame(message));

            Receive<AttackPlayerMessage>(message =>
            {
                //.Forward will preserve the original sender of this message
                //So Sender wont be GameController, but essentially be SignalRBridgeActor
                _players[message.PlayerName].Forward(message);
            });
        }

        private void JoinGame(JoinGameMessage message)
        {
            var playerNeedsCreating = !_players.ContainsKey(message.PlayerName);

            if (playerNeedsCreating)
            {
                //create child playerActor

                var newPlayerActor = Context.ActorOf(
                    Props.Create(()=> new PlayerActor(message.PlayerName)),
                    message.PlayerName
                );

                //Add it to dictionary
                _players.Add(message.PlayerName, newPlayerActor);

                //now, make sure client's SPA apps get updated with this new player character.
                foreach (var player in _players.Values)
                {
                    //tell them (child players) by sending them this message

                    //Sender parameter means the sender is not this GameController
                    //but who actually send the JoinGame Message (i.e. SignalRBridge actor)
                    player.Tell(new RefreshPlayerStatusMessage(), Sender);
                }
            }
        }
    }
}
