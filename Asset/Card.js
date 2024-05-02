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
        this.open=true;
        this.level=0;
        this.positioncard =""
        this.position = {x:0,y:0};
        this.size = {w:0,h:0};
        listCard.push(this);
    }
    Open(toogle){
        this.open =toogle;
    }
    SetLevelPos(position){
        this.positioncard = position;
    }
    SetPosition(x,y,width,height){
        this.position = {x:x,y:y};
        this.size = {w:width,h:height};
    }
    SetText(Content){
        this.content = Content;
    }
    Draw(){
        this.context.beginPath();
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
        this.DrawLevelCard();
    }
    DrawLevelCard(){
        var {x,y} = this.position;
        var {w,h} = this.size;
        var padding = 10;
        this.context.beginPath();
        if(this.positioncard=='none'){}
            // next();
        else if(this.positioncard=='bottom')
            this.context.rect(x+padding/2,y+padding/2,w-padding,h/5);
        else if(this.positioncard=='top')
            this.context.rect(x+padding/2,w-padding/10,w-padding,h/5);
        else if(this.positioncard=='left')
            this.context.rect(x+(w-padding*2),y+padding/2,w/5,h-padding);
        else if(this.positioncard=='right')
            this.context.rect(x+padding/2,y+padding/2,w/5,h-padding);
        if(this.level==0)
            this.context.fillStyle ='#00D2008f';
        else if(this.level==1)
            this.context.fillStyle ='#f3c60066';
        else if(this.level>1)
            this.context.fillStyle ='#F100008f';
        this.context.fill();
    }
}
export {Card,listCard};