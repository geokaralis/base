import React from 'react'
import styled from 'styled-components'

interface HeroProps {
  big?: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-itemss: center;
  gap: 16px;
`

const Title = styled.h1<HeroProps>`
  margin: 0;
  font-size: 24px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  color: ${props => props.big ? "red" : "green"};

  ${Wrapper} & {
    color: yellow;
    font-size: 60px;
  }
`

const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  font-family: 'Inter', sans-serif;
`

const Aside = styled.aside`

`

const Hero = ({
  big
}: HeroProps): JSX.Element => {
  return (
    <>
    <Wrapper>
      <Title>Base</Title>
      <Paragraph>Shared build system between React projects.</Paragraph>
    </Wrapper>
    <Aside>
      <Title big>Base</Title>
      <Title>Base</Title>
    </Aside>
    </>
  )
}

export const App = () => {
  return <Hero big />
}
