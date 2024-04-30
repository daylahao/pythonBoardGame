import { listScene } from "../Scene/scenebase.js";
import gameUIManager from "./GameUIManager.js";

let instance;
class GameManager{
    static instance = null;

    static getInstance() {
      if (!GameManager.instance) {
        GameManager.instance = new Singleton();
      }
  
      return GameManager.instance;
    }
    static sceneCurrent;
    static canvas;
    static DiceNumber = [1,5];
    constructor() {
      if (GameManager.instance) {
        throw new Error("This class is a Singleton!");
      }
      GameManager.sceneCurrent=0;
      GameManager.canvas = document.getElementById('app');
      // Initialize the class properties here
    }
    GetCanvas(){
      return GameManager.canvas;
    }
    GetSceneCurrent(){
        return GameManager.sceneCurrent;
    }
    SetSceneCurrent(i){
      gameUIManager.SetButtonScene(listScene[i].GetListButton());
      GameManager.sceneCurrent=i;
    }
    Roll_Dice(){
      gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].HideButton();
      this.Dice_Left = Math.round(Math.random() * (6 - 1) + 1);
      this.Dice_right = Math.round(Math.random() * (6 - 1) + 1);
      GameManager.DiceNumber =[];
      setTimeout(()=>{
        GameManager.DiceNumber = [this.Dice_Left,this.Dice_right];
        gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].ShowButton();
        console.log(GameManager.DiceNumber[0]+GameManager.DiceNumber[1]);  
      },5000);
    }
    GetDiceNumber(){
      return GameManager.DiceNumber;
    }
}
const gameManager = Object.freeze(new GameManager());
export default gameManager;
