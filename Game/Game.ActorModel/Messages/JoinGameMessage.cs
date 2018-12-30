namespace Game.ActorModel.Messages
{
    public class JoinGameMessage
    {
        //Player Name who wants to Join the Game
        public string PlayerName { get; private set; }

        public JoinGameMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}
