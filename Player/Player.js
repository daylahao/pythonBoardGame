import { listCard } from "../Asset/Card.js";
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import soundManager from "../Asset/SoundManager.js";
import Sprites from "./SpritesConfig.js";
class ListPlayer{
    members = 0;
    Maxmembers = 4;
    list_ = [];
    constructor(){
        this.list_ = [];
    }
    getMember(){
        return  this.members;
    }
    getPlayer(name_){
        return this.list_.find(({ name }) => name === name_);
    }
    addMember(player){
        this.list_.push(player);
        this.members++;
    }
    removeMember(){
        this.members--;
    }
    Draw(){
        for (let i = 0; i < this.list_.length; i++) {
            this.list_[i].Draw();
        }
    }
}
class Player{
    constructor(id,name='Player',px,py,color_='red'){
        this.id = id;
        this.state = 'idle';
        this.spriteWidth = 575; //Chia chiều ngang cho số hình
        this.spriteHeight = 523; // chia chiều dài cho số hình
        this.audio = new Audio('./Sound/move.mp3');
        this.image = new Image();
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this.name = name;
        this.scorce = 0;
        this.position = {x:px,y:py};
        this.sprite=Sprites[this.id];
        this.image.src = this.sprite.path;
        this.colorPlayer= color_;
        this.turn = false;
        this.stepcurrent = 0;
        this.spriteAnimations = [];
        this.gameframe = 0;
        this.frame = 4;
        this.runanimation =false;
        this.next = false;
        this.size={
            w:20,h:20
        }
        this.GetPositionLocalAnimation();
    }
    start(){
        
    }
    update(){

    }
    Run(step){
        this.turn = false;
        this.step = step + this.stepcurrent;
        this.runanimation = true;
        this.next = true;
    }
    GetPositionLocalAnimation(){
        var frames={loc:[],};
        for(let j=0;j<this.sprite.frame.idle;j++){
            let positionx=j*this.sprite.size.w;
            let positiony = 0*this.sprite.size.h;
            frames.loc.push({x:positionx,y:positiony});
        }
        this.spriteAnimations['idle'] = {...frames};
        console.log(this.spriteAnimations['idle']);
        frames={loc:[],};
        for(let j=0;j<this.sprite.frame.run;j++){
            let positionx=j*this.sprite.size.w;
            let positiony = 1*this.sprite.size.h;
            frames.loc.push({x:positionx,y:positiony});
        }
        this.spriteAnimations['run'] = {...frames};
        console.log(this.spriteAnimations['run']);
    }
    AnimationRun(){
        if(this.gameframe%this.frame==0){
            if((this.step-this.stepcurrent)>=0){
                if(this.next){
                    this.stepcurrent++;
                    if(this.stepcurrent>31){
                        this.stepcurrent=0;
                        this.step -=32;
                    }
                    this.next = false;
                }
                var Distance = Math.sqrt(Math.pow(listCard[this.stepcurrent].playerslot[this.id].x - this.position.x, 2) + Math.pow(listCard[this.stepcurrent].playerslot[this.id].y - this.position.y, 2));
                if(Distance<10){
                    this.position = {...listCard[this.stepcurrent].playerslot[this.id]};
                    this.next = true;
                    if(soundManager.GetStatusSFX()){
                        this.audio.play();}
                }else{
                    if(this.position.x<listCard[this.stepcurrent].playerslot[this.id].x){
                        this.position.x+=10;
                    }else if(this.position.x>listCard[this.stepcurrent].playerslot[this.id].x){
                            this.position.x-=10;
                    }   
                    if(this.position.y<listCard[this.stepcurrent].playerslot[this.id].y){
                        this.position.y+=10 ;
                    }else  if(this.position.y>listCard[this.stepcurrent].playerslot[this.id].y){
                        this.position.y-=10 ;
                    }
                    if(this.size.w<Distance)
                    {this.size.w+=10;
                    this.size.h+=10;}
                    else if(this.size.w>Distance/2)  {
                        this.size.w-=10;
                        this.size.h-=10;
                        if(this.size.w<20){
                            this.size.w=20;
                            this.size.h=20;
                        }
                    }

                }
                if((this.step-this.stepcurrent)==0 && this.next==true){
                    this.runanimation = false;
                    this.runanimation = false;
                    this.state = 'idle';
                    gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].ShowButton();
                }
            }
    }}
    Draw(){
        this.context.beginPath();
        if(this.runanimation){
            if(this.state!='run'){
                this.state = 'run';
            }
            this.AnimationRun();
        }
        var position_ = Math.floor(this.gameframe/this.frame)%this.spriteAnimations[this.state].loc.length;
        var framex = this.sprite.size.w*position_;
        var framey = this.spriteAnimations[this.state].loc[position_].y;
        // this.context.roundRect(this.position.x,this.position.y,this.size.w,this.size.h,100);
        this.context.drawImage(this.image,framex,framey,this.sprite.size.w,this.sprite.size.h,this.position.x,this.position.y,this.sprite.size.w*1.2,this.sprite.size.h*1.2);
        this.gameframe++;
        this.context.fillStyle = this.colorPlayer;
        this.context.fill();
    }
    DrawUI(){
        
    }
}
export {Player,ListPlayer}