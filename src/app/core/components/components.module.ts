import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { AccountFormComponent } from './account-form/account-form.component';
import { InscriptionAccountComponent } from './inscription-account/inscription-account.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { MovementCreatedComponent } from './movement-created/movement-created.component';
import { ShowImageComponent } from './show-image/show-image.component';


@NgModule({
  declarations: [
    // componentes
    AccountFormComponent,
    InscriptionAccountComponent,
    MovementFormComponent,
    MovementCreatedComponent,
    ShowImageComponent,
  ],
  exports: [
    // componentes
    AccountFormComponent,
    InscriptionAccountComponent,
    MovementFormComponent,
    MovementCreatedComponent,
    ShowImageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
  ],
})
export class ComponentsModule { }
export const components = [
  // componentes
  AccountFormComponent,
  InscriptionAccountComponent,
  MovementFormComponent,
  MovementCreatedComponent,
  ShowImageComponent,
];
