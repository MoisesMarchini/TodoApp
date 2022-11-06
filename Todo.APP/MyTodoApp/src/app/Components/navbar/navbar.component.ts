import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  colors: string[] = [
    "#fec200",
    "#0273ff",
    "#fc0939",
    "#40ba4b",
    "#5d4195"
  ]

  isCollapsed = false;
  ngOnInit() {
  }

  currentRoute: string;
  constructor(private router: Router) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
              console.log(this.currentRoute);
        }


    });

  }

}
