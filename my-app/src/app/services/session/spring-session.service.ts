import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from "../../models/user";
import {constants} from "http2";
import {Router} from "@angular/router";
import {UserService} from "../user.service";


@Injectable({
  providedIn: 'root'
})
export class SpringSessionService {

  private readonly REST_AUTHENTICATION_URL = "http://localhost:8080/authenticate/login";

  private token: string;
  private authenticated: boolean;
  private user: User;
  public displayName: string;
  public errorMessage: string;

  constructor(private httpClient: HttpClient,
              private route: Router,
              private userService: UserService) {
    this.token = null;
    this.displayName = null;
    this.errorMessage = null;
    this.authenticated = false;
  }

  signIn(email: String, password: String) {
    return this.httpClient.post<HttpResponse<User>>(this.REST_AUTHENTICATION_URL,
      {email: email, passWord: password}, {observe: "response"}).subscribe(
      (response) => {
        this.authenticated = true;
        this.user = response.body as unknown as User;
        this.displayName = ((response.body as unknown) as User).email;
        this.setToken(response.headers.get("Authorization"),
          ((response.body as unknown) as User).email);
      },
      (error: HttpErrorResponse) => {
        this.authenticated = false;
        switch(error.status) {
          case 403: {
            this.errorMessage = "Invalid credentials";
            console.log("Invalid credentials");
            break;
          }
          case 500: {
            this.errorMessage = "User not found";
            console.log("User not found");
            break;
          }
        }
      },
      () => {
        console.log(this.token);
        console.log("Login successful");
        this.userService.setLoggedInUser(this.user);
        return this.route.navigateByUrl("/");
      }
    );
  }

  public getUser(){
    return this.user;
  }

  signOut() {
    this.token = null;
    this.authenticated = false;
    this.displayName = null;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  private setToken(token: string, nameOfUser: string): void {
    this.token = token;
    this.displayName = nameOfUser;
  }

  public getToken(): string {
    console.log(this.token);
    return this.token;
  }


}
