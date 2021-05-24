// My profile info appears here
const overview = document.querySelector(".overview");

// Section where all repos information appear
const allRepos = document.querySelector(".repos");

// The repos list appear here
const reposList = document.querySelector(".repo-list");

// Section where individual repo data appears
const repoData = document.querySelector(".repo-data");

const username = "ClariceR";

// Profile info
const getGithubProfile = async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    console.log(profile);
    displayProfileInfo(profile);
    getRepos();
}

const displayProfileInfo = profile => {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
    <figure>
        <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div> `;
    overview.append(userInfoDiv);
}

// Get and display Repos
const getRepos = async () => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await response.json();
    // console.log(repos);
    displayRepos(repos);
}

const displayRepos = repos => {
    for (let repo of repos) {
        let repoLi = document.createElement('li');
        repoLi.classList.add("repo");
        repoLi.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoLi);
    }
}

// Get the name of the repo that was clicked on
reposList.addEventListener("click", e => {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
})

// Get specific repo info
const getRepoInfo = async repoName => {
    const response = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    let languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    console.log(languages);
}

getGithubProfile();
