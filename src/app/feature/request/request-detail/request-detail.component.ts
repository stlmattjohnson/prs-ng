import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.component.html",
  styleUrls: ["./request-detail.component.css"]
})
export class RequestDetailComponent implements OnInit {
  title: string = "Request Detail";
  request: Request = new Request();
  jr: JsonResponse;
  id: number = 0;
  isDeletePressed: boolean = false;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
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
