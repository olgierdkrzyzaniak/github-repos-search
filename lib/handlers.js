import { state } from './state.js';
import { getReposList, displayUserInfo, handleError} from './index.js';
import { displayRepos } from './utils.js';
import { input,log } from './elements.js';

export async function handleSubmit(event) {
  log.innerHTML = '';
  event.preventDefault();
  state.firstRepoOnPage = 1;
  state.lastRepoOnPage = 100;
  const username = input.value;
  input.value = '';
  await displayUserInfo(username).catch(handleError);
  await getReposList(username).catch(handleError);
  displayRepos(state.firstRepoOnPage, state.lastRepoOnPage);
}

export function pagesDelegation(event) {
  event.preventDefault;
  if (event.target.matches('.next')) {
    if (state.lastRepoOnPage <= state.reposNum) {
      state.firstRepoOnPage += 100;
      state.lastRepoOnPage += 100;
      displayRepos(state.firstRepoOnPage, state.lastRepoOnPage);
    }
  }
  if (event.target.matches('.prev')) {
    if (state.firstRepoOnPage > 1) {
      state.firstRepoOnPage -= 100;
      state.lastRepoOnPage -= 100;
      displayRepos(state.firstRepoOnPage, state.lastRepoOnPage);
    }
  }
}
