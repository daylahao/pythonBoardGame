import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AnswerForm extends Dialog{
  constructor(){
    super();
    this.content = `<form id="dialog-form" action="" class="col-12 col-md-8 p-3 vh-100 user-select-none d-flex flex-column">
        <h2 id="titleDialog" class="">Câu hỏi</h2>
        <div id="content"  class="d-flex flex-column h-75 max-h-75 col-12">
          <textarea  id="question" class="col-12 bg-transparent text-justify text-white p-2 overflow-y-auto border-0 " style="resize:none;max-height:70%;min-height:20%;outline:none" readonly unselectable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue gravida lobortis. Mauris porttitor magna suscipit gravida efficitur. Sed malesuada, neque at rhoncus congue, felis mi efficitur nisl, eget imperdiet erat nulla et sapien. In tincidunt erat eu finibus vehicula. Aliquam ut tempor ligula. Suspendisse euismod a nibh et commodo. Nunc iaculis non sapien euismod convallis. Donec justo arcu, tincidunt ut magna non, gravida convallis nisi. Nunc condimentum sollicitudin justo in facilisis. In a risus at mi ullamcorper hendrerit. Fusce nibh mi, pulvinar eu varius sit amet, venenatis in massa. Donec lacinia eget nisi at condimentum. Curabitur erat erat, faucibus nec sapien sed, interdum fringilla risus. Suspendisse arcu ex, aliquam quis cursus eget, dignissim ut leo. Maecenas id auctor eros. Nunc sagittis non mi eu ultrices.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue gravida lobortis. Mauris porttitor magna suscipit gravida efficitur. Sed malesuada, neque at rhoncus congue, felis mi efficitur nisl, eget imperdiet erat nulla et sapien. In tincidunt erat eu finibus vehicula. Aliquam ut tempor ligula. Suspendisse euismod a nibh et commodo. Nunc iaculis non sapien euismod convallis. Donec justo arcu, tincidunt ut magna non, gravida convallis nisi. Nunc condimentum sollicitudin justo in facilisis. In a risus at mi ullamcorper hendrerit. Fusce nibh mi, pulvinar eu varius sit amet, venenatis in massa. Donec lacinia eget nisi at condimentum. Curabitur erat erat, faucibus nec sapien sed, interdum fringilla risus. Suspendisse arcu ex, aliquam quis cursus eget, dignissim ut leo. Maecenas id auctor eros. Nunc sagittis non mi eu ultrices.
          </textarea>
          <div id="changesize" style="cursor:n-resize;" class="rounded-bottom col-12 p-0 m-0 flex-row d-none d-sm-flex"><i class="lead  p-0 m-auto text-white bi bi-three-dots"></i></div>
          <textarea class="form-control col-6 text-white bg-transparent " id="answer" placeholder="Nhập câu trả lời" rows="3" style="resize:none;max-height:75%;height:75%;min-height:20%;"></textarea>
        </div>
        <div id="footerDialog" class="m-2 p-2 h-25">
          <button type="button" id="send" class="m-2 p-2">Xác nhận<i class="fas fa-times"></i></button>
        </form>`;
        this.Container.innerHTML = this.content;
  }
  Show(){
    super.Show();
    this.Container.querySelector('#send').addEventListener('click',()=>{
      this.ButtonCloseDialog();
    });
    let changesizedown = false;
    let questiondiv = this.Container.querySelector('#question');
    let answerdiv = this.Container.querySelector('#answer');
    this.Container.querySelector('#changesize').addEventListener('mousedown',()=>{
      changesizedown = true;
      this.Container.querySelector('#changesize').style.background="#f1f2f391";
    })
    this.Container.addEventListener('mouseup',()=>{
      changesizedown = false;
      this.Container.querySelector('#changesize').style.background="transparent";
    })
    this.Container.querySelector('#content').addEventListener('mousemove',(event)=>{
      if(changesizedown){
        questiondiv.style.height = `${event.clientY-this.Container.querySelector('#titleDialog').clientHeight-this.Container.querySelector('#changesize').clientHeight}px`;
        console.log(questiondiv.offsetHeight);
        answerdiv.style.height = `${this.Container.querySelector('#content').clientHeight-questiondiv.offsetHeight-this.Container.querySelector('#changesize').clientHeight}px`;
      }
    })
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