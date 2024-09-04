// Load default players initially
const loadDefaultPlayers = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A")
      .then((res) => res.json())
      .then((data) => displayPlayers(data.player));
  };
  
  // Display player cards
  const displayPlayers = (players) => {
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = "";
  
    players.slice(0, 10).forEach((player) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-img" src="${player.strThumb}" alt="${player.strPlayer}">
        <h5>${player.strPlayer}</h5>
        <p>Nationality: ${player.strNationality}</p>
        <p>Team: ${player.strTeam}</p>
        <p>Sport: ${player.strSport}</p>
        <p>Salary: ${player.strWage}</p>
        <p>Description: ${player.strDescriptionEN.slice(0, 10)}</p>
        <button class="btn btn-primary" onclick="showPlayerDetails(${player.idPlayer})">Details</button>
        <button class="btn btn-success" onclick="addToGroup('${player.strPlayer}')">Add to group</button>
      `;
      playerContainer.appendChild(card);
    });
  };
  
  // Search players
  const searchPlayers = (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.player) {
          displayPlayers(data.player);
        } else {
          document.getElementById("player-container").innerHTML = "<p>No players found.</p>";
        }
      });
  };
  
  // Add to group functionality
  let playerCount = 0;
  const addToGroup = (playerName) => {
    if (playerCount >= 11) {
      alert("You can't select more than 11 players.");
      return;
    }
  
    const cartContainer = document.getElementById("cart-main-container");
    const playerDiv = document.createElement("div");
    playerDiv.innerHTML = `<p>${playerName}</p>`;
    cartContainer.appendChild(playerDiv);
  
    playerCount += 1;
    document.getElementById("count").innerText = playerCount;
  };
  
  // Show player details in modal
  const showPlayerDetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        const player = data.players[0];
        document.getElementById("modalPlayerImg").src = player.strThumb;
        document.getElementById("modalPlayerName").innerText = player.strPlayer;
        document.getElementById("modalPlayerNationality").innerText = player.strNationality;
        document.getElementById("modalPlayerTeam").innerText = player.strTeam;
        document.getElementById("modalPlayerSport").innerText = player.strSport;
        document.getElementById("modalPlayerSalary").innerText = player.strWage;
        document.getElementById("modalPlayerDescription").innerText = player.strDescriptionEN.slice(0, 100);
        document.getElementById("modalPlayerSocial").innerHTML = `
          <a href="https://${player.strFacebook}">Facebook</a>
          <a href="https://${player.strTwitter}">Twitter</a>
        `;
        const modal = new bootstrap.Modal(document.getElementById("playerModal"));
        modal.show();
      });
  };
  
  // Load initial players when the page loads
  loadDefaultPlayers();