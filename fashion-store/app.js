function toggleTheme() {
   const temaAtual = document.documentElement.getAttribute('data-theme');
   const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
   document.documentElement.setAttribute('data-theme', novoTema);
   localStorage.setItem('theme', novoTema);
}

async function mostrarDestaques() {
    
    try{
        const resposta = await fetch('https://api.escuelajs.co/api/v1/products?limit=3');
        const produtos = await resposta.json();

        const mostrarTres = produtos.slice(0,3);
        const lista = document.getElementById('featured-list');
        lista.innerHTML = '';

        mostrarTres.forEach(function(produto){

            lista.innerHTML += `
             <article class="card placeholder-card">
              <div class="card-img-wrapper">
            <img src="${produto.images[0]}" alt="${produto.title}" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${produto.category.name}</span>
            <h3 class="card-title">${produto.title}</h3>
            <div class="card-footer">
              <span class="card-price">R$ ${produto.price}</span>
             <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
          </div>
        </article>
         `;

         });

    } catch(erro) {
        console.error('Erro ao buscar produtos:', erro);
    }
}

mostrarDestaques();



   async function mostrarDetalhe() {
     try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

         const resposta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const produto = await resposta.json();

        const container = document.getElementById('product-detail');
         container.innerHTML = `
            <img src="${produto.images[0]}" alt="${produto.title}" class="detail-img">
             <div class="detail-info">
                <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">Categoria: ${produto.category.name}</span>
                 <h1>${produto.title}</h1>
                <div class="detail-price">R$ ${produto.price}</div>
                  <p class="detail-description">${produto.description}</p>
                <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
            </div>
          `;
 
      } catch(erro) {
         console.error('Erro ao buscar produto:', erro);
     }
}

mostrarDetalhe();

async function mostrarProdutos(url = 'https://api.escuelajs.co/api/v1/products') {
    try {
          const resposta = await fetch(url);
         const produtos = await resposta.json();


        const lista = document.getElementById('products-list');
          lista.innerHTML = '';

         produtos.forEach(function(produto) {

            lista.innerHTML += `
                  <article class="card placeholder-card">
                    <div class="card-img-wrapper">
                        <img src="${produto.images[0]}" alt="${produto.title}" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${produto.category.name}</span>
                        <h3 class="card-title">${produto.title}</h3>
                        <div class="card-footer">
                            <span class="card-price">R$ ${produto.price}</span>
                            <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>

            `;
        });
 
       } catch(erro) {
         console.error('Erro ao buscar produtos:', erro);
       }


  }

async function carregarCategorias() {
    try {
        const resposta = await fetch('https://api.escuelajs.co/api/v1/categories');
         const categorias = await resposta.json();

        const select = document.getElementById('category-filter');
 
          categorias.forEach(function(categoria) {



            select.innerHTML += `<option value="${categoria.id}">${categoria.name}</option>`;
         });



    }  catch(erro) {
        console.error('Erro ao buscar categorias:', erro);
      }
    }

  function filterProducts(id) {
     if (id === '') {
        mostrarProdutos();
    } else {
        mostrarProdutos(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
    }
}

mostrarProdutos();
carregarCategorias();