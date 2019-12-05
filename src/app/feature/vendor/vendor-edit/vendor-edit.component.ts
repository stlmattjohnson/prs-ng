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

  update(): void {
    this.vendorSvc.update(this.vendor).subscribe(jr => {
      this.router.navigateByUrl("/vendors/list");
    });
  }

  backClicked() {
    this.loc.back();
  }
}
