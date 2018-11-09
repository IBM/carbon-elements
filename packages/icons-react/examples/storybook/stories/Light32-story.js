import React from 'react';
import { storiesOf } from '@storybook/react';
import Light32 from '../../../lib/Light/32';

storiesOf('Light32', module)
  .add('default', () => <Light32 />)
  .add('with accessibility label', () => (
    <Light32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Light32 focusable>
      <title>Icon title</title>
    </Light32>
  ));
