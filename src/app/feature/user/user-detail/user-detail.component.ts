import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.class";
import { JsonResponse } from "src/app/model/json-response.class";
import { UserService } from "src/app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  title: string = "User Detail";
  user: User = new User();
  jr: JsonResponse;
  id: number = 0;
  isDeletePressed: boolean = false;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parms => (this.id = parms["id"]));
    this.userSvc.get(this.id).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  delete(): void {
    this.userSvc.delete(this.user.id).subscribe(jr => {
      if (jr.errors != null) {
        console.log("Error deleting User: " + jr.errors);
      }
      this.router.navigateByUrl("/users/list");
    });
  }

  deletePressed(): void {
    if (!this.isDeletePressed) {
      this.isDeletePressed = true;
    } else {
      this.isDeletePressed = false;
    }
  }

  backClicked() {
    this.loc.back();
  }
}
