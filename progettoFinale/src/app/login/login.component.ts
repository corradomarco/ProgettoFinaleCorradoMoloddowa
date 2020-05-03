


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'progetto';
  obsUnit: Observable<Utente[]>; //L’observable che sta in attesa dei dati
  data: Utente[];
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Utente[]>('https://3000-db1efc4d-8341-4f10-97b1-772b75753341.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Utente[]) => {this.data = data;});
  }
  postObserver : Observable<Object>;
postData : Object;
addUnit(Username: HTMLInputElement,Password:HTMLInputElement): boolean {
    this.postData={
      Username:Username.value,
      Password:Password.value
    }


    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-db1efc4d-8341-4f10-97b1-772b75753341.ws-eu01.gitpod.io/users', JSON.stringify(this.postData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }


}
