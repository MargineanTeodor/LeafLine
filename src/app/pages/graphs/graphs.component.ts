import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: "Reservations",
          data: []  // Initialize with an empty array
        }
      ],
      chart: {
        type: "bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      title: {
        text: "Monthly Reservations"
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
    this.fetchReservationData();
  }

  fetchReservationData() {
    if (this.locationId !== undefined) {
      const url = `http://localhost:5000/reservations_per_month?location_id=${this.locationId}`;
      this.http.get<any>(url).subscribe(
        response => {
          const data = new Array(12).fill(0);
          for (const [month, count] of Object.entries(response)) {
            data[parseInt(month) - 1] = count;
          }
          this.chartOptions.series = [
            {
              name: "Reservations",
              data: data
            }
          ];
        },
        error => {
          console.error('Error fetching reservation data:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/adminPage']);
  }
}
