const materias = [
  // Semestre 1
  { id: "s1-m1", nombre: "Introducción a Psicología", creditos: 4, prerreq: [] },
  { id: "s1-m2", nombre: "Psicología Social 1", creditos: 4, prerreq: [] },
  // Semestre 2
  { id: "s2-m1", nombre: "Psicología Social 2", creditos: 4, prerreq: ["s1-m2"] },
  // Puedes seguir completando...
];

const completadas = new Set();

function crearMalla() {
  const malla = document.getElementById("malla");
  materias.forEach(m => {
    const div = document.createElement("div");
    div.id = m.id;
    div.className = "materia";
    div.textContent = `${m.nombre} (${m.creditos} cr)`;
    div.onclick = () => { if (div.classList.contains("activa")) mostrarInfo(m); };
    malla.appendChild(div);
  });
  actualizarEstado();
}

function actualizarEstado() {
  materias.forEach(m => {
    const div = document.getElementById(m.id);
    if (completadas.has(m.id)) {
      div.className = "materia completada";
    } else if (m.prerreq.every(r => completadas.has(r))) {
      div.className = "materia activa";
    } else {
      div.className = "materia";
    }
  });
}

function mostrarInfo(m) {
  document.getElementById("m-name").textContent = m.nombre;
  document.getElementById("m-creditos").textContent = `Créditos: ${m.creditos}`;
  document.getElementById("m-prerreq").textContent = m.prerreq.length
    ? `Prerrequisitos: ${m.prerreq.map(r => materias.find(x => x.id===r).nombre).join(", ")}`
    : "Prerrequisitos: Ninguno";
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  document.getElementById("close").onclick = () => {
    modal.classList.add("hidden");
    if (!completadas.has(m.id)) {
      completadas.add(m.id);
      actualizarEstado();
    }
  };
}

crearMalla();
