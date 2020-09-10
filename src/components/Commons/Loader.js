import React from 'react';
import { Container, Row, Spinner } from 'reactstrap';

const Loader = props => (
  <Container fluid className={!props || !props.inline ? 'h-100 d-flex' : ''}>
    <Row className="justify-content-center align-self-center w-100 text-center">
      <Spinner color="primary" />
    </Row>
  </Container>
);

export default Loader;
