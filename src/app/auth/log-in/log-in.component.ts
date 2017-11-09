import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../shared/notification.service";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private notifier: NotificationService, private myFire: MyFireService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    const nickname = form.value.nickname;
    const password = form.value.password;


    this.myFire.getUserFromDatabase(nickname)
      .then(userData => {
        var userDataVal = userData.val();
        firebase.auth().signInWithEmailAndPassword(userDataVal.email, password)
          .then(loginUserData => {
            if(loginUserData.emailVerified) return userDataVal;
            else{
              const message = 'Your email is not yet verified';
              this.notifier.display('error', message);
              firebase.auth().signOut();
            }
          })
      })

  }
}
