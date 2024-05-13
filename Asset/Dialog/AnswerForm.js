import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AnswerForm extends Dialog{
  constructor(){
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-4 p-3 user-select-none d-flex flex-column">
        <h2 id="titleDialog" class="row-2">Câu hỏi</h2>
        <div id="content"  class="row-8 d-flex flex-column">
          <p id="question" class="text-white p-2 overflow-y-scroll row-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue gravida lobortis. Mauris porttitor magna suscipit gravida efficitur. Sed malesuada, neque at rhoncus congue, felis mi efficitur nisl, eget imperdiet erat nulla et sapien. In tincidunt erat eu finibus vehicula. Aliquam ut tempor ligula. Suspendisse euismod a nibh et commodo. Nunc iaculis non sapien euismod convallis. Donec justo arcu, tincidunt ut magna non, gravida convallis nisi. Nunc condimentum sollicitudin justo in facilisis. In a risus at mi ullamcorper hendrerit. Fusce nibh mi, pulvinar eu varius sit amet, venenatis in massa. Donec lacinia eget nisi at condimentum. Curabitur erat erat, faucibus nec sapien sed, interdum fringilla risus. Suspendisse arcu ex, aliquam quis cursus eget, dignissim ut leo. Maecenas id auctor eros. Nunc sagittis non mi eu ultrices.
          </p>
          <textarea class="form-control row-6 col-6 h-10 text-white bg-transparent" id="answer" placeholder="Nhập kết quả" rows="3" style="resize:none"></textarea>
        </div>
        <button type="button" id="send" class="m-2 p-2">Xác nhận<i class="fas fa-times"></i></button>
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