import { Component, OnInit } from "@angular/core";
import { Vendor } from "src/app/model/vendor.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { VendorService } from "src/app/service/vendor.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-vendor-edit",
  templateUrl: "./vendor-edit.component.html",
  styleUrls: ["./vendor-edit.component.css"]
})
export class VendorEditComponent implements OnInit {
  title: string = "Vendor Edit";
  vendor: Vendor = new Vendor();
  vendorInfo: string[] = [];
  jr: JsonResponse;
  id: number = 0;
  isEmpty: boolean = false;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.vendorSvc.get(this.id).subscribe(jr => {
      this.vendor = jr.data as Vendor;
    });
  }

  update(): void {
    this.vendorEmptyCheck();
    if (!this.isEmpty) {
      this.vendorSvc.update(this.vendor).subscribe(jr => {
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
