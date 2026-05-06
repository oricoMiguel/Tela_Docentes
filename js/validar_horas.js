document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Filtro (Mantida) ---
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const statusSelect = document.getElementById('statusSelect');
    const btnPesquisar = document.getElementById('btnPesquisar');
    const tableRows = document.querySelectorAll('#hoursTable tbody tr:not(.empty-row)');

    function filtrarTabela() {
        const termoBusca = searchInput.value.toLowerCase();
        const colunaSelecionada = categorySelect.value;
        const statusSelecionado = statusSelect.value;

        tableRows.forEach(row => {
            let matchesSearch = false;
            const colunas = {
                'Curso': row.cells[0].innerText.toLowerCase(),
                'Projeto': row.cells[1].innerText.toLowerCase(),
                'Aluno': row.cells[2].innerText.toLowerCase(),
                'Data': row.cells[3].innerText.toLowerCase()
            };

            if (colunaSelecionada === 'Todas') {
                matchesSearch = row.innerText.toLowerCase().includes(termoBusca);
            } else {
                const textoColuna = colunas[colunaSelecionada];
                matchesSearch = textoColuna && textoColuna.includes(termoBusca);
            }

            row.style.display = matchesSearch ? '' : 'none';
        });
    }

    btnPesquisar.addEventListener('click', filtrarTabela);
    searchInput.addEventListener('keyup', filtrarTabela);

    // --- Lógica dos Botões de Ação ---
    const toast = document.getElementById('toast-container');

    function exibirMensagem(texto, cor) {
        toast.innerText = texto;
        toast.style.backgroundColor = cor;
        toast.className = "toast-visible";
        
        // Esconde após 3 segundos
        setTimeout(() => {
            toast.className = "toast-hidden";
        }, 3000);
    }

    // Usando delegação de eventos para capturar cliques nos botões da tabela
    document.querySelector('#hoursTable tbody').addEventListener('click', (e) => {
        const target = e.target;
        const nomeAluno = target.closest('tr').cells[2].innerText;

        // Botão OK (Aprovar)
        if (target.classList.contains('btn-ok')) {
            exibirMensagem(`Horas de ${nomeAluno} aprovadas com sucesso!`, "#00c853");
        }

        // Botão NEGAR
        if (target.classList.contains('btn-negue')) {
            exibirMensagem("Redirecionando para justificativa...", "#ff3131");
            
            // Pequeno delay para o usuário ler a mensagem antes de mudar de página
            setTimeout(() => {
                window.location.href = "mais_informacoes.html"; // Substitua pelo seu link real
            }, 1000);
        }

        // Botão + INFO
        if (target.classList.contains('btn-info')) {
            window.location.href = "mais_informacoes.html";
        }
    });
});