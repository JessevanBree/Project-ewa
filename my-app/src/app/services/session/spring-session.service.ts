import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpringSessionService {

  private readonly REST_AUTHENTICATION_URL: string = "http://localhost:8080/authenticate/login";

  constructor(private httpClient: HttpClient) {
  }

  signIn(email: String, password: String) {

    this.httpClient.post(this.REST_AUTHENTICATION_URL, {
      email: email,
      passWord: password
    }).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Login complete");
      }
    )


  }


}
