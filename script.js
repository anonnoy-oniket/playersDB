const searchResult = (e) => {
    document.getElementById("card-container").innerHTML = "";
    const name = document.getElementById("search").value;
    console.log(name);
    document.getElementById("search").value = "";
    fetch(`https://www.thesportsdb.com//api/v1/json/3/searchplayers.php?p=${name}`)
        .then((res) => res.json())
        .then((data) => {
            const players = data.player;
            console.log(players);
            console.log(data)
            if (players == null) {
                const h1 = document.createElement("h1");
                h1.innerText = "NOTHING FOUND :'(";
                document.getElementById("card-container").appendChild(h1);
                return;
            }
            players.forEach(player => {
                let desc = player.strDescriptionEN;
                if (desc == null) {
                    desc = "A talented player with exceptional skills, speed, and game intelligence.";
                }
                if (player.strThumb != null || player.strThumb == "") {
                    createCard(player.idPlayer, player.strPlayer, player.strThumb, player.strPosition, player.strNationality, player.strSport, player.strTeam, getFirstTenWords(desc), player.strGender, player.strFacebook, player.strTwitter);
                    console.log(player.strPosition);
                    console.log(player.strFacebook);
                }
                // console.log(player.strPlayer);
            });
            // console.log(data);
        })
        .catch(err => {
            const p = document.createElement("h1");
            p.innerText = "THERE IS A TECHNICAL ISSUE :'(";
            document.getElementById("card-container").appendChild(p);
            console.log(err);
        })
}

const createCard = (id, name, image, position, nation, sport, team, desc, gender, fb, x) => {
    const cardsContainer = document.getElementById("card-container");
    const div = document.createElement("div");
    div.className = "col-4 mb-4";
    div.innerHTML = `
        <div class="card" style="width: 16rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${position}</p>
                <div class = "container d-flex">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${id}">
                    Details
                    </button>
                    <button type="button" class="btn btn-primary ms-3" onclick="addToCart('${id}', '${name}', '${image}', '${position}', '${nation}', '${sport}', '${team}', '${desc}', '${gender}', '${fb}', '${x}')">Add <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
        </div>    

    <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="${id}Label">${name}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class = "card" style="width: 50%; margin-left: 25%;">
                        <img src="${image}" class="card-img-top" alt="...">
                    </div>
                    <h4>Nation: ${nation} </h4>
                    <h4>Sport: ${sport} </h4>
                    <h4>Position: ${position} </h4>
                    <h4>Team: ${team} </h4>
                    <h4>Gender: ${gender} </h4>
                    <p>${desc}</p>
                    <div class="container d-flex">
                        <h4><a href="https://${fb}" target="_blank"><i class="fa-brands fa-facebook"></i></a></h4>
                        <h4 class="mx-3"><a href="https://${x}" target = "_blank"><i class="fa-brands fa-x-twitter"></i></a> </h4>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="addToCart('${id}', '${name}', '${image}', '${position}', '${nation}', '${sport}', '${team}', '${desc}', '${gender}', '${fb}', '${x}')">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    cardsContainer.appendChild(div);
    console.log(cardsContainer);

}

const getFirstTenWords = (inputString) => {
    const words = inputString.split(/\s+/);
    const firstTenWords = words.slice(0, 10);
    return firstTenWords.join(" ");
};

let count = 0;
const addToCart = (id, name, image, position, nation, sport, team, desc, gender, fb, x) => {

    const cart = document.getElementById("cart");
    const cnt = document.getElementById("count");

    if (count == 11) {
        console.log("reached");
        const limitModal = new bootstrap.Modal(document.getElementById('limitModal'));
        limitModal.show();
        return;
    }


    cnt.innerText = "";
    count++;
    cnt.innerText = count;

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-100">
            <div class="card-body container d-flex">
                <h6 class="">${name}</h6>
                <button class="mx-3 cart-btn" data-bs-toggle="modal" data-bs-target="#${id}"><i class="fa-solid fa-circle-info"></i></button>
                <button class="cart-btn" onclick="removeFromCart(event)"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>

        <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="${id}Label">${name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class = "card" style="width: 50%; margin-left: 25%;">
                            <img src="${image}" class="card-img-top" alt="...">
                        </div>
                        <h4>Nation: ${nation} </h4>
                        <h4>Sport: ${sport} </h4>
                        <h4>Position: ${position} </h4>
                        <h4>Team: ${team} </h4>
                        <h4>Gender: ${gender} </h4>
                        <p>${desc}</p>
                        <div class="container d-flex">
                            <h4><a href="https://${fb}" target="_blank"><i class="fa-brands fa-facebook"></i></a></h4>
                            <h4 class="mx-3"><a href="https://${x}" target = "_blank"><i class="fa-brands fa-x-twitter"></i></a> </h4>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="addToCart('${name}', '${position}')">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
    cart.appendChild(div);
};


const removeFromCart = (event) => {
    const button = event.target;
    const cardDiv = button.closest('.card');
    cardDiv.remove();

    const cnt = document.getElementById("count");
    cnt.innerText = "";
    count--;
    cnt.innerText = count;
};


fetch("https://www.thesportsdb.com//api/v1/json/3/searchplayers.php?p=harry")
    .then((res) => res.json())
    .then((data) => {
        const players = data.player;
        console.log(players);
        console.log(data)
        if (players == null) {
            const h1 = document.createElement("h1");
            h1.innerText = "NOTHING FOUND :'(";
            document.getElementById("card-container").appendChild(h1);
            return;
        }
        document.getElementById("card-container").innerHTML = "";
        players.forEach(player => {
            let desc = player.strDescriptionEN;
            if (desc == null) {
                desc = "A talented player with exceptional skills, speed, and game intelligence.";
            }
            if (player.strThumb != null || player.strThumb == "") {
                createCard(player.idPlayer, player.strPlayer, player.strThumb, player.strPosition, player.strNationality, player.strSport, player.strTeam, getFirstTenWords(desc), player.strGender, player.strFacebook, player.strTwitter);
                console.log(player.strPosition);
                console.log(player.strFacebook);
            }
            // console.log(player.strPlayer);
        });
        // console.log(data);
    })
    .catch(err => {
        const p = document.createElement("h1");
        p.innerText = "THERE IS A TECHNICAL ISSUE :'(";
        document.getElementById("card-container").appendChild(p);
        console.log(err);
    })






















