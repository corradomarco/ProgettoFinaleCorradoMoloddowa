import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

    rilascia(id: HTMLInputElement): boolean {
    let newData: Utente = new Utente();
    console.log(id.value);
    newData.id = id.value;
    newData.disponibilità= "si";
    let date = new Date();
    newData.data = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" " + date.getHours()+":"+date.getMinutes()+":" +date.getSeconds();

    console.log(newData);
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver2 = this.http.post(`${environment.serverUrl}/rilascia`, newData,headers);
    this.postObserver2.subscribe(data => {this.postData2 = data; console.log(data);});
    return false;
  }


}

