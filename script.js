// Elements

var grid_UI = document.getElementById("grid");
var paused_UI = document.getElementById("paused");

// Matrix assets

var grid_sizeX = 25;
var grid_sizeY = 25;
var grid_size = grid_sizeX * grid_sizeY;

// Matrix

for (i = 0; i < grid_size; i++) {
    let cell = document.createElement("div");
    cell.id = i;

    cell.style.width = "2vmin";
    cell.style.height = "2vmin";
    cell.style.border = "1px solid lightgrey";
    cell.style.display = "inline-block";

    grid_UI.appendChild(cell);
    if ((i + 1) % grid_sizeX == 0) {
        grid_UI.appendChild(document.createElement("br"));
    }
    grid_UI.style.width = cell.style.width * 0;
}

// Game assets

// Game
var playing = true;
paused_UI.style.display = "none";

//Player
var plr_start = document.getElementById(Math.floor(Math.random() * grid_size).toString());
var plr_destination;
var plr_direction;
var plr_in_safe_zone;
var coins = 0;

plr_start.className = "player";
plr_start.style.backgroundColor = "red";
console.log(coins);

// Functions

const bounds = [
    function up(object) {
        return document.getElementById((parseInt(object.id) - grid_sizeX).toString());
    },
    function down(object) {
        return document.getElementById((parseInt(object.id) + grid_sizeX).toString());
    },
    function left(object) {
        return document.getElementById((parseInt(object.id) - 1).toString());
    },
    function right(object) {
        return document.getElementById((parseInt(object.id) + 1).toString());
    }
];

// Map generating

// Terrain
for (i = 0; i < grid_size / 4; i++) {
    var random = Math.floor(Math.random() * grid_size);

    while (document.getElementById(random).classList.length > 0) {
        var random = Math.floor(Math.random() * grid_size);
    }

    var box = document.getElementById(random);
    box.style.backgroundColor = "green";
    box.className = "block";
}

// Coins
for (i = 0; i < 5; i++) {
    var random = Math.floor(Math.random() * grid_size);

    while (document.getElementById(random).classList.length > 0) {
        var random = Math.floor(Math.random() * grid_size);
    }

    var coin = document.getElementById(random);
    coin.style.backgroundColor = "orange";
    coin.className = "coin";
}

// Game functions

function enableContextMenu() {
    document.removeEventListener("contextmenu", disableContextMenu);
}

function disableContextMenu(event) {
    event.preventDefault();
}

document.addEventListener("contextmenu", disableContextMenu);

document.addEventListener("click", function(event) {
  if (grid_UI.contains(event.target)) {
    playing = true;
    paused_UI.style.display = "none";
    document.addEventListener("contextmenu", disableContextMenu);
  } else {
    playing = false;
    paused_UI.style.display = "block";
    enableContextMenu();
  }
});

// Player functions
 
// Movements
document.addEventListener("keydown", function(event) {
    if (playing == true) {
        if (event.key == "w") {
            plr_direction = "up";
            if (bounds[0](plr_start) != null && bounds[0](plr_start).className != "block") {
                plr_start.classList.remove("player");
                plr_start.style.backgroundColor = "rgba(0, 0, 0, 0)";
                plr_destination = bounds[0](plr_start);
                plr_destination.classList.add("player");
                plr_start = plr_destination;
                plr_start.style.backgroundColor = "red";

                // Objects Interaction
                if (plr_destination.classList.contains("coin")) {
                    coins++;
                    plr_destination.classList.remove("coin");
                    console.log(coins);
                }
            }
        }
        if (event.key == "a") {
            plr_direction = "left";
            if ((parseInt(plr_start.id)) % grid_sizeX != 0 && bounds[2](plr_start).className != "block") {
                plr_start.classList.remove("player");
                plr_start.style.backgroundColor = "rgba(0, 0, 0, 0)";
                plr_destination = bounds[2](plr_start);
                plr_destination.classList.add("player");
                plr_start = plr_destination;
                plr_start.style.backgroundColor = "red";

                // Objects Interaction

                // Coins pickup
                if (plr_destination.classList.contains("coin")) {
                    coins++;
                    plr_destination.classList.remove("coin");
                    console.log(coins);
                }
            }
        }
        if (event.key == "s") {
            plr_direction = "down";
            if (bounds[1](plr_start) != null && bounds[1](plr_start).className != "block") {
                plr_start.classList.remove("player");
                plr_start.style.backgroundColor = "rgba(0, 0, 0, 0)";
                plr_destination = bounds[1](plr_start);
                plr_destination.classList.add("player");
                plr_start = plr_destination;
                plr_start.style.backgroundColor = "red";

                // Objects Interaction

                // Coins pickup
                if (plr_destination.classList.contains("coin")) {
                    coins++;
                    plr_destination.classList.remove("coin");
                    console.log(coins);
                }
            }
        }
        if (event.key == "d") {
            plr_direction = "right";
            if ((parseInt(plr_start.id) + 1) % grid_sizeX != 0 && bounds[3](plr_start).className != "block") {
                plr_start.classList.remove("player");
                plr_start.style.backgroundColor = "rgba(0, 0, 0, 0)";
                plr_destination = bounds[3](plr_start);
                plr_destination.classList.add("player");
                plr_start = plr_destination;
                plr_start.style.backgroundColor = "red";

                // Objects Interaction

                // Coins pickup
                if (plr_destination.classList.contains("coin")) {
                    coins++;
                    plr_destination.classList.remove("coin");
                    console.log(coins);
                }
            }
        }
    }
});

