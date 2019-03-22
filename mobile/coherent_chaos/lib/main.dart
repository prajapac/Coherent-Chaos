import 'package:coherent_chaos/Presentations/start_page.dart';
import 'package:flutter/material.dart';

void main() async => runApp(MyApp());

class MyApp extends StatelessWidget {

  final routes = <String, WidgetBuilder> {
    StartPage.tag: (context) =>StartPage(),
  };


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coherent Chaos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Nunito'
      ),
      home: StartPage(),
      routes: routes,
    );
  }
}