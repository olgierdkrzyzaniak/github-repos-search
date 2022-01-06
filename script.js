const baseEndpoint = 'https://api.github.com';
const usersEnspoint = `${baseEndpoint}/users`;

const form = document.querySelector('#form');
const input = document.querySelector('input');
const log = document.querySelector('#log');
const main = document.querySelector('div.main');

let reposList = []

function compareNumbers(a, b) {
    return b.stars - a.stars;
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
    console.log(reposList)
}

function handleError(err) {
    console.log('Error');
    console.log(err);
    aside.textContent = `Something went wrong: ${err}`;
}

async function logSubmit(event) {
    event.preventDefault();

    const username = input.value;
    input.value = '';
    await getReposList(username).catch(handleError);
}

form.addEventListener('submit', logSubmit);