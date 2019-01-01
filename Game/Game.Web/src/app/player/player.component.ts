import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() selfAlive:boolean;

  @Output() onAttack: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.selfAlive = true;
  }

  attackWasClicked(playerName: string): void {
    // this.onAttack.emit(playerName);
    console.log(playerName, ' attackWasClicked');
    this.onAttack.emit();
}

}
