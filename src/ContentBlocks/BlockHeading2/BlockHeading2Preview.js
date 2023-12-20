import React, { PropTypes } from "react";
import Headline from "grommet/components/Headline";

export default function BlockHeading2Preview({ content }) {
  return <Headline>{content}</Headline>;
}

BlockHeading2Preview.propTypes = {
  content: PropTypes.string,
};
