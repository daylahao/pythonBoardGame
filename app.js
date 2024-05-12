import gameManager from './Asset/GameManager.js';
import gameUIManager from './Asset/GameUIManager.js';
import sceneHome from './Scene/sceneHome.js';
import sceneGame from './Scene/scenGame.js';
import sceneSetting from './Scene/sceneSetting.js';
import { Buttons } from './Asset/Button.js';
import SceneHome from './Scene/sceneHome.js';
import SceneGame from './Scene/scenGame.js';
import SceneSetting from './Scene/sceneSetting.js';
import soundManager from './Asset/SoundManager.js';
import roomManager from './Asset/RoomManager.js';
import socket from './Config/websocket.js';
gameManager.StartSceneHome();
let appstart = false;
function Apprun(){
  gameManager.GetCanvas().getContext("2d").clearRect(0,0,gameManager.GetCanvas().width,gameManager.GetCanvas().height);
    gameManager.GetSceneCurrent().Draw();
    requestAnimationFrame(Apprun);
};
// console.log("Start Game");
gameUIManager.Start();

soundManager.PlayLoopMusic('BG');
gameManager.GetCanvas().addEventListener('mousemove', (event) => {
    const rect = gameManager.GetCanvas().getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (gameUIManager.GetButtons().checkButtons(mouseX, mouseY)) {
        gameManager.GetCanvas().style.cursor = 'pointer';
    } else {
        gameManager.GetCanvas().style.cursor = 'default';
    }
  });
gameManager.GetCanvas().addEventListener('click', function(event) {
    const rect = gameManager.GetCanvas().getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    let Button_ = gameUIManager.GetButtons().checkClickButton(mouseX, mouseY);
    if (Button_!=false) {
       Button_['button'].onClickCallback();
    }
  });
  window.addEventListener("DOMContentLoaded", event => {
    soundManager.PlayLoopMusic('BG');
  });
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
        socket.emit('leave_room',JSON.stringify({
    roomId: roomManager.GetId(),
    userName: gameManager.getCookie('username'),
    }));
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };
  // const pageAccessedByReload = (
  //   (window.performance.navigation && window.performance.navigation.type === 1) ||
  //     window.performance
  //       .getEntriesByType('navigation')
  //       .map((nav) => nav.type)
  //       .includes('reload')
  // );
// if(pageAccessedByReload){
//   console.log(roomManager.GetId());
//   console.log(pageAccessedByReload);
//   socket.emit('leave_room',JSON.stringify({
//     roomId: roomManager.GetId(),
//     userName: gameManager.getCookie('username'),
// }))
// }
Apprun();

