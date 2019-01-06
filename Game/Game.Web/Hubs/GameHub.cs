using System.Threading.Tasks;
using Game.ActorModel.Messages;
using Game.Web.Models;
using Microsoft.AspNetCore.SignalR;
using System;

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

    public async Task SendMessage(string user, string message)
    {     
      await Clients.All.SendAsync("receiveBroadcastedMessage", user, DateTime.UtcNow, message );
    }
  }
}
