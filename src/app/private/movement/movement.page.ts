import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { InscriptionAccountComponent } from 'src/app/core/components/inscription-account/inscription-account.component';
import { MovementCreatedComponent } from 'src/app/core/components/movement-created/movement-created.component';
import { MovementFormComponent } from 'src/app/core/components/movement-form/movement-form.component';
import { ShowImageComponent } from 'src/app/core/components/show-image/show-image.component';
import { Account } from 'src/app/core/constante/interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { dismissLoading, presentAlert, presentLoading } from 'src/app/core/services/basic.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.page.html',
  styleUrls: ['./movement.page.scss'],
})
export class MovementPage implements OnInit {

  account: Account = null;
  view = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private actionSheet: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner
  ) { }

  async ngOnInit() {
    await presentLoading();
    const id = this.route.snapshot.paramMap.get('id');
    try {
      this.account = (await this.api.getResponse('account/' + id, 'GET', {}) as { data: Account }).data;
      this.account.movements = this.account.movements.reverse();
      this.view = true;
      dismissLoading();
    } catch (error) {
      dismissLoading();
    }
  }

  openAction() {
    this.actionSheet.create({
      header: 'Acciones',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Inscribir cuenta',
          handler: () => {
            this.openModalInscription();
          }
        },
        {
          text: 'Enviar dinero a cuentas inscritas',
          handler: () => {
            this.openModalMovement();
          }
        },
        {
          text: 'Enviar dinero a cuentas propias',
          handler: () => {
            this.openModalMovement('propios');
          }
        },
        {
          text: 'Generar codigo Qr',
          handler: () => {
            this.selectCoin();
          }
        },
        {
          text: 'Abrir codigo Qr',
          handler: () => {
            this.openQr();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then(action => action.present());
  }

  openModalInscription() {
    this.modalCtrl.create({
      component: InscriptionAccountComponent
    }).then(modal => modal.present());
  }

  openModalMovement(op = 'inscription') {
    this.modalCtrl.create({
      component: MovementFormComponent,
      componentProps: {
        origin: this.account,
        tipoListado: op
      }
    }).then(modal => {
      modal.present();
      modal.onWillDismiss().then(async (res) => {
        if (res.data !== null) {
          this.account = (await this.api.getResponse('account/' + this.account.id, 'GET', {}) as { data: Account }).data;
          this.account.movements = this.account.movements.reverse();
          this.openModalMovementCreated(res.data);

        }
      })
    });
  }

  editAlias() {
    this.alertCtrl.create({
      header: 'Editar alias',
      inputs: [
        {
          name: 'alias',
          value: '',
          placeholder: 'Escribe un alias'
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: (datas) => {
            const data = {
              alias: datas.alias
            };
            this.api.getResponse('account/'+this.account.id, 'PATCH', data).then(() => {
              this.account.alias = datas.alias;
              presentAlert('Operacion exitosa')
            }, () => presentAlert('No se pudo actualizar'));
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }

  openModalMovementCreated(data) {
    this.modalCtrl.create({
      component: MovementCreatedComponent,
      componentProps: {
        data
      }
    }).then(modal => modal.present());
  }

  selectCoin() {
    this.alertCtrl.create({
      header: 'Seleccina la moneda',
      buttons: [
        {
          text: 'COP',
          handler: () => {
            this.generateQr('COP');
          }
        },
        {
          text: 'USD',
          handler: () => {
            this.generateQr('USD');
          }
        },
      ]
    }).then(alert => alert.present());
  }

  generateQr(moneda) {
    this.alertCtrl.create({
      header: 'Generar codigo Qr',
      inputs: [
        {
          name: 'description',
          value: '',
          placeholder: 'Escribe una descripción'
        },
        {
          name: 'amount',
          value: null,
          placeholder: 'Monto (Opcional)',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Generar',
          handler: (datas) => {
            
            const data = {
              amount: datas.amount,
              description: datas.description,
              coin: moneda
            };
            this.api.getResponse('qr/'+this.account.id, 'POST', data).then((res: {data:string}) => {
              this.showImage(res.data);
            })
          }
        }
      ]
    }).then(alert => alert.present());
  }

  showImage(url: string) {
    this.modalCtrl.create({
      component: ShowImageComponent,
      componentProps: {
        url
      }
    }).then(modal => modal.present());
  }

  openQr() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.openModalMovement(barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });

         
    
  }


}
