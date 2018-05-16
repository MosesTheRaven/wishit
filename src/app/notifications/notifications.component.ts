import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationList: any = [];
  user: any = {};

  constructor(private userService : UserService, private notificationService : NotificationService) { }

  ngOnInit() {
    this.user = this.userService.getProfile();
    firebase.database().ref('users/' + this.user.uid + '/notifications/')
      .on('child_added', (notification)=>{
        this.notificationList.push(notification.val());
      })
  }
  removeNotifications(){
    firebase.database().ref('users/' + this.user.uid + '/notifications/')
      .remove()
      .then(()=>{
        this.notificationList = [];
        this.notificationService.display("success", "Notifications were removed.");
      })

  }
}
