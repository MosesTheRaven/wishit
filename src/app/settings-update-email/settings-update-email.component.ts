import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../shared/notification.service";
import {MyFireService} from "../shared/myfire.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-settings-update-email',
  templateUrl: './settings-update-email.component.html',
  styleUrls: ['./settings-update-email.component.css']
})
export class SettingsUpdateEmailComponent implements OnInit {

  constructor(private notifier : NotificationService, private myFire : MyFireService, private userService : UserService) { }

  ngOnInit() {
  }

  setEmail(form: NgForm){
    var password = form.value.emailPassword;
    var email = form.value.email;
    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    )
    user.reauthenticateWithCredential(credentials)
      .then(()=>{
        user.updateEmail(form.value.email)
          .then(() =>{
            this.notifier.display("success", "Email address has been changed");
            this.myFire.updateUserEmail(user.uid, email);
            return this.myFire.getUserFromDatabase(user.uid)


          })
          .then((userDataFromDatabase) =>{
            this.userService.destroy();
            this.userService.set(userDataFromDatabase);
            //tu by sa malo oznamit hlavicke, ze sa


          })
          .catch((error)=>{
            this.notifier.display("error", error.message)

            console.log(error.message);
          })
      })
      .catch((error)=>{
        this.notifier.display("error", "Your password is wrong");

        console.log(error.message);
      })
  }
}
