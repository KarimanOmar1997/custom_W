System.register(["jimu-core"], function (e, t) {
  var o = {};
  return {
    setters: [
      function (e) {
        ((o.DataSourceComponent = e.DataSourceComponent),
          (o.DataSourceStatus = e.DataSourceStatus),
          (o.React = e.React));
      },
    ],
    execute: function () {
      e(
        (() => {
          var e = {
              9244: (e) => {
                "use strict";
                e.exports = o;
              },
            },
            t = {};
          function r(o) {
            var a = t[o];
            if (void 0 !== a) return a.exports;
            var n = (t[o] = { exports: {} });
            return (e[o](n, n.exports, r), n.exports);
          }
          ((r.d = (e, t) => {
            for (var o in t)
              r.o(t, o) &&
                !r.o(e, o) &&
                Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
          }),
            (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
            (r.r = (e) => {
              ("undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Module",
                }),
                Object.defineProperty(e, "__esModule", { value: !0 }));
            }),
            (r.p = ""));
          var a = {};
          return (
            (r.p = window.jimuConfig.baseUrl),
            (() => {
              "use strict";
              (r.r(a),
                r.d(a, {
                  __set_webpack_public_path__: () => n,
                  default: () => o,
                }));
              var e = r(9244),
                t = function (e, t, o, r) {
                  return new (o || (o = Promise))(function (a, n) {
                    function i(e) {
                      try {
                        l(r.next(e));
                      } catch (e) {
                        n(e);
                      }
                    }
                    function s(e) {
                      try {
                        l(r.throw(e));
                      } catch (e) {
                        n(e);
                      }
                    }
                    function l(e) {
                      var t;
                      e.done
                        ? a(e.value)
                        : ((t = e.value),
                          t instanceof o
                            ? t
                            : new o(function (e) {
                                e(t);
                              })).then(i, s);
                    }
                    l((r = r.apply(e, t || [])).next());
                  });
                };
              class o extends e.React.PureComponent {
                constructor() {
                  (super(...arguments),
                    (this.state = {
                      query: null,
                      apiResult: null,
                      loading: !1,
                      selectedRecord: null,
                    }),
                    (this.cityNameRef = e.React.createRef()),
                    (this.query = () => {
                      var e;
                      if (!this.isDsConfigured()) return;
                      const [t] = this.props.useDataSources[0].fields,
                        r =
                          (null === (e = this.cityNameRef.current) ||
                          void 0 === e
                            ? void 0
                            : e.value) || "",
                        a = r
                          ? `(${t} LIKE '%${r}%')`
                          : "1=1";
                      this.setState({
                        query: { where: a, outFields: ["*"], pageSize: 10 },
                      });
                    }),
                    (this.isDsConfigured = () =>
                      this.props.useDataSources &&
                      1 === this.props.useDataSources.length &&
                      this.props.useDataSources[0].fields &&
                      this.props.useDataSources[0].fields.length >= 1),
                    (this.fetchFiles = (fileCode) =>
                      t(this, void 0, void 0, function* () {
                        try {
                          (console.log("fetchFiles CALLED with:", fileCode),
                            this.setState({
                              loading: !0,
                              apiResult: null,
                              selectedRecord: { filecode: fileCode },
                            }));
                          const url = "http://10.107.230.40:8069/api/Boyot/GetLandData";
                          console.log("POST to:", url, "landCode:", fileCode);
                          const r = yield fetch(url, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ landCode: fileCode }),
                          });
                          if (!r.ok) throw new Error(`HTTP error! ${r.status}`);
                          const a = yield r.json();
                          (console.log("API Response:", a),
                            this.setState({ apiResult: a }));
                        } catch (e) {
                          this.setState({ apiResult: { error: e.message } });
                        } finally {
                          this.setState({ loading: !1 });
                        }
                      })),
                    (this.formatCurrency = (e) =>
                      e
                        ? new Intl.NumberFormat("ar-SA", {
                            minimumFractionDigits: 0,
                          }).format(Number(e))
                        : "0"),
                    (this.dataRender = (t, o) => {
                      const [r] = this.props.useDataSources[0].fields;
                      return e.React.createElement(
                        e.React.Fragment,
                        null,
                        e.React.createElement(
                          "div",
                          {
                            className: "record-list",
                            style: {
                              width: "100%",
                              marginTop: "10px",
                              maxHeight: "200px",
                              overflow: "auto",
                              border: "1px solid #e0e0e0",
                              backgroundColor: "#fff",
                            },
                          },
                          t && t.getStatus() === e.DataSourceStatus.Loaded
                            ? t.getRecords().map((o, n) => {
                                var i;
                                const l = o.getData()[r],
                                  d =
                                    (null === (i = this.state.selectedRecord) ||
                                    void 0 === i
                                      ? void 0
                                      : i.filecode) === l;
                                return e.React.createElement(
                                  "button",
                                  {
                                    key: n,
                                    style: {
                                      width: "100%",
                                      cursor: "pointer",
                                      padding: "10px 12px",
                                      border: "none",
                                      borderBottom:
                                        n < t.getRecords().length - 1
                                          ? "1px solid #f0f0f0"
                                          : "none",
                                      backgroundColor: d ? "#e3f2fd" : "#fff",
                                      textAlign: "left",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#333",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      transition: "background-color 0.2s ease",
                                    },
                                    onClick: () => this.fetchFiles(l),
                                    onMouseEnter: (e) => {
                                      d ||
                                        (e.currentTarget.style.backgroundColor =
                                          "#f5f5f5");
                                    },
                                    onMouseLeave: (e) => {
                                      d ||
                                        (e.currentTarget.style.backgroundColor =
                                          "#fff");
                                    },
                                  },
                                  e.React.createElement(
                                    "span",
                                    { style: { fontSize: "11px" } },
                                    e.React.createElement(
                                      "strong",
                                      null,
                                      "\u0643\u0648\u062f \u0627\u0644\u0623\u0631\u0636:",
                                    ),
                                    " ",
                                    l,
                                  ),
                                  e.React.createElement(
                                    "span",
                                    {
                                      style: {
                                        fontSize: "10px",
                                        color: "#666",
                                        backgroundColor: "#f0f0f0",
                                        padding: "3px 6px",
                                      },
                                    },
                                    "\u0639\u0631\u0636 \u0627\u0644\u0645\u0628\u0644\u063a",
                                  ),
                                );
                              })
                            : e.React.createElement(
                                "div",
                                {
                                  style: {
                                    padding: "20px 12px",
                                    textAlign: "center",
                                    color: "#666",
                                    fontSize: "12px",
                                  },
                                },
                                "\u0644\u0627 \u062a\u0648\u062c\u062f \u0633\u062c\u0644\u0627\u062a \u0645\u062a\u0627\u062d\u0629",
                              ),
                        ),
                      );
                    }));
                }
                componentDidMount() {
                  this.query();
                }
                render() {
                  return this.isDsConfigured()
                    ? e.React.createElement(
                        "div",
                        {
                          className: "widget-use-feature-layer",
                          style: {
                            width: "100%",
                            height: "100%",
                            maxHeight: "100vh",
                            overflow: "auto",
                            backgroundColor: "#fafafa",
                            fontFamily: "Arial, sans-serif",
                          },
                        },
                        e.React.createElement(
                          "div",
                          {
                            style: {
                              backgroundColor: "#fff",
                              padding: "12px",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                              marginBottom: "10px",
                            },
                          },
                          e.React.createElement(
                            "h3",
                            {
                              style: {
                                margin: "0 0 12px 0",
                                color: "#2c3e50",
                                fontSize: "14px",
                                fontWeight: "600",
                                textAlign: "center",
                                borderBottom: "2px solid #006737",
                                paddingBottom: "8px",
                              },
                            },
                            "\u0627\u0644\u0645\u0633\u062a\u062d\u0642\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629",
                          ),
                          e.React.createElement(
                            e.DataSourceComponent,
                            {
                              useDataSource: this.props.useDataSources[0],
                              query: this.state.query,
                              widgetId: this.props.id,
                              queryCount: !0,
                            },
                            this.dataRender,
                          ),
                        ),
                        (this.state.loading || this.state.apiResult) &&
                          e.React.createElement(
                            "div",
                            {
                              style: {
                                backgroundColor: "#fff",
                                padding: "12px",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                                border: "1px solid #e0e0e0",
                              },
                            },
                            e.React.createElement(
                              "h4",
                              {
                                style: {
                                  margin: "0 0 10px 0",
                                  color: "#2c3e50",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                },
                              },
                              e.React.createElement("span", {
                                style: {
                                  width: "6px",
                                  height: "6px",
                                  backgroundColor: "#3498db",
                                  borderRadius: "50%",
                                },
                              }),
                              "\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0645\u0628\u0627\u0644\u063a",
                            ),
                            this.state.loading &&
                              e.React.createElement(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "20px 10px",
                                    color: "#666",
                                    fontSize: "14px",
                                  },
                                },
                                e.React.createElement("div", {
                                  style: {
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid #f3f3f3",
                                    borderTop: "2px solid #3498db",
                                    borderRadius: "50%",
                                    marginLeft: "8px",
                                  },
                                }),
                                "Loading...",
                              ),
                            this.state.apiResult &&
                              !this.state.loading &&
                              "object" == typeof this.state.apiResult &&
                              !("error" in this.state.apiResult) &&
                              e.React.createElement(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  },
                                },
                                e.React.createElement(
                                  "div",
                                  {
                                    style: {
                                      backgroundColor: "rgb(0, 103, 55)",
                                      padding: "12px",
                                      border: "1px solid rgb(0, 103, 55)",
                                      textAlign: "center",
                                    },
                                  },
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "12px",
                                        color: "#ffffff",
                                        marginBottom: "4px",
                                      },
                                    },
                                    "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0645\u062f\u0641\u0648\u0639",
                                  ),
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        color: "#ffffff",
                                      },
                                    },
                                    this.formatCurrency(
                                      this.state.apiResult.total_amount_paid,
                                    ),
                                  ),
                                ),
                                e.React.createElement(
                                  "div",
                                  {
                                    style: {
                                      backgroundColor: "#ffffff",
                                      padding: "12px",
                                      border: "1px solid rgb(0, 103, 55)",
                                      textAlign: "center",
                                    },
                                  },
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        color: "#1b5e20",
                                      },
                                    },
                                    "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0645\u062a\u0628\u0642\u0649",
                                  ),
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        color: "#1b5e20",
                                      },
                                    },
                                    this.formatCurrency(
                                      this.state.apiResult.total_amount_remaining,
                                    ),
                                  ),
                                ),
                                e.React.createElement(
                                  "div",
                                  {
                                    style: {
                                      backgroundColor: "rgb(0, 103, 55)",
                                      padding: "12px",
                                      border: "1px solid rgb(0, 103, 55)",
                                      textAlign: "center",
                                    },
                                  },
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "12px",
                                        color: "#ffffff",
                                        marginBottom: "4px",
                                      },
                                    },
                                    "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a",
                                  ),
                                  e.React.createElement(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        color: "#ffffff",
                                      },
                                    },
                                    this.formatCurrency(
                                      this.state.apiResult.total_amount,
                                    ),
                                  ),
                                ),
                              ),
                            this.state.apiResult &&
                              this.state.apiResult.error &&
                              e.React.createElement(
                                "div",
                                {
                                  style: {
                                    backgroundColor: "#ffebee",
                                    color: "#c62828",
                                    padding: "12px",
                                    border: "1px solid #ef9a9a",
                                    textAlign: "center",
                                    fontSize: "14px",
                                  },
                                },
                                e.React.createElement(
                                  "strong",
                                  null,
                                  "\u062e\u0637\u0623:",
                                ),
                                " ",
                                this.state.apiResult.error,
                              ),
                          ),
                      )
                    : e.React.createElement(
                        "div",
                        {
                          style: {
                            padding: "15px 10px",
                            textAlign: "center",
                            backgroundColor: "#f9f9f9",
                            border: "2px dashed #ccc",
                            margin: "10px",
                          },
                        },
                        e.React.createElement(
                          "h3",
                          {
                            style: {
                              color: "#666",
                              marginBottom: "8px",
                              fontSize: "16px",
                            },
                          },
                          "This widget demonstrates how to use a feature layer as a data source.",
                        ),
                        e.React.createElement(
                          "p",
                          { style: { color: "#888", fontSize: "12px" } },
                          "Configure the data source.",
                        ),
                      );
                }
              }
              function n(e) {
                r.p = e;
              }
            })(),
            a
          );
        })(),
      );
    },
  };
});