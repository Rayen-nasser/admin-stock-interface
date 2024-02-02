import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  url: string = environment.baseApi.replace('auth', 'contact')

  constructor(
    private http: HttpClient
  ) { }

  getMessages(filter?: any){
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
          params = params.append(key, value);
      });
    }
    return this.http.get(this.url + '/all-messages', {params});
  }

  messageIsRead(id: string){
    return this.http.get( this.url+ '/message-been-read/' + id);
  }
}
