// @flow
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Menu from 'grommet/components/Menu';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import NextIcon from 'grommet/components/icons/base/Next';
import { BlockButtonForm } from '../BlockButton';
import { ConfirmLayer } from '../Shared';
import { ResponsiveBox } from './styles';
import swapItemOrder, { getNextActiveSlide } from '../Shared/arrayUtils';

type CtaSlide = any;
type OnChangeEvent = SyntheticInputEvent & {
  option: string,
};
type Props = {
  ctaArray: CtaSlide[],
  content: string,
  onSubmit: ?Function,
  assetNode: ?React$Element<any>,
  paragraphSize: 'small' | 'medium' | 'large',
}

type State = {
  ctaArray: CtaSlide[],
  confirmLayer: boolean,
  activeSlideIndex: number,
  content: string,
  error: string,
  paragraphSize: 'small' | 'medium' | 'large',
}

class BlockParagraphCTAsForm extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      ctaArray: props.ctaArray || [],
      paragraphSize: props.paragraphSize || 'medium',
      confirmLayer: false,
      activeSlideIndex: 0,
      content: props.content || '',
      error: '',
    };

    const This = (this: any);
    This.deleteSlide = this.deleteSlide.bind(this);
    This.onSubmit = this.onSubmit.bind(this);
    This.handleAssetSelect = this.handleAssetSelect.bind(this);
    This.handleChange = this.handleChange.bind(this);
    This.addSlideClick = this.addSlideClick.bind(this);
    This.onTabsClick = this.onTabsClick.bind(this);
    This.toggleConfirm = this.toggleConfirm.bind(this);
    This.onChangeContent = this.onChangeContent.bind(this);
    This.onReorderCTAs = this.onReorderCTAs.bind(this);
  }

  state: State;

  componentWillMount() {
    if (!this.props.ctaArray) {
      this.addSlideClick();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.ctaArray) {
      // Copy CTA state array.
      this.setState({
        ctaArray: nextProps.ctaArray.slice(),
      });
    }
  }

  onTabsClick(tabIndex: number) {
    this.setState({ activeSlideIndex: tabIndex });
  }

  onChangeContent(event: OnChangeEvent) {
    const { target, option } = event;
    const { id, value } = (target: any);
    const key = id;
    const newState = {
      [`${key}`]: option || value,
    };

    this.setState(newState);
  }

  onReorderCTAs(direction: 'FORWARDS' | 'BACKWARDS') {
    const { ctaArray, activeSlideIndex } = this.state;
    const newCtaArray = swapItemOrder(ctaArray, activeSlideIndex, direction);
    const nextActiveSlide = getNextActiveSlide(ctaArray, activeSlideIndex, direction);

    this.setState({
      ctaArray: newCtaArray,
      activeSlideIndex: nextActiveSlide,
    });
  }

  onSubmit({ ctaArray, content, paragraphSize }: State) {
    const dataToSubmit = {
      ctaArray,
      content,
      paragraphSize,
    };

    if (this.props.onSubmit) {
      this.props.onSubmit(dataToSubmit);
    }
  }

  deleteSlideClick() {
    this.toggleConfirm();
  }

  deleteSlide(activeIndex: number, event: Event) {
    event.preventDefault();
    const nextCtaArrayState = this.state.ctaArray.slice();
    nextCtaArrayState.splice(activeIndex, 1);

    this.setState({
      activeSlideIndex: 0,
      ctaArray: nextCtaArrayState,
      confirmLayer: false,
    });
  }

  handleAssetSelect(asset: {
    _id: string,
    title: ?string,
    path: string
  }) {
    const { path, _id } = asset;
    const { ctaArray, activeSlideIndex } = this.state;
    const nextCtaArrayState = [
      ...ctaArray.slice(0, activeSlideIndex),
      {
        ...ctaArray[activeSlideIndex],
        _id,
        path,
      },
      ...ctaArray.slice(activeSlideIndex + 1),
    ];

    this.setState({ ctaArray: nextCtaArrayState });
  }

  handleChange(event: OnChangeEvent) {
    const { target, option } = event;
    const { id, value, checked, type } = target;
    const { ctaArray, activeSlideIndex } = this.state;
    const nextCtaArrayState = [
      ...ctaArray.slice(0, activeSlideIndex),
      {
        ...ctaArray[activeSlideIndex],
        [id]: type === 'checkbox' ? checked : option || value,
      },
      ...ctaArray.slice(activeSlideIndex + 1),
    ];

    this.setState({ ctaArray: nextCtaArrayState });
  }

  toggleConfirm() {
    this.setState({ confirmLayer: !this.state.confirmLayer });
  }

  addSlideClick() {
    const nextCtaArrayState = this.state.ctaArray.slice();
    nextCtaArrayState.push({
      label: '',
      path: '',
      assetType: 'path',
      buttonType: 'Anchor',
      primary: 'True',
    });

    this.setState({
      activeSlideIndex: nextCtaArrayState.length - 1,
      ctaArray: nextCtaArrayState,
    });
  }
  props: Props;

  render() {
    const { assetNode } = this.props;
    const { activeSlideIndex, content, paragraphSize } = this.state;
    const buttonForm = (
      <BlockButtonForm
        pad={false}
        data={this.state.ctaArray[activeSlideIndex]}
        onChange={this.handleChange}
        onSubmit={this.onSubmit.bind(this, this.state)}
      >
        {assetNode && React.cloneElement(
          assetNode,
          {
            onAssetSelect: this.handleAssetSelect,
          },
        )}
      </BlockButtonForm>
    );

    const tabs = this.state.ctaArray.map((slide, index) =>
      <Tab
        title={`CTA ${index + 1}`}
        key={index}
        onClick={this.onTabsClick.bind(this, index)}
      />,
    );

    const confirmLayer = (this.state.confirmLayer)
      ? (
        <ConfirmLayer
          name={`CTA ${activeSlideIndex + 1}`}
          onClose={this.toggleConfirm}
          onSubmit={this.deleteSlide.bind(this, activeSlideIndex)}
        />
      )
      : undefined;

    return (
      <Box direction="column" pad="medium" colorIndex="light-2">
        {confirmLayer}
        <Box direction="row">
          <ResponsiveBox direction="row" align="center">
            <Button icon={<AddIcon />} label="add slide" onClick={this.addSlideClick} />
            <Box pad="small" />
            <Button
              icon={<TrashIcon />} label="delete slide"
              onClick={this.deleteSlideClick.bind(this, activeSlideIndex)}
            />
          </ResponsiveBox>
        </Box>
        <FormFields>
          <FormField
            label="Content"
            htmlFor="content"
          >
            <textarea
              autoFocus
              id="content"
              name="content"
              type="text"
              value={content}
              onChange={this.onChangeContent}
              rows="3"
            />
          </FormField>
          <FormField
            label="Paragraph Size"
            htmlFor="paragraphSize"
          >
            <Select
              onChange={this.onChangeContent}
              value={paragraphSize}
              options={[
                'small',
                'medium',
                'large',
              ]}
              name="paragraphSize"
              id="paragraphSize"
            />
          </FormField>
        </FormFields>
        <Box direction="row">
          <Box flex>
            <Tabs
              responsive={false}
              activeIndex={activeSlideIndex} justify="start"
              style={{ marginBottom: '-1px' }}
            >
              {tabs}
            </Tabs>
          </Box>
          <Menu inline align="start" direction="row">
            <Button onClick={() => this.onReorderCTAs('BACKWARDS')} icon={<PreviousIcon />} />
            <Button onClick={() => this.onReorderCTAs('FORWARDS')} icon={<NextIcon />} />
          </Menu>
        </Box>
        {buttonForm}
      </Box>
    );
  }
}

export default BlockParagraphCTAsForm;
