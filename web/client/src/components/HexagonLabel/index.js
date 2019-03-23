import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from 'components/Cell';

import {
    SIZE_LARGE as SL
} from 'constants';

import './index.scss';

const HexagonLabel = ({className, children, cellState}) => {
    let classes = classNames('hexlabel', className);

    return (
        <div className={classes}>
            <Cell className='hexlabel-bg' state={cellState} size={SL}/>
            <div className='hexlabel-children'>
                {children}
            </div>
        </div>
    );
};

HexagonLabel.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    cellState: PropTypes.number,
};

export default HexagonLabel;
