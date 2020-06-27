function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        cloth: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/clothes/'+this.id).then(
            (response) => {
                this.cloth = response.data;
            }
        );
      },
      methods: {
        update: function(id){
          console.log(this.cloth,id)
         

            return axios.post('http://localhost:3000/clothes/'+id, this.cloth).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  