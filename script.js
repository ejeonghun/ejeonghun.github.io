function init(){

    //estrelas
  
    var style = ["style1", "style2", "style3", "style4"];
    var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    var estrela = "";
    var qtdeEstrelas = 250;
    var noite = document.querySelector(".constelacao");
    var widthWindow = window.innerWidth;
    var heightWindow = window.innerHeight;
  
    for (var i = 0; i < qtdeEstrelas; i++) {
      estrela += "<span class='estrela " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
      + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
      + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
    }
  
    noite.innerHTML = estrela;
  
    //meteoros
  
    var numeroAleatorio = 5000;
  
    setTimeout(function(){
      carregarMeteoro();
    }, numeroAleatorio);
  
    function carregarMeteoro(){
      setTimeout(carregarMeteoro, numeroAleatorio);
      numeroAleatorio = getRandomArbitrary(5000, 10000);
      var meteoro = "<div class='meteoro "+ style[getRandomArbitrary(0, 4)] +"'></div>";
      document.getElementsByClassName('chuvaMeteoro')[0].innerHTML = meteoro;
      setTimeout(function(){
        document.getElementsByClassName('chuvaMeteoro')[0].innerHTML = "";
      }, 1000);
    }
  
  }


  
  window.onload = init;


  const content = "luna(ejeonghun)";
  const text = document.getElementById("text");
  let i = 0;
  
  function typing(){
      if (i < content.length) {
      let txt = content.charAt(i);
      text.innerText += txt;
      i++;
      }
  }
  setInterval(typing, 150)

  const main_content = document.getElementById("container");
  function show() {
    main_content.style.opacity = 1;  
  }
setInterval(show, 2600);

const content_2 = document.getElementById("container_2");
const content_3 = document.getElementById("container_3");
function show_2() {
  content_2.style.opacity = 1;
  content_3.style.opacity = 1;  
}
setInterval(show_2, 3000);

const username = 'ejeonghun';
function getGithubRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching repos:', error);
    });
}

function getReadmeContent(repo) {
  return fetch(`https://api.github.com/repos/${username}/${repo}/readme`)
    .then(response => response.json())
    .then(readme => {
      return Base64.decode(readme.content);
    })
    .catch(error => {
      console.error('Error fetching README:', error);
    });
}

function displayRepos(repos) {
  const repoList = document.getElementById('github_repo');
  repos.forEach(repo => {
    const repoTitle = document.createElement('h4');
    const link = document.createElement('a');
    repoTitle.className = 'github_list';
    
    link.setAttribute('href', '#');
    link.innerHTML = `${repo.name}`;
    link.onclick = function (e) {
      e.preventDefault();
      getReadmeContent(repo.name).then(readme => {
        showModal(readme);
      });
    };

    repoTitle.appendChild(link);
    repoList.appendChild(repoTitle);
    
  });
}

function showModal(readme) {
  const modal = document.getElementById('myModal');
  const readmeContent = document.getElementById('readme-content');
  const close = document.getElementsByClassName('close')[0];

  readmeContent.innerHTML = marked(readme);
  modal.style.display = 'block';

  close.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

getGithubRepos(username).then(repos => {
  displayRepos(repos);
});