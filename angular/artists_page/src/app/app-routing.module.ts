import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogKartochekComponent } from './catalog-kartochek/catalog-kartochek.component';
import { CollectionKartochekComponent } from './collection-kartochek/collection-kartochek.component';
import { KartochekaViewComponent } from './kartocheka-view/kartocheka-view.component';

const routes: Routes = [
  { path: '', component: CatalogKartochekComponent},
  { path: 'collection', component: CollectionKartochekComponent},
  { path: 'kartochka/:id', component: KartochekaViewComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
