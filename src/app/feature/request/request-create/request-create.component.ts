import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router } from "@angular/router";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from "../../base/base.component";

@Component({
  selector: "app-request-create",
  templateUrl: "./request-create.component.html",
  styleUrls: ["./request-create.component.css"]
})
export class RequestCreateComponent extends BaseComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();
  jr: JsonResponse;

  constructor(
    protected systemSvc: SystemService,
    private requestSvc: RequestService,
    private router: Router
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.request.user = this.systemSvc.loggedInUser;
    console.log(this.request);
  }

  save(): void {
    this.requestSvc.save(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/list");
    });
  }
}
