import * as firebase from 'firebase';

export class MyFireService {

  getUserFromDatabase(nickname) {

    const ref = firebase.database().ref('users/' + nickname);
    return ref.once('value');
  }
}
