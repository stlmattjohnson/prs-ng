import { Component, OnInit } from "@angular/core";
import { Request } from "../../../model/request.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { RequestService } from "src/app/service/request.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { User } from "src/app/model/user.class";
import { UserService } from "src/app/service/user.service";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from "../../base/base.component";

@Component({
  selector: "app-request-edit",
  templateUrl: "./request-edit.component.html",
  styleUrls: ["./request-edit.component.css"]
})
export class RequestEditComponent extends BaseComponent implements OnInit {
  title: string = "Request Edit";
  request: Request = new Request();
  users: User[] = [];
  jr: JsonResponse;
  id: number = 0;

  constructor(
    protected systemSvc: SystemService,
    private requestSvc: RequestService,
    private userSvc: UserService,
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
    });
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
    });
  }

  update(): void {
    this.requestSvc.update(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/list");
    });
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {
    this.loc.back();
  }
}
