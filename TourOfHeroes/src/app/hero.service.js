"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var oidc_client_1 = require("oidc-client");
require("rxjs/add/operator/toPromise");
var HeroService = (function () {
    function HeroService(http) {
        var _this = this;
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        //private heroesUrl = 'api/heroes';  // URL to web api
        this.heroesUrl = 'http://localhost:61925/api/tourofheroes'; // URL to web api
        this.config = {
            authority: "http://localhost:5000",
            client_id: "tour_of_heroes_js",
            redirect_uri: "http://localhost:3000/callback.html",
            response_type: "id_token token",
            scope: "openid tour_of_heroes_api",
            post_logout_redirect_uri: "http://localhost:3000/index.html",
        };
        this.mgr = new oidc_client_1.UserManager(this.config);
        this.mgr.getUser()
            .then(function (user) {
            if (user) {
                _this.currentUser = user;
                _this.headers.append('Authorization', 'Bearer ' + user.access_token);
            }
            else {
                _this.mgr.signinRedirect({ data: 'some data' })
                    .then(function () {
                    console.log('signinRedirect done');
                })
                    .catch(_this.handleError);
            }
        })
            .catch(this.handleError);
    }
    HeroService.prototype.getHeroes = function () {
        if (this.currentUser) {
            this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }
        return this.http.get(this.heroesUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        if (this.currentUser) {
            this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        if (this.currentUser) {
            this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        if (this.currentUser) {
            this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        if (this.currentUser) {
            this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            this.headers.append('Authorization', 'Bearer ' + this.currentUser.access_token);
        }
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map