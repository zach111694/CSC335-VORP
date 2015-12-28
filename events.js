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
            specific_salary = parseInt(specific_salary.replace(/,/g,''));

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

var vorp_algorithm = function(positions,budget){

    var output = {
        total_vorp: 0,
        money_spent: 0,
        players: {}
    };

    var positions_keys = Object.keys(positions); //[3B,CF]
    var first_position = positions_keys[0]; // [3B]

    if(first_position){
        var positions_copy = {};

        for(var pos in positions){
            positions_copy[pos] = positions[pos];
        }

        delete positions_copy[first_position];

        output = vorp_algorithm(positions_copy,budget);

        for(var i in positions[first_position]) {
            var player = positions[first_position][i];

            if(player.salary <= budget){
                var new_budget = budget - player.salary;
                var max_vorp_so_far = vorp_algorithm(positions_copy,new_budget);
                max_vorp_so_far.total_vorp += player.vorp;
                max_vorp_so_far.players[first_position] = i;
                max_vorp_so_far.money_spent += player.salary;

                if(max_vorp_so_far.total_vorp > output.total_vorp){
                    output.total_vorp = max_vorp_so_far.total_vorp;
                    output.players = max_vorp_so_far.players;
                    output.money_spent = max_vorp_so_far.money_spent;
                }
            }
        }
    }

    return output;

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
            "Joc Pederson": {"vorp": 5, "salary": 600},
            "Odubel Herrera": {"vorp": -1, "salary": 200}
        }
    };

    var team = vorp_algorithm(positions,3000000);

    /* Test alert function with JSON object inside param */
    //alert(Object.keys(test_object));
    alert(JSON.stringify(team));


});
