// carrinho.js
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

$(document).ready(function() {
    const itens = $('#itens');
    $('#quantidade').text(`Você tem ${carrinho.length} itens no seu carrinho`);

    carrinho.forEach((p, index) => {
        itens.append(`
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <img src="${p.imagem}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
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
                        <a class="removerItem" style="color: #cecece;" data-index="${index}"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>`);
    });

    $('.removerItem').click(function() {
        const index = $(this).data('index');
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        location.reload();
    });

    const valorTotal = carrinho.reduce((total, p) => total + (p.valor * p.quantidade), 0);

    $('#valor').html(`
    <div>
        <div class="d-flex justify-content-between mb-4">
            <p class="mb-2">Total</p>
            <p class="mb-2">R$${valorTotal.toFixed(2)}</p>
        </div>
        <button type="button" class="btn btn-info btn-block btn-lg">
            <div class="d-flex justify-content-between">
                <span>R$${valorTotal.toFixed(2)}  Comprar <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
            </div>
        </button>
    </div>`);
});
