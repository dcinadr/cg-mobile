import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  coins = [];

  constructor(public navCtrl: NavController) {
    firebase.initializeApp({
      apiKey: 'AIzaSyDG7JG_MkbMZsD1L9hAHfyiZ3VZ9nOXPFc',
      authDomain: 'cg-mobile-4e876.firebaseapp.com',
      projectId: 'cg-mobile-4e876'
    });

    let db = firebase.firestore();

    db.collection('coins')
      .onSnapshot(snapshot => {
        this.coins = [];
        snapshot.docs.forEach(doc => {
          this.coins.push(doc.data());
        });
      });
  }

}
