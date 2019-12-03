import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { UserService } from "src/app/service/user.service";
import { BaseComponent } from "../../base/base.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent extends BaseComponent implements OnInit {
  title: string = "User List";
  users: User[] = [];
  jr: JsonResponse;
  isLoading: boolean = true;
  
  constructor(private userSvc: UserService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      this.isLoading = false;
    });
  }
}
