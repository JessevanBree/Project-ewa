import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from "../../services/session/session.service";
import {FbSessionService} from "../../services/session/fb-session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /*constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) {
  }*/

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sessionService: FbSessionService) {
  }

  ngOnInit() {
  }

}
