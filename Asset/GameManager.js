import gameUIManager from "./GameUIManager.js";
import {listCard} from "./Card.js";
import { ListPlayer } from "../Player/Player.js";
import Board from "./Board.js";
import SceneGame from "../Scene/scenGame.js";
import SceneHome from "../Scene/sceneHome.js";
import SceneSetting from "../Scene/sceneSetting.js"
import SceneAbout from "../Scene/sceneAbout.js";
import Dice from "./Dice.js";
import socket from "../Config/websocket.js";
let instance;
class GameManager{
    static instance = null;
    
    static getInstance() {
      if (!GameManager.instance) {
        GameManager.instance = new Singleton();
      }
  
      return GameManager.instance;
    }
    static timeGame ={timeanswer:{set:10,default:10},
                  waitturn:{set:5,default:5},
                  timeroll:{set:1,default:5}};
    static timeroll;
    static timerwait;
    static sceneCurrent;
    static canvas;
    static DiceNumber = [1,5];
    static stepcurrent = [0,0,0,0];
    static listplayer;
    static idRoom;
    static turn =0;
    constructor() {
      this.userName = this.getCookie("username");
      if (GameManager.instance) {
        throw new Error("This class is a Singleton!");
      }
      GameManager.canvas = document.getElementById('app');
      // Initialize the class properties here
    }
    SetDiceNumber(number1, number2){
      GameManager.DiceNumber[0] = number1;
      GameManager.DiceNumber[1] = number2;
    }
    Resize(){
      GameManager.canvas = document.getElementById('app');
    }
    GetCanvas(){
      GameManager.canvas.width  = window.innerWidth;
      GameManager.canvas.height = window.innerHeight;
      return GameManager.canvas;
    }
    GetSceneCurrent(){
        return GameManager.sceneCurrent;
    }
    CreateListPlayer(){
      GameManager.listplayer = new ListPlayer();
      return GameManager.listplayer;
    }
    GetListPlayer(){
      if(GameManager.listplayer==undefined)
        GameManager.listplayer = new ListPlayer();
      // console.log(GameManager.listplayer)
      return GameManager.listplayer;
    }
    StartSceneGame(){
      GameManager.turn = -1;
      GameManager.timeGame.timeanswer.set = GameManager.timeGame.timeanswer.default;
      GameManager.timeGame.waitturn.set = GameManager.timeGame.waitturn.default;
      GameManager.sceneCurrent = new SceneGame();
      // gameUIManager.SetButtonScene(GameManager.sceneCurrent.GetButtons());
    }
    StartSceneHome(){
      GameManager.sceneCurrent = new SceneHome();
    }
    StartSceneSetting(){
      GameManager.sceneCurrent = new SceneSetting();
    }
    StartSceneAbout(){
      GameManager.sceneCurrent = new SceneAbout();
    }
    RandomDice(){
      return Math.round(Math.random() * (6 - 1) + 1);
    }
    
    getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      let cookieArr = document.cookie.split(";");
      
      // Loop through the array elements
      for(let i = 0; i < cookieArr.length; i++) {
          let cookiePair = cookieArr[i].split("=");
          
          /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
          if(name == cookiePair[0].trim()) {
              // Decode the cookie value and return
              return decodeURIComponent(cookiePair[1]);
          }
      }
      return "";
  }
    Roll_Dice(){
      socket.emit('start_roll', JSON.stringify({
        roomId: GameManager.idRoom,
        userName: gameManager.userName,
      }))
      console.log([GameManager.turn])
      clearInterval(GameManager.timerwait);
      gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].HideButton();
      this.Dice_Left = gameManager.RandomDice();
      this.Dice_right = gameManager.RandomDice();
      GameManager.DiceNumber =[];
      GameManager.timeroll = setTimeout(()=>{
        GameManager.DiceNumber = [this.Dice_Left,this.Dice_right];

        var i = GameManager.DiceNumber[0]+GameManager.DiceNumber[1];

        GameManager.listplayer.list_[GameManager.turn].Run(i);
        listCard[i].Open(true);
        GameManager.stepcurrent[GameManager.turn] =i;
        socket.emit("done_roll",JSON.stringify({
          roomId: GameManager.idRoom,
          userName: gameManager.userName,
          number1: GameManager.DiceNumber[0],
          number2: GameManager.DiceNumber[1],
        }))
        
      },GameManager.timeGame.timeroll.set*1000);
    }
    NextTurn(){
      GameManager.timeGame.waitturn.set = GameManager.timeGame.waitturn.default;
      if(GameManager.turn==gameManager.GetListPlayer().getMember()-1){
        GameManager.turn = 0;
      }else
        GameManager.turn++;
      this.WaitTurn();
      // console.log(GameManager.turn);
    }
    ResetDice(){
      clearInterval(GameManager.timerwait);
      clearTimeout(GameManager.timeroll);
      // GameManager.listplayer.resetmembers();
      GameManager.turn = 0;
      GameManager.DiceNumber = [gameManager.RandomDice(),gameManager.RandomDice()];
      GameManager.sceneCurrent.diceDialog.ResetDice();
    }
    GetDiceNumber(){
      return GameManager.DiceNumber;
    }
    GetIdRoom(){
      return GameManager.idRoom;
    }
    SetIdRoom(id){
      GameManager.idRoom = id;
      this.StartSceneGame();
    }
    GetDataRoom(){
      var Rooms=[];
      //Fake Data Room
      for(var i=0;i<5;i++){
          var room = {'id':'Room'+i,'member':Math.round(Math.round(Math.random() * (4 - 1) + 1))};
          Rooms.push(room);
      }
      return Rooms;
    }
    ChangeData(id){
      // alert(id);
      // gameUIManager.GetDialog().UpdateList();
      this.StartSceneGame();
    }
    CountDown(){
      GameManager.timeGame.timeanswer.set--;
    }
    SetTimeAnswer(){
     let time = setInterval(()=>{gameManager.CountDown();  
      // console.log(GameManager.timeGame.timeanswer.set);
      if(GameManager.timeGame.timeanswer.set==0){
        GameManager.timeGame.timeanswer.set=GameManager.timeGame.timeanswer.default;
        clearInterval(time);
        this.NextTurn();
        gameUIManager.DestroyDialog();
        gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].ShowButton();
      }},1000);
    }
    GetTurn(){
      return GameManager.turn;
    }
    GetTimeAnswer(){
      return GameManager.timeGame.timeanswer;
    }
    GetTimeWait(){
      return GameManager.timeGame.waitturn;
    }
    WaitTurn(){
      GameManager.timerwait = setInterval(()=>{
        GameManager.timeGame.waitturn.set--;
        if(GameManager.timeGame.waitturn.set==0){
          GameManager.timeGame.waitturn.set=GameManager.timeGame.waitturn.default;
          clearInterval(GameManager.timerwait);
          this.NextTurn();
        }
      },1000);
    }
}
const gameManager = Object.freeze(new GameManager());
export default gameManager;
