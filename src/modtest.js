export default class Test {
  constructor() {
    this.nama = 'dunia';
  }
  
  static speak(nama=null) {
    return 'halo ' + (nama!=null) ? nama : this.nama;
  }
}
