import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_232 from '../../../lib/NumberSmall_2/32';

storiesOf('NumberSmall_232', module)
  .add('default', () => <NumberSmall_232 />)
  .add('with accessibility label', () => (
    <NumberSmall_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_232 focusable>
      <title>Icon title</title>
    </NumberSmall_232>
  ));
