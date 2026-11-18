/* Ayush Pandey — personal site refresh */

:root {
  color-scheme: dark;
  --bg: #0b0b10;
  --surface: #111119;
  --surface-2: #171721;
  --text: #f4f2f8;
  --muted: #a5a2b1;
  --subtle: #777484;
  --line: rgba(255,255,255,.10);
  --accent: #b49aff;
  --accent-2: #8d76e8;
  --mint: #b9f3dc;
  --nav: rgba(11,11,16,.82);
  --shadow: 0 24px 80px rgba(0,0,0,.28);
}

:root[data-theme="light"] {
  color-scheme: light;
  --bg: #f7f6fa;
  --surface: #fff;
  --surface-2: #efedf5;
  --text: #17151e;
  --muted: #625e6d;
  --subtle: #827d8c;
  --line: rgba(25,20,40,.13);
  --accent: #7657cb;
  --accent-2: #a08be8;
  --mint: #226a50;
  --nav: rgba(247,246,250,.86);
  --shadow: 0 24px 80px rgba(50,35,80,.10);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: Manrope, system-ui, sans-serif;
  line-height: 1.7;
  transition: background .25s, color .25s;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
}

.shell {
  width: min(1120px, calc(100% - 48px));
  margin-inline: auto;
}

.skip-link {
  position: absolute;
  top: -60px;
  left: 16px;
  background: var(--accent);
  color: #111;
  padding: 8px 12px;
  z-index: 2000;
}

.skip-link:focus {
  top: 12px;
}

/* NAVIGATION */

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--nav);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
}

.navbar {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -1.8px;
}

.brand span {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 34px;
  margin-left: auto;
  margin-right: 38px;
}

.nav-links a,
.social-links a {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  transition: color .2s;
}

