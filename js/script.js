// My profile info appears here
const overview = document.querySelector(".overview");

// Section where all repos information appear
const allRepos = document.querySelector(".repos");

// The repos list appear here
const reposList = document.querySelector(".repo-list");

// Section where individual repo data appears
const repoData = document.querySelector(".repo-data");

// Button that will show on the repo info section
const backBtn = document.querySelector(".view-repos")

// Input for search
const filterInput = document.querySelector(".filter-repos");

const username = "ClariceR";

// Profile info
const getGithubProfile = async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
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
    displayRepos(repos);
}

const displayRepos = repos => {
    filterInput.classList.remove("hide");
    filterInput.value = "";
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
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    let languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    displayRepoInfo(repoInfo, languages);
}

const displayRepoInfo = (repoInfo, languages) => {
    repoData.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View repo on GitHub</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    backBtn.classList.remove("hide");
}

backBtn.addEventListener("click", () => {
    allRepos.classList.remove("hide");
    repoData.classList.add("hide");
    backBtn.classList.add("hide"); 
})

filterInput.addEventListener("input", e => {
    let valueText = e.target.value;
    let repos = document.querySelectorAll(".repo");
    for (let repo of repos) {
        let lower = repo.innerText.toLowerCase();
        if (lower.includes(valueText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
})

getGithubProfile();
