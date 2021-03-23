import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Movement } from '../../constante/interface';

@Component({
  selector: 'app-movement-created',
  templateUrl: './movement-created.component.html',
  styleUrls: ['./movement-created.component.scss'],
})
export class MovementCreatedComponent implements OnInit {

  data: Movement;
  view = false;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.data = this.navParams.get('data');
    this.view = true;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }


}
