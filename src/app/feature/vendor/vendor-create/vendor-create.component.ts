import { Component, OnInit } from "@angular/core";
import { JsonResponse } from "src/app/model/json-response.class";
import { Vendor } from "src/app/model/vendor.class";
import { VendorService } from "src/app/service/vendor.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-vendor-create",
  templateUrl: "./vendor-create.component.html",
  styleUrls: ["./vendor-create.component.css"]
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor Create";
  vendor: Vendor = new Vendor();
  vendorInfo: string[] = [];
  jr: JsonResponse;
  isEmpty: boolean = false;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit() {}

  save(): void {
    this.vendorEmptyCheck();
    if (!this.isEmpty) {
      this.vendorSvc.save(this.vendor).subscribe(jr => {
        this.router.navigateByUrl("/vendors/list");
      });
    }
  }

  vendorEmptyCheck() {
    this.vendorInfo = [];
    this.isEmpty = false;

    Object.entries(this.vendor).forEach(entry => {
      let value = entry[1];
      this.vendorInfo.push(value);
    });
    this.vendorInfo.splice(0, 1);

    for (let s of this.vendorInfo) {
      if (s == "") {
        this.isEmpty = true;
      }
    }
  }

  backClicked() {
    this.loc.back();
  }
}
