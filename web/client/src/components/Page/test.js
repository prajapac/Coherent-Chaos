import React from 'react';
import { shallow } from 'enzyme';

import Page from './index';

test('Page renders without crashing', () => {
    const component = shallow(
        <Page />
    );
    expect(component.exists());
});

test('Page should take children as a parameter', () => {
    const component = shallow(
        <Page children='test'/>
    );
    expect(component.prop('children')).toEqual('test');
});
