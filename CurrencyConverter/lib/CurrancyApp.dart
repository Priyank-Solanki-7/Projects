import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
// import 'dart:convert';
// import 'package:http/http.dart' as http;

//flutter run --release
void main() {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    // Only allow portrait mode (remove landscape modes)
  ]).then((_) {
    runApp(const CurrancyApp());
  });
}

class CurrancyApp extends StatefulWidget {
  const CurrancyApp({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _CurrancyApp createState() => _CurrancyApp();
}

class _CurrancyApp extends State<CurrancyApp> {
  double result = 0;
  TextEditingController text = TextEditingController();
  Future<void> convertUsd(String text) async {
    // final inr = double.parse(text);
    // final url = Uri.parse(
    //     'https://api.frankfurter.app/latest?amount=$inr&from=INR&to=USD');
    // final response = await http.get(url);
    // if (response.statusCode == 200) {
    //   final data = jsonDecode(response.body);
    //   final usd = await data['rates']['USD'];
    //   result = usd;
    // } else {
    //   print('Failed to fetch exchange rate.');
    //   result = 0;
    // }
    double inr = double.parse(text);
    result = double.parse((inr / 85.90).toStringAsFixed(3));
  }

  Future<void> convertGBP(String text) async {
    // final inr = double.parse(text);
    // final url = Uri.parse(
    //     'https://api.frankfurter.app/latest?amount=$inr&from=INR&to=GBP');
    // final response = await http.get(url);
    // if (response.statusCode == 200) {
    //   final data = jsonDecode(response.body);
    //   final gbp = await data['rates']['GBP'];
    //   result = gbp;
    // } else {
    //   print('Failed to fetch exchange rate.');
    //   result = 0;
    // }
    double inr = double.parse(text);
    result = double.parse((inr / 115.19).toStringAsFixed(3));
  }

  Future<void> convertKWD(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 281).toStringAsFixed(3));
  }

  Future<void> convertCHI(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 12).toStringAsFixed(3));
  }

  Future<void> convertRUS(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 1.50).toStringAsFixed(3));
  }

  Future<void> convertJPN(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 0.60).toStringAsFixed(3));
  }

  Future<void> convertSIN(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 67).toStringAsFixed(3));
  }

  Future<void> convertUAE(String text) async {
    double inr = double.parse(text);
    result = double.parse((inr / 23.65).toStringAsFixed(3));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            backgroundColor: Color.fromRGBO(46, 69, 85, 1),
            title: Container(
              margin: EdgeInsets.fromLTRB(0, 0, 0, 0),
              child: Text(
                "Currency Converter",
                style: TextStyle(color: Color.fromRGBO(6, 247, 171, 1)),
              ),
            )),
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                  margin: EdgeInsets.fromLTRB(0, 100, 0, 50),
                  child: Text("Hello User Wellcome",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: Color.fromRGBO(200, 20, 54, 1), fontSize: 30)),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 50),
                  child: Text(
                    result.toString(),
                    style: TextStyle(
                        fontWeight: FontWeight.w500,
                        color: Color.fromRGBO(9, 185, 220, 1),
                        fontSize: 28),
                  ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(15, 5, 15, 30),
                  child: TextField(
                    controller: text,
                    keyboardType:
                        TextInputType.numberWithOptions(decimal: true),
                    decoration: InputDecoration(
                        hintText: "enter a amount in INR",
                        prefixIcon: Icon(
                          Icons.currency_rupee_outlined,
                          color: Color.fromRGBO(36, 78, 80, 1),
                        ),
                        focusedBorder: InputBorder.none,
                        border: InputBorder.none,
                        filled: true,
                        fillColor: Color.fromRGBO(240, 238, 237, 1)),
                  ),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertUsd(text.text);
                            });
                            debugPrint(text.text);
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("USA")),
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertGBP(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("UK")),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertKWD(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("Kuwat")),
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertCHI(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("Chaina")),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertRUS(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("Rasia")),
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertJPN(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("Japan")),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertSIN(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child:
                              Text("singapur", style: TextStyle(fontSize: 13))),
                      TextButton(
                          onPressed: () async {
                            setState(() {
                              convertUAE(text.text);
                            });
                          },
                          style: TextButton.styleFrom(
                              backgroundColor:
                                  (Color.fromRGBO(172, 210, 179, 1)),
                              foregroundColor: (Color.fromRGBO(0, 0, 0, 1)),
                              fixedSize: (Size(100, 50))),
                          child: Text("UAE")),
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
