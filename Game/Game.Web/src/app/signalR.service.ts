import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";

//const divMessages: HTMLDivElement = document.querySelector("#divMessages");
//const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
//const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
//const username = new Date().getTime()




//connection.on("messageReceived", (username: string, message: string) => {
//  let messageContainer = document.createElement("div");

//  messageContainer.innerHTML =
//    `<div class="message-author">${username}</div><div>${message}</div>`;

//  divMessages.appendChild(messageContainer);
//  divMessages.scrollTop = divMessages.scrollHeight;
//});

//tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
//  if (e.keyCode === 13) {
//    send();
//  }
//});

//btnSend.addEventListener("click", send);

//function send() {
//  connection.send("newMessage", username, tbMessage.value)
//    .then(() => tbMessage.value = "");
//}


//declare let toastr:any;
@Injectable()
export class SignalrService {
  connection: any;

  constructor() {

    console.log('signalrService constructor called.');

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:46593/chatHub")
      .build();

    this.connection.start().catch(err => console.log(err));

    console.log('aftr connection start call');


  }


  send(userName: string, message:string) {
    this.connection.send("sendMessage", userName, message)
      .then(() => console.log('then block'));
  }



//connection.on("messageReceived", (username: string, message: string) => {
//  let messageContainer = document.createElement("div");

//  messageContainer.innerHTML =
//    `<div class="message-author">${username}</div><div>${message}</div>`;

//  divMessages.appendChild(messageContainer);
//  divMessages.scrollTop = divMessages.scrollHeight;
//});

  //  success(message: string, title? :string){
  //      toastr.succss(message, title);
  //  }

  //  info(message: string, title? :string){
  //      toastr.info(message, title);
  //  }

  //  warning(message: string, title? :string){
  //      toastr.warning(message, title);
  //  }

  //  error(message: string, title? :string){
  //      toastr.error(message, title);
  //}
}
