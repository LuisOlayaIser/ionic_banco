import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovementPageRoutingModule } from './movement-routing.module';

import { MovementPage } from './movement.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovementPageRoutingModule,
    PipesModule
  ],
  declarations: [MovementPage]
})
export class MovementPageModule {}
