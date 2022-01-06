const baseEndpoint = 'https://api.github.com';
const usersEnspoint = `${baseEndpoint}/users`;

const form = document.querySelector('#form');
const input = document.querySelector('input');
const log = document.querySelector('#log');
const main = document.querySelector('div.main');
const aside = document.querySelector('aside');
const page = document.querySelector('#page');


let reposList = [];
let reposNum = [];
let first;
let last;

function compareNumbers(a, b) {
    return b.stars - a.stars;
}

async function displayUserInfo(username) {
    const response = await fetch(`${usersEnspoint}/${username}`);
    const data = await response.json();
    const html = `<aside class='bio'>
              <a href="${data.html_url}" target="_blank"><img src="${data.avatar_url}" alt="${data.name} avatar"></a>
              <section>
                  <h4>
                    <a href="${data.html_url}" target="_blank">${data.name}</a>
                  </h4>
                  <p>${data.bio}</p>
                  <small>
                      <span>🌍 ${data.location}</span>
                      <a href="${data.blog}" target="_blank">🔗 ${data.blog}</a>
                  </small>
              </section>
          </aside>`;
  reposNum = data.public_repos
  aside.innerHTML = html;
}

async function getReposList(username) {
    reposList = [];
    main.innerHTML = '<h4 style="text-align: center;">Loading...<h4>'
    for(let i = 0; i<Math.floor(reposNum/101) + 1; i++){
        const response = await fetch(`${usersEnspoint}/${username}/repos?per_page=100&page=${i+1}`);
        const data = await response.json();
        for (const result of data) {
            const push = {
                language: result.language,
                resultName: result.name,
                description: result.description,
                url: result.html_url,
                stars: result.stargazers_count,
            };
            reposList.push(push);
        }
    }
    reposList.sort(compareNumbers);
    console.log(reposList)
    
}

//TODO1: alternative for displayed nulls
function displayRepos(start, stop) {
    console.log(start-1, stop)
    main.html
    const html = reposList
      .slice(start-1, stop)
      .map(
        (element) => `<article>
          <header class='result'>
              <h3><a rel="bookmark" href="${element.url}" target="_blank">${element.resultName} </a></h3>
              <small>${element.language} •  ${element.stars}⭐</small>
          </header>
          <p class='description'>${element.description}</p>
      </article>`
      )
      .join('');
    main.innerHTML = html;
  }

function handleError(err) {
    console.log('Error');
    console.log(err);
    aside.textContent = `Something went wrong: ${err}`;
}

async function handleSubmit(event) {
    log.innerHTML = '';
    event.preventDefault();
    first = 1;
    last = 100;
    const username = input.value;
    input.value = '';
    await displayUserInfo(username).catch(handleError);
    page.innerHTML = `Repositories: ${first} - ${last}/${reposNum}`

    await getReposList(username).catch(handleError);

    log.innerHTML = `<div class='pages'>
        <a href="#" class="prev button">◀ Prev</a>
        <a href="#" class="next button">Next ▶</a>
        </div>`
    displayRepos(first, last);
}

function pagesDelegation(event){
    event.preventDefault;
    if(event.target.matches('.next')){
        if(last <= reposNum){
            first += 100;
            last += 100;
            page.innerHTML = `Repositories: ${first} - ${Math.min(last, reposNum)}/${reposNum}`
            displayRepos(first, last);
        }
    }
    if(event.target.matches('.prev')){
        if(first > 1){
            first -= 100;
            last -= 100;
            page.innerHTML = `Repositories: ${first} - ${last}/${reposNum}`
            displayRepos(first, last);
        }
    }
}

form.addEventListener('submit', handleSubmit);
log.addEventListener('click', pagesDelegation);
