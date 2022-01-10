import { page, main, log } from './elements.js';
import { state } from './state.js';

export function compareNumbers(a, b) {
  return b.stars - a.stars;
}

export function displayPageNav() {
  if (state.userFound) {
    page.innerHTML = `Repositories: <wbr>${state.firstRepoOnPage} - ${Math.min(
      state.lastRepoOnPage,
      state.reposNum
    )}/${state.reposNum}`;
    log.innerHTML = `<div class='pages'>
        <a href="#" class="prev button">◀ Prev</a>
        <a href="#" class="next button">Next ▶</a>
      </div>`;
  }
}

export function displayRepos(repos, start, stop) {
  displayPageNav();
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
            <p class='description'>${
              element.description || 'no description'
            }</p>
        </article>`
    )
    .join('');
  main.innerHTML = html;
}
