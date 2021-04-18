import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello Danger`}
      description="Danger, a multi-ecosystem code review linting tool">
      <div className="container">
        <h2>Get Started in Your Language</h2>
      </div>
   
    </Layout>
  );
}

export default Home;
