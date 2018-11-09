import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingBag32 from '../../../lib/ShoppingBag/32';

storiesOf('ShoppingBag32', module)
  .add('default', () => <ShoppingBag32 />)
  .add('with accessibility label', () => (
    <ShoppingBag32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingBag32 focusable>
      <title>Icon title</title>
    </ShoppingBag32>
  ));
