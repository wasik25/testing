const loadInitialPlayers = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A")
        .then((res) => res.json())
        .then((data) => {
            displayPlayers(data.player);
        })
        .catch(error => console.error('Error fetching players:', error));
};

const displayPlayers = (players) => {
    const playerCards = document.getElementById("player-cards");
    playerCards.innerHTML = "";  

    players.forEach((player) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "col-md-4");
        cardDiv.innerHTML = `
            <img class="card-img-top" src="${player.strThumb || 'null'}" alt="Player Image">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text"><strong>Nationality:</strong> ${player.strNationality}</p>
                <p class="card-text"><strong>Team:</strong> ${player.strTeam}</p>
                <p class="card-text"><strong>Sport:</strong> ${player.strSport}</p>
                <p class="card-text"><strong>Salary:</strong> $${player.strWage}</p>
                <p class="card-text">${player.strDescriptionEN.split(' ').slice(0, 10).join(' ')}...</p>
                <div class="d-flex justify-content-between">
                    <a href="#" class="btn btn-primary" onclick="showPlayerDetails('${player.idPlayer}')">Details</a>
                    <a href="#" class="btn btn-success" onclick="addToGroup('${player.strPlayer}')">Add to Group</a>
                </div>
            </div>
        `;
        playerCards.appendChild(cardDiv);
    });
};

const searchPlayer = (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=34145937${query}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.player) {
                displayPlayers(data.player);
            } else {
                document.getElementById("player-cards").innerHTML = "<p>No players found.</p>";
            }
        })
        .catch(error => console.error('Error searching for players:', error));
};

const showPlayerDetails = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=34145937${id}`)
        .then((res) => res.json())
        .then((data) => {
            const player = data.players[0];
            document.getElementById("modalPlayerImg").src = player.strThumb;
            document.getElementById("modalPlayerName").innerText = player.strPlayer;
            document.getElementById("modalPlayerNationality").innerText = player.strNationality;
            document.getElementById("modalPlayerTeam").innerText = player.strTeam;
            document.getElementById("modalPlayerSport").innerText = player.strSport;
            document.getElementById("modalPlayerSalary").innerText = `$${player.strWage}`;
            document.getElementById("modalPlayerDescription").innerText = player.strDescriptionEN.split(' ').slice(0, 10).join(' ') + "...";
            
            const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
            playerModal.show();
        })
        .catch(error => console.error('Error fetching player details:', error));
};

let groupCount = 0;
const addToGroup = (playerName) => {
    if (groupCount < 11) {
        groupCount++;
        document.getElementById("player-count").innerText = groupCount;
        const groupList = document.getElementById("group-list");
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerText = playerName;
        groupList.appendChild(listItem);
    } else {
        alert("You cannot add more than 11 players to the group.");
    }
};

loadInitialPlayers();
