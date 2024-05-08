import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class ToastNotification extends Dialog {
    constructor(message) {
        super();
        this.message = message;
        this.content = `
        <div id="dialog-form1" class="toast align-items-center text-white bg-primary border-0 position-fixed top-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${this.message}
                </div>
            </div>
        </div>`;
        this.Container.innerHTML = this.content;
        this.Container.id = "ShowDialog2";
    }

    Show() {
        super.Show();
        let self = this;
        setTimeout(() => {
            self.CloseDialog();
        }, 4000);
    }
    CloseDialog() {
        super.DestroyToastDialog();
    }

    Draw() {
        super.Draw();
    }
}

export default ToastNotification;