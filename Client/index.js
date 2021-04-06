import { createCategory } from "./modules/createCategory.js";
import { productsWrapper, createProduct } from "./modules/createProduct.js";

const apiRoot = "http://localhost:3000";
const searchForm = document.querySelector(".search_form");
let searchValue;

function run() {
  getCategories();
  getProducts("/products");
  
}


async function getData(path) {
  let response = await fetch(`${apiRoot}${path}`);
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error("an error occurred while processing your request");
  }
}

function getCategories() {
  getData("/categories")
    .then((data) =>
      data.forEach((category) => {
        createCategory(category.name).addEventListener("click", () => {
          productsWrapper.textContent = "";
          getProducts(`/products?category=${category.id}`);
        });
      })
    )
    .catch((e) => alert(`${e}`));
}

function getProducts(path) {
  
  getData(path)
    .then((data) => {
      if (data.length === 0) {
          return;
      }
      data.forEach((product) => {
        createProduct(product);
      });
    })
    .catch((e) => alert(`${e}`));
}


searchForm.addEventListener("submit", (Event) => {
  Event.preventDefault();
  productsWrapper.textContent = "";
  const inputValue = Event.target.firstElementChild.value;
  searchValue = inputValue;
  getProducts(`/products?search=${inputValue}`);
  Event.target.firstElementChild.value = "";
});


run();
