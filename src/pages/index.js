import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Powerful Tooling for Improving Collaboration',
    description: (
      <>
        <p>Danger adds a new step in your CI process. There's this ambiguous time period after tests have passed, and before a human reviews the code.</p>
        <p>Sure, your linter and tests passed, but did you accidentally put a file in the wrong place, or did you forget to add a CHANGELOG entry? </p>
        <p><strong>Automate your code review chores.</strong></p>
      </>
    ),
  },
  {
    title: 'No Project is the Same',
    description: (
      <>
        <p>Danger is runtime, like how a testing framework runs your code. <strong>You make the rules for your projects</strong>.</p>
        <p><strong>Danger supports many developer ecosystems.</strong> By relying on Danger JS to do the heavy lifting, many languages can provide native support for writing rules.</p>
      </>
    ),
  },
  {
    title: 'Supports Your Tools',
    description: (
      <>
        <p>Danger works with GitHub, BitBucket Server, BitBucket Cloud for code review, then with: Travis CI, GitLab CI,
Semaphore, Circle CI, GitHub Actions, Jenkins, Docker Cloud, Bamboo, Bitrise, surf-build, Codeship, Drone, Buildkite,
Nevercode, buddybuild, Buddy.works, TeamCity, Visual Studio Team Services, Screwdriver, Concourse, Netlify, CodeBuild,
Codefresh, AppCenter, BitBucket Pipelines, Cirrus CI, or Codemagic.</p>
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      {description}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello Danger`}
      description="Danger, a multi-ecosystem code review linting tool">
      <header className={clsx('hero ', styles.heroBanner)}>
        <div className="container">
          <img src="/img/logos/danger-logo-hero@2x.png"/>
        </div>
        <br />
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>


      <div className="container">
        <center><h2>Get Started in Your Language</h2></center>
      </div>
      <div className="container sub-logos">
          <a href="/js"><img src="/img/logos/js-logo@2x.png"/></a>
          <a href="/ruby"><img src="/img/logos/ruby-logo@2x.png"/></a>
          <a href="/swift"><img src="/img/logos/swift-logo@2x.png"/></a>
          <a href="/py"><img src="/img/logos/danger-js-py-logo-hero-cachable@2x.png"/></a>
          <a href="/kotlin"><img src="/img/logos/danger-js-ktln-logo-hero-cachable@2x.png"/></a>
          <a href="/dart"><img src="/img/logos/danger-js-dart-logo-hero-cachable@2x.png"/></a>
        </div>
    </Layout>
  );
}

export default Home;
