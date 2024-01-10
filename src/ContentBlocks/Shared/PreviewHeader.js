import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';
import SettingsOptionIcon from 'grommet/components/icons/base/SettingsOption';
import DuplicateIcon from 'grommet/components/icons/base/Duplicate';

// This is broken now with React 16.
// Using a local version in the CMs works.

export default class PreviewHeader extends Component { // eslint-disable-line
  render() {
    console.warn('PreviewHeader will be removed from the content block library.'); // eslint-disable-line
    const { edit, onClose, onEdit, onMove, title, onLayoutClick,
      onDuplicateClick } = this.props;
    return (
      <Box direction="row" responsive={false} align="center">
        <Heading tag="h3">
          {title}
        </Heading>
        <Box align="end" flex="grow">
          <Menu
            responsive
            inline={false}
          >
            {(!edit)
              ?
                <Anchor
                  icon={<EditIcon size="small" />}
                  label="Edit"
                  onClick={onEdit}
                />
              : undefined
            }
            <Anchor
              icon={<SettingsOptionIcon size="small" />}
              label="Advanced Layout"
              onClick={onLayoutClick}
            />
            <Anchor
              icon={<DuplicateIcon size="small" />}
              label="Duplicate Block"
              onClick={onDuplicateClick}
            />
            <Anchor
              icon={<TrashIcon size="small" />}
              label="Delete"
              onClick={onClose}
            />
            <Anchor
              icon={<UpIcon size="small" />}
              onClick={onMove.bind(this, 'up')}
              label="Move Up"
            />
            <Anchor
              label="Move Down"
              icon={<DownIcon size="small" />}
              onClick={onMove.bind(this, 'down')}
            />
          </Menu>
        </Box>
      </Box>
    );
  }
}

PreviewHeader.propTypes = {
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onMove: PropTypes.func,
  onLayoutClick: PropTypes.func,
  onDuplicateClick: PropTypes.func,
  edit: PropTypes.bool,
  title: PropTypes.string,
};
