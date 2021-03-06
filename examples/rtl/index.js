
import { Editor, Raw } from '../..'
import React from 'react'
import SoftBreak from 'slate-soft-break'
import initialState from './state.json'

/**
 * Define a set of node renderers.
 *
 * @type {Object}
 */

const NODES = {
  'block-quote': (props) => <blockquote {...props.attributes}>{props.children}</blockquote>,
}

/**
 * The plain text example.
 *
 * @type {Component}
 */

class PlainText extends React.Component {

  /**
   * Deserialize the initial editor state.
   *
   * @type {Object}
   */

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  /**
   * On change.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.setState({ state })
  }

  /**
   * On key down, if it's <shift-enter> add a soft break.
   *
   * @param {Event} e
   * @param {Object} data
   * @param {State} state
   */

  onKeyDown = (e, data, state) => {
    if (data.key == 'enter' && data.isShift) {
      return state
        .transform()
        .insertText('\n')
        .apply()
    }
  }

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render = () => {
    return (
      <Editor
        placeholder={'Enter some plain text...'}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderNode={this.renderNode}
        state={this.state.state}
      />
    )
  }

  /**
   * Return a node renderer for a Slate `node`.
   *
   * @param {Node} node
   * @return {Component or Void}
   */

  renderNode = (node) => {
    return NODES[node.type]
  }

}

/**
 * Export.
 */

export default PlainText
