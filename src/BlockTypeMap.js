import React from 'react';
import {
  BlockHeading,
  BlockHeadingWireframe,
  BlockParagraph,
  BlockParagraphWireframe,
  BlockParagraphForm,
  BlockImage,
  BlockImageWireframe,
  BlockCard,
  BlockCardWireframe,
  BlockQuote,
  BlockQuoteWireframe,
  BlockVideo,
  BlockVideoWireframe,
  BlockCarousel,
  BlockCarouselWireframe,
  GenericPreview,
  BlockColorSwatch,
  BlockColorSwatchForm,
  BlockColorSwatchWireframe,
  BlockBox,
  BlockBoxForm,
  BlockHeadingForm,
  BlockBoxWireframe,
  BlockAssetLink,
  BlockAssetLinkForm,
  BlockAssetLinkWireframe
} from './index';

export default {
  BlockBox: {
    element: <BlockBox />,
    preview: <GenericPreview />,
    name: 'Box',
    wireframe: <BlockBoxWireframe />
  },
  BlockParagraph: {
    element: <BlockParagraph />,
    preview: <GenericPreview />,
    name: 'Paragraph',
    wireframe: <BlockParagraphWireframe />
  },
  BlockHeading: {
    element: <BlockHeading />,
    preview: <GenericPreview />,
    name: 'Headline',
    wireframe: <BlockHeadingWireframe />
  },
  BlockImage: {
    element: <BlockImage />,
    preview: <GenericPreview />,
    name: 'Image',
    wireframe: <BlockImageWireframe />
  },
  BlockCardParagraph: {
    element: <BlockCard />,
    preview: <GenericPreview />,
    name: 'Card',
    wireframe: <BlockCardWireframe />
  },
  BlockQuote: {
    element: <BlockQuote />,
    preview: <GenericPreview />,
    name: 'Quote',
    wireframe: <BlockQuoteWireframe />
  },
  BlockVideo: {
    element: <BlockVideo />,
    preview: <GenericPreview />,
    name: 'Video',
    wireframe: <BlockVideoWireframe />
  },
  BlockCarousel: {
    element: <BlockCarousel />,
    preview: <GenericPreview />,
    name: 'Carousel',
    wireframe: <BlockCarouselWireframe />
  },
  BlockColorSwatch: {
    element: <BlockColorSwatch />,
    name: 'Color Swatch',
    preview: <GenericPreview />,
    wireframe: <BlockColorSwatchWireframe />
  },
  BlockAssetLink: {
    element: <BlockAssetLink />,
    name: 'Asset Link',
    preview: <GenericPreview />,
    wireframe: <BlockAssetLinkWireframe />
  }
};
