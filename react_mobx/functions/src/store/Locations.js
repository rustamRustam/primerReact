import {
  observable,
  action,
  // makeAutoObservable,
  makeObservable
} from 'mobx';

import Loader from './Loader';

class Locations {
  patch_url = "/locations";
  loading = false;

  dataLocations = [];

  constructor() {
    makeObservable(this,{
      dataLocations: observable,
      setDataLocations: action,
    });
  }

  setDataLocations(_dataLocations) {
    this.dataLocations = _dataLocations;
  }

  loadData() {
    if (!this.loading) {
      this.loading = true;
      Loader.loadData(
        this.patch_url,
        (response)=>{

          const dataLocations = [
          {
            "id": 0,
            "location": "Locations"
          }].concat(response);

          this.setDataLocations(dataLocations);
        }
      );
    }
  }

  getById(id, cb) {
    id = +id;
    let result_data = false;
    if (this.dataLocations) {
      this.dataLocations.dataLocations.some((dataAuthor)=>{
        if(dataAuthor.id === id) {
          result_data = dataAuthor;
          return true;
        }
        return false;
      });
    }
    if(result_data) {
      cb(result_data)
    } else {
      Loader.loadData(
        this.patch_url+'?id='+id,
        (response)=>{
          if (response.length) {
            cb(response[0]);
          } else {
            cb(false);
          }
        }
      );
    }
  }

};

const locations = new Locations();

export default locations;
