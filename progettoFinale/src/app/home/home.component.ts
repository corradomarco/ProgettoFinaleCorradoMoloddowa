import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
 title = 'progetto';
  al:boolean=false;
  isTracking: boolean;
  constructor(private http: HttpClient) { } //Dependency injection
  postObserver : Observable<Object>;//Cambiato tipo di dato attesto Utente -> Object
  postData : Object; //Cambiato tipo di dato Utente -> Object
  requestResult : Object; //nuovo oggetto per contenere il risultato della richiesta
  postObserver2 : Observable<Object>;
  postData2 : Object;
  idBici(id: HTMLInputElement): void {
    this.postData={
      id:id.value

    }
    console.log("home");
    this.postObserver = this.http.get(`${environment.serverUrl}/id/${id.value}`); //Cambiato url e tipo di oggetto restituito dal server
                                        //BISOGNA SEMPRE AGGIORNARE L'URL QUANDO SI RIAVVIA GITPOD

    this.postObserver.subscribe(data => {this.requestResult = data; console.log(this.requestResult)
        if(data["success"]==true){
        console.log("funziona")
          this.al=true;
    }
  });
  }

    prenota(id: HTMLInputElement): boolean {
    let newData: Utente = new Utente();
    console.log(id.value);
    newData.id = id.value;
    newData.disponibilità= "no";
    let date = new Date();
    newData.data = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" " + date.getHours()+":"+date.getMinutes()+":" +date.getSeconds();

    console.log(newData);
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver2 = this.http.post(`${environment.serverUrl}/prenota`, newData,headers);
    this.postObserver2.subscribe(data => {this.postData2 = data; console.log(data);});
    return false;
  }

}
