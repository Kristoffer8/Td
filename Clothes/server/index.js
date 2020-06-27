var api = require('./src/api.js').app;
const fs = require('fs');
const clothesFilepath = './src/clothes.json';
const clothesvar = require('./src/clothes.json');

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/clothes', function (request, response) {
  response.json(getClothes());
});

api.get('/clothes/:id', function (request, response) {
  let cloth = getClothById(request.params.id);
  if (cloth) 
  response.json(cloth);
  else{
  console.log(request.params.id,cloth)
  response.json('not found');
  }
});

api.put('/clothes', function (request, response) {
  saveCloth(request.body);
  response.json('User was saved succesfully');
});

api.post('/clothes/:id', function (request, response) {
  updateclothById(request.body,request.params.id)
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
 // console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim cars din fisier pe baza id-ului primit de la client
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Cloth was saved succesfully');
});

api.delete('/clothes/:index', function (request, response) {
  // delete din fisier pe baza unui id

  deleteclothbyID(request.params.index)
 // clothesvar.splice(request.params.index, 1);

  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getClothes() {
  let clothes = [];
  try {
    clothes = JSON.parse(fs.readFileSync(clothesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return clothes;
}

function saveCloth(cloth) {
  let clothes = getClothes();// cicloth json din fisier
  let maxId = getMaxId(clothes);  // get maximum id form cars array
  cloth.id = maxId+1;// generare id unic
  clothes.push(cloth);// adaugare anvelopa noua in array
  

  try {
    fs.writeFileSync(clothesFilepath, JSON.stringify(clothes,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(clothes) {
  let max = 0;
  for (var i=0; i<clothes.length;i++) {
    if(max < clothes[i].id) {
      max = clothes[i].id;
    }
  }
  return max;
}

function updateclothById(data,id){
  let clothes = getClothes();// cicloth json din fisier
  console.log(data,id)
  for(var i=0; i<clothes.length; i++) {
    if(id == clothes[i].id)
    clothes[i]=data;
  }
  try {
    fs.writeFileSync(clothesFilepath, JSON.stringify(clothes,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
  
  
}

function deleteclothbyID(id){
  clothesvar.splice(id, 1);
  console.log("id masina:",id)
  const jsonString = JSON.stringify(clothesvar,null,4)  
  fs.writeFileSync(clothesFilepath, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
  })
}


function getClothById(id){
  let clothes = getClothes();// cicloth json din fisier
  let selectedCloth = null;
  for(var i=0; i<clothes.length; i++) {
    if(id == clothes[i].id) selectedCloth = clothes[i];
  }
  return selectedCloth;
}