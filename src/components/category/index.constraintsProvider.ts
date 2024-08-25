export default class CategoryConstraintsProvider {
  static get title() {
    return {
      minlength: 1,
      maxlength: 100,
    };
  }

  static get key() {
    return {
      minlength: 1,
      maxlength: 100,
    };
  }
}
