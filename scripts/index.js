// Création boutton d'edition
function createEditButton(beer) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.addEventListener('click', function() {
      displayEditForm(beer);
    });
    return button;
  }
  
  // Création boutton de suppression
  function createDeleteButton(beer) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', function() {
      deleteBeer(beer.id);
    });
    return button;
  }
  
  function deleteBeer(beerId) {
    fetch(`http://localhost:3000/bieres/${beerId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Beer deleted successfully');
          fetchAndDisplayBeerList(); // Refresh the beer list after deletion
        } else {
          console.error('Error deleting beer:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting beer:', error);
      });
  }
  
  function updateBeer(beerId) {
    // Récupère les inputs
    const name = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const prix = parseInt(document.getElementById('prix').value);
    const type = document.getElementById('type').value;
  
    // Vérifie le prix non null
    if (isNaN(prix) || prix < 0) {
      console.error('Invalid prix value');
      return;
    }
  
    const beerData = {
      nom: name,
      description,
      prix,
      type
    };
  
    // PATCH la biere
    fetch(`http://localhost:3000/bieres/${beerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beerData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Beer updated successfully:', data);
        // Refresh the beer list to reflect the updated beer
        fetchAndDisplayBeerList();
        resetForm(); // Reset the form after updating the beer
      })
      .catch(error => {
        console.error('Error updating beer:', error);
      });
  }
  
  // Créer les boutons d'édition
  function createBeerListItem(beer) {
    const li = document.createElement('li');
    li.textContent = `${beer.nom}, ${beer.description}, ${beer.prix}, ${beer.type}`;
  
    const editButton = createEditButton(beer);
    const deleteButton = createDeleteButton(beer);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  
    return li;
  }
  
  function displayEditForm(beer) {
    const editFormContainer = document.getElementById('edit-form-container');
    editFormContainer.style.display = 'block';
    const nameInput = document.getElementById('nom');
    const descriptionInput = document.getElementById('description');
    const prixInput = document.getElementById('prix');
    const typeInput = document.getElementById('type');
  
    nameInput.value = beer.nom;
    descriptionInput.value = beer.description;
    prixInput.value = beer.prix;
    typeInput.value = beer.type;
  
    const submitButton = document.getElementById('add-product');
    submitButton.addEventListener('click', function() {
      updateBeer(beer.id);
    });
  }
  
  // Réinitialise le formulaire
  function resetForm() {
    const editFormContainer = document.getElementById('edit-form-container');
    editFormContainer.style.display = 'none';
    const nameInput = document.getElementById('nom');
    const descriptionInput = document.getElementById('description');
    const prixInput = document.getElementById('prix');
    const typeInput = document.getElementById('type');
  
    nameInput.value = '';
    descriptionInput.value = '';
    prixInput.value = '';
    typeInput.value = '';
  
    const submitButton = document.getElementById('add-product');
    submitButton.textContent = 'Enregistrer';
    submitButton.removeEventListener('click', updateBeer);
  }
  
  // Récupère et affiche la liste de bières
  function fetchAndDisplayBeerList() {
    fetch('http://localhost:3000/bieres')
      .then(response => response.json())
      .then(data => {
        const beers = data;
        const beerListElement = document.getElementById('beers');
  
        // Reset la liste de bières
        beerListElement.innerHTML = '';
  
        beers.forEach(beer => {
          const li = createBeerListItem(beer);
          beerListElement.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching beer list:', error);
      });
  }
  
  
  fetchAndDisplayBeerList();
  