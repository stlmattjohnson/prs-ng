import { Component, OnInit } from "@angular/core";
import { Vendor } from "src/app/model/vendor.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { VendorService } from "src/app/service/vendor.service";
import { BaseComponent } from "../../base/base.component";
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.css"]
})
export class VendorListComponent extends BaseComponent implements OnInit {
  title: string = "Vendor List";
  vendors: Vendor[] = [];
  jr: JsonResponse;
  isLoading: boolean = true;

  constructor(private vendorSvc: VendorService, protected systemSvc: SystemService) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
      this.isLoading = false;
    });
  }
}
