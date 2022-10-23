import Loader from './Loader';

export type TAuthor = {
  id: number;
  ​​name: string;
};

export type TDataAuthors = {
  dataAuthors: TAuthor[];
};

class Authors {
  private patch_url:string  = "/authors";
  private loading: boolean = false;
  private dataAuthors:  TDataAuthors = {
    dataAuthors: []
  };

  loadData(cb: (data:TDataAuthors)=>void ) {
    if (!this.loading) {
      this.loading = true;
      Loader.loadData<TAuthor[]>(
        this.patch_url,
        (response: {data: TAuthor[]; headers: Headers;} )=>{
          const dataAuthors: TAuthor[] = [
          {
            "id": 0,
            "name": "All Authors"
          }].concat(response.data);

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

  getById(id:number, cb: (data:boolean|TAuthor)=>void) {
    let result_data:boolean|TAuthor = false;
    if (this.dataAuthors.dataAuthors.length) {
      this.dataAuthors.dataAuthors.some((dataAuthor:TAuthor)=>{
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
      Loader.loadData<TAuthor[]>(
        this.patch_url+'?id='+id,
        (response:{data: TAuthor[]; headers: Headers;})=>{
          if (response.data.length) {
            cb(response.data[0]);
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
