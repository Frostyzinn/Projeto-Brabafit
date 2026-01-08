// Inicializa o carrinho do LocalStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Atualiza o contador no header assim que a página carrega
document.addEventListener("DOMContentLoaded", atualizarContador);

function addCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    
    // Feedback visual mais sutil e profissional
    atualizarContador();
    alert(`✅ ${nome} adicionado à sua sacola!`);
}

function atualizarContador() {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerText = carrinho.length;
    }
}

// Funções da página de Carrinho (mantendo a lógica do seu arquivo original mas adaptada)
if (window.location.pathname.includes("carrinho.html")) {
    carregarCarrinho();
}

function carregarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let totalElement = document.getElementById("totalCheckout") || document.getElementById("total"); // Compatível com checkout e carrinho
    
    if (!lista) return;

    lista.innerHTML = ""; // Limpa a lista antes de renderizar
    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p style='padding:20px; text-align:center'>Sua sacola está vazia.</p>";
    }

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        // Estilização inline básica para a lista ficar bonita sem CSS extra complexo
        li.style.cssText = "display:flex; justify-content:space-between; padding:15px; border-bottom:1px solid #eee;";
        
        li.innerHTML = `
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2)}</strong>
            <button onclick="removerItem(${index})" style="color:red; background:none; border:none; cursor:pointer; margin-left:10px;">X</button>
        `;
        lista.appendChild(li);
        total += item.preco;
    });

    if(totalElement) totalElement.innerText = total.toFixed(2);
}

function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
    atualizarContador();
}

