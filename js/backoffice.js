const params = new URLSearchParams(window.location.search);
const id = params.get("prodId");
const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUwODhhZDEyOTAwMTU4NzZiYzgiLCJpYXQiOjE3MzE2NjEzMjAsImV4cCI6MTczMjg3MDkyMH0.FvOf_mebQAdi5M66y4-5Tdg7Z_srSRoNtGZENCpsO60";
const method = id ? "PUT" : "POST";

//funzione per gestire tasto Addproduct o Save edits
const handleSaveBtn = (event) => {
  event.preventDefault();
  //console.log(event.target.elements.name.value);

  const newProduct = {
    name: event.target.elements.name.value,
    description: event.target.elements.description.value,
    brand: event.target.elements.brand.value,
    imageUrl: event.target.elements.imageUrl.value,
    price: event.target.elements.price.value
  };

  fetch(URL, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((newProductObj) => {
      if (id) {
        console.log(`Modificato oggetto esistente" + ${newProductObj.name},`);
      } else {
        console.log(`Creato nuovo prodotto + ${newProductObj.name},`);
      }
    });
};

//funzione per gestire delete button su form edit
const handleDeleteBtn = () => {};

//funzione tasto reset
const handleResetBtn = () => {};

window.addEventListener("DOMContentLoaded", function () {
  const prodDataForm = document.querySelector("form");
  const saveBtn = document.getElementById("saveBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const title = document.querySelector("h2");
  prodDataForm.onsubmit = handleSaveBtn;
  // se al caricamento c'è un id allora faccio reperire i dati per popolare il form
  if (id) {
    title.innerText = "Edit product details";
    saveBtn.innerText = "Save changes";
    deleteBtn.classList.remove("d-none");
    //deleteBtn.onclick  GESTISCI AZIONE DELETE

    //fetch per recuperare dati oggetto esistente, da inserire in form
    fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Sorry we are having problem in retrieving data from server. Error: ${response.statusText}`);
        }
      })
      .then((product) => {
        const nameInput = document.getElementById("name");
        const descriptionInput = document.getElementById("description");
        const brandInput = document.getElementById("brand");
        const imageUrlInput = document.getElementById("imageUrl");
        const priceInput = document.getElementById("price");

        nameInput.innerText = product.name;
        descriptionInput.innerText = product.description;
        brandInput.innerText = product.brand;
        imageUrlInput.innerText = product.imageUrl;
        priceInput.innerText = product.price;
      });
  }
});
