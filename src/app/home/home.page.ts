import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';

import { DataService, Task } from '../services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe],
  standalone: false,
})

export class HomePage implements OnInit {
  private data = inject(DataService);
  private datePipe = inject(DatePipe);

  @ViewChild(IonModal) modal!: IonModal;
  tasks: Task[] = [];
  taskName!: string;
  taskDescription!: string;

  constructor() {}
  
  ngOnInit(): void {
    this.getTasks();
  }

  deleteTask(taskToDelete: Task) {
    this.tasks = this.tasks.filter(task => task.nombreTarea !== taskToDelete.nombreTarea);
    this.saveDataInstorage();
  }

  completeTask(taskToComplete: Task) {
    const index = this.tasks.indexOf(taskToComplete);
    this.tasks[index].completada = true;
    this.saveDataInstorage();
  }

  async getTasks() {
    this.data.getFromStorage('tasks').then((value) => {
      this.tasks = value ?? [];
    });
  }

  modalCancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async modalCreate() {
    this.tasks.push({
      nombreTarea: this.taskName,
      descripcion: this.taskDescription,
      fechaCreacion: this.datePipe.transform(new Date(), 'dd-MM-yyy')?.toString() ?? '',
      completada: false,
    });
    this.saveDataInstorage();
    this.modal.dismiss();
  }
  
  saveDataInstorage() {
    this.data.setInStorage('tasks', this.tasks);
  }
}
