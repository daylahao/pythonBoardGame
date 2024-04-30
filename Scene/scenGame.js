import { Button,ButtonIcon } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
import {Scene} from "./scenebase.js";
import Board from "../Asset/Board.js";
import Dice from "../Asset/Dice.js";
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText(content,x,y);
}
const ImageIcon={'BackDefault':'Image\\Icon\\IconBack.png','BackHover':'Image\\Icon\\IconBackHover.png',}
class SceneGame extends Scene{
    constructor(){
        super()
        this._Buttons.Add("Back",new ButtonIcon(ImageIcon['BackDefault'],ImageIcon['BackHover'],"","center",50,50,80,50,'white','black',()=>{gameManager.SetSceneCurrent(0)}));
        console.log(this._Buttons[0]);
        this.board_= new Board(81);
        this.diceDialog = new Dice(this.context,this.board_.rectBoardPosx,this.board_.rectBoardPosy,this.board_.rectBoardGame.width,this.board_.rectBoardGame.height,this.toggleDice);
        this.diceDialog.show=true;
        this._Buttons.Add('btnDice',this.diceDialog.btnRoll);
    }
    Start(){
        
    }
    Update(){
        
    }
    Draw(){
        this.board_.Draw();
        this._Buttons.Draw();
        this.diceDialog.Draw();
        // addText(this.canvas,'SceneGame',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2);
    }
}
export default SceneGame;