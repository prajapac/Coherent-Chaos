import React from 'react';
import { shallow } from 'enzyme';

import Hexagon from './index';

test('Hexagon renders without crashing', () => {
    const component = shallow(
        <Hexagon />
    );
    expect(component.exists());
});