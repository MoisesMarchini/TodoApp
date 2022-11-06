import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  serverConnectionString: string = "https://localhost:7155/api/Todo/"

  allCards: any = [];

  todoCards: {
    id: number,
    title: string,
    done: boolean,
    user: string
  }[] = [];

  completedCards: {
    id: number,
    title: string,
    done: boolean,
    user: string
  }[] = [];

  public currentTodoId: number = 0;

  newTodoForm = this.formBuilder.group({
    title: '',
    done: false,
    user: 'Angular'
  })

  todoWindow: any = {
    headerTitle: '',
    submitText: '',
    showInput: true,
    onSubmit: () => {}
  }

  newTodoWindow: any = {
    headerTitle: 'Nova Tarefa',
    submitText: 'Adicionar',
    showInput: true,
    onSubmit: () => {this.onSubmitNewTask()}
  }

  editTodoWindow: any = {
    headerTitle: 'Renomear Tarefa',
    submitText: 'Salvar',
    showInput: true,
    onSubmit: () => {this.onSubmitUpdateTaskName(); this.closeTodoWindow()}
  }

  deleteTodoWindow: any = {
    headerTitle: 'Deletar Tarefa',
    submitText: 'Deletar',
    showInput: false,
    onSubmit: () => {this.onSubmitDeleteTask(); this.closeTodoWindow()}
  }

  todoCollapsed = true;
  completedCollapsed = true;

  newTodoWindowVisibility = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllTodos();
  }


/////////////////////// TODO WINDOW ///////////////////////

  resetTodoForm() {
    this.newTodoForm.reset({done: false, user: 'Angular'});
  }

  openTodoWindow() {
    this.newTodoWindowVisibility = true;
    this.resetTodoForm();
  }

  closeTodoWindow() {
    this.newTodoWindowVisibility = !this.newTodoWindowVisibility;
    this.resetTodoForm();
  }

  openNewTodoWindow() {
    this.openTodoWindow();
    this.todoWindow = this.newTodoWindow;
  }

  openEditTodoWindow(id: number) {
    this.currentTodoId = id;
    this.openTodoWindow();
    this.todoWindow = this.editTodoWindow;
  }

  openDeleteTodoWindow(id: number) {
    this.currentTodoId = id;
    this.openTodoWindow();
    this.todoWindow = this.deleteTodoWindow;
  }

  openDoneTodoWindow(id: number) {
    this.currentTodoId = id;
    this.onSubmitUpdateTaskDone();
  }


/////////////////////// TODO HTTP REQUEST ///////////////////////


  getAllTodos(): void {
    this.allCards = [];
    this.http.get(this.serverConnectionString).subscribe(
      response => {
        this.allCards = response;

        this.todoCards = this.allCards.filter((
          singleTodo: {
            id: number;
            title: string;
            done: boolean;
            user: string;
          }
        ) => !singleTodo.done);

        this.completedCards = this.allCards.filter((
          singleTodo: {
            id: number;
            title: string;
            done: boolean;
            user: string;
          }
        ) => singleTodo.done);
      },
      error => console.log(error)
    );

  }

  onSubmitNewTask(): void{

    if (!this.newTodoForm.valid)
      return;

    this.http.post(this.serverConnectionString, this.newTodoForm.value).subscribe(
      response => {
        console.log(response);
        this.changeLastRequest(response, true);
        this.getAllTodos();
        this.resetTodoForm();
      },
      error => {
        console.log(error);
        this.changeLastRequest(error, false);
      }
    );
  }

  onSubmitUpdateTaskName(): void{

    if (!this.newTodoForm.valid)
      return;

    this.http.put(this.serverConnectionString+this.currentTodoId, this.newTodoForm.value).subscribe(
      response => {
        console.log(response);
        this.changeLastRequest(response, true);
        this.getAllTodos();
        this.resetTodoForm();
      },
      error => {
        console.log(error);
        this.changeLastRequest(error, false);
      }
    );
  }

  onSubmitUpdateTaskDone(): void{

    let updatedTask = this.allCards.filter((
      singleTodo: {
        id: number;
        title: string;
        done: boolean;
        user: string;
      }
    ) => singleTodo.id == this.currentTodoId)[0];

    updatedTask.done = !updatedTask.done;

    this.http.put(this.serverConnectionString + this.currentTodoId, updatedTask).subscribe(
      response => {
        console.log(response);
        this.getAllTodos();
        this.resetTodoForm();
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmitDeleteTask(): void {
    if (this.currentTodoId == 0)
      return;
    this.http.delete(this.serverConnectionString+this.currentTodoId, {
    }).subscribe(
      response => {
        console.log(response);
        this.changeLastRequest(response, true);
        this.getAllTodos();
        this.currentTodoId == 0;
      },
      error => {
        console.log(error);
        this.changeLastRequest(error, false);
      }
    );
  }

  changeLastRequest(response: object, okRequest: boolean) {
    let resSTR = JSON.stringify(response);
    let resJSON = JSON.parse(resSTR);

    if (okRequest)
      this.toastr.success(resJSON.resposta);
    else
      this.toastr.error(resJSON.resposta);
  }

}
