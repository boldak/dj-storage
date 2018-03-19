let _ = require("lodash-node")
let dt = require("date-and-time");

let json2csv = require('json2csv');
let iconv = require('iconv-lite');
let fs = require("fs");

let answers = [
  {
    "form": "5aa657defdaef838271d946f",
    "user": {
      "isAdmin": true,
      "email": "boldak.andrey@gmail.com",
      "name": "Andrey Boldak",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "createdAt": "2017-12-18T13:53:14.442Z",
      "updatedAt": "2018-03-07T16:07:05.856Z",
      "id": "5a37c84a4dd564c00875a351",
      "isLoggedIn": true,
      "isOwner": true,
      "isCollaborator": false
    },
    "data": {
      "3dwtlyjclne": {
        "valid": true,
        "question": "3dwtlyjclne",
        "type": "pairs",
        "value": [
          {
            "entity": "zw009h5qe6g",
            "property": "4wa3qb45zyk"
          },
          {
            "entity": "yg1qeajmhcl",
            "property": "0o8g72vjq80m"
          },
          {
            "entity": "m8g0avbpnx",
            "property": "4wa3qb45zyk"
          },
          {
            "entity": "0pahn2k66gy",
            "property": "0o8g72vjq80m"
          }
        ]
      },
      "9ni14et59eu": {
        "valid": true,
        "question": "9ni14et59eu",
        "type": "radio",
        "value": [
          "yv3j5dr7kah"
        ]
      },
      "6mcbshcgc4u": {
        "valid": true,
        "question": "6mcbshcgc4u",
        "type": "radio",
        "value": [
          "p4161gkcpd"
        ]
      },
      "ifidh43cpjb": {
        "valid": true,
        "question": "ifidh43cpjb",
        "type": "pairs",
        "value": [
          {
            "entity": "0sbst5izp6i",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "bozftvs2ro",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "szd5tgxmkcd",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "hu0v9lhcwzc",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "w8au7e4auxq",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "mxebg9dargl",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "4vrulrki29b",
            "property": "3f4n41x53c9"
          }
        ]
      },
      "erozrr78cbj": {
        "valid": true,
        "question": "erozrr78cbj",
        "type": "check",
        "value": [
          "jbstnt4q3v"
        ]
      },
      "ted3p40gmx": {
        "valid": true,
        "question": "ted3p40gmx",
        "type": "check",
        "value": [
          "mzhghfxs8x8"
        ]
      },
      "cfqhuymwxv": {
        "valid": true,
        "question": "cfqhuymwxv",
        "type": "radio",
        "value": [
          "j5l78asmgi"
        ]
      },
      "wjewywby9cd": {
        "valid": true,
        "question": "wjewywby9cd",
        "type": "radio",
        "value": [
          "l5cbjxso73s"
        ]
      }
    },
    "createdAt": "2018-03-13T13:29:24.428Z",
    "updatedAt": "2018-03-13T13:29:43.586Z",
    "id": "5aa7d234fdaef838271d9470"
  },
  {
    "form": "5aa657defdaef838271d946f",
    "user": {
      "isAdmin": true,
      "email": "boldak.andrey@gmail.com",
      "name": "Andrey Boldak",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "createdAt": "2017-12-18T13:53:14.442Z",
      "updatedAt": "2018-03-07T16:07:05.856Z",
      "id": "5a37c84a4dd564c00875a351",
      "isLoggedIn": true,
      "isOwner": true,
      "isCollaborator": false
    },
    "data": {
      "3dwtlyjclne": {
        "valid": true,
        "question": "3dwtlyjclne",
        "type": "pairs",
        "value": [
          {
            "entity": "zw009h5qe6g",
            "property": "0o8g72vjq80m"
          },
          {
            "entity": "yg1qeajmhcl",
            "property": "0o8g72vjq80m"
          },
          {
            "entity": "m8g0avbpnx",
            "property": "0o8g72vjq80m"
          },
          {
            "entity": "0pahn2k66gy",
            "property": "0o8g72vjq80m"
          }
        ]
      },
      "9ni14et59eu": {
        "valid": true,
        "question": "9ni14et59eu",
        "type": "radio",
        "value": [
          "yv3j5dr7kah"
        ]
      },
      "6mcbshcgc4u": {
        "valid": true,
        "question": "6mcbshcgc4u",
        "type": "radio",
        "value": [
          "225fucmr3gh"
        ]
      },
      "ifidh43cpjb": {
        "valid": true,
        "question": "ifidh43cpjb",
        "type": "pairs",
        "value": [
          {
            "entity": "0sbst5izp6i",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "bozftvs2ro",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "szd5tgxmkcd",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "hu0v9lhcwzc",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "w8au7e4auxq",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "mxebg9dargl",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "4vrulrki29b",
            "property": "3f4n41x53c9"
          }
        ]
      },
      "erozrr78cbj": {
        "valid": true,
        "question": "erozrr78cbj",
        "type": "check",
        "value": [
          "5ztv2ut8tfx"
        ]
      },
      "ted3p40gmx": {
        "valid": true,
        "question": "ted3p40gmx",
        "type": "check",
        "value": [
          "j2n28fc9w1"
        ]
      },
      "cfqhuymwxv": {
        "valid": true,
        "question": "cfqhuymwxv",
        "type": "radio",
        "value": [
          "3upqftymwmk"
        ]
      },
      "wjewywby9cd": {
        "valid": true,
        "question": "wjewywby9cd",
        "type": "radio",
        "value": [
          "6lw9uk3aakd"
        ]
      }
    },
    "createdAt": "2018-03-13T13:30:13.254Z",
    "updatedAt": "2018-03-13T13:30:13.254Z",
    "id": "5aa7d265fdaef838271d9471"
  },
  {
    "form": "5aa657defdaef838271d946f",
    "user": {
      "isAdmin": true,
      "email": "boldak.andrey@gmail.com",
      "name": "Andrey Boldak",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "createdAt": "2017-12-18T13:53:14.442Z",
      "updatedAt": "2018-03-07T16:07:05.856Z",
      "id": "5a37c84a4dd564c00875a351",
      "isLoggedIn": true,
      "isOwner": true,
      "isCollaborator": false
    },
    "data": {
      "3dwtlyjclne": {
        "valid": true,
        "question": "3dwtlyjclne",
        "type": "pairs",
        "value": [
          {
            "entity": "zw009h5qe6g",
            "property": "4wa3qb45zyk"
          },
          {
            "entity": "yg1qeajmhcl",
            "property": "4wa3qb45zyk"
          },
          {
            "entity": "m8g0avbpnx",
            "property": "0o8g72vjq80m"
          },
          {
            "entity": "0pahn2k66gy",
            "property": "0o8g72vjq80m"
          }
        ]
      },
      "9ni14et59eu": {
        "valid": true,
        "question": "9ni14et59eu",
        "type": "radio",
        "value": [
          "niee9yfcrmb"
        ]
      },
      "6mcbshcgc4u": {
        "valid": true,
        "question": "6mcbshcgc4u",
        "type": "radio",
        "value": [
          "225fucmr3gh"
        ]
      },
      "ifidh43cpjb": {
        "valid": true,
        "question": "ifidh43cpjb",
        "type": "pairs",
        "value": [
          {
            "entity": "0sbst5izp6i",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "bozftvs2ro",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "szd5tgxmkcd",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "hu0v9lhcwzc",
            "property": "3f4n41x53c9"
          },
          {
            "entity": "w8au7e4auxq",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "mxebg9dargl",
            "property": "7l0pxgt8dj"
          },
          {
            "entity": "4vrulrki29b",
            "property": "06oje31uhmek"
          }
        ]
      },
      "erozrr78cbj": {
        "valid": true,
        "question": "erozrr78cbj",
        "type": "check",
        "value": [
          "uhrbpps0oz9",
          "jbstnt4q3v",
          "ymom0tv4ouj"
        ]
      },
      "ted3p40gmx": {
        "valid": true,
        "question": "ted3p40gmx",
        "type": "check",
        "value": [
          "dwyvx35cqqr",
          "j2n28fc9w1"
        ]
      },
      "cfqhuymwxv": {
        "valid": true,
        "question": "cfqhuymwxv",
        "type": "radio",
        "value": [
          "li1p46oqkvq"
        ]
      },
      "wjewywby9cd": {
        "valid": true,
        "question": "wjewywby9cd",
        "type": "radio",
        "value": [
          "8x7k2qthopd"
        ]
      }
    },
    "createdAt": "2018-03-13T13:30:44.277Z",
    "updatedAt": "2018-03-13T13:30:44.277Z",
    "id": "5aa7d284fdaef838271d9472"
  }
];


