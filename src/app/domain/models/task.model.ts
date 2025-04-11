export interface TaskModel {
  nombreTarea: string;
  descripcion: string;
  fechaCreacion: string;
  completada: boolean;
  categoria?: string;
}