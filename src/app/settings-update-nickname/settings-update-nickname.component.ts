import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MyFireService} from "../shared/myfire.service";
import {UserService} from "../shared/user.service";
import * as firebase from 'firebase';
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-settings-update-nickname',
  templateUrl: './settings-update-nickname.component.html',
  styleUrls: ['./settings-update-nickname.component.css']
})
export class SettingsUpdateNicknameComponent implements OnInit {

  constructor(private myFire: MyFireService, private notifier: NotificationService) { }

  ngOnInit() {
  }

  updateNickname(form: NgForm){
    var nickname = form.value.newNickname;
    var user = firebase.auth().currentUser;

    this.myFire.updateUserNickname(user.uid, nickname, this.notifier);



  }
}
