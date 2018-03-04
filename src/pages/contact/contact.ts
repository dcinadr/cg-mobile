import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
  export class ContactPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  coinName: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openOverlayModal() {
    let modal = this.modalCtrl.create(ModalOverlayPage);
    modal.onDidDismiss(data => {
      this.createLineChart(data);
    });
    modal.present();
  }

  createLineChart(coin) {
    this.coinName = coin;
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      options: {
        scales: {
          yAxes: [
            {
              id: 'yAxis1',
              ticks: {
                steps: 10,
                stepValue: 10,
                beginAtZero: false
              },
              position: 'left',
              gridLines: {
                display: false
              }
            },
            {
              id: 'yAxis2',
              ticks: {
                steps: 10,
                stepValue: 10,
                beginAtZero: true
              },
              position: 'right',
              gridLines: {
                display: false
              }
            }
          ]
        }
      },
      type: 'bar',
      data: {
        labels: ["2/21", "2/22", "2/23", "2/24", "2/25", "2/26", "2/27"],
        datasets: [
          {
            label: "Price USD",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.8)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [9688.62, 9597.99, 10300, 10566.57, 10307.27, 10895.92, 11000],
            spanGaps: false,
            yAxisID: 'yAxis1',
            showLine: true,
            type: 'line'
          },
          {
            label: "Overall Sentiment",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(222,146,82,0.8)",
            borderColor: "rgba(222,146,82,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(222,146,82,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(222,146,82,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [.15, .75, .5, .4, .98, .2, .32],
            spanGaps: false,
            yAxisID: 'yAxis2',
            showLine: true
          }
        ]
      }

    });
  }

  ionViewDidLoad() {

    this.createLineChart('BTC');
  }
}

@Component({
  templateUrl: 'coinModal.html'
})
export class ModalOverlayPage {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
