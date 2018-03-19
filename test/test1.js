let f = [
  {
    "metadata": {
      "app_name": {
        "key": "app_name",
        "value": "forms",
        "required": true,
        "editable": false
      },
      "app_title": {
        "key": "app_title",
        "value": "Анкета відвідувача НТУУ \"КПІ\" dvd vfdvvdfv",
        "required": true,
        "editable": false
      },
      "app_url": {
        "key": "app_url",
        "value": "http://localhost:8080/app/forms/a55",
        "required": true,
        "editable": false
      },
      "app_icon": {
        "key": "app_icon",
        "value": "https://shared.uoit.ca/shared/department/itsc/All%20Images/form.gif",
        "required": true,
        "editable": false
      },
      "page_title": {
        "key": "page_title",
        "value": "a22",
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
        "users": [
          {
            "isAdmin": true,
            "email": "boldak.andrey@gmail.com",
            "name": "Andrey Boldak",
            "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
            "createdAt": "2017-12-18T13:53:14.442Z",
            "updatedAt": "2018-02-23T14:15:03.336Z",
            "id": "5a37c84a4dd564c00875a351"
          },
          {
            "email": "boldak.andrey@gmail.co",
            "apikey": "02g9vbr100cuekq52mr04k6",
            "name": "Bold a",
            "photo": "./api/resource/forms-author.png"
          }
        ],
        "invitationTemplate": "Dear ${user.name} !\nWe invite you for expert assessments  \"${metadata.title}\"\nSee ${ref(metadata.app_url)}",
        "notificationTemplate": "notification Template",
        "invitationEnabled": true,
        "notificationEnabled": true,
        "lastNotificatedAt": "2018-03-13T17:33:54.355Z"
      },
      "questions": {
        "i7zaa52km9": {
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
            "showUserInfo": true,
            "title": "",
            "note": "",
            "nominals": {
              "zx7y9j93dn": {
                "title": "CZXC",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-03T15:57:37.743Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "ccetn1p6yw": {
                "title": "XCXC",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-03T15:57:37.743Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "kmf0oo5pxr": {
                "title": "XCXZC",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-03T15:57:37.743Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              },
              "l6m549k66eg": {
                "title": "XCC",
                "user": {
                  "isAdmin": true,
                  "email": "boldak.andrey@gmail.com",
                  "name": "Andrey Boldak",
                  "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
                  "createdAt": "2017-12-18T13:53:14.442Z",
                  "updatedAt": "2018-03-03T15:57:37.743Z",
                  "id": "5a37c84a4dd564c00875a351",
                  "isLoggedIn": true,
                  "isOwner": true,
                  "isCollaborator": false
                }
              }
            }
          },
          "id": "i7zaa52km9"
        },
        "si6q5d6l3h": {
          "type": {
            "value": "influences",
            "title": "Impact assessment"
          },
          "widget": {
            "css": "fa fa-braille",
            "view": "./widgets/v2.form.question/partitions/influences.view.html",
            "options": "./widgets/v2.form.question/partitions/influences.options.html"
          },
          "options": {
            "required": false,
            "title": "Оцiнiть, будь ласка, наступнi компоненти навчального процесу в поточному роцi за 7-бальною шкалою",
            "note": "h4   ng-if=\"config.state.options.note\" \nstyle=\" padding: 0 2em;\n  font-size: inherit;\ncolor:#e7e7e7;\n font-style: italic;\"\n> \n <i  class=\"fa fa-info-circle\" style=\"font-size: larger; color:#e7e7e7;\"></i> \n<pre>\n {{config.state.options.note}}\n </pre>  \n</h4>",
            "useOneList": false,
            "entities": {
              "mu2xjtb9n7": {
                "title": "Slow network is detected. Fallback font will be used while loading: http://localhost:8080/components/components-font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0"
              },
              "cefhnrjgw0g": {
                "title": "bbb"
              },
              "w745xxd1kge": {
                "title": "ccc"
              },
              "0axxv003f3st": {
                "title": "dddd"
              },
              "befpilma7ci": {
                "title": "SD"
              }
            },
            "ordinals": {
              "range": {
                "min": -3,
                "max": 3
              },
              "undefined": {
                "title": "undefined",
                "value": 0
              },
              "values": [
                {
                  "value": -3,
                  "title": "Low"
                },
                {
                  "value": -2
                },
                {
                  "value": -1
                },
                {
                  "value": 0
                },
                {
                  "value": 1
                },
                {
                  "value": 2
                },
                {
                  "value": 3,
                  "title": "High"
                }
              ]
            },
            "colors": {
              "pallete": [
                "#ca0020",
                "#f4a582",
                "#f7f7f7",
                "#92c5de",
                "#0571b0"
              ],
              "opacity": "54",
              "undefined": " #aaa"
            },
            "properties": {
              "76aeul1u54o": {
                "title": "1"
              },
              "867xw1fp3a4": {
                "title": "2"
              },
              "99b22i6fbro": {
                "title": "3"
              },
              "x5z4w6teub": {
                "title": "4"
              },
              "snk0hbxjun": {
                "title": "5"
              },
              "poy5rj9ngeh": {
                "title": "6"
              },
              "i3ch3pfdd9m": {
                "title": "7"
              }
            },
            "disables": {
              "cefhnrjgw0g": {
                "867xw1fp3a4": true
              },
              "w745xxd1kge": {
                "867xw1fp3a4": true
              },
              "0axxv003f3st": {
                "867xw1fp3a4": true
              }
            }
          },
          "id": "si6q5d6l3h"
        },
        "746dxzf3tjq": {
          "type": {
            "value": "rate",
            "title": "Rate"
          },
          "widget": {
            "css": "fa fa-star",
            "view": "./widgets/v2.form.question/partitions/rate.view.html",
            "options": "./widgets/v2.form.question/partitions/rate.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "max": 9
          },
          "id": "746dxzf3tjq"
        },
        "3e7l64f7fm": {
          "type": {
            "value": "range",
            "title": "Range"
          },
          "widget": {
            "css": "fa fa-arrows-h",
            "view": "./widgets/v2.form.question/partitions/range.view.html",
            "options": "./widgets/v2.form.question/partitions/range.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "range": {
              "min": 0,
              "max": 10
            },
            "step": 2
          },
          "id": "3e7l64f7fm"
        },
        "c1e1icj88h5": {
          "type": {
            "value": "text",
            "title": "Text"
          },
          "widget": {
            "css": "fa fa-align-left",
            "view": "./widgets/v2.form.question/partitions/text.view.html",
            "options": "./widgets/v2.form.question/partitions/text.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "rows": 5,
            "placeholder": "fill this text...."
          },
          "id": "c1e1icj88h5"
        },
        "q808etoz3ck": {
          "type": {
            "value": "datetime",
            "title": "Date & Time"
          },
          "widget": {
            "css": "fa fa-calendar",
            "view": "./widgets/v2.form.question/partitions/datetime.view.html",
            "options": "./widgets/v2.form.question/partitions/datetime.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "range": {
              "min": "",
              "max": ""
            },
            "format": "date",
            "placeholder": "Your date..."
          },
          "id": "q808etoz3ck"
        },
        "q563nnrbik": {
          "type": {
            "value": "datetime",
            "title": "Date & Time"
          },
          "widget": {
            "css": "fa fa-calendar",
            "view": "./widgets/v2.form.question/partitions/datetime.view.html",
            "options": "./widgets/v2.form.question/partitions/datetime.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "range": {
              "min": "",
              "max": ""
            },
            "format": "month",
            "placeholder": "Your date..."
          },
          "id": "q563nnrbik"
        },
        "qebszohlkro": {
          "type": {
            "value": "datetime",
            "title": "Date & Time"
          },
          "widget": {
            "css": "fa fa-calendar",
            "view": "./widgets/v2.form.question/partitions/datetime.view.html",
            "options": "./widgets/v2.form.question/partitions/datetime.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "format": "time"
          },
          "id": "qebszohlkro"
        },
        "5aj6jcjz8z5": {
          "type": {
            "value": "pairs",
            "title": "Paired matches"
          },
          "widget": {
            "css": "fa fa-th",
            "view": "./widgets/v2.form.question/partitions/pairs.view.html",
            "options": "./widgets/v2.form.question/partitions/pairs.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "useOneList": false,
            "entities": {
              "wuhfwfdb8t": {
                "title": "CVXCV"
              },
              "isotosx4zh8": {
                "title": "CVXV"
              },
              "068j17t575qq": {
                "title": "CVXV"
              }
            },
            "properties": {
              "h5qgd8puayd": {
                "title": "Note"
              },
              "m7pnl60x6xr": {
                "title": "XCVV"
              },
              "3z59a4r3guw": {
                "title": "XCVXVXV"
              }
            }
          },
          "id": "5aj6jcjz8z5"
        },
        "qgcb7nmfrtn": {
          "type": {
            "value": "scales",
            "title": "Scales"
          },
          "widget": {
            "css": "fa fa-th-list",
            "view": "./widgets/v2.form.question/partitions/scales.view.html",
            "options": "./widgets/v2.form.question/partitions/scales.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "ordinals": {
              "range": {
                "min": 0,
                "max": 3
              },
              "undefined": {
                "title": "undefined",
                "value": 0
              },
              "values": [
                {
                  "value": 0,
                  "title": "no"
                },
                {
                  "value": 1
                },
                {
                  "value": 2
                },
                {
                  "value": 3,
                  "title": "yes"
                }
              ]
            },
            "colors": {
              "pallete": [
                "#f7fcb9",
                "#addd8e",
                "#31a354"
              ],
              "opacity": 70,
              "undefined": " #aaa"
            },
            "entities": {
              "h8lrpj2o4km": {
                "title": "dsfsdf",
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
              "tylzg582ke": {
                "title": "dfdsfdsf",
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
              "1zsimkv8esx": {
                "title": "dfdsf",
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
          "id": "qgcb7nmfrtn"
        },
        "c1aj8i1p6v": {
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
            "title": "",
            "note": "",
            "useOneList": false,
            "entities": {
              "f8719zudihn": {
                "title": "a"
              },
              "swfxdikfd6": {
                "title": "b"
              },
              "jkptocz193b": {
                "title": "c"
              }
            },
            "properties": {
              "c8yafei3u1k": {
                "title": "no"
              },
              "feq0dne4duj": {
                "title": "yes"
              },
              "k2mnntwkkr": {
                "title": "1"
              },
              "dlpjj0vznxc": {
                "title": "2"
              },
              "sf9zra0kgmr": {
                "title": "3"
              }
            }
          },
          "id": "c1aj8i1p6v"
        },
        "of12blr96gp": {
          "type": {
            "value": "scale",
            "title": "Scale"
          },
          "widget": {
            "css": "fa fa-ellipsis-h",
            "view": "./widgets/v2.form.question/partitions/scale.view.html",
            "options": "./widgets/v2.form.question/partitions/scale.options.html"
          },
          "options": {
            "required": false,
            "title": "",
            "note": "",
            "ordinals": {
              "range": {
                "min": 1,
                "max": 7
              },
              "undefined": {
                "title": "undefined",
                "value": 0
              },
              "values": [
                {
                  "value": 1,
                  "title": "Low"
                },
                {
                  "value": 2
                },
                {
                  "value": 3
                },
                {
                  "value": 4,
                  "title": "Medium"
                },
                {
                  "value": 5
                },
                {
                  "value": 6
                },
                {
                  "value": 7,
                  "title": "High"
                }
              ]
            },
            "colors": {
              "pallete": [
                "#2d004b",
                "#542788",
                "#8073ac",
                "#b2abd2",
                "#d8daeb",
                "#f7f7f7",
                "#fee0b6",
                "#fdb863",
                "#e08214",
                "#b35806",
                "#7f3b08"
              ],
              "opacity": "87",
              "undefined": " #aaa"
            }
          },
          "id": "of12blr96gp"
        }
      },
      "cloned": "5a995ad340de100c24e094e9"
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
        "message": "Create form via forms",
        "user": {
          "isAdmin": true,
          "email": "boldak.andrey@gmail.com",
          "name": "Andrey Boldak",
          "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
          "createdAt": "2017-12-18T13:53:14.442Z",
          "updatedAt": "2018-02-23T14:15:03.336Z",
          "id": "5a37c84a4dd564c00875a351",
          "isLoggedIn": true,
          "isOwner": true,
          "isCollaborator": false
        },
        "date": "2018-03-01T19:31:40.108Z"
      },
      {
        "state": "created",
        "message": "Clone form via forms",
        "user": {
          "isAdmin": true,
          "email": "boldak.andrey@gmail.com",
          "name": "Andrey Boldak",
          "photo": "https://lh4.googleusercontent.com/-FXs5tjXLlzs/AAAAAAAAAAI/AAAAAAAAAMY/v9q_vfkyfGc/photo.jpg?sz=500",
          "createdAt": "2017-12-18T13:53:14.442Z",
          "updatedAt": "2018-03-02T11:03:45.611Z",
          "id": "5a37c84a4dd564c00875a351",
          "isLoggedIn": true,
          "isOwner": true,
          "isCollaborator": false
        },
        "date": "2018-03-02T14:08:19.563Z"
      },
      {
        "state": "created",
        "message": "Clone form via forms",
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
        "date": "2018-03-13T17:33:39.238Z"
      }
    ],
    "createdAt": "2018-03-13T17:33:39.249Z",
    "updatedAt": "2018-03-13T17:34:04.161Z",
    "id": "5aa80b737dafd564096a06ef"
  }
]


