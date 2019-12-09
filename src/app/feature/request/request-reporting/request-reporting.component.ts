import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { Request } from "src/app/model/request.class";
import { UserService } from "src/app/service/user.service";
import { RequestService } from "src/app/service/request.service";
import { Color, Label } from "ng2-charts";
import { LineItem } from "src/app/model/line-item.class";
import { LineItemService } from "src/app/service/line-item.service";
import { VendorService } from "src/app/service/vendor.service";
import { Vendor } from "src/app/model/vendor.class";

@Component({
  selector: "app-request-reporting",
  templateUrl: "./request-reporting.component.html",
  styleUrls: ["./request-reporting.component.css"]
})
export class RequestReportingComponent implements OnInit {
  title: string = "Request Reporting";
  users: User[] = [];
  requests: Request[] = [];
  lineitems: LineItem[] = [];
  vendors: Vendor[] = [];
  yearToDate: number = 0;
  isLoaded: boolean = false;

  pieChartLabels = [];
  pieChartData = [];
  pieChartType = "pie";
  pieChartColors: Color[] = [
    {
      backgroundColor: [
        "rgba(200,145,90,0.7)",
        "rgba(90,200,145,0.7)",
        "rgba(145,90,200,0.7)"
      ]
    }
  ];

  barChartLabels = [];
  barChartType = "bar";
  barChartLegend = true;

  barChartData = [
    {
      label: "Request Total",
      data: []
    }
  ];

  barChartColors: Color[] = [
    {
      backgroundColor: [
        "rgba(200,255,145,0.7)",
        "rgba(255,200,145,0.7)",
        "rgba(145,255,200,0.7)",
        "rgba(200,145,255,0.7)",
        "rgba(200,145,90,0.7)",
        "rgba(90,200,145,0.7)",
        "rgba(145,90,200,0.7)",
        "rgba(90,145,200,0.7)",
        "rgba(200,90,145,0.7)",
        "rgba(145,200,90,0.7)"
      ]
    }
  ];

  constructor(
    private userSvc: UserService,
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private vendorSvc: VendorService
  ) {}

  ngOnInit() {
    this.populateBarChart();
    this.populatePieChart();
  }

  populatePieChart(): void {
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
      this.pieChartLabels = [];
      for (let v of this.vendors) {
        this.lineItemSvc.list().subscribe(jr => {
          this.pieChartLabels.push(v.name);
          this.lineitems = jr.data as LineItem[];
          let total = 0;
          for (let l of this.lineitems) {
            if (l.product.vendor.id == v.id) {
              total += l.quantity * l.product.price;
            }
          }
          this.yearToDate += total;
          this.pieChartData.push(total.toFixed(2));
        });
        this.isLoaded = true;
      }
    });
  }

  populateBarChart(): void {
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      this.barChartLabels = [];
      for (let u of this.users) {
        this.requestSvc.list().subscribe(jr => {
          this.requests = jr.data as Request[];
          let total: number = 0;
          this.barChartLabels.push(u.userName);
          for (let r of this.requests) {
            if (r.user.id == u.id) {
              total += r.total;
            }
          }
          this.barChartData[0].data.push(total.toFixed(2));
        });
        this.isLoaded = true;
      }
    });
  }
}
