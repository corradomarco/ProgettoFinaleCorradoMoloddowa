import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
 title = 'progetto';
  al:boolean=false;
  constructor(private http: HttpClient) { } //Dependency injection
postObserver : Observable<Object>;//Cambiato tipo di dato attesto Utente -> Object
  postData : Object; //Cambiato tipo di dato Utente -> Object
  requestResult : Object; //nuovo oggetto per contenere il risultato della richiesta

idBici(id: HTMLInputElement): void {
    this.postData={
      id:id.value

    }
    console.log("home");
    this.postObserver = this.http.get(`https://3000-a9c89bff-e19a-4a48-aa1a-08ec5dc9bcb5.ws-eu01.gitpod.io/id/${id.value}`); //Cambiato url e tipo di oggetto restituito dal server
                                        //BISOGNA SEMPRE AGGIORNARE L'URL QUANDO SI RIAVVIA GITPOD
    this.postObserver.subscribe(data => {this.requestResult = data; console.log(this.requestResult)
        if(data["success"]==true){
        console.log("funziona")
          this.al=true;
    }
  });//Salvo i dati ricevuti nella nuova variabile e loggo il risultato
  }





}
