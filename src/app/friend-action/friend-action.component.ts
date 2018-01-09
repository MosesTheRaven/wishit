import {Component, OnInit, Input} from '@angular/core';
import {MyFireService} from "../shared/myfire.service";
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-friend-action',
  templateUrl: './friend-action.component.html',
  styleUrls: ['./friend-action.component.css']
})
export class FriendActionComponent implements OnInit {
  @Input() friend : any = {} ;
  friendData : any = {};
  acceptedFriend = true;

  constructor(private myFire : MyFireService, private userService : UserService, private notifier: NotificationService) { }

  ngOnInit() {
    this.myFire.getUserFromDatabase(this.friend.key)
      .then((userData)=>{
        if(this.friend.value == "pending") this.acceptedFriend = false;
        this.friendData = {
          name : [userData.val().nickname],
          status : [this.friend.value]
        }
      })
  }
  confirmUser(){
    this.myFire.confirmUser(this.friend.key, this.userService.getProfile().uid);

      /*.then(()=>{
        this.notifier.display("success", "Successfully confirmed friendship");
      })
      .catch((error)=>{
        this.notifier.display("error", error.message);
      })*/
  }

  removeUserFromFriends(){
    this.myFire.removeUserFromFriends(this.friend.key, this.userService.getProfile().uid);
    
      /*.then(()=>{
        this.notifier.display("success", "Successfully removed friend");
      })
      .catch((error)=>{
        this.notifier.display("error", error.message);
      })*/
  }
}
