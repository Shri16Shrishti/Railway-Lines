import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontServiceService {
  private fontSizeSubject = new BehaviorSubject<number>(16); // default font size
  fontSize$ = this.fontSizeSubject.asObservable();

  increaseFont() {
    this.fontSizeSubject.next(this.fontSizeSubject.value + 2);
  }

  decreaseFont() {
    const newSize = this.fontSizeSubject.value - 2;
    this.fontSizeSubject.next(newSize > 8 ? newSize : 8); // min font size = 8px
  }
}
