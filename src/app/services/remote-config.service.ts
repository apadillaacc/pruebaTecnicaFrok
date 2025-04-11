import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  RemoteConfig,
} from '@angular/fire/remote-config';
import {
  getBoolean,
  getRemoteConfig,
  fetchAndActivate,
} from 'firebase/remote-config'

@Injectable({
  providedIn: 'root',
})

export class RemoteConfigService {
  private remoteConfig = inject(RemoteConfig);
  private app: FirebaseApp = inject(FirebaseApp);
  private activateNewFeature = false;

  constructor() {
    this.remoteConfig = getRemoteConfig(this.app);
    // Se dejó en cero segundos por cuestion de realizar las pruebas de una manera más rápida
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 10000
    };
  }

  /**
   * Consulta y activa la conexion con firebase config y carga el flag encargado
   * de mostar la funcionalidad de categorías
   */
  async initializeApp() {
    try {
      await fetchAndActivate(this.remoteConfig);
      this.activateNewFeature = getBoolean(this.remoteConfig, 'FuncionesAdicionales');
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }

  /**
   * Retorna el valor del flag consultado
   */
  getNewFeatureFlag(): boolean {
    return this.activateNewFeature;
  }
}
