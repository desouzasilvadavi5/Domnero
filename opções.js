/* ==========================================================================
   DOM NERO - SISTEMA DE CATÁLOGO, SELEÇÃO E CHECKOUT WHATSAPP
   ========================================================================== */

// Guarda o número de telefone do vendedor (com código do país 55 e DDD 81)
const NUMERO_VENDEDOR_WHATSAPP = "5581991215446"; 

/* ==========================================================================
   🎯 BANCO CENTRAL DE CORES POR PRODUTO
   ========================================================================== */
const CORES_POR_PRODUTO = {
    // CAMISAS
    'Camisa DryFit Performance Slim Fit': [
        { nome: 'Rosa', hex: '#ff00aa' },
        { nome: 'Branco', hex: '#ffffff' },
        { nome: 'Azul Marinho', hex: '#0b1b3d' },
        { nome: 'Vermelho', hex: '#d32f2f' },
        { nome: 'Cinza', hex: '#757575' }
    ],
    'Regata DryFit Performance Slim Fit': [
        { nome: 'Rosa', hex: '#ff00aa' },
        { nome: 'Branco', hex: '#ffffff' },
        { nome: 'Azul Marinho', hex: '#0b1b3d' },
        { nome: 'Vermelho', hex: '#d32f2f' },
        { nome: 'Cinza', hex: '#757575' }
    ],
    'Camiseta Basic 100% Algodão Pima': [
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Branco', hex: '#ffffff' },
        { nome: 'Verde Militar', hex: '#4b5320' },
        { nome: 'Vinho', hex: '#4a0e17' }
    ],
    'Camisa Polo Piquet Texturizada': [
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Azul Marinho', hex: '#0b1b3d' },
        { nome: 'Bege', hex: '#d2b48c' }
    ],
    'Camiseta Oversized Streetwear Black': [
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Off White', hex: '#f8f8ff' },
        { nome: 'Marrom', hex: '#4a2c11' }
    ],

    // BERMUDAS
    'Bermuda Esportiva DryTech com Bolso Zíper': [
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Cinza Escuro', hex: '#333333' },
        { nome: 'Azul Bic', hex: '#0000ff' }
    ],
    'Bermuda Sarja Casual Chino Elastano': [
        { nome: 'Bege', hex: '#d2b48c' },
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Khaki', hex: '#c3b091' }
    ],
    'Short Tactel Premium Mauricinho': [
        { nome: 'Preto', hex: '#0d0d0d' },
        { nome: 'Estampado Azul', hex: '#1e88e5' },
        { nome: 'Vermelho', hex: '#d32f2f' }
    ],
    'Bermuda Jeans Destroyed Slim Fit': [
        { nome: 'Jeans Claro', hex: '#87ceeb' },
        { nome: 'Jeans Escuro', hex: '#1c2833' }
    ],

    // KITS
    'Kit Verão: 1 Camisa DryFit + 1 Bermuda': [
        { nome: 'Preto + Preto', hex: '#0d0d0d' },
        { nome: 'Branco + Azul', hex: '#4682b4' }
    ],
    'Combo 3 Camisetas Básicas Algodão Pima': [
        { nome: 'Kit Clássico (Preto/Branco/Cinza)', hex: '#0d0d0d' }
    ],
    'Kit 2 Shorts Tactel Mauricinho': [
        { nome: 'Preto + Azul', hex: '#0d0d0d' }
    ],
    'Kit Executive: 2 Polos + 1 Bermuda Sarja': [
        { nome: 'Kit Premium', hex: '#0b1b3d' }
    ],

    // ACESSÓRIOS
    'Relógio Esportivo Cyber Gold': [
        { nome: 'Dourado / Preto', hex: '#d4af37' },
        { nome: 'Prata', hex: '#c0c0c0' },
        { nome: 'All Black', hex: '#0d0d0d' }
    ],
    'Carteira Slim Couro Nappa': [
        { nome: 'Preto Nobre', hex: '#0d0d0d' },
        { nome: 'Café Premium', hex: '#3e2723' },
        { nome: 'Caramelo', hex: '#c68a4c' }
    ],
    'Óculos de Sol Polarizado Matte': [
        { nome: 'Preto Fosco', hex: '#1a1a1a' },
        { nome: 'Tartaruga Brown', hex: '#5d4037' }
    ]
};

