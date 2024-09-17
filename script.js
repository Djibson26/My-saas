let allProfiles = []; // Stores all loaded profiles for filter

// Load niche JSON data
function loadNiche(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            allProfiles = data;
            displayProfiles(data);
        });
}

// Display profiles on the page
function displayProfiles(profiles) {
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = ''; // Clear previous content

    profiles.forEach(profile => {
        const card = document.createElement('div');
        card.classList.add('profile-card');

        card.innerHTML = `
            <div class="profile-details">
                <img src="${profile.image}" alt="${profile.name}">
                <div>
                    <div class="channel-name">${profile.name}</div>
                    <div class="subscriber-count">${profile.subscribers} Subscribers</div>
                    <a href="${profile.link}" class="channel-link" target="_blank">Visit Channel</a>
                </div>
            </div>
        `;
        profileContainer.appendChild(card);
    });
}

// Filter profiles by subscriber count
function filterBySubscribers() {
    // Get value from both desktop and mobile range inputs
    const desktopSubscriberValue = parseInt(document.getElementById('subscriberRange').value);
    const mobileSubscriberValue = parseInt(document.getElementById('mobileSubscriberRange').value);
    
    // Use the larger of the two values, ensuring both sliders work
    const subscriberValue = Math.max(desktopSubscriberValue, mobileSubscriberValue);
    
    const filteredProfiles = allProfiles.filter(profile => 
        profile.subscribers >= subscriberValue
    );
    displayProfiles(filteredProfiles);
}

// Update range label for subscriber count
function updateRangeLabel(value) {
    document.getElementById('rangeLabel').textContent = value;
    document.getElementById('mobileRangeLabel').textContent = value;
}

// Highlight the selected niche
function highlightNiche(selectedNiche) {
    const links = document.querySelectorAll('.toolbar ul li a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.innerHTML.toLowerCase().includes(selectedNiche)) {
            link.classList.add('active');
        }
    });
}
