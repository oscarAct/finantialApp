import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild("barChart") barChart;

  bars: any;
  colorArray: any;
  slidesOptions = {
    pager: true,
  };
  segmentModel = "todos";
  constructor() {}

  ionViewDidEnter() {
    this.createBarChart();
  }

  ngOnInit() {}

  segmentChanged(e) {
    this.segmentModel = e.detail.value;
  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [
          {
            label: "Gastos",
            data: [2.5, 1.5, 5, 3, 8, 7.5, 3],
            backgroundColor: "rgba(66, 66, 66, 0.28)",
            borderColor: "#b14343",
            hoverBackgroundColor: "#b14343",
            borderWidth: 0,
          },
          {
            label: "Ingresos",
            data: [4, 3, 2, 5, 10, 4, 6.5],
            backgroundColor: "rgba(255,255,255,0.50)",
            borderColor: "white",
            hoverBackgroundColor: "white",
            borderWidth: 0,
          },
        ],
      },
      options: {
        tooltips: {
          mode: "point",
        },
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                color: "rgba(0,0,0,0)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "rgba(0,0,0,0)",
              },
              ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  }
}
