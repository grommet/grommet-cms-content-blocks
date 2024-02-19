/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import CheckBox from "grommet/components/CheckBox";
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import RadioButton from 'grommet/components/RadioButton';
import validation from './validation';
import type { OnChangeEvent } from '../../types';
import iconMap from './iconMap';

export type AssetType = 'path' | 'href';
export type ButtonType = 'Button' | 'Anchor';
export type Primary = 'True' | 'False';
export type IconType =
  'primary' |
  'email' |
  'chat' |
  'share' |
  'attachment' |
  'word' |
  'zip' |
  'document download' |
  'download' |
  'play' |
  'print';

type State = {
  label: ?string,
  primary: ?Primary,
  path: ?string,
  href: ?string,
  newTab: ?boolean,
  buttonType: ?string,
  assetType: AssetType,
  icon?: IconType,
  error: {
    label: ?string,
    path: ?string,
    href: ?string,
  }
};

// Weird issue with unwrapping props.data || props, showing unused props.
// Disable for now.
/* eslint-disable react/no-unused-prop-types */
type Props = {
  pad?: boolean,
  onSubmit?: Function,
  onChange?: Function,
  label?: string,
  children?: React$Element<any>, // eslint-disable-line
  primary?: Primary,
  buttonType?: ButtonType,
  icon?: IconType,
  href?: string,
  newTab?: boolean,
  assetType?: AssetType,
  path?: string,
  asset?: {
    path?: string,
  },
  data?: Object
};
/* eslint-enable react/no-unused-prop-types */

export default class BlockButtonForm extends React.Component {
  static defaultProps = {
    pad: false,
  }

  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onChangeAssetType = this.onChangeAssetType.bind(this);
    const { path, primary, label, buttonType, href, newTab, assetType, icon } = props.data || props;
    const labelInput = label || '';
    const primaryInput = primary || 'True';
    const buttonTypeInput = buttonType || 'Button';
    const iconInput = icon || 'primary';
    const pathInput = path || '';
    const hrefInput = href || '';
    const newTabInput = newTab || false;
    const assetTypeInput = assetType || 'path';
    this.state = {
      label: labelInput,
      primary: primaryInput,
      path: pathInput,
      buttonType: buttonTypeInput,
      icon: iconInput,
      href: hrefInput,
      newTab: newTabInput,
      assetType: assetTypeInput,
      error: {
        label: null,
        path: null,
        href: null,
      },
    };
  }

  state: State;

  componentWillReceiveProps({ asset, data }: Props) {
    if (asset && asset.path !== this.state.path) {
      this.setState({
        path: asset.path,
      });
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            id: 'path',
            value: asset.path,
          },
        });
      }
    }
    if (data) {
      this.setState({ ...data });
    }
  }

  onChange: (e: OnChangeEvent) => void;
  onChange(e: OnChangeEvent) {
    const { target, option } = e;
    if (option) {
      this.setState({
        [`${target.id}`]: option,
      });
    } else {
      this.setState({
        [`${target.id}`]: target.type === 'checkbox' ? target.checked : target.value,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onChangeAssetType: () => void;
  onChangeAssetType() {
    const { assetType } = this.state;
    let newType = 'href';
    if (assetType === 'href') {
      newType = 'path';
    }
    const event = {
      target: {
        id: 'assetType',
        value: newType,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    this.setState({
      assetType: newType,
    });
  }

  onSubmit: (event: SyntheticInputEvent) => void;
  onSubmit(event: SyntheticInputEvent) {
    event.preventDefault();
    if (this.formIsValid() && this.props.onSubmit) {
      if (this.props.onSubmit) {
        this.props.onSubmit(event);
      }
    }
  }

  props: Props;

  formIsValid: () => boolean;
  formIsValid() {
    const { path, label, href, assetType } = this.state;
    const hrefError = validation.validUrl(href) === true
      ? null
      : 'Please enter a valid url, containing a protocol such as http://';
    const pathError = validation.validPath(path)
      ? null
      : 'Please enter a valid path';
    const labelError = validation.validLength(label)
      ? null
      : 'Please enter a valid label';
    this.setState({
      error: {
        href: hrefError,
        path: pathError,
        label: labelError,
      },
    });
    if (assetType === 'path') {
      return pathError === null && labelError === null;
    }
    return hrefError === null && labelError === null;
  }

  render() {
    const { children, pad } = this.props;
    const {
      label,
      primary,
      path,
      buttonType,
      icon,
      assetType,
      href,
      newTab,
      error,
    } = this.state;
    return (
      <Box colorIndex="light-2" pad={pad ? 'medium' : 'none'}>
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Label"
                error={error.label}
                help="Enter a label that will appear on the button"
                htmlFor="label"
              >
                <input
                  id="label"
                  name="label"
                  type="text"
                  value={label}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField
                error={assetType === 'path' ? error.path : error.href}
                help={assetType === 'path'
                  ? 'Enter a path to an internal asset, such as /uploads/image.png'
                  : 'Enter a url to an external site, such as http://google.com/image.png'}
                label="Link"
                htmlFor={assetType === 'path' ? 'path' : 'href'}
              >
                {assetType === 'path' ?
                  <input
                    id="path"
                    name="path"
                    type="text"
                    value={path}
                    onChange={this.onChange}
                  />
                :
                  <input
                    id="href"
                    name="href"
                    type="text"
                    value={href}
                    onChange={this.onChange}
                  />
                }
              </FormField>
              {primary === 'True' && buttonType === 'Anchor' ?
                <FormField
                  label="CTA Icon"
                  htmlFor="icon"
                  help="Add an optional icon to the CTA."
                >
                  <Select
                    onChange={this.onChange}
                    value={icon || 'primary'}
                    options={Object.keys(iconMap)}
                    name="icon"
                    id="icon"
                  />
                </FormField>
              :
                null
              }
              <FormField
                label="Asset Link Type"
                help="What type of asset should the button link to?"
              >
                <Box direction="row" pad={{ vertical: 'small', horizontal: 'medium' }}>
                  <RadioButton
                    id="internal"
                    label="Internal Asset"
                    checked={(assetType === 'path')}
                    onChange={this.onChangeAssetType}
                    name="internal"
                  />
                  <RadioButton
                    id="external"
                    checked={(assetType !== 'path')}
                    label="External URL"
                    onChange={this.onChangeAssetType}
                    name="external"
                  />
                </Box>
              </FormField>
              <FormField>
                <CheckBox
                  onChange={this.onChange}
                  checked={(assetType !== 'path') && newTab}
                  id="newTab"
                  toggle
                  reverse
                  label="New Browser Tab?"
                  disabled={assetType === 'path'}
                />
              </FormField>
              <FormField
                label="Button Type"
                htmlFor="buttonType"
                help="What type of button would you like to use?  Button or Anchor?"
              >
                <Select
                  onChange={this.onChange}
                  value={buttonType || ''}
                  options={['Button', 'Anchor']}
                  name="buttonType"
                  id="buttonType"
                />
              </FormField>
              <FormField
                label="Primary"
                htmlFor="primary"
                help={buttonType === 'Anchor'
                  ? 'Should the anchor have the arrow icon in front of it?'
                  : 'Should the button be filled in with the brand color?'
                }
              >
                <Select
                  onChange={this.onChange}
                  value={primary || ''}
                  options={['True', 'False']}
                  name="primary"
                  id="primary"
                />
              </FormField>
            </fieldset>
            {assetType === 'path' && children && children}
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

