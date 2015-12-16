var computeButton = document.getElementById("computeButton");

/*** FUNCTION THAT RETURNS AN ARRAY OF PLAYER OBJECTS ***/
var create_player_objects = function(players,salaries){
    var player_objects = {};

    for(var i = 0; i < players.length;i++){
        var specific_player = players[i].split('\t');
        var specific_salary = "";
        var salary_playerIndex = salaries.indexOf(specific_player[1]);
        if (salary_playerIndex === -1){
            specific_salary = "No Salary Listed";
        } else {
            var indexOf$ = salaries.indexOf("$", salary_playerIndex);
            specific_salary = salaries.substring(indexOf$ + 1, salaries.indexOf('\t', indexOf$));
            specific_salary = parseInt(specific_salary.replace(/,/,''));

            player_objects[specific_player[1]] =
            {
                vorp: parseFloat(specific_player[16]),
                position: specific_player[3],
                salary: specific_salary
            };

        }
    }
    return player_objects;
};

/*** VORP ALGORITHM FUNCTION !STILL IN PROGRESS. THIS IS JUST A STARTING TEMPLATE! ***/
var create_position_object = function(player_objects){

    var player_positions = {};

    for(var i in player_objects){
        var player = player_objects[i];

        if(!(player.position in player_positions)){
            player_positions[player.position] = {};
        }

        player_positions[player.position][i] = {
            vorp: player.vorp,
            salary: player.salary
        };
    }
    return player_positions;
};

var max_vorp = function(positions,budget,n){

    if(n > positions.length){
        return "TEST";
    }

    var team = [];
    var max_vorp_so_far = 0;

    for(var player in positions[n]) {
        if (player.salary < budget && player.vorp > max_vorp_so_far) {
            max_vorp_so_far = player.vorp;
            var new_budget = budget - player.salary;

            team.push([player, player.vorp, player.salary, positions[n]] + max_vorp(positions, new_budget, n + 1));
        }
    }

    return team;

        //team.push(["\n" + maxVorpInPosition,j,playerWithMaxVorp,playerSalary] + max_vorp(new_positions,budget - playerSalary));

        //var maxVorpInPosition = 0;
        //var playerWithMaxVorp = "";
        //var playerSalary = 0;
        //var playerPosition = "";
        //
        //for (var k in base){
        //    if(base[k].vorp > maxVorpInPosition){
        //        maxVorpInPosition = base[k].vorp;
        //        playerWithMaxVorp = k;
        //        playerSalary = base[k].salary;
        //        playerPosition = j;
        //    }
        //}

};

/*** MAIN FUNCTION ***/
computeButton.addEventListener("click", function() {

    // STORE TEXT INPUT AS STRING IN A VARIABLE
    var data = (document.getElementById("player-data").value);

    // DIVIDE STRING VARIABLE AT "===" USING REGEX, AND STORE RESULTS IN AN ARRAY
    var dataPool = data.split(/=+/);

    // STORE DATA CONTAINING VORP IN VAR; TAKEN FROM INDEX '0' OF DATA POOL ARRAY
    var data_with_vorp = dataPool[0].split('\n');

    // STORE DATA CONTAINING SALARIES IN VAR; TAKEN FROM  INDEX '1' OF DATA POOL ARRAY
    var data_with_salaries = dataPool[1];

    // STORE RETURNED ARRAY OF OBJECTS FROM FUNCTION IN VARIABLE
    var players = create_player_objects(data_with_vorp,data_with_salaries);
    var positions = create_position_object(players);
    var test_object = {
        "3B": {
            "Matt Duffy": {"vorp": 3, "salary": 400},
            "Jake Lamb": {"vorp": 10, "salary": 200}
        },
        "CF": {
            "Joc Pederson": {"vorp": 3, "salary": 600},
            "Odubel Herrera": {"vorp": -1, "salary": 200}
        }
    };

    var team = max_vorp(Object.keys(test_object),1000,0);

    /* Test alert function with JSON object inside param */
    alert(Object.keys(test_object));
    alert(team);



});
