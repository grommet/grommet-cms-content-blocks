import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';

export class BlockVideoForm extends Component {
  static validateForm({ image }) {
    if (image !== '') { return true; }

    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || '',
      video: props.video || '',
      label: props.label || '',
      borderColor: props.borderColor || 'none',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps({ image, video }) {
    if (image && image !== this.state.image) {
      this.setState({
        image,
      });
    }
    if (video && video !== this.state.video) {
      this.setState({
        video,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({ // eslint-disable-line
        image: `${this.props.url}`,
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
    const { image, content, label, video, borderColor } = this.state;
    const { children } = this.props;
    const submit = (BlockVideoForm.validateForm(this.state))
      ? this.onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Label" htmlFor="label">
                <input
                  autoFocus id="label" name="label" type="text"
                  value={label} onChange={this.onChange}
                />
              </FormField>
              <FormField label="Caption" htmlFor="content">
                <textarea
                  rows="4" id="content" name="content" type="text"
                  value={content} onChange={this.onChange}
                />
              </FormField>
              <FormField label="Video file path" htmlFor="video">
                <input
                  id="video" name="video" type="text"
                  value={video.path} onChange={this.onChange}
                />
              </FormField>
              <FormField label="Video thumbnail file path" htmlFor="image">
                <input
                  id="image" name="image" type="text"
                  value={image.path} onChange={this.onChange}
                />
              </FormField>
              <FormField label="Border Color" htmlFor="borderColor">
                <Select
                  id="borderColor"
                  name="borderColor"
                  inline={false}
                  options={['none', 'red', 'green']}
                  value={borderColor}
                  onChange={this.onChange}
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

BlockVideoForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  url: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
  borderColor: PropTypes.string,
  video: PropTypes.string,
  label: PropTypes.string,
};

export default BlockVideoForm;
