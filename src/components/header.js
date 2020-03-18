import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#000000`,
      marginBottom: `1rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `flex-start`,
        alignItems: `center`,
      }}
    >
      <Link to="/">
        <img
          width="100px"
          height="100px"
          src="//www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg"
          alt="NHL"
          style={{
            color: `white`,
            textDecoration: `none`,
            paddingRight: `15px`
          }}
        ></img>
      </Link>
      <h1 className="title" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
