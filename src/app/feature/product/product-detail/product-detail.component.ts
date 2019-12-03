import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { ProductService } from "src/app/service/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Vendor } from "src/app/model/vendor.class";
import { VendorService } from "src/app/service/vendor.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  title: string = "Product Detail";
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

  delete(): void {
    this.productSvc.delete(this.product.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting Product: " + jr.errors);
      }
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
