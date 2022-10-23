import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CollectionService } from './store/collection.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogKartochekComponent } from './catalog-kartochek/catalog-kartochek.component';
import { CollectionKartochekComponent } from './collection-kartochek/collection-kartochek.component';
import { KartochekaComponent } from './kartocheka/kartocheka.component';
import { KartochekaViewComponent } from './kartocheka-view/kartocheka-view.component';
import { LoadingComponent } from './loading/loading.component';
import { NameComponent } from './name/name.component';
import { NumeraciyaComponent } from './numeraciya/numeraciya.component';
import { OpisanieComponent } from './opisanie/opisanie.component';
import { SelectComponent } from './select/select.component';
import { VitrinaComponent } from './vitrina/vitrina.component';
import { ButtonComponent, ButtonAddRemove, ButtonClear } from './button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogKartochekComponent,
    CollectionKartochekComponent,
    KartochekaComponent,
    KartochekaViewComponent,
    LoadingComponent,
    NameComponent,
    NumeraciyaComponent,
    OpisanieComponent,
    SelectComponent,
    VitrinaComponent,
    ButtonComponent,
    ButtonAddRemove,
    ButtonClear
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CollectionService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
