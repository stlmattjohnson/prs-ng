import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JsonResponse } from "../model/json-response.class";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user.class";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url: string = "http://localhost:8080/users/";
  constructor(private http: HttpClient) {}

  login(user: User): Observable<JsonResponse> {
    return this.http.post(this.url + "login/", user) as Observable<JsonResponse>;
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  save(user: User): Observable<JsonResponse> {
    return this.http.post(this.url, user) as Observable<JsonResponse>;
  }

  update(user: User): Observable<JsonResponse> {
    return this.http.put(this.url, user) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url + id) as Observable<JsonResponse>;
  }
}
