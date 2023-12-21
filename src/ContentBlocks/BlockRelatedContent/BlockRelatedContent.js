import React, { PropTypes } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import { StyledBox, StyledAnchor } from "./styles";

export default function BlockRelatedContent({ data }) {
  return (
    <Box pad="medium">
      <Heading tag="h3" strong colorIndex="black">
        Related Content
      </Heading>
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
