async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();

    let output = "";

    products.forEach(product => {

        output += `
        <div class="product">

            <h3>${product.name}</h3>

            <p>Price: ₹${product.price}</p>

            <p>${product.description}</p>

        </div>
        `;

    });

    document.getElementById("products").innerHTML = output;
}

async function addProduct() {

    const name = document.getElementById("name").value;

    const price = document.getElementById("price").value;

    const description =
    document.getElementById("description").value;

    await fetch("/api/products/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            price,
            description
        })

    });

    loadProducts();
}

loadProducts();