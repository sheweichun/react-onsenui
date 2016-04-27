import React from 'react';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

/**
 * @original ons-splitter-side
 * @category splitter
 * @description
 * [en]  The SplitterContent  element is used as a child element of Splitter.
 *    It contains the main content of the page while SplitterSide contains the list.
 [/en]
 * [jp][/jp]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterContent>
      <Page> Page Content </Page>
    </SplitterContent>
    <SplitterSide
      side="right"
      width={300}
      isCollapsed={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

class SplitterSide extends BasicComponent {
  render() {
    var {...props} = this.props;

    props.collapse = this.props.isCollapsed ? 'collapse' : 'false';
    props.swipeable = this.props.isSwipeable ? 'swipeable' : 'false';

    Util.convert(props, 'width', {fun: Util.sizeConverter});
    Util.convert(props, 'animation');
    Util.convert(props, 'side');
    Util.convert(props, 'mode');
    Util.convert(props, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});
    Util.convert(props, 'openThreshold', {newName: 'open-threshold'});
    Util.convert(props, 'SwipeTargetWidth', {fun: Util.sizeConverter, newName: 'swipe-target-width'});

    return (
      <ons-splitter-side {...props} >
        {this.props.children}
      </ons-splitter-side>
    );
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);

    this.node.addEventListener('postopen', this.props.onOpen);
    this.node.addEventListener('postclose', this.props.onClose);
    this.node.addEventListener('preopen', this.props.onPreOpen);
    this.node.addEventListener('preclose', this.props.onPreClose);
    this.node.addEventListener('modechange', this.props.onModeChange);
  }

  componentWillUnmount() {
    this.node.removeEventListener('postopen', this.props.onOpen);
    this.node.removeEventListener('postclose', this.props.onClose);
    this.node.removeEventListener('preopen', this.props.onPreOpen);
    this.node.removeEventListener('preclose', this.props.onPreClose);
    this.node.removeEventListener('modechange', this.props.onModeChange);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen) {
      this.node.open();
    } else {
      this.node.close();
    }
  }
}

SplitterSide.propTypes = {
  /**
   * @name isCollapsed
   * @type bool
   * @description
   *  [en]The appearance of the button.[/en]
   *  [jp] [/jp]
   */
  isCollapsed: React.PropTypes.bool.isRequired,

  /**
   * @name isSwipable
   * @type bool
   * @description
   *  [en]Ennable swipe interaction on collapse mode.[/en]
   *  [jp] [/jp]
   */
  isSwipable: React.PropTypes.bool,

  /**
   * @name isOpen
   * @type bool
   * @description
   *  [en]Specifies whether the menu is open.[/en]
   *  [jp] [/jp]
   */
  isOpen: React.PropTypes.bool,

  /**
   * @name onOpen
   * @type function
   * @description
   *  [en]Called after the menu is opened.[/en]
   *  [jp] [/jp]
   */
  onOpen: React.PropTypes.func,

  /**
   * @name onClose
   * @type function
   * @description
   *  [en]Called after the menu is closed.[/en]
   *  [jp] [/jp]
   */
  onClose: React.PropTypes.func,

  /**
   * @name side
   * @type string
   * @description
   *  [en]Specify which side of the screen the SplitterSide element is located. Possible values are `"left"` and `"right"`.[/en]
   *  [jp] [/jp]
   */
  side: React.PropTypes.oneOf(['left', 'right']),

  /**
   * @name width
   * @type  numebr
   * @description
   *  [en]Specifies the width of the menu with a number (for pixels) or a string (e.g. "20%" for percentage).[/en]
   *  [jp] [/jp]
   */
  width: React.PropTypes.oneOf(React.PropTypes.number, React.PropTypes.string),

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Specify the animation. Use one of `"overlay"`, and `"default"`.[/en]
   *  [jp] [/jp]
   */
  animation: React.PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [jp] [/jp]
   */
  animationOptions: React.PropTypes.object,

  /**
   * @name openThreshold
   * @type object
   * @required false
   * @description
   *  [en] Specify how much the menu needs to be swiped before opening. A value between `0` and `1`.  [/en]
   *  [jp] [/jp]
   */
  openThreshold: React.PropTypes.number,

  /**
   * @name mode
   * @type string
   * @required false
   * @description
   *  [en] Current mode. Possible values are `"collapse"` or `"split"`. This attribute is read only.  [/en]
   *  [jp] [/jp]
   */
  mode: React.PropTypes.oneOf(['collapse', 'split']),

  /**
   * @name onPreOpen
   * @type string
   * @description
   *  [en] Called before the menu opens.  [/en]
   *  [jp] [/jp]
   */
  onPreOpen: React.PropTypes.func,

  /**
   * @name onPreClose
   * @type string
   * @description
   *  [en] Called before the menu closes.  [/en]
   *  [jp] [/jp]
   */
  onPreClose: React.PropTypes.func,

  /**
   * @name onModeChange
   * @type string
   * @description
   *  [en] Called after the component's mode changes. [/en]
   *  [jp] [/jp]
   */
  onModeChange: React.PropTypes.func
};

export default SplitterSide;
