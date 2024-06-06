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
                gameManager.GetCanvas().width>gameManager.GetCanvas().height?gameManager.GetCanvas().width/8:gameManager.GetCanvas().width/3,
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
                gameManager.GetCanvas().width>gameManager.GetCanvas().height?gameManager.GetCanvas().width/8:gameManager.GetCanvas().width/3,
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
                gameManager.GetCanvas().width>gameManager.GetCanvas().height?gameManager.GetCanvas().width/8:gameManager.GetCanvas().width/3,
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
        this.userName = gameManager.getCookie('username');
        // this._Buttons.Add(
        //     'TagName',
        //     new Button(
        //         this.userName,
        //         'center',
        //         10,
        //         10,
        //         140,
        //         45,
        //         'white',
        //         'transparent',
        //         () => {
        //             // gameUIManager.ShowDialog(LoginForm);
        //         }
        //     )
        // );
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
        let canvas__ = gameManager.GetCanvas();
        // console.log("Draw ScenHome")
        this._Buttons.Draw();
        this.userName = gameManager.getCookie('username');
        // this.logo.width = this.canvas.width / 2;
        // this.logo.height = this.canvas.width / 2;
        // this.tagname.width = this.canvas.width / 4;
        // this.tagname.height = this.canvas.width / 4;
        // if (this.CANVAS_WIDTH > this.CANVAS_HEIGHT) {
            //     this.logo.width = this.CANVAS_HEIGHT / 2;
            //     this.logo.height = this.CANVAS_HEIGHT / 2;
            //     this.tagname.width = this.CANVAS_HEIGHT / 2;
            //     this.tagname.height = this.CANVAS_HEIGHT / 2;
            // }

        this.context.drawImage(
                this.logo,
                (canvas__.width>canvas__.height?canvas__.width/12:canvas__.width/4),
                canvas__.height / 2 - 180 - (canvas__.width>canvas__.height?canvas__.height/2/ 2:canvas__.width/2/ 2),
                (canvas__.width>canvas__.height?canvas__.height/2.5:canvas__.width/2),
                (canvas__.width>canvas__.height?canvas__.height/2.5:canvas__.width/2)
            );
        addText("Người Chơi: "+this.userName, 10,canvas__.height -(canvas__.height / 2)/12, '20px', 'white', 'left');
            // this.context.drawImage(
        //     this.tagname,
        //     0,
        //     this.CANVAS_HEIGHT / 3 - 215 - this.tagname.height / 6,
        //     this.tagname.width / 3,
        //     this.tagname.height / 6
        // );
    }
}
export default SceneHome;
