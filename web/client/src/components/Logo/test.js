import React from 'react';
import { shallow } from 'enzyme';

import Logo from './index';

import config from 'constants/config.js';

test('Logo renders without crashing', () => {
    const component = shallow(
        <Logo />
    );
    expect(component.exists());
});

test('Logo should render correct short image', () => {
    const component = shallow(
        <Logo/>
    );
    expect(component.find('.logo').prop('src')).toEqual(config.LOGO_URL);
});

test('Logo should render correct long image', () => {
    const component = shallow(
        <Logo long/>
    );
    expect(component.find('.logo').prop('src')).toEqual(config.LOGO_LONG_URL);
});
