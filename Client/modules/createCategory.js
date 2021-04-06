function createCategory(name) {
  const categoriesWrapper = document.querySelector(".categories_wrapper");
  const categoryButton = document.createElement("button");
  categoryButton.textContent = name;
  categoryButton.classList.add("category");
  categoriesWrapper.appendChild(categoryButton);

  return categoryButton;
}

export { createCategory };
