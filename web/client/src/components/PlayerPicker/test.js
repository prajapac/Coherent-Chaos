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

test('PlayerPicker click should trigger onChoose', () => {
    let player1Disabled = false;
    let player2Disabled = false;
    let gameId = '1234';
    const onChoose = jest.fn();
    const component = shallow(
        <PlayerPicker gameId={gameId} onChoose={onChoose} player1Disabled={false} player2Disabled={false} />
    );
    const array = component.find('Button');

    array.first().simulate('click');
    expect(onChoose).toBeCalledWith(gameId, PLAYER_1);

    array.at(1).simulate('click');
    expect(onChoose).toBeCalledWith(gameId, PLAYER_2);
});
