import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

class BlockIframeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcUrl: props.srcUrl || '',
      height: props.height || '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps({ image, url }) {
    if (image && image !== this.state.image) {
      this.setState({
        image,
      });
    }
    if (url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`,
      });
    }
  }

  onChange({ target }) {
    const key = target.id;
    const val = target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  validateForm({ srcUrl, height }) {
    return srcUrl !== '' && height !== '';
  }

  render() {
    const { srcUrl, height } = this.state;
    const { children } = this.props;
    const submit = this.validateForm(this.state) ? this.onSubmit : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Iframe URL" htmlFor="srcUrl">
                <input
                  id="srcUrl"
                  name="srcUrl"
                  type="text"
                  value={srcUrl}
                  onChange={this.onChange}
                />
              </FormField>
              {/* <FormField label="Image file path (Used as back up)" htmlFor="image">
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={image.path || ''}
                  onChange={this.onChange}
                />
              </FormField> */}
              {/* <FormField label="Button Text (optional)" htmlFor="button">
                <input
                  id="button"
                  name="button"
                  type="text"
                  value={button}
                  onChange={this.onChange}
                />
              </FormField> */}
              <FormField label="Height (in px).  Width will be full." htmlFor="height">
                <input id="height" name="height" type="text" value={height || ''} onChange={this.onChange} />
              </FormField>
              {/* <FormField label="Width" htmlFor="width">
                <input id="width" name="width" type="text" value={width || ''} onChange={this.onChange} />
              </FormField> */}
              {children && children}
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

BlockIframeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string,
  srcUrl: PropTypes.string.isRequired,
  height: PropTypes.string,
  // width: PropTypes.string,
  children: PropTypes.node,
  // button: PropTypes.string,
};

export default BlockIframeForm;
