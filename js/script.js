// My profile info will appear here
const overview = document.querySelector(".overview");

const username = "ClariceR";

const getGithubProfile = async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    // console.log(profile);
    displayProfileInfo(profile);
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

getGithubProfile();