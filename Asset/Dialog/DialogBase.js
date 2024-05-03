import gameUIManager from "../GameUIManager.js";
import soundManager from "../SoundManager.js";

class Dialog{
    constructor(){
        this.Container = document.createElement('div');
        this.Container.id = "ShowDialog";
    }
    Show(){
        document.body.appendChild(this.Container);
    }
    CheckFailInput(listinput){
        var flag = 0;
        listinput.forEach(input => {
            if(input.value.length<0||input.value==""){
                input.style.border ="1px solid red";
                flag ++;
            }
        });
        if(flag>0)
            return false;
        else
            return true;
    }
    FindElement(name){
        console.log(this.Container);
        return this.Container.querySelector(name);
    }
    ButtonCloseDialog(){
        soundManager.PlaySFX('ButtonClick');
    }
    ButtonEnterDialog(){
        soundManager.PlaySFX('ButtonClick');
    }
    DestroyDialog(){
        gameUIManager.DestroyDialog();
    }
}
export default Dialog;