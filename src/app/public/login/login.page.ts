import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { environment } from 'src/app/core/constante/constante';
import { dismissLoading, presentAlert, presentLoading } from 'src/app/core/services/basic.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NetworkService } from 'src/app/core/services/network/network.service';
import { StoragesService } from 'src/app/core/services/storages/storages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  subscription;

  typeInput = 'password';
  iconpassword = 'eye-off-outline';

  public user = '';
  public pass = '';
  version = '';
  load;

  constructor(
    private router: Router,
    private Loading: LoadingController,
    private storages: StoragesService,
    private loginSer: LoginService,
    private platform: Platform,
  ) {
    this.user = '';
    this.pass = '';
  }

  async ngOnInit() {
    await presentLoading();
      this.user = '';
      this.pass = '';
      this.version = environment.version;
      dismissLoading();


  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.subscription = this.platform.backButton.subscribe(() => {
        navigator['app'].exitApp();
      });
    }, 1000);

  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  togglePasswordMode() {
    this.typeInput = this.typeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  async login() {
    await presentLoading();
    this.loginSer.login(this.user, this.pass).then(async (data) => {
      if (data === 1) {
        this.user = '';
          this.pass = '';
          dismissLoading();
          this.router.navigate(['/home']);
      } else {
        dismissLoading();
        presentAlert(data);
      }
    }, error => {
      dismissLoading();
      presentAlert('No puede iniciar sesión con las credenciales proporcionadas');
    });
  }
}
