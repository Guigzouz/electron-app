// Récupérer les éléments du DOM
const addButton = document.getElementById('add-product');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const prixInput = document.getElementById('prix');
const beerTypeInput = document.getElementById('beer-type');
const beerList = document.getElementById('beers');

function addBeer() {
  const name = nameInput.value;
  const description = descriptionInput.value;
  const prix = prixInput.value;
  const beerType = beerTypeInput.value;

  const newBeer = document.createElement('li');
  newBeer.textContent = `${name} - ${description} - ${prix} - ${beerType}`;

  const editButton = document.createElement('button');
  editButton.textContent = 'Editer';
  editButton.addEventListener('click', editBeer);

  newBeer.appendChild(editButton);
  beerList.appendChild(newBeer);

  nameInput.value = '';
  descriptionInput.value = '';
  prixInput.value = '';
  beerTypeInput.value = '';
}

function editBeer(event) {
  const listItem = event.target.parentElement;
  const beerInfo = listItem.textContent.split(' - ');

  const name = beerInfo[0];
  const description = beerInfo[1];
  const prix = beerInfo[2];
  const beerType = beerInfo[3];

  nameInput.value = name;
  descriptionInput.value = description;
  prixInput.value = prix;
  beerTypeInput.value = beerType;

  listItem.remove();
}

addButton.addEventListener('click', addBeer);
