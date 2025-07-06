import 'FirstPage.dart';
import 'package:flutter/material.dart';
import 'CurrancyApp.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: "/",
      routes: {
        "/": (context) => FirstPage(),
        "/app": (context) => CurrancyApp(),
      },
    );
  }
}
