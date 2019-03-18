import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './index';

test('Spinner renders without crashing', () => {
    const component = shallow(
        <Spinner />
    );
    expect(component.exists());
});
