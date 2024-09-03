export default class ProductConstraintsProvider {
  static get title() {
    return {
      minlength: 1,
      maxlength: 100,
    };
  }

  static get description() {
    return {
      minlength: 1,
      maxlength: 5000,
    };
  }

  static get price() {
    return {
      min: 0,
    };
  }

  static get quantity() {
    return {
      min: 0,
    };
  }

  static get rating() {
    return {
      min: 0,
      max: 5,
    };
  }
}
