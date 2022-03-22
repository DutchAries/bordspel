window.addEventListener('DOMContentLoaded', () => {    
	const invoer = document.getElementById("invoer");
	invoer.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		 event.preventDefault();
		 run();
		}
	  });
});

async function fetchGames() {
    const input = document.getElementById("invoer").value;

    const response = await fetch("https://api.boardgameatlas.com/api/search?name="+input+"&client_id=JLBr5npPhV");
    const result = await response.json();
    console.log(result);

    const mappedData = result.games.map((item) => {
        return {
            name: item.name,
            image: item.thumb_url,
			publisher: item.publisher,
        };
    });
    //console.log(mappedData);
    return mappedData;
}

async function run() {
    const games = await fetchGames();

    const container = document.getElementById("data-container");
    while (container.firstChild)
        container.removeChild(container.lastChild);
    const unorderedListEl = document.createElement("ul");
    unorderedListEl.classList.add("list","row");

    games.forEach((game) => {
		let publisher = false;
		if(game.publisher != null) {
			publisher = true;
		}
        unorderedListEl.innerHTML += `
			<li class="list__item">
				<a class="overlay" href="game.html?name=${game.name}"></a>
				<h3>${game.name}</h3>
				${publisher ? "<p>" + game.publisher + "</p>" : ""}				
				<img src="${game.image}"/>
			</li>
        `;
    });

    container.appendChild(unorderedListEl);
}