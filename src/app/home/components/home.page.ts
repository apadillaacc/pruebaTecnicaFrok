import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { IonModal } from '@ionic/angular';

import { Category, DataService, Task } from '../../services/data.service';
import { DatePipe } from '@angular/common';
import { RemoteConfigService } from '../../services/remote-config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe],
  standalone: false,
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  private remoteConfig = inject(RemoteConfigService);
  private datePipe = inject(DatePipe);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('categoryModal', { static: true }) categoryModal?: IonModal;
  @ViewChild('createTaskForm') createForm!: NgForm;
  @ViewChild('changeCategoryForm') changeCategoryForm!: NgForm;
  @ViewChild('filterForm') filterForm!: NgForm;
  tasks: WritableSignal<Task[]> = signal([]);
  filteredTasks: WritableSignal<Task[]> = signal([]);
  categories: Category[] = [];
  taskName!: string;
  taskDescription!: string;
  category!: string;
  filter!: string;
  taskToEdit!: Task;
  showFeatures: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeAppAndLoadTasks();
  }

  ionViewWillEnter() {
    if (this.remoteConfig.getNewFeatureFlag()) {
      this.getCategories();
    }
  }

  /**
   * Inicia la conexion con firebase desde el servicio remote config y
   * carga las tareas y categorias segun la feature flag
   */
  async initializeAppAndLoadTasks() {
    await this.remoteConfig.initializeApp();
    this.showFeatures = this.remoteConfig.getNewFeatureFlag();
    this.getTasks();
    if (this.remoteConfig.getNewFeatureFlag()) {
      this.getCategories();
    }
  }

  /**
   * Elimina la tarea seleccionada y guarda el arreglo en storage
   *
   * @param taskToDelete - Tarea a eliminar
   */
  deleteTask(taskToDelete: Task) {
    this.tasks.update((tasks: Task[]) =>
      tasks.filter((task) => task.nombreTarea !== taskToDelete.nombreTarea)
    );
    this.saveDataInstorage();
  }

  /**
   * Marca una tarea como completada
   * @param taskToComplete - Tarea a completar
   */

  completeTask(taskToComplete: Task) {
    const index = this.tasks().indexOf(taskToComplete);
    this.tasks()[index].completada = true;
    this.saveDataInstorage();
  }

  /**
   * Carga las categorias desde el storage
   */
  getCategories() {
    this.data.getFromStorage('categories').then((value) => {
      this.categories = value;
    });
  }

  /**
   * Carga las tareas desde el storage
   */
  async getTasks() {
    this.data.getFromStorage('tasks').then((value) => {
      this.tasks.set(value ?? []);
    });
  }

  /**
   * Reinicia la forma de creación y cierra el modal de creación de tarea
   */
  modalCancel() {
    this.createForm.reset();
    this.modal.dismiss(null, 'cancel');
  }

  /**
   * Crea una nueva tarea con los datos de la forma de creación y guarda en el storage
   */
  async modalCreate() {
    this.tasks.update((tasks: Task[]) => [
      ...tasks,
      {
        nombreTarea: this.taskName,
        descripcion: this.taskDescription,
        fechaCreacion:
          this.datePipe.transform(new Date(), 'dd-MM-yyy')?.toString() ?? '',
        completada: false,
        categoria: this.remoteConfig.getNewFeatureFlag()
          ? this.category
          : undefined,
      },
    ]);
    this.saveDataInstorage();
    this.createForm.reset();
    this.modal.dismiss();
  }

  /**
   * Abre modal para cambiar categoria de una tarea
   * @param task - Tarea a la que se le va a modificar la categoría
   */
  changeCategory(task: Task) {
    this.taskToEdit = task;
    this.category = task.categoria ? task.categoria : '';
    this.categoryModal?.present();
  }

  /**
   * Reinicia forma y cierra modal de modificacion de editar categoria
   */
  cancelEdit() {
    this.changeCategoryForm.reset();
    this.categoryModal?.dismiss(null, 'cancel');
  }

  /**
   * Aisgna categoria nueva a tarea seleccionada
   */
  async setCategory() {
    const index = this.tasks().findIndex(
      (task) => task.nombreTarea === this.taskToEdit.nombreTarea
    );
    if (index !== -1) {
      const updateItem = this.tasks()[index];
      updateItem.categoria = this.category;
      this.tasks.update((tasks) =>
        tasks.map((task) =>
          task.nombreTarea === updateItem.nombreTarea
            ? { ...task, categoria: this.category }
            : task
        )
      );
    }
    this.changeCategoryForm.reset();
    this.category = '';
    this.saveDataInstorage();
    this.categoryModal?.dismiss();
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  /**
   * Guarda el arregla de tareas en el storage
   */
  saveDataInstorage() {
    this.data.setTasksInStorage('tasks', this.tasks());
  }

  /**
   * Filtra las tareas segun la categoría seleccionada
   * @param event - Evento de cambio de select
   */
  filterTasks(event: any) {
    this.filter = event.detail.value;
    this.filteredTasks.update(() =>
      this.tasks().filter((task) => task.categoria !== this.filter)
    );
    this.tasks.update((tasks: Task[]) =>
      tasks.filter((task) => task.categoria === this.filter)
    );
  }

  /**
   * Limpia la forma del filtro y agrega nuevamente los valores filtrados anteriormente
   */
  clearFilter() {
    this.filterForm.reset();
    this.tasks.update((tasks: Task[]) => [...tasks, ...this.filteredTasks()]);
    this.filteredTasks.set([]);
  }
}
