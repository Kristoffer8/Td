function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      car: {},
      usersService: null,
      id: 'default',
    },
    created: function () {

    },
    methods: {
      add:function(){

        if(this.car){
            console.log(this.car)
        axios.put('http://localhost:3000/cars', this.car).then(response => { console.log(response) })
        }  
    },

    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();

});
