import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWinkFilled32 from '../../../lib/FaceWinkFilled/32';

storiesOf('FaceWinkFilled32', module)
  .add('default', () => <FaceWinkFilled32 />)
  .add('with accessibility label', () => (
    <FaceWinkFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWinkFilled32 focusable>
      <title>Icon title</title>
    </FaceWinkFilled32>
  ));
