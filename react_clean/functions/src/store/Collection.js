
class CollectionMap extends Map {
  constructor() {
    if(localStorage.hasOwnProperty('collection')) {
      const _data = localStorage.getItem('collection');
      if (_data && _data != 'undefined') {
        super(Object.entries(JSON.parse(_data)));
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

  set(id, data) {
    if (!super.has(id)) {
      if (this.size < 10) {
        super.set(""+id, data);
        this.saveToLocalStorage();
      }
    }
  }

  delete(id) {
    super.delete(""+id);
    this.saveToLocalStorage();
  }

  has(id) {
    return super.has(""+id);
  }

  clear() {
    super.clear();
    this.saveToLocalStorage();
  }

  dataKartochkas() {
    let result = [];
    for (let data of this.values()) {
      result.push(data);
    }
    return result;
  }

};

const collection = new CollectionMap();

export default collection;
