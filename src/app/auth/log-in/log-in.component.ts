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
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if(userData.emailVerified){
          return this.myFire.getUserFromDatabase(userData.uid);
        } else {
          const message = 'Your email is not yet verified';
          this.notifier.display('error', message);

          firebase.auth().signOut();
        }
      })
      .then(userDataFromDatabase => {
        if(userDataFromDatabase) {
          
        }
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
  }
}
