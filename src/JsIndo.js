/**
 * Helper Class
 */
class Helper {

  /**
   * isString( String: param ) : bool
   * @param String: value
   * @return bool
   */
  isString(value) {
    return typeof value === 'string';
  }

  /**
   * isArray( Array: param ) : bool
   * @param Array: data
   * @return bool
   */
  isArray(value) {
    return Array.isArray(value);
  }

  /**
   * exists( String: param ) : bool
   * @param String: selector|elements
   * @return bool
   */
  exists(value) {
    return value !== undefined && value !== null;
  }

  /**
   * retVal( String: param ) : bool
   * @param String: selector|elements
   * @return bool
   */
  retVal(values) {
    return values.length === 1 ? values[0] : values;
  }
}

// ------------------------------------------------------------------------

/**
 * Core Class
 */
class Core extends Helper {

  /**
   * constructor( String: param ) : Class instance
   * @param String: selector|elements
   * @return instance
   */
  constructor(selector) {
    super();
    this.__el = true;
    this.elems = (!selector && selector.length === 0) ? [document.body]
      : (this.__el && selector.elements) ? selector.elements
      : [...selector];
  }

  /**
   * html( String: param ) : elements
   * @param String: value|html
   * @return (param) ? html content
   */
  html(newContent) {
    const val = this.elems.map(el => {
      if (this.exists(newContent)) {
        el.innerHTML = newContent;
      }
      return el.innerHTML;
    })
    return this.retVal(val)
  }

  /**
   * on( Event: param, CallbackOrSelector: param, Callback: function) : listener
   * @param Event: event name
   * @param CallbackOrSelector: can be selector or function
   * @param Callback: function
   * @return Listener events
   */
  on(event, cbOrSel, callback) {
    if (this.isString(cbOrSel)) {
      this.elems.forEach(el => {
        el = el.find(cbOrSel);
        if (el) {
          el.addEventListener(event, callback);
        }
      });
    } else {
      this.elems.forEach(el =>
        el.addEventListener(event, cbOrSel)
      );
    }
  }

  /**
   * hide()
   * @return hide element from instance selector
   */
  hide() {
    this.elems.forEach(el => {
      el.style.visibility = "hidden";
    });
  }

  /**
   * show()
   * @return show element from instance selector
   */
  show() {
    this.elems.forEach(el => {
      el.style.visibility = "visible";
    });
  }

  /**
   * toggle()
   * @return toggle (hide|show) element from instance selector
   */
  toggle() {
    this.elems.forEach(el => {
      if (el.style.visibility == "hidden") {
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    });
  }

  /**
   * remove()
   * @return remove DOM element from instance selector
   */
  remove() {
    this.elems.forEach(el => {
      el.style.display = "none";
    });
  }

  /**
   * val()
   * @return value from instance selector
   */
  val() {
    return this.elems[0].value;
  }

  /**
   * TODO: adding more functionality
   */

}

// ------------------------------------------------------------------------

/**
 * Initiate our script
 */
const run = selector => {
  return ( ! selector) ? new Core()
    : (new Helper().isString(selector)) ? new Core(document.querySelectorAll(selector))
    : (selector.__el) ? new Core([selector.element])
    : new Core([selector])
}


// Runner
window.jsid = run;