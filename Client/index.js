import { createCategory } from "./modules/createCategory.js";
import { productsWrapper, createProduct } from "./modules/createProduct.js";
import { showNoResults } from "./modules/noResultsFound.js";

const apiRoot = "https://bsale-test-api.herokuapp.com";

const searchForm = document.querySelector(".search_form");
const logo = document.querySelector(".store_logo");
let searchValue;
const observerDiv = document.querySelector("#observer");
let loading = false;
let productsPage = 1;
let categorySelected = false;
let categoryId;
let searchSelected = false;


function run() {
  getCategories();
  getProducts("/products", true);
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
          searchSelected = false;
          categorySelected = true;
          productsPage = 1;
          productsWrapper.textContent = "";
          categoryId = category.id;
          getProducts(`/products?category=${category.id}`, true);
        });
      })
    )
    .catch((e) => alert(e));
}

function getProducts(path, displayLoading) {
  loading = true;
  if (displayLoading) showLoading();

  getData(path)
    .then((data) => {
      if (data.length === 0) {
        if (searchSelected && productsPage === 1) {
          showNoResults();
        } else {
          loading = false;
          return;
        }
      }
      data.forEach(createProduct);
      productsPage += 1;
      loading = false;
      if (displayLoading) showLoading();
    })
    .catch((e) => alert(e));
}

function showLoading() {
  const loadingMessage = document.getElementById("loading_message");

  if (loading) {
    if (loadingMessage) return;

    const load = document.createElement("p");
    load.id = "loading_message";
    load.textContent = "Cargando....";
    productsWrapper.appendChild(load);
  }

  if (loadingMessage) {
    loadingMessage.remove();
  }
}

logo.addEventListener("click", () => {
  categorySelected = false;
  searchSelected = false;
  productsPage = 1;
  productsWrapper.textContent = "";
  getProducts("/products", true);
});

searchForm.addEventListener("submit", (Event) => {
  categorySelected = false;
  searchSelected = true;
  productsPage = 1;
  Event.preventDefault();
  productsWrapper.textContent = "";
  const inputValue = Event.target.firstElementChild.value;
  searchValue = inputValue;
  getProducts(`/products?search=${inputValue}`, true);
  Event.target.firstElementChild.value = "";
});

const observer = new IntersectionObserver((entries) => {
  const firstentry = entries[0];

  if (firstentry.isIntersecting) {
    if (loading) return;

    if (!categorySelected) {
      if (searchSelected) {
        getProducts(
          `/products?search=${searchValue}&page=${productsPage}`,
          false
        );
      } else {
        getProducts(`/products?page=${productsPage}`, false);
      }
    } else {
      getProducts(
        `/products?category=${categoryId}&page=${productsPage}`,
        false
      );
    }
  }
});
observer.observe(observerDiv);

run();
