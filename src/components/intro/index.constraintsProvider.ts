export default class IntroConstraintsProvider {
  static get title() {
    return {
      minlength: 1,
      maxlength: 100,
    };
  }

  static get text() {
    return {
      minlength: 1,
      maxlength: 10000,
    };
  }
}
