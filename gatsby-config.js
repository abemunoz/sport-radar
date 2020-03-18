module.exports = {
  siteMetadata: {
    title: `NHL Radar`,
    description: `Check out the current NHL team and player profiles`,
    author: `Abraham Muñoz`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: "/sport-radar"
}
