const bodyTable = document.getElementById("body-tabla-posiciones");

function checkHeaderTitles() {
  const thPosicion = document.querySelector(
    '#tabla-posiciones th[data-shorten="POS"]'
  );
  const thPartidosJugados = document.querySelector(
    '#tabla-posiciones th[data-shorten="PJ"]'
  );
  const thPartidosGanados = document.querySelector(
    '#tabla-posiciones th[data-shorten="PG"]'
  );
  const thPartidosPerdidos = document.querySelector(
    '#tabla-posiciones th[data-shorten="PP"]'
  );
  const thPartidosEmpatados = document.querySelector(
    '#tabla-posiciones th[data-shorten="PE"]'
  );
  const thGolesFavor = document.querySelector(
    '#tabla-posiciones th[data-shorten="GF"]'
  );
  const thGolesContra = document.querySelector(
    '#tabla-posiciones th[data-shorten="GC"]'
  );
  const thDiferenciaGoles = document.querySelector(
    '#tabla-posiciones th[data-shorten="DG"]'
  );
  const thPuntos = document.querySelector(
    '#tabla-posiciones th[data-shorten="PTS"]'
  );

  if (window.innerWidth <= 1200) {
    thPosicion.textContent = "POS";
    thPartidosJugados.textContent = "PJ";
    thPartidosGanados.textContent = "PG";
    thPartidosPerdidos.textContent = "PP";
    thPartidosEmpatados.textContent = "PE";
    thGolesFavor.textContent = "GF";
    thGolesContra.textContent = "GC";
    thDiferenciaGoles.textContent = "DG";
    thPuntos.textContent = "PTS";
  } else {
    thPartidosJugados.textContent = "Partidos Jugados";
    thPartidosGanados.textContent = "Partidos Ganados";
    thPartidosPerdidos.textContent = "Partidos Perdidos";
    thPartidosEmpatados.textContent = "Partidos Empatados";
    thGolesFavor.textContent = "Goles a Favor";
    thGolesContra.textContent = "Goles en Contra";
    thDiferenciaGoles.textContent = "Diferencia de Goles";
    thPuntos.textContent = "Puntos";
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
            <td class="center">${row.posicion}</td>
            <td class="full-width"><img src="${row.logo}" alt="escudo ${row.equipo}" class="logo"/> ${row.equipo}</td>
            <td class="center">${row.partidos_jugados}</td>
            <td class="center">${row.partidos_ganados}</td>
            <td class="center">${row.partidos_perdidos}</td>
            <td class="center">${row.partidos_empatados}</td>
            <td class="center">${row.goles_favor}</td>
            <td class="center">${row.goles_contra}</td>
            <td class="center">${row.diferencia_goles}</td>
            <td class="center">${row.puntos}</td>
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
