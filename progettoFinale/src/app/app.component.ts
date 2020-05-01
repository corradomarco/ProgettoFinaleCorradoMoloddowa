import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from './user';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progettoFinale';
  obsUnit: Observable<Utente[]>; //L’observable che sta in attesa dei dati
  data: Utente[];
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Utente[]>('https://3000-fb4604c6-1493-4ba5-abff-30ae10676aa7.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Utente[]) => {this.data = data;});
  }
  postObserver : Observable<Object>;
postData : Object;
selectUnit( newDeploytime: HTMLInputElement): boolean {
    let newData: Utente = new Utente();




    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-fb4604c6-1493-4ba5-abff-30ae10676aa7.ws-eu01.gitpod.io/users', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }


}
