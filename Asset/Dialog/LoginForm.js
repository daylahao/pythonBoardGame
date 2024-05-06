import Dialog from "./DialogBase.js";
import gameManager from "../GameManager.js";
import socket from "../../Config/websocket.js"
import gameUIManager from "../GameUIManager.js";
import RegisterForm from "./RegisterForm.js";

class LoginForm extends Dialog {
    constructor() {
        super();
        var username = this.getCookie("username");
        var password = this.getCookie("password");
        this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3">
        <h2 id="titleDialog">Đăng nhập</h2>
        <input id="Username" type="text" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập tên đăng nhập" value="${username}">
        <input id="Password" type="password" autocomplete=off class="col-12 p-2 my-2" placeholder="Nhập mật khẩu" value="${password}">
        <div class="d-flex justify-content-around col-12 col-lg-8">
        <button id="CloseDialog" type="button" class="btn btn-dark row-6 row-md-4">Đóng</button>
        <button id="RegisterForm" type="button" class="btn btn-dark row-6 row-md-4">Đăng ký</button>
        <button id="Login" type="button" class="btn btn-dark row-6 row-md-4">Đăng nhập</button>
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
    Show() {
        if (this.getCookie("username") && this.getCookie("password")) {
            super.Show();
            super.FindElement('#CloseDialog').onclick = this.ButtonCloseDialog;
            super.FindElement('#RegisterForm').onclick = this.ButtonRegisterForm;
            super.FindElement('#Login').onclick = this.ButtonLogin;
            this.Container = document.getElementById('ShowDialog');
            super.DestroyDialog();
        } else {
            super.Show();
            super.FindElement('#CloseDialog').onclick = this.ButtonCloseDialog;
            super.FindElement('#RegisterForm').onclick = this.ButtonRegisterForm;
            super.FindElement('#Login').onclick = this.ButtonLogin;
            this.Container = document.getElementById('ShowDialog');
        }
    }
    ButtonRegisterForm(){
        super.DestroyDialog();
        gameUIManager.ShowDialog(RegisterForm);
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
            socket.emit("login", JSON.stringify({
                username: username,
                password: password
            }))
            socket.on("res_login", (data) => {
                console.log(data.success)
                if(data.success){
                    const user = data.user;
                    console.log(user)
                    alert(data.message)
                    super.DestroyDialog();
                    document.cookie = "username=" + user.user_name + "; path=/";
                    document.cookie = "password=" + user.password + "; path=/";
                }else{
                    alert(data.message)
                }
            })
        }
    }
}

export default LoginForm;