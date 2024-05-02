import { Scene } from "./scenebase.js";
import { Button,Buttons,ButtonIcon } from "../Asset/Button.js";
import gameUIManager from "../Asset/GameUIManager.js";
import gameManager from "../Asset/GameManager.js";
class SceneSetting extends Scene{
    constructor(){
        super();
        // console.log(gameUIManager.GetIconImage('speakerOn'));
        this._Buttons.Add("Speak",new ButtonIcon(gameUIManager.GetIconImage('speakerOn'),"","Âm nhạc","left",this.CANVAS_WIDTH/2-300/2,this.CANVAS_HEIGHT/2,300,50,"white","black",()=>{
            gameUIManager.GetButtonName('Speak').iconImage[0] = gameUIManager.GetIconImage('speakerOff');
        }));
        this._Buttons.Add("SpeakSFX",new ButtonIcon(gameUIManager.GetIconImage('speakerOn'),"","SFX","left",this.CANVAS_WIDTH/2-300/2,this.CANVAS_HEIGHT/2+50+20,300,50,"white","black",()=>{
            gameUIManager.GetButtonName('SpeakSFX').iconImage[0] = gameUIManager.GetIconImage('speakerOff');
        }));
        this._Buttons.Add("Back_Setting",new Button("Trở lại","center",this.CANVAS_WIDTH/2-100/2,this.CANVAS_HEIGHT/2+100+30,100,50,"white","black",()=>{
            gameManager.SetSceneCurrent(0);
        }));
    }
    Draw(){
        this._Buttons.Draw();
        this.context.textAlign = "center";
        this.context.textBaseline = 'middle';
        this.context.fillStyle = 'black';
        this.context.fillText('Cài Đặt',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2-50);
    }
}
export default SceneSetting;
