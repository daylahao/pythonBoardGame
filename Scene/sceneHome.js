import {Scene} from "./scenebase.js";
import {Button} from "../Asset/Button.js"
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import InputIdRoom from '../Asset/Dialog/Input_IdRoom.js';
import ListRoomDialog from '../Asset/Dialog/ListRoom_Dialog.js';
import LoginForm from '../Asset/Dialog/LoginForm.js';
class SceneHome extends Scene{
    constructor(){
        super();
        this.logo = new Image();
        this.logo.src = './Image/Icon/Logo.png';
        this._Buttons.Add('CreateRoom',new Button("Tạo phòng","center",this.CANVAS_WIDTH/2-75,this.CANVAS_HEIGHT/2+100,150,40,'white','black',this.ClickStartGame));
        this._Buttons.Add('JoinRoom',new Button("Vào phòng","center",this.CANVAS_WIDTH/2-75,this.CANVAS_HEIGHT/2+100+60,150,40,'white','black',this.ClickShowListGame));
        this._Buttons.Add('Setting',new Button("Cài Đặt","center",this.CANVAS_WIDTH/2-75,this.CANVAS_HEIGHT/2+120+100,150,40,'white','black',()=>{gameManager.StartSceenSetting()}));
          
        this.loginForm = new LoginForm();  
        this.Start()
    }

    ClickStartGame(){
        gameUIManager.ShowDialog(InputIdRoom);
    }
    ClickShowListGame(){
        gameUIManager.ShowDialog(ListRoomDialog);
    }
    Start(){
        gameUIManager.ShowDialog(LoginForm);
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