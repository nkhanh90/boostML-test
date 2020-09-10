import React /* useEffect */ from 'react';
import PropTypes from 'prop-types';
import { Form as RsForm } from 'reactstrap';
import { Formik, Form as FForm } from 'formik';

// const ErrorFocus = ({ errors }) => {
//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       Object.keys(errors).forEach(item => {
//         const el = document.querySelector(`input[name="${item}"]`);
//         if (el) {
//           el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
//           return;
//         }
//       });
//     }
//   }, [errors]);
//   return '';
// };

const Form = ({
  enableReinitialize,
  initialValues,
  onSubmit,
  initialStatus,
  initialErrors,
  initialTouched,
  onReset,
  validationSchema,
  validate,
  children,
  ...rest
}) => {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onReset={onReset}
      initialStatus={initialStatus}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      validationSchema={validationSchema}
      validate={validate}
    >
      {({ errors }) => {
        return (
          <RsForm data-testid="form-container" tag={FForm} {...rest}>
            {children}
            {/* <ErrorFocus errors={errors} /> */}
          </RsForm>
        );
      }}
    </Formik>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  initialStatus: PropTypes.any,
  initialErrors: PropTypes.object,
  initialTouched: PropTypes.object,
  validationSchema: PropTypes.object,
  validate: PropTypes.func,
  children: PropTypes.node,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
