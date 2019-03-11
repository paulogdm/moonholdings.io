import React from 'react'

import { Astronaut } from '../components'
import { AboutContainer, TeamImages, TeamImg, TeamDiv, TeamSocial } from '../styles'
import { MOON_HOLDINGS } from '../shared/constants/copy'

class About extends React.Component {
  render() {
    return (
      <div>
        <AboutContainer>
          <h1>The Futuratum Team</h1>
          <p>Futuratum is about building, playing and exploring possibilities within the nascent cryptocurrency space.</p>
          <p>Questions we ask ourselves everyday: What is worth building? What are the possible emerging trends? What fintech solutions could help people best? How could we gamify finance and building wealth?</p>
          <TeamImages>
            <TeamDiv>
              <TeamImg src="static/team/leon.png" alt="Leon Gaban"/>
              <h4>Leon Gaban</h4>
              <h4>Founder</h4>
              <TeamSocial>
                <a href="https://twitter.com/leongaban" target="_blank" title="Leon on Twitter">
                  <img src="static/twitter.png" alt="Leon's Twitter"/>
                </a>
                <a href="https://github.com/leongaban" target="_blank" title="Leon's Github">
                  <img src="static/github.png" alt="Leon's Github"/>
                </a>
              </TeamSocial>
              <p>Leon Is a UI developer who comes from a design background, a self-taught coder with a passion for educating people about cryptocurrencies.</p>
            </TeamDiv>
            <TeamDiv>
              <TeamImg src="static/team/paulo.png" alt="Paulo Darocha"/>
              <h4>Paulo Darocha</h4>
              <h4>Co-Founder</h4>
              <TeamSocial>
                <a href="https://github.com/prochafilho" target="_blank" title="Paulo's Github">
                  <img src="static/github.png" alt="Paulo's Github"/>
                </a>
              </TeamSocial>
              <p>Paulo is a self-taught full-stack programmer, with a passion for coding, math, teaching code and constant learning.</p>
            </TeamDiv>
          </TeamImages>
          <p>Our first product is <span>{MOON_HOLDINGS}</span>, a web UI based cryptocurrency portfolio tracker. And we have a roadmap to introduce user accounts and adding gamified ranking elements to growing your crypto wealth.</p>
        </AboutContainer>
        <Astronaut showLogo={true}/>
      </div>
    )
  }
};

export default About;
