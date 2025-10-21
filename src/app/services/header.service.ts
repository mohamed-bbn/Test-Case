import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _isUnactive = new BehaviorSubject<boolean>(false);
  isUnactive$ = this._isUnactive.asObservable();

  toggle() {
    this._isUnactive.next(!this._isUnactive.value);
  }
}