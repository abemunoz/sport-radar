import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext: { conferences } }) => (
  <Layout>
    <SEO title="Home" />
    {conferences.map(conference => (
      <section key={conference.id}>
        <h1>{conference.name}</h1>
        {Object.keys(conference.divisions).map(division => (
          <div key={conference.divisions[division].id}>
            <h2 key={conference.divisions[division].id}>
              {conference.divisions[division].name}
            </h2>
            <ul>
              {conference.divisions[division].teams.map(team => (
                <Link key={team.id} to={`/teams/${team.id}`}>
                  <img
                    width="100px"
                    height="100px"
                    src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
                    alt={team.name}
                  ></img>
                  <li key={team.id}>{team.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ))}
  </Layout>
)
