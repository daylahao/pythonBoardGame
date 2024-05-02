import { listCard } from "../Asset/Card.js";
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import soundManager from "../Asset/SoundManager.js";
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
    constructor(name='Player',px,py,color_='red'){
        this.audio = new Audio('./Sound/move.mp3');
        this.canvas = gameManager.GetCanvas();
        this.context = this.canvas.getContext("2d");
        this.CANVAS_WIDTH = this.canvas.width = this.canvas.offsetWidth;
        this.CANVAS_HEIGHT = this.canvas.height = this.canvas.offsetHeight;
        this.name = name;
        this.scorce = 0;
        this.position = {x:px,y:py};
        this.image = '';
        this.colorPlayer= color_;
        this.turn = false;
        this.stepcurrent = 0;
        this.gameframe = 0;
        this.frame = 3;
        this.runanimation =false;
        this.next = false;
        this.size={
            w:20,h:20
        }
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
    AnimationRun(){
        if(this.gameframe%this.frame==0){
            console.log(this.step-this.stepcurrent);
            if((this.step-this.stepcurrent)>=0){
                if(this.next){
                    this.stepcurrent++;
                    if(this.stepcurrent>31){
                        this.stepcurrent=0;
                        this.step -=32;
                    }
                    this.next = false;
                }
                var Distance = Math.sqrt(Math.pow(listCard[this.stepcurrent].position.x - this.position.x, 2) + Math.pow(listCard[this.stepcurrent].position.y - this.position.y, 2));
                if(Distance<10){
                    this.position = {...listCard[this.stepcurrent].position};
                    this.next = true;
                    if(soundManager.GetStatusSFX)
                        this.audio.play();
                }else{
                    if(this.position.x<listCard[this.stepcurrent].position.x){
                        this.position.x+=10;
                    }else if(this.position.x>listCard[this.stepcurrent].position.x){
                            this.position.x-=10;
                    }   
                    if(this.position.y<listCard[this.stepcurrent].position.y){
                        this.position.y+=10 ;
                    }else  if(this.position.y>listCard[this.stepcurrent].position.y){
                        this.position.y-=10 ;
                    }
                    if(this.size.w<Distance)
                    {this.size.w+=10;
                    this.size.h+=10;}
                    else if(this.size.w>Distance)  {
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
                        gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].ShowButton();
                }
            }
            this.gameframe=0;
    }}
    Draw(){
        this.context.beginPath();
        if(this.runanimation)
            this.AnimationRun();
        this.context.roundRect(this.position.x,this.position.y,this.size.w,this.size.h,100);
        this.gameframe++;
        this.context.fillStyle = this.colorPlayer;
        this.context.fill();
    }
}
export {Player,ListPlayer}