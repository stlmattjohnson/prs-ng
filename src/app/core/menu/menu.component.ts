import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/model/menu-item.class";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/feature/base/base.component";
import { SystemService } from "src/app/service/system.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent extends BaseComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(
    protected systemSvc: SystemService
  ) {
    super(systemSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.menuItems = [
      new MenuItem("User", "/users/list", "List of Users"),
      new MenuItem("Vendor", "/vendors/list", "List of Vendors"),
      new MenuItem("Product", "/products/list", "List of Products"),
      new MenuItem("Request", "/requests/list", "Create a Request"),
      new MenuItem("Review", "/requests/review", "Review Requests"),
      new MenuItem("Login", "/users/login", "Force Login")
    ];
  }
}
