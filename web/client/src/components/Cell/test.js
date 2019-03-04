import React from 'react';
import { shallow } from 'enzyme';

import { COLOR_OPTION_DARK, COLOR_OPTION_LIGHT, COLOR_OPTION_PRIMARY, COLOR_OPTION_SECONDARY } from 'constants/constants';
import { CELL_PLAYER_1, CELL_PLAYER_2, CELL_OUT_OF_PLAY, CELL_EMPTY } from 'constants/constants';

import Cell, { getCellColor } from './index';

test('Cell renders without crashing', () => {
    const component = shallow(
        <Cell />
    );
    expect(component.exists())
});

test('Cell gets correct color', () => {
    expect(getCellColor(CELL_PLAYER_1)).toBe(COLOR_OPTION_PRIMARY);
    expect(getCellColor(CELL_PLAYER_2)).toBe(COLOR_OPTION_SECONDARY);
    expect(getCellColor(CELL_OUT_OF_PLAY)).toBe(COLOR_OPTION_DARK);
    expect(getCellColor(CELL_EMPTY)).toBe(COLOR_OPTION_LIGHT);
});
