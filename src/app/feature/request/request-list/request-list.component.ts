import { Component, OnInit } from "@angular/core";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { BaseComponent } from "../../base/base.component";
import { Request } from "../../../model/request.class";
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.css"]
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string = "Request List";
  requests: Request[] = [];
  jr: JsonResponse;
  isLoading: boolean = true;

  constructor(private requestSvc: RequestService, protected systemSvc: SystemService) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      this.isLoading = false;
    });
  }
}
