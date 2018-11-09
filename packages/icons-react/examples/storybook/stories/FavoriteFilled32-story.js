import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled32 from '../../../lib/FavoriteFilled/32';

storiesOf('FavoriteFilled32', module)
  .add('default', () => <FavoriteFilled32 />)
  .add('with accessibility label', () => (
    <FavoriteFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled32 focusable>
      <title>Icon title</title>
    </FavoriteFilled32>
  ));
