var computeButton = document.getElementById("computeButton");

// Below are the array indices of significant data from the website containing each player's vorp after splitting the string:
// Player = 1, Position = 3, VORP = 16

computeButton.addEventListener("click", function() {
    var data = (document.getElementById("player-data").value);
    var dataPool = data.split(/=+/);
    var players = dataPool[0].split('\n');

    var salaries = dataPool[1];

    var player_object = {};
    var player_count = 0;
    var test_alert_string = "";

    for(var i = 0; i < players.length;i++){
        var specific_player = players[i].split('\t');
        var specific_salary = "";
        var salary_playerIndex = salaries.indexOf(specific_player[1]);
        if (salary_playerIndex === -1){
            specific_salary = "No Salary Listed";
        }
        else {
            var indexOf$ = salaries.indexOf("$", salary_playerIndex);
            specific_salary = salaries.substring(indexOf$ + 1, salaries.indexOf('\t', indexOf$));
            specific_salary = "$" + specific_salary;

            player_object[specific_player[1]] = {
                vorp: specific_player[16],
                position: specific_player[3],
                salary: specific_salary
            };
        }


        if(specific_salary[0] === "$"){
            player_count += 1;
            test_alert_string += (
                specific_player[1] + ':    ' +
                "VORP = " + specific_player[16] + '    ' +
                "Position = " + specific_player[3]+ '    ' +
                "Salary = " + specific_salary + '\n'
            );
        }
    }

    /* Test alert function with JSON object inside param */
    // alert(JSON.stringify(player_object));
    /* Test alert function with string inside param */
    alert(test_alert_string + "\n" + player_count + " players total");

});



