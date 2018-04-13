import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MyFireService} from "../shared/myfire.service";
import {UserService} from "../shared/user.service";
import {FriendResolveService} from "../shared/friendResolve";

@Component({
  selector: 'app-friends-manage',
  templateUrl: './friends-manage.component.html',
  styleUrls: ['./friends-manage.component.css']
})
export class FriendsManageComponent implements OnInit {
  friendsList: any = [];

  constructor(private myFire : MyFireService, private userService : UserService, private friendResolveService : FriendResolveService) { }

  ngOnInit() {

    this.friendsList = this.friendResolveService.friendResolve();

  }

  confirmUser(friend){
    this.myFire.confirmUser(friend.id, this.userService.getProfile().uid);
    /*
     .then(()=>{

     this.notifier.display("success", "Successfully confirmed friendship");
     })
     .catch((error)=>{
     this.notifier.display("error", error.message);
     })
     */
    this.friendsList = this.friendResolveService.friendResolve();
  }

  removeUserFromFriends(friend){
    this.myFire.removeUserFromFriends(friend.id, this.userService.getProfile().uid);
    this.friendsList = this.friendResolveService.friendResolve();

    /*
     .then(()=>{
     this.notifier.display("success", "Successfully removed friend");
     })
     .catch((error)=>{
     this.notifier.display("error", error.message);
     })
     */
  }
}

