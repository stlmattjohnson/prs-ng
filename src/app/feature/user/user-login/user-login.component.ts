import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent extends BaseComponent implements OnInit {
  message: string = "";
  user: User = new User();
  constructor(
    private userSvc: UserService,
    protected systemSvc: SystemService,
    private router: Router
  ) {
    super(systemSvc);
  }

  ngOnInit() {}
}
