import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountFormComponent } from 'src/app/core/components/account-form/account-form.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { dismissLoading, presentLoading } from 'src/app/core/services/basic.service';
import { Account } from '../../core/constante/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  accounts: Account[] = [];

  constructor(
    private api: ApiService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    await presentLoading();
    try {
      this.accounts = (await this.api.getResponse('account', 'GET', {}) as {data: Account[]}).data;
      dismissLoading();
    } catch (error) {
      dismissLoading();
    }
  }

  openModal() {
    this.modalCtrl.create({
      component: AccountFormComponent
    }).then(modal => {modal.present(); 
    modal.onWillDismiss().then(async (res) => {
      if (res.data === 1) {
        this.accounts = (await this.api.getResponse('account', 'GET', {}) as {data: Account[]}).data;
      }
    })});
  }

  movement(id) {
    this.router.navigate(['movement/'+id]);
  }



}
