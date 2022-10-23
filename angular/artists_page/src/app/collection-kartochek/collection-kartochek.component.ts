import { Component, OnInit } from '@angular/core';

import Kartochki, { TDataKartochkas, TKartochka, TKeyFilters, TValueFilters } from '../store/Kartochki';

import { CollectionService } from '../store/collection.service';

@Component({
  selector: 'app-collection-kartochek',
  templateUrl: './collection-kartochek.component.html',
  styleUrls: ['./collection-kartochek.component.scss']
})
export class CollectionKartochekComponent implements OnInit {

  dataKartochkas: TKartochka[] = [];
  dataTotalCount: number = 0;

  constructor(private collection: CollectionService) {
  }

  ngOnInit(): void {
    this.collection.updateDataKartochkas.subscribe(_dataKartochkas => {
      this.dataKartochkas = this.collection.dataKartochkas();
      this.dataTotalCount = this.dataKartochkas.length;
    });

    this.dataKartochkas = this.collection.dataKartochkas();
    this.dataTotalCount = this.dataKartochkas.length;
  }

}