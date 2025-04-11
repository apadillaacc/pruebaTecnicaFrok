import { Component, inject, OnInit } from '@angular/core';
import { StorageInitUseCase } from './domain/usecases/storage-init';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  private storageInit = inject(StorageInitUseCase)
  constructor() { }
  
  ngOnInit(): void {
    this.storageInit.execute();  
  }
}
