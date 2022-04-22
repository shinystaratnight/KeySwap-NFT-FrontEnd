import React from 'react'

import { GridContainer } from 'components/Grid'

import * as Element from "./styles";

const PageHeader = (props) => {

  const { title } = props

  return (
    <Element.Header>
      <GridContainer>
        <Element.PageTitle>
          { title }
        </Element.PageTitle>
      </GridContainer>
    </Element.Header>
  )
}

export default PageHeader
