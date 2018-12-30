namespace Game.ActorModel.Messages
{
    /// <summary>
    /// This message will be sent in response to a player being attacked
    /// and its health being reduced
    /// </summary>
    public class PlayerHealthChangedMessage
    {
        //Player name that Message belongs to
        public string PlayerName { get; private set; }

        //and its new health
        public int Health { get; private set; }

        public PlayerHealthChangedMessage(string playerName, int health)
        {
            PlayerName = playerName;
            Health = health;
        }
    }
}
