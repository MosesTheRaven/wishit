import {UserService} from "./user.service";
import {MyFireService} from "./myfire.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ThingsResolveService{

  constructor (private  userService : UserService, private myFire : MyFireService) {}


  itemsResolve(wishlist){
    let itemsResolved: any = [];
    console.log("changeStatus");
    this.myFire.getWishlistItems(wishlist.id)
      .on('child_added', data => {
          console.log(data.val());
          itemsResolved.push({
            id: data.key,
            itemName: data.val().itemName,
            itemStatus: data.val().status,
            itemDescription: data.val().itemDescription
          })
    });

    return itemsResolved;
  }

}
