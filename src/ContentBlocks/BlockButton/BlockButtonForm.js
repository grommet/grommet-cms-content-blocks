/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

type State = {
  labelInput: ?string,
  primaryInput: ?string,
  pathInput: ?string,
};

type Props = {
  onSubmit?: Function,
  label?: string,
  primary?: boolean,
  path?: string,
};

export default class BlockColorSwatchForm extends React.Component {
  constructor(props: Props) {
    super(props);
    (this:any).onChange = this.onChange.bind(this);
    (this:any).onSubmit = this.onSubmit.bind(this);
    (this:any).formIsValid = this.formIsValid.bind(this);
    const { path, primary, label } = props;
    const labelInput = label || '';
    const primaryInput = primary ? 'True' : 'False';
    const pathInput = path || '';
    this.state = {
      labelInput,
      primaryInput,
      pathInput,
    };
  }

  state: State;

  onChange({ target, option }: any) {
    if (option) {
      this.setState({
        [`${target.id}`]: option,
      });
    } else {
      this.setState({
        [`${target.id}`]: target.value,
      });
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const { pathInput, labelInput, primaryInput } = this.state;
    if (this.formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        path: pathInput,
        label: labelInput,
        primary: primaryInput === 'True',
      });
    }
  }

  props: Props;

  formIsValid() {
    const { pathInput, labelInput } = this.state;
    if (pathInput && labelInput) {
      return pathInput.length > 0 && labelInput.length > 0;
    }
    return false;
  }

  render() {
    const {
      labelInput,
      primaryInput,
      pathInput,
    } = this.state;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Label"
                htmlFor="labelInput"
              >
                <input
                  id="labelInput"
                  name="labelInput"
                  type="text"
                  value={labelInput}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField
                label="Path"
                htmlFor="pathInput"
              >
                <input
                  id="pathInput"
                  name="pathInput"
                  type="text"
                  value={pathInput}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField
                label="Primary"
                htmlFor="primaryInput"
                help="Should the button be the primary button on the page?"
              >
                <Select
                  onChange={this.onChange}
                  value={primaryInput || ''}
                  options={['True', 'False']}
                  name="primaryInput"
                  id="primaryInput"
                />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad="medium">
            <Button
              onClick={this.onSubmit}
              type="submit"
              label="Done"
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

