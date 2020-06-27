function users() {
  get = function () {
    return axios.get('http://localhost:3000/clothes');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/clothes/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
