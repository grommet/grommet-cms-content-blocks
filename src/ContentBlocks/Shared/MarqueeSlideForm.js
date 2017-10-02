import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Box from 'grommet/components/Box';
import RadioButton from 'grommet/components/RadioButton';
import Select from 'grommet/components/Select';
import ImagePreview from '../Shared/ImagePreview';

class MarqueeSlideForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.data ? props.data.image : '',
      imageSize: props.imageSize ? props.imageSize : 'Full',
      justification: (props.data && props.data.justification) ? props.data.justification : 'left',
      color: (props.data && props.data.color) ? props.data.color : 'black',
      layer: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeJustification = this.onChangeJustification.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.propsToState = this.propsToState.bind(this);
    this.onAssetSelect = this.onAssetSelect.bind(this);
    this.onToggleHelp = this.onToggleHelp.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    this.propsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      // eslint-disable-next-line
      this.setState({
        image: `${this.props.url}`,
      });
    }

    // Shallow compare state to propagate to parent container.
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.props.onChange(this.state);
    }
  }

  onToggleHelp() {
    this.setState({
      layer: !this.state.layer,
    });
  }

  onChangeJustification() {
    const { justification } = this.state;
    let newType = 'left';
    if (justification === newType) {
      newType = 'right';
    }
    this.setState({
      justification: newType,
    });
  }

  onChangeColor() {
    const { color } = this.state;
    let newType = 'black';
    if (color === newType) {
      newType = 'white';
    }
    this.setState({
      color: newType,
    });
  }

  onAssetSelect(image) {
    this.setState({
      image,
    });
  }

  onChange(e) {
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

  propsToState(props) {
    this.setState({
      imageSize: props.imageSize || 'Full',
      image: props.data ? props.data.image : null,
      color: (props.data && props.data.color) ? props.data.color : 'black',
      justification: (props.data && props.data.justification) ? props.data.justification : 'left',
    });
  }

  // eslint-disable-next-line
  validate(data) {
    if (!data || !data.image) {
      return false;
    }

    return true;
  }

  render() {
    const onSubmit = (this.validate(this.state))
      ? this.props.onSubmit
      : undefined;
    const { assetNode } = this.props;
    const { image, justification, color, imageSize } = this.state;

    return (
      <Form compact={false} onSubmit={onSubmit}>
        <FormFields>
          <ImagePreview image={image} />
          <FormField label="Image" htmlFor="image">
            <input
              autoFocus
              id="image"
              name="image"
              type="text"
              value={image && image.path ? image.path : ''}
              onChange={this.onChange}
            />
          </FormField>
          <FormField label="Image Size" htmlFor="imageSize">
            <Select
              id="imageSize"
              inline={false}
              options={['Small', 'Medium', 'Large', 'XLarge', 'XXLarge', 'Full']}
              value={imageSize}
              onChange={this.onChange}
            />
          </FormField>
          <fieldset>
            <legend>
              Content
            </legend>
            <FormField
              label="Content Justification"
            >
              <Box direction="row" pad={{ vertical: 'small', horizontal: 'medium' }}>
                <RadioButton
                  id="left"
                  label="Left"
                  checked={(justification === 'left')}
                  onChange={this.onChangeJustification}
                  name="left"
                />
                <RadioButton
                  id="right"
                  label="Right"
                  checked={(justification === 'right')}
                  onChange={this.onChangeJustification}
                  name="right"
                />
              </Box>
            </FormField>
            <FormField
              label="Content Color"
            >
              <Box direction="row" pad={{ vertical: 'small', horizontal: 'medium' }}>
                <RadioButton
                  id="black"
                  label="Black"
                  checked={(color === 'black')}
                  onChange={this.onChangeColor}
                  name="black"
                />
                <RadioButton
                  id="white"
                  label="White"
                  checked={(color === 'white')}
                  onChange={this.onChangeColor}
                  name="white"
                />
              </Box>
            </FormField>
          </fieldset>
          {assetNode && React.cloneElement(
            assetNode,
            {
              onAssetSelect: this.onAssetSelect,
              onAssetsSelect: this.props.onAssetsSelect,
            },
          )}
          <Button label="submit" primary onClick={onSubmit} />
        </FormFields>
      </Form>
    );
  }
}

MarqueeSlideForm.propTypes = {
  assetNode: PropTypes.node,
  url: PropTypes.string,
  onSubmit: PropTypes.func,
  imageSize: PropTypes.string,
  onChange: PropTypes.func,
  onAssetsSelect: PropTypes.func,
  data: PropTypes.shape({
    image: PropTypes.shape({
      path: PropTypes.string,
    }),
    content: PropTypes.string,
    button: PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    }),
    justification: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default MarqueeSlideForm;
