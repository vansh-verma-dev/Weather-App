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
// ----------------dashboard page------------------
function dashboard(){
  window.location.href="dashboard.html"
};

// ------------------Voucher page-------------------
function Vouchers(){
  document.querySelector('.main-page').innerHTML =`
  <p>voucher</p>
  `
};
// ----------------Transaction page--------------------
 function transaction(){
  document.querySelector('.main-page').innerHTML =`
  <p>transation</p>
  `
};
// ----------------report page--------------------
function report(){
  document.querySelector('.main-page').innerHTML =`
  <p>Report</p>
  `
};

