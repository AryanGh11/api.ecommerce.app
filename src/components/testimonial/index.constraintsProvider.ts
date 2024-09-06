export default class TestimonialConstraintsProvider {
  static get title() {
    return {
      minlength: 1,
      maxlength: 100,
    };
  }

  static get body() {
    return {
      minlength: 1,
      maxlength: 20000,
    };
  }

  static get rating() {
    return {
      min: 0,
      max: 5,
    };
  }
}
