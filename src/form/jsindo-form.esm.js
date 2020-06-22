export default class JsIndoForm {
  /**
   * Constructor
   */
  constructor() {
    this.foAtr = "validasi";
    this.konsol = false;
  }

  /**
   * @method config( cnf )
   * @param Object( formAttribute: String, debug: boolean )
   * @return instance
   */
  static config(cnf) {
    this.foAtr = cnf.formAttribute;
    this.konsol = cnf.debug;
    return this;
  }

  /**
   * @method isEmpty( str )
   * @param String
   * @return boolean
   */
  static isEmpty(str) {
    return !str.trim().length;
  }

  /**
   * @method eITS( el, rm = false )
   * @param el: element selector
   * @param rm: remove style previously added
   * @return element styling
   */
  static eITS(el, rm = false) {
    return el.style.boxShadow = (rm) ? "none" : "0px 0px 3px red";
  }

  /**
   * @method eCR( el, rm = false )
   * @param el: element selector
   * @param rm: remove style previously added
   * @return element styling
   */
  static eCR(el, rm = false) {
    return el.parentElement.style.color = (rm) ? "initial" : "red";
  }

  /**
   * @method start()
   * @return scanning available form in DOM with attribute defining -
   * from `config( cnf.formAttribute )`, then do their job with -
   * check(ing) each form elements in DOM.
   */
  static start() {
    let erc = 0;
    document.querySelectorAll(`form[${this.foAtr}]`).forEach((fm) => {
      fm.addEventListener('submit', (e) => {
        e.preventDefault();
        fm.querySelectorAll('input[type=text]').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('input[type=number]').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('input[type=email]').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('input[type=password]').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('input[type=file]').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('textarea').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })
        fm.querySelectorAll('select').forEach((tx) => {
          (this.isEmpty(tx.value)) ? this.eITS(tx) && erc++: this.eITS(tx, true);
        })

        const ck = fm.querySelectorAll('input[type=checkbox]')
        if (fm.querySelectorAll('input[type=checkbox]:checked').length <= 0) {
          ck.forEach((tx) => { this.eCR(tx) })
          erc++
        } else {
          ck.forEach((tx) => { this.eCR(tx, true) })
        }

        const rd = fm.querySelectorAll('input[type=radio]')
        if (fm.querySelectorAll('input[type=radio]:checked').length <= 0) {
          rd.forEach((tx) => { this.eCR(tx) })
          erc++
        } else {
          rd.forEach((tx) => { this.eCR(tx, true) })
        }

        // if debug true in `config( cnf.debug )`
        if (this.konsol) {
          console.log("emptyCount:", erc);
        }

        // if no error, submit the form
        if (erc === 0) {
          fm.submit();
        }

        // reset count
        erc = 0;
      })
    })
  }

}