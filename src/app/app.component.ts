import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    const config = {
      apiKey: "AIzaSyC2E2mZW49OXg2l3p-O7W1fhonGlhmzwSI",
      authDomain: "wishit-d11d7.firebaseapp.com",
      databaseURL: "https://wishit-d11d7.firebaseio.com",
      projectId: "wishit-d11d7",
      storageBucket: "wishit-d11d7.appspot.com",
      messagingSenderId: "211506530222"
    };
    firebase.initializeApp(config);
  }

}
