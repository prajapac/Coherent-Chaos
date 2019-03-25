import React from 'react';
import { shallow } from 'enzyme';

import Header from './index';

test('Header renders without crashing', () => {
    const component = shallow(
        <Header />
    );
    expect(component.exists());
});

test('Header should contain three div elements', () => {
    const component = shallow(
        <Header />
    );
    expect(component.find('.header__left').length).toEqual(1);
    expect(component.find('.header__mid').length).toEqual(1);
    expect(component.find('.header__right').length).toEqual(1);
});

test('Header should take left and right as two parameters', () => {
    const component = shallow(
        <Header left='left' right='right'/>
    );
    expect(component.find('.header__left').prop('children')).toEqual('left');
    expect(component.find('.header__right').prop('children')).toEqual('right');
});
