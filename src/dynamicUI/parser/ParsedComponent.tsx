import type {
  ButtonProperties, CardLayoutProperties,
  ComponentConfig, ConcatTextProperties, FlexLayoutProperties,
  HeadlineProperties, ImageProperties,
  InputProperties, LabeledTextProperties, LinkProperties, ListProperties,
  TextareaProperties, TextProperties
} from '@/dynamicUI/components/ComponentConfig';
import HeadlineComponent from '@/dynamicUI/components/data/HeadlineComponent';
import InputComponent from '@/dynamicUI/components/form/InputComponent';
import TextareaComponent from '@/dynamicUI/components/form/TextareaComponent';
import ButtonComponent from '@/dynamicUI/components/form/ButtonComponent';
import FlexLayoutComponent from '@/dynamicUI/components/layout/FlexLayoutComponent';
import type { FC } from 'react';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import ImageComponent from '@/dynamicUI/components/media/ImageComponent';
import CardLayoutComponent from '@/dynamicUI/components/layout/CardLayoutComponent';
import TextComponent from '@/dynamicUI/components/data/TextComponent';
import LabeledTextComponent from '@/dynamicUI/components/data/LabeledTextComponent';
import ListComponent from '@/dynamicUI/components/data/ListComponent';
import LinkComponent from '@/dynamicUI/components/data/LinkComponent';
import ConcatTextComponent from '@/dynamicUI/components/data/ConcatTextComponent';

const ParsedComponent: FC<{ config:  ComponentConfig}> = ({ config }) => {

  const { type, properties } = config;

  switch (type) {
    case 'Headline':
      return <HeadlineComponent properties={properties as HeadlineProperties} />;
    case 'Input':
      return (
        <InputComponent properties={properties as InputProperties} />
      );
    case 'Textarea':
      return (
        <TextareaComponent properties={properties as TextareaProperties} />
      );
    case 'Button':
      return <ButtonComponent properties={properties as ButtonProperties} />;
    case 'FlexLayout':
      return (
        <FlexLayoutComponent properties={properties as FlexLayoutProperties}>
          <ParsedLayout config={properties as FlexLayoutProperties} />
        </FlexLayoutComponent>
      );
    case 'Image':
      return <ImageComponent properties={properties as ImageProperties} />;
    case 'CardLayout':
      return (
        <CardLayoutComponent properties={properties as CardLayoutProperties}>
          <ParsedLayout config={properties as CardLayoutProperties} />
        </CardLayoutComponent>
      );
    case 'Text':
      return (
        <TextComponent properties={properties as TextProperties} />
      );
    case 'LabeledText':
      return (
        <LabeledTextComponent properties={properties as LabeledTextProperties} />
      );
    case 'List':
      return (
        <ListComponent properties={properties as ListProperties} />
      );
    case 'Link':
      return (
        <LinkComponent properties={properties as LinkProperties} />
      );
    case 'ConcatText':
      return (
        <ConcatTextComponent properties={properties as ConcatTextProperties} />
      );
    default:
      return type;
  }
};

export default ParsedComponent;
