// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Menu from 'grommet/components/Menu';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import NextIcon from 'grommet/components/icons/base/Next';

type Props = {
  carousel: any,
  activeSlideIndex: number,
  onTabsClick: () => void,
  onReorder: (direction: 'FORWARDS' | 'BACKWARDS') => void
}

// eslint-disable-next-line react/prefer-stateless-function
export default class SlideReordering extends React.Component {

  props: Props;

  render() {
    const { carousel, activeSlideIndex, onTabsClick, onReorder } = this.props;
    return (
      <Box direction="row">
        <Box flex>
          <Tabs
            responsive={false}
            className="grommetux-tabs--scroll-horizontal"
            activeIndex={activeSlideIndex} justify="start"
            style={{ marginBottom: '-1px' }}
          >
            {carousel.map((slide, index) =>
              <Tab
                title={`Slide ${index + 1}`}
                key={index}
                onClick={() => onTabsClick(index)}
              />,
            )}
          </Tabs>
        </Box>
        <Menu inline align="start" direction="row">
          <Button onClick={() => onReorder('BACKWARDS')} icon={<PreviousIcon />} />
          <Button onClick={() => onReorder('FORWARDS')} icon={<NextIcon />} />
        </Menu>
      </Box>
    );
  }
}