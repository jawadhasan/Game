import { Component, TemplateRef } from '@angular/core';
import { SignalrService } from './signalR.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sentMessages: string[] = [];
  recieveMessages: string[] = [];

  constructor(private signalRService: SignalrService) {

    this.signalRService.connection
      .on("receiveMessage", (username: string, message: string) => {
        console.log(message);
        this.recieveMessages.push(message);
    });
  }

  sendMessage(messageToSend:string) {
    //this.signalRService.send("testUser", "Test Message");
    console.log('messageToSend ', messageToSend);
    this.signalRService.connection.send("sendMessage", "testUser", messageToSend)
      .then(() => this.sentMessages.push(messageToSend));
  }
}
