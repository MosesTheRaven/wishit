import * as firebase from 'firebase';
import {Subject, Observable} from "rxjs";

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


  }

   updateUserNickname(uid, nickname) {
    firebase.database().ref('users/' + uid).update({
      nickname: nickname,
    })
      .then(() => {
        this.getUserFromDatabase(uid)
           .then((userDataFromDatabase) => {
             this.subject.next(userDataFromDatabase.val());
           })
      });
  }
}
