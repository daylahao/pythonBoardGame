import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
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

export default socket;