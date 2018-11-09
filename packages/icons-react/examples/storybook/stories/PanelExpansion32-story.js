import React from 'react';
import { storiesOf } from '@storybook/react';
import PanelExpansion32 from '../../../lib/PanelExpansion/32';

storiesOf('PanelExpansion32', module)
  .add('default', () => <PanelExpansion32 />)
  .add('with accessibility label', () => (
    <PanelExpansion32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PanelExpansion32 focusable>
      <title>Icon title</title>
    </PanelExpansion32>
  ));
