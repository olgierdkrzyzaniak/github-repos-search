import { state } from './state.js';
import {
  makeRepoList,
  makeUrlList,
  fetchRepos,
  displayUserInfo,
  handleError,
} from './index.js';
import { displayRepos, displayPageNav } from './utils.js';
import { input, log, main } from './elements.js';

export async function handleSubmit(event) {
  main.innerHTML = '<h4 style="text-align: center;">Loading...<h4>';
  log.innerHTML = '';
  event.preventDefault();
  state.firstRepoOnPage = 1;
  state.lastRepoOnPage = 100;
  const username = input.value;
  input.value = '';
  await displayUserInfo(username).catch(handleError);
  const urls = makeUrlList(username);
  const fetchedData = fetchRepos(urls);
  state.reposList = await makeRepoList(fetchedData);
  displayRepos(state.reposList, state.firstRepoOnPage, state.lastRepoOnPage);
}

export function pagesDelegation(event) {
  event.preventDefault;
  if (event.target.matches('.next')) {
    if (state.lastRepoOnPage <= state.reposNum) {
      state.firstRepoOnPage += 100;
      state.lastRepoOnPage += 100;
      displayRepos(
        state.reposList,
        state.firstRepoOnPage,
        state.lastRepoOnPage
      );
    }
  }
  if (event.target.matches('.prev')) {
    if (state.firstRepoOnPage > 1) {
      state.firstRepoOnPage -= 100;
      state.lastRepoOnPage -= 100;
      displayRepos(
        state.reposList,
        state.firstRepoOnPage,
        state.lastRepoOnPage
      );
    }
  }
}
