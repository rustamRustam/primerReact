import {
  observable,
  action,
  // makeAutoObservable,
  makeObservable
} from 'mobx';

class CollectionMap {
  #map = false;

  constructor() {
    if(localStorage.hasOwnProperty('collection_rm')) {
      const _data = localStorage.getItem('collection');
      if (_data && _data != 'undefined') {
        this.map = new Map(Object.entries(JSON.parse(_data)));
      }
    } else {
      this.map = new Map();
    }

    makeObservable(this,{
      map: observable,
      delete: action,
      set: action,
      clear: action,
    });
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'collection_rm',
      JSON.stringify(Object.fromEntries(this.map.entries()))
    );
  }

  set(id, data) {
    if (!this.has(id)) {
      if (this.map.size < 10) {
        this.map.set(""+id, data);
        this.saveToLocalStorage();
      }
    }
  }

  delete(id) {
    this.map.delete(""+id);
    this.saveToLocalStorage();
  }

  has(id) {
    return this.map.has(""+id);
  }

  clear() {
    this.map.clear();
    this.saveToLocalStorage();
  }

  dataKartochkas() {
    let result = [];
    for (let data of this.map.values()) {
      result.push(data);
    }
    return result;
  }

};

const collection = new CollectionMap();

export default collection;
