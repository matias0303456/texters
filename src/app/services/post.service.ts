import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  create(token, post):Observable<any>{
    let json = JSON.stringify(post);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.post(this.url+'post/create', params, {headers:headers});
  }

  getPosts(user_id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'post/get-posts/'+user_id, {headers:headers});
  }

  getPost(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'post/get-post/'+id, {headers:headers});
  }

  update(token, post, id):Observable<any>{
    let json = JSON.stringify(post);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.put(this.url+'post/update/'+id, params, {headers:headers});
  }

  delete(token, id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.delete(this.url+'post/delete/'+id, {headers:headers});
  }

}
