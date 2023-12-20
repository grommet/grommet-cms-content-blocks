import React, { Component, PropTypes } from "react";
import Box from "grommet/components/Box";
import Form from "grommet/components/Form";
import FormFields from "grommet/components/FormFields";
import FormField from "grommet/components/FormField";
import Button from "grommet/components/Button";
import Select from "grommet/components/Select";

export class Heading2Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || "",
      size: props.size || "Medium",
      strong: props.strong || "False",
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange({ target, option }) {
    const key = target.id;
    const val = option || target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { content, strong, size } = this.state;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Content" htmlFor="content">
                <textarea
                  id="content"
                  name="content"
                  type="text"
                  value={content}
                  onChange={this._onChange}
                  rows="3"
                />
              </FormField>
              <FormField label="Size" htmlFor="size">
                <Select
                  id="size"
                  inline={false}
                  options={["Small", "Medium", "Large", "Xlarge"]}
                  value={size}
                  onChange={this._onChange}
                />
              </FormField>
              <FormField label="Strong" htmlFor="strong">
                <Select
                  id="strong"
                  inline={false}
                  options={["True", "False"]}
                  value={strong}
                  onChange={this._onChange}
                />
              </FormField>
            </fieldset>
            <Button
              onClick={this._onSubmit}
              primary={false}
              type="submit"
              label="Done"
            />
          </FormFields>
        </Form>
      </Box>
    );
  }
}

Heading2Form.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Heading2Form;
