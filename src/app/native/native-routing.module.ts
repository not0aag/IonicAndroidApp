import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NativePage } from './native.page';

const routes: Routes = [
  {
    path: '',
    component: NativePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NativePageRoutingModule {}
