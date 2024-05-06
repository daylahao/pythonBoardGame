import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";
import soundManager from "../SoundManager.js";
import gameUIManager from "../GameUIManager.js";
class ListRoomDialog extends Dialog {
  constructor() {
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3 mh-100">
        <h2 id="titleDialog">Vào phòng</h2>
        <div id='content' class="d-flex flex-column col-12 row-12 py-3 mh-100">
        <div id="listroom" class="d-flex flex-column overflow-auto row-3" style="height:90%">
        </div>
        <div class="d-flex justify-content-around col-12 p-5">
        <button id="CloseDialog" type="button" class="btn btn-dark row-12 col-12">Đóng</button>
        </div>
        </div>
        </form>`;
    this.Container.innerHTML = this.content;
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
    fetch('/api/rooms')
    .then(response => response.json())
    .then(data => {
        // Check if data is not undefined and is an array
        if (data && Array.isArray(data)) {
            data.forEach(room => {
                let itemRoom = new ItemRoom(room.roomId, room.players.length, room.name);
                this.listroom.appendChild(itemRoom);
            });
        } else {
            console.error('Data from API is undefined or not an array:', data);
        }
    })
    .catch(error => console.error('Error:', error));
}
}
class ItemRoom {
    constructor(id,mem, name){
        
        this.id = id;
        this.mem = mem;
        this.name = name;
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
        this.item.innerHTML=`<h4>`+this.name+`</h4><p>`+this.mem+`/4</p>`;
        this.item.onclick = this.Click;
        return this.item;
    }
    Click(){
        console.log('Clicked room name:', this.name);
        soundManager.PlaySFX('ButtonClick');
        gameManager.ChangeData(this.id);
        gameUIManager.DestroyDialog();
        const socket = getWebSocket();
        socket.onopen = ()=>{
          const message = {
              method: 'join',
              roomId: this.id,
              name: this.name,
          };
          socket.send(JSON.stringify(message));
          console.log(JSON.stringify(message));
        }
    }
}
export default ListRoomDialog;
