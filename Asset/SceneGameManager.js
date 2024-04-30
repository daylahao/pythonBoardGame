import gameManager from "./GameManager.js";
class SceneGameManager{
    static instance = null;

    static getInstance() {
      if (!SceneGameManager.instance) {
        SceneGameManager.instance = new Singleton();
      }
      return GameManager.instance;
    }
      constructor() {
        if (GameManager.instance) {
          throw new Error("This class is a Singleton!");
        }
    }
}
const SceneGameManager = Object.freeze(new SceneGameManager());
export default SceneGameManager;

