import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonGroup,
  Button
} from 'react-bootstrap';

class NewEntityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {}
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onAddEntity = this.onAddEntity.bind(this);
    this.addField = this.addField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addField(name, value) {
    const fields = { ...this.state.fields };
    fields[name] = value;
    this.setState({
      fields
    });
  }

  onAddEntity() {
    this.setState({
      fields: {}
    });

    this.props.onAddEntity(
      this.state.fields,
      this.refs.entityName && this.refs.entityName.value
    );
  }

  onSubmit() {
    const name = this.refs.fieldName.value;
    const value = this.refs.fieldValue.value;

    const fields = { ...this.state.fields };

    fields[`${name}`] = value;
    this.setState(
      {
        fields
      },
      this.onAddEntity
    );
  }

  onAddButtonClick() {
    const name = this.refs.fieldName.value;
    const value = this.refs.fieldValue.value;
    console.log('name, value', name, value);
    const fields = { ...this.state.fields };
    fields[`${name}`] = value;
    console.log('NEW FIELDS', fields);
    this.setState({
      fields: fields
    });
  }

  renderExistingFields() {
    const existingFields = this.state.fields;

    const fieldNames = Object.keys(existingFields);

    return fieldNames.map(key => (
      <FormControl.Static key={key}>
        {key}: {existingFields[key]}
      </FormControl.Static>
    ));
  }

  render() {
    const shouldRenderName = this.props.shouldRenderName || false;
    const fields = this.state.fields;
    return (
      <div>
        {shouldRenderName ? (
          <FormGroup>
            <ControlLabel>Entity Name: </ControlLabel>
            <input className="form-control" type="text" ref="entityName" />
          </FormGroup>
        ) : null}
        {this.renderExistingFields()}
        <FormGroup>
          <ControlLabel>Field Name: </ControlLabel>
          <input className="form-control" type="text" ref="fieldName" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Value: </ControlLabel>
          <input className="form-control" type="number" ref="fieldValue" />
        </FormGroup>
        <ButtonGroup>
          <Button onClick={this.onAddButtonClick}>One more</Button>
          <Button onClick={this.onSubmit}>Finish entity</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default NewEntityForm;
