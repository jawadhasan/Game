export class Game{

    // joining game state
    newPlayerName: string = '';
    isJoined: boolean = false;
  
    // current player
    thisPlayer: Player = new Player('', null, new Date());

    // other players in the game
    otherPlayers: Player[] = [];

    // dead players in the game
    deadPlayers: Player[] = [];
}

export class Player{
    name: string;
    joinDate: Date;
    isAlive: boolean;
    health?: number;

    constructor(name:string, health: number, joinDate: Date)
    {
        this.name = name;
        this.joinDate = joinDate;
        this.health = health;
        this.isAlive = true;
    }

    changeHealth(newHealth:number){
        this.health = newHealth;
        
        if(newHealth <= 0)
        this.isAlive = false;
    }
}