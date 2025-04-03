import { Component, inject } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private data = inject(DataService);
  constructor() {
    this.data.setInStorage('tasks', [{
      nombreTarea: 'Task 1',
      descripcion: 'Task de prueba numero uno',
      fechaCreacion: '3/4/2025',
      completada: false,
    }]);
  }
}
