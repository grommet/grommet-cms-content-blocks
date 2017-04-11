import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import { MarkdownHelpLayer } from '../Shared';

export class ParagraphCTAForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || '',
      layer: false,
      align: props.align || 'start',
      href: props.href || '',
      label: props.label || '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggleHelp = this.onToggleHelp.bind(this);
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

  onToggleHelp() {
    this.setState({
      layer: !this.state.layer,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { content, layer, align, label, href } = this.state;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={this.onSubmit}>
          <MarkdownHelpLayer
            isVisible={layer}
            onToggle={this.onToggleHelp}
          />
          <FormFields>
            <fieldset>
              <FormField label="Content" htmlFor="content">
                <textarea
                  autoFocus id="content" name="content" type="text"
                  value={content} onChange={this.onChange} rows="10"
                />
              </FormField>
              <FormField
                label="Align Content"
                htmlFor="align"
              >
                <Select
                  onChange={this.onChange}
                  value={align || 'start'}
                  options={[
                    'start',
                    'center',
                    'end',
                  ]}
                  name="align"
                  id="align"
                />
              </FormField>
            </fieldset>
            <fieldset>
              <legend>CTA</legend>
              <FormField
                label="Label"
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
                help="Enter the url for the cta, such as http://google.com/image.png"
                label="Href"
                htmlFor="href"
              >
                <input
                  id="href"
                  name="href"
                  type="text"
                  value={href}
                  onChange={this.onChange}
                />
              </FormField>
            </fieldset>
            <Button
              onClick={this.onSubmit}
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

ParagraphCTAForm.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  align: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
};

export default ParagraphCTAForm;
