import React, { Component, PropTypes } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';

export class CarouselSlideForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.data ? props.data.image : '',
      imageSize: props.imageSize ? props.imageSize : 'Large'
    };

    this._onChange = this._onChange.bind(this);
    this._propsToState = this._propsToState.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
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
        image: `${this.props.url}`
      });
    }

    // Shallow compare state to propagate to parent container.
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.props.onChange(this.state);
    }
  }

  _propsToState(props) {
    this.setState({
      imageSize: props.imageSize || 'Large',
      image: props.data ? props.data.image : null
    });
  }

  _onAssetSelect(image) {
    this.setState({
      image
    });
  }

  _onChange(e) {
    const { target, option } = e;
    const key = target.id;
    const val = option || target.value;

    this.setState({
      [`${key}`]: val
    });
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
    const { image, imageSize } = this.state;

    return (
      <Form compact={false} onSubmit={onSubmit}>
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
            <FormField label="Image Size" htmlFor="imageSize">
              <Select
                id="imageSize"
                inline={false}
                options={['Small', 'Medium', 'Large', 'XLarge', 'XXLarge', 'Full']}
                value={imageSize}
                onChange={this._onChange}
              />
            </FormField>
            {assetNode && React.cloneElement(
              assetNode,
              {
                onAssetSelect: this._onAssetSelect
              }
            )}
          </fieldset>
          <Button label="submit" primary={true} onClick={onSubmit} />
        </FormFields>
      </Form>
    );
  }
};

CarouselSlideForm.propTypes = {
  assetNode: PropTypes.node,
  url: PropTypes.string
};

export default CarouselSlideForm;
