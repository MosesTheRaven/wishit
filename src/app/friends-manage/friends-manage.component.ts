import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MyFireService} from "../shared/myfire.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-friends-manage',
  templateUrl: './friends-manage.component.html',
  styleUrls: ['./friends-manage.component.css']
})
export class FriendsManageComponent implements OnInit {
  friendsListRef: any;
  friendsList: any = [];

  constructor(private myFire : MyFireService, private userService: UserService) { }

  ngOnInit() {
    const uid = this.userService.getProfile().uid;

    this.friendsListRef = this.myFire.getUserFriends(uid);
    this.friendsListRef.on('child_added', data => {
      this.friendsList.push({
        key: data.key,
        value: data.val()
      })
    })
  }
}
