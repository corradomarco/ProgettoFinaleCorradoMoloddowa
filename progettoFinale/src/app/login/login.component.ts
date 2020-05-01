import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loggedUser : Utente;
  @Input() utenti : Utente[];
  @Output() userLogin = new EventEmitter<Utente>();


  ngOnInit() {
  }

}
