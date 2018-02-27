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

    let currFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

    db.collection('coins')
      .onSnapshot(snapshot => {
        this.coins = [];
        snapshot.docs.forEach(doc => {
          let data = doc.data();
          data.price_usd = currFormatter.format(data.price_usd);
          data.point_change_24h = currFormatter.format(data.point_change_24h);
          this.coins.push(data);
        });
      });
  }

}
