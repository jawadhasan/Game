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

  //Call to Hub
  joinGame(form:any) {
    //this.signalRService.send("testUser", "Test Message");
    this.signalRService.connection.send("joinGame", this.game.newPlayerName)
      .then(() => console.log('joinGame is done'));
  }
  
  attack(playerName: string) {
    this.signalRService.connection.invoke("attack", playerName);//player name who is being attacked
  }
  //End CallToHub


  constructor(private signalRService: SignalrService) {

    this.signalRService.connection
      .on("playerJoined", (playerName: string, health: number) => {
        this.playerJoined(playerName, health);
      });

    this.signalRService.connection
      .on("updatePlayerHealth", (playerName: string, health: number) => {
        this.updatePlayerHealth(playerName, health);
      });
  }

  //called from Hub
  private playerJoined(playerName: string, playerHealth: number) {

    let isMe = playerName === this.game.newPlayerName;

    if (isMe) {
      this.game.thisPlayer.name = playerName;
      this.game.thisPlayer.changeHealth(playerHealth);
      this.game.isJoined = true;
    } else {
      let playerExistsInList = this.game.otherPlayers.find(p => p.name === playerName);
      if (!playerExistsInList) {
        this.game.otherPlayers.push(new Player(playerName, playerHealth));
      }
    }
  }
  private updatePlayerHealth(playerName: string, health: number) {

    if (this.game.thisPlayer.name === playerName) {
      //update own health
      this.game.thisPlayer.changeHealth(health);
    }
    else {
      //Update other player health
      this.game.otherPlayers.forEach(function (otherPlayer) {
        if (otherPlayer.name === playerName) {
          otherPlayer.changeHealth(health);
        }
      })

    }
  }
  //End Methods called from hub



}
