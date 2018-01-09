import {Component, OnInit, Input} from '@angular/core';
import {MyFireService} from "../shared/myfire.service";

@Component({
  selector: 'app-friend-action',
  templateUrl: './friend-action.component.html',
  styleUrls: ['./friend-action.component.css']
})
export class FriendActionComponent implements OnInit {
  @Input() friend : any = {} ;
  friendData : any = {};

  constructor(private myFire : MyFireService) { }

  ngOnInit() {
    console.log(this.friend);
    this.myFire.getUserFromDatabase(this.friend.key)
      .then((userData)=>{
        this.friendData = {
          name : [userData.val().nickname],
          status : [this.friend.value]
        }
      })
  }
}
