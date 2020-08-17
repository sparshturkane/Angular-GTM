import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
declare let dataLayer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-gtm-setup';

  constructor(private router: Router) {
  }

  ngOnInit() {

    if (isPlatformBrowser) {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(x => {
        window.scrollTo(0, 0);

        if (x instanceof NavigationEnd) {

          // Pushing Each page in Datalayer event
          dataLayer.push({
            'event': 'page',
            'name': x.urlAfterRedirects
          });
        }

      });
    }

  }

}
