import {Component, OnInit, OnDestroy} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {MyFireService} from "../shared/myfire.service";
import {Subscription} from "rxjs";
import {LogInComponent} from "../auth/log-in/log-in.component";

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
  userDataUpdateSubscription: Subscription;
  loginSubscription: Subscription;
  notificationList : any = [];


  constructor(private userService : UserService, private myFireService: MyFireService
    //, private loginComponent : LogInComponent
   )
    {
    this.userDataUpdateSubscription = this.myFireService.getMessage().subscribe(message => {
      this.update(message);
      this.userService.set(message);
    });
    /*
    this.loginSubscription = this.loginComponent.getMessage().subscribe(message =>{
     this.update(message);
     })

     */
 }

  ngOnInit() {
    this.userService.statusChange.subscribe( userData =>{
      if(userData){
        const user = userData.val();
        this.nickname = user.nickname;
        this.email = user.email;
        this.uid = user.uid;
        this.isLoggedIn = true;

        firebase.database().ref('users/' + user.uid + '/notifications/')
          .on('child_added', (notification)=>{
            this.notificationList.push(notification.val());
          })
      } else{
        this.nickname = "";
        this.email = "";
        this.uid = "";
      }
    });

    firebase.auth().onAuthStateChanged( userData =>{
      if(userData && userData.emailVerified){
        const user = this.userService.getProfile();
        if(user){
          this.nickname = user.nickname;
          this.email = user.email;
          this.uid = user.uid;
          this.isLoggedIn = true;

          firebase.database().ref('users/' + user.uid + '/notifications/')
            .on('child_added', (notification)=> {
              this.notificationList.push(notification.val());
            })
        }
      }
      else{
        this.isLoggedIn = false;
        this.userService.destroy();
      }
    })
  }

  ngOnDestroy(): void {
    this.userDataUpdateSubscription.unsubscribe();
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
