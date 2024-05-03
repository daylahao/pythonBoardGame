import { Button,Buttons } from "./Button.js";
import gameManager from "./GameManager.js";
import soundManager from "./SoundManager.js";
class Dice{
    constructor(context_,px,py,width_,height_,oncallbak){
        this.audio = new Audio('./Sound/roll_ball.wav');
        this.context = context_;
        this.paddingoffset=20;
        this.width = width_;
        this.height = height_;
        this.dicesize ={width:width_/5,
                        height:height_/5}
        this.position = {x:px+width_/2,y:py+this.dicesize.height};
        this.diceimg1 = new Image();
        this.diceimg2 = new Image();
        this.diceimg1.src = './Image/Dice/2.png';
        this.diceimg2.src = './Image/Dice/1.png';
        this.show = false;
        this.btnRoll = new Button("Thả","center",this.position.x-this.dicesize.width/4,this.position.y+this.dicesize.height+this.paddingoffset,150,50,'white','black',gameManager.Roll_Dice);
        this.frame = 3;
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
        if(gameManager.GetDiceNumber().length!=0){
            if(!this.audio.paused){
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            this.diceimg1.src = './Image/Dice/'+gameManager.GetDiceNumber()[0]+'.png';
            this.diceimg2.src = './Image/Dice/'+gameManager.GetDiceNumber()[1]+'.png';
        }else{
            if(this.audio.paused && soundManager.GetStatusSFX())
            {  this.audio.play();}
            if(this.frame%2==0){
            this.frame=0;
            this.AnimationRoll();
        }
        }
            if(this.show){
            this.context.drawImage(this.diceimg1,this.position.x-this.dicesize.width+this.paddingoffset,this.position.y+this.paddingoffset,this.dicesize.width,this.dicesize.height);
            this.context.drawImage(this.diceimg2,this.position.x-this.dicesize.width+this.dicesize.width+this.paddingoffset,this.position.y+this.paddingoffset,this.dicesize.width,this.dicesize.height);
        }
        this.frame++;
    }
}
export default Dice;