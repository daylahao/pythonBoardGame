import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AnswerForm extends Dialog{
  constructor(){
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3 user-select-none" >
        <h2 id="titleDialog" >Câu hỏi</h2>
        <button type="button" id="send">Xác nhận<i class="fas fa-times"></i></button>
        </form>`;
        this.Container.innerHTML = this.content;
  }
  Show(){
    super.Show();
    this.Container.querySelector('#send').addEventListener('click',()=>{
      this.ButtonCloseDialog();
    });
  }
  Draw(){
    super.Draw();
  }
  ButtonCloseDialog(){
    super.ButtonCloseDialog();
    super.DestroyDialog();
    gameManager.UserDoneMove();
  }
}
export default AnswerForm;