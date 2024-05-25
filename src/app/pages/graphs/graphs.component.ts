import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  public chartOptions: ChartOptions;

  locationId?: Number;

  constructor(private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: "Dummy Data",
          data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 18, 9]
        }
      ],
      chart: {
        type: "bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      title: {
        text: "Monthly Data"
      },
      colors: ['#4CAF50'],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.locationId = Number(localStorage.getItem('locationId'));
    console.log(this.locationId);
  }

  goBack() {
    this.router.navigate(['/adminPage']);
  }
}
