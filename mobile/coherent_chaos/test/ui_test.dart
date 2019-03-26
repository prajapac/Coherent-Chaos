import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:coherent_chaos/main.dart';
import '../lib/Assets/dialogue.dart';

void main() {
  testWidgets('Testing UI', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());
    CustomDialogues dialogues = new CustomDialogues();
    expect(find.text(dialogues.createGame), findsOneWidget);
    expect(find.text(dialogues.joinGame), findsOneWidget);
    expect(find.widgetWithText(TextFormField, "A4B6"), findsOneWidget);  
  });
}
