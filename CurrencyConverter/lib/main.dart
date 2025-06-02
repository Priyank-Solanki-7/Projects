import 'package:currency_converter/FirstPage.dart';
import 'package:flutter/material.dart';
import 'package:currency_converter/CurrancyApp.dart';

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
        "/app": (context) => CurrancyApp()
      },
    );
  }
}
    //     Text(
    //   "Hare Krishna Hare Radha Krishna krishna hare hare",
    //   textDirection: TextDirection.ltr,
    //   textAlign: TextAlign.center,
    // ));