const baseEndpoint = 'https://api.github.com';
const usersEnspoint = `${baseEndpoint}/users`;

const form = document.querySelector('#form');
const input = document.querySelector('input');
const log = document.querySelector('#log');
const main = document.querySelector('div.main');
const aside = document.querySelector('aside');


let reposList = []

function compareNumbers(a, b) {
    return b.stars - a.stars;
}

async function displayUserInfo(username) {
    const response = await fetch(`${usersEnspoint}/${username}`);
    const data = await response.json();
    console.log(data);
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
  log.innerHTML = `Repositories - ${data.public_repos}`;
  aside.innerHTML = html;
}

async function getReposList(username) {
    reposList = [];
    const response = await fetch(`${usersEnspoint}/${username}/repos`);
    const data = await response.json();
    console.log(data);
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
    reposList.sort(compareNumbers);
}

//TODO1: alternative for displayed nulls
//TODO3: add loading spinner
function displayRepos() {
    main.innerHTML = '';
    const html = reposList
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
    event.preventDefault();

    const username = input.value;
    input.value = '';
    await displayUserInfo(username).catch(handleError);
    await getReposList(username).catch(handleError);
    displayRepos(username);
}

form.addEventListener('submit', handleSubmit);