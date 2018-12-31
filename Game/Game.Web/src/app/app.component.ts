import { Component } from '@angular/core';
import { SignalrService } from './signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game System';
  playerJoined: boolean = false;

  sentMessages: string[] = [];

  constructor(private signalRService: SignalrService) {

    this.signalRService.connection
      .on("receiveMessage", (username: string, message: string) => {
        console.log(message);
      });

    this.signalRService.connection
      .on("playerJoined", (playerName: string, health: string) => {
        this.playerJoined = true;
        console.log('playerJoined ', playerName, health);
      });

      this.signalRService.connection
      .on("updatePlayerHealth", (playerName: string, health: string) => {
        console.log('updatePlayerHealth ', playerName, health);
      });
      


  }

  joinGame(playerName: string) {
    //this.signalRService.send("testUser", "Test Message");
    console.log('JoinGame ', playerName);
    this.signalRService.connection.send("joinGame", playerName)
      .then(() => this.sentMessages.push(playerName + ' :joinGame'));
  }
}
