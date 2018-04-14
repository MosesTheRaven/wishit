import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-manage-wishlists',
  templateUrl: './manage-wishlists.component.html',
  styleUrls: ['./manage-wishlists.component.css']
})
export class ManageWishlistsComponent implements OnInit {

  wishListList: any = [];

  constructor(private userService : UserService) {

  }

  ngOnInit() {
    let user = this.userService.getProfile();
    let wishlistIds : any = [];
    firebase.database().ref('users/' + user.uid + '/wishlists')
      .on('child_added', (wishlist)=>{
        firebase.database().ref('wishlists/' + wishlist.key).
        on('value',(wishlistData)=>{ this.wishListList.push({[wishlist.key] : [wishlistData.val()]})});
      })
  }

}
