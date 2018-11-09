import React from 'react';
import { storiesOf } from '@storybook/react';
import Dvr32 from '../../../lib/Dvr/32';

storiesOf('Dvr32', module)
  .add('default', () => <Dvr32 />)
  .add('with accessibility label', () => (
    <Dvr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Dvr32 focusable>
      <title>Icon title</title>
    </Dvr32>
  ));
