const axios = require('axios');
const get = endpoint => axios.get(`https://statsapi.web.nhl.com/api/v1/${endpoint}`);

exports.createPages = async ({actions: { createPage },}) => {
  //  get main team data for home page
  const { data : { teams }} = await get(`teams`);
  const eastern = {
      "name": "Eastern",
      "id": 6,
      "divisions": {
        "atlantic": {
            "name": "Atlantic",
            "id": 17,
            "teams": []
        },
        "metropolitan": {
            "name": "Metropolitan",
            "id": 18,
            "teams": []
        }
      }
  };
  const western = {
      "name": "Western",
      "id": 5,
      "divisions": {
        "central": {
            "name": "Central",
            "id": 16,
            "teams": []
        },
        "pacific": {
            "name": "Pacific",
            "id": 15,
            "teams": []
        }
      }
  };
  let team;
  for (team of teams) {
    switch (team.conference.id) {
        case 5: 
            switch(team.division.id) { 
                case 16: 
                  western.divisions.central.teams.push(team);
                  break;
                case 15: 
                  western.divisions.pacific.teams.push(team);
                  break;  
            }
        case 6:
          switch(team.division.id) { 
              case 17: 
                eastern.divisions.atlantic.teams.push(team);
                break;
              case 18: 
                eastern.divisions.metropolitan.teams.push(team);
                break;  
          }
      }
  }

  eastern.divisions.atlantic.teams.sort((a, b) => a.name.localeCompare(b.name));
  eastern.divisions.metropolitan.teams.sort((a, b) => a.name.localeCompare(b.name));
  western.divisions.central.teams.sort((a, b) => a.name.localeCompare(b.name));
  western.divisions.pacific.teams.sort((a, b) => a.name.localeCompare(b.name));
  const conferences = [{...eastern}, {...western}];

  createPage({
    path: `/`,
    component: require.resolve('./src/templates/home.js'),
    context: {
        conferences
    }
  });

  //get all team data including rosters
  for (team of teams) {
    const { data : { teams }}= await get(`teams/${team.id}?expand=team.roster`);
    createPage({
        path: `/teams/${team.id}`,
        component: require.resolve('./src/templates/team.js'),
        context: {
            teams
        }
    });
    //get all player data
    // for (var i = 0; i < teams[0].roster.roster.length; i ++) {
    //     const player = teams[0].roster.roster[i];
    //     const { data : { people }} = await get(`people/${player.person.id}`);
    //     const playerData = people[0];
    //     createPage({
    //         path: `/player/${player.person.id}`,
    //         component: require.resolve('./src/templates/player.js'),
    //         context: {
    //             playerData
    //         }
    //     });
    // }
  }
};