import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  todoCards: { title: string }[] = [
  ];
  completedCards: { title: string }[] = [
  ];

  todoCollapsed = true;
  completedCollapsed = true;

  newTodoWindowVisibility = false;

  constructor() { }

  ngOnInit() {
  }

}
