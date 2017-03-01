/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import ColorTypeList from './internal/ColorTypeList';

type BlockColorSwatchFormState = {
  cmykInput: string,
  crownFoilInput: string,
  error: ?string,
  hexInput: string,
  nameInput: string,
  pmsInput: string,
  rgbInput: string,
  thumbColorInput: string,
};

type BlockColorSwatchFormProps = {
  onSubmit?: Function,
  color?: {
    cmyk: ?string,
    crownFoil: ?string,
    hex: ?string,
    name: string,
    pms: ?string,
    rgb: ?string,
    thumbColor: string,
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
    let cmykInput = '';
    let crownFoilInput = '';
    let pmsInput = '';
    let rgbInput = '';
    let thumbColorInput = '#01a982';
    let hexInput = '';
    const { color } = props;
    if (color) {
      if (color.cmyk) cmykInput = color.cmyk;
      if (color.crownFoil) crownFoilInput = color.crownFoil;
      if (color.hex) hexInput = color.hex;
      if (color.name) nameInput = color.name;
      if (color.pms) pmsInput = color.pms;
      if (color.rgb) rgbInput = color.rgb;
      if (color.thumbColor) thumbColorInput = color.thumbColor;
    }

    this.state = {
      cmykInput,
      crownFoilInput,
      error: null,
      hexInput,
      nameInput,
      pmsInput,
      rgbInput,
      thumbColorInput
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
      cmykInput, crownFoilInput, hexInput, nameInput, pmsInput, rgbInput, thumbColorInput
    } = this.state;
    if (this._formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        color: {
          cmyk: cmykInput,
          crownFoil: crownFoilInput,
          hex: hexInput,
          name: nameInput,
          pms: pmsInput,
          rgb: rgbInput,
          thumbColor: thumbColorInput
        }
      });
    } else {
      this.setState({
        error: 'Please enter values for all fields.'
      });
    }
  }

  _formIsValid() {
    const hexRE = /(0x)?[0-9a-f]+/i;
    const { 
      cmykInput, crownFoilInput, hexInput, nameInput, pmsInput, rgbInput, thumbColorInput
    } = this.state;
    let hasColor = (cmykInput || hexInput || rgbInput || crownFoilInput || pmsInput)
      ? true
      : false;

    if (hexInput) {
      const hexValue = hexInput.replace('#', '');
      hasColor = hexRE.test(hexValue);
    }

    return nameInput && hasColor && thumbColorInput;
  }

  render() {
    const {
      cmykInput,
      crownFoilInput,
      error,
      hexInput,
      nameInput,
      pmsInput,
      rgbInput,
      thumbColorInput
    } = this.state;

    const errorBox = (error)
      ? <Box style={{ color: 'red' }} pad={{ vertical: 'small' }}>{error}</Box>
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
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
                label="CMYK"
                htmlFor="cmykInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={cmykInput}
                  name="cmykInput"
                  id="cmykInput"
                  placeHolder="80 / 0 / 60 / 0"
                />
              </FormField>
              <FormField
                label="Hex"
                htmlFor="hexInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={hexInput}
                  name="hexInput"
                  id="hexInput"
                  placeHolder="#01a982"
                />
              </FormField>
              <FormField
                label="RGB"
                htmlFor="rgbInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={rgbInput}
                  name="rgbInput"
                  id="rgbInput"
                  placeHolder="1 / 169 / 130"
                />
              </FormField>
              <FormField
                label="Pantone Swatch"
                htmlFor="pmsInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={pmsInput}
                  name="pmsInput"
                  id="pmsInput"
                  placeHolder="10297C"
                />
              </FormField>
              <FormField
                label="Crown Foil"
                htmlFor="crownFoilInput"
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={crownFoilInput}
                  name="crownFoilInput"
                  id="crownFoilInput"
                  placeHolder="851"
                />
              </FormField>
              <FormField
                label="Color"
                help="Tap the color block to select the thumbnail color"
                htmlFor="thumbColorInput"
              >
                <Box pad="medium" align="center">
                  <input
                    onChange={this._onChange}
                    style={{ width: 150, height: 40, padding: 0 }}
                    value={thumbColorInput}
                    id="thumbColorInput"
                    name="thumbColorInput"
                    type="color"
                  />
                  <ColorTypeList
                    color={{
                      cmyk: cmykInput,
                      hex: hexInput,
                      name: nameInput,
                      rgb: rgbInput,
                      pms: pmsInput,
                      crownFoil: crownFoilInput,
                      thumbColor: thumbColorInput
                    }}
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

