import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { LineItem } from "src/app/model/line-item.class";
import { LineItemService } from "src/app/service/line-item.service";
import { Product } from "src/app/model/product.class";
import { ProductService } from "src/app/service/product.service";
import { BaseComponent } from "../../base/base.component";
import { SystemService } from "src/app/service/system.service";

@Component({
  selector: "app-request-lines",
  templateUrl: "./request-lines.component.html",
  styleUrls: ["./request-lines.component.css"]
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  title: string = "Request Line Items";
  request: Request = new Request();
  lineitems: LineItem[] = [];
  lineitem: LineItem = new LineItem();
  lineItemUpdate: LineItem = new LineItem();
  products: Product[] = [];
  jr: JsonResponse;
  id: number = 0;
  isAddPressed: boolean = false;

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    protected systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.loadData();
  }

  addPressed(): void {
    if (this.lineItemUpdate.id != 0) {
      this.lineItemUpdate = new LineItem();
    }
    this.loadData();
    this.isAddPressed = this.isAddPressed == true ? false : true;
  }

  loadData(): void {
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.lineItemSvc.linesForRequest(this.id).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      for (let i = 0; i < this.products.length; i++) {
        for (let l of this.lineitems) {
          if (
            this.products[i].id == l.product.id &&
            this.lineItemUpdate.product.id != l.product.id
          ) {
            this.products.splice(i, 1);
          }
        }
      }
    });
  }

  save(): void {
    this.requestSvc.save(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/list");
    });
  }

  saveLine(): void {
    this.lineitem.request = this.request;
    this.lineItemSvc.save(this.lineitem).subscribe(jr => {
      this.loadData();
      this.lineitem = new LineItem();
    });
  }

  delete(id: number): void {
    this.lineItemSvc.delete(id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting Product: " + jr.errors);
      }
      this.loadData();
    });
  }

  submitForReview(): void {
    this.requestSvc.submitForReview(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/list");
    });
  }

  updateLineItem(id: number): void {
    if (this.isAddPressed) {
      this.isAddPressed = false;
    }
    this.lineItemSvc.get(id).subscribe(jr => {
      this.lineItemUpdate = jr.data as LineItem;
      this.loadData();
    });
  }

  saveUpdatedLine(): void {
    this.lineItemSvc.update(this.lineItemUpdate).subscribe(jr => {
      this.lineItemUpdate = new LineItem();
      this.loadData();
    });
  }

  updateRequest(): void {
    this.request.status = "New";
    this.request.reasonForRejection = "";
    this.requestSvc.update(this.request).subscribe(jr => {
      this.loadData();
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.loc.back();
  }
}