.nav-links a:hover,
.social-links a:hover {
  color: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.theme-toggle {
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.theme-toggle svg {
  width: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 13px 19px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .01em;
  transition: transform .2s, background .2s, border-color .2s;
}

.button:hover {
  transform: translateY(-2px);
}

.button span {
  font-size: 16px;
}

.button-small {
  padding: 10px 14px;
}

.button-primary {
  background: var(--accent);
  color: #17121f;
}

.button-primary:hover {
  background: #c5b4ff;
}

.button-outline {
  border: 1px solid var(--line);
  background: transparent;
}

.button-outline:hover {
  border-color: var(--accent);
}

.button-quiet {
  color: var(--muted);
  padding-left: 4px;
}

.menu-toggle {
  display: none;
}

/* HERO */

.hero {
  min-height: 660px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  position: relative;
  padding-top: 55px;
  padding-bottom: 105px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 610px;
}

.availability,
.section-kicker,
.eyebrow,
.tool-type,
.tool-number,
.panel-index,
.profile-foot span,
.project-meta,
.callout-label,
.back-top,
.hero-scroll,
.art-caption,
.tool-top .tool-type {
  font-family: "DM Mono", monospace;
  letter-spacing: .09em;
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 8px 12px;
  color: var(--muted);
  font-size: 9px;
  margin-bottom: 36px;
}

.pulse,
.coming-label span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #91e2bd;
  box-shadow: 0 0 0 4px rgba(145,226,189,.10);
}

.eyebrow {
  font-size: 10px;
  color: var(--accent);
  margin-bottom: 16px;
}

.eyebrow span {
  font-size: 15px;
  margin-left: 5px;
}

.hero h1 {
  font-size: clamp(48px, 6.2vw, 78px);
  line-height: 1.08;
  letter-spacing: -.065em;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(
    105deg,
    var(--accent),
    #d0a9ed 58%,
    #8ecfc2
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-intro {
  max-width: 510px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.9;
  margin-top: 24px;
}

.hero-intro strong {
  color: var(--text);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 31px;
}

.hero-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  color: var(--subtle);
  font: 10px "DM Mono", monospace;
  letter-spacing: .05em;
  margin-top: 48px;
}

.meta-separator {
  color: var(--accent);
}

/* HERO ART */

.hero-art {
  height: 440px;
  position: relative;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.hero-art:before {
  content: "";
  position: absolute;
  width: 310px;
  height: 310px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(151,120,220,.18),
    transparent 70%
  );
  filter: blur(5px);
  z-index: -1;
}

.orbit {
  position: absolute;
  border: 1px solid var(--line);
  border-radius: 50%;
  transform: rotate(-25deg);
}

.orbit-one {
  width: 370px;
  height: 210px;
}

.orbit-two {
  width: 290px;
  height: 390px;
  transform: rotate(55deg);
  border-color: rgba(180,154,255,.24);
}

.orbit-core {
  width: 176px;
  height: 176px;
  border-radius: 50%;
  border: 1px solid rgba(180,154,255,.45);
  background: linear-gradient(
    145deg,
    rgba(180,154,255,.17),
    rgba(17,17,25,.8)
  );
  box-shadow:
    0 0 80px rgba(155,123,220,.15),
    inset 0 0 40px rgba(180,154,255,.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transform: rotate(-8deg);
}

.orbit-core span {
  font-size: 55px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -.1em;
  color: var(--text);
}

.orbit-core small {
  text-align: center;
  font: 8px/1.5 "DM Mono", monospace;
  letter-spacing: .16em;
  color: var(--accent);
}

.float-chip {
  position: absolute;
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 10px 13px;
  border-radius: 4px;
  box-shadow: var(--shadow);
  font: 9px "DM Mono", monospace;
  color: var(--muted);
}

.chip-code {
  top: 72px;
  right: 0;
}

.chip-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ce0c2;
  margin-right: 7px;
}

.chip-location {
  bottom: 82px;
  left: 0;
}

.art-caption {
  position: absolute;
  bottom: 0;
  right: 8px;
  text-align: right;
  color: var(--muted);
  font-size: 8px;
  line-height: 1.9;
}

.art-caption span {
  color: var(--subtle);
}

.hero-scroll {
  position: absolute;
  bottom: 32px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--subtle);
  font-size: 8px;
}

.hero-scroll span {
  width: 28px;
  height: 1px;
  background: var(--accent);
}

/* INTRO STRIP */

.intro-strip {
  border-block: 1px solid var(--line);
  background: var(--surface);
}

.strip-inner {
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: var(--muted);
  font: 9px "DM Mono", monospace;
  letter-spacing: .15em;
}

.strip-inner i {
  font-style: normal;
  color: var(--accent);
  font-size: 14px;
}

/* GENERAL SECTIONS */

.section {
  padding-top: 120px;
  padding-bottom: 120px;
}

.section-heading {
  margin-bottom: 54px;
}

.section-kicker {
  font-size: 9px;
  color: var(--subtle);
  margin-bottom: 18px;
}

.section-kicker span {
  color: var(--accent);
}

.section-heading h2,
.contact-inner h2 {
  font-size: clamp(38px, 5vw, 57px);
  line-height: 1.12;
  letter-spacing: -.06em;
}

/* ABOUT */

.about-layout {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 100px;
  align-items: center;
}

.about-copy {
  max-width: 560px;
}

.about-copy p {
  color: var(--muted);
  font-size: 14px;
  line-height: 2;
  margin-bottom: 18px;
}

.about-copy .lead {
  font-size: 19px;
  color: var(--text);
  font-weight: 700;
}

.text-link,
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 800;
  margin-top: 17px;
}

.text-link span,
.card-link span {
  font-size: 16px;
  transition: transform .2s;
}

.text-link:hover span,
.card-link:hover span {
  transform: translate(3px,-3px);
}

.profile-panel {
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  position: relative;
}

.profile-panel:after {
  content: "";
  position: absolute;
  right: -1px;
  top: -1px;
  width: 50px;
  height: 50px;
  border-top: 1px solid var(--accent);
  border-right: 1px solid var(--accent);
}

.profile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.avatar-mark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(
    135deg,
    rgba(180,154,255,.25),
    rgba(142,207,194,.15)
  );
  font-size: 25px;
  font-weight: 800;
}

.avatar-mark span {
  color: var(--accent);
}

.panel-index {
  font-size: 8px;
  color: var(--subtle);
}

.profile-panel h3 {
  font-size: 22px;
  letter-spacing: -.04em;
}

.profile-role {
  color: var(--muted);
  font-size: 11px;
  margin: 4px 0 20px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tag-list span {
  border: 1px solid var(--line);
  padding: 5px 9px;
  border-radius: 3px;
  color: var(--muted);
  font: 9px "DM Mono", monospace;
}

.profile-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--line);
  margin-top: 25px;
  padding-top: 17px;
}

.profile-foot span {
  font-size: 8px;
  color: var(--subtle);
}

.profile-foot strong {
  font-size: 11px;
}

/* DIGITAL LAB */

