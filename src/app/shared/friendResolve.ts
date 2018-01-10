

import {UserService} from "./user.service";
import {MyFireService} from "./myfire.service";
import {Injectable} from "@angular/core";

@Injectable()
export class FriendResolveService{

  constructor (private  userService : UserService, private myFire : MyFireService) {}


  friendResolve(){
    console.log("nieco");
    let friendsList : any = [];

    const uid = this.userService.getProfile().uid;

    this.myFire.getUserFriends(uid).on('child_added', data => {
      this.myFire.getUserFromDatabase(data.key)
        .then((userData)=>{
           friendsList.push({
            id: data.key,
            status: data.val(),
            nickname: userData.val().nickname,
            accepted: data.val() != "pending"
          })
        })
    });

    return friendsList;
  }

}
