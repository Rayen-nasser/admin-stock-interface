import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchData$: Observable<string> = this.searchDataSubject.asObservable();

  private optionDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  optionData$: Observable<string> = this.optionDataSubject.asObservable();

  constructor() {}

  setSearchData(data: string): void {
    this.searchDataSubject.next(data);
  }

  getSearchData(): Observable<string> {
    return this.searchData$;
  }

  setOptionData(data: string): void{
    this.optionDataSubject.next(data);
  }

  getOptionData(): Observable<string> {
    return this.optionData$;
  }
}
