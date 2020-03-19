const axios = require("axios")
const axiosRetry = require("axios-retry")

const nhlAPI = axios.create({ baseURL: `https://statsapi.web.nhl.com/api/v1` })
axiosRetry(nhlAPI, { retries: 5 })

exports.createPages = async ({ actions: { createPage } }) => {
  //  get main team data for home page
  let response
  await nhlAPI.get(`/teams`).then(result => (response = result))
  const {
    data: { teams },
  } = response
  const eastern = {
    name: "Eastern Conference",
    id: 6,
    divisions: {
      atlantic: {
        name: "Atlantic",
        id: 17,
        teams: [],
      },
      metropolitan: {
        name: "Metropolitan",
        id: 18,
        teams: [],
      },
    },
  }
  const western = {
    name: "Western Conference",
    id: 5,
    divisions: {
      central: {
        name: "Central",
        id: 16,
        teams: [],
      },
      pacific: {
        name: "Pacific",
        id: 15,
        teams: [],
      },
    },
  }
  let team
  for (team of teams) {
    switch (team.conference.id) {
      case 5:
        switch (team.division.id) {
          case 16:
            western.divisions.central.teams.push(team)
            break
          case 15:
            western.divisions.pacific.teams.push(team)
            break
        }
      case 6:
        switch (team.division.id) {
          case 17:
            eastern.divisions.atlantic.teams.push(team)
            break
          case 18:
            eastern.divisions.metropolitan.teams.push(team)
            break
        }
    }
  }

  eastern.divisions.atlantic.teams.sort((a, b) => a.name.localeCompare(b.name))
  eastern.divisions.metropolitan.teams.sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  western.divisions.central.teams.sort((a, b) => a.name.localeCompare(b.name))
  western.divisions.pacific.teams.sort((a, b) => a.name.localeCompare(b.name))
  const conferences = [{ ...eastern }, { ...western }]

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/home.js"),
    context: {
      conferences,
    },
  })

  //get all team data including rosters
  for (team of teams) {
    let response
    await nhlAPI
      .get(`teams/${team.id}?expand=team.roster`)
      .then(result => (response = result))
    const {
      data: { teams },
    } = response
    createPage({
      path: `/teams/${team.id}`,
      component: require.resolve("./src/templates/team.js"),
      context: {
        team: { ...teams[0] },
      },
    })
    //get all player data
    for (var i = 0; i < teams[0].roster.roster.length; i++) {
      const player = teams[0].roster.roster[i]
      let playerResponse
      await nhlAPI
        .get(`people/${player.person.id}`)
        .then(result => (playerResponse = result))
      const {
        data: { people },
      } = playerResponse
      let playerStatResponse
      await nhlAPI
        .get(`people/${player.person.id}/stats?stats=yearByYear`)
        .then(result => (playerStatResponse = result))
      const {
        data: { stats },
      } = playerStatResponse
      createPage({
        path: `/player/${player.person.id}`,
        component: require.resolve("./src/templates/player.js"),
        context: {
          player: { ...people[0] },
          teamAbbreviation: teams[0].abbreviation,
          teamId: teams[0].id,
          stats: stats[0].splits,
        },
      })
    }
  }
}
