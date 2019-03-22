import React from 'react';
import { shallow } from 'enzyme';

import InfoBox from './index';

test('InfoBox renders without crashing', () => {
    const component = shallow(
        <InfoBox />
    );
    expect(component.exists());
});

test('InfoBox click should trigger onClose and pass message down', () => {
    const onClose = jest.fn();
    const component = shallow(
        <InfoBox onClose={onClose} message={'test'} />
    );

    component.find('.close').simulate('click');
    expect(onClose).toHaveBeenCalled();
    expect(component.find('.info-box-message').prop('children')).toEqual('test');
});
