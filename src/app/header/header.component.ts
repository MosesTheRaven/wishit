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
  currentNickname: string = "currentNickname";

  constructor(private userService : UserService) { }

  ngOnInit() {

    this.userService.statusChange.subscribe( userData =>{
      if(userData){
        this.currentNickname = userData.nickname;
      }
      else{
        this.currentNickname = "";
      }
    })

    firebase.auth().onAuthStateChanged( userData =>{
      if(userData && userData.emailVerified){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    })
  }
  logOut(){
    firebase.auth().signOut();
  }

}
