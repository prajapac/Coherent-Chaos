import React from 'react';
import { shallow } from 'enzyme';

import HexagonLabel from './index';

test('HexagonLabel renders without crashing', () => {
    const component = shallow(
        <HexagonLabel />
    );
    expect(component.exists());
});

test('HexagonLabel renders string prop', () => {
    const component = shallow(
        <HexagonLabel>
            <div className='test'/>
        </HexagonLabel>
    );

    expect(component.find('.hexlabel-bg').length).toEqual(1);
    expect(component.find('.hexlabel-children').length).toEqual(1);
});

test('HexagonLabel renders component prop', () => {
    const component = shallow(
        <HexagonLabel>
            <div className='test'/>
        </HexagonLabel>
    );

    expect(component.find('.hexlabel-bg').length).toEqual(1);
    expect(component.find('.hexlabel-children').length).toEqual(1);
    expect(component.find('.test').length).toEqual(1);
});
