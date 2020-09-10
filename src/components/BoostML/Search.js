import React from 'react';
import { Button } from 'reactstrap';
import { Form, Field } from 'components/Form';

const SearchForm = ({ formState, onSubmit, validationSchema }) => (
  <Form
    enableReinitialize={true}
    initialValues={formState}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    className="d-flex justify-content-center"
  >
    <Field name="q" />
    <Button color="primary align-self-start ml-4 form-control-lg">Search</Button>
  </Form>
);

export default SearchForm;
