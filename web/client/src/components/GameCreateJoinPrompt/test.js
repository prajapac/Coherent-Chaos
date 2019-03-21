import React from 'react';
import { shallow } from 'enzyme';

import GameCreateJoinPrompt from './index';

import { GAME_ID_LENGTH } from 'constants';

test('GameCreateJoinPrompt renders without crashing', () => {
    const component = shallow(
        <GameCreateJoinPrompt />
    );
    expect(component.exists());
});

test('Successfully change game Id', () => {
    let gameId = '1234';
    const event = { 'target':{'value': gameId}};
    const component = shallow(
        <GameCreateJoinPrompt />
    );
    const instance = component.instance();
    instance.handleGameIdChange(event);
    expect(component.state().gameId).toEqual(gameId);
    expect(component.state().error).toEqual(false);
});


test('Successfully join a game', () => {
    let gameId = '1234';
    const onJoinGame = jest.fn();
    const event = { 'target':{'value': gameId}};
    const component = shallow(
        <GameCreateJoinPrompt onJoinGame={onJoinGame} />
    );
    const instance = component.instance();
    instance.handleGameIdChange(event);
    expect(component.state().gameId).toEqual(gameId);
    expect(component.state().error).toEqual(false);
    instance.handleJoin();
    expect(onJoinGame).toHaveBeenCalledWith(gameId);
    expect(component.state().error).toEqual(false);
});

test('GameCreateJoinPrompt click should trigger onCreateGame', () => {
    const onCreateGame = jest.fn();
    const component = shallow(
        <GameCreateJoinPrompt onCreateGame={onCreateGame} />
    );

    component.find('Button').at(1).simulate('click');
    expect(onCreateGame).toHaveBeenCalled();
});
