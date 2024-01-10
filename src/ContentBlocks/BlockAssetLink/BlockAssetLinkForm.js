import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

export class AssetLinkForm extends Component {
  static validateForm({ asset }) {
    if (asset.path !== '') { return true; }

    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      asset: props.asset || '',
      content: props.content || '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps({ asset }) {
    if (asset && asset !== this.state.asset) {
      this.setState({
        asset,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({ // eslint-disable-line
        asset: `${this.props.url}`,
      });
    }
  }

  onChange(e) {
    const { target, option } = e;
    const key = target.id;
    const val = option || target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(event);
    }
  }

  render() {
    const { asset, content } = this.state;
    const { children } = this.props;
    const submit = (AssetLinkForm.validateForm(this.state))
      ? this.onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Link Text" htmlFor="content">
                <input
                  autoFocus id="content" name="content" type="text"
                  value={content} onChange={this.onChange}
                />
              </FormField>
              <FormField label="Asset file path" htmlFor="asset">
                <input
                  id="asset" name="asset" type="text"
                  value={asset.path || ''} onChange={this.onChange}
                />
              </FormField>
              {children && children}
            </fieldset>
            <Button
              onClick={submit} primary={false} type="submit"
              label="Done"
            />
          </FormFields>
        </Form>
      </Box>
    );
  }
}

AssetLinkForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  url: PropTypes.string,
  asset: PropTypes.shape({
    path: PropTypes.string,
  }),
  content: PropTypes.string,
};

export default AssetLinkForm;
