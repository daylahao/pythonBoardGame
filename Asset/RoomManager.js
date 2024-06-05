import gameManager from "./GameManager.js";
import gameUIManager from "./GameUIManager.js";
import { ListPlayer, Player } from "../Player/Player.js";
let instance;
class RoomManager{
    static Id;
    static nameRoom;
    static user = {};
    static Host=false;
    static roomList;
    static roomListPlayerOnBoard;
    static roomListViewer;
    static roomStart = false;
    static turncurrent = 0;
    static maxpoint = 100;
    constructor() {   
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
    }
    SetRoomStart(value){
        RoomManager.roomStart = value;
    }
    IsRoomStart(){
        return RoomManager.roomStart;
    }
    CreateLists(){
        RoomManager.roomList = new ListPlayer(); 
        RoomManager.roomListPlayerOnBoard = new ListPlayer();
        RoomManager.roomListViewer = new ListPlayer();
    }
    ResetRoom(){
        SetTurnCurrent(0);
        this.CreateRoomList();
        RoomManager.Host = false;
    }
    SetId(id){
        RoomManager.Id = id;
    }  
    GetId(){
        return RoomManager.Id;
    }
    GetRoomList(){
        return RoomManager.roomList;
    }
    GetListInRoom(){
        return RoomManager.roomList;
    }
    SetRoomList(list){
        RoomManager.roomList.resetmembers();
        // console.log(list);
        list.forEach(user => {
            RoomManager.roomList.SetMaxMembers(RoomManager.roomList.getMember()+1);
            RoomManager.roomList.addMember(new Player(user));
            if(user.position!=0){
                RoomManager.AddPlayerOnBoard(user);
            }
            // console.log(gameManager.getCookie('username'))
            if(user.user_id==gameManager.getCookie('username')){
                RoomManager.user = {...user};
            }
        });
    }
    GetRoomListPlayerOnBoard(){
        return RoomManager.roomListPlayerOnBoard;
    }
    SetRoomListPlayerOnBoard(list){
        RoomManager.roomListPlayerOnBoard.resetmembers();
        let id;
        let temp;
        list.forEach(user => {
            id=user.user_id;
            // console.log(id);
            temp = RoomManager.roomList.getPlayerById(id);
            // console.log(temp);
            user.full_name = temp.name;
            RoomManager.roomListPlayerOnBoard.addMember(new Player(user));
            if(user.user_id==RoomManager.user.user_id){
                RoomManager.user.turn = user.turn;
            }
        });
    }
    GetListViewer(){
        return RoomManager.roomListViewer;
    }
    SetListViewer(list){
        RoomManager.roomListViewer.list_ = {...list};
    }
    SetHost(Value){
        RoomManager.Host = Value;
        // console.log(RoomManager.Host);

    }
    IsHost(){
        return RoomManager.Host;
    }
    SetUser(user){
        RoomManager.user = {...user};
        // console.log(RoomManager.user);
    }
    GetUser(){
        return RoomManager.user;
    }
    AddPlayerInRoom(user){
        RoomManager.roomList.SetMaxMembers(RoomManager.roomList.getMember()+1);
        RoomManager.roomList.addMember( new Player(user));
        // console.log(RoomManager.roomList);   
    }
    AddplayerOnBoard(user){
        RoomManager.roomListPlayerOnBoard.addMember( new Player(user));
    }
    AddPlayerViewer(user){
        RoomManager.roomListViewer.addMember(user);
    }
    RemovePlayerInRoom(full_name){
        // console.log(full_name);
        RoomManager.roomList.removeMember(full_name);
        // console.log(RoomManager.roomList);   
    }
   RemoveplayerOnBoard(full_name){
        RoomManager.roomListPlayerOnBoard.removeMember(full_name);
    }
   RemovePlayerViewer(full_name){
        RoomManager.roomListViewer.removeMember(full_name);
    }
    SetTurnCurrent(value){
        RoomManager.turncurrent = value;
    }
    GetTurnCurrent(){
        return RoomManager.turncurrent;
    }
    GetMaxPoint(){
        return RoomManager.maxpoint;
    }
    SetPoint(user,point){
        // console.log(user+'p'+point);
        RoomManager.roomListPlayerOnBoard.getPlayerById(user).point = point;
    }
    GetRoomName(){
        return RoomManager.nameRoom;
    }
    SetRoomName(nameRoom){
        RoomManager.nameRoom = nameRoom;
    }
}
const roomManager = Object.freeze(new RoomManager());
export default roomManager;