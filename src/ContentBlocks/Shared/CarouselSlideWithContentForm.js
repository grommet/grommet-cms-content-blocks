import React, { Component, PropTypes } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';
import { MarkdownHelpLayer } from '../Shared';

export class CarouselSlideWithContentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.data ? props.data.image : '',
      content: props.data ? props.data.content : '',
      button: props.data ? props.data.button : { path: '', label: '' },
      imageSize: props.imageSize ? props.imageSize : 'Full',
      layer: false,
    };

    this._onChange = this._onChange.bind(this);
    this._propsToState = this._propsToState.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
    this._onToggleHelp = this._onToggleHelp.bind(this);
  }

  componentDidMount() {
    this._propsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._propsToState(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`,
      });
    }

    // Shallow compare state to propagate to parent container.
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.props.onChange(this.state);
    }
  }

  _onToggleHelp() {
    this.setState({
      layer: !this.state.layer,
    });
  }

  _propsToState(props) {
    this.setState({
      imageSize: props.imageSize || 'Full',
      image: props.data ? props.data.image : null,
      content: props.data ? props.data.content : '',
      button: props.data ? props.data.button : { path: '', label: '' },
    });
  }

  _onAssetSelect(image) {
    this.setState({
      image,
    });
  }

  _onChange(e) {
    const { target, option } = e;
    const key = target.id;
    const val = option || target.value;

    if (key === 'label' || key === 'path') {
      this.setState({
        button: {
          ...this.state.button,
          [`${key}`]: val,
        },
      });
    } else {
      this.setState({
        [`${key}`]: val,
      });
    }
  }

  _validate(data) {
    if (!data || !data.image) {
      return false;
    }

    return true;
  }

  render() {
    const onSubmit = (this._validate(this.state))
      ? this.props.onSubmit
      : undefined;
    const { assetNode } = this.props;
    const { image, content, layer, button } = this.state;

    return (
      <Form compact={false} onSubmit={onSubmit}>
        <MarkdownHelpLayer
          isVisible={layer}
          onToggle={this._onToggleHelp}
        />
        <FormFields>
          <fieldset>
            <FormField label="Image" htmlFor="image">
              <input
                autoFocus
                id="image"
                name="image"
                type="text"
                value={image && image.path ? image.path : ''}
                onChange={this._onChange}
              />
            </FormField>
            <fieldset>
              <legend>
                Carousel Content
              </legend>
              <FormField label="Content" htmlFor="content">
                <textarea
                  id="content"
                  name="content"
                  type="text"
                  value={content}
                  onChange={this._onChange}
                  rows="4"
                />
              </FormField>
              <FormField label="Button Label" htmlFor="label">
                <input
                  id="label"
                  name="label"
                  type="text"
                  value={button.label}
                  onChange={this._onChange}
                />
              </FormField>
              <FormField label="Path" htmlFor="path">
                <input
                  id="path"
                  name="path"
                  type="text"
                  value={button.path}
                  onChange={this._onChange}
                />
              </FormField>
            </fieldset>
            {assetNode && React.cloneElement(
              assetNode,
              {
                onAssetSelect: this._onAssetSelect,
              },
            )}
          </fieldset>
          <Button label="submit" primary onClick={onSubmit} />
        </FormFields>
      </Form>
    );
  }
}

CarouselSlideWithContentForm.propTypes = {
  assetNode: PropTypes.node,
  url: PropTypes.string,
};

export default CarouselSlideWithContentForm;
