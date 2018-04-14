import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {MyFireService} from "../../shared/myfire.service";
import {UserService} from "../../shared/user.service";
import {NotificationService} from "../../shared/notification.service";
import {ThingsResolveService} from "../../shared/thingReslove";
import {FriendResolveService} from "../../shared/friendResolve";

export enum WishlistStatus{
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
  status: WishlistStatus;
  wishlistId: any;
  setWishlistName: string = "";
  itemsList : any = [];
  friendsList : any = [];
  sharedWithList: any = [];

  constructor(private myFire : MyFireService,
              private userService : UserService,
              private notificationService : NotificationService,
              private thingsResolveService : ThingsResolveService,
              private friendResolveService : FriendResolveService) {

    this.today = (new Date()).toISOString().substring(0,10);
    this.status = WishlistStatus.Creating;

    this.friendsList = this.friendResolveService.friendResolve();

  }
  ifCreating(status){
    return status == WishlistStatus.Creating;
  }
  ifEditing(status){
    return status == WishlistStatus.Editing;
  }
  ifSharing(status){
    return status == WishlistStatus.Sharing;
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
          this.changeStatus(wishlist);
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

  changeStatus(wishlist){
    this.status = WishlistStatus.Editing;
    this.setWishlistName = wishlist.wishlistName;
  }
  addItem(form: NgForm) {
    if(form.value.itemName == "" || form.value.itemDescription == ""){
      this.notificationService.display("error", "Item information not sufficient enough! Fill in item information to continue");
    }
    else {
      let item = {
        itemName: form.value.itemName,
        itemDescription: form.value.itemDescription,
        status: "not yet reserved",
      };

      let itemKey = firebase.database().ref('wishlists/' + this.wishlistId + '/items')
        .push(item);


      let editedItem = {
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        status: item.status,
        key: itemKey.key,
      }
      this.itemsList.push(editedItem);
    }
  }
  removeItemFromItemsList(item){
    firebase.database().ref('wishlists/' + this.wishlistId + '/items').child(item.key).remove()
      .then(() => {
        let index = this.itemsList.indexOf(item);
        this.itemsList.splice(index, 1);
      })
  }
  setSharing(){
    if(this.itemsList.length != 0){
      this.status = WishlistStatus.Sharing;
    }
    else this.notificationService.display("error", "There are no items added! Add an item to continue!");

  }
  addFriend(friend){
    console.log("add", friend);
    this.sharedWithList.push(friend);
    firebase.database().ref('wishlists/' + this.wishlistId + '/friends/').update({[friend.id] : true,})
    let index = this.friendsList.indexOf(friend);
    this.friendsList.splice(index, 1);
  }
  deleteFriend(friend){
    console.log("delete", friend);
    let index = this.sharedWithList.indexOf(friend);
    this.sharedWithList.splice(index, 1);

    firebase.database().ref('wishlists/' + this.wishlistId + '/friends/' + friend.id).remove();

    this.friendsList.push(friend);
  }
}
