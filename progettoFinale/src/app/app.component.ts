import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from './user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progettoFinale';
  obsUnit: Observable<Utente[]>; //L’observable che sta in attesa dei dati
  data: Utente[];

  currentLat:number;
  currentLong:number;

  constructor(private http: HttpClient) { } //Dependency injection

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
  }
findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Utente[]>(`${environment.serverUrl}users`);
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Utente[]) => {this.data = data;});
  }
  postObserver : Observable<Object>;
postData : Object;
selectUnit( newDeploytime: HTMLInputElement): boolean {
    let newData: Utente = new Utente();
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post(`${environment.serverUrl}/users`, JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }



}
