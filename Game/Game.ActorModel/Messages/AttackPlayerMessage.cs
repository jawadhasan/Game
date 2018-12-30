namespace Game.ActorModel.Messages
{
    /// <summary>
    /// This is the message that one player can send to another player
    /// to represent the fact that player's being attacked.
    /// </summary>
    public class AttackPlayerMessage
    {
        //Player Name who is being attacked
        public string PlayerName { get; private set; }

        public AttackPlayerMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}