let a= [
  {
    "form": "5aa80b737dafd564096a06ef",
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
      "i7zaa52km9": {
        "valid": true,
        "question": "i7zaa52km9",
        "type": "radio",
        "value": [
          "zx7y9j93dn"
        ]
      },
      "si6q5d6l3h": {
        "valid": true,
        "question": "si6q5d6l3h",
        "type": "influences",
        "value": [
          {
            "entity": "mu2xjtb9n7",
            "property": "76aeul1u54o",
            "value": -3
          },
          {
            "entity": "mu2xjtb9n7",
            "property": "867xw1fp3a4",
            "value": -3
          },
          {
            "entity": "mu2xjtb9n7",
            "property": "99b22i6fbro",
            "value": -3
          }
        ]
      },
      "746dxzf3tjq": {
        "valid": true,
        "question": "746dxzf3tjq",
        "type": "rate",
        "value": [
          7
        ]
      },
      "3e7l64f7fm": {
        "valid": true,
        "question": "3e7l64f7fm",
        "type": "range",
        "value": [
          "6"
        ]
      },
      "c1e1icj88h5": {
        "valid": true,
        "question": "c1e1icj88h5",
        "type": "text",
        "value": [
          "ssccc"
        ]
      },
      "q808etoz3ck": {
        "valid": true,
        "question": "q808etoz3ck",
        "format": "date",
        "type": "datetime",
        "value": [
          "2018-03-14T22:00:00.000Z"
        ]
      },
      "q563nnrbik": {
        "valid": true,
        "question": "q563nnrbik",
        "format": "month",
        "type": "datetime",
        "value": [
          "2018-02-28T22:00:00.000Z"
        ]
      },
      "qebszohlkro": {
        "valid": false
      },
      "5aj6jcjz8z5": {
        "valid": true,
        "question": "5aj6jcjz8z5",
        "type": "pairs",
        "value": [
          {
            "entity": "wuhfwfdb8t",
            "property": "h5qgd8puayd"
          }
        ]
      },
      "qgcb7nmfrtn": {
        "valid": true,
        "question": "qgcb7nmfrtn",
        "type": "scales",
        "value": [
          {
            "entity": "h8lrpj2o4km",
            "value": 2
          },
          {
            "entity": "tylzg582ke",
            "value": 1
          },
          {
            "entity": "1zsimkv8esx",
            "value": 3
          }
        ]
      },
      "c1aj8i1p6v": {
        "valid": false,
        "question": "c1aj8i1p6v",
        "type": "radiopairs",
        "value": [
          {
            "entity": "jkptocz193b",
            "property": "feq0dne4duj"
          },
          {
            "entity": "swfxdikfd6",
            "property": "dlpjj0vznxc"
          }
        ]
      },
      "of12blr96gp": {
        "valid": true,
        "question": "of12blr96gp",
        "type": "scale",
        "value": [
          4
        ]
      }
    },
    "createdAt": "2018-03-13T17:34:46.314Z",
    "updatedAt": "2018-03-13T17:34:46.314Z",
    "id": "5aa80bb67dafd564096a06f0"
  },
  {
    "form": "5aa80b737dafd564096a06ef",
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
      "i7zaa52km9": {
        "valid": true,
        "question": "i7zaa52km9",
        "type": "radio",
        "value": [
          "ccetn1p6yw"
        ]
      },
      "si6q5d6l3h": {
        "valid": true,
        "question": "si6q5d6l3h",
        "type": "influences",
        "value": [
          {
            "entity": "mu2xjtb9n7",
            "property": "76aeul1u54o",
            "value": -2
          },
          {
            "entity": "cefhnrjgw0g",
            "property": "76aeul1u54o",
            "value": -2
          },
          {
            "entity": "w745xxd1kge",
            "property": "76aeul1u54o",
            "value": -2
          }
        ]
      },
      "746dxzf3tjq": {
        "valid": true,
        "question": "746dxzf3tjq",
        "type": "rate",
        "value": [
          9
        ]
      },
      "3e7l64f7fm": {
        "valid": true,
        "question": "3e7l64f7fm",
        "type": "range",
        "value": [
          "2"
        ]
      },
      "c1e1icj88h5": {
        "valid": false
      },
      "q808etoz3ck": {
        "valid": true,
        "question": "q808etoz3ck",
        "format": "date",
        "type": "datetime",
        "value": [
          "2018-03-17T22:00:00.000Z"
        ]
      },
      "q563nnrbik": {
        "valid": false
      },
      "qebszohlkro": {
        "valid": false
      },
      "5aj6jcjz8z5": {
        "valid": false
      },
      "qgcb7nmfrtn": {
        "valid": false,
        "question": "qgcb7nmfrtn",
        "type": "scales",
        "value": [
          {
            "entity": "tylzg582ke",
            "value": 2
          }
        ]
      },
      "c1aj8i1p6v": {
        "valid": false
      },
      "of12blr96gp": {
        "valid": true,
        "question": "of12blr96gp",
        "type": "scale",
        "value": [
          4
        ]
      }
    },
    "createdAt": "2018-03-13T17:35:26.893Z",
    "updatedAt": "2018-03-13T17:35:26.893Z",
    "id": "5aa80bde7dafd564096a06f1"
  },
  {
    "form": "5aa80b737dafd564096a06ef",
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
      "i7zaa52km9": {
        "valid": false
      },
      "si6q5d6l3h": {
        "valid": false
      },
      "746dxzf3tjq": {
        "valid": false
      },
      "3e7l64f7fm": {
        "valid": false
      },
      "c1e1icj88h5": {
        "valid": false
      },
      "q808etoz3ck": {
        "valid": false
      },
      "q563nnrbik": {
        "valid": false
      },
      "qebszohlkro": {
        "valid": false
      },
      "5aj6jcjz8z5": {
        "valid": false
      },
      "qgcb7nmfrtn": {
        "valid": false
      },
      "c1aj8i1p6v": {
        "valid": true,
        "question": "c1aj8i1p6v",
        "type": "radiopairs",
        "value": [
          {
            "entity": "f8719zudihn",
            "property": "c8yafei3u1k"
          },
          {
            "entity": "swfxdikfd6",
            "property": "feq0dne4duj"
          },
          {
            "entity": "jkptocz193b",
            "property": "k2mnntwkkr"
          }
        ]
      },
      "of12blr96gp": {
        "valid": false
      }
    },
    "createdAt": "2018-03-13T17:52:44.659Z",
    "updatedAt": "2018-03-13T17:52:44.659Z",
    "id": "5aa80fec7dafd564096a06f2"
  }
]

