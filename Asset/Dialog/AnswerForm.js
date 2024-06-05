import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AnswerForm extends Dialog{
  constructor(){
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-8 p-3 vh-100 user-select-none d-flex flex-column">
        <h2 id="titleDialog" class="">Câu hỏi</h2>
        <div id="content"  class="d-flex flex-row h-75 max-h-75 col-12 align-items-center">
          <textarea  id="question" class="col-6 bg-transparent text-justify text-white p-2 overflow-y-auto border-0 " style="resize:none;max-height:85%;height:100%;min-height:30%;outline:none" readonly unselectable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue gravida lobortis. Mauris porttitor magna suscipit gravida efficitur. Sed malesuada, neque at rhoncus congue, felis mi efficitur nisl, eget imperdiet erat nulla et sapien. In tincidunt erat eu finibus vehicula. Aliquam ut tempor ligula. Suspendisse euismod a nibh et commodo. Nunc iaculis non sapien euismod convallis. Donec justo arcu, tincidunt ut magna non, gravida convallis nisi. Nunc condimentum sollicitudin justo in facilisis. In a risus at mi ullamcorper hendrerit. Fusce nibh mi, pulvinar eu varius sit amet, venenatis in massa. Donec lacinia eget nisi at condimentum. Curabitur erat erat, faucibus nec sapien sed, interdum fringilla risus. Suspendisse arcu ex, aliquam quis cursus eget, dignissim ut leo. Maecenas id auctor eros. Nunc sagittis non mi eu ultrices.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue gravida lobortis. Mauris porttitor magna suscipit gravida efficitur. Sed malesuada, neque at rhoncus congue, felis mi efficitur nisl, eget imperdiet erat nulla et sapien. In tincidunt erat eu finibus vehicula. Aliquam ut tempor ligula. Suspendisse euismod a nibh et commodo. Nunc iaculis non sapien euismod convallis. Donec justo arcu, tincidunt ut magna non, gravida convallis nisi. Nunc condimentum sollicitudin justo in facilisis. In a risus at mi ullamcorper hendrerit. Fusce nibh mi, pulvinar eu varius sit amet, venenatis in massa. Donec lacinia eget nisi at condimentum. Curabitur erat erat, faucibus nec sapien sed, interdum fringilla risus. Suspendisse arcu ex, aliquam quis cursus eget, dignissim ut leo. Maecenas id auctor eros. Nunc sagittis non mi eu ultrices.
          </textarea>
          <textarea class="form-control text-white bg-transparent" id="answer" placeholder="Nhập câu trả lời" rows="3" style="resize:none;max-height:75%;height:100%;min-height:20%;"></textarea>
        </div>
        <div id="footerDialog" class="m-2 p-2 h-25">
          <button type="button" id="send" class="m-2 p-2">Xác nhận<i class="fas fa-times"></i></button>
        </form>`;
        this.Container.innerHTML = this.content;
        this.question;
        this.code;
  }
  Show(){
    super.Show();
    this.Container.querySelector('#send').addEventListener('click',()=>{
      this.ButtonCloseDialog();
    });
    this.Container.querySelector('#answer').addEventListener('keydown', function(e) {
      if (e.key == 'Tab') {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
  
          this.value = this.value.substring(0, start) +
              "    " + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 4;
      }
  });
  }
  SetQuestion(question){
    this.question = question;
    // console.log(question);
    this.Container.querySelector('#question').innerHTML = question.question_content;
  }
  ButtonCloseDialog(){
    this.GetCode();
    super.ButtonCloseDialog();
    super.DestroyDialog();
    gameManager.UserDoneMove();
  }
  GetCode(){
    this.code = this.Container.querySelector('#answer').value;
    // console.log(this.code);
    gameManager.SendValidatePython(this.code,this.question);
  }
}
export default AnswerForm;