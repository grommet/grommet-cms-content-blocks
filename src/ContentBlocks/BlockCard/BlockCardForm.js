import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

export class BlockCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || '',
      image: props.image || '',
      heading: props.heading || '',
      label: props.label || '',
      linkText: props.linkText || '',
      linkUrl: props.linkUrl || '',
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps({ image }) {
    if (image && image !== this.state.image) {
      this.setState({
        image,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`,
      });
    }
  }

  _onChange(e) {
    const { target } = e;
    const key = target.id;
    const val = target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  _validateForm({ image }) {
    if (image !== '' && content !== '') { return true; }

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(event);
    }
  }

  render() {
    const {
      content,
      heading,
      image,
      label,
      linkText,
      linkUrl,
    } = this.state;
    const { children } = this.props;
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Card Label" htmlFor="label">
                <input
                  autoFocus id="label" name="label" type="text"
                  value={label} onChange={this._onChange}
                />
              </FormField>
              <FormField label="Card Heading" htmlFor="heading">
                <input
                  id="heading" name="heading" type="text"
                  value={heading} onChange={this._onChange}
                />
              </FormField>
              <FormField label="Card Content" htmlFor="content">
                <textarea
                  id="content" name="content" type="text"
                  value={content} onChange={this._onChange} rows="3"
                />
              </FormField>
              <FormField label="Card Link Text" htmlFor="linkText">
                <input
                  id="linkText" name="linkText" type="text"
                  value={linkText} onChange={this._onChange}
                />
              </FormField>
              <FormField label="Card Link URL" htmlFor="linkUrl">
                <input
                  id="linkUrl" name="linkUrl" type="text"
                  value={linkUrl} onChange={this._onChange}
                />
              </FormField>
              <FormField label="Card thumbnail path" htmlFor="image">
                <input
                  id="image" name="image" type="text"
                  value={image.path} onChange={this._onChange}
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

BlockCardForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  content: PropTypes.string,
  image: PropTypes.string,
  heading: PropTypes.string,
  label: PropTypes.string,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  url: PropTypes.string,
};

export default BlockCardForm;