const CORES_PADRAO_GENERICAS = [
    { nome: 'Preto', hex: '#0d0d0d' },
    { nome: 'Branco', hex: '#ffffff' },
    { nome: 'Azul Marinho', hex: '#0b1b3d' }
];

// Objeto global do pedido com suporte a valor unitário e quantidade
let pedidoAtual = {
    nome: '',
    precoUnitario: 89.90,                  // Preço numérico individual de cada unidade
    precoTotalFormatado: 'R$ 89,90',      // Preço final calculado (Preço × Quantidade)
    quantidade: 1,                         // Quantidade de itens selecionados (padrão inicial 1)
    foto: '',
    cor: 'Preto',
    tamanho: 'M (38-40)',
    entrega: 'Entrega via Frete / Motoboy',
    pagamento: 'PIX',
    tipoProduto: 'Camisas',
    categoriaOrigem: 'inicio'
};

const especificacoesBanco = {
    'Camisas': [
        '• <strong>Tecido:</strong> DryFit / Algodão Pima de alta respirabilidade.',
        '• <strong>Composição:</strong> Tecido leve com secagem rápida e proteção UV.',
        '• <strong>Modelagem:</strong> Slim Fit anatômico com excelente caimento.',
        '• <strong>Garantia:</strong> 30 dias contra defeitos de fabricação.'
    ],
    'Bermudas': [
        '• <strong>Tecido:</strong> Tactel Premium / Sarja Chino com elastano.',
        '• <strong>Cós:</strong> Elástico ajustável com cordão reforçado.',
        '• <strong>Garantia:</strong> 30 dias contra defeitos de fabricação.'
    ],
    'Kits': [
        '• <strong>Combo:</strong> Peças coordenadas com alto custo-benefício.',
        '• <strong>Garantia:</strong> 30 dias contra defeitos de fabricação.'
    ],
    'Acessórios': [
        '• <strong>Qualidade:</strong> Material de alta durabilidade com acabamento fino.',
        '• <strong>Garantia:</strong> 30 dias contra defeitos de fabricação.'
    ]
};

/* ==========================================================================
   1. GERENCIADOR DE TELAS E NAVEGAÇÃO
   ========================================================================== */

function esconderTodasTelas() {
    document.querySelectorAll('.screen, .scroll-screen').forEach(tela => {
        tela.classList.remove('active');
        tela.style.display = 'none';
    });
}

