import socket from "../../Config/websocket.js";
import roomManager from "../RoomManager.js";
import Dialog from "./DialogBase.js";

class ChatBox extends Dialog{
  constructor(){
    super();
    this.userName = this.getCookie("username");
    this.content = `<form id="dialog-form1" action="" class="col-12 col-md-2 p-3 user-select-none" style="position:fixed; right:0; top: 50%; transform: translateY(-50%);>
        <h2 id="titleDialog" >Chat box</h2>
        <div id="chatList" class="list-group"></div>
        <div class="d-flex justify-content-around col-12 col-lg-8">
        <input id="message" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="nhắn tin">
        <button id="Send" type="button" class="btn btn-dark row-6 row-md-4">Gửi</button>
        </div>
        </form>`;
        this.Container.innerHTML = this.content;
        this.Container.id = "ShowDialog2";
  }
  Show(){
    super.Show();
    let self = this; 
        super.FindElement('#Send').onclick = function() { self.SendButton(); };
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
  SendButton(){
    let message = document.querySelector("#message").value;
    let chatList = document.getElementById('chatList');
    let sender = this.userName;
    let roomId = roomManager.GetId()
    
    socket.emit("send_message", JSON.stringify({
        userId: sender,
        roomId: roomId,
        message: message
    }));
  }
}

export default ChatBox;