.section-lab {
  background: var(--surface);
  border-block: 1px solid var(--line);
}

.heading-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
}

.heading-row .section-heading {
  margin-bottom: 54px;
}

.heading-note {
  color: var(--subtle);
  font-size: 11px;
  line-height: 1.8;
  padding-bottom: 7px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 12px;
}

.tool-card {
  min-height: 260px;
  padding: 23px 20px;
  background: var(--bg);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  transition: transform .25s, border-color .25s;
}

.tool-card:hover {
  transform: translateY(-5px);
  border-color: rgba(180,154,255,.55);
}

.tool-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.tool-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: rgba(180,154,255,.12);
  color: var(--accent);
  font-size: 19px;
}

.tool-type {
  font-size: 7px;
  color: var(--subtle);
}

.tool-number {
  font-size: 8px;
  color: var(--subtle);
  margin-left: auto;
}

.tool-card h3 {
  font-size: 17px;
  letter-spacing: -.04em;
  margin-bottom: 9px;
}

.tool-card p {
  color: var(--muted);
  font-size: 11px;
  line-height: 1.8;
}

.tool-card .card-link {
  margin-top: auto;
  padding-top: 20px;
  font-size: 9px;
}

.tool-card-soon {
  background: linear-gradient(
    145deg,
    var(--bg),
    rgba(180,154,255,.06)
  );
}

.coming-label {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: auto;
  padding-top: 22px;
  color: var(--subtle);
  font: 9px "DM Mono", monospace;
}

/* PROJECTS */

.project-list {
  border-top: 1px solid var(--line);
}

.project-row {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 64px;
  padding: 30px 0;
  border-bottom: 1px solid var(--line);
  align-items: center;
}

