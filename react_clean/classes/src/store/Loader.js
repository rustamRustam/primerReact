
class LoaderData {
  baseUrl = "https://test-front.framework.team";

  fullImageUrl(path_imageUrl) {
    return this.baseUrl + path_imageUrl;
  }

  loadData(path_rl, cb, headers = false) {
    fetch(
      this.baseUrl+path_rl,
      {
        method: 'GET',
      }
    )
    .then(
      async (successResponse) => {
        if (successResponse.status != 200) {
          return false;
        }
        const data = await successResponse.json();
        if (headers) {
          return {data: data, headers:successResponse.headers};
        } else {
          return data;
        }
      },
      failResponse => {
        return false;
      }

    )
    .then(result => cb(result))
  }

};

const loadData = new LoaderData();

export default loadData;
