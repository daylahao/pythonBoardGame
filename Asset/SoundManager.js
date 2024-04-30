let instance
class SoundManager{
    constructor(params) {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
    }
}
const soundManager = Object.freeze(new SoundManager());
export default soundManager;