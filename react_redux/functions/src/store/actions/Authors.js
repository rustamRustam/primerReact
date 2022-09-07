import Loader from '../Loader';

export default function loadAuthors() {
  return (dispatch, getState)=>{
    const state = getState()
    if (!(state.authors) || state.authors.length <= 0) {
      Loader.loadData(
        "/authors",
        (response)=>{

          const dataAuthors = [
          {
            "id": 0,
            "name": "Authors"
          }].concat(response);

          dispatch( {
            type: 'RECEIVE_AUTHORS',
            authors: dataAuthors,
          });

        }
      );
    }
  }
}

export function loadAuthorById(inId) {
  const id = +inId;
  return (dispatch, getState)=>{
    const state = getState();
    let result_data = false;

    if ( state.authors && state.authors.length > 0) {
      state.authors.some((dataAuthor)=>{
        if(dataAuthor.id === id) {
          result_data = dataAuthor;
          return true;
        }
        return false;
      });
    }
    if (result_data) {
      dispatch( {
        type: 'RECEIVE_AUTHOR_ID',
        author: result_data,
      });
    } else {
      Loader.loadData(
        this.patch_url+'?id='+id,
        (response)=>{
          if (response.length) {
            dispatch( {
              type: 'RECEIVE_AUTHOR_ID',
              author: response[0],
            });
          }
        }
      );
    }
  }
}
