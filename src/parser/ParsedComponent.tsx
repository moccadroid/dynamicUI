import type {
  ButtonProperties,
  ComponentConfig, FlexLayoutProperties,
  HeadlineProperties, ImageProperties,
  InputProperties,
  TextareaProperties
} from '@/interfaces/config/ComponentConfig';
import HeadlineComponent from '@/app/components/HeadlineComponent';
import InputComponent from '@/app/components/form/InputComponent';
import TextareaComponent from '@/app/components/form/TextareaComponent';
import ButtonComponent from '@/app/components/form/ButtonComponent';
import FlexLayout from '@/app/components/layout/FlexLayout';
import type { FC } from 'react';
import ParsedLayout from '@/parser/ParsedLayout';
import ImageComponent from '@/app/components/media/ImageComponent';

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
        <FlexLayout properties={properties as FlexLayoutProperties}>
          <ParsedLayout config={properties as FlexLayoutProperties} />
        </FlexLayout>
      );
    case 'Image':
      return <ImageComponent properties={properties as ImageProperties} />;
    default:
      return type;
  }
};

export default ParsedComponent;
