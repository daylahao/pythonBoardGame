import gameManager from "./GameManager.js";
import {Card,listCard} from "./Card.js";
import gameUIManager from "./GameUIManager.js";
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "10px Play";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(content,x,y);
}
function FakeCard(count){
    const ListTask = [{name:"add()",link:''},
                      {name:'subtract()',link:''},
                      {name:'if()',link:''},
                      {name:'while()',link:''},
                      {name:'modulo()',link:''},
                      {name:'Giaithua()',link:''}]
    for(var i=0;i<count;i++){
        if(i==0){
            new Card(i,"Facebook",'Start');
        }
        else{
            var id = Math.round(Math.random() * (ListTask.length-1 - 0) + 0)
            new Card(i,"Facebook",ListTask[id].name);
        }
        // new Card(i,"Facebook",i);
    }
}
class Board{
    constructor(count){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.background = new Image();
        this.background.src = 'Image\\Icon\\card.png'
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this.LineCard=Math.ceil(count/4)+1;
        if(this.CANVAS_WIDTH>this.CANVAS_HEIGHT)
            this.rectBoardGame={
                paddingOffset:50,
                width:this.CANVAS_HEIGHT,
                height:this.CANVAS_HEIGHT
            };
        else{
            this.rectBoardGame={
                paddingOffset:50,
                width:this.CANVAS_WIDTH,
                height:this.CANVAS_WIDTH
            };
            }
        this.tileWidth = this.rectBoardGame.width / this.LineCard;
        this.tileHeight = (this.rectBoardGame.height-this.rectBoardGame.paddingOffset)/ this.LineCard;
        this.rectBoardPosx=(this.CANVAS_WIDTH/2-this.rectBoardGame.width/2);
        this.rectBoardPosy=(this.CANVAS_HEIGHT/2-this.rectBoardGame.height/2);
        FakeCard(count);
        var count_temp = 0;
        for(var i=0; i<this.LineCard;i++){
            if(i==0||i==this.LineCard-1)
            listCard[count_temp].positioncard = "none";
            else
            listCard[count_temp].positioncard = "top";
            listCard[count_temp].SetPosition(this.rectBoardPosx+i*this.tileWidth, this.rectBoardPosy+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight)
            count_temp++;
        }
        for(var i=1; i<this.LineCard;i++){
            if(i==this.LineCard-1)
            listCard[count_temp].positioncard = "none";
            else
            listCard[count_temp].positioncard = "right";
            listCard[count_temp].SetPosition(this.rectBoardPosx+(this.LineCard-1)*this.tileWidth,this.rectBoardPosy+this.rectBoardGame.paddingOffset/2+i*this.tileHeight, this.tileWidth, this.tileHeight)
            count_temp++;
        }
        for(var i=this.LineCard-2; i>=0;i--){
            if(i==0)
            listCard[count_temp].positioncard = "none";
            else
            listCard[count_temp].positioncard = "bottom";
            listCard[count_temp].SetPosition(this.rectBoardPosx+i*this.tileWidth,this.rectBoardPosy+this.rectBoardGame.paddingOffset/2+(this.LineCard-1)*this.tileHeight, this.tileWidth, this.tileHeight)
            count_temp++;
        }
        for(var i=this.LineCard-2; i>0;i--){
            listCard[count_temp].positioncard = "left";
            listCard[count_temp].SetPosition(this.rectBoardPosx,this.rectBoardPosy+this.rectBoardGame.paddingOffset/2+i*this.tileHeight, this.tileWidth, this.tileHeight)
            count_temp++;
        }
    }
    Resize(){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
    }
    Draw(){
        this.context.beginPath();
        this.context.save();
        this.context.roundRect(this.rectBoardPosx, this.rectBoardPosy+this.rectBoardGame.paddingOffset/2, this.rectBoardGame.width, this.rectBoardGame.height-this.rectBoardGame.paddingOffset,10);
        this.context.clip();  
        this.context.drawImage(this.background,this.rectBoardPosx, this.rectBoardPosy+this.rectBoardGame.paddingOffset/2, this.rectBoardGame.width, this.rectBoardGame.height-this.rectBoardGame.paddingOffset);
        this.context.fillStyle ='#00000080';
        this.context.fill();
        listCard.forEach(card => {
            card.Draw();
        });
        this.context.restore();
        this.context.save();
    }
}
export default Board