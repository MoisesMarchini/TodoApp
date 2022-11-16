import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {

  @Output("deleteFunction") deleteFunction: EventEmitter<any> = new EventEmitter();
  @Output("editFunction") editFunction: EventEmitter<any> = new EventEmitter();
  @Output("doneFunction") doneFunction: EventEmitter<any> = new EventEmitter();

  @Input() _cardItem:
  {
  id: number,
  title: string,
  done: boolean,
  user: string
  } =
  {
  id: 0,
  title: 'string',
  done: false,
  user: 'string'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
