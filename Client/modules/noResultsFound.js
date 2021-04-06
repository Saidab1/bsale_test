import { productsWrapper } from "./createProduct.js";

function showNoResults() {
  const noResultsWrapper = document.createElement("div");
  noResultsWrapper.classList.add("no_results_wrapper");
  const image = document.createElement("img");
  image.classList.add("no_results_img");
  image.src = "./images/noResults.png";
  image.alt = "results not found";
  const message = document.createElement("p");
  message.classList.add("no_results_message");
  message.textContent = "No se encontraron resultados asociados a tu búqueda";
  noResultsWrapper.appendChild(image);
  noResultsWrapper.appendChild(message);
  productsWrapper.appendChild(noResultsWrapper);

  return noResultsWrapper;
}

export { showNoResults };
