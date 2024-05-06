import Dialog from "./DialogBase.js";
import gameManager from "../GameManager.js";
// import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

class RegisterForm extends Dialog {
    constructor() {
        super();
        this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3">
        <h2 id="titleDialog">Đăng nhập</h2>
        <input id="Username" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập tên đăng nhập">
        <input id="Name" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập tên">
        <input id="Password" type="password" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập mật khẩu">
        <div class="d-flex justify-content-around col-12 col-lg-8">
        <button id="CloseDialog" type="button" class="btn btn-dark row-6 row-md-4">Đóng</button>
        <button id="LoginForm" type="button" class="btn btn-dark row-6 row-md-4">Đăng nhập</button>
        <button id="Register" type="button" class="btn btn-dark row-6 row-md-4">Đăng ký</button>
        </div>
        </form>`;
        this.Container.innerHTML = this.content;
    }
    Show() {
        super.Show();
        super.FindElement('#CloseDialog').onclick = this.ButtonCloseDialog;
        super.FindElement('#LoginForm').onclick = this.ButtonLoginForm;
        super.FindElement('#Register').onclick = this.ButtonRegister;
        this.Container = document.getElementById('ShowDialog');
    }
    ButtonLoginForm(){
        
    }
    ButtonCloseDialog() {
        super.ButtonCloseDialog();
        super.DestroyDialog();
    }
    ButtonRegister() {
        super.ButtonEnterDialog();
        var username = this.offsetParent.querySelector("#Username").value;
        var username = this.offsetParent.querySelector("#Name").value;
        var password = this.offsetParent.querySelector("#Password").value;
        if(username.length < 1 || password.length < 1) {
            return 0;
        } else {
            super.DestroyDialog();
            // const socket = io('http://localhost:8000');
            // socket.emit('login', JSON.stringify({
            //     username: username,
            //     password: password
            // }))
        }
    }
}

export default RegisterForm;