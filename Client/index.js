import { createCategory } from "./modules/createCategory.js";
import { productsWrapper, createProduct } from "./modules/createProduct.js";
import { showNoResults } from "./modules/noResultsFound.js";

const apiRoot = "https://bsale-test-api.herokuapp.com";

const searchForm = document.querySelector(".search_form");
const logo = document.querySelector(".store_logo");
const observerDiv = document.querySelector("#observer");
let searchValue;

//tracks loading state
let loading = false;

//indicates results page
let productsPage = 1;

//tracks if a category is select
let categorySelected = false;
let categoryId;

//tracks if a search is made
let searchSelected = false;

/**
 * start the application
 */
function run() {
  createCategories();
  getProducts("/products", true);
}

/**
 * Utility to query API and parse the json response
 */
async function getData(path) {
  let response = await fetch(`${apiRoot}${path}`);
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error("an error occurred while processing your request");
  }
}

/**
 * creates category button and add event listener to each one
 */
function createCategories() {
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

/**
 * if get data from api creates products,
 * otherwise if is a search indicates no result found;
 */
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

/**
 * creates loading message if is loading and loading message doesn't exist,
 * otherwise removes it from DOM
 */
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

/**
 * add event listener to BsaleShop(logo) to get all products
 */
logo.addEventListener("click", () => {
  categorySelected = false;
  searchSelected = false;
  productsPage = 1;
  productsWrapper.textContent = "";
  getProducts("/products", true);
});

/**
 * add event listener to get user search and gets
 * products that includes it
 */
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

/**
 * allows to load more products when a category is selected or not,
 *  or in a search
 */
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
