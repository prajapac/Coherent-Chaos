import React from 'react';
import { shallow } from 'enzyme';

import PlayerPicker from './index';

import { PLAYER_1, PLAYER_2 } from 'constants';

test('PlayerPicker renders without crashing', () => {
    const component = shallow(
        <PlayerPicker />
    );
    expect(component.exists());
});

/*const onChoose = jest.fn();
test('PlayerPicker click should trigger onChoose', () => {
    var player1Disabled = false;
    var player2Disabled = false;

    const component = shallow(
        <PlayerPicker onChoose={onChoose} player1Disabled={false} player2Disabled={false} />
    );
    const array = component.find('Button');

    array.first().simulate('click');
    expect(onChoose).toBeCalledWith();

    array.at(1).simulate('click');
    expect(onChoose).toBeCalledWith();
});*/
