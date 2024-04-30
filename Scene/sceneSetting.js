import { Scene } from "./scenebase.js";
class SceneSetting extends Scene{
    constructor(){
        super();
    }
    Draw(){
        this.context.fillStyle = 'black';
        this.context.fillText('Cài Đặt',this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT/2-50);
    }
}
export default SceneSetting;
