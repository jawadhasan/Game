﻿using Akka.Actor;
using Game.ActorModel.ExternalSystems;
using Game.ActorModel.Messages;

namespace Game.ActorModel.Actors
{
    public class SignalRBridgeActor : ReceiveActor
    {
        private readonly IGameEventsPusher _gameEventsPusher;
        private readonly IActorRef _gameController;

        public SignalRBridgeActor(IGameEventsPusher gameEventsPusher, IActorRef gameController)
        {
            _gameEventsPusher = gameEventsPusher;
            _gameController = gameController;

            //Incoming messages to ActorSystem
            Receive<JoinGameMessage>(message => { _gameController.Tell(message); });
            Receive<AttackPlayerMessage>(message => { _gameController.Tell(message); });

            //Outgoing messages from ActorSystem
            Receive<PlayerStatusMessage>(message =>
            {
                _gameEventsPusher.PlayerJoined(message.PlayerName, message.Health, message.JoinDate);
            });

            Receive<PlayerHealthChangedMessage>(message =>
            {
                _gameEventsPusher.UpdatePlayerHealth(message.PlayerName, message.Health);
            });
        }
    }
}
