import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext: { team } }) => (
  <Layout>
    <SEO title={team.name} />
    <section key={team.id}>
      <img
        width="100px"
        height="100px"
        src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
        alt={team.name}
      ></img>
      <h1>{team.name}</h1>
      <h2>{team.conference.name} Conference</h2>
      <h3>{team.division.name} Division</h3>
    </section>
    <section>
      <table>
        <thead>
          <tr>
            <th colSpan="4">Roster</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Jersey Number</th>
            <th>Position</th>
          </tr>
          {team.roster.roster.map(player => (
            <tr key={player.person.id}>
              <td>
                <img
                  width="100px"
                  height="100px"
                  src={`https://assets.nhle.com/mugs/nhl/20192020/${team.abbreviation}/${player.person.id}.png`}
                  alt={player.person.fullName}
                ></img>
              </td>
              <td>
                <Link key={player.person.id} to={`/player/${player.person.id}`}>
                  {player.person.fullName}
                </Link>
              </td>
              <td>{player.jerseyNumber}</td>
              <td>{player.position.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </Layout>
)
