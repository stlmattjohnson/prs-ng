import { Component, OnInit } from "@angular/core";
import { Vendor } from "src/app/model/vendor.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { VendorService } from "src/app/service/vendor.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-vendor-detail",
  templateUrl: "./vendor-detail.component.html",
  styleUrls: ["./vendor-detail.component.css"]
})
export class VendorDetailComponent implements OnInit {
  title: string = "Vendor Detail";
  vendor: Vendor = new Vendor();
  jr: JsonResponse;
  id: number = 0;

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

  delete(): void {
    this.vendorSvc.delete(this.vendor.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting Vendor: " + jr.errors);
      }
      this.router.navigateByUrl("/vendors/list");
    });
  }

  backClicked() {
    this.loc.back();
  }
}
