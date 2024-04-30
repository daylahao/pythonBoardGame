import gameManager from "./GameManager.js";

class Card{
    constructor(context_,number,x,y,width,height,LinkApi){
        this.thumb = new Image();
        this.number = number;
        this.position = {x:x,y:y};
        this.size = {w:width,h:height};
        this.ApiQuestion = "";
        this.context = context_;
    }
    Draw(){
        this.context.roundRect(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight); 
    }
}