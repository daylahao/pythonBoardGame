import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";


const socket = io("ws://localhost:8000/");

import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import roomManager from "../Asset/RoomManager.js";
import ToastNotification from "../Asset/Dialog/ToastNotification.js";
import soundManager from "../Asset/SoundManager.js";
import LoginForm from "../Asset/Dialog/LoginForm.js";
import { listCard } from "../Asset/Card.js";
let toast = new ToastNotification("");

socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("message", {})
    })

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
socket.on("error", (error) => {
    console.error("Socket error:", error);
});
socket.on("res_register", (data) => {
    if(data.success){
        toast = new ToastNotification(data.message);
        toast.Show();   
        gameUIManager.ShowDialog(LoginForm)
        gameUIManager.DestroyDialog();
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
socket.on("res_login", (data) => {
    if(data.success){
        const user = data.user;
        toast = new ToastNotification(data.message);
        toast.Show(); 
        gameUIManager.DestroyDialog();
        document.cookie = "username=" + user.user_name + "; path=/";
        document.cookie = "password=" + user.password + "; path=/";
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
socket.on('on_user_join_room',(data)=>{
    soundManager.PlaySFX('DoorBell');
    // console.log(data.userName + ' has joined the room');
    var text = 'Người chơi '+data.userName+' đã Vào Phòng';
    toast = new ToastNotification(text);
    toast.Show(); 
    roomManager.SetRoomList( data.list_user);
    // console.log(data);
    // console.log(roomManager.GetListInRoom());
})
socket.on("on_user_leave_room",(data)=>{
    // console.log(data.userName + ' has leaved the room');
    var text ='Người chơi '+data.userName+' đã Cút';
    toast = new ToastNotification(text);
    toast.Show(); 
    // gameManager.GetSceneCurrent().deletePlayer(data.userName);
    roomManager.RemovePlayerInRoom(data.userName);
    // console.log(roomManager.GetListInRoom());
})
// Tạo phòng
socket.on("res_create_room",(data)=>{

  if(data.success){
    toast = new ToastNotification(data.message);
    toast.Show(); 
    gameManager.JoinRoom(data.room.roomId);
    socket.emit('get_rooms');
    gameUIManager.DestroyDialog();
  }else{
    toast = new ToastNotification(data.message);
    toast.Show(); 
    }
})
socket.on('rooms',(data)=>{
    console.log(data);
    if(roomManager.GetId()!=undefined||roomManager.GetId()!=null){
        console.log(roomManager.GetId());
        data.forEach(room => {
        if(roomManager.GetId()==room.room_id){
            roomManager.SetRoomList(room.users);
            // console.log(roomManager.GetListInRoom());
        }
        if(room.creator==gameManager.getCookie('username')){
            roomManager.SetHost(true);
            room.users.forEach(user => {
                if(user.full_name==gameManager.getCookie('username'));
                    {
                        roomManager.SetUser(user);
                        // console.log(roomManager.GetUser());
                    }
            });
        }
    });
    }
})
//Vô phòng 
socket.on('res_join_room',(data)=>{
    console.log(data);
    data.forEach(user => {
    roomManager.AddPlayerInRoom(user);
        // console.log(gameManager.getCookie('username'));
    if(user.full_name==gameManager.getCookie('username')){
        roomManager.SetUser(user);
        socket.emit('get_room_cards',JSON.stringify({
        roomId: user.room_id,
        }));
    }
    if(user.turn!=0){
        console.log(user);
        roomManager.AddplayerOnBoard(user);
    }
    });

});
socket.on('res_get_room_cards',(data)=>{
    if(data.success){
    console.log(data);
    gameUIManager.CreateCardBoard(data.data);}
});
//Lắc xí ngầu
socket.on("on_user_start_roll", (data)=>{
    // console.log(data);
    gameManager.PlayerStartRoll();
    gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].HideButton()
});
socket.on("on_user_done_roll",(data)=>{
    // console.log(data);
    gameUIManager.GetButtons().listButton.find(({ name }) => name === "btnDice")['button'].HideButton()
    gameManager.SetDiceNumber(data.number1,data.number2);
    gameManager.SetPlayerMove();
})
socket.on("on_user_done_move",(data)=>{
    console.log(data);
    gameManager.NextTurn(data.userName,data.position);
})
//Bắt đầu game
socket.on("res_start_game",(data)=>{
    console.log(data);
    if(data.success){
        gameUIManager.CreateCardBoard(data.cards);
        console.log('GAmeRun');
        roomManager.SetRoomListPlayerOnBoard(data.data);
        roomManager.SetRoomStart(true);
        roomManager.SetTurnCurrent(1);
        soundManager.PlayLoopMusic('BG');
        gameManager.WaitTurn();
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
//Nhận câu hỏi trả về 
socket.on("res_get_question",(data)=>{
    console.log(data);
    if(data.success){
        gameUIManager.ShowDialogAnswer(data.question);
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
});
//chat manager
socket.on("res_send_message", (data)=>{
    if(data.success){
        let chatList = document.getElementById('chatList');
        let newMessage = document.createElement('div');
        newMessage.classList.add('list-group-item');
        newMessage.textContent = data.user_name + ': ' + data.message;
        chatList.appendChild(newMessage);
        document.querySelector("#message").value = "";
    }
})

export default socket;