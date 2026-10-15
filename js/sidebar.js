(async function carregarSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    // Resolve o caminho a partir deste arquivo, independentemente da URL da página.
    const scriptAtual = document.currentScript;
    const sidebarUrl = new URL('../componentes/sidebar.html', scriptAtual.src);

    try {
        const resposta = await fetch(sidebarUrl);
        if (!resposta.ok) {
            throw new Error(`Não foi possível carregar a sidebar (${resposta.status}).`);
        }

        container.innerHTML = await resposta.text();
        ativarLinkAtual();
    } catch (erro) {
        console.error('Erro ao carregar a sidebar:', erro);
        container.innerHTML = '<p class="sidebar-erro">Não foi possível carregar o menu. Abra o projeto por um servidor local (por exemplo, Live Server no VS Code), não diretamente pelo arquivo HTML.</p>';
    }
})();

function ativarLinkAtual() {
    const paginaAtual = new URL(window.location.href);
    document.querySelectorAll('#sidebar-container .menu a').forEach(link => {
        const urlLink = new URL(link.href, window.location.href);
        if (urlLink.pathname === paginaAtual.pathname) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}
