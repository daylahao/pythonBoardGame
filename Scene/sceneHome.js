import { Scene } from './sceneBase.js';
import { Button, addText } from '../Asset/Button.js';
import gameManager from '../Asset/GameManager.js';
import gameUIManager from '../Asset/GameUIManager.js';
import InputIdRoom from '../Asset/Dialog/Input_IdRoom.js';
import ListRoomDialog from '../Asset/Dialog/ListRoom_Dialog.js';
import LoginForm from '../Asset/Dialog/LoginForm.js';
class SceneHome extends Scene {
    constructor() {
        super();

        this.logo = new Image();
        this.logo.src = './Image/Icon/Logo.png';
        this.tagname = new Image();
        this.tagname.src = './Image/Icon/imageTagname.png';
        this._Buttons.Add(
            'CreateRoom',
            new Button(
                'Tạo phòng',
                'center',
                240,
                this.CANVAS_HEIGHT / 2 + 10,
                150,
                40,
                'white',
                'black',
                this.ClickStartGame
            )
        );
        // this._Buttons.Add('JoinRoom',new Button("Vào phòng","left",240,this.CANVAS_HEIGHT/2+80,150,40,'white','black',this.ClickShowListGame));
        this._Buttons.Add(
            'Setting',
            new Button(
                'Cài Đặt',
                'center',
                240,
                this.CANVAS_HEIGHT / 2 + 80,
                150,
                40,
                'white',
                'black',
                () => {
                    gameUIManager.DestroyDialogListRoom();
                    gameManager.StartSceneSetting();
                }
            )
        );
        this._Buttons.Add(
            'About',
            new Button(
                'About',
                'center',
                240,
                this.CANVAS_HEIGHT / 2 + 150,
                150,
                40,
                'white',
                'black',
                () => {
                    gameUIManager.DestroyDialogListRoom();
                    gameManager.StartSceneAbout();
                }
            )
        );
        // this._Buttons.Add('Setting',new Button("Cài Đặt","left",240,this.CANVAS_HEIGHT/2+150,150,40,'white','black',()=>{gameManager.StartSceenSetting()}));

        this.loginForm = new LoginForm();

        // this.ClickShowListGame();
        this.Start();
    }

    ClickStartGame() {
        gameUIManager.ShowDialog(InputIdRoom);
    }
    ClickShowListGame() {
        gameUIManager.ShowDialog(ListRoomDialog);
    }
    Start() {
        this.ClickShowListGame();
        gameUIManager.ShowDialog(LoginForm);
    }
    Update() {}
    Draw() {
        this.userName = gameManager.getCookie('username');
        this._Buttons.Add(
            'TagName',
            new Button(
                this.userName,
                'center',
                0,
                this.CANVAS_HEIGHT / 6 - 130,
                140,
                45,
                'white',
                'black',
                () => {
                    gameUIManager.ShowDialog(LoginForm);
                }
            )
        );
        // console.log("Draw ScenHome")
        this._Buttons.Draw();
        this.logo.width = this.canvas.width / 2;
        this.logo.height = this.canvas.width / 2;
        this.tagname.width = this.canvas.width / 4;
        this.tagname.height = this.canvas.width / 4;
        if (this.CANVAS_WIDTH > this.CANVAS_HEIGHT) {
            this.logo.width = this.CANVAS_HEIGHT / 2;
            this.logo.height = this.CANVAS_HEIGHT / 2;
            this.tagname.width = this.CANVAS_HEIGHT / 2;
            this.tagname.height = this.CANVAS_HEIGHT / 2;
        }
        this.context.drawImage(
            this.logo,
            120,
            this.CANVAS_HEIGHT / 2 - 180 - this.logo.height / 2,
            this.logo.width,
            this.logo.height
        );
        this.context.drawImage(
            this.tagname,
            0,
            this.CANVAS_HEIGHT / 3 - 215 - this.tagname.height / 6,
            this.tagname.width / 3,
            this.tagname.height / 6
        );
    }
}
export default SceneHome;
