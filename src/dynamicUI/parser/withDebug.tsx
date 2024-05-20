import type { FC } from 'react';
import React, { useState } from 'react';
import {
  Button, Flex,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';

const withDebug = (WrappedElement: JSX.Element, config: any): FC => {
  return () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <div
        style={{
          position: 'relative',
          outline: isHovered ? '2px solid blue' : 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {WrappedElement}
        { isHovered && <InfoPopover config={config} /> }
      </div>
    );
  };
};

export default withDebug;

const InfoPopover: FC<{ config: any }> = ({ config }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'lightgray',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
        }}>layout</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>JSON Layout</PopoverHeader>
        <PopoverBody>
          <Flex maxH={400} maxW={400} overflowY="auto">
            <pre>{JSON.stringify(config, null, 2)}</pre>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
