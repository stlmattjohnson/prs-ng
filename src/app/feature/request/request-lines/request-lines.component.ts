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

@Component({
  selector: "app-request-lines",
  templateUrl: "./request-lines.component.html",
  styleUrls: ["./request-lines.component.css"]
})
export class RequestLinesComponent implements OnInit {
  title: string = "Request Line Items";
  request: Request = new Request();
  lineitems: LineItem[] = [];
  lineitem: LineItem = new LineItem();
  products: Product[] = [];
  jr: JsonResponse;
  id: number = 0;
  isAddPressed: boolean = false;

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    console.log(this.id);
    this.loadData();
  }

  addPressed(): void {
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
          if (this.products[i].id == l.product.id) {
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
      this.addPressed();
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

  updateRequest(): void {
    this.request.status = "New";
    this.request.reasonForRejection = "";
    this.requestSvc.update(this.request).subscribe(jr => {
      this.loadData();
    });
  }

  backClicked() {
    this.loc.back();
  }
}