let form = [
  {
    "metadata": {
      "app_name": {
        "key": "app_name",
        "value": "a1",
        "required": true,
        "editable": false
      },
      "app_title": {
        "key": "app_title",
        "value": "Академічна доброчесність",
        "required": true,
        "editable": false
      },
      "app_url": {
        "key": "app_url",
        "value": "http://localhost:8080/app/a1/",
        "required": true,
        "editable": false
      },
      "app_icon": {
        "key": "app_icon",
        "value": "/img/default/7.png",
        "required": true,
        "editable": false
      },
      "page_title": {
        "key": "page_title",
        "value": "Home",
        "required": true,
        "editable": false
      },
      "title": {
        "key": "title",
        "value": "Form title...",
        "required": true,
        "editable": true
      },
      "note": {
        "key": "note",
        "value": "Form note...",
        "required": true,
        "editable": true
      }
    },
    "config": {
      "access": {
        "type": "any",
        "enabled": true,
        "lastNotificatedAt": "2018-03-13T13:29:12.722Z"
      },
      "questions": {
        "3dwtlyjclne": {
          "type": {
            "value": "radiopairs",
            "title": "One for Each"
          },
          "widget": {
            "css": "fa fa-th",
            "view": "./widgets/v2.form.question/partitions/radio_pairs.view.html",
            "options": "./widgets/v2.form.question/partitions/radio_pairs.options.html"
          },
          "options": {
            "required": true,
            "title": "Наскільки Вам відомо про наступні складові політики КПІ ім. Ігоря Сікорського в дотриманні принципів та правил академічної доброчесності?",
            "note": "",
            "useOneList": false,
            "entities": {
              "zw009h5qe6g": {
                "title": "Всезагальне ознайомлення з принципами та положеннями «Кодексу честі»"
              },
              "yg1qeajmhcl": {
                "title": "Перевірка студентських академічних текстів (курсових, дипломних, магістерських тощо) на плагіат"
              },
              "m8g0avbpnx": {
                "title": "Перевірка академічних текстів науково-педагогічних працівників (дисертації, монографії, підручники тощо.) на плагіат"
              },
              "0pahn2k66gy": {
                "title": "Впровадження в університеті загальнообов’язкової дисципліни «Основи академічного письма»"
              }
            },
            "properties": {
              "4wa3qb45zyk": {
                "title": "Відомо"
              },
              "0o8g72vjq80m": {
                "title": "Не відомо"
              }
            }
          },
          "id": "3dwtlyjclne"
        },
        "9ni14et59eu": {
          "type": {
            "value": "radio",
            "title": "Оne of many"
          },
          "widget": {
            "css": "fa fa-stop-circle",
            "view": "./widgets/v2.form.question/partitions/radio.view.html",
            "options": "./widgets/v2.form.question/partitions/radio.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": false,
            "showUserInfo": false,
            "title": "Чи вважаєте Ви доцільним перевірку академічних текстів науково-педагогічних працівників на плагіат?",
            "note": "",
            "nominals": {
              "niee9yfcrmb": {
                "title": "Так",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "yv3j5dr7kah": {
                "title": "Ні",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "9ni14et59eu"
        },
        "6mcbshcgc4u": {
          "type": {
            "value": "radio",
            "title": "Оne of many"
          },
          "widget": {
            "css": "fa fa-stop-circle",
            "view": "./widgets/v2.form.question/partitions/radio.view.html",
            "options": "./widgets/v2.form.question/partitions/radio.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": false,
            "showUserInfo": false,
            "title": "Чи вважаєте Ви доцільним перевірку академічних текстів науково-педагогічних працівників на плагіат?",
            "note": "",
            "nominals": {
              "225fucmr3gh": {
                "title": "Так",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "p4161gkcpd": {
                "title": "Ні",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "6mcbshcgc4u"
        },
        "ifidh43cpjb": {
          "type": {
            "value": "radiopairs",
            "title": "One for Each"
          },
          "widget": {
            "css": "fa fa-th",
            "view": "./widgets/v2.form.question/partitions/radio_pairs.view.html",
            "options": "./widgets/v2.form.question/partitions/radio_pairs.options.html"
          },
          "options": {
            "required": false,
            "title": "Наскільки поширені серед Ваших однокурсників/колег наступні прояви поведінки:",
            "note": "",
            "useOneList": false,
            "entities": {
              "0sbst5izp6i": {
                "title": "представлення виконаної іншим автором роботи за свою без внесення в неї жодних змін"
              },
              "bozftvs2ro": {
                "title": "дослівне копіювання фрагментів тексту (від фрази до набору речень) без належного оформлення цитування"
              },
              "szd5tgxmkcd": {
                "title": "внесення незначних правок у скопійований матеріал (перефразування речень, зміна порядку слів у них тощо) та без належного оформлення цитування"
              },
              "hu0v9lhcwzc": {
                "title": "представлення суміші власних і запозичених аргументів без належного цитування"
              },
              "w8au7e4auxq": {
                "title": "парафраза – переказ своїми словами чужих думок, ідей або тексту; сутність парафрази полягає в заміні слів (знаків)"
              },
              "mxebg9dargl": {
                "title": "компіляція – створення значного масиву тексту без поглибленого вивчення проблеми шляхом копіювання тексту"
              },
              "4vrulrki29b": {
                "title": "самоплагіат – оприлюднення (частково або повністю) власних раніше опублікованих наукових результатів як нових"
              }
            },
            "properties": {
              "3f4n41x53c9": {
                "title": "Дуже поширено"
              },
              "7l0pxgt8dj": {
                "title": "Швидше поширено"
              },
              "06oje31uhmek": {
                "title": "Швидше не поширено"
              },
              "hr6odizgvzf": {
                "title": "Взагалі не поширено"
              }
            }
          },
          "id": "ifidh43cpjb"
        },
        "erozrr78cbj": {
          "type": {
            "value": "check",
            "title": "Many of many"
          },
          "widget": {
            "css": "fa fa-check-square",
            "view": "./widgets/v2.form.question/partitions/check.view.html",
            "options": "./widgets/v2.form.question/partitions/check.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": true,
            "showUserInfo": false,
            "title": "Які санкції щодо студентів у разі виявлення і доведення плагіату у їх академічних текстах (курсових, дипломних, магістерських тощо) Ви вважаєте справедливими?",
            "note": "",
            "nominals": {
              "dkwtp0let46": {
                "title": "Незарахування роботи",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "uhrbpps0oz9": {
                "title": "Призначення додаткових завдань",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "jbstnt4q3v": {
                "title": "Зниження оцінки",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "ymom0tv4ouj": {
                "title": "Оголошення догани",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "415amrvcxq9": {
                "title": "Недопущення до складання іспиту/заліку",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "ewhf8jxk967": {
                "title": "Профілактична бесіда",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "jrfgo0prmwk": {
                "title": "Публічне соромлення",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "5ztv2ut8tfx": {
                "title": "Відрахування з університету",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "dfqn82ygbbi": {
                "title": "wdw",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "erozrr78cbj"
        },
        "ted3p40gmx": {
          "type": {
            "value": "check",
            "title": "Many of many"
          },
          "widget": {
            "css": "fa fa-check-square",
            "view": "./widgets/v2.form.question/partitions/check.view.html",
            "options": "./widgets/v2.form.question/partitions/check.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": true,
            "showUserInfo": false,
            "title": "Які санкції щодо науково-педагогічних працівників у разі виявлення і доведення плагіату у їх академічних текстах (дисертації, монографії, підручники тощо) Ви вважаєте справедливими?",
            "note": "",
            "nominals": {
              "mzhghfxs8x8": {
                "title": "Оголошення догани",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "dwyvx35cqqr": {
                "title": "Публічне соромлення",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "j2n28fc9w1": {
                "title": "Профілактична бесіда",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "wcqqzt2zohp": {
                "title": "Позбавлення наукових ступенів, вчених звань",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "gtmz2pc6a1r": {
                "title": "Звільнення з університету",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "ted3p40gmx"
        },
        "cfqhuymwxv": {
          "type": {
            "value": "radio",
            "title": "Оne of many"
          },
          "widget": {
            "css": "fa fa-stop-circle",
            "view": "./widgets/v2.form.question/partitions/radio.view.html",
            "options": "./widgets/v2.form.question/partitions/radio.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": true,
            "showUserInfo": false,
            "title": "Вкажіть, будь ласка, Ваш статус в КПІ ім. Ігоря Сікорського:",
            "note": "",
            "nominals": {
              "3upqftymwmk": {
                "title": "Студент",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "li1p46oqkvq": {
                "title": "Аспірант",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "j5l78asmgi": {
                "title": "Науково-педагогічний працівник",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "6jf6o6shg54": {
                "title": "Адміністративний працівник",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "cfqhuymwxv"
        },
        "wjewywby9cd": {
          "type": {
            "value": "radio",
            "title": "Оne of many"
          },
          "widget": {
            "css": "fa fa-stop-circle",
            "view": "./widgets/v2.form.question/partitions/radio.view.html",
            "options": "./widgets/v2.form.question/partitions/radio.options.html"
          },
          "options": {
            "required": false,
            "addEnabled": true,
            "showUserInfo": false,
            "title": "Вкажіть, будь ласка, Ваш факультет:",
            "note": "",
            "nominals": {
              "6lw9uk3aakd": {
                "title": "ВПІ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "8x7k2qthopd": {
                "title": "ЗФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "a6yynwdw5ge": {
                "title": "ІЕЕ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "dacy714t6bs": {
                "title": "ІПСА",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "odfazhts0f": {
                "title": "ІТС",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "uoa2obm2k1": {
                "title": "ІФФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "l5cbjxso73s": {
                "title": "ІХФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "s3s5yjjj8rj": {
                "title": "ММІ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "0uan4fiz9w29": {
                "title": "ПБФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "lo5oxbr4b9s": {
                "title": "РТФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "lf4qe57o60g": {
                "title": "ТЕФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "nd24j52r449": {
                "title": "ФАКС",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "g12q057sfv9": {
                "title": "ФБМІ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "7huqq0og6nu": {
                "title": "ФБТ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "fxz2q7fhe7t": {
                "title": "ФЕА",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "jrraydqy7e": {
                "title": "ФЕЛ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "gylbub2sijk": {
                "title": "ФІОТ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "08fxbni97qxi": {
                "title": "ФЛ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "c3eezzj2y5j": {
                "title": "ФММ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "zqfwaal6ihs": {
                "title": "ФМФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "mogb1coirnq": {
                "title": "ФПМ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "lyxaq4olxyl": {
                "title": "ФСП",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "a0zb1j9h6sr": {
                "title": "ФТІ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "69mybgw1ooq": {
                "title": "ХТФ",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-07T16:07:05.856Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "wjewywby9cd"
        }
      }
    },
    "owner": {
      "isAdmin": true,
      "email": "boldak.andrey@gmail.com",
      "name": "Andrey Boldak",
      "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
      "createdAt": "2017-12-18T13:53:14.442Z",
      "updatedAt": "2018-03-07T16:07:05.856Z",
      "id": "5a37c84a4dd564c00875a351",
      "isLoggedIn": true,
      "isOwner": true,
      "isCollaborator": false
    },
    "history": [
      {
        "state": "created",
        "message": "Create form via a1",
        "user": {
          "isAdmin": true,
          "email": "boldak.andrey@gmail.com",
          "name": "Andrey Boldak",
          "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
          "createdAt": "2017-12-18T13:53:14.442Z",
          "updatedAt": "2018-03-07T16:07:05.856Z",
          "id": "5a37c84a4dd564c00875a351",
          "isLoggedIn": true,
          "isOwner": true,
          "isCollaborator": false
        },
        "date": "2018-03-12T10:35:10.944Z"
      }
    ],
    "createdAt": "2018-03-12T10:35:10.950Z",
    "updatedAt": "2018-03-13T13:29:15.859Z",
    "id": "5aa657defdaef838271d946f"
  }
]

// let questions = form[0].config.questions;

// answers = answers.map ((a) => {
// 	a.data = _.pairs(a.data).map(d => {
// 		d[1].title = questions[d[0]].options.title;

// 		if(d[1].type=="pairs"){
// 			d[1].value = d[1].value.map(v => {
// 				return {
//           entity_id: v.entity,
// 					entity_title: questions[d[0]].options.entities[v.entity].title,
// 					property_id: v.property,
//           property_title: questions[d[0]].options.properties[v.property].title,
// 					value:1
// 				}
// 			}) 
// 		}

// 		if( ["radio","check"].indexOf(d[1].type) >= 0 ){
// 			d[1].value = d[1].value.map(v => {
// 				return {
// 					entity_id: v,
//           entity_title: questions[d[0]].options.nominals[v].title,
// 					property_id: "",
//           property_title:"",
// 					value:1
// 				}
// 			}) 
// 		}
		
// 		return d[1];
// 	})
// 	return a;
// })


let responses = []

// answers = answers.forEach( a => {
// 		a.data.forEach( d => {
// 			d.value.forEach( v => {
// 				responses.push({
// 					response_id:a.id,
// 					updatedAt:dt.format(new Date(a.updatedAt), "DD/MM/YY HH:mm"),
// 					form:a.form,
// 					respondent:(a.user.email)? a.user.email : "",
// 					question_id: d.id,
//           question_title: d.title,
// 					question_type: d.type,
//           valid:(d.valid)? 1 : 0,
// 					entity_id: v.entity_id,
//           entity_title:v.entity_title,
// 					property_id:v.property_id,
//           property_title:v.property_title,
// 					value:v.value			
// 				})
// 			})
// 		})
// })



// let config = form[0].config;







console.log(JSON.stringify(responses,null,"\t"))


















// let questions = $scope.form[0].config.questions;

// let answers = $scope.answers.map ((a) => {
// 	a.data = _.pairs(a.data).map(d => {
// 		d[1].title = questions[d[0]].options.title;

// 		if(d[1].type=="pairs"){
// 			d[1].value = d[1].value.map(v => {
// 				return {
// 					entity: questions[d[0]].options.entities[v.entity].title,
// 					property: questions[d[0]].options.properties[v.property].title,
// 					value:1
// 				}
// 			}) 
// 		}

// 		if(d[1].type=="radio"){
// 			d[1].value = d[1].value.map(v => {
// 				return {
// 					entity: questions[d[0]].options.nominals[v].title,
// 					property:"",
// 					value:1
// 				}
// 			}) 
// 		}

// 		if(d[1].type=="check"){
// 			d[1].value = d[1].value.map(v => {
// 				return {
// 					entity: questions[d[0]].options.nominals[v].title,
// 					property:"",
// 					value:1
// 				}
// 			}) 
// 		}



// 		return d[1];
// 	})
// 	return a;
// })


// let responses = []

// answers = answers.forEach( a => {
// 		a.data.forEach( d => {
// 			d.value.forEach( v => {
// 				responses.push({
// 					id:a.id,
// 					updatedAt:_util.format.date(a.updatedAt, "DD/MM/YY HH:mm"),
// 					form:a.form,
// 					user:(a.user.email)? a.user.email : "",
// 					question:d.title,
// 					valid:(d.valid)? 1 : 0,
// 					entity:v.entity,
// 					property:v.property,
// 					value:v.value			
// 				})
// 			})
// 		})
// })

// $scope.responses = responses;






















// let fields = _.pairs(responses[0]).map( item => item[0])

// let output = 
// fs.writeFileSync("responses.csv",
// 	iconv.encode(
// 	        new Buffer(
// 	            json2csv({ data: responses, fields: fields, del: ";" })
// 	        ),
// 	        "windows-1251")
// );

// console.log(output.toString())







// let questions = $scope.form[0].config.questions;

// let answers = $scope.answers.map ((a) => {
//   a.data = _.pairs(a.data).map(d => {
//     d[1].title = questions[d[0]].options.title;
//     d[1].id = d[0];
//     if(d[1].type=="pairs"){
//       d[1].value = d[1].value.map(v => {
//         return {
//           entity_id: v.entity,
//           entity_title: questions[d[0]].options.entities[v.entity].title,
//           property_id: v.property,
//           property_title: questions[d[0]].options.properties[v.property].title,
//           value:1
//         }
//       }) 
//     }

//     if( ["radio","check"].indexOf(d[1].type) >= 0 ){
//       d[1].value = d[1].value.map(v => {
//         return {
//           entity_id: v,
//           entity_title: questions[d[0]].options.nominals[v].title,
//           property_id: "",
//           property_title:"",
//           value:1
//         }
//       }) 
//     }
    
//     return d[1];
//   })
//   return a;
// });


// let responses = [];

// answers = answers.forEach( a => {
//     a.data.forEach( d => {
//       d.value.forEach( v => {
//         responses.push({
//           response_id:a.id,
//           updatedAt:dt.format(new Date(a.updatedAt), "DD/MM/YY HH:mm"),
//           form:a.form,
//           respondent:(a.user.email)? a.user.email : "",
//           question_id: d.id,
//           question_title: d.title,
//           question_type: d.type,
//           valid:(d.valid)? 1 : 0,
//           entity_id: v.entity_id,
//           entity_title:v.entity_title,
//           property_id:v.property_id,
//           property_title:v.property_title,
//           value:v.value     
//         })
//       })
//     })
// });

// $scope.responses = responses;