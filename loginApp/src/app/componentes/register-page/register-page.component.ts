import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.flashMensaje.show('Usuario creado correctamente.',
          { cssClass: 'alert-success container', timeout: 4000 });
        this.router.navigate(['/private']);
      }).catch((err) => {
        this.flashMensaje.show(err.message,
          { cssClass: 'alert-danger col-md-6 mx-auto', timeout: 4000 });
      });
  }
}
