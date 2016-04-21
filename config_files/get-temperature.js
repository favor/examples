{
    "name":"Test-Temperature",
    "gpio-path": "tests/gpio-test/class/gpio",
    "components" : [{"type":"temperature", "address": 4, "chipid": 22, "interface":"gpio", "initialize": true, "methods":[
                    {"get":"../libs/dht-get.js"}]}]
}