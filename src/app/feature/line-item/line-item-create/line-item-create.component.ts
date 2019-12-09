import { Component, OnInit } from "@angular/core";
import { LineItem } from "src/app/model/line-item.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { LineItemService } from "src/app/service/line-item.service";
import { Product } from "src/app/model/product.class";
import { ProductService } from "src/app/service/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Request } from "../../../model/request.class";
import { RequestService } from "src/app/service/request.service";

@Component({
  selector: "app-line-item-create",
  templateUrl: "./line-item-create.component.html",
  styleUrls: ["./line-item-create.component.css"]
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line Item Create";
  lineitem: LineItem = new LineItem();
  lineUpdate: LineItem = new LineItem();
  lineitems: LineItem[] = [];
  products: Product[] = [];
  request: Request = new Request();
  lineExists: boolean = false;
  jr: JsonResponse;
  id: number = 0;

  constructor(
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineitem.request = this.request;
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
    this.lineItemSvc.linesForRequest(this.id).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
    });
  }

  update(lineitem: LineItem): void {
    this.lineItemSvc.update(lineitem).subscribe(jr => {
      this.router.navigateByUrl("/requests/request-lines/" + this.id);
    });
  }

  save(): void {
    for (let l of this.lineitems) {
      if (l.product.id == this.lineitem.product.id) {
        this.lineExists = true;
        this.lineUpdate = l;
        this.lineUpdate.quantity += this.lineitem.quantity;
      }
    }
    if (this.lineExists == false) {
      this.lineItemSvc.save(this.lineitem).subscribe(jr => {
        this.router.navigateByUrl("/requests/request-lines/" + this.id);
      });
    } else {
      this.update(this.lineUpdate);
    }
  }

  backClicked() {
    this.loc.back();
  }
}
