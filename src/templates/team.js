import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext: { team } }) => (
  <Layout>
    <SEO title={team.name} />
    <section key={team.id} style={{ padding: "0 1rem 1rem 1rem" }}>
      <div
        style={{
          paddingBottom: "10px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <img
          width="100px"
          height="100px"
          src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
          alt={team.name}
          style={{
            paddingRight: "10px",
          }}
        ></img>
        <h2 style={{ display: "contents" }}>{team.name}</h2>
      </div>
      <h3>{team.conference.name} Conference</h3>
      <h4>{team.division.name} Division</h4>
    </section>
    <section>
      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <tbody>
            <tr className="thead-light">
              <th style={{ width: "120px" }}></th>
              <th>Name</th>
              <th>Jersey Number</th>
              <th>Position</th>
            </tr>
            {team.roster.roster.map(player => (
              <tr key={player.person.id}>
                <td style={{ width: "120px" }}>
                  <img
                    width="100px"
                    height="100px"
                    src={`https://assets.nhle.com/mugs/nhl/20192020/${team.abbreviation}/${player.person.id}.png`}
                    alt={player.person.fullName}
                  ></img>
                </td>
                <td>
                  <Link
                    key={player.person.id}
                    to={`/player/${player.person.id}`}
                    style={{
                      textDecoration: "underline",
                      color: "black",
                    }}
                  >
                    {player.person.fullName}
                  </Link>
                </td>
                <td>{player.jerseyNumber}</td>
                <td>{player.position.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </Layout>
)
