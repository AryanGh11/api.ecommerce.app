export default class UserConstraintsProvider {
  static get nickname() {
    return {
      minlength: 1,
      maxlength: 30,
    };
  }

  static get username() {
    return {
      minlength: 1,
      maxlength: 30,
    };
  }

  static get password() {
    return {
      minlength: 6,
    };
  }
}
