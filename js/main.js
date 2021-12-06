const USER = 'leon-junio'

let folw = 0;
let fols = 0;
let reps = 0;

function init() {
    let dataFols = new XMLHttpRequest();
    dataFols.open('GET', `https://api.github.com/users/${USER}/followers`);
    dataFols.onload = exibeFols;
    dataFols.send();
    let dataFolw = new XMLHttpRequest();
    dataFolw.open('GET', `https://api.github.com/users/${USER}/following`);
    dataFolw.onload = exibeFolw;
    dataFolw.send();
    let repos = new XMLHttpRequest();
    repos.onload = exibeRepos;
    repos.open('GET', `https://api.github.com/users/${USER}/repos`);
    repos.send();
    let perfil = new XMLHttpRequest();
    perfil.onload = exibePerfil;
    perfil.open('GET', `https://api.github.com/users/${USER}`);
    perfil.send();
    listeners();
}

function exibePerfil() {
    let dados = JSON.parse(this.responseText);
    let divImg = document.getElementById('img-git');
    let texto = "";
    texto = `<h1>GitHub Perfil</h1>
    <img src="${dados.avatar_url}" style="background-color: rgb(255, 255, 255); width: 70%;height: auto;border:1px solid rgba(201, 196, 196, 0.685);border-radius: 70%;" alt="git-pic">`
    divImg.innerHTML = texto;
    let divDados = document.getElementById('dados-git');
    texto = `<article class="dados">
    <h3>${dados.name}</h3>
    <p>${dados.login}: ${dados.bio}</p>
    <p><i class="fas fa-users"></i> Seguidores: ${fols}</p>
    <p><i class="fas fa-user-plus"></i> Seguindo: ${folw}</p>
    <p id="repos-git"><i class="fas fa-folder"></i> Repositórios: ${reps}</p>
    <p><i class="fas fa-building"></i> Empresa: ${dados.company}</p>
    <p><i class="fas fa-globe"></i></i> Site: <a href="http:/${dados.blog}" target"_blank">${dados.blog}</a></p>
</article>`;
    divDados.innerHTML = texto;
}

function exibeRepos() {
    let dadosr = JSON.parse(this.responseText);
    reps = Object.keys(dadosr).length;
    let divRepos = document.getElementById('folders-git');
    let divP = document.getElementById('repos-git');
    let texto = "";
    for (var i = 0; i < 3; i++) {
        let rep = dadosr[i];
        let data = new Date(rep.created_at);
        texto += `<div class="col-sm-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Repositório: ${rep.name}</h5>
                <p class="card-text">Descrição: ${rep.description}</p>
                <p class="card-text">Linguagem: ${rep.language}</p>
                <p class="card-text">Data de criação: ${data.toLocaleDateString()}</p>
                <a href="${rep.html_url}" target="_blank" class="btn btn-primary">Acessar</a>
            </div>
        </div>
    </div>`;
    }
    texto += `<div class="col-sm-12 justify-content-center text-center" style="margin-top: 10px;">
    <p>Acesse o meu perfil do GitHub e <a href="${dadosr[0].owner.html_url}" target="_blank" class="btn btn-outline-dark">veja mais!</a></p>
    </div>`;
    divRepos.innerHTML = texto;
    texto = `<i class="fas fa-folder"></i> Repositórios: ${reps}`;
    divP.innerHTML = texto;
}

function exibeFols() {
    let dadosFls = JSON.parse(this.responseText);
    fols = Object.keys(dadosFls).length;
}

function exibeFolw() {
    let dadosFlw = JSON.parse(this.responseText);
    folw = Object.keys(dadosFlw).length;
}