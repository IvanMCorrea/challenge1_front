const bodyTable = document.getElementById("body-tabla-posiciones");

function checkHeaderTitles() {
  const thGolesFavor = document.querySelector(
    '#tabla-posiciones th[data-shorten="GF"]'
  );
  const thGolesContra = document.querySelector(
    '#tabla-posiciones th[data-shorten="GC"]'
  );
  const thDiferenciaGoles = document.querySelector(
    '#tabla-posiciones th[data-shorten="DG"]'
  );
  const tdGolesFavor = document.querySelectorAll(
    '#tabla-posiciones td[data-shorten="GF"]'
  );
  const tdGolesContra = document.querySelectorAll(
    '#tabla-posiciones td[data-shorten="GC"]'
  );
  const tdDiferenciaGoles = document.querySelectorAll(
    '#tabla-posiciones td[data-shorten="DG"]'
  );

  if (window.innerWidth <= 1200) {
    thGolesFavor.style.display = "none";
    thGolesContra.style.display = "none";
    thDiferenciaGoles.style.display = "none";
    tdGolesFavor.forEach((td) => (td.style.display = "none"));
    tdGolesContra.forEach((td) => (td.style.display = "none"));
    tdDiferenciaGoles.forEach((td) => (td.style.display = "none"));
  } else {
    thGolesFavor.style.display = "table-cell";
    thGolesContra.style.display = "table-cell";
    thDiferenciaGoles.style.display = "table-cell";
    tdGolesFavor.forEach((td) => (td.style.display = "table-cell"));
    tdGolesContra.forEach((td) => (td.style.display = "table-cell"));
    tdDiferenciaGoles.forEach((td) => (td.style.display = "table-cell"));
  }
}

async function getTableData() {
  try {
    const response = await fetch(
      `https://challenge1back-production.up.railway.app/api/leaderboard/getLeaderboard`,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    res.data.forEach((row, index) => {
      const fila = document.createElement("tr");
      if (index < 4) {
        fila.classList.add("resaltar-verde");
      } else if (index >= res.data.length - 4) {
        fila.classList.add("resaltar-rojo");
      }
      fila.innerHTML = `
            <td class="center" data-shorten="POS">${row.posicion}</td>
            <td class="full-width"><div class="align-center"><img src="${row.logo}" title="${row.equipo}" alt="escudo ${row.equipo}  class="logo"/><span>${row.equipo}</span></div></td>
            <td class="center" data-shorten="PJ">${row.partidos_jugados}</td>
            <td class="center" data-shorten="PG">${row.partidos_ganados}</td>
            <td class="center" data-shorten="PP">${row.partidos_perdidos}</td>
            <td class="center" data-shorten="PE">${row.partidos_empatados}</td>
            <td class="center" data-shorten="GF">${row.goles_favor}</td>
            <td class="center" data-shorten="GC">${row.goles_contra}</td>
            <td class="center" data-shorten="DG">${row.diferencia_goles}</td>
            <td class="center" data-shorten="PTS">${row.puntos}</td>
          `;

      bodyTable.appendChild(fila);
    });
    checkHeaderTitles();
  } catch (error) {
    console.error(error);
  }
}

getTableData();
window.addEventListener("resize", checkHeaderTitles);
