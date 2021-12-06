var value = "";

function listeners() {
    $("#btnPesquisa").click(function() {
        value = $("#pesquisa").val().toLowerCase();
        if (value != "") {
            console.log(value);
            value.replace(" ", "+");
            let dataFols = new XMLHttpRequest();
            dataFols.open('GET', `https://api.github.com/search/repositories?q="${value}"`);
            dataFols.onload = exibePesquisa;
            dataFols.send();
        } else {
            let div = document.getElementById('git-pesquisa');
            let texto = `<div class="col-sm-12">
            <h3>Realize pesquisas para ver os resultados!</h3>
            </div>`;
            div.innerHTML = texto;
        }
    });
}

function exibePesquisa() {
    let dados = JSON.parse(this.responseText);
    let div = document.getElementById('git-pesquisa');
    let texto = "";
    let count = Object.keys(dados.items).length;
    console.log(count);
    if (count == 0) {
        texto = `<h3>Sem nenhum resultado para sua busca!</h3>
        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_e12qdphg.json" background="transparent" speed="1" style="width: 100%; height: 300px;" loop autoplay></lottie-player>`;
        div.innerHTML = texto;
    } else {
        if (count >= 3) {
            for (var i = 0; i < 3; i++) {
                let rep = dados.items[i];
                let data = new Date(rep.created_at);
                texto += `<div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                <img src="${rep.owner.avatar_url}" class="card-img-top">
                    <h5 class="card-title">Repositório: ${rep.name}</h5>
                    <p class="card-text">Descrição: ${rep.description}</p>
                    <p class="card-text">Linguagem: ${rep.language}</p>
                    <p class="card-text">Data de criação: ${data.toLocaleDateString()}</p>
                    <a href="${rep.html_url}" target"_blank" class="btn btn-primary">Acessar</a>
                </div>
            </div>
        </div>`;
            }
        } else if (count == 2) {
            for (var i = 0; i < 2; i++) {
                let rep = dados.items[i];
                let data = new Date(rep.created_at);
                texto += `<div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                <img src="${rep.owner.avatar_url}" class="card-img-top">
                    <h5 class="card-title">Repositório: ${rep.name}</h5>
                    <p class="card-text">Descrição: ${rep.description}</p>
                    <p class="card-text">Linguagem: ${rep.language}</p>
                    <p class="card-text">Data de criação: ${data.toLocaleDateString()}</p>
                    <a href="${rep.html_url}" target"_blank" class="btn btn-primary">Acessar</a>
                </div>
            </div>
        </div>`;
            }
        } else if (count == 1) {
            for (var i = 0; i < 1; i++) {
                let rep = dados.items[i];
                if (rep.name != null) {
                    let data = new Date(rep.created_at);
                    texto += `<div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                <img src="${rep.owner.avatar_url}" class="card-img-top">
                    <h5 class="card-title">Repositório: ${rep.name}</h5>
                    <p class="card-text">Descrição: ${rep.description}</p>
                    <p class="card-text">Linguagem: ${rep.language}</p>
                    <p class="card-text">Data de criação: ${data.toLocaleDateString()}</p>
                    <a href="${rep.html_url}" target"_blank" class="btn btn-primary">Acessar</a>
                </div>
            </div>
        </div>`;
                } else {
                    texto = `<h3>Sem nenhum resultado para sua busca!</h3>
                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_e12qdphg.json" background="transparent" speed="1" style="width: 100%; height: 300px;" loop autoplay></lottie-player>`
                }
            }
        }
        texto += ` <div class="col-sm-12 justify-content-center text-center" style="margin-top: 10px;">
        <p>Veja mais desses repositórios no <a href="https://github.com/search/?q=${value}" target = "_blank" class="btn btn-outline-dark">GitHub!</a></p>
    </div>`;
        div.innerHTML = texto;
    }
}