import React from "react"
import renderer from "react-test-renderer"
import conferences from "../../../__mocks__/teams.json"
import { StaticQuery } from "gatsby" // mocked
import Home from "../home"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `NHL Radar`,
        },
      },
    })
  )
})

describe("Home", () => {
  xit("renders correctly", () => {
    const tree = renderer
      .create(<Home pageContext={{ conferences }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
