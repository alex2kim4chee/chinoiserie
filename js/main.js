async function loadProducts() {
  const productsContainer = document.querySelector('.product-grid');
  const productData = await fetch('products/products.json').then(res => res.json());

  for (const product of productData.products) {
    const productElement = document.createElement('article');
    productElement.className = 'product-item';

    productElement.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" class="front">
        <img src="${product.image.replace('.webp', '-back.webp')}" alt="${product.name} Back" class="back">
      </div>
      <h2>${product.name}</h2>
      <p class="description">${product.description}</p>
      <div class="price-size">
        <span class="price">$${product.price}</span>
        <div class="size-selector">
          <select>
            ${Object.keys(product.sizes)
              .map(size => `<option value="${product.sizes[size]}">${size}</option>`)
              .join('')}
          </select>
        </div>
      </div>
      <button class="order-now">Order</button>
    `;

    productsContainer.appendChild(productElement);

    const sizeDropdown = productElement.querySelector('.size-selector select');
    const orderButton = productElement.querySelector('.order-now');

    sizeDropdown.addEventListener('change', (event) => {
      orderButton.onclick = () => {
        const url = event.target.value;
        if (url) window.open(url, '_blank');
      };
    });

    sizeDropdown.dispatchEvent(new Event('change'));

    // Mobile touch toggle
    const productImage = productElement.querySelector('.product-image');
    productImage.addEventListener('click', () => {
      const frontImage = productImage.querySelector('.front');
      const backImage = productImage.querySelector('.back');
      const isFrontVisible = window.getComputedStyle(frontImage).opacity === '1';

      frontImage.style.opacity = isFrontVisible ? '0' : '1';
      backImage.style.opacity = isFrontVisible ? '1' : '0';
    });
  }
}

loadProducts();
