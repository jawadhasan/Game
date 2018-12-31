using Game.ActorModel.ExternalSystems;
using Game.Web.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Game.Web.Models
{
    public class SignalRGameEventsPusher : IGameEventsPusher
    {
      private readonly IHubContext<GameHub> _gameHubContext;

    public SignalRGameEventsPusher(IHubContext<GameHub> gameHubContext)
    {
      _gameHubContext = gameHubContext;
    }
    public void PlayerJoined(string playerName, int playerHealth)
      {
        _gameHubContext.Clients.All.SendAsync("playerJoined", playerName, playerHealth).Wait();
      }

      public void UpdatePlayerHealth(string playerName, int playerHealth)
      {
        _gameHubContext.Clients.All.SendAsync("updatePlayerHealth", playerName, playerHealth).Wait();
      }
  }
}
