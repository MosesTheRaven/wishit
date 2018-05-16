import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MyFireService} from "../shared/myfire.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent implements OnInit {

  wishlistsList: any = [];
  openedWishlist: any = {};
  isOpened: boolean;

  user: any = {};

  constructor(private userService: UserService, private myFire: MyFireService) {
  }

  ngOnInit() {
    this.isOpened = false;
    this.wishlistsList = [];
    this.user = this.userService.getProfile();

    firebase.database().ref('users/' + this.user.uid + '/shared')
      .on('child_added', (wishlistId) => {
        let wishlistSnapshot = {
          id: wishlistId.key,
          data: {},
          userName: "loading"
        };
        firebase.database().ref('wishlists/' + wishlistId.key)
          .once('value', (wishlistData) => {
            wishlistSnapshot.data = wishlistData.val();
            let items = [];
            let itemIndex = 0;
            firebase.database().ref('wishlists/' + wishlistId.key + '/items/')
              .on('child_added', (item)=>{
                items.push({'id' : item.key, 'value' : item.val(), 'index' : itemIndex});
                itemIndex++;
              });
            console.log(wishlistSnapshot);
            wishlistSnapshot.data['items'] = items;
            console.log(wishlistSnapshot);
            firebase.database().ref('users/' + wishlistData.val().userId)
              .once('value', (userDataSnapshot) => {
                wishlistSnapshot['userName'] = userDataSnapshot.val().nickname;
              })
              .then(() => {
                this.wishlistsList.push(wishlistSnapshot);
              })
          })
      });
  }

  resolveFriend(friendUid) {
    firebase.database().ref('users/' + friendUid)
      .once('value', (userDataSnapshot) => {
        return userDataSnapshot.val().nickname;
      })
  }

  openWishlist(wishlist) {
    console.log(wishlist);
    this.openedWishlist = wishlist;
    this.isOpened = true;
  }

  isWishlistOpened(){
    return this.isOpened;
  }


  // dorobit !!!
  removeReservation(item){
    firebase.database().ref('wishlists/' + this.openedWishlist.id + '/items/' + item.id)
      .update({'status' : "not yet reserved"})
      .then(()=>{
        this.openedWishlist.data.items[item.index].value.status = "not yet reserved";
      });
  }
  reserveItem(item){
    firebase.database().ref('wishlists/' + this.openedWishlist.id + '/items/' + item.id)
      .update({'status' : "reserved"})
      .then(()=>{
        this.openedWishlist.data.items[item.index].value.status = "reserved";
    })
  }
  confirmReservation(item){
    firebase.database().ref('wishlists/' + this.openedWishlist.id + '/items/' + item.id)
      .update({'status' : "bought"})
      .then(()=>{
        this.openedWishlist.data.items[item.index].value.status = "bought";
    })
  }
}


