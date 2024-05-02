import { Button,Buttons } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
class Scene{
    constructor(){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this._Buttons = new Buttons();
        gameUIManager.SetButtonScene(this._Buttons.listButton);
    }
    GetListButton(){
        return this._Buttons.listButton;
    }
    Start(){

    }
    Update(){

    }
    Draw(){

    }
}
export {Scene};