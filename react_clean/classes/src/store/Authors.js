import Loader from './Loader';

class Authors {
  patch_url = "/authors";
  loading = false;
  dataAuthors = false;

  loadData(cb) {
    if (!this.loading) {
      this.loading = true;
      Loader.loadData(
        this.patch_url,
        (response)=>{

          const dataAuthors = [
          {
            "id": 0,
            "name": "Authors"
          }].concat(response);

          this.dataAuthors = {
            dataAuthors: dataAuthors
          };

          cb(this.dataAuthors);
        }
      );
    } else {
      cb(this.dataAuthors);
    }
  }

  getById(id, cb) {
    id = +id;
    let result_data = false;
    if (this.dataAuthors) {
      this.dataAuthors.dataAuthors.some((dataAuthor)=>{
        if(dataAuthor.id === id) {
          result_data = dataAuthor;
          return true;
        }
        return false;
      });
    }
    if(result_data) {
      cb(result_data);
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

const authors = new Authors();

export default authors;
