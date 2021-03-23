import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Bank } from '../../constante/interface';
import { ApiService } from '../../services/api/api.service';
import { dismissLoading, presentAlert, presentLoading } from '../../services/basic.service';

@Component({
  selector: 'app-inscription-account',
  templateUrl: './inscription-account.component.html',
  styleUrls: ['./inscription-account.component.scss'],
})
export class InscriptionAccountComponent implements OnInit {

  accountTypes: Bank[] = [];
  banks: Bank[] = [];
  data: any = {
    alias: '',
    number: '',
    cc: '',
    type_account: null,
    bank: null
  }

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService
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

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async send() {
    await presentLoading();
    try {
      
      await this.api.getResponse('inscription', 'POST', this.data);
      dismissLoading();
      presentAlert('Operación exitosa');
      this.closeModal();
    } catch (error) {
      dismissLoading();
      presentAlert(error.error);
      
    }
  }

}
