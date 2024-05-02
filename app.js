import gameManager from './Asset/GameManager.js';
import gameUIManager from './Asset/GameUIManager.js';
import sceneHome from './Scene/sceneHome.js';
import sceneGame from './Scene/scenGame.js';
import sceneSetting from './Scene/sceneSetting.js';
import {listScene} from './Scene/scenebase.js';
import { Buttons } from './Asset/Button.js';
import SceneHome from './Scene/sceneHome.js';
import SceneGame from './Scene/scenGame.js';
import SceneSetting from './Scene/sceneSetting.js';
const canvas = document.getElementById('app');
const ctx = canvas.getContext("2d");
var CANVAS_WIDTH = canvas.width = canvas.offsetWidth;
var CANVAS_HEIGHT = canvas.height = canvas.offsetHeight;
new SceneHome;
new SceneGame;
new SceneSetting;
gameManager.SetSceneCurrent(0);
function Apprun(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    listScene[gameManager.GetSceneCurrent()].Draw();
    requestAnimationFrame(Apprun);
};
console.log("Start Game");
gameUIManager.Start();

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (gameUIManager.GetButtons().checkButtons(mouseX, mouseY)) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
  });

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    let Button_ = gameUIManager.GetButtons().checkClickButton(mouseX, mouseY);
    if (Button_!=false) {
       Button_['button'].onClickCallback();
    }
  });
window.addEventListener('resize', () => {
  gameManager.Resize();
})
Apprun();

