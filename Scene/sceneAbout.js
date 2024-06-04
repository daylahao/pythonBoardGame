import { Scene } from './sceneBase.js';
import { Button, Buttons, ButtonIcon } from '../Asset/Button.js';
import gameUIManager from '../Asset/GameUIManager.js';
import gameManager from '../Asset/GameManager.js';
import soundManager from '../Asset/SoundManager.js';
import AboutDialog from '../Asset/Dialog/AboutDialog.js';
class SceneAbout extends Scene {
    constructor() {
        super();
        gameUIManager.ShowDialog(AboutDialog);
    }
    Draw() {
        super.Draw();
    }
}
export default SceneAbout;
