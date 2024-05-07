import gameManager from "../GameManager.js";
import gameUIManager from "../GameUIManager.js";
import Dialog from "./DialogBase.js";
import socket from "../../Config/websocket.js"
class InputIdRoom extends Dialog{
    constructor(){
        super()
        this.userName = this.getCookie("username");
        this.userPW = this.getCookie("password")
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
    Show(){
        super.Show();
        let self = this; // Lưu trữ 'this' vào biến 'self'
            super.FindElement('#CloseDialog').onclick = function() { self.ButtonCloseDialog(); }; // Sử dụng 'self' thay vì 'this'
            super.FindElement('#EnterRoom').onclick = function() { self.ButtonEnterDialog(); }; // Sử dụng 'self' thay vì 'this'
            this.Container =document.getElementById('ShowDialog');

    }
    ButtonCloseDialog(){
        super.ButtonCloseDialog();
        super.DestroyDialog();
    }
    ButtonEnterDialog(){
        super.ButtonEnterDialog();
        var name = document.querySelector("#RoomId").value;
        if(name.length<1){
            return 0;
        }
        else{
            socket.emit("create_room", JSON.stringify({
                userName: this.userName,
                roomName: name,
                //userPW: this.userPW,
            })) 
            // console.log(JSON.stringify({
            //     userName: this.userName,
            //     roomName: name,
            //     userPW: this.userPW,
            // })) 
            socket.on("res_create_room", (data)=>{
                if(data.success){
                    gameManager.SetIdRoom(data.roomId);
                    super.DestroyDialog();
                    alert(data.message);
                }else{
                    alert(data.message)
                }
            })
            
            
            
        }
    }
}

export default InputIdRoom;