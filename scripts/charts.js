function getChart(){
  fetch('http://localhost:3000/chart')
  .then(response => response.json())
  .then(data => {
    const beerCount = data;
    const ctx = document.getElementById('myChart');
        
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Blonde', 'Brune', 'Blanche'],
      datasets: [{
        label: 'Nb de bières',
        data: beerCount,
        borderWidth: 1
      }]
    },
  });

  })
  .catch(error => {
    console.error('Error fetching beer list:', error);
  });
  
  
}


getChart();
