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
  chartData: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.chartData = {
      coinName: 'BTC',
      overlay: '',
      period: '7d',
      labels: ["2/21", "", "2/22", "", "2/23", "", "2/24", "", "2/25", "", "2/26", "", "2/27", ""],
      dataSet1: {
        data: [10305.56, 10570, 10940, 10435.01, 10390.01, 10840.01, 10902.85, 11000, 11275, 11432.5, 11134.13, 11469.9, 11480.04, 11377.54]
      },
      dataSet2: {
        display: false,
        label: '',
        data: [],
        type: 'bar',
        yAxisID: 'yAxis2'
      }
    };
  }

  openCoinModal() {
    let modal = this.modalCtrl.create(ModalCoinPage);
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      this.chartData.coinName = data;
      let chartData = this.getData2(this.chartData.coinName, this.chartData.overlay, this.chartData.period);
      this.chartData = Object.assign(this.chartData, chartData);
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
      this.chartData.overlay = data;
      let chartData = this.getData2(this.chartData.coinName, this.chartData.overlay, this.chartData.period);
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
      this.chartData.period = data;
      let chartData = this.getData2(this.chartData.coinName, this.chartData.overlay, this.chartData.period);
      this.chartData = Object.assign(this.chartData, chartData);
      this.createLineChart(this.chartData);
    });
    modal.present();
  }

  getData2(coin, overlay, period) {
    let chartData: any = {};
    chartData.labels = period == '7d' ? ["2/21", "", "2/22", "", "2/23", "", "2/24", "", "2/25", "", "2/26", "", "2/27", ""] : period == '3d' ? ["2/25", "", "", "", "", "", "2/26", "", "", "", "", "", "2/27"] : ["10pm", "", "6pm", "", "2pm", "", "10am", "", "6am", "", "2am"];  
    if (coin == 'BTC') {
      chartData.dataSet1 = {
        data: period == '7d' ? [10305.56, 10570, 10940, 10435.01, 10390.01, 10840.01, 10902.85, 11000, 11275, 11432.5, 11134.13, 11469.9, 11480.04, 11377.54] : period == '3d' ? [11305.04, 11275, 11488.89, 11432.5, 11199.99, 11134.13, 11129, 11469.9, 11506, 11480.04, 11481.97, 11377.54, 11469.9] : [11448.88, 11497.01, 11555.49, 11505.99, 11506, 11506.84, 11459, 11480.04, 11486.88, 11479.12, 11481.97],
      };
      switch (overlay) {
        case 'sentiment':
          chartData.dataSet2 = {
            display: true,
            label: 'Average Sentiment',
            data: period == '7d' ? [0.8, 0.5, -0.3, 0.1, 0.2, 0.02, -0.05, 0.4, -0.6, 0.1, -0.08, 0.03, 0.2, 0.1] : period == '3d' ? [0.6, 0.1, -0.13, -0.43, -0.25, 0.14, 0.7, 0.6, -0.21, 0.02, 0.036, -0.07, 0.2] : [0.46, 0.32, -0.5, 0.23, 0.12, -0.04, 0.6, 0.17, -0.1, -0.04, 0.1],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        case 'cgValue':
          chartData.dataSet2 = {
            display: true,
            label: 'CoinGenius Value',
            data: period == '7d' ? [10350, 10790, 10622, 10412, 10555, 10820, 11200, 11175, 11150, 11140, 11180, 11210, 11290, 11350] : period == '3d' ? [11290, 11385, 11400, 11260, 11113, 10900, 11150, 11198, 11230, 11175, 11321, 11350, 11490] : [11425, 11450, 11512, 11502, 11485, 11472, 11486, 11475, 11468, 11482, 11481, 11489],
            type: 'line',
            yAxisID: 'yAxis1'
          };
          break;
        case 'stability':
          chartData.dataSet2 = {
            display: true,
            label: 'Stability Rating',
            data: period == '7d' ? [8.21, 8.1, 7.21, 6.3, 6.8, 7.1, 7.2, 7.6, 8, 8.5, 7.8, 7.9, 8.1, 7.2] : period == '3d' ? [7.6, 7.7, 8.6, 7.6, 7.1, 6.3, 5.9, 6.4, 7.0, 6.8, 7.2, 7.4, 7.5] : [7, 7.2, 7.5, 7.1, 6.9, 6.6, 6.8, 7, 7.2, 7.3, 7.1, 7.2],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        default:
          chartData.dataSet2 = {
            display: false,
            label: '',
            data: [],
            type: 'bar',
            yAxisID: 'yAxis2'
          }
      }
    }
    if (coin == 'ETH') {
      chartData.dataSet1 = {
        data: period == '7d' ? [874.88, 867.33, 883.23, 866.37, 849.99, 867.78, 868.74, 859.1, 854.31, 863.1, 854.34, 848.21, 861.74, 864.99] : period == '3d' ? [11305.04, 11275, 11488.89, 11432.5, 11199.99, 11134.13, 11129, 11469.9, 11506, 11480.04, 11481.97, 11377.54, 11469.9] : [11448.88, 11497.01, 11555.49, 11505.99, 11506, 11506.84, 11459, 11480.04, 11486.88, 11479.12, 11481.97],
      };
      switch (overlay) {
        case 'sentiment':
          chartData.dataSet2 = {
            display: true,
            label: 'Average Sentiment',
            data: period == '7d' ? [0.8, 0.5, 0.6, 0.4, -0.5, 0.7, 0.6, -0.8, 0.5, 0.6, -0.4, 0.5, 0.7, -0.6] : period == '3d' ? [0.8, 0.6, 0.5, 0.4, 0.6, 0.8, 0.8, 0.6, 0.5, 0.4, 0.6, 0.8, 0.2] : [0.8, 0.6, 0.5, 0.4, 0.1, 0.8, 0.8, 0.6, 0.5, 0.4, 0.1],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        case 'cgValue':
          chartData.dataSet2 = {
            display: true,
            label: 'CoinGenius Value',
            data: period == '7d' ? [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350, 10200, 10900] : period == '3d' ? [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350, 10200] : [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350],
            type: 'line',
            yAxisID: 'yAxis1'
          };
          break;
        case 'stability':
          chartData.dataSet2 = {
            display: true,
            label: 'Stability Rating',
            data: period == '7d' ? [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8, 8.1, 8.5] : period == '3d' ? [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8, 8.1] : [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        default:
          chartData.dataSet2 = {
            display: false,
            label: '',
            data: [],
            type: 'bar',
            yAxisID: 'yAxis2'
          }
      }
    }
    if (coin == 'LTC') {
      chartData.dataSet1 = { data: [2000, 9597.99, 10300, 10566.57, 10307.27, 10895.92, 11000, 9688.62, 9597.99, 10300, 10566.57, 10307.27, 10895.92, 11000] };
      switch (overlay) {
        case 'sentiment':
          chartData.dataSet2 = {
            display: true,
            label: 'Average Sentiment',
            data: period == '7d' ? [0.8, 0.5, 0.6, 0.4, -0.5, 0.7, 0.6, -0.8, 0.5, 0.6, -0.4, 0.5, 0.7, -0.6] : period == '3d' ? [0.8, 0.6, 0.5, 0.4, 0.6, 0.8, 0.8, 0.6, 0.5, 0.4, 0.6, 0.8, 0.2] : [0.8, 0.6, 0.5, 0.4, 0.1, 0.8, 0.8, 0.6, 0.5, 0.4, 0.1],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        case 'cgValue':
          chartData.dataSet2 = {
            display: true,
            label: 'CoinGenius Value',
            data: period == '7d' ? [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350, 10200, 10900] : period == '3d' ? [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350, 10200] : [9600, 9610, 10100, 10400, 10350, 10200, 10900, 9600, 9610, 10100, 10400, 10350],
            type: 'line',
            yAxisID: 'yAxis1'
          };
          break;
        case 'stability':
          chartData.dataSet2 = {
            display: true,
            label: 'Stability Rating',
            data: period == '7d' ? [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8, 8.1, 8.5] : period == '3d' ? [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8, 8.1] : [7, 7.2, 6.8, 8, 7.8, 8.1, 8.5, 7, 7.2, 6.8, 8, 7.8],
            type: 'bar',
            yAxisID: 'yAxis2'
          };
          break;
        default:
          chartData.dataSet2 = {
            display: false,
            label: '',
            data: [],
            type: 'bar',
            yAxisID: 'yAxis2'
          }
      }
    }
    return chartData;
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
      if (graphData.dataSet2.yAxisID == 'yAxis2') {
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
      }
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
        yAxisID: graphData.dataSet2.yAxisID,
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
