import Loader from './Loader';

class Kartochki {
  patch_url = "/paintings";
  loading = false; // флаг (метка) чтобы не делать повторный запрос

  saveData = false;

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

  loadData(cb) {
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

          this.saveData = {
            dataTotalCount: totalCount,
            dataKartochkas: data,
            dataNumeraciya: {
              currentPage: this.filters._page,
              minPage: 1,
              maxPage: maxPage
            }
          }

          cb(this.saveData);
        },
        true
      );
    } else {
      cb(this.saveData);
    }
  }

  getById(id, cb) {
    id = +id;
    let result_data = false;
    if (this.saveData) {
      this.saveData.dataKartochkas.some((dataKartochki)=>{
        if(dataKartochki.id === id) {
          result_data = dataKartochki;
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
            result_data = response[0];
            result_data.imageUrl = Loader.fullImageUrl(result_data.imageUrl);
            cb(result_data);
          } else {
            cb(false);
          }
        }
      );
    }
  }

};

const kartochki = new Kartochki();

export default kartochki;
