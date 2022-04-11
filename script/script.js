function checkEnter(key) {
    const input = document.getElementById("invoer").value;

    if (key === "Enter" && input != "") {
        listGames(input);
    }
}

async function fetchGames(zoekterm) {

    const response = await fetch("https://api.boardgameatlas.com/api/search?name="+zoekterm+"&client_id=JLBr5npPhV");
    const result = await response.json();
    console.log(result);

    const mappedData = result.games.map((item) => {
        return {
            id: item.id,
            name: item.name,
            image: item.thumb_url,
			publisher: item.publisher,
        };
    });
    return mappedData;
}

async function listGames(zoekOpdracht) {
    const games = await fetchGames(zoekOpdracht);

    if (window.location.href.indexOf("index.html") == -1) {
        document.querySelector("main").innerHTML = '<div id="data-container" class="wrapper"><!----></div>';
    }

    const container = document.getElementById("data-container");
    while (container.firstChild)
        container.removeChild(container.lastChild);
    const unorderedListEl = document.createElement("ul");
    unorderedListEl.classList.add("innerWrapper","vijf");

    games.forEach((game) => {
		let publisher = false;
		if(game.publisher != null) {
			publisher = true;
		}
        unorderedListEl.innerHTML += `
			<li class="list__item">
				<a class="overlay" href="game.html?id=${game.id}"></a>
				<h3>${game.name}</h3>
				${publisher ? "<p>" + game.publisher + "</p>" : ""}				
				<img src="${game.image}"/>
			</li>
        `;
    });

    container.appendChild(unorderedListEl);
}

