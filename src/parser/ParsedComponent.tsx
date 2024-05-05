import type {
  ButtonProperties, CardLayoutProperties,
  ComponentConfig, FlexLayoutProperties,
  HeadlineProperties, ImageProperties,
  InputProperties, LabeledTextProperties,
  TextareaProperties, TextProperties
} from '@/interfaces/components/ComponentConfig';
import HeadlineComponent from '@/app/components/data/HeadlineComponent';
import InputComponent from '@/app/components/form/InputComponent';
import TextareaComponent from '@/app/components/form/TextareaComponent';
import ButtonComponent from '@/app/components/form/ButtonComponent';
import FlexLayoutComponent from '@/app/components/layout/FlexLayoutComponent';
import type { FC } from 'react';
import ParsedLayout from '@/parser/ParsedLayout';
import ImageComponent from '@/app/components/media/ImageComponent';
import CardLayoutComponent from '@/app/components/layout/CardLayoutComponent';
import TextComponent from '@/app/components/data/TextComponent';
import LabeledTextComponent from '@/app/components/data/LabeledTextComponent';

const ParsedComponent: FC<{ config:  ComponentConfig}> = ({ config }) => {

  const { type, properties } = config;

  switch (type) {
    case 'Headline':
      return <HeadlineComponent properties={properties as HeadlineProperties} />;
    case 'Input':
      return <InputComponent properties={properties as InputProperties} />;
    case 'Textarea':
      return <TextareaComponent properties={properties as TextareaProperties} />;
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
      return <TextComponent properties={properties as TextProperties} />;
    case 'LabeledText':
      return <LabeledTextComponent properties={properties as LabeledTextProperties} />;
    default:
      return type;
  }
};

export default ParsedComponent;
