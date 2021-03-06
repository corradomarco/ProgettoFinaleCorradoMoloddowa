import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'progetto';
  obsUnit: Observable<Utente[]>; //L’observable che sta in attesa dei dati
  data: Utente[];
  al:boolean=false;
  noLog:boolean=true;
  formLog : FormGroup;
  constructor(private http: HttpClient,private location: Location,fb : FormBuilder) {  //Dependency injection

  this.formLog = fb.group(
      {
        username : ['', Validators.required],
        password : ['', Validators.required]
      }
    )
  }
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Utente[]>(`${environment.serverUrl}/users`);
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Utente[]) => {this.data = data;});
  }
postObserver : Observable<Object>;//Cambiato tipo di dato attesto Utente -> Object
  postData : Object; //Cambiato tipo di dato Utente -> Object
  requestResult : Object; //nuovo oggetto per contenere il risultato della richiesta
addUnit(Username: HTMLInputElement,Password:HTMLInputElement): void {
    this.postData={
      Username:Username.value,
      Password:Password.value
    }
    console.log("fffff");
    this.postObserver = this.http.get(`${environment.serverUrl}/search/${Username.value}/${Password.value}`); //Cambiato url e tipo di oggetto restituito dal server
                                        //BISOGNA SEMPRE AGGIORNARE L'URL QUANDO SI RIAVVIA GITPOD
    this.postObserver.subscribe(data => {this.requestResult = data; console.log(this.requestResult)
       if(data["success"]==true){
        console.log("funziona")
          this.al=true;
          this.noLog=false;
    }
    });
  }


}

