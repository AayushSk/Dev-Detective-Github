const url = "https://api.github.com/users/";

const searchBar = document.querySelector("[data-searchBar]");
const searchBtn = document.querySelector("[data-searchBtn]");
const errorTab = document.querySelector(".error-container");

const userInfo = document.querySelector(".information-container");
const userData = document.querySelector(".user-information");

errorTab.style.scale = 0;
errorTab.style.display = "none";

const userName = searchBar.value;

searchBtn.addEventListener('click', () => {
    if (searchBar.value !== "") {
        fetchUserInfo(url + searchBar.value);
        searchBar.value = "";
    }
})

searchBar.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        if(userName === "")
        return;
    else {
            fetchUserInfo(url + searchBar.value);
            searchBar.value = "";
        }
    }
}, false);

async function fetchUserInfo(gitUrl) {
    // try {
        const response = await fetch(gitUrl);
        const data = await response.json();
        console.log(data);
        if(!data){
            throw data;
        }
        renderUserInfo(data);
        // }
        
        // catch (err) {
            //     console.log('Wrong username',err);
    //     alert('Wrong username',err);
    // }
}


function renderUserInfo(result) {
    errorTab.style.scale = 0;
    errorTab.style.display = "none";
    userInfo.style.display = "grid";

    if(result.message !== "Not Found"){
        function checkNull(apiItem, domItem){
            if(apiItem === "" || apiItem === null){
                domItem.style.opacity = 0.5;
                domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else {
                return true;
            }
        }
        
    let dateSegment;
    const name = document.querySelector("[data-name]");
    const DOJ = document.querySelector("[data-DOJ]");
    const userImage = document.querySelector("[data-userImage]");
    const userLink = document.querySelector("[data-userLink]");
    const userExp = document.querySelector("[data-userExp]");
    const noOfRepos = document.querySelector("[data-noOfRepos]");
    const noOfFollowers = document.querySelector("[data-noOfFollowers]");
    const noOfFollowing = document.querySelector("[data-noOfFollowing]");
    const userLocation = document.querySelector("[data-userLocation]");
    const userGithubID = document.querySelector("[data-userGithubID]");
    const userTwitterID = document.querySelector("[data-userTwitterID]");
    const userCompanyName = document.querySelector("[data-userCompanyName]");
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    name.innerText = result?.name;
    userImage.src = `${result.avatar_url}`;
    userLink.innerText = `@${result?.login}`;
    userLink.href = result?.html_url;
    dateSegment=result?.created_at.split('T').shift().split('-');
    DOJ.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;
    console.log(DOJ.innerText);
    userExp.innerText = (result?.bio === null) ? "This Profile has no Bio" : result?.bio;;
    noOfRepos.innerText = result?.public_repos;
    noOfRepos.href = result?.repos_url;
    noOfFollowers.innerText = result?.followers;
    noOfFollowers.href = result?.followers_url;
    noOfFollowing.innerText = result?.following;
    noOfFollowing.href = result?.following_url;
    
    userLocation.innerText = checkNull(result?.location, userLocation) ? result?.location : "Not Available";

    userGithubID.innerText = checkNull(result?.blog, userGithubID) ? result?.blog : "Not Available";
    
    userGithubID.href = checkNull(result?.blog, userGithubID) ? result?.blog : "#";
    
    userTwitterID.innerText = checkNull(result?.twitter_username, userTwitterID) ? result?.twitter_username : "Not Available";
    
    userTwitterID.href = checkNull(result?.twitter_username, userTwitterID) ? `https://twitter.com/${result?.twitter_username}` : "#";

    userCompanyName.innerText = checkNull(result?.company, userCompanyName) ? result?.company : "Not Available";
}
    else {
        errorTab.style.scale = 1;
        errorTab.style.display = "block";
        userInfo.style.display = "none";
    }
}

const themeMode = document.querySelector("[data-themeMode]");
const themeIcon = document.querySelector("[data-themeIcon]");
const themeBtn = document.querySelector(".themeBtn");

let darkMode = false;
const root =  document.documentElement.style;

themeBtn.addEventListener("click", () => {
    if(darkMode === false) {
        enableDarkMode();
    }
    else {
        enableLightMode();
    }
});

function enableDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    themeMode.innerText = "LIGHT";
    themeIcon.src = "Images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function enableLightMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    themeMode.innerText = "DARK";
    themeIcon.src = "Images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

// This code checks if the user's device has a preference for dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        enableDarkMode();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        enableLightMode();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        enableDarkMode();
    } else {
        // If the value is not "true", apply light mode properties
        enableLightMode();
    }
}

fetchUserInfo(url + "AayushSk");