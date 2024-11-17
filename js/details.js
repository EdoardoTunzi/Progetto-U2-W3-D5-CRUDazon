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
      <div class="d-flex flex-wrap my-4 align-items-center">
        <img class="rounded-5 border" src="${product.imageUrl}" width="250" alt="" />
        <div class="ms-3">
          <p id="description"><span class="fw-bold">Description:</span> ${product.description}</p>
          <p id="prodId"><span class="fw-bold">ID:</span> ${product._id}</p>
          <p id="brand"><span class="fw-bold">Brand:</span> ${product.brand}</p>
          <p id="price"><span class="fw-bold">Price:</span> ${product.price} €</p>
        </div>
      </div>
      <a href="./index.html">Back to homepage</a>
      `;
    })
    .catch((error) => console.log("Error in retrieving data from server:" + error));
});
