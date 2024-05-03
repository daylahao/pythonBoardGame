import { Button,ButtonIcon } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
import {Scene} from "./scenebase.js";
import Board from "../Asset/Board.js";
import Dice from "../Asset/Dice.js";
import gameUIManager from "../Asset/GameUIManager.js";
import { ListPlayer, Player } from "../Player/Player.js";
import { listCard } from "../Asset/Card.js";
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText(content,x,y);
}
class SceneGame extends Scene{
    constructor(){
        super()
        
        this._Buttons.Add("Back",new ButtonIcon(gameUIManager.GetIconImage('backDefault'),gameUIManager.GetIconImage('backHover'),"","center",50,50,80,50,'white','black',()=>{gameManager.ResetDice();gameManager.StartSceneHome()}));
        this.board_= new Board(8*4);
        this.diceDialog = new Dice(this.context,this.board_.rectBoardPosx-this.board_.tileWidth/2,this.board_.rectBoardPosy,this.board_.rectBoardGame.width,this.board_.rectBoardGame.height,this.toggleDice);
        this.diceDialog.show=true;
        this._Buttons.Add('btnDice',this.diceDialog.btnRoll);
        gameManager.CreateListPlayer();
        for(var i=0;i<4;i++){
            console.log(listCard[0].playerslot[i].x);
            gameManager.GetListPlayer().addMember(new Player(i,"Player"+i,listCard[0].playerslot[i].x,listCard[0].playerslot[i].y,"white"));
        }
    }
    Start(){
        
    }
    Update(){
        
    }
    Draw(){
        this.board_.Draw();
        gameManager.GetListPlayer().Draw();
        this._Buttons.Draw();
        this.diceDialog.Draw();
        // addText(this.canvas,'SceneGame',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2);
    }
}
export default SceneGame;