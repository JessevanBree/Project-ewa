import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {AdminOrganisationService} from "../admin-organisation.service";

@Injectable({
  providedIn: 'root'
})
export class SpringSessionService {

  private readonly REST_AUTHENTICATION_URL = "http://localhost:8080/authenticate/login";

  private _token: string;
  private authenticated: boolean;
  private user: User;
  public displayName: string;
  public errorMessage: string;

  private readonly BS_TOKEN_NAME = "tokenName";
  private readonly BS_USER_EMAIL = "userMail";

  constructor(private httpClient: HttpClient,
              private route: Router,
              private userService: UserService) {
    this._token = null;
    this.displayName = null;
    this.errorMessage = null;
    this.authenticated = false;

    this.getUser();
  }

  signIn(email: String, password: String, errorMessage?: string) {
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
        switch (error.status) {
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
        // console.log(this.token);
        console.log("Login successful for user: ", this.user);
        this.userService.setLoggedInUser(this.user);
        // this.adminOrganisationService.isAdminOfOrgs();
        return this.route.navigateByUrl("/");
      }
    );
  }

  signOut() {
    this._token = null;
    this.user = null;
    this.authenticated = false;
    // this.setToken(null, null);
  }

  public isAuthenticated(): boolean {
    // return sessionStorage.getItem("tokenName") != null;
    return this.authenticated != false;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  private setToken(token: string, nameOfUser: string): void {

    this.displayName = nameOfUser;
    this.authenticated = true;
    // if (token == null && nameOfUser == null) {
    //   sessionStorage.clear();
    //   return;
    // }
    // sessionStorage.setItem(this.BS_TOKEN_NAME, token);
    // sessionStorage.setItem(this.BS_USER_EMAIL, nameOfUser);
  }

  public getToken(): string {
    // let token = sessionStorage.getItem(this.BS_TOKEN_NAME);
    // if (token == null) {
    //   token = localStorage.getItem(this.BS_TOKEN_NAME);
    //   sessionStorage.setItem(this.BS_TOKEN_NAME, token);
    // }
    // return token;

    return this._token;
  }

  public getUser() {
    // if (!this.user) {
    //   console.log("User " + this.user);
    //   this.user = this.userService.getUserByEmail(this.BS_USER_EMAIL);
    //   this.userService.setLoggedInUser(this.user);
    //   console.log("User " + this.user);
    // }
    return this.user;
  }

  get token(): string {
    return this._token;
  }

  public getDisplayName(){
    return this.displayName;
  }
}
