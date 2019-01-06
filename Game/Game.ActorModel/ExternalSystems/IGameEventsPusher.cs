using System;
namespace Game.ActorModel.ExternalSystems
{
    public interface IGameEventsPusher
    {
        void PlayerJoined(string playerName, int playerHealth, DateTime joinDate);
        void UpdatePlayerHealth(string playerName, int playerHealth);
    }
}
