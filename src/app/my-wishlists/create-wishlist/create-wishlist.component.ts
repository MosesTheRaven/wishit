import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";
import {UserService} from "../../shared/user.service";
import {NotificationService} from "../../shared/notification.service";
import {ThingsResolveService} from "../../shared/thingReslove";

export enum wishlistStatus{
  Creating,
  Editing,
  Sharing
}

@Component({
  selector: 'app-create-wishlist',
  templateUrl: './create-wishlist.component.html',
  styleUrls: ['./create-wishlist.component.css']
})

export class CreateWishlistComponent implements OnInit {

  today: string = "";
  status: wishlistStatus;
  wishlistId: any;
  setWishlistName: string = "";
  itemsList : any = [];

  constructor(private myFire : MyFireService,
              private userService : UserService,
              private notificationService : NotificationService,
              private thingsResolveService : ThingsResolveService) {
    this.today = (new Date()).toISOString().substring(0,10);
    this.status = wishlistStatus.Creating;
    this.itemsList
    /*
    this.today = date.getFullYear().toString() + "-";
    if (date.getMonth()+1 < 10) this.today += "0";
    this.today += (date.getMonth()+1).toString() + "-";

    if (date.getDate() < 10) this.today += "0";
    this.today += date.getDate().toString();
    */
  }
  ifCreating(status){
    return status == wishlistStatus.Creating;
  }
  ifEditing(status){
    return status == wishlistStatus.Editing;
  }
  ifSharing(status){
    return status == wishlistStatus.Sharing;
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
    if (wishlistDate > today && form.value.wishlistnam != "" ){
      let uid = this.userService.getProfile().uid;
      let wishlist = {
        "expDate" : form.value.expDate,
        "wishlistName" : form.value.wishlistName,
        "items" : {},
        "status" : "unpublished",
        "userId" : uid
      };
      let wishlistRef = firebase.database().ref('wishlists/');
      let wishlistKey = wishlistRef.push(wishlist);
      this.wishlistId = wishlistKey.key;


      // this should be in a myfireservice
      firebase.database().ref("users/" + uid + "/wishlists/").update({[wishlistKey.key] : true})
        .then(() => {
          this.notificationService.display("success", "Wishlist successfully added");
          this.fillItems(wishlist);
        })
        .catch((error) => {this.notificationService.display("error", error.message())});

    }
    else{
      if(wishlistDate <= today){
        this.notificationService.display("error", "The date is not a future date");
      }
      else{
        this.notificationService.display("error", "Wrong form input - check wishlist name and expiration date!");
      }
    }
  }

  fillItems(wishlist){
    this.status = wishlistStatus.Editing;
    this.setWishlistName = wishlist.wishlistName;
    this.itemsList = this.thingsResolveService.itemsResolve(wishlist);
  }
  addItem(form: NgForm){
    console.log(form.value.itemDescription);
    firebase.database().ref('wishlists/' + this.wishlistId + '/items/')
      .update({
        "itemName" : form.value.itemName,
        "itemDescription" : form.value.itemDescription,
        "status" : "not yet reserved"
      })
  }
}
