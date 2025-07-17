document.addEventListener("DOMContentLoaded", async function() {
  const select = document.getElementById("company-select");
  const tbody = document.getElementById("stock-data");
  const ctx = document.getElementById("stockChart").getContext("2d");
  let chart;

  function renderChart(data) {
    const labels = data.map(item => new Date(item.t).toLocaleDateString());
    const prices = data.map(item => item.c);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Closing Price",
          data: prices,
          borderColor: "#0077cc",
          backgroundColor: "rgba(0, 119, 204, 0.1)",
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }

  async function fetchData(ticker) {
    try {
      const response = await fetch(`/api/stock/${ticker}`);
      const { results } = await response.json();
      tbody.innerHTML = '';

      results.forEach(result => {
        const date = new Date(result.t).toLocaleDateString();
        const row = document.createElement("tr");
        const color = result.c > result.o ? "green" : result.c < result.o ? "red" : "black";
        row.innerHTML = `
          <td>${date}</td><td>${result.v}</td><td>${result.vw.toFixed(2)}</td>
          <td>${result.o.toFixed(2)}</td>
          <td style="color:${color}">${result.c.toFixed(2)}</td>
          <td>${result.h.toFixed(2)}</td><td>${result.l.toFixed(2)}</td><td>${result.n}</td>
        `;
        tbody.appendChild(row);
      });

      renderChart(results);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  select.addEventListener("change", () => fetchData(select.value));
  fetchData(select.value);
});
