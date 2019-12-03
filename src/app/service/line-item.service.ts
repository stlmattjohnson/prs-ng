import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JsonResponse } from "../model/json-response.class";
import { LineItem } from "../model/line-item.class";

@Injectable({
  providedIn: "root"
})
export class LineItemService {
  url: string = "http://localhost:8080/line-items/";
  constructor(private http: HttpClient) {}

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  save(lineItem: LineItem): Observable<JsonResponse> {
    return this.http.post(this.url, lineItem) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url + id) as Observable<JsonResponse>;
  }
}
