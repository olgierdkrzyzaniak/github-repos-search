import { state } from './state.js';
import { aside, page, main } from './elements.js';
import { compareNumbers } from './utils.js';

const baseEndpoint = 'https://api.github.com';
const usersEnspoint = `${baseEndpoint}/users`;

export async function displayUserInfo(username) {
  const response = await fetch(`${usersEnspoint}/${username}`);
  state.userFound = response.status === 200;
  if (state.userFound) {
    const data = await response.json();
    const html = `<aside class='bio'>
                <a href="${data.html_url}" target="_blank"><img src="${data.avatar_url}" 
                alt="${data.name} avatar"></a>
                <section>
                    <h4>
                        <a href="${data.html_url}" target="_blank">${data.name}</a>
                    </h4>
                    <p>${data.bio}</p>
                    <small>
                        <span>🌍 ${data.location || 'unknown'}</span>
                        <a href="${data.blog}" target="_blank">🔗 ${data.blog || 'no blog'}</a>
                    </small>
                </section>
            </aside>`;
    state.reposNum = data.public_repos;
    aside.innerHTML = html;
  }
}

export async function getReposList(username) {
  state.reposList = [];
  main.innerHTML = '<h4 style="text-align: center;">Loading...<h4>';
  for (let i = 0; i < Math.floor(state.reposNum / 101) + 1; i += 1) {
    const response = await fetch(
      `${usersEnspoint}/${username}/repos?per_page=100&page=${i + 1}`
    );
    const data = await response.json();
    for (const result of data) {
      const push = {
        language: result.language,
        resultName: result.name,
        description: result.description,
        url: result.html_url,
        stars: result.stargazers_count,
      };
      state.reposList.push(push);
    }
  }
  state.reposList.sort(compareNumbers);
}

export function handleError(err) {
  console.log(err);
  aside.innerHTML = `<p> 😔 Something went wrong. Try entering the username again.</p>`;
  page.innerHTML = '';
}
