import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AboutDialog extends Dialog{
  constructor(){
    super();
    this.content = `
    <button id="CloseDialog" type="button" class="position-fixed p-3 text-white" style="left:20px;top:20px;z-index:10">Trở lại</button>
    <div id="dialog-form" action="" class="d-flex flex-column col-12 col-md-4 p-3 user-select-none overflow-hidden" style="max-height:95vh">
    <h2 class="col-10 text-center">Lập trình game nâng cao</h2>
    <div class='col-12 pb-3 d-flex flex-column text-start text-white overflow-auto' style="height:100%">
        <h5></h5>
        <h5 class="text-start">Thành viên:</h5>
        <h5 class="ms-5">1. Lương Quốc Diễn - N20DCPT009</h5>
        <h5 class="ms-5">2. Đỗ Hùng Hảo - N20DCPT021</h5>
        <h5 class="ms-5">3. Trần Văn Ngạn - N20DCPT044</h5>
        <h5 class="ms-5">4. Nguyễn Xuân Phúc - N20DCPT057</h5>
        <h5 class="text-start">Lời nói đầu:</h5>
        <p class="text-white px-1 mb-5"style="text-align:justify">
       <b> Cách chơi:</b><br>
	        Một Board Game có thể bắt đầu chơi từ 2-4 người. Mỗi khi bắt đầu trò chơi sẽ random để sắp xếp thứ tự người chơi và random vị trí và cấp độ của câu hỏi để sắp xếp bàn chơi. Người chơi đầu tiên tung xúc xắc để bắt đầu di chuyển. Khi đủ số bước người chơi đầu tiên sẽ trả lời câu hỏi tương ứng với vị trí đang đứng trong một khoảng thời gian (10 giây). Nếu trong khoảng thời gian đó người chơi trả lời được thì sẽ được 1 số điểm tương ứng với cấp độ câu hỏi của ô đó. nếu người chơi không trả lời được sẽ không được tính điểm. tiếp tục tới lượt người thứ 2, 3, 4 và quay lại người đầu tiên đến khi đạt được số điểm nhất định được đặt lúc tạo phòng ( vd 1000 Điểm ). Thời gian chờ để người chơi tung xúc xắc 5s-10s.<br>
        <b>Cấp độ của mỗi ô trong board game :</b> <br>
          - level 0  (xanh | chọn trắc nghiệm | time: 5s-10s) : 10 điềm;<br>
          - level 1 ( vàng | điền vào chỗ trống | time: 20-30s) : 20 điểm;<br>
          - level >=2 ( đỏ | gõ code | time: 30s-50s) : 30 điểm;<br>
        <b>Tính năng nâng cao:</b><br>
          4 ô ở góc sẽ là các ô chức năng như (cơ hội, trừng phạt, blabla..) nhằm thay đổi số điểm, vị trí của người chơi. Các ô này sau khi người chơi chạm vào sẽ thay đổi random các chức năng khác có thể là một ô câu hỏi bình thường hoặc câu hỏi để thưởng điểm.<br>
        <b>Giao diện:</b> Như trò chơi CF.<br>
        <b>Hình ảnh, Nhạc Nền, SFX: </b>theo hơi hướng Fantasy<br>
        <b>Giao diện trong bàn chơi:</b> <br>
          - Hiển thị được các nhân vật của người chơi trên bàn cờ và  bàn cờ trò chơi.<br>
          - Hiển thị được điểm của các người chơi khác.<br>
          - Hiển thị được tên của người chơi khác.<br>
          - Hiển thị được thời gian trả lời của người chơi đó.<br>
          - (Nâng cao) hiệu ứng của người chơi khi rơi vào các ô chức năng.<br>
          - Có nút thoát phòng<br>
        <b>Lời Cảm ơn:</b><br>
          Chúng tôi xin được gửi lời cảm ơn chân thành đến thầy/cô giáo đã hướng dẫn và hỗ trợ nhóm trong suốt quá trình thực hiện dự án. Cảm ơn các bạn sinh viên đã tham gia trải nghiệm và đóng góp ý kiến quý báu để giúp dự án hoàn thiện hơn.<br>
        </p>
    </div>
    </div>`;
        this.Container.innerHTML = this.content;
  }
  Show(){
    super.Show();
    let self = this; // Lưu trữ 'this' vào biến 'self'
    super.FindElement('#CloseDialog').onclick = function() { self.ButtonCloseDialog(); }; // Sử dụng 'self' thay vì 'this'
  }
  ButtonCloseDialog(){
    super.ButtonCloseDialog();
    super.DestroyDialog();
    gameManager.StartSceneHome();
  }
  Draw(){
    super.Draw();
  }
}
export default AboutDialog;