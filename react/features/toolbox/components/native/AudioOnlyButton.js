// @flow

import { toggleAudioOnly } from '../../../base/audio-only';
import { translate } from '../../../base/i18n';
import { IconAudioOnly, IconAudioOnlyOff } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton } from '../../../base/toolbox';
import {NativeModules} from 'react-native';
import type { AbstractButtonProps } from '../../../base/toolbox';
import styles, { HOLD_DISABLED_ICON } from './styles';
import { IconMicDisabled, IconMicrophone } from '../../../base/icons';
const { JSCommunicateComponent, AudioMode, OpenMelpChat } = NativeModules;

/**
 * The type of the React {@code Component} props of {@link AudioOnlyButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether the current conference is in audio only mode or not.
     */
    _audioOnly: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for toggling the audio-only mode.
 */
class AudioOnlyButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.audioOnly';
    icon = IconMicrophone;
    label = 'toolbar.audioOnlyOn';
    toggledIcon = IconMicDisabled;
    toggledLabel = 'toolbar.audioOnlyOff';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        if (NativeModules.OpenMelpAppChat && NativeModules.OpenMelpAppChat.audioOnlyToggled) {
            NativeModules.OpenMelpAppChat.audioOnlyToggled();
        }
        this.props.dispatch(toggleAudioOnly());

    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._audioOnly;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AudioOnlyButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _audioOnly: boolean
 * }}
 */
function _mapStateToProps(state): Object {
    const { enabled: audioOnly } = state['features/base/audio-only'];

    return {
        _audioOnly: Boolean(audioOnly)
    };
}

export default translate(connect(_mapStateToProps)(AudioOnlyButton));
