import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { UserService } from "src/app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent extends BaseComponent implements OnInit {
  title: string = "User Edit";
  user: User = new User();
  userInfo: string[] = [];
  jr: JsonResponse;
  id: number = 0;
  isUpdatePressed: boolean = false;
  isEmpty: boolean = false;

  constructor(
    private userSvc: UserService,
    protected systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.userSvc.get(this.id).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  update(): void {
    this.userEmptyCheck();
    if (!this.isEmpty) {
      this.userSvc.update(this.user).subscribe(jr => {
        this.router.navigateByUrl("/users/list");
      });
    }
  }

  userEmptyCheck() {
    this.userInfo = [];
    this.isEmpty = false;

    Object.entries(this.user).forEach(entry => {
      let value = entry[1];
      this.userInfo.push(value);
    });
    this.userInfo.splice(0, 1);
    this.userInfo.pop();
    this.userInfo.pop();

    for (let s of this.userInfo) {
      if (s == "") {
        this.isEmpty = true;
      }
    }
  }

  backClicked() {
    this.loc.back();
  }
}
