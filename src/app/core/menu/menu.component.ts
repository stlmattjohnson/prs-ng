import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/model/menu-item.class";
import { SystemService } from "src/app/service/system.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  id: number = 0;

  constructor(protected systemSvc: SystemService, private router: Router) {}

  ngOnInit() {
    this.systemSvc.checkLogin();
    console.log("Checked login..");

    if (this.systemSvc.loggedInUser != null) {
      this.id = this.systemSvc.loggedInUser.id;
    }

    this.menuItems = [
      new MenuItem("User", "/users/list", "List of Users"),
      new MenuItem("Vendor", "/vendors/list", "List of Vendors"),
      new MenuItem("Product", "/products/list", "List of Products"),
      new MenuItem("Request", "/requests/list", "Create a Request")
    ];

    if (this.systemSvc.loggedInUser.reviewer) {
      this.menuItems.push(
        new MenuItem(
          "Review",
          "/requests/list-review/" + this.id,
          "Review Requests"
        )
      );
    }

    if (this.systemSvc.loggedInUser.admin) {
      this.menuItems.push(
        new MenuItem(
          "Reporting",
          "/requests/request-reporting",
          "Request Reporting"
        )
      );
    }
  }

  logout(): void {
    this.router.navigateByUrl("/users/login");
    this.systemSvc.logout();
  }
}
