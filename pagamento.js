/* ==========================================================================
   DOM NERO - SISTEMA DE PAGAMENTO DINÂMICO (PIX, CARTÃO E DINHEIRO)
   ========================================================================== */

// Configuração da chave Pix oficial da loja (CPF)
const CHAVE_PIX_LOJA = "14965520408";

// Controle para saber se o cliente copiou a chave Pix
let pixFoiCopiado = false;

// Monitora os cliques nos botões de pagamento para atualizar a tela instantaneamente
document.addEventListener('DOMContentLoaded', () => {
    // Garante escuta nos botões da tela de checkout
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('size-press-btn')) {
            const pai = e.target.parentElement;
            if (pai && pai.previousElementSibling && pai.previousElementSibling.textContent.includes('Forma de Pagamento')) {
                setTimeout(atualizarBlocoPagamentoGeraChave, 50);
            }
        }
    });
});

// Renderiza ou esconde o bloco do Pix conforme o botão ativo
function atualizarBlocoPagamentoGeraChave() {
    let container = document.getElementById('bloco-pagamento-dinamico');
    const checkoutCard = document.querySelector('.checkout-card');
    
    if (!container && checkoutCard) {
        container = document.createElement('div');
        container.id = 'bloco-pagamento-dinamico';
        container.className = 'payment-gateway-container';
        
        const btnWhatsOriginal = document.querySelector('.btn-whatsapp-finalizar');
        if (btnWhatsOriginal) {
            btnWhatsOriginal.style.display = 'none';
            checkoutCard.insertBefore(container, btnWhatsOriginal);
        } else {
            checkoutCard.appendChild(container);
        }
    }

    if (!container) return;

    const metodoSelecionado = pedidoAtual.pagamento || 'PIX';

    // SÓ EXIBE A CAIXA COM A CHAVE SE O BOTAO PIX ESTIVER SELECIONADO
    if (metodoSelecionado.includes('PIX')) {
        container.style.display = 'flex';
        // Efeito Flash/Fade ao aparecer
        container.classList.remove('flash-out');
        container.classList.add('flash-in');

        container.innerHTML = `
            <div class="payment-gateway-title">Pagamento Instantâneo via Pix</div>
            <div class="key-box-wrapper">
                <span style="font-size: 13px; color: var(--text-secondary);">Chave Pix / CPF:</span>
                <div class="key-code-display" id="codigo-pix-display">${CHAVE_PIX_LOJA}</div>
                <button type="button" class="btn-copiar-chave" onclick="copiarChavePixEPremir('${CHAVE_PIX_LOJA}')">
                    📋 Copiar Chave Pix
                </button>
            </div>
            
            <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 4px;">
                Após copiar e pagar no app do banco, clique no botão verde para enviar o comprovante.
            </p>

            <button type="button" class="btn-whatsapp-acompanhar" onclick="enviarPedidoComprovanteWhatsApp()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.301-1.127z"/>
                </svg>
                Finalizar Compra via WhatsApp
            </button>
        `;
    } else {
        // QUANDO CLICAR EM CARTÃO OU DINHEIRO, A CAIXA PIX DESAPARECE TOTALMENTE
        container.style.display = 'flex';
        container.classList.remove('flash-in');

        container.innerHTML = `
            <button type="button" class="btn-whatsapp-acompanhar" onclick="enviarPedidoComprovanteWhatsApp()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.301-1.127z"/>
                </svg>
                Finalizar Compra via WhatsApp
            </button>
        `;
    }
}

// Copia a chave Pix e ativa o registro de cópia
function copiarChavePixEPremir(chave) {
    navigator.clipboard.writeText(chave).then(() => {
        pixFoiCopiado = true;
        alert('Chave Pix (CPF) copiada! Realize o pagamento no seu banco e envie o comprovante no WhatsApp.');
    }).catch(() => {
        pixFoiCopiado = true;
        alert('Chave Pix: ' + chave);
    });
}

// Monta e envia a mensagem para o WhatsApp com base na modalidade escolhida, quantidade e valor total
function enviarPedidoComprovanteWhatsApp() {
    const metodo = pedidoAtual.pagamento || 'PIX';
    let linhaDetalhePagamento = `*Forma de Pagamento:* ${metodo}`;

    if (metodo.includes('PIX')) {
        const statusPix = pixFoiCopiado ? "Chave Copiada" : "Chave Visualizada";
        linhaDetalhePagamento = `*Forma de Pagamento:* PIX (${statusPix})\n_Obs: Segue o comprovante em anexo._`;
    }

    const mensagem = 
`*NOVO PEDIDO - DOM NERO* 👑

*Produto:* ${pedidoAtual.nome}
*Quantidade:* ${pedidoAtual.quantidade} unidade(s)
*Cor Escolhida:* ${pedidoAtual.cor}
*Tamanho Escolhido:* ${pedidoAtual.tamanho}
*Valor Total do Pedido:* ${pedidoAtual.precoTotalFormatado}

*Forma de Entrega:* ${pedidoAtual.entrega}
${linhaDetalhePagamento}

_Olá! Gostaria de confirmar meu pedido com você._`;

    const url = `https://api.whatsapp.com/send?phone=${NUMERO_VENDEDOR_WHATSAPP}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Sincroniza com a função de troca de tela
const fOriginalIrParaFinalizacao = window.irParaFinalizacao;
window.irParaFinalizacao = function() {
    if (typeof fOriginalIrParaFinalizacao === 'function') fOriginalIrParaFinalizacao();
    pixFoiCopiado = false;
    setTimeout(atualizarBlocoPagamentoGeraChave, 100);
};

