import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { UserManager, User } from 'oidc-client';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private heroesUrl = 'api/heroes';  // URL to web api
  private heroesUrl = 'http://localhost:61925/api/tourofheroes';  // URL to web api

  private config = {
    authority: "http://localhost:5000",
    client_id: "tour_of_heroes_js",
    redirect_uri: "http://localhost:3000/callback.html",
    response_type: "id_token token",
    scope:"openid tour_of_heroes_api",
    post_logout_redirect_uri : "http://localhost:3000/index.html",
  };

  private mgr: UserManager  = new UserManager(this.config);  
  private currentUser: User; 

  constructor(private http: Http) {
    this.mgr.getUser()
    .then((user) => {
      if (user) {
        this.currentUser = user;
        this.headers.append('Authorization', 'Bearer ' + user.access_token);
      }
      else {
        this.mgr.signinRedirect({ data: 'some data' })
        .then(function () {
          console.log('signinRedirect done');
        })
        .catch(this.handleError);
      }
    })
    .catch(this.handleError); 
   }

  getHeroes(): Promise<Hero[]> {

        if (this.currentUser) {
          this.headers = new Headers({'Content-Type': 'application/json'});
          this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }

        return this.http.get(this.heroesUrl, {headers: this.headers})
        .toPromise()
        .then(response => 
               response.json() as Hero[])
        .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    
    if (this.currentUser) {
      this.headers = new Headers({'Content-Type': 'application/json'});
      this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
    }

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {

    if (this.currentUser) {
      this.headers = new Headers({'Content-Type': 'application/json'});
      this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
    }

    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {

      if (this.currentUser) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
      }

      return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Hero)
        .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    
    if (this.currentUser) {
      this.headers = new Headers({'Content-Type': 'application/json'});
      this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
    }

    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

