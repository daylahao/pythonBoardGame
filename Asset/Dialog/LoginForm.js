import Dialog from "./DialogBase.js";
import gameManager from "../GameManager.js";

class LoginForm extends Dialog {
    constructor() {
        super();
        this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3">
        <h2 id="titleDialog">Đăng nhập</h2>
        <input id="Username" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập tên đăng nhập">
        <input id="Password" type="password" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập mật khẩu">
        <div class="d-flex justify-content-around col-12 col-lg-8">
        <button id="CloseDialog" type="button" class="btn btn-dark row-6 row-md-4">Đóng</button>
        <button id="Login" type="button" class="btn btn-dark row-6 row-md-4">Đăng nhập</button>
        </div>
        </form>`;
        this.Container.innerHTML = this.content;
    }
    Show() {
        super.Show();
        super.FindElement('#CloseDialog').onclick = this.ButtonCloseDialog;
        super.FindElement('#Login').onclick = this.ButtonLogin;
        this.Container = document.getElementById('ShowDialog');
    }
    ButtonCloseDialog() {
        super.ButtonCloseDialog();
        super.DestroyDialog();
    }
    ButtonLogin() {
        super.ButtonEnterDialog();
        var username = this.offsetParent.querySelector("#Username").value;
        var password = this.offsetParent.querySelector("#Password").value;
        if(username.length < 1 || password.length < 1) {
            return 0;
        } else {
            super.DestroyDialog();
            // const socket = io.connect('http://localhost:8000');
            // socket.emit('login', JSON.stringify({
            //     username: username,
            //     password: password
            // }));
        }
    }
}

export default LoginForm;