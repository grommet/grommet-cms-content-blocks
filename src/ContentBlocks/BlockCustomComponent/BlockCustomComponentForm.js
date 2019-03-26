import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

class BlockCustomComponentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customComponent: props.customComponent || '',
      meta: {},
      content: props.content || '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state);
    }
  }

  onChange = (event) => {
    const { target, option } = event;
    const key = target.id;
    const val = option && option.value || target.value;
    const label = option && option.label || target.label;
    this.setState({
      [key]: val,
      content: label,
    });
  }

  validateForm = () => {
    const { customComponent } = this.state;
    if (customComponent !== '') {
      return true;
    }
    return false;
  }

  render() {
    const { content } = this.state;
    const submit = this.validateForm() ? this.onSubmit : undefined;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Custom Component" htmlFor="customComponent">
                <Select
                  id="customComponent"
                  name="customComponent"
                  inline={false}
                  options={[
                    { label: 'Merchandise Site Selector', value: 'MerchandiseSiteSelector' },
                  ]}
                  onChange={this.onChange}
                  value={content || 'Select Component'}
                />
              </FormField>
            </fieldset>
            <Button
              onClick={submit}
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

BlockCustomComponentForm.propTypes = {
  customComponent: PropTypes.string,
  content: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default BlockCustomComponentForm;
