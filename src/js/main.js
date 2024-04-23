// Funzione asincrona per recuperare i dati dalla API
async function fetchData(categories) {
  try {
    // Effettua una richiesta GET all'API con le categorie specificate
    const response = await axios.get(`https://openlibrary.org/subjects/${categories}.json?limit=30`);
    // Restituisce i dati ottenuti dalla risposta
    return response.data;
  } catch (error) {
    // Se si verifica un errore, stampa un messaggio di errore nella console
    console.error("Si è verificato un errore durante il recupero dei dati. Riprova più tardi.");
    // Rilancia l'errore per gestirlo altrove, se necessario
    throw error;
  }
}

// Funzione per visualizzare i libri nella pagina
function displayBooks(works) {
  // Ottiene il container dei libri dalla pagina HTML
  const categoryImageContainer = document.getElementById("categoryImages");
  // Pulisce il contenuto precedente all'interno del container
  categoryImageContainer.innerHTML = ""; // Rimuove i libri precedenti
  // Itera su ogni libro ottenuto e crea un elemento HTML per visualizzarlo
  works.forEach(work => {
    // Verifica se il libro ha una copertina
    if (work.cover_edition_key) {
      // Costruisce l'URL per la copertina del libro
      const coverEditionUrl = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`;
      // Crea un nuovo elemento HTML per il libro utilizzando la funzione ausiliaria
      const bookElement = createBookElement(coverEditionUrl, work.title, work.description || "No description available");
      // Aggiunge l'elemento del libro al container nella pagina HTML
      categoryImageContainer.appendChild(bookElement);
    }
  });
}

// Funzione per creare un elemento HTML per il singolo libro
function createBookElement(coverUrl, title, description) {
  // Crea un nuovo elemento div per il libro
  const bookElement = document.createElement("div");
  // Aggiunge la classe "book" all'elemento div
  bookElement.classList.add("book");

  // Crea un nuovo elemento img per la copertina del libro
  const imgElement = document.createElement("img");
  // Imposta l'URL della copertina come sorgente dell'immagine
  imgElement.src = coverUrl;
  // Aggiunge la classe "book-cover" all'elemento img
  imgElement.classList.add("book-cover");
  // Aggiunge l'elemento img all'elemento div del libro
  bookElement.appendChild(imgElement);

  // Crea un nuovo elemento p per il titolo del libro
  const titleElement = document.createElement("p");
  // Imposta il titolo del libro come contenuto del paragrafo
  titleElement.textContent = title;
  // Aggiunge l'elemento p del titolo all'elemento div del libro
  bookElement.appendChild(titleElement);

  // Crea un nuovo elemento p per la descrizione del libro
  const descriptionElement = document.createElement("p");
  // Imposta la descrizione del libro come contenuto del paragrafo (o una stringa predefinita se non disponibile)
  descriptionElement.textContent = description;
  // Aggiunge l'elemento p della descrizione all'elemento div del libro
  bookElement.appendChild(descriptionElement);

  // Restituisce l'elemento div del libro creato
  return bookElement;
}


// Aggiunge un listener per l'evento di submit del form di ricerca
document.getElementById("searchForm").addEventListener("submit", async function(event) {
  // Previeni il comportamento predefinito del form (aggiornamento della pagina)
  event.preventDefault();
  // Ottiene il valore inserito nell'input di ricerca (categorie)
  const categories = document.getElementById("search").value.toLowerCase();
  try {
    // Richiama la funzione fetchData per recuperare i dati relativi alle categorie inserite
    const data = await fetchData(categories);
    // Visualizza i libri ottenuti nella pagina HTML
    displayBooks(data.works);
  } catch (error) {
    // Se si verifica un errore durante il recupero dei dati, mostra un messaggio di errore all'utente
    alert("Si è verificato un errore durante il recupero dei dati. Riprova più tardi.");
  }
});
