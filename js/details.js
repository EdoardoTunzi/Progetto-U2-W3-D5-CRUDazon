const params = new URLSearchParams(window.location.search);
const id = params.get("prodId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUwODhhZDEyOTAwMTU4NzZiYzgiLCJpYXQiOjE3MzE2NjEzMjAsImV4cCI6MTczMjg3MDkyMH0.FvOf_mebQAdi5M66y4-5Tdg7Z_srSRoNtGZENCpsO60";

window.addEventListener("DOMContentLoaded", function () {
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
    .then((product) => {
      const detailsDiv = document.getElementById("detailsDiv");
      detailsDiv.innerHTML = `
      <h2 class="text-center">${product.name}</h2>
      <div class="d-flex my-4">
        <img class="rounded-3" src="${product.imageUrl}" width="200" alt="" />
        <div class="ms-5">
          <p id="description">Description: ${product.description}</p>
          <p id="prodId">ID: ${product._id}</p>
          <p id="brand">Brand: ${product.brand}</p>
          <p id="price">Price: ${product.price} €</p>
        </div>
      </div>
      <a href="./index.html">Back to homepage</a>
      `;
    })
    .catch((error) => console.log("Error in retrieving data from server:" + error));
});
