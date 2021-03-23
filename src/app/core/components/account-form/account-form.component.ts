import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Account, Bank } from '../../constante/interface';
import { ApiService } from '../../services/api/api.service';
import { dismissLoading, isNullOrUndefined, presentAlert, presentLoading } from '../../services/basic.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {

  data: Account = {
    alias: '',
    account_type_id: null,
    bank_id: null
  };
  accountTypes: Bank[] = [];
  banks: Bank[] = [];

  constructor(
    private api: ApiService, 
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  async ngOnInit() {
    await presentLoading();
    try {
      this.accountTypes = (await this.api.getResponse('accountType', 'GET', {}) as {data: Bank[]}).data;
      this.banks = (await this.api.getResponse('bank', 'GET', {}) as {data: Bank[]}).data;
      dismissLoading();
    } catch (error) {
      dismissLoading();
      
    }
  }

  async send() {
    await presentLoading();
    try {
      
      await this.api.getResponse('account', 'POST', this.data);
      dismissLoading();
      presentAlert('Operación exitosa');
      this.closeModal(1);
    } catch (error) {
      dismissLoading();
      presentAlert('Ocurrio un problema, vuelve a intentarlo');
    }
  }

  closeModal(op = null) {
    this.modalCtrl.dismiss(op);
  }

}
