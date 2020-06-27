function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      clothes: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => {(this.clothes = response.data),console.log(response.data)});
    },
    methods: {
      deleteCloth: function(id) {
        console.log('HTTP DELETE spre backend, cloth: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.clothes = response.data));  
        });
      },
      addcloth: function(){
        window.open("addcloth.html","_self")
      }

    }
  });


}


document.addEventListener('DOMContentLoaded', () => {
  run();

});
