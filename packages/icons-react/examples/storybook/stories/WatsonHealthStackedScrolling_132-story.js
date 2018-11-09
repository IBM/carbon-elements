import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_132 from '../../../lib/WatsonHealthStackedScrolling_1/32';

storiesOf('WatsonHealthStackedScrolling_132', module)
  .add('default', () => <WatsonHealthStackedScrolling_132 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_132 focusable>
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_132>
  ));
