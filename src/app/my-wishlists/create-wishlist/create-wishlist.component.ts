import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";
import {UserService} from "../../shared/user.service";
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-create-wishlist',
  templateUrl: './create-wishlist.component.html',
  styleUrls: ['./create-wishlist.component.css']
})
export class CreateWishlistComponent implements OnInit {

  today: string = "bu";

  constructor(private myFire : MyFireService, private userService : UserService, private notificationService : NotificationService) {
    this.today = (new Date()).toISOString().substring(0,10);

    /*
    this.today = date.getFullYear().toString() + "-";
    if (date.getMonth()+1 < 10) this.today += "0";
    this.today += (date.getMonth()+1).toString() + "-";

    if (date.getDate() < 10) this.today += "0";
    this.today += date.getDate().toString();
    */
  }

  ngOnInit() {

  }
  createWishlist(form: NgForm){
    let today = new Date(Number(this.today.substring(0,4)), Number(this.today.substring(5,7)) -1, Number(this.today.substring(8, 10)));
    let wishlistDate =
      new Date(
        Number(form.value.expDate.toString().substring(0,4)),
        Number(form.value.expDate.toString().substring(5,7) -1),
        Number(form.value.expDate.toString().substring(8,10)));
    if (wishlistDate <= today){
      this.notificationService.display("error", "The date is not a future date");
    }
    else{
      let uid = this.userService.getProfile().uid;
      let wishlist = {
        "expDate" : form.value.expDate,
        "wishlistName" : form.value.wishlistName,
        "friends" : {},
        "items" : {},
        "status" : "unpublished",
        "userId" : uid
      };
      let wishlistRef = firebase.database().ref('wishlists/');
      let wishlistKey = wishlistRef.push(wishlist);

      firebase.database().ref("users/" + uid + "/wishlists/").update({[wishlistKey.key] : true})
        .then(() => {this.notificationService.display("success", "Wishlist successfully added")})
        .catch((error) => {this.notificationService.display("error", error.message())});

    }
  }
}
