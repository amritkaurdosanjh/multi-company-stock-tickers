document.addEventListener("DOMContentLoaded", async function() {
  const select = document.getElementById("company-select");
  const tbody = document.getElementById("stock-data");

  async function fetchData(ticker) {
    try {
      const response = await fetch(`/api/stock/${ticker}`);
      const data = await response.json();
      tbody.innerHTML = '';

      data.results.forEach(result => {
        const date = new Date(result.t).toLocaleDateString();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${date}</td><td>${result.v}</td><td>${result.vw.toFixed(2)}</td>
          <td>${result.o.toFixed(2)}</td><td>${result.c.toFixed(2)}</td>
          <td>${result.h.toFixed(2)}</td><td>${result.l.toFixed(2)}</td><td>${result.n}</td>
        `;
        tbody.appendChild(row);
      });
    } catch (e) {
      console.error('Fetch error:', e);
    }
  }

  select.addEventListener("change", () => fetchData(select.value));
  fetchData(select.value); // Initial load
});
const ctx = document.getElementById('stockChart').getContext('2d');
let chart;

function renderChart(data) {
  const labels = data.map(item => new Date(item.t).toLocaleDateString());
  const prices = data.map(item => item.c);

  if (chart) chart.destroy(); // Reset if chart exists

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Closing Price',
        data: prices,
        borderColor: '#0077cc',
        backgroundColor: 'rgba(0,119,204,0.1)',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

async function fetchData(ticker) {
  const response = await fetch(`/api/stock/${ticker}`);
  const data = await response.json();
  tbody.innerHTML = '';
  data.results.forEach(result => {
    const date = new Date(result.t).toLocaleDateString();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date}</td><td>${result.v}</td><td>${result.vw.toFixed(2)}</td>
      <td>${result.o.toFixed(2)}</td><td>${result.c.toFixed(2)}</td>
      <td>${result.h.toFixed(2)}</td><td>${result.l.toFixed(2)}</td><td>${result.n}</td>
    `;
    tbody.appendChild(row);
  });
  renderChart(data.results);
}
