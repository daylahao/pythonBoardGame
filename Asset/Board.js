import gameManager from "./GameManager.js";
const ImageIcon={'CardBack':'Image\\Icon\\card.png','CardFront':'Image\\Icon\\cardFront.png'}
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "20px Play";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(content,x,y);
}
class Board{
    constructor(count){
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this.columns = Math.ceil(Math.sqrt(count));
        this.rows = Math.ceil(count / this.columns);
        this.itembefore = new Image();
        this.itemFront = new Image();
        this.itemFront.src = ImageIcon['CardFront'];
        this.itembefore.src = ImageIcon['CardBack'];
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
    }
    Draw(){
        this.context.beginPath();
        this.context.roundRect(this.rectBoardPosx, this.rectBoardPosy+this.rectBoardGame.paddingOffset/2, this.rectBoardGame.width, this.rectBoardGame.height-this.rectBoardGame.paddingOffset,10);
        this.context.fillStyle ='#ffff';
        this.context.fill();
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
              // Tính toán vị trí x và y cho mỗi ô
              var x = i * this.tileWidth;
              var y = j * this.tileHeight;
              this.context.roundRect(this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight); 
              if(i==0&&j==0){
              this.context.drawImage(this.itemFront,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
              addText(this.canvas,'Start',(this.rectBoardPosx+x)+this.tileWidth/2,(this.rectBoardPosy+y)+this.tileHeight/2+this.rectBoardGame.paddingOffset/2)                
                }
                else if(i==this.columns-1&&j==this.rows-1){
                this.context.drawImage(this.itemFront,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
                addText(this.canvas,'End',(this.rectBoardPosx+x)+this.tileWidth/2,(this.rectBoardPosy+y)+this.tileHeight/2+this.rectBoardGame.paddingOffset/2)                  
                }
                else
                this.context.drawImage(this.itembefore,this.rectBoardPosx+x, this.rectBoardPosy+y+this.rectBoardGame.paddingOffset/2, this.tileWidth, this.tileHeight);
              this.context.strokeStyle = '#000000';
              this.context.stroke();
            }
            }
        }
}
export default Board