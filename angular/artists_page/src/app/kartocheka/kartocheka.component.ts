import { Component, OnInit, Input } from '@angular/core';

import { TKartochka } from '../store/Kartochki';

@Component({
  selector: 'app-kartocheka',
  templateUrl: './kartocheka.component.html',
  styleUrls: ['./kartocheka.component.scss']
})
export class KartochekaComponent implements OnInit {

  @Input() dataKartocheka: TKartochka = {
    "authorId": -1,
    "created": "",
    "id": -1,
    "imageUrl": "",
    "locationId": -1,
    "name": ""
  };

  constructor() { }

  ngOnInit(): void {
  }

}