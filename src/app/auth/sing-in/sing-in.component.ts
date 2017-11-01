import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from 'firebase';
import {register} from "ts-node/dist";
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    const nickname = form.value.nickname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.sendEmailVerification();


        const message = 'A verification e-mail has been sent to your e-mail address. Verify your account.';
        this.notifier.display('success', message);


        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          nickname: nickname
        })
          .then(()=>{
            //to be resolved - doesnt break the building process
            firebase.auth().signOut();
          });
      })
      .catch(error => {
        this.notifier.display('error', error.message);
      });
  }

}
