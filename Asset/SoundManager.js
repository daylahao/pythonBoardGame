let instance
class SoundManager{
    static sfxSound;
    static musicSound;
    constructor(params) {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
        SoundManager.musicSound = true;
        SoundManager.sfxSound = true;
    }
    GetStatusSFX(){
        return SoundManager.sfxSound;
    }
    GetStatusMusic(){
        return SoundManager.musicSound;
    }
    SetStatusSFX(status){
        SoundManager.sfxSound = status;
    }
    SetStatusMusic(status){
        SoundManager.musicSound = status;
    }
}
const soundManager = Object.freeze(new SoundManager());
export default soundManager;