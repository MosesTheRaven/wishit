import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../shared/notification.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-settings-update-password',
  templateUrl: './settings-update-password.component.html',
  styleUrls: ['./settings-update-password.component.css']
})
export class SettingsUpdatePasswordComponent implements OnInit {

  constructor(private notifier : NotificationService) { }

  ngOnInit() {
  }

  changePassword(form: NgForm){
    var newPassword = form.value.newPassword;
    var oldPassword = form.value.oldPassword;

    var user = firebase.auth().currentUser;

    // Prompt the user to re-provide their sign-in credentials
    var credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    user.reauthenticateWithCredential(credentials)
      .then(() => {
        user.updatePassword(newPassword)
          .then(() => {
            this.notifier.display("success", "Password successfully changed");
          })
          .catch((error) => {
            this.notifier.display("error", error.message);
          })
      })
      .catch((error) => {
        this.notifier.display("error", "Your old password is wrong: ");
      });

  }
}
