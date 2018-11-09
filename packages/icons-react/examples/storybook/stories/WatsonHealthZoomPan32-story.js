import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthZoomPan32 from '../../../lib/WatsonHealthZoomPan/32';

storiesOf('WatsonHealthZoomPan32', module)
  .add('default', () => <WatsonHealthZoomPan32 />)
  .add('with accessibility label', () => (
    <WatsonHealthZoomPan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthZoomPan32 focusable>
      <title>Icon title</title>
    </WatsonHealthZoomPan32>
  ));
