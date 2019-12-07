import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { LineItem } from "src/app/model/line-item.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { LineItemService } from "src/app/service/line-item.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SystemService } from "src/app/service/system.service";
import { User } from "src/app/model/user.class";

@Component({
  selector: "app-request-approve",
  templateUrl: "./request-approve.component.html",
  styleUrls: ["./request-approve.component.css"]
})
export class RequestApproveComponent implements OnInit {
  title: string = "Request Approve";
  request: Request = new Request();
  lineitems: LineItem[] = [];
  jr: JsonResponse;
  id: number = 0;
  loggedInUser: User = new User();
  isRejectPressed: boolean = false;

  constructor(
    protected systemSvc: SystemService,
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.lineItemSvc.linesForRequest(this.id).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
    });
  }

  approve(): void {
    this.requestSvc.approve(this.request).subscribe(jr => {
      this.router.navigateByUrl(
        "/requests/list-review/" + this.loggedInUser.id
      );
    });
  }

  reject(): void {
    this.requestSvc.reject(this.request).subscribe(jr => {
      this.router.navigateByUrl(
        "/requests/list-review/" + this.loggedInUser.id
      );
    });
  }

  rejectPressed(): void {
    this.isRejectPressed = this.isRejectPressed == true ? false : true;
  }

  backClicked() {
    this.loc.back();
  }
}
