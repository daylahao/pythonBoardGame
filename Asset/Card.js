import gameManager from "./GameManager.js";
import { addText } from "./Button.js";
let listCard = Array();
const ImageLink = ['Image/Icon/cardFront.png','Image/Icon/card.png']
class Card{
    constructor(number,LinkApi,contenttext){
        this.thumb = new Image();
        this.number = number;
        this.ApiQuestion = "";
        this.context = gameManager.GetCanvas().getContext("2d");
        this.content = contenttext;
        this.link = LinkApi;
        this.open=false;
        listCard.push(this);
    }
    Open(toogle){
        this.open =toogle;
    }
    SetText(Content){
        this.content = Content;
    }
    Draw(x,y,width,height){
        this.position = {x:x,y:y};
        this.size = {w:width,h:height};
        this.context.roundRect(this.position.x,this.position.y,this.size.w,this.size.h); 
        // this.context.clip();
        if(!this.open){
            this.thumb.src = ImageLink[1];
            this.context.drawImage(this.thumb,this.position.x,this.position.y,this.size.w,this.size.h);
        }
        else{
            this.thumb.src = ImageLink[0];
            this.context.drawImage(this.thumb,this.position.x,this.position.y,this.size.w,this.size.h);
            addText(this.content,this.position.x+this.size.w/2,this.position.y+this.size.h/2);
        }
    }
}
export {Card,listCard};