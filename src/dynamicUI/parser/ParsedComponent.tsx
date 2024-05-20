import type { FC } from 'react';
import { useMemo } from 'react';
import type {
  ButtonProperties,
  CardLayoutProperties,
  CodeProperties,
  ComponentConfig,
  ConcatTextProperties,
  ContainerLayoutProperties,
  FlexLayoutProperties,
  FormProperties,
  GridLayoutProperties,
  HeadlineProperties,
  ImageProperties,
  InputProperties,
  LabeledTextProperties,
  LinkProperties,
  ListProperties,
  SelectProperties,
  TextareaProperties,
  TextProperties
} from '@/dynamicUI/components/ComponentConfig';
import HeadlineComponent from '@/dynamicUI/components/data/HeadlineComponent';
import InputComponent from '@/dynamicUI/components/form/InputComponent';
import TextareaComponent from '@/dynamicUI/components/form/TextareaComponent';
import ButtonComponent from '@/dynamicUI/components/form/ButtonComponent';
import FlexLayoutComponent from '@/dynamicUI/components/layout/FlexLayoutComponent';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import ImageComponent from '@/dynamicUI/components/media/ImageComponent';
import CardLayoutComponent from '@/dynamicUI/components/layout/CardLayoutComponent';
import TextComponent from '@/dynamicUI/components/data/TextComponent';
import LabeledTextComponent from '@/dynamicUI/components/data/LabeledTextComponent';
import ListComponent from '@/dynamicUI/components/data/ListComponent';
import LinkComponent from '@/dynamicUI/components/data/LinkComponent';
import ConcatTextComponent from '@/dynamicUI/components/data/ConcatTextComponent';
import FormComponent from '@/dynamicUI/components/form/FormComponent';
import GridLayoutComponent from '@/dynamicUI/components/layout/GridLayoutComponent';
import CodeComponent from '@/dynamicUI/components/data/CodeComponent';
import SelectComponent from '@/dynamicUI/components/form/SelectComponent';
import withDebug from '@/dynamicUI/parser/withDebug';
import ContainerLayoutComponent from '@/dynamicUI/components/layout/ContainerLayoutComponent';

const ParsedComponent: FC<{ config:  ComponentConfig, debug?: boolean}> = ({ config, debug = false }) => {

  const { type, properties } = config;

  const resolveComponent = (): JSX.Element => {
    switch (type) {
      case 'Headline':
        return <HeadlineComponent properties={properties as HeadlineProperties} />;
      case 'Code':
        return <CodeComponent properties={properties as CodeProperties} />;
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
      case 'Select':
        return <SelectComponent properties={properties as SelectProperties} />;
      case 'Image':
        return <ImageComponent properties={properties as ImageProperties} />;
      case 'CardLayout':
        return (
          <CardLayoutComponent properties={properties as CardLayoutProperties}>
            <ParsedLayout config={properties as CardLayoutProperties} debug={debug}/>
          </CardLayoutComponent>
        );
      case 'GridLayout':
        return (
          <GridLayoutComponent properties={properties as GridLayoutProperties}>
            <ParsedLayout config={properties as GridLayoutProperties} debug={debug}/>
          </GridLayoutComponent>
        );
      case 'FlexLayout':
        return (
          <FlexLayoutComponent properties={properties as FlexLayoutProperties}>
            <ParsedLayout config={properties as FlexLayoutProperties} debug={debug}/>
          </FlexLayoutComponent>
        );
      case 'ContainerLayout':
        return (
          <ContainerLayoutComponent properties={properties as ContainerLayoutProperties}>
            <ParsedLayout config={properties as ContainerLayoutProperties} debug={debug} />
          </ContainerLayoutComponent>
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
          <ListComponent properties={properties as ListProperties} debug={debug}/>
        );
      case 'Link':
        return (
          <LinkComponent properties={properties as LinkProperties} />
        );
      case 'ConcatText':
        return (
          <ConcatTextComponent properties={properties as ConcatTextProperties} />
        );
      case 'Form':
        return (
          <FormComponent properties={properties as FormProperties}>
            <ParsedLayout config={properties as FormProperties} debug={debug}/>
          </FormComponent>
        );
      default:
        return type;
    }
  };

  return useMemo(() => {
    const Component = resolveComponent();
    const WrappedComponent = debug ? withDebug(Component, config) : () => Component;
    return <WrappedComponent />;
  }, [config, debug]);
};

export default ParsedComponent;
