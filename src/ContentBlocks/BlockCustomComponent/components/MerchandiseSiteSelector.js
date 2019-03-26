import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

import languages from './languages';
import regions from './regions';

class MerchandiseSiteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: '',
      regionLabel: '',
      language: '',
      languageLabel: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  onChange = (event) => {
    const { target, option } = event;
    const key = target.id;
    const val = option.value || target.value;
    const label = option.label || target.label;
    const keyLabel = target.name;
    this.setState({
      [key]: val,
      [keyLabel]: label,
    });
  }

  render() {
    const {
      regionLabel,
      region,
      language,
      languageLabel,
    } = this.state;

    const href = languageLabel && languageLabel === 'China' ? language && language : `http://merchandise.hpe.com/${language}`;
    return (
      <Box direction="row">
        <Form compact={false} onSubmit={this.onSubmit}>
          <FormFields>
            <fieldset>
              <Box direction="row">
                <FormField htmlFor="region">
                  <Select
                    id="region"
                    name="regionLabel"
                    options={regions}
                    value={regionLabel || 'Select Region'}
                    onChange={this.onChange}
                  />
                </FormField>
                {
                  region &&
                  <FormField htmlFor="language">
                    <Select
                      id="language"
                      name="languageLabel"
                      options={languages[region] || [{ label: 'No region selected' }]}
                      value={languageLabel || 'Select Country Language'}
                      onChange={this.onChange}
                    />
                  </FormField>
                }
              </Box>
            </fieldset>
            {
              language &&
              <Button
                href={href}
                target="_blank"
                onClick
                primary
                type="submit"
                label="Go To Brand Merchandise Program Site"
              />
            }
          </FormFields>
        </Form>
      </Box>
    );
  }
}

export default MerchandiseSiteSelector;
