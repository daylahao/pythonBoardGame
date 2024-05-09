import { Button,ButtonIcon } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
import {Scene} from "./scenebase.js";
import Board from "../Asset/Board.js";
import Dice from "../Asset/Dice.js";
import gameUIManager from "../Asset/GameUIManager.js";
import { ListPlayer, Player } from "../Player/Player.js";
import { listCard } from "../Asset/Card.js";
import socket from "../Config/websocket.js";
import roomManager from "../Asset/RoomManager.js";
import ChatBox from "../Asset/Dialog/ChatBox.js";
function addText(cavnass,content=String,x,y){
    const ctx = cavnass.getContext("2d");
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText(content,x,y);
}
class SceneGame extends Scene{
    constructor(){
        super()
        gameUIManager.ShowDialog(ChatBox)
        gameUIManager.DestroyDialogListRoom()
        this._Buttons.Add("Back",new ButtonIcon(gameUIManager.GetIconImage('backDefault'),gameUIManager.GetIconImage('backHover'),"","center",50,50,80,50,'white','black',()=>{
            gameManager.ResetDice();
            gameManager.StartSceneHome();
            gameUIManager.DestroyToastDialog()
            socket.emit('leave_room',JSON.stringify({
                roomId: roomManager.GetId(),
                userName: gameManager.getCookie('username'),
            }))
        }));
        this.roomId = gameManager.GetIdRoom()
        this.board_= new Board(8*4);
        this.diceDialog = new Dice(this.context,this.board_.rectBoardPosx-this.board_.tileWidth/2,this.board_.rectBoardPosy,this.board_.rectBoardGame.width,this.board_.rectBoardGame.height,this.toggleDice);
        this.diceDialog.show=true;
        this._Buttons.Add('btnDice',this.diceDialog.btnRoll);
        this._Buttons.Add('btnStart',new Button("Bắt Đầu","center",this.board_.rectBoardPosx+this.board_.rectBoardGame.width/2-150/2,this.CANVAS_HEIGHT/2,150,50,'white','black',this.StartGame));
        gameUIManager.GetButtonName('btnStart').HideButton();
        // console.log(gameManager.GetTurn());
        // gameManager.NextTurn();
    }
    StartGame(){
        socket.emit('start_game',JSON.stringify({
            roomId: roomManager.GetId(),
            userName: gameManager.getCookie('username'),
        }))
    }
    createPlayer(user){
        var i= gameManager.GetListPlayer().getMember();
        gameManager.GetListPlayer().addMember(new Player(gameManager.GetListPlayer().getMember(),user,listCard[0].playerslot[i].x,listCard[0].playerslot[i].y));
    }
    deletePlayer(username){
        gameManager.GetListPlayer().removeMember(username);
    }
    Start(){
        
    }
    Draw(){
        if(!roomManager.IsHost()||roomManager.IsRoomStart()){
            gameUIManager.GetButtonName('btnStart').HideButton();
            this.diceDialog.show = true;
            if(roomManager.GetTurnCurrent()==roomManager.GetUser().turn){
                this.diceDialog.btnRoll.ShowButton();
            }else{
                this.diceDialog.btnRoll.HideButton();
            }
        }else{
            gameUIManager.GetButtonName('btnStart').ShowButton();
        } 
        this.board_.Draw();
        this._Buttons.Draw();
        if(roomManager.IsRoomStart()){
            // console.log('Start Game');
            roomManager.GetRoomListPlayerOnBoard().Draw();
            roomManager.GetRoomListPlayerOnBoard().DrawUI();
        }
        else{
            this.diceDialog.show=false;
        }
        this.diceDialog.Draw();
        // addText(this.canvas,'SceneGame',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2);
    }
}
export default SceneGame;