import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import gameManager from "../Asset/GameManager.js";
const socket = io("ws://localhost:8000/");

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
socket.on('on_user_join_room',(data)=>{
    console.log(data.userName + ' has joined the room');
    gameManager.GetSceneCurrent().createPlayer(data.userName);
})
export default socket;