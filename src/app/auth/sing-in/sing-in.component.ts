import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from 'firebase';
import {register} from "ts-node/dist";
import {NotificationService} from "../../shared/notification.service";
import {MyFireService} from "../../shared/myfire.service";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private notifier: NotificationService, private myFire : MyFireService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    const nickname = form.value.nickname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        userData.sendEmailVerification();

        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          nickname: nickname
        })
          .then(() => {
          this.notifier.display("success", "Verification email was sent to your email address.");
          firebase.auth().signOut();
        })
      }).catch((error) => {
      this.notifier.display("error", error.message);
    });
  }

}