function mostrarTela(idTela) {
    esconderTodasTelas();
    const target = document.getElementById(idTela);
    if (target) {
        target.style.display = 'flex';
        setTimeout(() => target.classList.add('active'), 20);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function abrirOpcoesRoupas(categoria) {
    let targetId = '';
    const cat = categoria ? categoria.trim().toLowerCase() : '';

    if (cat.includes('camisa')) targetId = 'tela-camisas';
    else if (cat.includes('bermuda')) targetId = 'tela-bermudas';
    else if (cat.includes('kit')) targetId = 'tela-kits';
    else if (cat.includes('acessório') || cat.includes('acessorio') || cat.includes('mais')) targetId = 'tela-acessorios';

    if (targetId) {
        pedidoAtual.categoriaOrigem = targetId;
        mostrarTela(targetId);
    }
}

function voltarInicio() { mostrarTela('inicio'); }
function voltarParaCatalogo() { mostrarTela(pedidoAtual.categoriaOrigem || 'inicio'); }
function voltarParaDetalhes() { mostrarTela('tela-detalhes-produto'); }

/* ==========================================================================
   2. CAPTURA AUTOMÁTICA, QUANTIDADE E CORES DINÂMICAS
   ========================================================================== */

// Função auxiliar para converter strings como "R$ 89,90" em um número float (89.90)
function converterPrecoParaNumero(stringPreco) {
    if (!stringPreco) return 89.90;
    const limpo = stringPreco.replace('R$', '').replace('.', '').replace(',', '.').trim();
    return parseFloat(limpo) || 89.90;
}

// Inicia o fluxo de compra ao clicar no produto do catálogo
function iniciarCompra(nomeProduto, preco, fotoUrl, tipoProduto) {
    pedidoAtual.nome = nomeProduto || 'Produto Selecionado';
    pedidoAtual.precoUnitario = converterPrecoParaNumero(preco);
    pedidoAtual.quantidade = 1; // Reseta a quantidade para 1 ao abrir um novo produto
    pedidoAtual.foto = fotoUrl || '';
    pedidoAtual.tipoProduto = tipoProduto || 'Camisas';

    const elNomeTela = document.getElementById('detalhe-nome');
    const elFotoTela = document.getElementById('detalhe-foto');

    if (elNomeTela) elNomeTela.innerText = pedidoAtual.nome;
    if (elFotoTela) {
        elFotoTela.src = pedidoAtual.foto;
        elFotoTela.alt = pedidoAtual.nome;
    }

    // Garante que o container de controle de quantidade esteja criado na tela
    garantirSeletorDeQuantidadeHTML();

    // Recalcula e atualiza o preço total na tela
    atualizarPrecoEQuantidadeTela();

    // Gera as cores exclusivas do produto
    gerarBolinhasDeCorDinamicas(pedidoAtual.nome);

    mostrarTela('tela-detalhes-produto');
}

// Cria dinamicamente a caixinha com botões [+] e [-] na tela de detalhes
function garantirSeletorDeQuantidadeHTML() {
    let container = document.getElementById('container-seletor-quantidade');
    const cardInfo = document.querySelector('.product-selection-info');

    if (!container && cardInfo) {
        container = document.createElement('div');
        container.id = 'container-seletor-quantidade';
        container.className = 'option-group';
        
        container.innerHTML = `
            <label class="option-label">Quantidade:</label>
            <div class="quantity-control-box">
                <button type="button" class="btn-qty-minus" onclick="alterarQuantidade(-1)">-</button>
                <span id="display-quantidade" class="qty-number-display">1</span>
                <button type="button" class="btn-qty-plus" onclick="alterarQuantidade(1)">+</button>
            </div>
        `;

        // Insere o seletor logo antes das cores
        const grupoCores = cardInfo.querySelector('.option-group');
        if (grupoCores) {
            cardInfo.insertBefore(container, grupoCores);
        } else {
            cardInfo.appendChild(container);
        }
    }
}

// Função acionada ao clicar nos botões + ou -
function alterarQuantidade(delta) {
    let novaQty = pedidoAtual.quantidade + delta;
    if (novaQty < 1) novaQty = 1; // Impede quantidades menores que 1
    
    pedidoAtual.quantidade = novaQty;
    atualizarPrecoEQuantidadeTela();
}

// Recalcula o valor multiplicando unitário × quantidade e atualiza a tela
function atualizarPrecoEQuantidadeTela() {
    const totalCalculado = pedidoAtual.precoUnitario * pedidoAtual.quantidade;
    
    // Formata o valor final no padrão brasileiro (ex: R$ 359,60)
    pedidoAtual.precoTotalFormatado = 'R$ ' + totalCalculado.toFixed(2).replace('.', ',');

    // Atualiza o contador numérico de quantidade
    const elDisplayQty = document.getElementById('display-quantidade');
    if (elDisplayQty) elDisplayQty.innerText = pedidoAtual.quantidade;

    // Atualiza o preço na tela de seleção
    const elPrecoTela = document.getElementById('detalhe-preco');
    if (elPrecoTela) elPrecoTela.innerText = pedidoAtual.precoTotalFormatado;
}

function gerarBolinhasDeCorDinamicas(nomeProduto) {
    const container = document.getElementById('container-bolinhas-cores');
    const labelCor = document.getElementById('label-cor-selecionada');
    if (!container) return;

    container.innerHTML = ''; 

    const listaCores = CORES_POR_PRODUTO[nomeProduto] || CORES_PADRAO_GENERICAS;

    listaCores.forEach((itemCor, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `color-swatch-btn ${index === 0 ? 'active' : ''}`;
        btn.style.backgroundColor = itemCor.hex;
        btn.title = itemCor.nome;

        if (itemCor.hex.toLowerCase() === '#ffffff' || itemCor.hex.toLowerCase() === '#f8f8ff') {
            btn.style.border = '1px solid #777';
        }

        btn.onclick = function (e) {
            e.preventDefault();
            const todasBolinhas = container.querySelectorAll('.color-swatch-btn');
            todasBolinhas.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            pedidoAtual.cor = itemCor.nome;
            if (labelCor) labelCor.innerText = itemCor.nome;
        };

        container.appendChild(btn);
    });

    if (listaCores.length > 0) {
        pedidoAtual.cor = listaCores[0].nome;
        if (labelCor) labelCor.innerText = listaCores[0].nome;
    }
}

/* ==========================================================================
   3. SELEÇÃO DE OPÇÕES E RESUMO DO PEDIDO
   ========================================================================== */

function selecionarTamanho(elementoBtn, nomeTamanho) {
    if (!elementoBtn) return;
    const container = elementoBtn.parentElement;
    container.querySelectorAll('.size-press-btn').forEach(b => b.classList.remove('active'));
    elementoBtn.classList.add('active');
    pedidoAtual.tamanho = nomeTamanho;
}

function selecionarEntrega(elementoBtn, formaEntrega) {
    if (!elementoBtn) return;
    const container = elementoBtn.parentElement;
    container.querySelectorAll('.size-press-btn').forEach(b => b.classList.remove('active'));
    elementoBtn.classList.add('active');
    pedidoAtual.entrega = formaEntrega;
}

function selecionarPagamento(elementoBtn, formaPagamento) {
    if (!elementoBtn) return;
    const container = elementoBtn.parentElement;
    container.querySelectorAll('.size-press-btn').forEach(b => b.classList.remove('active'));
    elementoBtn.classList.add('active');
    pedidoAtual.pagamento = formaPagamento;
}

function irParaFinalizacao() {
    const elResumoNome = document.getElementById('resumo-nome');
    const elResumoCor = document.getElementById('resumo-cor');
    const elResumoTamanho = document.getElementById('resumo-tamanho');
    const elResumoPreco = document.getElementById('resumo-preco');
    const ulSpecs = document.getElementById('specs-list');

    // Monta o nome exibindo a quantidade (ex: "4x Óculos de Sol Polarizado Matte")
    if (elResumoNome) {
        elResumoNome.innerText = `${pedidoAtual.quantidade}x ${pedidoAtual.nome}`;
    }
    if (elResumoCor) elResumoCor.innerText = pedidoAtual.cor;
    if (elResumoTamanho) elResumoTamanho.innerText = pedidoAtual.tamanho;
    if (elResumoPreco) elResumoPreco.innerText = pedidoAtual.precoTotalFormatado;

    if (ulSpecs) {
        ulSpecs.innerHTML = '';
        const specs = especificacoesBanco[pedidoAtual.tipoProduto] || especificacoesBanco['Camisas'];
        specs.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            ulSpecs.appendChild(li);
        });
    }

    mostrarTela('tela-finalizacao');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarTela('inicio');
});

/* ==========================================================================
   4. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
   ========================================================================== */

function alternarTema() {
    const body = document.body;
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('dom_nero_tema', 'claro');
    } else {
        localStorage.setItem('dom_nero_tema', 'escuro');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('dom_nero_tema');
    if (temaSalvo === 'claro') {
        document.body.classList.add('light-mode');
    }
});
