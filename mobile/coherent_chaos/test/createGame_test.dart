import 'package:flutter/material.dart';
import 'package:coherent_chaos/main.dart';
import 'package:flutter_test/flutter_test.dart';
import '../lib/Assets/dialogue.dart';

void main() {
  testWidgets('Testing UI', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());
    CustomDialogues dialogues = new CustomDialogues();
    await tester.tap(find.text(dialogues.createGame));
    await tester.pump();
    expect(find.byType(Positioned), findsNothing);
  });
}