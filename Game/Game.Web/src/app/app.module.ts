import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SignalrService} from './signalR.service';
import { PlayerComponent } from './player/player.component';
import { ReversePipe } from './reverse.pipe';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { SectionComponent } from './section/section.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ReversePipe,
    ChatMessagesComponent,
    SectionComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [SignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
