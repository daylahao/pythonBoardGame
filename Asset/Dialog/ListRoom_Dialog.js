import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";
import soundManager from "../SoundManager.js";
import gameUIManager from "../GameUIManager.js";
import socket from "../../Config/websocket.js"
class ListRoomDialog extends Dialog {
  constructor() {
    super();
    this.content = `<form id="dialog-form1" action="" class="col-12 col-md-7 p-3 mh-100 position-fixed" style="right: 20px";>
    <div class="container text-center">
        <div class="row">
        <div class="col"><h2 id="titleDialog">Tên phòng</h2></div>
        <div class="col"><h2 id="titleDialog">Người tạo</h2></div>
        <div class="col"><h2 id="titleDialog">Số người</h2></div>
        </div>
        </div>
        <div id='content' class="d-flex flex-column col-12 row-12 py-3 mh-100">
        <div id="listroom" class="d-flex justify-content-between flex-column row-3">
        </div>
        <div class="d-flex justify-content-around col-12 p-5">
        <button id="CloseDialog" type="button" class="btn btn-dark row-12 col-12">Đóng</button>
        </div>
        </div>
        </form>`;
    this.Container.innerHTML = this.content;
    this.Container.id = "ShowDialog1";
  }
  Show() {
    super.Show();
    this.listroom = super.FindElement('#listroom');
    this.UpdateList();
    // this.listroom.innerHTML = this.Changetohtml(this.Rooms);
    super.FindElement("#CloseDialog").onclick = this.ButtonCloseDialog;
  }
  ButtonCloseDialog() {
    super.ButtonCloseDialog();
    super.DestroyDialog();
  }
  ButtonEnterDialog() {
    super.ButtonEnterDialog();
  }
 
  ClickJoinRoom(id){
    console.log(id);
  }
  UpdateList() {
    socket.emit('get_rooms');
    socket.on('rooms', (rooms) => {
    rooms.forEach(room => {
      // console.log(room.creator);
        let itemRoom = new ItemRoom(room.room_id, room.users.length, room.room_name, room.creator);
        this.listroom.appendChild(itemRoom);
    });
});
                
}
}
class ItemRoom {
    constructor(id,mem, name, creator){
        this.userName = this.getCookie("username");
        this.id = id;
        this.mem = mem;
        this.name = name;
        this.creator = creator;
        this.item = document.createElement('buton');
        this.item.id = id;
        this.item.name = name;
        if(this.mem<3)
        this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-light";
        else if(this.mem==3)
        this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-success";
        else
        this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-danger";
        this.item.type = 'button';
        this.item.innerHTML=`<div class="container text-center">
        <div class="row">
          <div class="col">`+this.name+`</div>
          <div class="col">`+ this.creator +`</div>
          <div class="col"><p>`+this.mem+`/4</div>
          </div>
        </div>`;
        this.item.onclick = this.Click.bind(this);
        return this.item;
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
    Click(){
        soundManager.PlaySFX('ButtonClick');
        gameManager.SetIdRoom(this.id)
        gameUIManager.DestroyDialogListRoom();
        socket.emit("join_room", JSON.stringify({
          roomId: this.id,
          userName: this.getCookie("username")
        }))
        // console.log(JSON.stringify({
        //   roomId: this.id,
        //   userName: this.getCookie("username"),
        // }))
    }
}
export default ListRoomDialog;
