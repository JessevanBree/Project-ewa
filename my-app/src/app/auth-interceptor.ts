import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {FbSessionService} from "./services/session/fb-session.service";
import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: FbSessionService, private route: ActivatedRoute) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = this.route.snapshot['_routerState'].url;

    if (url.includes("/homepage") && this.sessionService.authenticated == false) {
      return next.handle(req);
    } else if (this.sessionService.authenticated ) {
      const token = this.sessionService.getTokenId();
      if (token) {
        const cloned = req.clone(
          {
            setParams: {'auth': token}
          });

        return next.handle(cloned);

      } else throw new Error("Missing token");

    }
  }
}