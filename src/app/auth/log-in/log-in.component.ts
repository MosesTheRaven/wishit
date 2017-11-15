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

  constructor(private notifier: NotificationService, private myFire: MyFireService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm){
    const nickname = form.value.nickname;
    const password = form.value.password;

  /*
  this function first checks if there is a user with the nickname user inserted
   */
    this.myFire.getUserFromDatabase(nickname)
      .then(userData => {
        var userDataVal = userData.val();
        /*
        there is no such user
         */
        if(userDataVal == null){
          var message = "There is no user registered under this nickname!";
          this.notifier.display('error', message);
        }
        /*
        there is such user
         */
        else {
          firebase.auth().signInWithEmailAndPassword(userDataVal.email, password) // so we log him in
            .then(loginUserData => {
              if(loginUserData.emailVerified) {
                //notify him about successful login
                this.notifier.display('success', "Successfully logged in");
                this.router.navigate(['', ]);
                //and we return userData
                return userDataVal;
              }
              else{
                const message = 'Your email is not yet verified!';
                this.notifier.display('error', message);
                firebase.auth().signOut();
              }
            })
            .then(userDataFromDatabase => {
              if(userDataFromDatabase){
                this.userService.set(userDataFromDatabase);

              }
            })

            .catch(error => {
              this.notifier.display('error', error.message)
            })
        }
      })

  }
}
