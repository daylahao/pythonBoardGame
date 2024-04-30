class ListPlayer{
    members = 0;
    Maxmembers = 4;
    getMember(){
        return  this.members;
    }
    addMember(){
        this.members++;
    }
    removeMember(){
        this.members--;
    }
}
class Player{
    constructor(name='Player',px,py,color='red'){
        this.name = name;
        this.scorce = 0;
        this.position = {x:px,y:py};

        this.image = '';
        this.color= color;
    }
    start(){
        
    }
    update(){

    }
    draw(){
        
    }
}
class PlayerUI{
    constructor(px,py,logo,){
        this.color
    }
}