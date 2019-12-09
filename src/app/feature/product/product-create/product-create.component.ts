import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { Vendor } from "src/app/model/vendor.class";
import { ProductService } from "src/app/service/product.service";
import { VendorService } from "src/app/service/vendor.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

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
  isImportPressed = false;
  csvProducts: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private loc: Location
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

  importPressed(): void {
    this.isImportPressed = this.isImportPressed == true ? false : true;
  }

  getProductArrayFromCSVFile(csvRecordsArray: any) {
    let csvProducts: Product[] = [];

    for (let i = 1; i < csvRecordsArray.length - 1; i++) {
      let data = csvRecordsArray[i].split(",");
      let csvRecord: Product = new Product();
      csvRecord.vendor = this.product.vendor;
      csvRecord.partNumber = data[0].trim();
      csvRecord.name = data[1].trim();
      csvRecord.price = data[2].trim() as number;
      csvRecord.unit = data[3].trim();
      csvRecord.photoPath = data[4].trim();
      csvProducts.push(csvRecord);
    }
    return csvProducts;
  }

  fileChangeListener($event: any): void {
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = data => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      this.csvProducts = this.getProductArrayFromCSVFile(csvRecordsArray);
    };

    reader.onerror = function() {
      alert("Unable to read " + input.files[0]);
    };
  }

  importFromCsv(): void {
    console.log("In importFromCsv");
    for (let i = 0; i < this.csvProducts.length; i++) {
      let prod: Product = this.csvProducts[i];
      console.log(prod);
      this.productSvc.save(prod).subscribe(jr => {});
    }
    this.router.navigateByUrl("/products/list");
  }

  fileImportSave(): void {
    this.importFromCsv();
  }

  backClicked() {
    this.loc.back();
  }
}
