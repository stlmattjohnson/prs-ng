import { Component, OnInit } from "@angular/core";
import { SystemService } from "src/app/service/system.service";
import { User } from "src/app/model/user.class";

@Component({
  template: ""
})
export class BaseComponent implements OnInit {
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  loggedInUser: User = null;
  isAdmin: boolean;
  isReviewer: boolean;

  constructor(protected systemSvc: SystemService) {}

  ngOnInit() {
    this.systemSvc.checkLogin();
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.isAdmin = this.systemSvc.isAdmin();
    this.isReviewer = this.systemSvc.isReviewer();
    console.log("Verify we have a logged in user.");
    console.log("User: ", this.loggedInUser);
    console.log("Reviewer?: ", this.isReviewer);
    console.log("Admin?: ", this.isAdmin);
  }

  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = this.sortOrder == "desc" ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
