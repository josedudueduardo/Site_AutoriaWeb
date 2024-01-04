const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

console.log(carrinho)

$(document).ready(function() {
    let itens = document.getElementById('itens');

    document.getElementById('quantidade').innerHTML= `<p id="quantidade" class="mb-0">Você tem ${carrinho.length} itens no seu carrinho</p>`

    carrinho.forEach((p, index) => {
        itens.innerHTML +=    `
        <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <div>
                <img
                  src=${p.imagem}
                  class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
              </div>
              <div class="ms-3">
                <h5 id="nome_${index}">${p.nome}</h5>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center">
              <div style="width: 50px;">
                <h5 class="fw-normal mb-0">${p.quantidade}</h5>
              </div>
              <div style="width: 80px;">
                <h5 class="mb-0">${p.valor}</h5>
              </div>
              <a type='button' class='removerItem' style="color: #cecece;" data-index="${index}"><i class="fas fa-trash-alt"></i></a>
            </div>
          </div>
        </div>
      </div>
          ` 
    })

    let buttonsRemover = document.querySelectorAll('.removerItem');
    buttonsRemover.forEach((button) => {
      button.addEventListener('click', () => {
        let index = button.getAttribute('data-index');
        let nome = document.getElementById(`nome_${index}`).innerText;
        let itemIndex = carrinho.findIndex(item => item.nome === nome)

        if (itemIndex !== -1) {
          carrinho.splice(itemIndex, 1)
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        location.reload()
      })
    })

    let valor_total = 0 
    carrinho.map((p) => {
      valor_total += (p.valor * p.quantidade)
    })

    console.log(valor_total)
    document.getElementById('valor').innerHTML = `
      <div>

        <div class="d-flex justify-content-between mb-4">
          <p class="mb-2">Total</p>
          <p class="mb-2">R$${valor_total}</p>
        </div>

        <button type="button" class="btn btn-info btn-block btn-lg">
          <div class="d-flex justify-content-between">
            <span>R$${valor_total}  Comprar <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
          </div>
        </button>
      </div>
    `
    
})
