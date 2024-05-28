import { Buttons } from "./Button.js";
import {Card,listCard} from "./Card.js";
import gameManager from "./GameManager.js";
import soundManager from "./SoundManager.js";
import AnswerForm from "./Dialog/AnswerForm.js";
import socket from "../Config/websocket.js";
import roomManager from "./RoomManager.js";
let instance;
class GameUIManager{
    static instance = null;
    static ImageIcon={'speakerOn':'Image\\Icon\\speaker_on.png','speakerOnHover':'Image\\Icon\\speaker_on_hover.png','speakerOff':'Image\\Icon\\speaker_off.png','speakerOffHover':'Image\\Icon\\speaker_off_hover.png','backDefault':'Image\\Icon\\IconBack.png','backHover':'Image\\Icon\\IconBackHover.png',}
    static getInstance() {
      if (!GameUIManager.instance) {
        GameUIManager.instance = new Singleton();
      }
  
      return GameUIManager.instance;
    }
    static listbuttons = [];
    static _Buttons;
    static DiceStatus = true;
    static stateDialog = false;
    static dialogForm;
    constructor() {
      if (GameUIManager.instance) {
        throw new Error("This class is a Singleton!");
      }
    //   GameUIManager.Buttons = 
      // Initialize the class properties here
    }
    Start(){
      GameUIManager._Buttons = new Buttons();
    }
    SetButtonScene(listButton){
      GameUIManager.listbuttons = listButton;      
    }
    GetButtons(){
      GameUIManager._Buttons.listButton = GameUIManager.listbuttons;  
      return  GameUIManager._Buttons;
    }
    GetIconImage(name){
      return GameUIManager.ImageIcon[name];
    }
    GetButtonName(name_){
      return this.GetButtons().listButton.find(({ name }) => name === name_)['button'];
    }
    ShowDialog(dialog){
      GameUIManager.dialogForm = new dialog;
      GameUIManager.dialogForm.Show();
    }
    GetDialog(){
      return GameUIManager.dialogForm;
    }
    CreateCardBoard(Cards){
      var i=0;
      Cards.forEach(card=> {
        new Card(i,card.func,card.level);
        i++;
      });
      console.log("Addlist");
     gameManager.GetSceneCurrent().board_.SetupCard();
    }
    DestroyDialog(){
      GameUIManager.dialogForm = document.getElementById('ShowDialog');
      GameUIManager.dialogForm.remove();
    }
    DestroyDialogListRoom(){
      GameUIManager.dialogForm = document.getElementById('ShowDialog1');
      GameUIManager.dialogForm.remove();
    }
    DestroyToastDialog(){
      GameUIManager.dialogForm = document.getElementById('ShowDialog2');
      GameUIManager.dialogForm.remove();
    }
    DestroyChatBox(){
      GameUIManager.dialogForm = document.getElementById('ShowDialog3');
      GameUIManager.dialogForm.remove();
    }
    ShowDialogAnswer(question){
        // console.log(question);
        gameUIManager.ShowDialog(AnswerForm);
        GameUIManager.dialogForm.SetQuestion(question);
    }
    SceneGameToHome(){
      gameManager.ResetDice();
      gameManager.StartSceneHome();
      gameUIManager.DestroyChatBox()
      socket.emit('leave_room',JSON.stringify({
          roomId: roomManager.GetId(),
          userName: gameManager.getCookie('username'),
      }))
      console.log('Leave Room');
    }
    // Opendialog(content){
    //   GameUIManager.dialogForm  = document.createElement("div");
    //   GameUIManager.dialogForm.id = "ShowDialog";
    //   // GameUIManager.dialogForm = document.getElementById('ShowDialog')
    //   document.body.appendChild(GameUIManager.dialogForm);
    //   GameUIManager.dialogForm.style.display ='flex';
    //   GameUIManager.dialogForm.innerHTML = content;
    // }
    // Closedialog(){
    //   soundManager.PlaySFX('ButtonClick');
    //   GameUIManager.dialogForm.remove();
    // }
    // Enterdialog(){
    //   soundManager.PlaySFX('ButtonClick');
    //   // gameManager.SetIdRoom(GameUIManager.dialogForm.querySelector("#RoomId").value);
    //   GameUIManager.dialogForm.remove();
    // }
}

const gameUIManager = Object.freeze(new GameUIManager());
export default gameUIManager;