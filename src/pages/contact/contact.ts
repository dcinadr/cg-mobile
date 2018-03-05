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
  chartData = {};
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.chartData = {
      coinName: 'BTC',
      labels: ["2/21", "2/22", "2/23", "2/24", "2/25", "2/26", "2/27"],
      dataSet1: {
        data: [9688.62, 9597.99, 10300, 10566.57, 10307.27, 10895.92, 11000]
      },
      dataSet2: {
        display: false,
        label: '',
        data: [],
        type: 'bar'
      }
    };
  }

  openCoinModal() {
    let modal = this.modalCtrl.create(ModalCoinPage);
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      this.createLineChart(this.chartData);
    });
    modal.present();
  }

  openOverlayModal() {
    let modal = this.modalCtrl.create(ModalOverlayPage);
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      let chartData: any = {};
      switch (data) {
        case 'sentiment':
          chartData.dataSet2 = {
            display: true,
            label: 'Average Sentiment',
            data: [0.8, 0.5, 0.6, 0.4, 0.5, 0.7, 0.6],
            type: 'bar'
          }
          break;  
      }
      this.chartData = Object.assign(this.chartData, chartData);
      this.createLineChart(this.chartData);
    });
    modal.present();
  }

  openPeriodModal() {
    let modal = this.modalCtrl.create(ModalPeriodPage);
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      this.createLineChart(this.chartData);
    });
    modal.present();
  }

  getLineChartConifgData(graphData) {
    let yAxesConfigData = [];
    yAxesConfigData.push({
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
    });
    let dataSetData = [];
    dataSetData.push({
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
      data: graphData.dataSet1.data,
      spanGaps: false,
      yAxisID: 'yAxis1',
      showLine: true,
      type: 'line'
    });
    if (graphData.dataSet2.display) {
      yAxesConfigData.push({
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
      });
      dataSetData.push({
        label: graphData.dataSet2.label,
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
        data: graphData.dataSet2.data,
        spanGaps: false,
        yAxisID: 'yAxis2',
        showLine: true
      });
    }

    let configData = {
      options: {
        scales: {
          yAxes: []
        }
      },
      type: graphData.dataSet2.type,
      data: {
        labels: graphData.labels,
        datasets: []
      }
    };

    configData.options.scales.yAxes = yAxesConfigData;
    configData.data.datasets = dataSetData;

    return configData;
  }

  createLineChart(graphData) {
    this.coinName = graphData.coinName;
    this.lineChart = new Chart(this.lineCanvas.nativeElement, this.getLineChartConifgData(graphData));
  }

  ionViewDidLoad() {

    this.createLineChart(this.chartData);
  }
}

@Component({
  templateUrl: 'coinModal.html'
})
export class ModalCoinPage {
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

@Component({
  templateUrl: 'overlayModal.html'
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

@Component({
  templateUrl: 'periodModal.html'
})
export class ModalPeriodPage {
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
