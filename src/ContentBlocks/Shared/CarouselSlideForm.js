import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';
import ImagePreview from '../Shared/ImagePreview';

class CarouselSlideForm extends Component {
  static validate(data) {
    if (!data || !data.image) {
      return false;
    }

    return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      image: props.data ? props.data.image : '',
      imageSize: props.imageSize ? props.imageSize : 'Large',
    };

    this.onChange = this.onChange.bind(this);
    this.propsToState = this.propsToState.bind(this);
    this.onAssetSelect = this.onAssetSelect.bind(this);
  }

  componentDidMount() {
    this.propsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({ // eslint-disable-line
        image: `${this.props.url}`,
      });
    }

    // Shallow compare state to propagate to parent container.
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.props.onChange(this.state);
    }
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

    this.setState({
      [`${key}`]: val,
    });
  }

  propsToState(props) {
    this.setState({
      imageSize: props.imageSize || 'Large',
      image: props.data ? props.data.image : null,
    });
  }

  render() {
    const onSubmit = (CarouselSlideForm.validate(this.state))
      ? this.props.onSubmit
      : undefined;
    const { assetNode } = this.props;
    const { image, imageSize } = this.state;

    return (
      <Form compact={false} onSubmit={onSubmit}>
        <FormFields>
          <ImagePreview image={image} />
          <fieldset>
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
            {assetNode && React.cloneElement(
              assetNode,
              {
                onAssetSelect: this.onAssetSelect,
                onAssetsSelect: this.props.onAssetsSelect,
              },
            )}
          </fieldset>
          <Button label="submit" primary onClick={onSubmit} />
        </FormFields>
      </Form>
    );
  }
}

CarouselSlideForm.propTypes = {
  assetNode: PropTypes.node,
  url: PropTypes.string,
  onSubmit: PropTypes.func,
  onAssetsSelect: PropTypes.func,
  onChange: PropTypes.func,
  data: PropTypes.shape({
    image: PropTypes.string,
  }),
  imageSize: PropTypes.string,
};

export default CarouselSlideForm;
