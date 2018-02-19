import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Modal,
  ControlLabel,
  ButtonGroup,
  Button
} from 'react-bootstrap';

class NewEntityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: []
    };
  }

  addField(name, value) {
    const { fields } = this.state;
    fields[name] = value;
    this.setState({
      fields: fields
    });
  }

  onAddEntity() {
    this.props.onAddEntity(this.state.fields, this.refs.entityName.getValue());
  }

  onSubmit() {
    const name = this.refs.fieldName.getValue();
    const value = this.refs.fieldValue.getValue();

    fields[name] = value;
    this.setState(
      {
        fields: fields
      },
      this.onAddEntity
    );
  }

  onAddButtonClick() {
    const name = this.refs.fieldName.getValue();
    const value = this.refs.fieldValue.getValue();
    this.addField(name, value);
  }

  renderExistingFields() {
    const existingFields = this.state.fields;
    return fields.keys.map(key => (
      <FormControl.Static>
        {key}: {existingFields[key]}
      </FormControl.Static>
    ));
  }

  render() {
    const shouldRenderName = this.props.shouldRenderName || false;
    return (
      <Form>
        {shouldRenderName ? (
          <FormGroup>
            <ControlLabel>Entity Name</ControlLabel>
            <FormControl type="text" ref="entityName" />
          </FormGroup>
        ) : null}
        {this.renderExistingFields()}
        <FormGroup>
          <ControlLabel>Field Name</ControlLabel>
          <FormControl type="text" ref="fieldName" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Value</ControlLabel>
          <FormControl type="number" ref="fieldValue" />
        </FormGroup>
        <ButtonGroup>
          <Button onClick={this.onAddButtonClick}>One more</Button>
          <Button onClick={this.onSubmit}>Finish entity</Button>
        </ButtonGroup>
      </Form>
    );
  }
}

export default NewEntityForm;
