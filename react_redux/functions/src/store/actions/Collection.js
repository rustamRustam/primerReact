// Collection

export function addToCollection(id, data) {
  return {
    type: 'ADD_TO_COLLECTION',
    id: id,
    data: data
  }
}

export function deleteFromCollection(id) {
  return {
    type: 'DELETE_FROM_COLLECTION',
    id: id
  }
}

export function clearCollection() {
  return {
    type: 'CLEAR_COLLECTION'
  }
}
