import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticsService } from '../services/statics.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html'
})
export class StaticsComponent implements OnInit {

  title = "Member Statics"
  staticID: any;
  statics;
  staticsDetails;
  role: any;
  userID: any;
  pendingTasks;
  resolvedTasks;
  assignedTasks;

  public barChartType = 'bar';
  public barChartLegend = true;

  barChartData = [];
  barChartLabels = [];
  pendingData = [];
  resolved_on_time_Data = [];
  resolved_out_of_time_Data = [];
  reslovedData = [];
  assigneddData = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming...
    scales: { yAxes: [{ ticks: { min: 0.1, max: 10, } }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private staticsService: StaticsService
  ) { }
  // public barChartLabels = ['satish', 'kumar', 'hari'];
  // public barChartData = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];



  ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(params => {
      this.staticID = params['id']
    });
    this.role = localStorage.getItem('userRole');
    this.userID = localStorage.getItem('userID');
   
    if (this.role == 'admin' || this.role == 'manager') {
      this.spinner.show();
      debugger;
      this.staticsService.getStatics(localStorage.getItem('apiToken')).subscribe((resp) => {
        this.statics = resp;

        this.statics.forEach((data) => {
          this.barChartLabels.push(data.user);
        });

        this.statics.forEach((barData) => {
          this.barChartLabels.forEach((label) => {
            if (barData.user == label) {
              this.assigneddData.push(barData.assigned);
              this.reslovedData.push(barData.resolved);
              this.pendingData.push(barData.pending);
              this.resolved_on_time_Data.push(barData.resolved_on_time);
              this.resolved_out_of_time_Data.push(barData.resolved_out_of_time);
            }
          });
        });
        this.barChartData = [
          { data: this.pendingData, label: 'Pending' },
          { data: this.reslovedData, label: 'Resolved' },
          { data: this.assigneddData, label: 'Assigned' },
          { data: this.resolved_on_time_Data, label: 'Resolved On Time' },
          { data: this.resolved_out_of_time_Data, label: 'Resolved out of Time' }
        ]
        this.spinner.hide();
      });
     
    } else {
      this.spinner.show();
      debugger;
      this.staticsService.getOneStatics(this.userID, localStorage.getItem('apiToken')).subscribe((respDeatils) => {
        this.staticsDetails = respDeatils; 
        this.spinner.hide();
        this.barChartLabels = [this.staticsDetails[0].user];
        this.barChartData = [
          { data: [this.staticsDetails[0].pending], label: 'Pending' },
          { data: [this.staticsDetails[0].resolved], label: 'Resolved' },
          { data: [this.staticsDetails[0].assigned], label: 'Assigned' },
          { data: [this.staticsDetails[0].resolved_on_time], label: 'Resolved On Time' },
          { data: [this.staticsDetails[0].resolved_out_of_time], label: 'Resolved out of Time' }
        ]
        this.spinner.hide();
      });
    }
  }
}
