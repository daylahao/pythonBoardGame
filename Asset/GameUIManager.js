import { Buttons } from "./Button.js";
import gameManager from "./GameManager.js";
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
}
const gameUIManager = Object.freeze(new GameUIManager());
export default gameUIManager;