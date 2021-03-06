using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Game.Web.Hubs
{
  public class ChatHub : Hub
  {
    public async Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    #region OtherMethods

    //public Task SendMessageToCaller(string message)
    //{
    //    return Clients.Caller.SendAsync("ReceiveMessage", message);
    //}
    //public Task SendMessageToGroups(string message)
    //{
    //    List<string> groups = new List<string>() { "SignalR Users" };
    //    return Clients.Groups(groups).SendAsync("ReceiveMessage", message);
    //}
    //public override async Task OnConnectedAsync()
    //{
    //    await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
    //    await base.OnConnectedAsync();
    //}
    //public override async Task OnDisconnectedAsync(Exception exception)
    //{
    //    await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
    //    await base.OnDisconnectedAsync(exception);
    //}

    #endregion

  }
}
