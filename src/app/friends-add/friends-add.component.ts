import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MyFireService} from "../shared/myfire.service";
import {NotificationService} from "../shared/notification.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrls: ['./friends-add.component.css']
})
export class FriendsAddComponent implements OnInit {

  constructor(private myFire: MyFireService, private notifier: NotificationService, private userService: UserService) { }

  ngOnInit() {
  }

  addFriend(form: NgForm){
    var user = form.value.user;
    this.myFire.addUserAsFriend(user, this.notifier, this.userService);
  }

}
