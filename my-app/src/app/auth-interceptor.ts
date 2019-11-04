import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {FbSessionService} from "./services/session/fb-session.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: FbSessionService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.sessionService.getTokenId();

    if(token){
      const cloned = req.clone(
        {setParams: {'auth': token}
      });

      return next.handle(cloned);

    } else throw new Error("Missing token");

  }
}
