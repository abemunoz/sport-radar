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
      <div
        style={{
          paddingBottom: "10px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <img
          width="125px"
          height="125px"
          src={`https://assets.nhle.com/mugs/nhl/20192020/${teamAbbreviation}/${player.id}.png`}
          alt={player.fullName}
          style={{
            paddingRight: "10px",
          }}
        ></img>
        <div>
          <h1>{player.fullName}</h1>
          <Link
            key={teamId}
            to={`/teams/${teamId}`}
            style={{
              color: "black",
              textDecoration: "underline",
            }}
          >
            <img
              width="35px"
              height="35px"
              src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${teamId}-light.svg`}
              alt={teamAbbreviation}
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                paddingRight: "5px",
              }}
            ></img>
            <span>{player.currentTeam.name}</span>
          </Link>
        </div>
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
      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <tbody>
            <tr className="thead-light">
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
      </div>
    </section>
    <section>
      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <thead>
            <tr className="thead-light">
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
      </div>
    </section>
  </Layout>
)
