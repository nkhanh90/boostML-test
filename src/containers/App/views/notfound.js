import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const NotFoundPage = () => (
  <Div className="text-center">
    <h1 className="display-1 font-weight-bold">404</h1>
    <p className="h1">ASOS</p>
    <p className="h2 font-weight-normal mt-3 mb-4">Sorry, we can't find that page or something has gone wrong ...</p>
    <Link to="/">
      <Button color="primary" size="lg">
        Return to website
      </Button>
    </Link>
  </Div>
);

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export default NotFoundPage;
