import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Task } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private platform = inject(Platform);
  @Input() task?: Task;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<void>();
  isIos() {
    return this.platform.is('ios')
  }

  deleteTask() {
    this.onDelete.emit();
  }

  completeTask() {
    this.onComplete.emit();
  }
}
