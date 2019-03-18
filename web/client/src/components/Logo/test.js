import React from 'react';
import { shallow } from 'enzyme';

import Logo from './index';

test('Logo renders without crashing', () => {
    const component = shallow(
        <Logo />
    );
    expect(component.exists());
});

test('Logo should take children as a parameter', () => {

    const component = shallow(
        <Logo/>
    );
    expect(component.prop('children')).toEqual('COHERENT CHAOS');
});
