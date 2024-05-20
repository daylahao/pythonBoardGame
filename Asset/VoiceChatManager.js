import gameManager from "./GameManager.js";
import roomManager from "./RoomManager.js";
import socket from "../Config/websocket.js";
let canRecordAudio = false;

let mediaRecorder;
let audioChunks;
export function requirePermission(){
    // console.log('clicked start');

    // Gửi yêu cầu truy cập vào thiết bị ghi âm
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
            // console.log('onStream: ');
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.addEventListener('dataavailable',function (event) {
                // console.log('dataabailable');
                audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener('stop', function () {
                // console.log('onStop');
        
                send_audio();
        
                mediaRecorder.start();
                setTimeout(function () {
                    // console.log('on setTimeOut stop');
                    mediaRecorder.stop();
                }, 2000);
            });
            mediaRecorder.start();
                setTimeout(function () {
                    // console.log('on setTimeOut stop');
                    mediaRecorder.stop();
                }, 2000);
        })
        .catch((error) => {
            console.error('Error capturing audio.', error);
            canRecordAudio = false;
        });
}

function send_audio() {
    var audioBlob = new Blob(audioChunks);
    audioChunks = [];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(audioBlob);
    fileReader.onloadend = function () {
        var base64String = fileReader.result;
        socket.emit('send_audio',JSON.stringify({
                roomId: roomManager.GetId(),
                base64String: base64String,
            }));
    };
}