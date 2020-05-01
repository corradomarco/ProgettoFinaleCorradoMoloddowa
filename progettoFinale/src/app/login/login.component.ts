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
 formLog : FormGroup;
  constructor(fb : FormBuilder) {
    this.formLog = fb.group(
      {
        username : ['', Validators.required],
        password : ['', Validators.required]
      }
    )
  }
  login()
  {
    for(let i = 0; i < this.utenti.length; i++)
    {
      if(this.formLog.controls['username'].value == this.utenti[i].username &&
        this.formLog.controls['password'].value == this.utenti[i].password)
      {
        this.loggedUser = this.utenti[i];
        this.userLogin.emit(this.loggedUser);
        console.log(this.loggedUser);
        break;
      }
    }
  }

  ngOnInit() {
  }

}
