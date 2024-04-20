async function fetchData() {
  try {
    const categories = document.getElementById("search").value.toLowerCase();
    const response = await axios.get(`https://openlibrary.org/subjects/${categories}.json?limit=30`);

    if (!response.data) {
      throw new Error("Could not fetch resource");
    }

    const data = response.data;
    const categoryImageContainer = document.getElementById("categoryImages");
    categoryImageContainer.innerHTML = ""; //modified 

    if (data.works && Array.isArray(data.works) && data.works.length > 0) {
      /*alphabetic order for title and description*/
      const sortedWorks = _.sortBy(data.works, 'title');
      sortedWorks.forEach((work, index) => {
        if (work.cover_edition_key) {
          const coverEditionUrl = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`;

          // Creare un elemento div per il libro
          const bookElement = document.createElement("div");
          bookElement.classList.add("book");

          // Creare un elemento img per la copertina
          const imgElement = document.createElement("img");
          imgElement.src = coverEditionUrl;
          bookElement.classList.add("book-cover");
          bookElement.appendChild(imgElement);

          // Creare un elemento p per il titolo
          const titleElement = document.createElement("p");
          titleElement.textContent = work.title;
          bookElement.appendChild(titleElement);

          // Creare un elemento p per la descrizione
          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = work.description || "No description available";
          bookElement.appendChild(descriptionElement);

          categoryImageContainer.appendChild(bookElement);
        }
      });
    }

  } catch (error) {
    console.error(error);

    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Si è verificato un errore durante il recupero dei dati. Riprova più tardi.";
    categoryImageContainer.appendChild("errorMessage");
  }
}
document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Previeni il comportamento predefinito del form
  fetchData(); // Chiama la funzione fetchData
});

