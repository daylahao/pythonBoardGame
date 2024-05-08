import { Button,ButtonIcon } from "../Asset/Button.js";
import gameManager from "../Asset/GameManager.js";
import {Scene} from "./scenebase.js";
import Board from "../Asset/Board.js";
import Dice from "../Asset/Dice.js";
import gameUIManager from "../Asset/GameUIManager.js";
import { ListPlayer, Player } from "../Player/Player.js";
import { listCard } from "../Asset/Card.js";
import socket from "../Config/websocket.js";
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
        socket.on("on_user_leave_room",(data)=>{
            console.log(data.userName + ' has leaved the room');
            this.deletePlayer(data.userName);
            // console.log(data);
        })
        socket.on("res_create_room",(data)=>{
            console.log(data.room.creator + ' has joined the room');
            this.addplayer(data.room.creator);
        })
        socket.on("on_user_done_roll",(data)=>{
            gameManager.SetDiceNumber(data.number1,data.number2);
        })
        gameUIManager.DestroyDialogListRoom()
        this._Buttons.Add("Back",new ButtonIcon(gameUIManager.GetIconImage('backDefault'),gameUIManager.GetIconImage('backHover'),"","center",50,50,80,50,'white','black',()=>{
            gameManager.ResetDice();
            gameManager.StartSceneHome();
            socket.emit('leave_room',JSON.stringify({
                roomId: this.roomId,
                userName: this.getCookie('username'),
            }))
            
        }));
        
        this.roomId = gameManager.GetIdRoom()
        this.board_= new Board(8*4);
        this.diceDialog = new Dice(this.context,this.board_.rectBoardPosx-this.board_.tileWidth/2,this.board_.rectBoardPosy,this.board_.rectBoardGame.width,this.board_.rectBoardGame.height,this.toggleDice);
        this.diceDialog.show=true;
        this._Buttons.Add('btnDice',this.diceDialog.btnRoll);
        socket.on('res_join_room',(data)=>{
            gameManager.CreateListPlayer();
            // console.log(data);
            data.forEach(user => {
                console.log(user);
            this.createPlayer(user.full_name);
            // console.log(gameManager.GetListPlayer())
            });
        });
        // console.log(gameManager.GetTurn());
        gameManager.NextTurn();
        
    }
    createPlayer(user){
        var i= gameManager.GetListPlayer().getMember();
        gameManager.GetListPlayer().addMember(new Player(gameManager.GetListPlayer().getMember(),user,listCard[0].playerslot[i].x,listCard[0].playerslot[i].y));

    }
    deletePlayer(username){
        gameManager.GetListPlayer().removeMember(username);
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
    Start(){
        
    }
    Update(){
        
    }
    Draw(){
        this.board_.Draw();
        gameManager.GetListPlayer().Draw();
        this._Buttons.Draw();
        this.diceDialog.Draw();
        gameManager.GetListPlayer().DrawUI();
        // addText(this.canvas,'SceneGame',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2);
    }
}
export default SceneGame;