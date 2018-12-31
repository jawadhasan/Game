using Game.ActorModel.Messages;
using Game.Web.Models;
using Microsoft.AspNetCore.SignalR;

namespace Game.Web.Hubs
{
  public class GameHub : Hub
  {
    public void JoinGame(string playerName)
    {
      GameActorSystem
        .ActorReferenes
        .SignalRBridge
        .Tell(new JoinGameMessage(playerName), null);
    }

    public void Attack(string playerName)
    {
      GameActorSystem
        .ActorReferenes
        .SignalRBridge
        .Tell(new AttackPlayerMessage(playerName), null);
    }
  }
}
