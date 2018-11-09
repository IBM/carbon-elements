import React from 'react';
import { storiesOf } from '@storybook/react';
import Png32 from '../../../lib/Png/32';

storiesOf('Png32', module)
  .add('default', () => <Png32 />)
  .add('with accessibility label', () => (
    <Png32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Png32 focusable>
      <title>Icon title</title>
    </Png32>
  ));
