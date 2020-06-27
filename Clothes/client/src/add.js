function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      cloth: {},
      usersService: null,
      id: 'default',
    },
    created: function () {

    },
    methods: {
      add:function(){

        if(this.cloth){
            console.log(this.cloth)
        axios.put('http://localhost:3000/clothes', this.cloth).then(response => { console.log(response) })
        }  
    },

    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();

});
