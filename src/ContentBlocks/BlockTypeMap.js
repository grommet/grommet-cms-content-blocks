import React from 'react';
import {
  BlockHeading,
  BlockHeadingWireframe,
  BlockParagraph,
  BlockParagraphWireframe,
  BlockParagraphForm,
  BlockImage,
  BlockImageForm,
  BlockImageWireframe,
  BlockCard,
  BlockCardForm,
  BlockCardWireframe,
  BlockQuote,
  BlockQuoteForm,
  BlockQuoteCardForm,
  BlockQuoteWireframe,
  BlockVideo,
  BlockVideoWireframe,
  BlockVideoForm,
  BlockCarousel,
  BlockCarouselForm,
  BlockCarouselWireframe,
  GenericPreview,
  BlockColorSwatch,
  BlockColorSwatchForm,
  BlockColorSwatchPreview,
  BlockColorSwatchWireframe,
  BlockBox,
  BlockBoxForm,
  BlockHeadingForm,
  BlockBoxWireframe,
  BlockAssetLink,
  BlockAssetLinkForm,
  BlockAssetLinkWireframe,
  BlockHero,
  BlockHeroForm,
  BlockHeroWireframe,
  BlockImageGallery,
  BlockImageGalleryWireframe
} from './index';

export default {
  BlockBox: {
    element: <BlockBox />,
    preview: <GenericPreview />,
    form: <BlockBoxForm />,
    name: 'Box',
    wireframe: <BlockBoxWireframe />
  },
  BlockParagraph: {
    element: <BlockParagraph />,
    preview: <GenericPreview />,
    form: <BlockParagraphForm />,
    name: 'Paragraph',
    wireframe: <BlockParagraphWireframe />
  },
  BlockHeading: {
    element: <BlockHeading />,
    preview: <GenericPreview />,
    form: <BlockHeadingForm />,
    name: 'Headline',
    wireframe: <BlockHeadingWireframe />
  },
  BlockImage: {
    element: <BlockImage />,
    preview: <GenericPreview />,
    form: <BlockImageForm />,
    name: 'Image',
    wireframe: <BlockImageWireframe />
  },
  BlockImageGallery: {
    element: <BlockImageGallery />,
    preview: <GenericPreview />,
    form: <BlockCarouselForm />,
    name: 'Image Gallery',
    wireframe: <BlockImageGalleryWireframe />
  },
  BlockHero: {
    element: <BlockHero />,
    preview: <GenericPreview />,
    form: <BlockHeroForm />,
    name: 'Hero',
    wireframe: <BlockHeroWireframe />
  },
  BlockCarousel: {
    element: <BlockCarousel />,
    preview: <GenericPreview />,
    form: <BlockCarouselForm />,
    name: 'Carousel',
    wireframe: <BlockCarouselWireframe />
  },
  BlockVideo: {
    element: <BlockVideo />,
    preview: <GenericPreview />,
    form: <BlockVideoForm />,
    name: 'Video',
    wireframe: <BlockVideoWireframe />
  },
  BlockCardParagraph: {
    element: <BlockCard />,
    preview: <GenericPreview />,
    form: <BlockCardForm />,
    name: 'Card',
    wireframe: <BlockCardWireframe />
  },
  BlockQuote: {
    element: <BlockQuote />,
    preview: <GenericPreview />,
    form: <BlockQuoteForm />,
    name: 'Quote',
    wireframe: <BlockQuoteWireframe />
  },
  BlockQuoteCard: {
    element: <BlockQuote />,
    preview: <GenericPreview />,
    form: <BlockQuoteCardForm />,
    name: 'Quote w/ Card',
    wireframe: <BlockQuoteWireframe />
  },
  BlockColorSwatch: {
    element: <BlockColorSwatch />,
    name: 'Color Swatch',
    preview: <BlockColorSwatchPreview />,
    form: <BlockColorSwatchForm />,
    wireframe: <BlockColorSwatchWireframe />
  },
  BlockAssetLink: {
    element: <BlockAssetLink />,
    name: 'Asset Link',
    preview: <GenericPreview />,
    form: <BlockAssetLinkForm />,
    wireframe: <BlockAssetLinkWireframe />
  }
};
