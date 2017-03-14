/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import RadioButton from 'grommet/components/RadioButton';
import validation from './validation';

export type AssetType = 'path' | 'href';
export type ButtonType = 'Button' | 'Anchor';

type State = {
  labelInput: ?string,
  primaryInput: ?string,
  pathInput: ?string,
  hrefInput: ?string,
  buttonTypeInput: ?string,
  assetTypeInput: AssetType,
  error: {
    labelInput: ?string,
    pathInput: ?string,
    hrefInput: ?string,
  }
};

type Props = {
  onSubmit?: Function,
  label?: string,
  children?: React$Element<any>, // eslint-disable-line
  primary?: boolean,
  buttonType?: ButtonType,
  href?: string,
  assetType?: AssetType,
  path?: string,
  asset?: {
    path?: string,
  }
};

export default class BlockButtonForm extends React.Component {
  constructor(props: Props) {
    super(props);
    (this:any).onChange = this.onChange.bind(this);
    (this:any).onSubmit = this.onSubmit.bind(this);
    (this:any).formIsValid = this.formIsValid.bind(this);
    (this:any).onChangeAssetType = this.onChangeAssetType.bind(this);
    const { path, primary, label, buttonType, href, assetType } = props;
    const labelInput = label || '';
    const primaryInput = primary ? 'True' : 'False';
    const buttonTypeInput = buttonType || 'Button';
    const pathInput = path || '';
    const hrefInput = href || '';
    this.state = {
      labelInput,
      primaryInput,
      pathInput,
      buttonTypeInput,
      hrefInput,
      assetTypeInput: assetType || 'path',
      error: {
        labelInput: null,
        pathInput: null,
        hrefInput: null,
      },
    };
  }

  state: State;

  componentWillReceiveProps({ asset }: Props) {
    if (asset && asset.path !== this.state.pathInput) {
      this.setState({
        pathInput: asset.path,
      });
    }
  }

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

  onChangeAssetType() {
    const { assetTypeInput } = this.state;
    let newType = 'href';
    if (assetTypeInput === 'href') {
      newType = 'path';
    }
    this.setState({
      assetTypeInput: newType,
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const {
      pathInput,
      buttonTypeInput,
      labelInput,
      primaryInput,
      hrefInput,
      assetTypeInput,
    } = this.state;
    if (this.formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        path: pathInput,
        href: hrefInput,
        buttonType: buttonTypeInput,
        assetType: assetTypeInput,
        label: labelInput,
        primary: primaryInput === 'True',
      });
    }
  }

  props: Props;

  formIsValid() {
    const { pathInput, labelInput, hrefInput, assetTypeInput } = this.state;
    const hrefInputError = validation.validUrl(hrefInput) === true
      ? null
      : 'Please enter a valid url, containing a protocol such as http://';
    const pathInputError = validation.validLength(pathInput)
      ? null
      : 'Please enter a valid path';
    const labelInputError = validation.validLength(labelInput)
      ? null
      : 'Please enter a valid label';
    this.setState({
      error: {
        hrefInput: hrefInputError,
        pathInput: pathInputError,
        labelInput: labelInputError,
      },
    });
    if (assetTypeInput === 'path') {
      return pathInputError === null && labelInputError === null;
    }
    return hrefInputError === null && labelInputError === null;
  }

  render() {
    const { children } = this.props;
    const {
      labelInput,
      primaryInput,
      pathInput,
      buttonTypeInput,
      assetTypeInput,
      hrefInput,
      error,
    } = this.state;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Label"
                error={error.labelInput}
                help="Enter a label that will appear on the button"
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
                error={assetTypeInput === 'path' ? error.pathInput : error.hrefInput}
                help={assetTypeInput === 'path'
                  ? 'Enter a path to an internal asset, such as /uploads/image.png'
                  : 'Enter a url to an external site, such as http://google.com/image.png'}
                label="Link"
                htmlFor={assetTypeInput === 'path' ? 'pathInput' : 'hrefInput'}
              >
                {assetTypeInput === 'path' ?
                  <input
                    id="pathInput"
                    name="pathInput"
                    type="text"
                    value={pathInput}
                    onChange={this.onChange}
                  />
                :
                  <input
                    id="hrefInput"
                    name="hrefInput"
                    type="text"
                    value={hrefInput}
                    onChange={this.onChange}
                  />
                }
              </FormField>
              <FormField
                label="Asset Link Type"
                help="What type of asset should the button link to?"
              >
                <Box direction="row" pad={{ vertical: 'small', horizontal: 'medium' }}>
                  <RadioButton
                    id="internal"
                    label="Internal Asset"
                    checked={(assetTypeInput === 'path')}
                    onChange={this.onChangeAssetType}
                    name="internal"
                  />
                  <RadioButton
                    id="external"
                    checked={(assetTypeInput !== 'path')}
                    label="External URL"
                    onChange={this.onChangeAssetType}
                    name="external"
                  />
                </Box>
              </FormField>
              <FormField
                label="Button Type"
                htmlFor="buttonTypeInput"
                help="What type of button would you like to use?  Button or Anchor?"
              >
                <Select
                  onChange={this.onChange}
                  value={buttonTypeInput || ''}
                  options={['Button', 'Anchor']}
                  name="buttonTypeInput"
                  id="buttonTypeInput"
                />
              </FormField>
              <FormField
                label="Primary"
                htmlFor="primaryInput"
                help={buttonTypeInput === 'Anchor'
                  ? 'Should the anchor have the arrow icon in front of it?'
                  : 'Should the button be filled in with the brand color?'
                }
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
            {assetTypeInput === 'path' && children && children}
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

