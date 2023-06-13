const bouton = document.getElementById("add-product");
bouton.addEventListener("click", () => addBeer());

function addBeer() {
  
    const nomInput = document.getElementById('nom');
    const descriptionInput = document.getElementById('description');
    const prixInput = document.getElementById('prix');
    const typeInput = document.getElementById('type');
  
    const beerData = {
      nom: nomInput.value,
      description: descriptionInput.value,
      prix: parseFloat(prixInput.value),
      type: typeInput.value
    };
  
    fetch('http://localhost:3000/bieres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beerData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Beer added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding beer:', error);
      });
  
    // Reset the form inputs
    nomInput.value = '';
    descriptionInput.value = '';
    prixInput.value = '';
    typeInput.value = 'BLO';
    
    alert('Élément ajouté');
  }
  