import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Box from 'grommet/components/Box';
import RadioButton from 'grommet/components/RadioButton';
import DateTime from 'grommet/components/DateTime';
import { MarkdownHelpButton } from '../Shared';
import ImagePreview from '../Shared/ImagePreview';

class CarouselSlideWithContentForm extends Component {
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
      content: props.data ? props.data.content : '',
      button: props.data ? props.data.button : { path: '', label: '' },
      update: props.data ? props.data.update : { date: '', description: '' },
      imageSize: props.imageSize ? props.imageSize : 'Full',
      justification: (props.data && props.data.justification) ? props.data.justification : 'left',
      color: (props.data && props.data.color) ? props.data.color : 'black',
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onChangeJustification = this.onChangeJustification.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
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

  onDateChange(value) {
    this.setState({
      update: {
        ...this.state.update,
        date: value,
      },
    });
  }

  onChange(e) {
    const { target, option } = e;
    const key = target.id;
    const val = option || target.value;

    if (key === 'description') {
      this.setState({
        update: {
          ...this.state.update,
          [key]: val,
        },
      });
    } else if (key === 'label' || key === 'path') {
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
      color: props.data ? props.data.color : 'black',
      justification: props.data ? props.data.justification : 'left',
      content: props.data ? props.data.content : '',
      button: props.data ? props.data.button : { path: '', label: '' },
      update: props.data ? props.data.update : { date: '', description: '' },
    });
  }

  render() {
    const onSubmit = (CarouselSlideWithContentForm.validate(this.state))
      ? this.props.onSubmit
      : undefined;
    const { assetNode } = this.props;
    const { image, content, button, update, justification, color } = this.state;

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
            <fieldset>
              <legend>
                Carousel Content
              </legend>
              <MarkdownHelpButton />
              <FormField label="Content" htmlFor="content">
                <textarea
                  id="content"
                  name="content"
                  type="text"
                  value={content}
                  onChange={this.onChange}
                  rows="4"
                />
              </FormField>
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
            <fieldset>
              <legend>Update Card</legend>
              <FormField label="Date" htmlFor="date">
                <DateTime id="date" name="date" format="MMM DD, YYYY" onChange={this.onDateChange} value={update ? update.date : ''} />
              </FormField>
              <FormField label="Description" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={update ? update.description : ''}
                  onChange={this.onChange}
                  maxLength={80}
                  rows="2"
                />
              </FormField>
            </fieldset>
            <fieldset>
              <legend>
                Button
              </legend>
              <FormField label="Button Label" htmlFor="label">
                <input
                  id="label"
                  name="label"
                  type="text"
                  value={button ? button.label : ''}
                  onChange={this.onChange}
                />
              </FormField>
              <FormField label="Button Path" htmlFor="path">
                <input
                  id="path"
                  name="path"
                  type="text"
                  value={button ? button.path : ''}
                  onChange={this.onChange}
                />
              </FormField>
            </fieldset>
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

CarouselSlideWithContentForm.propTypes = {
  assetNode: PropTypes.node,
  url: PropTypes.string,
  onSubmit: PropTypes.func,
  imageSize: PropTypes.string,
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
    update: PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.isRequired,
    }),
    justification: PropTypes.string,
    color: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

export default CarouselSlideWithContentForm;
