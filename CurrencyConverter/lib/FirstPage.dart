import 'package:flutter/material.dart';

class FirstPage extends StatefulWidget {
  const FirstPage({super.key});
  @override
  _FirstPage createState() => _FirstPage();
}

class _FirstPage extends State<FirstPage> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacementNamed(context, "/app");
    });
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
      appBar: AppBar(
        title: Text("Wellcome",
            style: TextStyle(color: Color.fromRGBO(234, 8, 8, 0.848))),
        backgroundColor: Color.fromRGBO(23, 157, 190, 0.779),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                margin: EdgeInsets.fromLTRB(60, 60, 0, 0),
                child: Text(
                  "Corrency Converter",
                  style: TextStyle(
                      fontSize: 40, color: Color.fromRGBO(14, 64, 157, 1)),
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(0, 60, 0, 0),
                child: Text(
                  "Make in india",
                  style: TextStyle(
                      fontSize: 25, color: Color.fromRGBO(14, 64, 157, 1)),
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(0, 60, 0, 0),
                child: Text(
                  "Devloped by priyank",
                  style: TextStyle(
                      fontSize: 18, color: Color.fromRGBO(13, 169, 225, 1)),
                ),
              )
            ],
          ),
        ),
      ),
    ));
  }
}
