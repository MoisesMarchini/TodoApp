import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  allCards: any = [];
  todoCards: any = [];
  completedCards: any = [];

  todoCollapsed = true;
  completedCollapsed = true;

  newTodoWindowVisibility = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTodos();
  }

  public getTodos(): void {
    this.allCards = null;
    this.http.get('https://localhost:7155/api/Todo').subscribe(
      response => {
        this.allCards = response;

        for (let index = 0; index < this.allCards.length; index++) {
          const element = this.allCards[index];

          if (element.done == false)
            this.todoCards.push(element);
          else
            this.completedCards.push(element);
        }
      },
      error => console.log(error)
    );

  }

  public newTask(): void {
    this.http.post('https://localhost:7155/api/Todo', {
      title: "Coloqueikct",
      done: false,
      user: "Angular"
    }).toPromise();
  }
  public deleteTask(id: number): void {
    this.http.delete('https://localhost:7155/api/Todo/' + id).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

}
