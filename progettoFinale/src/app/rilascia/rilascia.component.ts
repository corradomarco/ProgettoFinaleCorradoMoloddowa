import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rilascia',
  templateUrl: './rilascia.component.html',
  styleUrls: ['./rilascia.component.css']
})
export class RilasciaComponent {
 title = 'progetto';
  al:boolean=false;
  constructor(private http: HttpClient) { } //Dependency injection
  postObserver : Observable<Object>;//Cambiato tipo di dato attesto Utente -> Object
  postData : Object; //Cambiato tipo di dato Utente -> Object
  requestResult : Object; //nuovo oggetto per contenere il risultato della richiesta
  postObserver2 : Observable<Object>;
  postData2 : Object;

prenota(id: HTMLInputElement,data:HTMLInputElement): boolean {
    let newData: Utente = new Utente();
    newData.id = id.value;
    newData.disponibilità= "si";
    newData.data = data.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver2 = this.http.post('https://3000-aab306fa-cbb2-4d96-8354-6a431652cb34.ws-eu01.gitpod.io/prenota', JSON.stringify(newData),headers)
    this.postObserver2.subscribe(data => this.postData2 = data);
    return false;
  }








}

