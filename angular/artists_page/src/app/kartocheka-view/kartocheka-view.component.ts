import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import Kartochki, { TKartochka } from '../store/Kartochki';
import Authors, { TAuthor } from '../store/Authors';
import Locations from '../store/Locations';

@Component({
  selector: 'app-kartocheka-view',
  templateUrl: './kartocheka-view.component.html',
  styleUrls: ['./kartocheka-view.component.scss']
})
export class KartochekaViewComponent implements OnInit {

  dataKartocheka:TKartochka | null = null;
  @Input() id:number = 0;

  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      Kartochki.getById(
        this.id,
        (dataKartochki)=>{
          if(dataKartochki && typeof dataKartochki === "object") {
            Authors.getById(
              dataKartochki.authorId,
              (dataAuthor)=>{
                if(dataAuthor && typeof dataAuthor === "object") {
                  dataKartochki.author = dataAuthor.name;
                  Locations.getById(
                    dataKartochki.locationId,
                    (dataLocation)=>{
                      if(dataLocation && typeof dataLocation == "object"){
                        dataKartochki.location = dataLocation.location;
                        this.dataKartocheka = dataKartochki;
                      }
                    }
                  )
                }
              }
            );
          }
        }
      );
    }
  }

}
