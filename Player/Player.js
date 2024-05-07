import { listCard } from "../Asset/Card.js";
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import soundManager from "../Asset/SoundManager.js";
import Sprites from "./SpritesConfig.js";
import { addText } from "../Asset/Button.js";
import AnswerForm from "../Asset/Dialog/AnswerForm.js";
class ListPlayer{
    members = 0;
    Maxmembers = 4;
    list_ = [];
    constructor(){
        this.list_ = [];
    }
    getMember(){
        if(this.list_.length<0)
            return 0;
        else
        return  this.list_.length;
    }
    resetmembers(){
        this.list_ = [];
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
    DrawUI(){
        for (let i = 0; i < this.list_.length; i++) {
            this.list_[i].DrawUI();
        }
    }
}
class Player{
    constructor(id,name='Player',px,py,color_='red'){
        this.id = id;
        this.state = 'idle';
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
        this.frame = 3;
        this.runanimation =false;
        this.next = false;
        this.size={
            w:20,h:20
        }
        this.flip = this.sprite.flip;
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
        // console.log(this.spriteAnimations['idle']);
        frames={loc:[],};
        for(let j=0;j<this.sprite.frame.run;j++){
            let positionx=j*this.sprite.size.w;
            let positiony = 1*this.sprite.size.h;
            frames.loc.push({x:positionx,y:positiony});
        }
        this.spriteAnimations['run'] = {...frames};
        // console.log(this.spriteAnimations['run']);
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
                if(this.stepcurrent>16){
                    this.flip = !this.sprite.flip;
                }else{
                    this.flip = this.sprite.flip;
                }
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
                    this.flip = this.sprite.flip;
                    gameManager.SetTimeAnswer();
                    if(gameManager.GetTurn()==this.id){
                        gameUIManager.ShowDialog(AnswerForm);
                    }
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
        this.context.roundRect(this.position.x,this.position.y,this.size.w,this.size.h,100);
        if(this.flip){
            this.context.save();
            this.context.translate(this.position.x+this.sprite.size.w/2,this.position.y+this.position.y/2);
            this.context.scale(-1,1);
            this.context.drawImage(this.image,framex,framey,this.sprite.size.w,this.sprite.size.h,20,-this.position.y/2+this.sprite.size.h/8,-this.sprite.size.w*1.2,this.sprite.size.h*1.2);
            this.context.restore();
        }
        else
        this.context.drawImage(this.image,framex,framey,this.sprite.size.w,this.sprite.size.h,this.position.x,this.position.y-this.sprite.size.h/8,this.sprite.size.w*1.2,this.sprite.size.h*1.2);
        this.gameframe++;
        // this.context.fillStyle = this.colorPlayer;
        // this.context.fill();

    }
    UITime(timecurrent,timedefault){
        if(timecurrent>timedefault/2){
            this.context.fillStyle = 'green';
        }
        else if(timecurrent>timedefault/4){
            this.context.fillStyle = 'yellow';
        }else{
            this.context.fillStyle = 'red';
        }
        this.context.roundRect(this.positionUI.x,this.positionUI.y+2,((100/timedefault)*timecurrent)*(this.sizeUI.w/100),this.sizeUI.h,0);
    }
    DrawUI(){
        var tagnameimage = new Image();
        tagnameimage.src = 'Image/Icon/imageTagname.png'
        this.context.beginPath();
        this.sizeUI  = {w:this.CANVAS_WIDTH/7,h:50};
        var margin_bottom = 100,padding=10,margintag =80;
        this.positionUI = {x:30,y:100+margintag*(this.id+1)};
        this.context.save();
        this.context.roundRect(this.positionUI.x,this.positionUI.y+2,this.sizeUI.w-(this.sizeUI.w/100),this.sizeUI.h,10);
        this.context.fillStyle = '#808080';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.clip();
        this.context.beginPath();

        this.context.fillStyle = '#808080';
        if(gameManager.GetTurn()==this.id){
            if(gameManager.GetTimeAnswer().set!=gameManager.GetTimeAnswer().default)
                this.UITime(gameManager.GetTimeAnswer().set,gameManager.GetTimeAnswer().default);
            else if(gameManager.GetTimeWait().set!=gameManager.GetTimeWait().default)
                this.UITime(gameManager.GetTimeWait().set,gameManager.GetTimeWait().default);
            else
                this.UITime(100,100);
        }
        else
            this.context.roundRect(this.positionUI.x,this.positionUI.y+2,this.sizeUI.w-((this.sizeUI.w/100)),this.sizeUI.h,0);
        this.context.fill();
        this.context.restore();
        // this.context.drawImage(tagnameimage,this.positionUI.x-20,this.positionUI.y-10,this.sizeUI.w*1.2,this.sizeUI.h*1.5);
        var avatar  ={x:this.positionUI.x+padding*2,
                    y:this.positionUI.y+padding,
                    w:this.sizeUI.h-padding*2,
                    h:this.sizeUI.h-padding*2};
        this.context.save();
        this.context.closePath();
        this.context.beginPath();
        // this.context.roundRect(avatar.x,avatar.y,avatar.w,avatar.h,100);
        // this.context.lineWidth = 1;
        // this.context.strokeStyle = "black";
        // this.context.stroke();
        if(gameManager.GetTurn()==this.id)
            this.context.fillStyle = '#00FF00';
        else
            this.context.fillStyle = '#FFFFFF';
        this.context.fill();
        // addText(this.HandleNameUI(),avatar.x+avatar.w+padding,avatar.y+avatar.h*2/9,'15px','black','left');//Tên player
        // addText(this.HandleScoreUI(),avatar.x+avatar.w+padding,avatar.y+avatar.h*8/9,'15px','black','left');//Điểm
        addText(this.HandleNameUI(),avatar.x,avatar.y+avatar.h*2/10,'15px','black','left');//Tên player
        addText(this.HandleScoreUI(),avatar.x,avatar.y+avatar.h*9/10,'15px','black','left');//Điểm
        this.context.closePath();
    }
    HandleNameUI(){
        if(this.name.length>8){
            return this.name.substring(0, 8)+'...';
        }else{
            return this.name
        }
    }
    HandleScoreUI(){
        if(this.scorce.toString().length>8){
            return this.scorce.toString().substring(0, 8)+'...';
        }else{
            return this.scorce;
        }
    }
}
export {Player,ListPlayer}