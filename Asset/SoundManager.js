let instance
const ListMusic_={'BG':"Sound/BG_Music_Cartoon.mp3",
                  'ButtonClick':"Sound/button_Click.mp3",
                  'DiceRoll':"Sound/roll_ball.mp3",
                  'Move':"Sound/move.mp3",
                  'DoorBell':"Sound/doorbell.mp3",
                  };
class SoundManager{
    static sfxSound;
    static musicSound;
    static AudioMusic = new Audio();
    static AudioSFX = new Audio();
    constructor(params) {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
        SoundManager.AudioMusic.autoplay = true;
        SoundManager.musicSound = true;
        SoundManager.sfxSound = true;
        SoundManager.AudioMusic.volume = 0.8;

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
        if(!status){
           SoundManager.AudioMusic.volume = 0;
           SoundManager.AudioSFX.muted = true;
        }
        else{
            if(SoundManager.AudioMusic.paused){
                this.PlayLoopMusic('BG');
            }
            SoundManager.AudioSFX.muted = false;
            SoundManager.AudioMusic.volume = 0.5;
        }
    }
    PlayMusic(name){
        SoundManager.AudioMusic.baseURI = ListMusic_[name];
        SoundManager.AudioMusic.loop = false;
        SoundManager.AudioMusic.play();
    }
    PlayLoopMusic(name){
        // console.log(ListMusic_[name])
        SoundManager.AudioMusic.src  = ListMusic_[name];
        SoundManager.AudioMusic.loop = true;
        SoundManager.AudioMusic.play();
    }
    PlaySFX(name){
        console.log(SoundManager.sfxSound);
        if(SoundManager.sfxSound){
        SoundManager.AudioSFX.src = ListMusic_[name];
        SoundManager.AudioMusic.loop = false;
        SoundManager.AudioSFX.play();
        }
    }
    StopSFX(){
        SoundManager.AudioSFX.pause();
        SoundManager.AudioSFX.currentTime = 0;
    }
    CheckPlayBG(){
        if(SoundManager.AudioMusic.paused){
            this.PlayLoopMusic('BG');
        }
    }

}
const soundManager = Object.freeze(new SoundManager());
export default soundManager;