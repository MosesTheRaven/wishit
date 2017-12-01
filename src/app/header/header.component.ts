import {Component, OnInit, OnDestroy} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {MyFireService} from "../shared/myfire.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{


  isLoggedIn: boolean = false;
  nickname: string = "";
  uid: string = "";
  email: string = "";
  subscription: Subscription;


  constructor(private userService : UserService, private myFireService: MyFireService) {
    this.subscription = this.myFireService.getMessage().subscribe(message => { this.update(message); });

  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( userData =>{
      if(userData && userData.emailVerified){
        this.isLoggedIn = true;
        var user = this.userService.getProfile();
        this.nickname = user.nickname;
        this.email = user.email;
        this.uid = user.uid;

      }
      else{
        this.isLoggedIn = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut(){
    firebase.auth().signOut();
    this.userService.destroy();
  }
  update(message){
    this.nickname = message.nickname;
    this.uid = message.uid;
    this.email = message.email;
  }

}
