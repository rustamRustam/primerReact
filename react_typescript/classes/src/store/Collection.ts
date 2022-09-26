import { TKartochka } from './Kartochki';

class CollectionMap extends Map<number,TKartochka> {

  constructor() {
    if(localStorage.hasOwnProperty('collection')) {
      const _data = localStorage.getItem('collection');
      if (_data && _data != 'undefined') {
        const json_data = JSON.parse(_data);

        super();
        for( let id in json_data ){
          const kartochka:TKartochka = json_data[id];
          super.set(kartochka.id, kartochka);
        }


      }
    } else {
      super();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'collection',
      JSON.stringify(Object.fromEntries(this.entries()))
    );
  }

  set(id:number, data:TKartochka):this {
    if (!super.has(id)) {
      if (this.size < 10) {
        super.set(id, data);
        this.saveToLocalStorage();
      }
    }
    return this;
  }

  delete(id:number):boolean {
    const result:boolean = super.delete(id);
    this.saveToLocalStorage();
    return result;
  }

  has(id:number) {
    return super.has(id);
  }

  clear() {
    super.clear();
    this.saveToLocalStorage();
  }

  dataKartochkas() {
    let result:TKartochka[] = [];
    for (let data of this.values()) {
      result.push(data);
    }
    return result;
  }

};

const collection = new CollectionMap();

export default collection;
