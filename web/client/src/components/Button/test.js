import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

test('Button renders without crashing', () => {
    const component = shallow(
        <Button />
    );
    expect(component.exists());
});

test('Button renders with text', () => {
    const component = shallow(
        <Button text='text'/>
    );
    expect(component.prop('children')).toEqual('text');
});

test('Button click should trigger an action', () => {
    const action = jest.fn();
    const component = shallow(
        <Button onClick={action} />
    );
    component.simulate('click');
    expect(action).toHaveBeenCalled();
});
