const productsWrapper = document.querySelector(".products_wrapper");

function createProduct(product) {
  const productContainer = document.createElement("article");
  productContainer.classList.add("product_container");
  const productDetails = document.createElement("div");
  productDetails.classList.add("product_description");
  const productImg = document.createElement("img");
  productImg.src = `${
    product.url_image ? product.url_image : "./images/sinImagen.png"
  } `;
  productImg.alt = "product";
  productImg.classList.add("product_img");
  const productName = document.createElement("p");
  productName.classList.add("product_name");
  productName.textContent = product.name;
  productDetails.appendChild(productImg);
  productDetails.appendChild(productName);
  productContainer.appendChild(productDetails);
  const priceShopContainer = document.createElement("div");
  priceShopContainer.classList.add("price_shop_container");
  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  const shopButton = document.createElement("div");
  shopButton.classList.add("add_shopping_cart");
  const icon = document.createElement("span");
  icon.classList.add("material-icons");
  icon.textContent = "add_shopping_cart";
  shopButton.appendChild(icon);
  priceShopContainer.appendChild(price);
  priceShopContainer.appendChild(shopButton);
  productContainer.appendChild(priceShopContainer);
  productsWrapper.appendChild(productContainer);

  return productContainer;
}

export { productsWrapper, createProduct };
