import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  title: string = "User Create";
  user: User = new User();
  userInfo: string[] = [];
  jr: JsonResponse;
  isEmpty: boolean = false;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit() {}

  save(): void {
    this.userEmptyCheck();
    if (!this.isEmpty) {
      this.userSvc.save(this.user).subscribe(jr => {
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
