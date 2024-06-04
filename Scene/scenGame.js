import { addText, Button, ButtonIcon } from '../Asset/Button.js';
import gameManager from '../Asset/GameManager.js';
import { Scene } from './sceneBase.js';
import Board from '../Asset/Board.js';
import Dice from '../Asset/Dice.js';
import gameUIManager from '../Asset/GameUIManager.js';
import soundManager from '../Asset/SoundManager.js';
import { ListPlayer, Player } from '../Player/Player.js';
import { listCard } from '../Asset/Card.js';
import socket from '../Config/websocket.js';
import roomManager from '../Asset/RoomManager.js';
import { requirePermission } from '../Asset/VoiceChatManager.js';

import ChatBox from '../Asset/Dialog/ChatBox.js';
import ToastNotification from '../Asset/Dialog/ToastNotification.js';

class SceneGame extends Scene {
    constructor() {
        super();
        gameUIManager.ShowDialog(ChatBox);
        gameUIManager.DestroyDialogListRoom();
        this._Buttons.Add(
            'Back',
            new ButtonIcon(
                gameUIManager.GetIconImage('backDefault'),
                gameUIManager.GetIconImage('backHover'),
                '',
                'center',
                50,
                50,
                80,
                50,
                'white',
                'black',
                () => {
                    gameUIManager.SceneGameToHome();
                }
            )
        );
        this.roomId = gameManager.GetIdRoom();
        this.board_ = new Board(8 * 4);
        this.diceDialog = new Dice(
            this.context,
            this.board_.rectBoardPosx - this.board_.tileWidth / 2,
            this.board_.rectBoardPosy,
            this.board_.rectBoardGame.width,
            this.board_.rectBoardGame.height,
            this.toggleDice
        );
        this.diceDialog.show = true;
        this._Buttons.Add('btnDice', this.diceDialog.btnRoll);
        this._Buttons.Add(
            'btnStart',
            new Button(
                'Bắt Đầu',
                'center',
                this.board_.rectBoardPosx +
                    this.board_.rectBoardGame.width / 2 -
                    150 / 2,
                this.CANVAS_HEIGHT / 2,
                150,
                50,
                'white',
                'black',
                this.StartGame
            )
        );
        gameUIManager.GetButtonName('btnStart').HideButton();
        // console.log(gameManager.GetTurn());
        // gameManager.NextTurn();
        soundManager.PlaySFX('DoorBell');
        this._Buttons.Add(
            'btnvoice',
            new Button(
                'Mở voice chat',
                'center',
                1450,
                50,
                180,
                40,
                'white',
                'black',
                this.VoiceChat
            )
        );
    }
    StartGame() {
        if (roomManager.GetRoomList().members < 2) {
            let toast = new ToastNotification(
                'Bạn không thể chơi game một mình'
            );
            toast.Show();
            return;
        }
        // console.log('Game Start');
        socket.emit(
            'start_game',
            JSON.stringify({
                roomId: roomManager.GetId(),
                userName: gameManager.getCookie('username'),
            })
        );
    }
    VoiceChat() {
        requirePermission();
    }
    createPlayer(user) {
        var i = gameManager.GetListPlayer().getMember();
        gameManager
            .GetListPlayer()
            .addMember(
                new Player(
                    gameManager.GetListPlayer().getMember(),
                    user,
                    listCard[0].playerslot[i].x,
                    listCard[0].playerslot[i].y
                )
            );
    }
    deletePlayer(username) {
        gameManager.GetListPlayer().removeMember(username);
    }
    Start() {}
    Draw() {
        this.board_.Draw();
        if (!roomManager.IsHost() || roomManager.IsRoomStart()) {
            gameUIManager.GetButtonName('btnStart').HideButton();
            this.diceDialog.show = true;
            // console.log(roomManager.GetUser());
            if (
                roomManager.GetTurnCurrent() == roomManager.GetUser().turn &&
                gameManager.GetDiceNumber().length != 0
            ) {
                this.diceDialog.btnRoll.ShowButton();
            } else {
                this.diceDialog.btnRoll.HideButton();
            }
            if (!roomManager.IsRoomStart()) {
                addText(
                    'Vui lòng đợi chủ phòng bắt đầu game',
                    this.CANVAS_WIDTH / 2,
                    this.CANVAS_HEIGHT / 2,
                    '30px'
                );
            }
        } else {
            gameUIManager.GetButtonName('btnStart').ShowButton();
        }

        this._Buttons.Draw();
        if (roomManager.IsRoomStart()) {
            // console.log('Start Game');
            roomManager.GetRoomListPlayerOnBoard().Draw();
            roomManager.GetRoomListPlayerOnBoard().DrawUI();
        } else {
            this.diceDialog.show = false;
        }
        this.diceDialog.Draw();
        // addText(this.canvas,'SceneGame',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2);
    }
}
export default SceneGame;
