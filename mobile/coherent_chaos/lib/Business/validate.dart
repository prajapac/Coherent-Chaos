class Validator {
  String validateGameId(String value) {
    if (value.isEmpty || value == null) {
      return "Enter a game code";
    } else {
      return null;
    }
  }
}
