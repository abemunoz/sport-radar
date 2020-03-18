import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/home.css"

export default ({ pageContext: { conferences } }) => (
  <Layout>
    <SEO title="Home" />
    <div className="row home">
      {conferences.map(conference => (
        <section key={conference.id} className="col-md-6 col-sm-6">
          <h2>{conference.name}</h2>
          <div className="row division">
            {Object.keys(conference.divisions).map(division => (
              <div
                key={conference.divisions[division].id}
                className="col-md-6 col-sm-8"
              >
                <h3 key={conference.divisions[division].id}>
                  {conference.divisions[division].name}
                </h3>
                <ul style={{ listStyle: "none" }}>
                  {conference.divisions[division].teams.map(team => (
                    <li key={team.id}>
                      <Link
                        key={team.id}
                        to={`/teams/${team.id}`}
                        style={{
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        <img
                          width="25px"
                          height="25px"
                          src={`//www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
                          alt={team.name}
                          style={{
                            display: "inline-block",
                            verticalAlign: "top",
                            paddingRight: "5px",
                          }}
                        ></img>
                        <span>{team.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  </Layout>
)
