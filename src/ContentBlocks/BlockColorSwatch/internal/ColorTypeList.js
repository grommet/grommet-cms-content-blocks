/* @flow */
import React from 'react';
import Heading from 'grommet/components/Heading';
// import colorConvertor from './colorConversion';

export default function ColorTypeList(props: {
  color: {
    cmyk: ?string,
    name: ?string,
    hex: ?string,
    rgb: ?string,
    pms: ?string,
    crownFoil: ?string,
  }
}) {
  const { hex, cmyk, name, rgb, crownFoil, pms } = props.color;
  return (
    <ul style={{ listStyle: 'none', marginLeft: 0 }}>
      <li>
        <Heading tag="h4" strong>
          {name || 'No Name'}
        </Heading>
      </li>
      {cmyk && 
        <li>
          <Heading tag="h5" margin="none">
            {`CMYK ${cmyk || 'N/A'}`}
          </Heading>
        </li>
      }
      {rgb &&
        <li>
          <Heading tag="h5" margin="none">
            {`RGB ${rgb || 'N/A'}`}
          </Heading>
        </li>
      }
      {hex &&
        <li>
          <Heading tag="h5" margin="none">
            {`HEX ${hex || 'N/A'}`}
          </Heading>
        </li>
      }
      {pms &&
        <li>
          <Heading tag="h5" margin="none">
            {`PMS ${pms || 'N/A'}`}
          </Heading>
        </li>
      }
      {crownFoil &&
        <li>
          <Heading tag="h5" margin="none">
            {`CROWN FOIL ${crownFoil || 'N/A'}`}
          </Heading>
        </li>
      }
    </ul>
  );
}

