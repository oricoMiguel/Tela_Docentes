fetch("../componentes/sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("sidebar-container").innerHTML = data;

        ativarLinkAtual();
    });

function ativarLinkAtual() {

    const links = document.querySelectorAll(".menu a");

    links.forEach(link => {

        if(link.href === window.location.href) {
            link.classList.add("active");
        }

    });
}