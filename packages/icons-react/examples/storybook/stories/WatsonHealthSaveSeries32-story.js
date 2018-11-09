import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveSeries32 from '../../../lib/WatsonHealthSaveSeries/32';

storiesOf('WatsonHealthSaveSeries32', module)
  .add('default', () => <WatsonHealthSaveSeries32 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveSeries32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveSeries32 focusable>
      <title>Icon title</title>
    </WatsonHealthSaveSeries32>
  ));
