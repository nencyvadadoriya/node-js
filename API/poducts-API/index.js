console.log("products api");
// products api = https://dummyjson.com/products

const ProductsAPI = "https://dummyjson.com/products";


async function fetchProductsData() {
    const response = await fetch(ProductsAPI);
    if (response.status === 200) {
        const ProductData = await response.json();
        const Products = ProductData.products;
        let MyProdutcs = '';
        Products.forEach(product => {
            console.log(product);
            MyProdutcs += `<div class="card" style="width: 18rem; margin:10px;">
                                <img src=${product.thumbnail} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">title :${product.title}</h5>
                                    <p class="card-text"><b>description</b> :${product.description}</p>
                                    <p class="card-text"><b>category</b> :${product.category}</p>
                                    <p class="card-text"><b>price</b> :${product.price}</p>
                                    <p class="card-text"><b>discountPercentage </b>:${product.discountPercentage}</p>
                                    <p class="card-text"><b>rating </b>:${product.rating}</p>
                                    <p class="card-text"><b>stock </b>:${product.stock}</p>
                                    <p class="card-text"><b>brand </b>:${product.brand}</p>
                                    <a href="#" class="btn btn-success">BUY NOW</a>
                                </div>
                            </div>`
        });
        document.getElementById('products').innerHTML = MyProdutcs;
    }
}

const AllProducts = fetchProductsData();