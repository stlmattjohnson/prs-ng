import { Injectable } from "@angular/core";
import { User } from "../model/user.class";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SystemService {
  loggedInUser: User = null;

  constructor(private router: Router) {}

  isLoggedIn(): boolean{
    return this.loggedInUser != null ? true : false;
  }

  isAdmin(): boolean {
    return this.loggedInUser == null ? false : this.loggedInUser.admin;
  }

  isReviewer(): boolean {
    return this.loggedInUser == null ? false : this.loggedInUser.reviewer;
  }

  logout(): void{
    this.loggedInUser = null;
  }

  checkLogin(): void {
    // if user is not logged in, send to login page
    // commenting out for testing purposes
    if(this.loggedInUser == null) {
      this.router.navigateByUrl("/users/login");
    }
  }
}
