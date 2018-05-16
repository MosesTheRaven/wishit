import * as firebase from 'firebase';
import {Subject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class MyFireService {

  private subject = new Subject<any>();


  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getUserFromDatabase(uid) {

    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value');
  }

  updateUserEmail(uid, email){
    firebase.database().ref('users/' + uid).update({
      email: email,
    })
      .then(() => {
        this.getUserFromDatabase(uid)
          .then((userDataFromDatabase) => {
            this.subject.next(userDataFromDatabase.val());
          })
      })
  }

   updateUserNickname(uid, nickname, notifier) {
    firebase.database().ref('users/' + uid).update({
      nickname: nickname,
    })
      .then(() => {
        this.getUserFromDatabase(uid)
           .then((userDataFromDatabase) => {
             this.subject.next(userDataFromDatabase.val());
           })
      })
      .then(() => {
        notifier.display("success", "Nickname successfully changed");
      })
      .catch((error) => {
        notifier.display("error", error.message);
      });
  }

  addUserAsFriend(userName, notifier, userService){
    if(userName == userService.getProfile().nickname) notifier.display("error", "Unable to add self as friend!");
    else{

      var query = firebase.database().ref('users');
      var friendUid;
      query.once("value") //returns snapshot of all Users
        .then(function(usersSnapshot) {
          usersSnapshot.forEach(function(concreteUserSnapshot){
            if(concreteUserSnapshot.val().nickname == userName) {
              friendUid = concreteUserSnapshot.val().uid;
              return true;
            }
          })
          if(friendUid){


            firebase.database().ref('users/' + friendUid+ '/friends/' + userService.getProfile().uid).once('value')
              .then((data) => {

                if(data.val()) {
                  notifier.display("error", "User already added as friend or awaiting for friendship confirmation!");
                }
                else{
                  firebase.database().ref('users/' + friendUid+ '/friends')
                    .update({[userService.getProfile().uid ]: "pending"})
                    .then(()=>{
                      firebase.database().ref('users/' + friendUid+ '/notifications')
                        .push({'type' : 'New friend request!', 'uid' : userService.getProfile().uid})
                        .then(()=>{
                          notifier.display("success", "Friend request sent. Awaiting confirmation!");
                        })
                    });
                }
              });

          }
          else notifier.display("error", "Such user does not exist!");
        })

    }

  }

  getUserFriends(uid){
    return firebase.database().ref('users/' + uid + '/friends');
  }
  getWishlistItems(wid){
    return firebase.database().ref('wishlists/' + wid + '/items');
  }

  confirmUser(friendUid, myUid){
    firebase.database().ref('users/' + friendUid + '/notifications/')
      .push({'type' : 'A friend accepted your request!', 'uid' : myUid})
      .then(()=>{
        firebase.database().ref('users/' + myUid + '/friends/').update({[friendUid] : "accepted"})
          .then(()=>{
            return firebase.database().ref('users/' + friendUid + '/friends/').update({[myUid] : "accepted"});
          })
      });
  }

  removeUserFromFriends(friendUid, myUid){
    firebase.database().ref('users/' + friendUid + '/friends/' + myUid).remove()
      .then(()=>{
        return firebase.database().ref('users/' + myUid + '/friends/' + friendUid).remove();
      })
  }
}
