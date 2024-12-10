async function loadProducts() {
  const productsContainer = document.querySelector('.product-grid');
  const productData = await fetch('products/products.json').then(res => res.json());

  for (const product of productData.products) {
    const productElement = document.createElement('article');
    productElement.className = 'product-item';

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <div class="size-selector">
        <label for="size-${product.name}">Size:</label>
        <select id="size-${product.name}" class="size-dropdown">
          ${Object.keys(product.sizes)
            .map(size => `<option value="${product.sizes[size]}">${size}</option>`)
            .join('')}
        </select>
      </div>
      <button class="shop-now">Shop Now</button>
    `;

    productsContainer.appendChild(productElement);

    const sizeDropdown = productElement.querySelector('.size-dropdown');
    const shopNowButton = productElement.querySelector('.shop-now');

    sizeDropdown.addEventListener('change', (event) => {
      shopNowButton.onclick = () => {
        const url = event.target.value;
        if (url) window.open(url, '_blank');
      };
    });

    sizeDropdown.dispatchEvent(new Event('change'));
  }
}

loadProducts();
