import { Component } from '@angular/core';
import { SignalrService } from './signalR.service';
import { Player, Game } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Game System';
  game: Game = new Game();
  selfAlive: boolean;
  notifications: string[] = [];

  //Call to Hub
  joinGame(form:any) {
    //this.signalRService.send("testUser", "Test Message");
    this.signalRService.connection.send("joinGame", this.game.newPlayerName)
      .then(() => this.notifications.push(this.game.newPlayerName + ' newPlayer joined the game'));
  }
  
  attack(playerName: string) {
    this.signalRService.connection.invoke("attack", playerName);//player name who is being attacked
    this.notifications.push(playerName + ' was attacked')
  }
  //End CallToHub


  constructor(private signalRService: SignalrService) {

    this.signalRService.connection
      .on("playerJoined", (playerName: string, health: number, joinDate: Date) => {
        this.notifications.push(playerName + ' playerJoined');
        this.playerJoined(playerName, health, joinDate);
      });

    this.signalRService.connection
      .on("updatePlayerHealth", (playerName: string, health: number) => {
        this.notifications.push(playerName + ' updatePlayerHealth');
        this.updatePlayerHealth(playerName, health);
      });
  }

  //called from Hub
  private playerJoined(playerName: string, playerHealth: number, joinDate: Date) {

    let isMe = playerName === this.game.newPlayerName;

    if (isMe) {
      this.game.thisPlayer.name = playerName;
      this.game.thisPlayer.joinDate = joinDate;
      this.game.thisPlayer.changeHealth(playerHealth);
      this.game.isJoined = true;
    } else {
      let playerExistsInList = this.game.otherPlayers.find(p => p.name === playerName);
      if (!playerExistsInList) {
        this.game.otherPlayers.push(new Player(playerName, playerHealth, joinDate));
      }
    }
  }
  private updatePlayerHealth(playerName: string, health: number) {

    if (this.game.thisPlayer.name === playerName) {
      //update own health
      this.game.thisPlayer.changeHealth(health);
      this.selfAlive = this.game.thisPlayer.isAlive;
    }
    else {
      //Update other player health
      this.game.otherPlayers.forEach(function (otherPlayer) {
        if (otherPlayer.name === playerName) {
          otherPlayer.changeHealth(health);

          if(otherPlayer.health <= 0){
           //emit the event.
            // this.game.deadPlayers.push(otherPlayer);
            // this.otherPlayers.splice(otherPlayer);
          }
        }
      })

    }
  }
  //End Methods called from hub



}
