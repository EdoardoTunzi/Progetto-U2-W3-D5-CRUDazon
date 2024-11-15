const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUwODhhZDEyOTAwMTU4NzZiYzgiLCJpYXQiOjE3MzE2NjEzMjAsImV4cCI6MTczMjg3MDkyMH0.FvOf_mebQAdi5M66y4-5Tdg7Z_srSRoNtGZENCpsO60";
const mainRow = document.getElementById("mainRow");

const createProductCards = (obj) => {
  mainRow.innerHTML = "";
  obj.forEach((product) => {
    //console.log(photo.src.original);
    const col = document.createElement("div");
    col.className = "col-md-4";
    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm rounded-4 overflow-hidden";
    card.innerHTML = `
            <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top img-fluid object-fit"/>
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">
                        ${product.description}
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <button type="button" class="btn btn-sm btn-outline-secondary view-btn">Details</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Edit</button>
                        </div>
                        <span class="fw-bold fs-3">${product.price} €</span>
                      </div>
            `;
    mainRow.appendChild(col);
    col.appendChild(card);
  });
};

const handleAPIfetch = function () {
  fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((productsObj) => {
      createProductCards(productsObj);
    })
    .catch((error) => console.error(error));
};

window.addEventListener("DOMContentLoaded", function () {
  handleAPIfetch();
});
