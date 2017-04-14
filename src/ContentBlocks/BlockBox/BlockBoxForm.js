/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import colorOptionsList from '../Shared/colorIndexes';

type ErrorType = string;

type BlockBoxFormState = {
  alignInput: ?string,
  colorIndexInput: ?string,
  contentInput: ?string,
  colorOptions: Array<any>,
  errors: ?{
    colorIndexInput: ?ErrorType,
    contentInput: ?ErrorType
  }
};

type BlockBoxFormProps = {
  onSubmit?: Function,
  align: ?string,
  colorIndex: ?string,
  content: ?string
};

export default class BlockBoxForm extends React.Component {
  state: BlockBoxFormState;
  props: BlockBoxFormProps;
  constructor(props: BlockBoxFormProps) {
    super(props);
    (this:any).onChange = this.onChange.bind(this);
    (this:any).onSubmit = this.onSubmit.bind(this);
    (this:any).onSearch = this.onSearch.bind(this);
    (this:any).formIsValid = this.formIsValid.bind(this);
    let alignInput = 'center';
    let colorIndexInput = '';
    let contentInput = '';
    const { align, colorIndex, content } = props;
    if (align) {
      alignInput = align;
    }
    if (colorIndex) {
      colorIndexInput = colorIndex;
    }
    if (content) {
      contentInput = content;
    }
    this.state = {
      errors: null,
      alignInput,
      colorIndexInput,
      contentInput,
      colorOptions: colorOptionsList,
    };
  }

  onChange({ target, option }: any) {
    if (option) {
      this.setState({
        [`${target.id}`]: option,
        errors: this.state.colorIndexInput
          ? null
          : this.state.errors,
      });
    } else {
      this.setState({
        [`${target.id}`]: target.value,
        errors: this.state.contentInput
          ? null
          : this.state.errors,
      });
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const { alignInput, colorIndexInput, contentInput } = this.state;
    if (this.formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        align: alignInput,
        colorIndex: colorIndexInput,
        content: contentInput,
      });
    } else {
      const errors = {
        colorIndexInput: colorIndexInput && colorIndexInput.length > 0
          ? '' : 'Please enter a valid color index',
        contentInput: contentInput && contentInput.length > 0
          ? '' : 'Please enter some content',
        alignInput: alignInput && alignInput.length > 0
          ? '' : 'Please enter an align content value',
      };
      this.setState({
        errors,
      });
    }
  }

  onSearch(e: any) {
    const { colorOptions } = this.state;
    const { value } = e.target;
    const newOptions = value === '' || !value
      ? colorOptionsList
      : colorOptions.filter(i => i.includes(value));
    this.setState({
      colorOptions: newOptions,
    });
  }

  formIsValid() {
    const { alignInput, colorIndexInput, contentInput } = this.state;
    if (alignInput && colorIndexInput && contentInput) {
      return alignInput.length > 0
        && colorIndexInput.length > 0
        && contentInput.length > 0;
    }
    return false;
  }

  render() {
    const {
      alignInput,
      colorIndexInput,
      contentInput,
      errors,
      colorOptions,
    } = this.state;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Content"
                htmlFor="contentInput"
                error={errors && errors.contentInput ? errors.contentInput : ''}
              >
                <textarea
                  id="contentInput"
                  name="contentInput"
                  type="text"
                  value={contentInput}
                  onChange={this.onChange}
                  rows="10"
                />
              </FormField>
              <FormField
                label="Color Index"
                htmlFor="colorIndexInput"
                help="The color index for the box.  See: https://grommet.github.io/docs/color"
                error={errors && errors.colorIndexInput ? errors.colorIndexInput : ''}
              >
                <Select
                  onSearch={this.onSearch}
                  onChange={this.onChange}
                  value={colorIndexInput || ''}
                  options={colorOptions}
                  name="colorIndexInput"
                  id="colorIndexInput"
                />
              </FormField>
              <FormField
                label="Align Content"
                htmlFor="alignInput"
                error={errors && errors.alignInput ? errors.alignInput : ''}
              >
                <Select
                  onChange={this.onChange}
                  value={alignInput || 'center'}
                  options={[
                    'center',
                    'end',
                    'start',
                  ]}
                  name="alignInput"
                  id="alignInput"
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

