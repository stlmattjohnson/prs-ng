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
      new MenuItem("Users", "/users/list", "List of Users"),
      new MenuItem("Vendors", "/vendors/list", "List of Vendors"),
      new MenuItem("Products", "/products/list", "List of Products"),
      new MenuItem("Request", "/requests/create", "Create a Request"),
      new MenuItem("Review", "/requests/review", "Review Requests"),
    ];
  }
}
