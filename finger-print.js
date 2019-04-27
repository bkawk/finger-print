import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {webpack} from './webpack/webpack.min.js';
/**
 * `finger-print`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FingerPrint extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <template is="dom-if" if="{{debug}}">
        <p>[[fingerPrint]]!</p>
      </template>
      
    `;
  }
  static get properties() {
    return {
      fingerPrint: {
        type: String,
        notify: true,
        reflectToAttribue: true,
      },
      debug: {
        type: Boolean,
        value: false,
      },
    };
  }
  ready() {
    super.ready();
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        webpack.Fingerprint2.get((components) => {
          var values = components.map((component) => { return component.value })
          this.fingerPrint = webpack.Fingerprint2.x64hash128(values.join(''), 31)
        })
      })
    } 
  }

} window.customElements.define('finger-print', FingerPrint);


