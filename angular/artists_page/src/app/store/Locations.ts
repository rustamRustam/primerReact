import Loader from './Loader';

export type TLocation = {
  id: number;
  location: string;
};

export type TDataLocations = {
  dataLocations: TLocation[];
};

class Locations {
  private patch_url: string  = "/locations";
  private loading: boolean = false;

  private dataLocations: TDataLocations = {
    dataLocations: []
  };

  loadData(cb: (data:TDataLocations)=>void) {
    if (!this.loading) {
      this.loading = true;
      Loader.loadData<TLocation[]>(
        this.patch_url,
        (response: {data: TLocation[]; headers: Headers;} )=>{

          const dataLocations: TLocation[] = [
          {
            "id": 0,
            "location": "All Locations"
          }].concat(response.data);

          this.dataLocations = {
            dataLocations: dataLocations
          };

          cb(this.dataLocations);

        }
      );
    } else {
      cb(this.dataLocations);
    }
  }

  getById(id:number, cb: (data:boolean|TLocation)=>void) {
    let result_data: boolean|TLocation = false;
    if (this.dataLocations.dataLocations.length) {
      this.dataLocations.dataLocations.some((dataAuthor:TLocation)=>{
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
      Loader.loadData<TLocation[]>(
        this.patch_url+'?id='+id,
        (response: {data: TLocation[]; headers: Headers;} )=>{
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

const locations = new Locations();

export default locations;
