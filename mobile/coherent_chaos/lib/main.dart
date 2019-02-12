import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coherent Chaos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    final barColor = const Color(0xFF4BCFFA);
    final bodyColor = const Color(0xFF2C3335);
    return MaterialApp(
      home: Scaffold(
          backgroundColor: bodyColor,
          appBar: AppBar(
            title: Text("Coherent Chaos"),
            backgroundColor: barColor,
          ),
          body: new Center(
            child: Container(
              padding: new EdgeInsets.all(50.0),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Row(
                    children: [
                      new Expanded(
                        child: new RaisedButton(
                          onPressed: () {},
                          child: Text("CREATE GAME"),
                          color: Colors.blue,
                        )
                      )
                    ],
                  ),
                  Row(
                    children: [
                      new Expanded(
                        child: new RaisedButton(
                          onPressed: () {},
                          child: Text("JOIN GAME"),
                          color: Colors.green,
                        )
                      )
                    ],
                  ),
                  Row(
                    children: [
                      new Expanded(
                        child: new RaisedButton(
                          onPressed: () {},
                          child: Text("Test Btn"),
                          color: Colors.red,
                        )
                      )
                    ],
                  ),
                ],
              ),
            ),
          )),
    );
  }
}
