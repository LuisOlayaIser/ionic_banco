import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Account, Movement } from '../../constante/interface';
import { ApiService } from '../../services/api/api.service';
import { dismissLoading, presentAlert, presentLoading } from '../../services/basic.service';
import { numeral } from '../../constante/constante';
import { MonedaPipe } from '../../pipes/moneda.pipe';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss'],
})
export class MovementFormComponent implements OnInit {

  data: Movement = {
    amount: null,
    coin: 'COP',
    description: '',
    origin_id: null,
    destination_id: null
  };
  coins = [];

  origin: Account;
  destination: Account;
  view = false;
  option = 1;
  inscriptions: any[] = [];
  propios: any[] = [];
  movementCreated: Movement = null;
  qr = false;
  disableAmount = false;
  numberDestino = '';

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private api: ApiService,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    this.origin = this.navParams.get('origin');
    const aux = this.navParams.get('tipoListado');
    if (aux == 'propios') {
      const aux2 = (await this.api.getResponse('account', 'GET', {}) as { data: any[] }).data;
      this.propios = aux2.filter(account => {
        return account.id !== this.origin.id;
      });
    } else if(aux == 'inscription') {
      this.inscriptions = (await this.api.getResponse('inscription', 'GET', {}) as { data: any[] }).data;
    } else {
      console.log(aux);
      const qr = aux.split('-');
      console.log(qr)
      this.data.amount = qr[2]=='null'?null: parseInt(qr[2]);
      this.disableAmount = qr[2]=='null'?false: true;
      this.data.destination_id = parseInt(qr[0]);
      this.numberDestino = qr[1];
      this.data.coin = qr[3];
      this.data.description = qr[4];
      this.option = 2;
      this.qr = true;

    }
    // this.destination = this.navParams.get('destination');
    this.data.origin_id = this.origin.id;
    // this.data.destination_id = this.destination.id;
    this.coins = numeral.coin;
    this.view = true;
  }

  closeModal(op = null) {
    this.modalCtrl.dismiss(op);
  }

  async send() {
    this.alertCtrl.create({
      header: 'Confirmacion',
      message: `Origen: ${this.origin.number}<br>
      Destino: ${this.qr?this.numberDestino:this.destination.number}<br>
      Monto: $${new MonedaPipe().transform(this.data.amount)} ${this.data.coin}<br>
      Descripción: ${this.data.description}`,
      buttons: [
        {
          text: 'Confirmar',
          handler: async () => {
            await presentLoading();
            try {
              if (this.data.coin == 'USD') {
                this.data.amount *= this.coins[1].value;
              }
              this.movementCreated = (await this.api.getResponse('movement', 'POST', this.data) as {data: Movement}).data;
              dismissLoading();
              presentAlert('Operación exitosa');
              this.closeModal(this.movementCreated);
            } catch (error) {
              if(this.data.amount> this.origin.balance) {
                presentAlert('El monto supera la cantidad de la cuenta');
              }
              if (this.data.coin == 'USD') {
                this.data.amount /= this.coins[1].value;

              }
              dismissLoading();
              if (this.data.amount<= this.origin.balance)
              presentAlert(error.error || error);

            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());

  }

  selectDestination(data: Account) {
    this.destination = data;
    this.data.destination_id = data.id;
    this.option = 2;
  }

  back() {
    this.option = 1;
  }

  

}
