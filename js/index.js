const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUwODhhZDEyOTAwMTU4NzZiYzgiLCJpYXQiOjE3MzE2NjEzMjAsImV4cCI6MTczMjg3MDkyMH0.FvOf_mebQAdi5M66y4-5Tdg7Z_srSRoNtGZENCpsO60";
const mainRow = document.getElementById("mainRow");

const createProductCards = (obj) => {
  obj.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    const card = document.createElement("div");
    card.className = "card mb-4 shadow rounded-4 overflow-hidden";
    card.innerHTML = `
            <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top img-fluid object-fit"/>
                    <div class="card-body shadow-lg">
                      <h5 class="card-title text-truncate">${product.name}</h5>
                      <p class="card-text text-truncate">
                        ${product.description}
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <a class="btn btn-sm btn-outline-success hide-btn" href="./details.html?prodId=${product._id}">Details</a>
                          <a class="btn btn-sm btn-outline-dark hide-btn" href="./backoffice.html?prodId=${product._id}"><i class="bi bi-pencil-fill"></i></a>
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
      } else {
        throw new Error(`Sorry we are having problem in retrieving data from server. Error: ${response.statusText}`);
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
