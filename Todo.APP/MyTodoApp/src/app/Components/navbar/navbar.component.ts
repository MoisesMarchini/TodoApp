import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
