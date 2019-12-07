import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from "../../base/base.component";

@Component({
  selector: "app-request-review",
  templateUrl: "./request-review.component.html",
  styleUrls: ["./request-review.component.css"]
})
export class RequestReviewComponent extends BaseComponent implements OnInit {
  title: string = "Request Review";
  requests: Request[] = [];
  jr: JsonResponse;
  id: number = 0;
  isLoading: boolean = true;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    protected systemSvc: SystemService
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.id = this.systemSvc.loggedInUser.id;
    this.requestSvc.linesForReview(this.id).subscribe(jr => {
      this.requests = jr.data as Request[];
    });
    this.isLoading = false;
  }
}
