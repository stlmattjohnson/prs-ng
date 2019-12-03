import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/model/menu-item.class";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() {}

  ngOnInit() {
    this.menuItems = [
      new MenuItem("User", "/users/list", "List of Users"),
      new MenuItem("Vendor", "/vendors/list", "List of Vendors"),
      new MenuItem("Product", "/products/list", "List of Products"),
      new MenuItem("Request", "/requests/list", "Create a Request"),
      new MenuItem("Review", "/requests/review", "Review Requests"),
    ];
  }
}
