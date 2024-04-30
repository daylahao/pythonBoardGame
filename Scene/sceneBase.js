import { Button,Buttons } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
let listScene = Array();
class Scene{
    constructor(){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this._Buttons = new Buttons();
        listScene.push(this);
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
    Destroy(){
        delete listScene.this;
    }
}
export {Scene,listScene};