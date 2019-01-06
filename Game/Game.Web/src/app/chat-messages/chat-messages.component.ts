import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../player';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {  
  @Input() chatMessages: ChatMessage[] = [];
  constructor() { }
  ngOnInit() {
  }

}
