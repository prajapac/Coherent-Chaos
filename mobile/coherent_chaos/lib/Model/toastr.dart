import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Toastr {

  Toastr();

  void showErrorMessage(String msg) {
    Fluttertoast.showToast(
        msg: msg,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIos: 8,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0);
  }

  void showGameOverMsg(String msg) {
    Fluttertoast.showToast(
        msg: msg,
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.CENTER,
        timeInSecForIos: 8,
        backgroundColor: Colors.black87,
        textColor: Colors.white,
        fontSize: 24.0);
  }
}
