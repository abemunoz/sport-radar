const axios = require('axios');
const get = endpoint => axios.get(`https://statsapi.web.nhl.com/api/v1/${endpoint}`);

exports.createPages = async ({actions: { createPage },}) => {
  //  get main team data for home page
  const { data : { teams }} = await get(`teams`);
  const eastern = {
      "atlantic": [],
      "metropolitan": []
  };
  const western = {
      "central": [],
      "pacific": []
  };
  let team;
  for (team of teams) {
    switch (team.conference.id) {
        case 5: 
            switch(team.division.id) { 
                case 16: 
                  western.central.push(team);
                  break;
                case 15: 
                  western.pacific.push(team);
                  break;  
            }
        case 6:
          switch(team.division.id) { 
              case 17: 
                eastern.atlantic.push(team);
                break;
              case 18: 
                eastern.metropolitan.push(team);
                break;  
          }
      }
  }

  eastern.atlantic.sort((a, b) => a.name.localeCompare(b.name));
  eastern.metropolitan.sort((a, b) => a.name.localeCompare(b.name));
  western.central.sort((a, b) => a.name.localeCompare(b.name));
  western.pacific.sort((a, b) => a.name.localeCompare(b.name));
  const conferences = {'Eastern': {...eastern}, 'Western': {...western}};

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
    console.log(team.name);
    //get all player data
    for (var i = 0; i < teams[0].roster.roster.length; i ++) {
        const player = teams[0].roster.roster[i];
        const { data : { people }} = await get(`people/${player.person.id}`);
        const playerData = people[0];
        console.log(`        ${playerData.fullName}`);
        createPage({
            path: `/player/${player.person.id}`,
            component: require.resolve('./src/templates/player.js'),
            context: {
                playerData
            }
        });
    }
  }
};