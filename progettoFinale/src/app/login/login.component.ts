


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
    this.obsUnit = this.http.get<Utente[]>('https://3000-ad045dd7-d0a0-41ce-aa9a-dfc34db44243.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Utente[]) => {this.data = data;});
  }
  postObserver : Observable<Utente[]>;
  postData : any;

addUnit(Username: HTMLInputElement,Password:HTMLInputElement): void {
    this.postData={
      Username:Username.value,
      Uassword:Password.value
    }

    this.postObserver = this.http.get<Utente[]>(`https://3000-ad045dd7-d0a0-41ce-aa9a-dfc34db44243.ws-eu01.gitpod.io/${Username.value}/${Password.value}`);
    this.postObserver.subscribe((postdata:Utente[]) => {this.postData = postdata;});

  }


}
