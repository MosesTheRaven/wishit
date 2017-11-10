import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../shared/notification.service";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private notifier: NotificationService, private myFire: MyFireService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    const nickname = form.value.nickname;
    const password = form.value.password;


    this.myFire.getUserFromDatabase(nickname)
      .then(userData => {
        var userDataVal = userData.val();
        if(userDataVal == null){
          var message = "There is no user registered under this nickname!";
          this.notifier.display('error', message);
        }
        else {
          firebase.auth().signInWithEmailAndPassword(userDataVal.email, password)
            .then(loginUserData => {
              if(loginUserData.emailVerified) {
                this.router.navigate(['', ]);
                return userDataVal;
              }
              else{
                const message = 'Your email is not yet verified!';
                this.notifier.display('error', message);
                firebase.auth().signOut();
              }
            })
            .catch(error => {
              this.notifier.display('error', error.message)
            })
        }
      })

  }
}
