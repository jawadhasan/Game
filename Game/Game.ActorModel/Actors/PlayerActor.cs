using Akka.Actor;
using Game.ActorModel.Messages;
using System;

namespace Game.ActorModel.Actors
{
    public class PlayerActor : ReceiveActor
    {
        private readonly string _playerName;
        private int _health;
        private DateTime _joinDate;

        public PlayerActor(string playerName)
        {
            _playerName = playerName;
            _health = 100;
            _joinDate = DateTime.UtcNow;

            Receive<AttackPlayerMessage>(message =>
            {
                _health -= 20;

                //now whichever actor sent us this message, we tell him our new health
                Sender.Tell(new PlayerHealthChangedMessage(_playerName, _health));
            });

            Receive<RefreshPlayerStatusMessage>(message =>
            {
                //Tell the sender our status
                Sender.Tell(new PlayerStatusMessage(_playerName, _health, _joinDate));
            });
        }
    }
}
