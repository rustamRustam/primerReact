
export type TResultResponse<T> = {data: T; headers: Headers; };
export type TFuncResponse<T> = (_r:TResultResponse<T> )=>void;

class LoaderData {
  private baseUrl:string = "https://test-front.framework.team";

  fullImageUrl(path_imageUrl:string):string {
    return this.baseUrl + path_imageUrl;
  }

  loadData<T>(path_rl:string, cb:TFuncResponse<T>) { //, headers:boolean = false) {
    fetch(
      this.baseUrl+path_rl,
      {
        method: 'GET',
      }
    )
    .then(
      async (successResponse):Promise<TResultResponse<T>> => {
        if (successResponse.status != 200) {
          // return {data:T, headers:{}};
          throw new Error(successResponse.statusText);
        }
        const data = await successResponse.json();
        return {data: data, headers:successResponse.headers};
        // if (headers) {
        //   return {data: data, headers:successResponse.headers};
        // } else {
        //   return data;
        // }
      }
      // ,
      // failResponse => {
      //   // return false;
      // }

    )
    .then(
      (result: TResultResponse<T> ) =>{
        cb(result);
        return true;
      }
    )
  }

};

const loadData = new LoaderData();

export default loadData;
