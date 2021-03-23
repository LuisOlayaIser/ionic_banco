import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from 'src/app/core/constante/interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { dismissLoading, presentAlert, presentLoading } from 'src/app/core/services/basic.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  data: Signup = {
    email: '',
    identification_card: '',
    name: '',
    password: ''
  };

  passwordRepit = '';

  typeInput = 'password';
  typeInputRepit = 'password';
  iconpassword = 'eye-off-outline';
  iconpasswordRepit = 'eye-off-outline';


  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  togglePasswordMode() {
    this.typeInput = this.typeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  togglePasswordModeRepit() {
    this.typeInputRepit = this.typeInputRepit === 'text' ? 'password' : 'text';
    this.iconpasswordRepit = this.iconpasswordRepit === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  async send() {
    if (this.data.password === this.passwordRepit) {
      await presentLoading();
      this.api.getResponse('signup', 'POST', this.data).then(() => {
        dismissLoading();
        this.router.navigate(['login']);
        presentAlert('Operacion exitosa');
      }, () => {dismissLoading(); presentAlert('Ocurrió un error. Vuelve a intentarlo');})
    } else {
      presentAlert('Las contraseñas no coinciden');
    }
  }

}
