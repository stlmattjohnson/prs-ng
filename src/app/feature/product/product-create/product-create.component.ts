import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { Vendor } from "src/app/model/vendor.class";
import { ProductService } from "src/app/service/product.service";
import { VendorService } from "src/app/service/vendor.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"]
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product Create";
  product: Product = new Product();
  jr: JsonResponse;
  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save(): void {
    this.productSvc.save(this.product).subscribe(jr => {
      this.router.navigateByUrl("/products/list");
    });
  }
}
