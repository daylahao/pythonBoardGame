import {Scene} from "./scenebase.js";
import {Button} from "../Asset/Button.js"
import gameManager from "../Asset/GameManager.js";
class SceneHome extends Scene{
    constructor(){
        super();
        this.logo = new Image();
        this.logo.src = './Image/Icon/Logo.png';
        this._Buttons.Add('PlayGame',new Button("Bắt Đầu","center",this.CANVAS_WIDTH/2-75,this.CANVAS_HEIGHT/2+100,150,40,'white','black',()=>{gameManager.SetSceneCurrent(1)}));
        this._Buttons.Add('Setting',new Button("Cài Đặt","center",this.CANVAS_WIDTH/2-75,this.CANVAS_HEIGHT/2+60+100,150,40,'white','black',()=>{gameManager.SetSceneCurrent(2)}));        
        }
    Start(){

    }
    Update(){

    }
    Draw(){
        // console.log("Draw ScenHome")
        this._Buttons.Draw();
            this.logo.width=this.canvas.width/2
            this.logo.height=this.canvas.width/2
            if(this.CANVAS_WIDTH>this.CANVAS_HEIGHT){
                this.logo.width = this.CANVAS_HEIGHT/2;
                this.logo.height = this.CANVAS_HEIGHT/2;
            }
        this.context.drawImage(this.logo,this.CANVAS_WIDTH/2-this.logo.width/2,this.CANVAS_HEIGHT/2-this.logo.height/1.2,this.logo.width,this.logo.height);
    }
}
export default SceneHome;