import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorPalette32 from '../../../lib/ColorPalette/32';

storiesOf('ColorPalette32', module)
  .add('default', () => <ColorPalette32 />)
  .add('with accessibility label', () => (
    <ColorPalette32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ColorPalette32 focusable>
      <title>Icon title</title>
    </ColorPalette32>
  ));
