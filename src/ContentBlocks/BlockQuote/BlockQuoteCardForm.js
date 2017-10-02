import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Select from 'grommet/components/Select';
import colorOptionsList from '../Shared/colorIndexes';

export class BlockQuoteCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || '',
      source: props.source || '',
      label: props.label || '',
      linkText: props.linkText || '',
      linkUrl: props.linkUrl || '',
      colorIndex: props.colorIndex || '',
      borderSize: props.borderSize || '',
      colorOptions: colorOptionsList,
      showAdvanced: false,
    };

    this._onChange = this._onChange.bind(this);
    this._onChangeToggle = this._onChangeToggle.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  componentWillMount() {
    let { showAdvanced } = this.state;
    const advancedOptionKeys = Object.keys(this.state).filter(key => key !== 'content' &&
        key !== 'source' && key !== 'label' &&
        key !== 'showAdvanced' && key !== 'colorOptions');
    advancedOptionKeys.forEach((key) => {
      if (this.state[`${key}`] !== '') {
        showAdvanced = true;
      }
    });
    this.setState({
      showAdvanced,
    });
  }

  _onChange({ target, option }) {
    const key = target.id;
    const val = option || target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
  }

  _onSearch(e: any) {
    const { colorOptions } = this.state;
    const { value } = e.target;
    const newOptions = value === '' || !value
      ? colorOptionsList
      : colorOptions.filter(i => i.includes(value));
    this.setState({
      colorOptions: newOptions,
    });
  }

  _onChangeToggle() {
    this.setState({
      showAdvanced: !this.state.showAdvanced,
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const {
      content,
      colorOptions,
      colorIndex,
      borderSize,
      source,
      linkText,
      linkUrl,
      label,
      showAdvanced,
    } = this.state;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Content" htmlFor="content">
                <textarea
                  autoFocus id="content" name="content" type="text"
                  value={content} onChange={this._onChange} rows="4"
                />
              </FormField>
              <FormField label="Source" htmlFor="source">
                <input
                  id="source" name="source" type="text"
                  value={source} onChange={this._onChange}
                />
              </FormField>
            </fieldset>
            <fieldset>
              <Box direction="row" pad={{ between: 'medium' }}>
                <CheckBox
                  onChange={this._onChangeToggle}
                  checked={showAdvanced}
                  toggle
                  label={`${showAdvanced ? 'Hide' : 'Show'} advanced options`}
                />
              </Box>
              <Box direction="column" pad="small">
                {showAdvanced &&
                  <FormFields>
                    <FormField label="Label" htmlFor="label">
                      <input
                        id="label" name="label" type="text"
                        value={label} onChange={this._onChange}
                      />
                    </FormField>
                    <FormField label="Link Text" htmlFor="linkText">
                      <input
                        id="linkText" name="linkText" type="text"
                        value={linkText} onChange={this._onChange}
                      />
                    </FormField>
                    <FormField label="Link URL" htmlFor="linkUrl">
                      <input
                        id="linkUrl" name="linkUrl" type="text"
                        value={linkUrl} onChange={this._onChange}
                      />
                    </FormField>
                    <FormField
                      label="Color Index"
                      htmlFor="colorIndex"
                      help="The color index for the border.  See: https://grommet.github.io/docs/color"
                    >
                      <Select
                        onSearch={this._onSearch}
                        onChange={this._onChange}
                        value={colorIndex || ''}
                        options={colorOptions}
                        name="colorIndex"
                        id="colorIndex"
                      />
                    </FormField>
                    <FormField label="Border Size" htmlFor="borderSize">
                      <Select
                        id="borderSize"
                        inline={false}
                        options={['small', 'medium', 'large']}
                        value={borderSize}
                        onChange={this._onChange}
                      />
                    </FormField>
                  </FormFields>
                }
              </Box>
            </fieldset>
            <Button
              onClick={this._onSubmit} primary={false} type="submit"
              label="Done"
            />
          </FormFields>
        </Form>
      </Box>
    );
  }
}

BlockQuoteCardForm.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default BlockQuoteCardForm;