.project-visual {
  min-height: 210px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-visual > span {
  font-size: 68px;
  opacity: .8;
}

.project-visual small {
  position: absolute;
  top: 17px;
  left: 18px;
  font: 8px "DM Mono", monospace;
  letter-spacing: .12em;
  color: rgba(255,255,255,.7);
}

.visual-purple {
  background: radial-gradient(
    circle at 50% 40%,
    #544276,
    #201b30 70%
  );
}

.visual-blue {
  background: radial-gradient(
    circle at 50% 40%,
    #365b81,
    #172435 70%
  );
}

.visual-green {
  background: radial-gradient(
    circle at 50% 40%,
    #326b5d,
    #182c2b 70%
  );
}

.swatches {
  position: absolute;
  bottom: 22px;
  display: flex;
  gap: 5px;
}

.swatches i {
  width: 27px;
  height: 27px;
  border-radius: 3px;
  background: #c4a6f3;
}

.swatches i:nth-child(2) {
  background: #7d74bc;
}

.swatches i:nth-child(3) {
  background: #6e9c9b;
}

.swatches i:nth-child(4) {
  background: #e4b8a7;
}

.calc-display {
  position: absolute;
  bottom: 18px;
  right: 22px;
  color: #d8e8fa;
  font: 12px "DM Mono", monospace;
}

.calc-display b {
  font-size: 22px;
  margin-left: 10px;
}

.password-bars {
  position: absolute;
  bottom: 28px;
  display: flex;
  gap: 5px;
}

.password-bars i {
  width: 17px;
  height: 5px;
  background: #a9e4c9;
  border-radius: 3px;
}

.password-bars i:nth-child(1),
.password-bars i:nth-child(2) {
  opacity: .25;
}

.project-details {
  padding-right: 8%;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  color: var(--subtle);
  font-size: 8px;
  margin-bottom: 13px;
}

.project-details h3 {
  font-size: 25px;
  letter-spacing: -.05em;
}

.project-details p {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.9;
  margin: 9px 0 16px;
}

.project-details .text-link {
  margin-top: 17px;
}

.github-callout {
  margin-top: 42px;
  padding: 27px 30px;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  background: linear-gradient(
    100deg,
    rgba(180,154,255,.08),
    transparent 65%
  );
}

.callout-label {
  font-size: 8px;
  color: var(--accent);
}

.github-callout h3 {
  font-size: 18px;
  margin: 7px 0 2px;
}

.github-callout p {
  font-size: 11px;
  color: var(--muted);
}

/* CONTACT */

.contact-section {
  background: var(--surface);
  border-block: 1px solid var(--line);
  text-align: center;
  padding: 105px 0;
}

.contact-inner {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.contact-inner h2 {
  font-size: clamp(42px, 6vw, 68px);
}

.contact-inner > p:not(.section-kicker) {
  max-width: 490px;
  color: var(--muted);
  font-size: 13px;
  margin: 22px 0 28px;
}

.social-links {
  display: flex;
  gap: 26px;
  margin-top: 28px;
}

/* FOOTER */

.site-footer {
  min-height: 105px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.site-footer p {
  color: var(--subtle);
  font-size: 10px;
}

.back-top {
  font-size: 8px;
  color: var(--muted);
}

/* TABLET */

@media (max-width: 900px) {
  .nav-links {
    gap: 20px;
    margin-right: 22px;
  }

  .hero {
    grid-template-columns: 1fr .8fr;
  }

  .hero-art {
    transform: scale(.85);
  }

  .tool-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .about-layout {
    gap: 45px;
  }

  .project-row {
    gap: 35px;
  }
}

/* MOBILE */

@media (max-width: 680px) {
  .shell {
    width: min(100% - 36px,540px);
  }

  .navbar {
    height: 68px;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    background: var(--surface);
    padding: 20px 24px 24px;
    border-bottom: 1px solid var(--line);
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-actions {
    margin-left: auto;
    margin-right: 14px;
  }

  .nav-cta {
    display: none;
  }

  .menu-toggle {
    display: flex;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line);
    background: transparent;
    border-radius: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .menu-toggle span {
    width: 14px;
    height: 1px;
    background: var(--text);
    transition: transform .2s;
  }

  .menu-toggle[aria-expanded="true"] span:first-child {
    transform: translateY(3px) rotate(45deg);
  }

  .menu-toggle[aria-expanded="true"] span:last-child {
    transform: translateY(-3px) rotate(-45deg);
  }

  .hero {
    display: block;
    min-height: 0;
    padding-top: 85px;
    padding-bottom: 105px;
  }

  .hero h1 {
    font-size: clamp(46px,12vw,66px);
  }

  .hero-intro {
    font-size: 13px;
  }

  .hero-art {
    height: 320px;
    margin-top: 32px;
    transform: scale(.88);
  }

  .orbit-one {
    width: 300px;
    height: 170px;
  }

  .orbit-two {
    width: 235px;
    height: 320px;
  }

  .orbit-core {
    width: 145px;
    height: 145px;
  }

  .orbit-core span {
    font-size: 45px;
  }

  .chip-code {
    right: 4px;
    top: 25px;
  }

  .chip-location {
    left: 0;
    bottom: 45px;
  }

  .hero-scroll {
    bottom: 30px;
  }

  .strip-inner {
    overflow: hidden;
    justify-content: flex-start;
    gap: 16px;
    white-space: nowrap;
    min-height: 55px;
  }

  .strip-inner span {
    font-size: 8px;
  }

  .section {
    padding-top: 82px;
    padding-bottom: 82px;
  }

  .section-heading {
    margin-bottom: 35px;
  }

  .section-heading h2 {
    font-size: 42px;
  }

  .about-layout {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .about-copy p {
    font-size: 13px;
  }

  .heading-row {
    display: block;
  }

  .heading-row .section-heading {
    margin-bottom: 12px;
  }

  .heading-note {
    margin-top: 15px;
  }

  .tool-grid {
    gap: 9px;
  }

  .tool-card {
    padding: 17px 14px;
    min-height: 255px;
  }

  .tool-top {
    gap: 7px;
    margin-bottom: 22px;
  }

  .tool-type {
    font-size: 6px;
  }

  .tool-card h3 {
    font-size: 15px;
  }

  .tool-card p {
    font-size: 10px;
  }

  .project-row {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 22px 0;
  }

  .project-visual {
    min-height: 185px;
  }

  .project-details {
    padding: 0;
  }

  .github-callout {
    align-items: flex-start;
    flex-direction: column;
    padding: 23px;
  }

  .contact-section {
    padding: 82px 0;
  }

  .contact-inner h2 {
    font-size: 44px;
  }

  .site-footer {
    padding-top: 24px;
    padding-bottom: 24px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .site-footer p {
    order: 3;
  }
}

/* SMALL MOBILE */

@media (max-width: 390px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    min-height: 220px;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .hero-art {
    margin-inline: -18px;
    transform: scale(.78);
  }

  .availability {
    font-size: 8px;
  }
}

/* ACCESSIBILITY */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}

/* SCROLL REVEAL */

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .65s ease, transform .65s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
}
