var api = require('./src/api.js').app;
const fs = require('fs');
const carsFilepath = './src/cars.json';
const caresvar = require('./src/cars.json');

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/cars', function (request, response) {
  response.json(getCars());
});

api.get('/cars/:id', function (request, response) {
  let car = getCarById(request.params.id);
  if (car) 
  response.json(car);
  else{
  console.log(request.params.id,car)
  response.json('not found');
  }
});

api.put('/cars', function (request, response) {
  saveCar(request.body);
  response.json('User was saved succesfully');
});

api.post('/cars/:id', function (request, response) {
  updatecarById(request.body,request.params.id)
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
 // console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim cars din fisier pe baza id-ului primit de la client
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Car was saved succesfully');
});

api.delete('/cars/:index', function (request, response) {
  // delete din fisier pe baza unui id

  deletecarbyID(request.params.index)
 // caresvar.splice(request.params.index, 1);

  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getCars() {
  let cars = [];
  try {
    cars = JSON.parse(fs.readFileSync(carsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return cars;
}

function saveCar(car) {
  let cars = getCars();// car json din fisier
  let maxId = getMaxId(cars);  // get maximum id form cars array
  car.id = maxId+1;// generare id unic
  cars.push(car);// adaugare anvelopa noua in array
  

  try {
    fs.writeFileSync(carsFilepath, JSON.stringify(cars,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(cars) {
  let max = 0;
  for (var i=0; i<cars.length;i++) {
    if(max < cars[i].id) {
      max = cars[i].id;
    }
  }
  return max;
}

function updatecarById(data,id){
  let cars = getCars();// car json din fisier
  console.log(data,id)
  for(var i=0; i<cars.length; i++) {
    if(id == cars[i].id)
    cars[i]=data;
  }
  try {
    fs.writeFileSync(carsFilepath, JSON.stringify(cars,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
  
  
}

function deletecarbyID(id){
  carsvar.splice(id, 1);
  console.log("id masina:",id)
  const jsonString = JSON.stringify(carsvar,null,4)  
  fs.writeFileSync(carsFilepath, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
  })
}


function getCarById(id){
  let cars = getCars();// car json din fisier
  let selectedCar = null;
  for(var i=0; i<cars.length; i++) {
    if(id == cars[i].id) selectedCar = cars[i];
  }
  return selectedCar;
}