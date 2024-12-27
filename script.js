document.getElementById("calculate-btn").addEventListener("click", () => {
    // Ambil nilai input
    const ooip = parseFloat(document.getElementById("ooip").value);
    const cumulative = parseFloat(document.getElementById("cumulative").value);
  
    // Validasi input
    if (isNaN(ooip) || ooip <= 0 || isNaN(cumulative) || cumulative < 0 || cumulative > ooip) {
      alert("Please provide valid inputs:\n- OOIP (positive number)\n- Cumulative (0 ≤ Np ≤ OOIP)");
      return;
    }
  
    // Perhitungan RF
    const rf = (cumulative / ooip) * 100;
  
    // Tampilkan hasil
    document.getElementById("rf-result").textContent = 
      "RF: " + rf.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  
    // Render grafik
    renderBarChart(ooip, cumulative, rf);
    renderLineChart(ooip, cumulative, rf);
  });
  
  // Fungsi untuk menampilkan Bar Chart
  function renderBarChart(ooip, cumulative, rf) {
    const ctx = document.getElementById("bar-chart").getContext("2d");
  
    // Hapus grafik sebelumnya (jika ada)
    if (window.barChart) {
      window.barChart.destroy();
    }
  
    // Buat Bar Chart baru
    window.barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["OOIP", "Cumulative Production", "RF (%)"],
        datasets: [{
          label: "Values",
          data: [ooip, cumulative, rf],
          backgroundColor: ["#5a67d8", "#48bb78", "#ed8936"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        }
      }
    });
  }
  
  // Fungsi untuk menampilkan Line Chart
  function renderLineChart(ooip, cumulative, rf) {
    const ctx = document.getElementById("line-chart").getContext("2d");
  
    // Hapus grafik sebelumnya (jika ada)
    if (window.lineChart) {
      window.lineChart.destroy();
    }
  
    // Buat Line Chart baru
    window.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["OOIP", "Cumulative Production", "RF (%)"],
        datasets: [{
          label: "Recovery Factor Analysis",
          data: [ooip, cumulative, rf],
          backgroundColor: "rgba(72, 187, 120, 0.2)",
          borderColor: "#48bb78",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        }
      }
    });
  }