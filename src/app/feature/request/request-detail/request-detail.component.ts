import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from "../../base/base.component";
import { LineItemService } from "src/app/service/line-item.service";
import { LineItem } from "src/app/model/line-item.class";

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.component.html",
  styleUrls: ["./request-detail.component.css"]
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  title: string = "Request Detail";
  request: Request = new Request();
  lineitems: LineItem[] = [];
  jr: JsonResponse;
  id: number = 0;
  isDeletePressed: boolean = false;
  isLoaded: boolean = false;

  constructor(
    protected systemSvc: SystemService,
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineItemSvc.linesForRequest(this.request.id).subscribe(jr => {
        this.lineitems = jr.data as LineItem[];
        this.isLoaded = true;
      });
    });
  }

  delete(): void {
    this.requestSvc.delete(this.request.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting Product: " + jr.errors);
      }
      this.router.navigateByUrl("/requests/list");
    });
  }

  deletePressed(): void {
    this.isDeletePressed = this.isDeletePressed == true ? false : true;
  }

  backClicked() {
    this.loc.back();
  }
}
