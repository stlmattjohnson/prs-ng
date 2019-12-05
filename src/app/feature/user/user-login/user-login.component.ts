import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { SystemService } from "src/app/service/system.service";
import { BaseComponent } from "../../base/base.component";

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

  ngOnInit() {
    //default user/pass for testing purposes
    this.user.userName = "mjohnson";
    this.user.password = "password";
    this.systemSvc.loggedInUser = null;
  }

  login() {
    this.userSvc.login(this.user).subscribe(jr => {
      if (jr.errors == null) {
        if (jr.data == null) {
          this.message = "Username/Password incorrect. Please try again.";
        } else {
          this.user = jr.data as User;
          this.systemSvc.loggedInUser = this.user;
          // good login, can change to some sort of welcome page later
          this.router.navigateByUrl("/users/list");
        }
      } else {
        this.message = "Username/Password incorrect. Please try again.";
      }
    });
  }
}
