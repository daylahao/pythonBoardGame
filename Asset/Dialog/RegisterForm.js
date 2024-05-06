import Dialog from "./DialogBase.js";
import gameManager from "../GameManager.js";
import socket from "../../Config/websocket.js"
import gameUIManager from "../GameUIManager.js";
import LoginForm from "./LoginForm.js";

class RegisterForm extends Dialog {
    constructor() {
        super();
        this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3">
        <h2 id="titleDialog">Đăng ký</h2>
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
        super.DestroyDialog()
        gameUIManager.ShowDialog(LoginForm);
    }
    ButtonCloseDialog() {
        super.ButtonCloseDialog();
        super.DestroyDialog();
    }
    ButtonRegister() {
        super.ButtonEnterDialog();
        var username = this.offsetParent.querySelector("#Username").value;
        var fullName = this.offsetParent.querySelector("#Name").value;
        var password = this.offsetParent.querySelector("#Password").value;
        if(username.length < 1 || password.length < 1) {
            return 0;
        } else {
            super.DestroyDialog();
            socket.emit("register", JSON.stringify({
                username: username,
                fullName: fullName,
                password: password
        }))
            socket.on("res_register", (data) => {
                console.log(data.success)
                if(data.success){
                    alert(data.message)
                    super.DestroyDialog();
                }else{
                    alert(data.message)
                }
            })
        }
    }
}

export default RegisterForm;