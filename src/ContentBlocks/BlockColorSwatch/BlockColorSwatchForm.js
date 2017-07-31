/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { MarkdownHelpButton } from '../Shared';

type BlockColorSwatchFormState = {
  error: ?string,
  nameInput: string,
  contentInput: string,
  thumbColorInput: string,
};

type BlockColorSwatchFormProps = {
  onSubmit?: Function,
  color?: {
    name: string,
    thumbColor: string,
    content: string,
  }
};

export default class BlockColorSwatchForm extends React.Component {
  state: BlockColorSwatchFormState;
  props: BlockColorSwatchFormProps;
  constructor(props: BlockColorSwatchFormProps) {
    super(props);
    (this:any)._onChange = this._onChange.bind(this);
    (this:any)._onSubmit = this._onSubmit.bind(this);
    (this:any)._formIsValid = this._formIsValid.bind(this);
    let nameInput = '';
    let thumbColorInput = '#01a982';
    let contentInput = '';
    const { color } = props;
    if (color) {
      if (color.name) nameInput = color.name;
      if (color.thumbColor) thumbColorInput = color.thumbColor;
      if (color.content) contentInput = color.content;
    }

    this.state = {
      error: null,
      nameInput,
      thumbColorInput,
      contentInput
    };
  }
  
  _onChange({ target }: any) {
    this.setState({
      [`${target.id}`]: target.value,
      error: this.state.nameInput
        ? null
        : this.state.error
    });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    const { 
      contentInput, nameInput, thumbColorInput
    } = this.state;
    if (this._formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        color: {
          name: nameInput,
          thumbColor: thumbColorInput,
          content: contentInput
        }
      });
    } else {
      this.setState({
        error: 'Please enter values for all fields.'
      });
    }
  }

  _formIsValid() {
    const { 
      contentInput, nameInput, thumbColorInput
    } = this.state;

    return nameInput && thumbColorInput && contentInput;
  }

  render() {
    const {
      error,
      nameInput,
      thumbColorInput,
      contentInput,
    } = this.state;

    const errorBox = (error)
      ? <Box style={{ color: 'red' }} pad={{ vertical: 'small' }}>{error}</Box>
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <MarkdownHelpButton />
          <FormFields>
            <fieldset>
              <FormField
                label="Color Name"
                htmlFor="nameInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={nameInput}
                  name="nameInput"
                  id="nameInput"
                  placeHolder="HPE Green"
                />
              </FormField>
              <FormField
                label="Markdown Content"
                htmlFor="contentInput"
              >
                <textarea
                  onChange={this._onChange}
                  value={contentInput}
                  name="contentInput"
                  id="contentInput"
                  rows="4"
                  placeholder="Hex #01a982"
                />
              </FormField>
              <FormField
                label="Thumbnail Color"
                help="Tap the color block to select the thumbnail color"
                htmlFor="thumbColorInput"
              >
                <Box pad={{ vertical: 'small', horizontal: 'medium' }} align="start">
                  <input
                    onChange={this._onChange}
                    style={{ width: 150, height: 40, padding: 0 }}
                    value={thumbColorInput}
                    id="thumbColorInput"
                    name="thumbColorInput"
                    type="color"
                  />
                </Box>
              </FormField>
            </fieldset>
          </FormFields>
          <Footer
            pad={{ vertical: 'medium' }}
            direction="column"
            align="start"
          >
            {errorBox}
            <Button
              onClick={this._onSubmit}
              type="submit"
              label="Done"
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

