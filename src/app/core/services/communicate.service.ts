import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IDevice, ILocation, AppState, IActivity, IWidget } from '@app/iot/definitions';
import { IRole } from '@app/core/definitions';
import { RequestsService } from './requests.service';

@Injectable()
export class CommunicateService {

  /**
   * Holds the current socket connection to server.
   * If you want to change your remote, you need to change
   * this socket connection.
   */

  public devices: Observable<Array<IDevice>>;
  public locations: Observable<Array<ILocation>>;
  public roles: Observable<Array<IRole>>;
  public activities: Observable<Array<IActivity>>;
  public widgets: Observable<Array<IWidget>>;

  constructor(private store: Store<AppState>, private requests: RequestsService) {
    this.getDevices();
    this.getRoles();
    this.getLocations();
    this.getActivities();
    this.getWidgets();

  }

  async authenticateUser (username: string, password: string) {
    const user = await this.requests.authenticateUser(username, password);
    return user;
  }

  async getWidgets () {
    const collections = await this.requests.getWidgets();
    for (const item of collections) {
      this.store.dispatch({
        type: 'UPDATE_WIDGET',
        payload: item
      });
    }
  }

  async getActivities () {
    const collections = await this.requests.getActivities();
    for (const item of collections) {
      this.store.dispatch({
        type: 'UPDATE_ACTIVITY',
        payload: item
      });
    }
  }

  async getDevices () {
    const collections = await this.requests.getDevices();
    for (const item of collections) {
      this.store.dispatch({
        type: 'UPDATE_DEVICE',
        payload: item
      });
    }
  }

  async getLocations () {
    const collections = await this.requests.getLocations();
    for (const item of collections) {
      this.store.dispatch({
        type: 'UPDATE_LOCATION',
        payload: item
      });
    }
  }

  async getRoles () {
    const collections = await this.requests.getRoles();
    for (const item of collections) {
      this.store.dispatch({
        type: 'INSERT_ROLE',
        payload: item
      });
    }
  }

  findRoleById (id: Number): IRole {
    let role = null;
    this.store.select('roles').subscribe((collection: Array<IRole>) => {
      role = collection.find(x => x.id === id);
    });
    return role;
  }

}
