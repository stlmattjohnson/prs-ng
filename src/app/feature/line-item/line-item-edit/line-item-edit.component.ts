import { Component, OnInit } from "@angular/core";
import { LineItem } from "src/app/model/line-item.class";
import { Product } from "src/app/model/product.class";
import { Request } from "src/app/model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { LineItemService } from "src/app/service/line-item.service";
import { ProductService } from "src/app/service/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-line-item-edit",
  templateUrl: "./line-item-edit.component.html",
  styleUrls: ["./line-item-edit.component.css"]
})
export class LineItemEditComponent implements OnInit {
  title: string = "Line Item Create";
  lineitem: LineItem = new LineItem();
  lineUpdate: LineItem = new LineItem();
  products: Product[] = [];
  exists: boolean = false;
  jr: JsonResponse;
  id: number = 0;

  constructor(
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.lineItemSvc.get(this.id).subscribe(jr => {
      this.lineitem = jr.data as LineItem;
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  update(): void {
    this.lineItemSvc.update(this.lineitem).subscribe(jr => {
      this.router.navigateByUrl(
        "/requests/request-lines/" + this.lineitem.request.id
      );
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.loc.back();
  }
}
