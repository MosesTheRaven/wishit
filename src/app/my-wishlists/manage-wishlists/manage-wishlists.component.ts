import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../../shared/user.service";
import {NotificationService} from "../../shared/notification.service";
import {NgForm} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";
import {MyFireService} from "../../shared/myfire.service";

@Component({
  selector: 'app-manage-wishlists',
  templateUrl: './manage-wishlists.component.html',
  styleUrls: ['./manage-wishlists.component.css']

})

export class ManageWishlistsComponent implements OnInit {

  wishlistList: any = [];
  user : any;
  editingWishlist : any = {};
  sharedWith : any = [];
  notSharedWith : any = [];
  editingWishlistBool : boolean;
  itemsList : any = [];
  today : any;


  constructor(private userService : UserService, private notificationService : NotificationService, private myFireService : MyFireService) {
    this.today = (new Date()).toISOString().substring(0,10);
  }

  ngOnInit() {
    this.editingWishlistBool = false;
    this.wishlistList = [];
    this.editingWishlist = {};
    this.user = this.userService.getProfile();
    firebase.database().ref('users/' + this.user.uid + '/wishlists')
      .on('child_added', (wishlist)=> {
        let wishlistSnapshot = {
          id : wishlist.key,
          data : {}
        };
        firebase.database().ref('wishlists/' + wishlist.key)
          .once('value', (wishlistData)=>{
            wishlistSnapshot.data = wishlistData.val();
          })
          .then(() => {
            this.wishlistList.push(wishlistSnapshot);
          })
      });
  }

  removeWishlist(wishlist){
    firebase.database().ref('users/' + this.user.uid + '/wishlists/' + wishlist.id)
      .remove()
      .then(()=>{
        firebase.database().ref('wishlists/' + wishlist.id)
          .remove()
          .then(()=>{
            let index = this.wishlistList.indexOf(wishlist);
            this.wishlistList.splice(index, 1);
          })
          .catch((error)=>{this.notificationService.display("error", error.message)})
      })
      .catch((error)=>{this.notificationService.display("error", error.message)})
  }
  editWishlist(wishlist){
    this.editingWishlist = wishlist;
    this.notSharedWith = [];
    this.sharedWith = [];

    let friendsRef = 'users/' + this.user.uid + '/friends/';
    let sharedWithRef = 'wishlists/' + wishlist.id + '/friends';

    this.editingWishlistBool = true;

    Object.getOwnPropertyNames(wishlist.data.friends).forEach(value => {
      this.myFireService.getUserFromDatabase(value)
        .then((userDataSnapshot) =>{
          this.sharedWith.push(userDataSnapshot.val());
        })
    });
    firebase.database().ref(friendsRef)
      .on('child_added', (friendIdDataSnapshot)=>{
        this.myFireService.getUserFromDatabase(friendIdDataSnapshot.key)
          .then((friendDataSnapshot)=>{
            let found = false;
            Object.getOwnPropertyNames(wishlist.data.friends).forEach(value => {
              if(value == friendDataSnapshot.val().uid) {
                found = true;
              }
            });
            if(!found) this.notSharedWith.push(friendDataSnapshot.val());
          })
      });

    Object.values(wishlist.data.items).forEach((value => {
      this.itemsList.push({
        "itemName" : value.itemName,
        "itemDescription" : value.itemDescription
      })
    }))
  }
  addItem(item : NgForm) {
    if (item.value.itemName != "" && item.value.itemDescription != "") {
      this.itemsList.push({
        "itemName": item.value.itemName,
        "itemDescription": item.value.itemDescription
      });
      item.value.itemName = "";
      item.value.itemDescription = "";
    }
    else this.notificationService.display("error", "Item name or description are set incorrectly");
  }


  removeItemFromItemsList(item){
    this.itemsList.splice(this.itemsList.indexOf(item), 1);
  }
  removeFriendFromShared(friend){
    let index = this.sharedWith.indexOf(friend);
    this.notSharedWith.push(friend);
    this.sharedWith.splice(index, 1);
  }
  addFriendToSharedWith(friend){
    let index = this.notSharedWith.indexOf(friend);
    this.sharedWith.push(friend);
    this.notSharedWith.splice(index, 1);
  }
  updateWishlist(form : NgForm){
    console.log (this.editingWishlist);
    let today = new Date(Number(this.today.substring(0,4)), Number(this.today.substring(5,7)) -1, Number(this.today.substring(8, 10)));
    let wishlistDate =
      new Date(
        Number(form.value.expDate.toString().substring(0,4)),
        Number(form.value.expDate.toString().substring(5,7) -1),
        Number(form.value.expDate.toString().substring(8,10)));
    if (wishlistDate > today && form.value.wishlistName != "" ){

      // update wishlist name and expDate
      let update = {
        expDate : form.value.expDate,
        wishlistName : form.value.wishlistName
      };
      firebase.database().ref('wishlists/' + this.editingWishlist.id + '/')
        .update(update);

      //update sharing options
      firebase.database().ref('wishlists/' + this.editingWishlist.id + '/friends')
        .remove()
        .then(()=>{
          this.sharedWith.forEach((friend)=>{
            firebase.database().ref('wishlists/' + this.editingWishlist.id + '/friends/')
              .update({[friend.uid] : true,})
          });
          this.notSharedWith.forEach((friend)=>{
            firebase.database().ref('users/' + friend.uid + '/shared/' + this.editingWishlist.id)
              .remove()
              .then(()=>{
                this.notSharedWith.forEach((friend)=>{
                  firebase.database().ref('users/' + friend.uid + '/shared/' + this.editingWishlist.id)
                    .remove();
                })
              })
          })
          this.sharedWith.forEach((friend)=>{
            firebase.database().ref('users/'+ friend.uid + '/shared/' + this.editingWishlist.id)
              .update({[this.editingWishlist.id] : true,})
          })
        });

      //update items
      firebase.database().ref('wishlists/' + this.editingWishlist.id + '/items')
        .remove()
      this.itemsList.forEach((item) =>{
        firebase.database().ref('wishlists/' + this.editingWishlist.id + '/items/')
          .push(
            {
              'itemName' : item.itemName,
              'itemDescription' : item.itemDescription,
              'status' : "not reserved yet"
            })
          .then(()=>{
            this.ngOnInit();
            this.notificationService.display("success", "Wishlist was successfully updated!");
          });
      })
    }
    else
      this.notificationService.display("error", "Wishlist name or date are incorrectly set!");
  }
  isEditingWishlistBool(){
    return this.editingWishlistBool;
  }
  publishWishlist(wishlist){
    firebase.database().ref('wishlists/' + wishlist.id)
      .update({'status' : 'published'})
      .then(()=>{
        firebase.database().ref('wishlists/' + wishlist.id + '/friends/')
          .on('child_added', (friend)=>{
            firebase.database().ref('users/' + friend.key + '/notifications/')
              .push({'type' : 'A friend shared a wishlist with you', 'uid' : wishlist.id})
              .then(()=>{
                this.ngOnInit();
              })
            console.log(friend.key);
          })
    });
  }
}
