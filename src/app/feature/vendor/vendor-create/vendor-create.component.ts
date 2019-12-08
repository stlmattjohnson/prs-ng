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
  jr: JsonResponse;
  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit() {}

  save(): void {
    this.vendorSvc.save(this.vendor).subscribe(jr => {
      this.router.navigateByUrl("/vendors/list");
    });
  }

  backClicked() {
    this.loc.back();
  }
}
