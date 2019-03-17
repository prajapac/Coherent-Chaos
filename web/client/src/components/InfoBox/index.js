import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import './index.scss';

class InfoBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classes = classNames('info-box', {'open': this.props.message !== null});

        return (
            <div className={classes}>
                <div className='info-box-inner'>
                    <div className='info-box-header'>
                        <div className='label'>
                            Notice:
                        </div>
                        <div className='close' onClick={this.props.onClose}>
                            X
                        </div>
                    </div>
                    <div className='info-box-message'>
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}

InfoBox.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func
};

InfoBox.defaultProps = {
    onClose: () => {}
};

export default InfoBox;
