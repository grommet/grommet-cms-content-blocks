import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import { MarkdownHelpLayer } from '../Shared';

export class ParagraphForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || '',
      layer: false,
      align: props.align || 'start'
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onToggleHelp = this._onToggleHelp.bind(this);
  }

  _onChange(e) {
    const { target, option } = e;
    const key = target.id;
    let val = option || target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  _onToggleHelp() {
    this.setState({
      layer: !this.state.layer
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { content, layer, align } = this.state;
    
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={this._onSubmit}>
          <MarkdownHelpLayer isVisible={layer}
            onToggle={this._onToggleHelp} />
          <FormFields>
            <fieldset>
              <FormField label="Content" htmlFor="content">
                <textarea autoFocus id="content" name="content" type="text"
                  value={content} onChange={this._onChange} rows="10" />
              </FormField>
              <FormField
                label="Align Content"
                htmlFor="align"
              >
                <Select
                  onChange={this._onChange}
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
            <Button onClick={this._onSubmit} primary={false} type="submit"
              label="Done" />
          </FormFields>
        </Form>
      </Box>
    );
  }
};

ParagraphForm.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default ParagraphForm;
