import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../shared/notification.service";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private notifier: NotificationService, private myFire: MyFireService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.emailVerified) {
          return this.myFire.getUserFromDatabase(userData.uid);
        } else {
          const message = 'Your email is not yet verified';
          this.notifier.display('error', message);

          firebase.auth().signOut();
        }
      })
      .then(userDataFromDatabase => {
        if (userDataFromDatabase) {
          this.notifier.display("success", "Successfully logged in.");
          this.userService.set(userDataFromDatabase);

          this.router.navigate(['', ]);
        }
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
  }
}
