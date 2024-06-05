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
import roomManager from "./RoomManager.js";
let instance;
class GameManager{
    static instance = null;
    
    static getInstance() {
      if (!GameManager.instance) {
        GameManager.instance = new Singleton();
      }
  
      return GameManager.instance;
    }
    static timeGame ={timeanswer:{set:50,default:50},
                  waitturn:{set:5,default:5},
                  timeroll:{set:1,default:5}};
    static timeroll;
    static timerwait;
    static timeranswer;
    static sceneCurrent;
    static pausegame = false;
    static canvas;
    static ratioResize = {width:1,height:1}
    static DiceNumber = [1,5];
    static stepcurrent = [0,0,0,0];
    static idRoom;
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
      this.w= GameManager.canvas.width;
      this.h= GameManager.canvas.height;
      GameManager.canvas = document.getElementById('app');
      GameManager.ratioResize.width = GameManager.canvas.width/this.w;
      console.log(GameManager.ratioResize.width)
      GameManager.ratioResize.height = GameManager.canvas.height/this.h;
    }
    GetRatioResize(){
      return GameManager.ratioResize;
    }
    GetCanvas(){
      GameManager.canvas.width  = window.innerWidth;
      GameManager.canvas.height = window.innerHeight;
      return GameManager.canvas;
    }
    GetSceneCurrent(){
        return GameManager.sceneCurrent;
    }
    JoinRoom(id,status,creator){
      roomManager.CreateLists();
      roomManager.SetId(id);
      if(creator == gameManager.getCookie('username')){
        roomManager.SetHost(true);
      }else{
        roomManager.SetHost(false);
      }
      if(status==1){
        roomManager.SetRoomStart(true);
      }else{
        roomManager.SetRoomStart(false);
      }
      this.StartSceneGame();
    }
    StartSceneGame(){
      roomManager.SetTurnCurrent(1);
      GameManager.timeGame.timeanswer.set = GameManager.timeGame.timeanswer.default;
      GameManager.timeGame.waitturn.set = GameManager.timeGame.waitturn.default;
      GameManager.sceneCurrent = new SceneGame();
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
      // console.log(cookieArr)
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
  PlayerStartRoll(){
    GameManager.DiceNumber=[];
    clearInterval(GameManager.timerwait);
  }
    Roll_Dice(){
      socket.emit('start_roll', JSON.stringify({
        roomId: roomManager.GetId(),
        userName: gameManager.getCookie('username'),
      }))
      clearInterval(GameManager.timerwait);
      gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].HideButton();
      this.Dice_Left = gameManager.RandomDice();
      this.Dice_right = gameManager.RandomDice();
      GameManager.DiceNumber =[];
      GameManager.timeroll = setTimeout(()=>{
        GameManager.DiceNumber = [this.Dice_Left,this.Dice_right];
        var i = GameManager.DiceNumber[0]+GameManager.DiceNumber[1];
        socket.emit("done_roll",JSON.stringify({
          roomId: roomManager.GetId(),
          userName: gameManager.getCookie('username'),
          number1: GameManager.DiceNumber[0],
          number2: GameManager.DiceNumber[1],
        }))
        gameManager.SetPlayerMove();
        listCard[i].Open(true);
        GameManager.stepcurrent[roomManager.GetTurnCurrent()] =i;
      },GameManager.timeGame.timeroll.set*1000);
    }
    SetPlayerMove(){
      var i = GameManager.DiceNumber[0]+GameManager.DiceNumber[1];
      roomManager.GetRoomListPlayerOnBoard().getPlayerByTurn(roomManager.GetTurnCurrent()).Run(i);
    }
    NextTurn(name,position){
      // console.log(roomManager.GetTurnCurrent());
      clearInterval(GameManager.timerwait);
      clearInterval(GameManager.timeranswer);
      GameManager.timeGame.waitturn.set=GameManager.timeGame.waitturn.default;
      GameManager.timeGame.timeanswer.set=GameManager.timeGame.timeanswer.default;
      roomManager.GetRoomListPlayerOnBoard().getPlayer(name).ClearTurn();
      roomManager.GetRoomListPlayerOnBoard().getPlayer(name).SetPosition(position);
      roomManager.SetTurnCurrent(roomManager.GetRoomListPlayerOnBoard().getPlayer(name).turnInlist);
      // console.log(roomManager.GetRoomListPlayerOnBoard().getPlayer(name).turnInlist);
      // console.log(roomManager.GetRoomListPlayerOnBoard().getMember());
      var i = roomManager.GetTurnCurrent()*1;
      // console.log(roomManager.GetRoomListPlayerOnBoard().list_);
      var maxturn = Math.max.apply(null,
        roomManager.GetRoomListPlayerOnBoard().list_.map(function (o) { return o.turnInRoom; }));
        // console.log(maxturn)
        var iafter = i==maxturn?1:i+1;
      // console.log(roomManager.GetRoomListPlayerOnBoard().list_)
      if(roomManager.GetRoomListPlayerOnBoard().getPlayerByTurn(iafter)==undefined){
          i = iafter;
      }
      if(i>=maxturn){
        roomManager.SetTurnCurrent(1);
      }else{
        roomManager.SetTurnCurrent(i+1);
        // GameManager.timeGame.waitturn.set=GameManager.timeGame.waitturn.default;
        }
        this.WaitTurn();
    }
    ResetDice(){
      clearInterval(GameManager.timerwait);
      clearTimeout(GameManager.timeroll);
      // GameManager.listplayer.resetmembers();
      roomManager.SetTurnCurrent(1);
      GameManager.DiceNumber = [gameManager.RandomDice(),gameManager.RandomDice()];
      GameManager.sceneCurrent.diceDialog.ResetDice();
    }
    GetDiceNumber(){
      return GameManager.DiceNumber;
    }
    GetIdRoom(){
      return GameManager.idRoom;
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
      // console.log(GameManager.timeGame.timeanswer.set);
      GameManager.timeranswer = setInterval(()=>{gameManager.CountDown();  
      // console.log(GameManager.timeGame.timeanswer.set);
      if(GameManager.timeGame.timeanswer.set==0){
        // GameManager.timeGame.timeanswer.set=GameManager.timeGame.timeanswer.default;
        // GameManager.timeGame.timeanswer.set=GameManager.timeGame.timeanswer.default;
        if(roomManager.GetTurnCurrent()==roomManager.GetUser().turn)
          {
            gameUIManager.DestroyDialog();
            gameManager.UserDoneMove();
          }
      }},1000);
    }
    UserDoneMove(){
      // roomManager.SetPoint(roomManager.GetUser(),10);
      // console.log(roomManager.GetRoomListPlayerOnBoard().getPlayerByTurn(roomManager.GetTurnCurrent()).stepcurrent); 
      // console.log(roomManager.GetUser().full_name);
      clearInterval(GameManager.timerwait);
      clearInterval(GameManager.timeranswer);
      socket.emit('user_done_move',JSON.stringify({
          roomId: roomManager.GetId(),
          userName: roomManager.GetUser().full_name,
          position: roomManager.GetRoomListPlayerOnBoard().getPlayerByTurn(roomManager.GetTurnCurrent()).stepcurrent,
        }))
      //   clearInterval(GameManager.timerwait);
      //   clearInterval(GameManager.timeranswer);
      // GameManager.timeGame.waitturn.set=GameManager.timeGame.waitturn.default;
      // GameManager.timeGame.timeanswer.set=GameManager.timeGame.timeanswer.default;
    }
    GetTimeAnswer(){
      return GameManager.timeGame.timeanswer;
    }
    GetTimeWait(){
      return GameManager.timeGame.waitturn;
    }
    WaitTurn(){
      GameManager.timerwait = setInterval(()=>{
        // console.log('Turn '+roomManager.GetTurnCurrent()+":"+GameManager.timeGame.waitturn.set);
        
        // console.log(GameManager.timeGame.waitturn.set);
        if(GameManager.timeGame.waitturn.set==0){
          // console.log('turn player: '+roomManager.GetUser().turn);
          // console.log('turncurrent: '+roomManager.GetTurnCurrent());
          // GameManager.timeGame.waitturn.set==-1;
          // GameManager.timeGame.waitturn.set==GameManager.timeGame.waitturn.default;
          if(roomManager.GetTurnCurrent()==roomManager.GetUser().turn)
            gameManager.UserDoneMove();
        }else{
          GameManager.timeGame.waitturn.set--;
        }
      },1000);
    }
    GetQuestion(card){
      // console.log(JSON.stringify({
      //   func: card.func,
      //   level: card.level,}));
      socket.emit('get_question',JSON.stringify({
        func: card.func,
        level: card.level,
        // func: 'while',
        // level: 2,
      }));
    }
    SendValidatePython(code,question){
      console.log(
        JSON.stringify({
          code_text: code,
          roomId: roomManager.GetId(),
          userName: gameManager.getCookie('username'),
          questionId: question.question_id,
          func: question.func,
          exam: question.exam,
          })
      );
      socket.emit('validate_python',JSON.stringify({
    code_text: code,
    roomId: roomManager.GetId(),
    userName: gameManager.getCookie('username'),
    questionId: question.question_id,
    func: question.func,
    exam: question.exam,
    }));
    }
    setPointUser(user_room){
      roomManager.SetPoint(user_room.user_id,user_room.point);
      if(user_room.point*1>=roomManager.GetMaxPoint()){
        console.log(roomManager.GetMaxPoint());
        gameManager.EndGame(user_room.user_id);
      }
    }
    PauseGame(){
      GameManager.pausegame = true;
    }
    EndGame(winnerName){
      // gameManager.pausegame();
      // gameUIManager.SceneGameToHome();
      let winnerDialog = Swal.fire({
        title: `Chúc mừng ${winnerName} đã chiến thắng!`,
        imageUrl: "/Image/Icon/DyQrKMpqkAhNHZ1iWe.webp",
        imageWidth: 480,
        imageHeight: 480,
        imageAlt: "Custom image",
        showConfirmButton: false 
      });
      setTimeout(() => {
        winnerDialog.close();
        gameUIManager.SceneGameToHome();
    }, 5000);
    
}

}
const gameManager = Object.freeze(new GameManager());
export default gameManager;
