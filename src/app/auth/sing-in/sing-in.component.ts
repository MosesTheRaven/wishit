import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from 'firebase';
import {register} from "ts-node/dist";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    const nickname = form.value.nickname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (userData) {
        userData.sendEmailVerification();

        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          nickname: nickname
        }).then(function() {
          //to be resolved - doesnt break the building process
            firebase.auth().signOut();
          })

      }).catch(function (error) {
        console.log(error);
      });
  }

}
