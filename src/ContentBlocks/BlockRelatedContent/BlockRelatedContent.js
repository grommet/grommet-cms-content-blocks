import React, { PropTypes } from "react";
import Box from "grommet/components/Box";
import Paragraph from "grommet/components/Paragraph";
import { StyledBox, StyledAnchor, StyledHeading } from "./styles";

export default function BlockRelatedContent({ data, label }) {
  return (
    <Box pad="medium">
      <StyledHeading tag="h3" strong>
        {label}
      </StyledHeading>
      {data &&
        data.map(({ href, title, content }, index) => (
          <StyledBox>
            <StyledAnchor textDecoration="none" key={index} href={href}>
              <Paragraph margin="none">
                <b>{title}</b>
              </Paragraph>
              <Paragraph margin="none">{content}</Paragraph> 
            </StyledAnchor>
          </StyledBox>
        ))}
    </Box>
  );
}

BlockRelatedContent.propTypes = {
  content: PropTypes.string,
};
