// script.js — consumo da API de Rick and Morty e criação dinâmica dos cards
// Doc oficial: https://rickandmortyapi.com/documentation

const API = "https://rickandmortyapi.com/api/character";

const grid = document.getElementById("grid");
const stats = document.getElementById("stats");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("pageInfo");
const form = document.getElementById("filters");
const searchInput = document.getElementById("search");
const statusSelect = document.getElementById("status");
const clearBtn = document.getElementById("clear");

let currentPage = 1;
let lastQuery = { name: "", status: "" };
let totalPages = 1;

function setLoading(isLoading) {
  if (isLoading) {
    stats.textContent = "Carregando personagens...";
  }
}

function setStats(info) {
  if (!info) {
    stats.textContent = "Nenhum resultado encontrado.";
    return;
  }
  stats.innerHTML = `Total: <strong>${info.count}</strong> personagens • Páginas: <strong>${info.pages}</strong>`;
}

function updatePager(info) {
  totalPages = info.pages || 1;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}

function badgeForStatus(status) {
  const s = (status || "").toLowerCase();
  let cls = "unknown";
  if (s === "alive") cls = "alive";
  else if (s === "dead") cls = "dead";
  return `<span class="badge ${cls}">${status}</span>`;
}

function createCharacterCard(character) {
  // Cria os elementos via DOM API (createElement / appendChild)
  const card = document.createElement("article");
  card.className = "character-card card";

  const img = document.createElement("img");
  img.className = "thumb";
  img.src = character.image;
  img.alt = `Retrato de ${character.name}`;

  const content = document.createElement("div");
  content.className = "content";

  const name = document.createElement("div");
  name.className = "name";
  name.textContent = character.name;

  const meta = document.createElement("div");
  meta.className = "meta";

  const status = document.createElement("span");
  status.className = "badge " + (character.status || "unknown").toLowerCase();
  status.textContent = character.status;

  const species = document.createElement("span");
  species.className = "badge";
  species.textContent = character.species;

  const origin = document.createElement("span");
  origin.className = "badge";
  origin.textContent = character.origin?.name || "Origem desconhecida";

  meta.appendChild(status);
  meta.appendChild(species);
  meta.appendChild(origin);

  content.appendChild(name);
  content.appendChild(meta);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

async function fetchCharacters(page = 1, query = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  if (query.name) params.set("name", query.name);
  if (query.status) params.set("status", query.status);

  const url = `${API}?${params.toString()}`;
  try {
    setLoading(true);
    const res = await fetch(url);
    if (!res.ok) {
      // 404 quando não encontra resultados
      if (res.status === 404) {
        grid.innerHTML = "";
        setStats(null);
        updatePager({ pages: 1 });
        return;
      }
      throw new Error("Falha ao buscar dados da API");
    }
    const data = await res.json();

    // Limpa grid e insere novos cards dinamicamente
    grid.innerHTML = "";
    data.results.forEach(ch => {
      const card = createCharacterCard(ch);
      grid.appendChild(card);
    });

    setStats(data.info);
    updatePager(data.info);
  } catch (err) {
    grid.innerHTML = "";
    stats.textContent = "Ocorreu um erro ao carregar os dados. Verifique sua conexão e tente novamente.";
    console.error(err);
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = 1;
  lastQuery = {
    name: searchInput.value.trim(),
    status: statusSelect.value
  };
  fetchCharacters(currentPage, lastQuery);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  statusSelect.value = "";
  currentPage = 1;
  lastQuery = { name: "", status: "" };
  fetchCharacters(currentPage, lastQuery);
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, lastQuery);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage, lastQuery);
  }
});

// Primeira carga
fetchCharacters(currentPage, lastQuery);
