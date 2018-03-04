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

    db.collection('mobile')
      .onSnapshot(snapshot => {
        this.coins = [];
        let data = snapshot.docs.filter(x => x.id == 'coins')[0].data();
        data.all.forEach(coin => {
          console.log(data);
          coin.price_usd = currFormatter.format(coin.price_usd);
          coin.color = coin.point_change_24h < 0 ? '#f53d3d' : '#32db64';
          coin.trending_icon = coin.point_change_24h < 0 ? 'trending-down' : 'trending-up';
          coin.color_name = coin.point_change_24h < 0 ? 'danger' : 'secondary';
          coin.point_change_24h = currFormatter.format(coin.point_change_24h);
          this.coins.push(coin);
        });
      });
  }

}
