import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const socket = io("ws://localhost:8000/");
import gameManager from "../Asset/GameManager.js";
import gameUIManager from "../Asset/GameUIManager.js";
import ToastNotification from "../Asset/Dialog/ToastNotification.js";
import LoginForm from "../Asset/Dialog/LoginForm.js";
let toast = new ToastNotification("");
socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("message", {})
    })

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
socket.on("error", (error) => {
    console.error("Socket error:", error);
});
socket.on("res_create_room", (data)=>{
    if(data.success){
        // toast.message = data.message;
        // toast.Show();
        toast = new ToastNotification(data.message);
        toast.Show(); 
        gameManager.SetIdRoom(data.room.roomId);
        gameUIManager.DestroyDialog();
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
socket.on("res_register", (data) => {
    if(data.success){
        toast = new ToastNotification(data.message);
        toast.Show();   
        gameUIManager.ShowDialog(LoginForm)
        gameUIManager.DestroyDialog();
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
socket.on("res_login", (data) => {
    if(data.success){
        const user = data.user;
        toast = new ToastNotification(data.message);
        toast.Show(); 
        gameUIManager.DestroyDialog();
        document.cookie = "username=" + user.user_name + "; path=/";
        document.cookie = "password=" + user.password + "; path=/";
    }else{
        toast = new ToastNotification(data.message);
        toast.Show(); 
    }
})
export default socket;