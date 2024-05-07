import gameManager from "../GameManager.js";
import Dialog from "./DialogBase.js";

class AboutDialog extends Dialog{
  constructor(){
    super();
    this.content = `
    <button id="CloseDialog" type="button" class="position-fixed p-3 text-white" style="left:20px;top:20px">Trở lại</button>
    <div id="dialog-form" action="" class="col-12 col-md-4 p-3 user-select-none h-100" >
    <h2 class="col-10 text-center">Lập trình game nâng cao</h2>
    <div class='col-12 d-flex flex-column text-start text-white overflow-auto mh-100'>
        <h5></h5>
        <h5 class="text-start">Thành viên:</h5>
        <h5 class="ms-5">1. Lương Quốc Diễn - N20DCPT009</h5>
        <h5 class="ms-5">2. Đỗ Hùng Hảo - N20DCPT021</h5>
        <h5 class="ms-5">3. Trần Văn Ngạn - N20DCPT04</h5>
        <h5 class="ms-5">4. Nguyễn Xuân Phúc - N20DCPT0</h5>
        <h5 class="text-start">Lời nói đầu:</h5>
        <p class="text-white px-1"style="text-align:justify;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor ex neque, at suscipit est feugiat non. Morbi pulvinar nisl erat, vel interdum velit aliquet a. Donec dolor orci, efficitur ac nulla eu, ultricies sagittis est. Integer accumsan elit sed nisi commodo, sed interdum elit tempor. Ut vel nunc vel augue sodales efficitur. Duis eu feugiat nibh, a vehicula ante. Proin quis orci justo. Quisque vel velit ultricies, lobortis ante vel, condimentum ex. Vestibulum purus ex, malesuada ac nisi ut, imperdiet semper purus. Sed eget ligula mattis, efficitur sapien ac, vestibulum ante. Suspendisse aliquet justo sit amet accumsan varius. Nam tempor a sem nec congue.

        Nunc ac neque felis. Vestibulum tincidunt nisl lectus, ut placerat purus elementum vitae. Praesent bibendum ex justo, ac aliquam sapien dignissim id. Proin egestas est sit amet libero pellentesque, et eleifend lectus sagittis. Pellentesque laoreet venenatis ex a maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus odio et aliquet iaculis. Nunc urna ex, molestie aliquam accumsan ac, lobortis ac sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam non urna ante. Aliquam porta suscipit nisl vitae lacinia.
        
        Sed venenatis tellus erat, et accumsan est lobortis ac. Quisque tempus nulla varius, consectetur velit sed, convallis diam. Vivamus et massa porta, faucibus nisl aliquam, dictum enim. Donec id ipsum a sapien rutrum vehicula. Sed maximus cursus velit, a euismod tellus ultricies nec. Donec iaculis ante non augue lobortis ornare. Aenean sed tellus tincidunt, molestie nisi ut, interdum eros. Maecenas vehicula facilisis velit, eget maximus velit maximus tristique. Mauris tincidunt nisi sed interdum rhoncus. Nam fermentum egestas condimentum. Proin tristique dapibus erat, ac interdum velit posuere ac. Maecenas nunc dolor, pretium sit amet iaculis sed, scelerisque id felis. Aliquam fringilla nulla non odio feugiat, sed tristique ex varius.
        
        Praesent dapibus sollicitudin semper. Duis porta blandit augue non mollis. Vivamus gravida condimentum odio quis finibus. Quisque viverra tellus sit amet venenatis varius. Vestibulum hendrerit ultricies aliquet. Suspendisse vitae ipsum ut diam congue commodo. Mauris ut neque odio.
        
        Sed quis sagittis velit, eu fringilla nibh. Cras sit amet risus suscipit, maximus dui hendrerit, hendrerit velit. Aliquam tincidunt facilisis lectus ac imperdiet. Vivamus faucibus imperdiet facilisis. Nunc at turpis id ante pellentesque semper. Ut sed sem eget ligula aliquam pellentesque. Sed vel urna lacinia, porttitor risus ac, tincidunt elit. Suspendisse in ipsum ex.
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