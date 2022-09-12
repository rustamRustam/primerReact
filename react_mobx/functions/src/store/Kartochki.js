import {
  observable,
  action,
  // makeAutoObservable,
  makeObservable
} from 'mobx';

import Loader from './Loader';

class Kartochki {
  patch_url = "/paintings";
  loading = false; // флаг (метка) чтобы не делать повторный запрос

  kartochkaById = false;

  dataTotalCount = -1;
  dataKartochkas = [];
  dataNumeraciya = {
      currentPage: -1,
      minPage: 0,
      maxPage: 0
  };

  filters = {
    _limit: 12,
    _page: 1,
    authorId: 0, // 0 - отсутвие параметра в запросе
    locationId: 0, // 0 - отсутвие параметра в запросе
    q: '', // null или '' - отсутвие параметра в запросе
    created_gte: '',
    created_lte: ''
  };

  constructor(init_filters) {
    Object.assign(this.filters, init_filters);

    makeObservable(this, {
      dataTotalCount: observable,
      setTotalCount: action,
      dataKartochkas: observable,
      setKartochkas: action,
      dataNumeraciya: observable,
      setNumeraciya: action,
      kartochkaById: observable,
      setKartochkaById: action,
    });
  }

  setTotalCount(dataTotalCount) {
    this.dataTotalCount = dataTotalCount;
  }

  setKartochkas(dataKartochkas) {
    this.dataKartochkas = dataKartochkas;
  }

  setNumeraciya(dataNumeraciya) {
    Object.assign(this.dataNumeraciya, dataNumeraciya);
  }

  setKartochkaById(kartochkaById) {
    this.kartochkaById = kartochkaById;
  }

  updateFilter(_name,_value) {
    if (this.filters[_name] === _value) {
      return false;
    }

    this.loading = false;
    this.filters["_page"] = 1; // Смена настроик всегда приводит в начало списка
    this.filters[_name] = _value;

    return true;
  }

  constructFilters() {
    let _filters = false;
    for (let _key in this.filters) {
      if (this.filters[_key]) {
        if (_filters) {
          _filters += "&" + _key + "=" +this.filters[_key];
        } else {
          _filters =  '?' + _key + "=" +this.filters[_key];
        }
      }
    }
    return _filters;
  }

  loadData() {
    if (!this.loading) {
      this.loading = true;
      Loader.loadData(
        this.patch_url+this.constructFilters(),
        (response)=>{

          const {data, headers} = response;
          const totalCount = headers.get("X-Total-Count");

          let maxPage = Math.floor(totalCount / this.filters._limit);

          if (totalCount % this.filters._limit > 0) {
            ++maxPage;
          }

          data.forEach((kartochka) => {
            kartochka.imageUrl = Loader.fullImageUrl(kartochka.imageUrl);
          });

          this.setTotalCount(totalCount);
          this.setKartochkas(data);
          this.setNumeraciya({
            currentPage: this.filters._page,
            minPage: 1,
            maxPage: maxPage
          });

        },
        true
      );
    }
  }

  getById(id) {

    id = +id;

    if (this.kartochkaById && this.kartochkaById.id === id) {
      return false;
    }

    let result_data = false;
    if (this.dataKartochkas) {
      this.dataKartochkas.some((dataKartochki)=>{
        if(dataKartochki.id === id) {
          result_data = dataKartochki;
          return true;
        }
        return false;
      });
    }
    if(result_data) {
      this.setKartochkaById(result_data);
    } else {
      Loader.loadData(
        this.patch_url+'?id='+id,
        (response)=>{
          if (response.length) {
            result_data = response[0];
            result_data.imageUrl = Loader.fullImageUrl(result_data.imageUrl);

            this.setKartochkaById(result_data);
          } else {
            this.setKartochkaById(false);
          }
        }
      );
    }
  }

};

const kartochki = new Kartochki();

export default kartochki;
