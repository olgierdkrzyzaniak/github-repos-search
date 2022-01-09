const baseEndpoint = 'https://api.github.com';
const usersEnspoint = `${baseEndpoint}/users`;

const form = document.querySelector('#form');
const input = document.querySelector('input');
const log = document.querySelector('#log');
const main = document.querySelector('div.main');
const aside = document.querySelector('aside');
const page = document.querySelector('#page');

let reposNum;
let firstRepoOnPage;
let lastRepoOnPage;
let userFound = false;
let reposList = [];

function compareNumbers(a, b) {
  return b.stars - a.stars;
}

async function displayUserInfo(username) {
  const response = await fetch(`${usersEnspoint}/${username}`);
  userFound = response.status === 200;
  if (userFound) {
    const data = await response.json();
    const html = `<aside class='bio'>
                <a href="${data.html_url}" target="_blank"><img src="${
      data.avatar_url
    }" 
                alt="${data.name} avatar"></a>
                <section>
                    <h4>
                        <a href="${data.html_url}" target="_blank">${
      data.name
    }</a>
                    </h4>
                    <p>${data.bio}</p>
                    <small>
                        <span>🌍 ${data.location || 'unknown'}</span>
                        <a href="${data.blog}" target="_blank">🔗 ${
      data.blog || 'no blog'
    }</a>
                    </small>
                </section>
            </aside>`;
    reposNum = data.public_repos;
    aside.innerHTML = html;
  }
}

function makeUrlList(username) {
  const urls = [];
  for (let i = 0; i < Math.floor(reposNum / 101) + 1; i += 1) {
    urls.push(`${usersEnspoint}/${username}/repos?per_page=100&page=${i + 1}`);
  }
  return urls;
}

async function fetchRepos(urls) {
  try {
    const data = await Promise.all(
      urls.map((url) =>
        fetch(url).then((response) => response.json())
      )
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function makeRepoList(data) {
  const results = await data;
  const repos = [];
  for (const result of results.flat()) {
    const push = {
      language: result.language,
      resultName: result.name,
      description: result.description,
      url: result.html_url,
      stars: result.stargazers_count,
    };
    repos.push(push);
  }
  repos.sort(compareNumbers);
  return repos;
}

function displayPageNav() {
  if (userFound) {
    page.innerHTML = `Repositories: <wbr>${firstRepoOnPage} - ${Math.min(
      lastRepoOnPage,
      reposNum
    )}/${reposNum}`;
    log.innerHTML = `<div class='pages'>
      <a href="#" class="prev button">◀ Prev</a>
      <a href="#" class="next button">Next ▶</a>
      </div>`;
  }
}

function displayRepos(repos, start, stop) {
  const html = repos
    .slice(start - 1, stop)
    .map(
      (element) => `<article>
          <header class='result'>
              <h3><a rel="bookmark" href="${element.url}" target="_blank">${
        element.resultName
      } </a></h3>
              <small>${element.language || 'unknown'} •  ${
        element.stars
      }⭐</small>
          </header>
          <p class='description'>${element.description || 'no description'}</p>
      </article>`
    )
    .join('');
  main.innerHTML = html;
}

function handleError(err) {
  console.log(err);
  aside.innerHTML = `<p> 😔 Something went wrong. Try entering the username again.
  </p>`;
  page.innerHTML = '';
}

async function handleSubmit(event) {
  main.innerHTML = '<h4 style="text-align: center;">Loading...<h4>';
  log.innerHTML = '';
  event.preventDefault();
  firstRepoOnPage = 1;
  lastRepoOnPage = 100;
  const username = input.value;
  input.value = '';
  await displayUserInfo(username).catch(handleError);
  displayPageNav();
  const urls = makeUrlList(username);
  const fetchedData = fetchRepos(urls);
  reposList = await makeRepoList(fetchedData);
  displayRepos(reposList, firstRepoOnPage, lastRepoOnPage);
}

function pagesDelegation(event) {
  event.preventDefault;
  if (event.target.matches('.next')) {
    if (lastRepoOnPage <= reposNum) {
      firstRepoOnPage += 100;
      lastRepoOnPage += 100;
      displayPageNav();
      displayRepos(reposList, firstRepoOnPage, lastRepoOnPage);
    }
  }
  if (event.target.matches('.prev')) {
    if (firstRepoOnPage > 1) {
      firstRepoOnPage -= 100;
      lastRepoOnPage -= 100;
      displayPageNav();
      displayRepos(reposList, firstRepoOnPage, lastRepoOnPage);
    }
  }
}

form.addEventListener('submit', handleSubmit);
log.addEventListener('click', pagesDelegation);