// Break/Place block
document.addEventListener("mousedown", function(event) {
    if (playing == true) {
        document.addEventListener("click", function(event) {
            if (grid_UI.contains(event.target)) {
                if (event.button === 0) {
                    if (plr_direction == "up") {
                        if (bounds[0](plr_start) != null) {
                            if (bounds[0](plr_start).className == "block") {
                                bounds[0](plr_start).style.backgroundColor = "rgba(0, 0, 0, 0)";
                                bounds[0](plr_start).classList.remove("block");
                            }
                        }
                    }
                    if (plr_direction == "left") {
                        if (bounds[2](plr_start) != null) {
                            if (parseInt(plr_start.id) % grid_sizeX != 0) {
                                if (bounds[2](plr_start).className == "block") {
                                    bounds[2](plr_start).style.backgroundColor = "rgba(0, 0, 0, 0)";
                                    bounds[2](plr_start).classList.remove("block");
                                }
                            }
                        }
                    }
                    if (plr_direction == "down") {
                        if (bounds[1](plr_start) != null) {
                            if (bounds[1](plr_start).className == "block") {
                                bounds[1](plr_start).style.backgroundColor = "rgba(0, 0, 0, 0)";
                                bounds[1](plr_start).classList.remove("block");
                            }
                        }
                    }
                    if (plr_direction == "right") {
                        if (bounds[3](plr_start) != null) {
                            if ((parseInt(plr_start.id) + 1) % grid_sizeX != 0) {
                                if (bounds[3](plr_start).className == "block") {
                                    bounds[3](plr_start).style.backgroundColor = "rgba(0, 0, 0, 0)";
                                    bounds[3](plr_start).classList.remove("block");
                                }
                            }
                        }
                    }
                }
            }
        });
        if (event.button === 2) {
            if (plr_direction == "up") {
                if (bounds[0](plr_start) != null) {
                    if (bounds[0](plr_start).classList.length == 0) {
                        bounds[0](plr_start).style.backgroundColor = "brown";
                        bounds[0](plr_start).className = "block";
                    }
                }
            }
            if (plr_direction == "left") {
                if (bounds[2](plr_start) != null) {
                    if (parseInt(plr_start.id) % grid_sizeX != 0) {
                        if (bounds[2](plr_start).classList.length == 0) {
                        bounds[2](plr_start).style.backgroundColor = "brown";
                        bounds[2](plr_start).className = "block";
                    }
                    }
                }
            }
            if (plr_direction == "down") {
                if (bounds[1](plr_start) != null) {
                    if (bounds[1](plr_start).classList.length == 0) {
                        bounds[1](plr_start).style.backgroundColor = "brown";
                        bounds[1](plr_start).className = "block";
                    }
                }
            }
            if (plr_direction == "right") {
                if (bounds[3](plr_start) != null) {
                    if ((parseInt(plr_start.id) + 1) % grid_sizeX != 0) {
                        if (bounds[3](plr_start).classList.length == 0) {
                            bounds[3](plr_start).style.backgroundColor = "brown";
                            bounds[3](plr_start).className = "block";
                        }
                    }
                }
            }
        }
    }
});
