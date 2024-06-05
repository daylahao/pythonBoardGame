import gameUIManager from "./GameUIManager.js";
import soundManager from "./SoundManager.js";
function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}
const canvas = document.getElementById('app');
class Buttons{
  constructor(){
    this.canvas=canvas;
    this.listButton = [];
  }
  Add(name,button){
    this.listitem =this.listButton.indexOf(name);
    this.listButton.push({'name':name,'button':button});
  }
  checkButtons(x, y) {
    for (let i = 0; i < this.listButton.length; i++) {
      const button = this.listButton[i]['button'];
      const ctx = canvas.getContext("2d");
      if(button.visible){
      ctx.beginPath();
      ctx.rect(button.rect.x, button.rect.y, button.rect.width, button.rect.height);
      if (ctx.isPointInPath(x, y)) {
        button.HoverHandle(true);
        return true;
      }else{
        button.HoverHandle(false);

      }}
    }
    return false;
  }
  checkClickButton(x, y){
    this.audioclick = new Audio("Sound\\button_Click.mp3");

    for (let i = 0; i < this.listButton.length; i++) {
      const button = this.listButton[i]['button'];
      if(button.visible){
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(button.rect.x, button.rect.y, button.rect.width, button.rect.height);
        if (ctx.isPointInPath(x, y)) {
          if(soundManager.GetStatusSFX()){
            this.audioclick.play();
            button.HoverHandle(false);
          }
          // console.log(this.listButton[i]);
          return  this.listButton[i];
        }
      }else{
        continue;
      }
    }
    return false;
  }
  Draw(){
    this.listButton.forEach(item => {
      // console.log(item['button'])
      item['button'].Draw();
      item['button'].ClickHandle();
    });
  }
}
class Button{
  ///contentString: nội dung của button
  constructor(contentString,alignStyle="center",PosX,PosY,_width=0,_heigh=0,colorBackground="white",colorText='black',onClickCallback,zIndex=null){
    this.hover = false;
    this.visible = true;
    this.onClickCallback=onClickCallback;  
    this.align = alignStyle;
    this.zIndex = zIndex;
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.content = contentString;
      this.colorfill= colorBackground;
      this.colortextroot= colorText;
      this.colorbg = colorBackground;
      this.colortext = colorText;
      this.colorbgHover=colorText;
      this.colortextHover=colorBackground;
      this.rect = {
        x: PosX,
        y: PosY,
        width: _width,
        height: _heigh,
      };
      this.rect_= {
        x: PosX,
        y: PosY,
        width: _width,
        height: _heigh,
      };
    };
    HideButton(){
      this.visible = false;
    }
    ShowButton(){
      this.visible = true;
    }
    ClickHandle(){
      this.hover = false;
      return this.onClickCallback;
    };
    HoverHandle(hoverflag){
      this.hover = hoverflag;
        if (this.hover){
          this.colorfill=this.colorbgHover;
          this.colortextroot=this.colortextHover;
        }else{
          this.colorfill=this.colorbg
          this.colortextroot=this.colortext;
        }
    }
    Draw() {
      if(this.visible){
        this.context.beginPath();
        this.context.roundRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height,10);
        this.context.fillStyle =this.colorfill;
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        this.context.stroke();
        this.context.closePath();
        this.context.font = '20pt Play';
        this.context.textBaseline = 'middle';
        this.context.fillStyle = this.colortextroot;
        if(this.align=="center"){
          this.context.textAlign = "center";
          this.context.fillText(this.content,this.rect.x+this.rect.width/2, this.rect.y+((this.rect.y + this.rect.height)-this.rect.y)/2);
        }
        if(this.align=='left'){
        this.context.textAlign = "left";
        this.context.fillText(this.content,this.rect.x+15, this.rect.y+((this.rect.y + this.rect.height)-this.rect.y)/2);
        }
        if(this.align=='right'){
          this.context.textAlign='right';
          this.context.fillText(this.content,this.rect.x+this.rect.width-15, this.rect.y+((this.rect.y + this.rect.height)-this.rect.y)/2);
        }
      }
    }
};
class ButtonIcon extends Button{
  constructor(_Img,_ImgHover,contentString="",alignStyle="center",PosX,PosY,_width=0,_heigh=0,colorBackground="white",colorText='black',onClickCallback,zIndex=null){
    if(contentString==null||contentString==""){
      contentString="";
    }
    super(contentString,alignStyle,PosX,PosY,_width,_heigh,colorBackground,colorText,onClickCallback);
    this.iconImage = [_Img,_ImgHover];
    this.icon = new Image();
    this.icon.src=this.iconImage[0];
    // console.log(this.icon.src);
  }
  HoverHandle(hoverflag){
    this.hover = hoverflag;
      if (this.hover) {
        this.colorfill=this.colorbgHover;
        this.colortextroot=this.colortextHover;
        this.icon.src = this.iconImage[1];
      }else{
        this.colorfill=this.colorbg
        this.colortextroot=this.colortext;
        this.icon.src = this.iconImage[0];
      }
  }
  Draw(){
    super.Draw();
    if(this.rect.width<this.rect.height){
    this.icon.width=this.rect.width/2;
    this.icon.height=this.rect.width/2;
    }
    else{
      this.icon.width=this.rect.height;
      this.icon.height=this.rect.height;
    }
    if(this.content.length>=1){
      if(this.align=='left')
      this.context.drawImage(this.icon,this.rect.x + this.rect.width-this.icon.width-10, this.rect.y,this.icon.width,this.icon.height);
      if(this.align=='right')
      this.context.drawImage(this.icon,this.rect.x + this.icon.width, this.rect.y,this.icon.width,this.icon.height);
    }else{
      this.context.drawImage(this.icon,this.rect.x+this.rect.width/2-this.icon.width/2, this.rect.y,this.icon.width,this.icon.height);
      // this.context.drawImage(this.icon,50,50,this.icon.width,this.icon.height);
    }

  }
}
function addText(content=String,x,y,fontsize="15px",color='white',align='center'){
  fontsize = (typeof fontsize !== 'undefined') ? fontsize : "15px";
  align = (typeof align !== 'undefined') ? align : 'center';

  const ctx = canvas.getContext("2d");
  ctx.font = fontsize+' Play';
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(content,x,y);
}
export {Button,Buttons,ButtonIcon,addText};