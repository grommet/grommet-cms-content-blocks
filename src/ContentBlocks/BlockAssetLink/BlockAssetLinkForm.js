import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

export class AssetLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: props.asset || '',
      content: props.content || ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        asset: `${this.props.url}`
      });
    }
  }

  _onChange({ target, option }) {
    const key = target.id;
    let val = option || target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _validateForm({ asset }) {
    if (asset.path !== '')
      return true;

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { asset, content } = this.state;
    const { children } = this.props;
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Link Text" htmlFor="content">
                <input autoFocus id="content" name="content" type="text"
                  value={content} onChange={this._onChange} />
              </FormField>
              <FormField label="Asset file path" htmlFor="asset">
                <input id="asset" name="asset" type="text"
                  value={asset.path} onChange={this._onChange} />
              </FormField>
              {children && children}
            </fieldset>
            <Button onClick={submit} primary={false} type="submit"
              label="Done" />
          </FormFields>
        </Form>
      </Box>
    );
  }
};

AssetLinkForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
  children: PropTypes.node,
  url: PropTypes.string
};

export default AssetLinkForm;