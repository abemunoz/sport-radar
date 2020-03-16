import React from 'react';
import { Link } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext: { teams } }) => (
    <Layout>
        <SEO title="Home" />
        <h1>{teams[0].name}</h1>
    </Layout>
);