import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import { MarkdownHelpLayer } from '../Shared';

export class BlockImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || '',
      alt: props.alt || '',
      imageSize: props.imageSize || 'Large',
      layer: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onToggleHelp = this.onToggleHelp.bind(this);
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

  onToggleHelp() {
    this.setState({
      layer: !this.state.layer
    });
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

  validateForm() {
    const { image } = this.state;
    if (image !== '') { return true; }

    return false;
  }

  render() {
    const { image, content, imageSize, alt, layer } = this.state;
    const { children } = this.props;
    const submit = (this.validateForm(this.state))
      ? this.onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <MarkdownHelpLayer isVisible={layer}
          onToggle={this.onToggleHelp} />
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Description" htmlFor="content">
                <textarea
                  autoFocus
                  id="content"
                  rows="3"
                  name="content"
                  type="text"
                  value={content}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField label="Alt Tag" htmlFor="alt">
                <input
                  id="alt"
                  name="alt"
                  type="text"
                  value={alt}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField label="Image file path" htmlFor="image">
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={image.path || ''}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField label="Image Size" htmlFor="imageSize">
                <Select
                  id="imageSize"
                  inline={false}
                  options={['Thumb', 'Small', 'Medium', 'Large', 'Full']}
                  value={imageSize}
                  onChange={this.onChange}
                />
              </FormField>
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

BlockImageForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  imageSize: PropTypes.string,
  alt: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.object,
};

export default BlockImageForm;
