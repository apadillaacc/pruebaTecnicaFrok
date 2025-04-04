import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Task } from '../services/data.service';
import { RemoteConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  private remoteConfig = inject(RemoteConfigService);
  @Input() task?: Task;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<void>();
  @Output() onChangeCategory = new EventEmitter<void>();
  showNewFeature = false;
  

  ngOnInit(): void {
    this.showNewFeature = this.remoteConfig.getNewFeatureFlag();
  }

  deleteTask() {
    this.onDelete.emit();
  }

  completeTask() {
    this.onComplete.emit();
  }

  changeCategory() {
    this.onChangeCategory.emit();
  }
}
