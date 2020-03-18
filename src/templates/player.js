import React from "react"
import { Link } from "gatsby"
import { findFlagUrlByIso3Code } from "country-flags-svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  pageContext: { player, teamAbbreviation, teamId, stats },
}) => (
  <Layout>
    <SEO title={player.fullName} />
    <section>
      <div>
        <img
          width="100px"
          height="100px"
          src={`https://assets.nhle.com/mugs/nhl/20192020/${teamAbbreviation}/${player.id}.png`}
          alt={player.fullName}
        ></img>
        <h1>{player.fullName}</h1>
      </div>
      <div>
        <Link key={teamId} to={`/teams/${teamId}`}>
          <img
            width="100px"
            height="100px"
            src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${teamId}-light.svg`}
            alt={teamAbbreviation}
          ></img>
          <h3>{player.currentTeam.name}</h3>
        </Link>
      </div>
      <div>
        <h4>
          {player.captain === true ? "Captain" : null}{" "}
          {player.alternateCaptain === true ? "Alternate Captain" : null}{" "}
          {player.rookie === true ? "Rookie" : null}
        </h4>
      </div>
    </section>
    <section>
      <table>
        <thead>
          <tr>
            <th colSpan="8">Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Jersey Number</th>
            <th>Position</th>
            <th>
              {player.primaryPosition.code === "G" ? "Catches" : "Shoots"}
            </th>
            <th>Height</th>
            <th>Weight</th>
            <th>Age</th>
            <th>Birth Country</th>
          </tr>
          <tr>
            <td>{player.primaryNumber}</td>
            <td>{player.primaryPosition.name}</td>
            <td>{player.shootsCatches}</td>
            <td>{player.height}</td>
            <td>{player.weight} lbs</td>
            <td>{player.currentAge}</td>
            <td>
              <img
                width="100px"
                height="100px"
                src={`${findFlagUrlByIso3Code(player.birthCountry)}`}
                alt={player.birthCountry}
              ></img>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section>
      <table>
        <thead>
          <tr>
            <th colSpan="8">Stats</th>
          </tr>
        </thead>
        {player.primaryPosition.code === "G" ? (
          <tbody>
            <tr>
              <th>Season</th>
              <th>Team</th>
              <th>League</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Goals Against</th>
              <th>Goals Against Average</th>
              <th>Shutouts</th>
              <th>Minutes</th>
            </tr>
            {stats.map((data, index) => (
              <tr key={index}>
                <td>
                  {data.season.substr(0, 4)}-{data.season.substr(4, 7)}
                </td>
                <td>{data.team.name}</td>
                <td>{data.league.name}</td>
                <td>{data.stat.wins}</td>
                <td>{data.stat.losses}</td>
                <td>{data.stat.goalsAgainst}</td>
                <td>{data.stat.goalAgainstAverage}</td>
                <td>{data.stat.shutouts}</td>
                <td>{data.stat.timeOnIce}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <th>Season</th>
              <th>Team</th>
              <th>League</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Points</th>
              <th>+/-</th>
              <th>Penalty Minutes</th>
            </tr>
            {stats.map((data, index) => (
              <tr key={index}>
                <td>
                  {data.season.substr(0, 4)}-{data.season.substr(4, 7)}
                </td>
                <td>{data.team.name}</td>
                <td>{data.league.name}</td>
                <td>{data.stat.goals}</td>
                <td>{data.stat.assists}</td>
                <td>{data.stat.points}</td>
                <td>{data.stat.plusMinus || "N/A"}</td>
                <td>{data.stat.penaltyMinutes}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  </Layout>
)
