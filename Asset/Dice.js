import socket from "../Config/websocket.js";
import { Button,Buttons } from "./Button.js";
import gameManager from "./GameManager.js";
import soundManager from "./SoundManager.js";
const DiceSprite ={path:'./Image/Dice/DiceSprSheetX96.png',frame:6,w:96,h:96};
class Dice{
    constructor(context_,px,py,width_,height_,oncallbak){
        this.animationsprite = [];
        this.audio = new Audio('./Sound/roll_ball.wav');
        this.context = gameManager.GetCanvas().getContext('2d');
        this.paddingoffset=20;
        this.width = width_;
        this.height = height_;
        this.dicesize ={width:width_/5,
                        height:height_/5}
        this.position = {x:px+width_/2,y:py+this.dicesize.height};
        this.image = new Image();
        this.image.src = DiceSprite.path;
        this.diceimg1 = new Image();
        this.diceimg2 = new Image();
        this.diceimg1.src = './Image/Dice/2.png';
        this.diceimg2.src = './Image/Dice/1.png';
        this.show = false;
        this.btnRoll = new Button("Thả","center",this.position.x-this.dicesize.width/4,this.position.y+this.dicesize.height+this.paddingoffset,150,50,'white','black',gameManager.Roll_Dice);
        this.frame = 1;
        socket.on("on_user_start_roll", (data)=>{
            this.btnRoll.HideButton()
        });
        this.LoadAnimationSprite();
    }
    LoadAnimationSprite(){
        var frames={loc:[],};
        for(let j=0;j<DiceSprite.frame;j++){
            let positionx=j*DiceSprite.w;
            let positiony = 0*DiceSprite.h;
            frames.loc.push({x:positionx,y:positiony});
        }
        this.animationsprite = {...frames};
        // console.log(this.spriteAnimations['idle']);
    }
    AnimationRoll(){
            let dice_rand = Math.round(Math.random() * (6 - 1) + 1);
            this.diceimg1.src = './Image/Dice/'+dice_rand+'.png';
            dice_rand = Math.round(Math.random() * (6 - 1) + 1);
            this.diceimg2.src = './Image/Dice/'+dice_rand+'.png';
    }
    ResetDice(){
        this.audio.pause();
    }
    Draw(){
        this.framex = [0,0];
        if(gameManager.GetDiceNumber().length!=0){
            if(!this.audio.paused){
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            this.framex = gameManager.GetDiceNumber();
        }else{
            if(this.audio.paused && soundManager.GetStatusSFX())
            {  this.audio.play();}
                this.gameframe = 0;
            this.framex =  [Math.round(Math.random() * (6 - 1) + 1),Math.round(Math.random() * (6 - 1) + 1)];
        }
            if(this.show){
            this.context.drawImage(this.image,this.animationsprite.loc[this.framex[0]-1].x,0,DiceSprite.w,DiceSprite.h,this.position.x-this.dicesize.width,this.position.y,this.dicesize.width,this.dicesize.height);
            this.context.drawImage(this.image,this.animationsprite.loc[this.framex[1]-1].x,0,DiceSprite.w,DiceSprite.h,this.position.x,this.position.y,this.dicesize.width,this.dicesize.height);
        }
        this.gameframe++;
    }
}
export default Dice;