$scope = {
	form: f,
	answers: a
}




let _ = require("lodash-node")
let dt = require("date-and-time");

let questions = $scope.form[0].config.questions;

let answers = $scope.answers.map ((a) => {
  a.data = _.pairs(a.data).map(d => {
    d[1].title = questions[d[0]].options.title;
    
    d[1].id = d[0];
    
    if (!d[1].value) {
    	return d[1]
    }
    
    if( ["influences"].indexOf(d[1].type) >=0 ){
      d[1].value = d[1].value.map(v => {
        return {
          entity_id: v.entity,
          entity_title: questions[d[0]].options.entities[v.entity].title,
          property_id: v.property,
          property_title: questions[d[0]].options.properties[v.property].title,
          value:v.value
        }
      }) 
    }

    if( ["pairs","radiopairs"].indexOf(d[1].type) >=0 ){
      d[1].value = d[1].value.map(v => {
        return {
          entity_id: v.entity,
          entity_title: questions[d[0]].options.entities[v.entity].title,
          property_id: v.property,
          property_title: questions[d[0]].options.properties[v.property].title,
          value:1
        }
      }) 
    }

    if( ["radio","check","dropdown"].indexOf(d[1].type) >= 0 ){
      d[1].value = d[1].value.map(v => {
        return {
          entity_id: v,
          entity_title: questions[d[0]].options.nominals[v].title,
          property_id: "",
          property_title:"",
          value:1
        }
      }) 
    }
    
    if( ["scales"].indexOf(d[1].type) >= 0 ){
      d[1].value = d[1].value.map(v => {
        return {
          entity_id: v.entity,
          entity_title: questions[d[0]].options.entities[v.entity].title,
          property_id: "",
          property_title:"",
          value:v.value
        }
      }) 
    }
    
    
    if( ["text","rate","range","datetime","scale"].indexOf(d[1].type) >= 0 ){
      d[1].value = d[1].value.map(v => {
        return {
          entity_id: "",
          entity_title: "",
          property_id: "",
          property_title:"",
          value:v
        }
      }) 
    }
    
    return d[1];
  })
  return a;
});


// console.log(JSON.stringify(answers,null,"\t"))


let responses = [];

answers = answers.forEach( a => {
    a.data.forEach( d => {
    	if(d.value){
    		d.value.forEach( v => {
		        responses.push({
		          response_id:a.id,
		          updatedAt: dt.format(new Date(a.updatedAt), "DD/MM/YY HH:mm"),//_util.format.date(a.updatedAt, "DD/MM/YY HH:mm"),
		          form:a.form,
		          respondent:(a.user.email)? a.user.email : "",
		          question_id: d.id,
		          question_title: d.title,
		          question_type: d.type,
		          valid:(d.valid)? 1 : 0,
		          entity_id: v.entity_id,
		          entity_title:v.entity_title,
		          property_id:v.property_id,
		          property_title:v.property_title,
		          value:v.value     
		        })
		      })		
    	}	
    })
});

$scope.responses = responses;

console.log(JSON.stringify($scope.responses,null,"\t"))