import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  URI: string;
  constructor(private http: HttpClient) {
    this.URI = environment.uri;
  }
  addUser(content: any): Observable<any> {
    const body = JSON.stringify(content);
    const apiHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );

    return this.http.post(this.URI + "/api/user/register", body, {
      headers: apiHeaders,
    });
  }
}
