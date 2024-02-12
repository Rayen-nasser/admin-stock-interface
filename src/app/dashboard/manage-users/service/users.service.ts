import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: string = environment.baseApi;
  constructor(private http: HttpClient) {}

  getUsers(userFilter?: any) {
    let params = new HttpParams();
    if (userFilter) {
      Object.entries(userFilter).forEach(([key, value]: any) => {
        params = params.append(key, value);
      });
    }
    return this.http.get(this.url + '/all-users', {params});
  }

  delete(id: string) {
    return this.http.delete(this.url + `/${id}`);
  }

  changeStatus(id: string) {
    return this.http.get(
      this.url + '/user-status/' + id
    );
  }
}
