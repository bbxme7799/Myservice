// components/PageMetadata.js
import React from "react";
import Head from "next/head";

const PageMetadata = ({ title }) => {
  return <Head>{title && <title>{title}</title>}</Head>;
};

export default PageMetadata;
