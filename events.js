var computeButton = document.getElementById("computeButton");

/*** FUNCTION THAT RETURNS AN ARRAY OF PLAYER OBJECTS ***/
var create_player_objects = function(players,salaries){
    var player_objects = [];

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

            player_objects.push(
                {   player: specific_player[1],
                    vorp: specific_player[16],
                    position: specific_player[3],
                    salary: specific_salary
                }
            );
        }
    }
    return player_objects;
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
    var player_objects = create_player_objects(data_with_vorp,data_with_salaries);

    /* Test alert function with JSON object inside param */
    alert(JSON.stringify(player_objects));

});



