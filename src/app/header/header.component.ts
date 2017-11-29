import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  nickname: string = "";
  uid: string = "";
  email: string = "";


  constructor(private userService : UserService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( userData =>{
      if(userData && userData.emailVerified){
        this.isLoggedIn = true;
        console.log(this.userService.getProfile().nickname);
        this.nickname = this.userService.getProfile().nickname;
        this.email = this.userService.getProfile().email;
        this.uid = this.userService.getProfile().uid;

      }
      else{
        this.isLoggedIn = false;
      }
    })
  }
  logOut(){
    firebase.auth().signOut();
    this.userService.destroy();
  }

}
