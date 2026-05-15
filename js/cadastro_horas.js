const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", function () {

    // Valores dos filtros
    const cursoSelecionado = document.getElementById("courseSelect").value;
    const projetoSelecionado = document.getElementById("projectSelect").value;

    // Pega todas as linhas da tabela
    const linhas = document.querySelectorAll("#projectsTable tbody tr");

    linhas.forEach(function (linha) {

        // Pega os textos das colunas
        const curso = linha.cells[0].textContent;
        const projeto = linha.cells[1].textContent;

        // Verifica se bate com os filtros
        const cursoOk =
        cursoSelecionado === "" ||
        curso.includes(cursoSelecionado);

    const projetoOk =
        projetoSelecionado === "" ||
        projeto.includes(projetoSelecionado);

        // Mostra ou esconde
        if (cursoOk && projetoOk) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
});