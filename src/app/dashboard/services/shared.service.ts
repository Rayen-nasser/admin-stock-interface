import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchDataSubject: { [key: string]: BehaviorSubject<string> } = {};
  private optionDataSubject: { [key: string]: BehaviorSubject<string> } = {};

  constructor() {
    this.initializeSubjects(['product', 'user', 'message', 'cart']);
  }

  private initializeSubjects(types: string[]): void {
    types.forEach(type => {
      this.searchDataSubject[type] = new BehaviorSubject<string>('');
      this.optionDataSubject[type] = new BehaviorSubject<string>('');
    });
  }

  setSearchData(type: string, data: string): void {
    if (this.searchDataSubject[type]) {
      this.searchDataSubject[type].next(data);
    }
  }

  getSearchData(type: string): Observable<string> {
    return this.searchDataSubject[type].asObservable();
  }

  setOptionData(type: string, data: string): void {
    if (this.optionDataSubject[type]) {
      this.optionDataSubject[type].next(data);
    }
  }

  getOptionData(type: string): Observable<string> {
    return this.optionDataSubject[type].asObservable();
  }
}
