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

    this.myFire.getUserFromDatabase(nickname)
      .then(alreadyExistingUserData => {
        var alreadyExistingUserDataVal = alreadyExistingUserData.val();
        if(alreadyExistingUserDataVal == null){
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userData => {
              userData.sendEmailVerification();


              const message = 'A verification e-mail has been sent to your e-mail address. Verify your account.';
              this.notifier.display('success', message);


              return firebase.database().ref('users/' + nickname).set({
                email: email,
                registrationDate: new Date().toString(),
              })
                .then(()=>{
                  firebase.auth().signOut();
                });
            })
            .catch(error => {
              this.notifier.display('error', error.message);
            });
        }
        else {
          var message = "Username is already taken";
          this.notifier.display('error', message);
        }

      })


  }

}
