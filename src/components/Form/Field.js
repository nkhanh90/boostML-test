import React from 'react';
import PropTypes from 'prop-types';
import { Input as RsInput, Label, FormText, Col } from 'reactstrap';
import uuid from 'uuid/v4';
import Feedback from './Feedback';
import FormGroup from './FormGroup';
import Input from './Input';
import styled from 'styled-components';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const Field = ({
  helpMessage,
  label,
  labelHidden,
  inputClass,
  labelClass,
  name: id,
  size,
  disabled,
  readOnly,
  grid,
  labelAttrs,
  groupAttrs,
  groupClassName,
  ...attributes
}) => {
  let row = false;
  const inputId = attributes.id || uuid();
  const col = {};
  const labelCol = {};

  if (grid) {
    colSizes.forEach(colSize => {
      if (grid[colSize]) {
        row = true;
        const sizeNum = parseInt(grid[colSize], 10);
        col[colSize] = sizeNum;
        labelCol[colSize] = 12 - sizeNum;
      }
    });
  }
  const input = (
    <Input
      name={id}
      id={inputId}
      className={inputClass + ' form-control-lg'}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      {...attributes}
    />
  );

  const help = helpMessage ? <FormText>{helpMessage}</FormText> : null;
  const inputRow = row ? (
    <Col {...col}>
      {input}
      <Feedback name={id} />
      {help}
    </Col>
  ) : (
    input
  );
  const check = attributes.type === 'checkbox';
  const select = attributes.type === 'select';

  return (
    <FormGroupStyle
      for={id}
      check={check}
      disabled={disabled}
      row={row}
      {...groupAttrs}
      className={`${select ? 'form-group-select' : ''} ${groupClassName ? groupClassName : ''}`}
    >
      {check && inputRow}
      {label && (
        <Label for={inputId} className={labelClass} hidden={labelHidden} size={size} {...labelCol} {...labelAttrs}>
          {label}
        </Label>
      )}
      {!check && inputRow}
      {!row && <Feedback name={id} />}
      {!row && help}
    </FormGroupStyle>
  );
};
const FormGroupStyle = styled(FormGroup)`
  &.form-check label {
    font-family: AudiTypeExtended, Verdana, Geneva, sans-serif !important;
    font-size: 15px !important;
  }
  &.white select.form-control {
    background: #fff;
  }

  &.form-group-select {
    position: relative;
    :after {
      vertical-align: 0.255em;
      content: '';
      border: solid !important;
      border-width: 0 2px 2px 0 !important;
      display: inline-block;
      padding: 3px;
      transform: rotate(45deg);
      position: absolute;
      bottom: 18px;
      right: 30px;
    }
    &.text-danger:after {
      bottom: 40px;
    }
  }
`;
Field.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  helpMessage: PropTypes.node,
  labelAttrs: PropTypes.object,
  groupAttrs: PropTypes.object,
  grid: PropTypes.object,
};

Field.defaultProps = {
  tag: RsInput,
};

export default Field;
