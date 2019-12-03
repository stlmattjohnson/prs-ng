import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/model/product.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { Vendor } from "src/app/model/vendor.class";
import { VendorService } from "src/app/service/vendor.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  title: string = "Product Edit";
  product: Product = new Product();
  jr: JsonResponse;
  id: number = 0;
  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.productSvc.get(this.id).subscribe(jr => {
      this.product = jr.data as Product;
    });
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save(): void {
    this.productSvc.save(this.product).subscribe(jr => {
      this.router.navigateByUrl("/products/list");
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.loc.back();
  }
}
