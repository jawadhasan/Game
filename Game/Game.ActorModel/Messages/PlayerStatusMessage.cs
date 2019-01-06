using System;
namespace Game.ActorModel.Messages
{
    /// <summary>
    /// This is the message that each player instance can send to
    /// allow clients to update their list of players
    /// </summary>
    public class PlayerStatusMessage
    {
        //Player name this status belongs to
        public string PlayerName { get; private set; }
        public int Health { get; private set; }
        public DateTime JoinDate {get; private set;}

        public PlayerStatusMessage(string playerName, int health, DateTime joinDate)
        {
            PlayerName = playerName;
            Health = health;
            JoinDate = joinDate;
        }
    }
}
