import * as React from "react";
import Back from "../components/Back";
import Layout from "../components/Layout";

import "../scss/main.scss";

export default function SimplePage({ pageContext }) {
  const { id, html } = pageContext;

  return (
    <Layout themeLight={true}>
      <Back />
      <section id="simplePage" className="container container-sm">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  );
}
