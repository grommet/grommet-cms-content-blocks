/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

type BlockSpacerFormProps = {
  onSubmit?: (event: SyntheticInputEvent) => void,
};

export default class BlockSpacerForm extends React.Component {
  constructor(props: BlockSpacerFormProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit: (event: SyntheticInputEvent) => void;
  onSubmit(event: SyntheticInputEvent) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(event);
    }
  }

  props: BlockSpacerFormProps;

  render() {
    return (
      <Box colorIndex="light-2" pad="medium">
        <Footer pad="medium">
          <Button
            onClick={this.onSubmit}
            type="submit"
            label="Done"
          />
        </Footer>
      </Box>
    );
  }
}