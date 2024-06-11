import { Component, Input } from '@angular/core';
import { CheckboxItem } from '../../models/checkbox-item';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { Task } from '../../models/task';
import { BadgeItemPillComponent } from '../badge-item-pill/badge-item-pill.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    BadgeItemPillComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  @Input() items: CheckboxItem[] = [];
  selectedItems: { [group: string]: CheckboxItem } = {};
  linkEditTaskDisabled:  boolean= false;

  constructor(
    private router: Router,
    private taskService: TasksService,
    private authService: AuthService,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.sortTaskByChechedAndExpiration()
  }


  onCheckboxChange(item: CheckboxItem) {
    // Se o checkbox está sendo desmarcado
    if (item.checked) {
      item.checked = false;
      delete this.selectedItems[item.group]; // Remove o item do objeto selectedItems
      let task = this.parseItemCheckBoxToTask(item);
      this.updateTask(task);
    } else {
      // Desmarca todos os itens do mesmo grupo, exceto o atual
      this.items.forEach(i => {
        if (i.group === item.group && i !== item) {
          i.checked = false;
          delete this.selectedItems[i.group]; // Remove o item do objeto selectedItems
        }
      });

      // Marca o item clicado
      item.checked = true;
      // Armazena o item selecionado no objeto selectedItems
      this.selectedItems[item.group] = { ...item };
      let task = this.parseItemCheckBoxToTask(item);
      this.updateTask(task);
    }
  }

  editarTarefa(id: number) {
    this.linkEditTaskDisabled= true;
    this.router.navigate(['/users/tasks', id, 'edit']);
  }

  parseItemCheckBoxToTask(item:CheckboxItem):Task{
    let task= new Task();
    task.description = item.label;
    task.expirationDate=item.expiration;
    task.isCompleted=item.checked;
    task.id=item.id;
    const usuarioLogado = this.authService.getUsuarioLogado()
    if(usuarioLogado){
      task.user=usuarioLogado.id;
    }
    return task;
  }

  updateTask(task: Task){
    this.taskService.save(task)
      .subscribe({
        next:(res:any)=>{
          this.requestService.hideLoading()
          this.requestService.trataSucesso(res)
        },
        error: (error)=>{
          this.requestService.hideLoading()
          this.requestService.trataErro(error );
        }
      });
      this.sortTaskByChechedAndExpiration()
  }

  sortTaskByChechedAndExpiration(){
    this.items.sort((a, b) => {
      // Se ambos os itens têm o mesmo status de checked
      if (a.checked === b.checked) {
        // Ordena pelo mais próximo de expiração (se ambos estiverem unchecked)
        if (!a.checked && !b.checked) {
          const expirationA = new Date(a.expiration).getTime();
          const expirationB = new Date(b.expiration).getTime();
          return expirationA - expirationB;
        }
        // Se um é checked e o outro não, o unchecked vem primeiro
        return 0;
      } else if (a.checked === false) {
        // Itens unchecked vêm antes dos checked
        return -1;
      } else {
        return 1;
      }
    });
  }

}
