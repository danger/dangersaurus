/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';

const Logo = (props) => {
  const ctx = useDocusaurusContext();
  const loc = useLocation()
  const isClient = ctx.isClient
  const {
    navbar: {
      logo = {
        src: '',
      },
    },
  } = useThemeConfig();
  const {imageClassName, titleClassName, ...propsRest} = props;
  const logoLink = useBaseUrl(logo.href || '/');
  const rootMap = {
    "js": "/img/logos/js-logo@2x.png",
    "ruby": "/img/logos/ruby-logo@2x.png",
    "swift": "/img/logos/swift-logo@2x.png",
    "python": "/img/logos/danger-js-py-logo-hero-cachable@2x.png",
    "dart": "/img/logos/danger-js-dart-logo-hero-cachable@2x.png",
    "kotlin": "/img/logos/danger-js-ktln-logo-hero-cachable@2x.png"
  }

  const root = loc.pathname.split("/")[1]
  const sources = {
    light: useBaseUrl(rootMap[root] || rootMap["js"]),
    dark: useBaseUrl(rootMap[root] || rootMap["js"]),
  };

  const title = `Danger ${toTitleCase(root).replace("Js", "JS")}`

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && {
        target: logo.target,
      })}>
      {logo.src && (
        <ThemedImage
          key={isClient}
          className={imageClassName}
          sources={sources}
          alt={logo.alt || title || 'Logo'}
        />
      )}
      {title != null && <strong className={titleClassName}>{title}</strong>}
    </Link>
  );
};

export default Logo;


 function toTitleCase(str) {
  return str.toLowerCase().replace(/\.\s*([a-z])|^[a-z]/gm, s => s.toUpperCase());
 }
