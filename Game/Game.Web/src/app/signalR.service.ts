import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";

@Injectable()
export class SignalrService {

  connection: signalR.HubConnection;

  constructor() {

    console.log('signalrService constructor called.');

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:46593/gameHub")
      .build();

    this.connection.start()
    .then(() => console.log(this.connection))
    .catch(err => console.log(err));
  }


  send(userName: string, message:string) {
    this.connection.send("sendMessage", userName, message)
      .then(() => console.log('then block'));
  }




}
