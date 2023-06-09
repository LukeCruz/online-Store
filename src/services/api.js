export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await fetch(url);
  const response = data.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/${categoryId}/${query}`;
  const data = await fetch(url);
  const response = data.json();
  return response;
}

export async function getProductById(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const data = await fetch(url);
  const response = data.json();
  return response;
}

export async function getProductsFromCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const data = await fetch(url);
  const response = data.json();
  return response;
}

export async function getProductDetails(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const data = await fetch(url);
  const response = data.json();
  return response;
}
