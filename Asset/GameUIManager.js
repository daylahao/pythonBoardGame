import { listScene } from "../Scene/scenebase.js";
import { Buttons } from "./Button.js";
import gameManager from "./GameManager.js";
let instance;
class GameUIManager{
    static instance = null;

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
}
const gameUIManager = Object.freeze(new GameUIManager());
export default gameUIManager;