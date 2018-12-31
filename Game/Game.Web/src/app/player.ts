export class Game{

    // joining game state
    newPlayerName: string = '';
    isJoined: boolean = false;
  
    // current player
    thisPlayer: Player = new Player('', null);

    // other players in the game
    otherPlayers: Player[] = [];
}

export class Player{
    name: string;
    isAlive: boolean;
    health?: number;

    constructor(name:string, health: number)
    {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }

    changeHealth(newHealth:number){
        this.health = newHealth;
        
        if(newHealth <= 0)
        this.isAlive = false;
    }
}