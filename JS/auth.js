function loginpage() {
  window.location.href = "login.html";
}

const ctx = document.getElementById('pieChart');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Sales', 'Purchase', 'Profit'],
    datasets: [{
      data: [45000, 30000, 15000],
      backgroundColor: [
        '#4e73df',
        '#1cc88a',
        '#f6c23e'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
 

