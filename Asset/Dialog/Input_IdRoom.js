import gameManager from "../GameManager.js";
import gameUIManager from "../GameUIManager.js";
import Dialog from "./DialogBase.js";
import getWebSocket from "../../Config/websocket.js";
import ws from "../../app.js"
class InputIdRoom extends Dialog{
    constructor(){
        super()
        this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3">
        <h2 id="titleDialog">Tạo phòng</h2>
        <input id="RoomId" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập tên phòng">
        <div class="d-flex justify-content-around col-12 col-lg-8">
        <button id="CloseDialog" type="button" class="btn btn-dark row-6 row-md-4">Đóng</button>
        <button id="EnterRoom" type="button" class="btn btn-dark row-6 row-md-4">Xác nhận</button>
        </div>
        </form>`;
        this.Container.innerHTML = this.content;
    }
    Show(){
        super.Show();
        super.FindElement('#CloseDialog').onclick = this.ButtonCloseDialog;
        super.FindElement('#EnterRoom').onclick = this.ButtonEnterDialog;
        this.Container =document.getElementById('ShowDialog');
    }
    ButtonCloseDialog(){
        super.ButtonCloseDialog();
        super.DestroyDialog();
    }
    ButtonEnterDialog(){
        super.ButtonEnterDialog();
        // var id = this.offsetParent.querySelector("#RoomId").value;
        var name = this.offsetParent.querySelector("#RoomId").value;
        if(name.length<1){
            return 0;
        }
        else{
            gameManager.SetIdRoom(name);
            super.DestroyDialog();
            // Create a new WebSocket connection
            // const socket = new WebSocket('ws://localhost:9090');
            // const socket = getWebSocket();
            
            const message = {
                method: 'create',
                name: name,
                // clientId: clientId,
            };
            
                ws.send(JSON.stringify(message));
                console.log(JSON.stringify(message));
            
        }
    }
}

export default InputIdRoom;