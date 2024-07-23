class Componente extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const imagem = this.getAttribute('imagem');
    const nome = this.getAttribute('nome');
    const valor = this.getAttribute('valor');

    const div = document.createElement('div');
    div.className = 'card mb-3 mt-3';
    div.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${imagem}" class="img-fluid rounded-start" alt="${nome}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <p class="card-text">Preço: R$${valor}</p>
            <button type="button" class="btn btn-secondary btn-sm buttonAdd"><i class="bi bi-cart"></i></button>
            <a type="button" class="btn btn-outline-dark btn-sm buttonComprar">Comprar</a>
          </div>
        </div>
      </div>
    `;
    this.appendChild(div);
  }
}

customElements.define('componente-novo', Componente);
let produtos = [
  {
    imagem: "https://www.goimports.com.br/image/catalog/00iphone15/iphone-15-finish-select-202309-6-1inch-black.png",
    nome: 'iPhone 15 Plus',
    valor: 12999
  },
  {
    imagem: "https://i.zst.com.br/thumbs/12/11/35/-1115223425.jpg",
    nome: 'iPhone 15 Pro',
    valor: 14999
  },
  {
    imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/sm-m546bzsdzto/gallery/br-galaxy-m54-5g-sm-m546-sm-m546bzsdzto-536057191?$650_519_PNG$",
    nome: 'Galaxy M54 5G',
    valor: 2000
  },
  {
    imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/sm-a346mlgazto/gallery/br-galaxy-a34-5g-sm-a346-sm-a346mlgazto-thumb-535811050?$480_480_PNG$",
    nome: 'Galaxy A34 5G',
    valor: 1400
  },
  {
    imagem: "https://m.media-amazon.com/images/I/415pAx876jL._AC_UF1000,1000_QL80_.jpg",
    nome: 'Xiaomi 13',
    valor: 10999
  },
  {
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-92N5tOVGzyMbG7gqg5wCEPgpbXDpK9CflNv-dv6JkHXMCKrS9rfaPOkHEML",
    nome: 'Xiaomi 11T Pro',
    valor: 6999
  },
  {
    imagem: "https://m.media-amazon.com/images/I/51aNP7WdtcL._AC_UF1000,1000_QL80_.jpg",
    nome: 'Moto g53 5G',
    valor: 1079.10
  },
  {
    imagem: "https://brmotorolanew.vtexassets.com/arquivos/ids/165521-800-auto",
    nome: 'Motorola edge 40 5G',
    valor: 2249.10
  },
  {
    imagem: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/504719/Smartphone-Huawei-P60-Pro-512GB-12GB-RAM-C-mera-de-48MP-Tela-de-6-67-Polegadas-Black_1700606893_gg.jpg",
    nome: 'Huawei P60 Pro',
    valor: 13490.00
  },
  {
    imagem: "https://m.media-amazon.com/images/I/616L4JGA0pL._AC_SX679_.jpg",
    nome: 'Huawei Smartphone 5G P40',
    valor: 1840.13
  }
];

let carrinho = [];

$(document).ready(function() {
  let marcas = document.getElementById('marcas');

  produtos.forEach((p, index) => {
    let componente = document.createElement('componente-novo');
    componente.setAttribute('imagem', p.imagem);
    componente.setAttribute('nome', p.nome);
    componente.setAttribute('valor', p.valor);

    marcas.appendChild(componente);
  });

  function adicionarCarrinho() {
    let card = this.closest('componente-novo');
    let imagem = card.querySelector('img').src;
    let nome = card.querySelector('.card-title').innerText;
    let valor = card.querySelector('.card-text').innerText.split(' ')[1];

    let carrinhoTotal = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinhoTotal.find((elemento) => elemento.nome === nome);

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinhoTotal.push({
        imagem: imagem,
        nome: nome,
        valor: valor,
        quantidade: 1
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinhoTotal));
    console.log(carrinhoTotal);
  }

  let buttonsAdd = document.querySelectorAll('.buttonAdd');
  buttonsAdd.forEach(button => {
    button.addEventListener('click', adicionarCarrinho);
  });
});
