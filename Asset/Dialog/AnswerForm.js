import Dialog from "./DialogBase.js";

class AnswerForm extends Dialog{
  constructor(){
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3 user-select-none" >
        <h2 id="titleDialog" >Câu hỏi</h2>
        </form>`;
        this.Container.innerHTML = this.content;
  }
  Draw(){
    super.Draw();
  }
}
export default AnswerForm;