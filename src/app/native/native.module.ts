import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NativePageRoutingModule } from './native-routing.module';

import { NativePage } from './native.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NativePageRoutingModule],
  declarations: [NativePage],
})
export class NativePageModule {}
