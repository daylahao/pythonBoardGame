import gameManager from "./GameManager.js";
import {Card,listCard} from "./Card.js";
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "20px Play";
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
        else if(i==count-1){
            new Card(i,"Facebook",'End');
        }
        else{
            var id = Math.round(Math.random() * (ListTask.length-1 - 0) + 0)
            new Card(i,"Facebook",ListTask[id].name);
        }
    }
}
class Board{
    constructor(count){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this.columns = Math.ceil(Math.sqrt(count));
        this.rows = Math.ceil(count / this.columns);
          // Tính kích thước của mỗi ô
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
        this.tileWidth = this.rectBoardGame.width / this.columns;
        this.tileHeight = (this.rectBoardGame.height-this.rectBoardGame.paddingOffset)/ this.rows;
        this.rectBoardPosx=(this.CANVAS_WIDTH/2-this.rectBoardGame.width/2);
        this.rectBoardPosy=(this.CANVAS_HEIGHT/2-this.rectBoardGame.height/2);
        FakeCard(count);
    }
    Draw(){
        this.context.beginPath();
        this.context.save();
        this.context.roundRect(this.rectBoardPosx, this.rectBoardPosy+this.rectBoardGame.paddingOffset/2, this.rectBoardGame.width, this.rectBoardGame.height-this.rectBoardGame.paddingOffset,10);
        this.context.clip();  
        this.context.fillStyle ='#fff';
        this.context.fill();
        var count = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
              // Tính toán vị trí x và y cho mỗi ô
              var x = j * this.tileWidth;
              var y = i * this.tileHeight;
            //   this.context.roundRect(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight,10); 
              if(i==0&&j==0){
                listCard[count].Draw(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight)
                listCard[count].Open(true);

                //   this.context.drawImage(this.itemFront,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
            //   addText(this.canvas,'Start',(this.rectBoardPosx+x)+this.tileWidth/2,(this.rectBoardPosy+y)+this.tileHeight/2+this.rectBoardGame.paddingOffset/2)                
                }
                else if(j==this.columns-1&&i==this.rows-1){
                    listCard[count].Draw(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
                    listCard[count].Open(true);
                    // this.context.drawImage(this.itemFront,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
                // addText(this.canvas,'End',(this.rectBoardPosx+x)+this.tileWidth/2,(this.rectBoardPosy+y)+this.tileHeight/2+this.rectBoardGame.paddingOffset/2)                  
                }
                else{
                listCard[count].Draw(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
                listCard[count].Open(true);    
            }
                // this.context.drawImage(this.itembefore,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
                this.context.strokeStyle = 'black';
                this.context.stroke();
                count++;
            }
            }
            this.context.restore();
            this.context.save();
        }
}
export default Board