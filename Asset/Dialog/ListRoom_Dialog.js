import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";
import soundManager from "../SoundManager.js";
import gameUIManager from "../GameUIManager.js";
import socket from "../../Config/websocket.js"
import roomManager from "../RoomManager.js";
class ListRoomDialog extends Dialog {
  constructor() {
    super();
    this.content = `<form id="dialog-form1" action="" class="position-relative col-7 p-3 py-5 mh-100 position-fixed user-select-none"" style="right:0;height:100vh">
    <button id="hideDialog" type="button" class="d-block d-md-none btn rounded-circle btn-light  row-1 col top-50 translate-middle start-0 position-absolute"><i class="bi bi-caret-right-fill"></i>
    </button>
    <div class="container text-center mw-100">
        <div class="row">
        <div class="col"><h2 id="titleDialog">Tên phòng</h2></div>
        <div class="col"><h2 id="titleDialog">Người tạo</h2></div>
        <div class="col"><h2 id="titleDialog">Số người</h2></div>
        </div>
        </div>
        <div id='content' class="d-flex flex-column col-12 row-12 py-3 mh-100">
        <div id="listroom" class="d-flex justify-content-between flex-column px-1 bg-transparent  mw-100">
        </div>
        <!--<div class="d-flex justify-content-around col-12 p-5">
        <button id="CloseDialog" type="button" class="btn btn-dark row-12 col-12">Đóng</button>
        </div>--!>
        </div>
        </form>`;
    this.Container.innerHTML = this.content;
    this.Container.id = "ShowDialog1";
    
  }
  Show() {
    super.Show();
    this.listroom = super.FindElement('#listroom');
    this.UpdateList();
    let show = true;
    this.Container.querySelector('#hideDialog').addEventListener('click', () => {
      console.log(show);
      if(show){
        // console.log(this.Container.querySelector('#dialog-form1').innerHTML);
        this.Container.querySelector('form').style.transform = `translateX(${this.Container.querySelector('form').offsetWidth-this.Container.querySelector('#hideDialog').offsetWidth+20}px)`;
        this.Container.querySelector('#hideDialog').querySelector('i').classList = "bi bi-caret-left-fill";
        show = false;
      }else{
        this.Container.querySelector('form').style.transform = 'translateX(0)';
          this.Container.querySelector('#hideDialog').querySelector('i').classList = "bi bi-caret-right-fill";
          show = true;
      }
    });
    // this.listroom.innerHTML = this.Changetohtml(this.Rooms);
    // super.FindElement("#CloseDialog").onclick = this.ButtonCloseDialog;
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
      this.listroom.innerHTML = '';
    rooms.forEach(room => {
      // console.log(room.room_name.length);
      if(room.room_name.length > 0&&room.room_id.length > 0) { 
        var itemRoom = new ItemRoom(room.room_id, room.users.length, room.room_name, room.creator,room.playing_status);
        this.listroom.appendChild(itemRoom);
      }
    });
});
                
}
}
class ItemRoom {
    constructor(id,mem, name, creator,status){
        this.status = status;
        this.userName = gameManager.getCookie("username");
        this.id = id;
        this.mem = mem;
        this.name = name;
        this.creator = creator;
        this.item = document.createElement('buton');
        this.item.id = id;
        this.item.name = name;
        if(this.mem<3){
          this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-light";}
        else if(this.mem==3)
          this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-success";
        else
          this.item.classList = "ItemRoom btn col-12 d-flex justify-content-between border border-dange my-1 p-2 btn-danger";
          this.item.type = 'button';
          this.item.innerHTML=`<div class="container text-center">
          <div class="row">
            <div class="col">`+this.name+`</div>
            <div class="col">`+ this.creator +`</div>
            <div id="mem" class="col"><p>`+this.mem+`/4</div>
            </div>
          </div>`;
          this.item.onclick = this.Click.bind(this);
        socket.on('dashboard_user_join_room', (data)=>{
          // console.log(data.roomId);
          if(data.roomId === this.id){
            this.status = data.playing_status;
            this.mem++;
            this.item.innerHTML=`<div class="container text-center">
            <div class="row">
              <div class="col">`+this.name+`</div>
              <div class="col">`+ this.creator +`</div>
              <div id="mem" class="col"><p>`+this.mem+`/4</div>
              </div>
            </div>`;
          }
        })
        
        socket.on('dashboard_user_leave_room', (data)=>{
          // console.log(data.roomId);
          if(data.roomId === this.id){
            this.mem--;
            if(this.mem>0){
              this.item.innerHTML=`<div class="container text-center">
              <div class="row">
                <div class="col">`+this.name+`</div>
                <div class="col">`+ this.creator +`</div>
                <div id="mem" class="col"><p>`+this.mem+`/4</div>
                </div>
              </div>`;
            }else {
              this.item.remove();
            }
          }
        })
        return this.item;
    }
    Click(){
      socket.emit("join_room", JSON.stringify({
        roomId: this.id,
        userName: gameManager.getCookie("username")
      }))
      roomManager.SetRoomName(this.name)
      soundManager.PlaySFX('ButtonClick');
      gameManager.JoinRoom(this.id,this.status,this.creator)
        // gameUIManager.DestroyDialogListRoom();
        // console.log(JSON.stringify({
        //   roomId: this.id,
        //   userName: this.getCookie("username"),
        // }))
    }
}
export default ListRoomDialog;
