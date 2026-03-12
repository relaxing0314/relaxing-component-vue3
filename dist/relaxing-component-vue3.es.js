import { computed as S, openBlock as i, createElementBlock as d, normalizeClass as g, createElementVNode as f, createCommentVNode as m, renderSlot as v, createBlock as O, resolveDynamicComponent as P, normalizeStyle as j, ref as b, onMounted as E, onBeforeUnmount as L, toDisplayString as $, createApp as U, h as F, createTextVNode as B, withDirectives as N, Fragment as H, renderList as _, withModifiers as M, vShow as z, nextTick as q, inject as G, watch as T, provide as J } from "vue";
const A = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, n] of o)
    t[a] = n;
  return t;
}, Q = ["type", "disabled"], W = {
  key: 0,
  class: "a-button-loading-icon"
}, X = {
  key: 2,
  class: "a-button-text"
}, Y = {
  name: "AButton"
}, Z = /* @__PURE__ */ Object.assign(Y, {
  props: {
    // 按钮类型
    type: {
      type: String,
      default: "default",
      validator: (e) => ["default", "primary", "dashed", "text", "link"].includes(e)
    },
    // HTML 类型
    htmlType: {
      type: String,
      default: "button",
      validator: (e) => ["button", "submit", "reset"].includes(e)
    },
    // 按钮尺寸
    size: {
      type: String,
      default: "middle",
      validator: (e) => ["large", "middle", "small"].includes(e)
    },
    // 按钮形状
    shape: {
      type: String,
      default: "default",
      validator: (e) => ["default", "circle", "round"].includes(e)
    },
    // 是否为危险按钮
    danger: {
      type: Boolean,
      default: !1
    },
    // 按钮是否禁用
    disabled: {
      type: Boolean,
      default: !1
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: !1
    },
    // 幽灵按钮
    ghost: {
      type: Boolean,
      default: !1
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      default: !1
    },
    // 链接地址
    href: {
      type: String,
      default: ""
    },
    // 图标位置
    iconPosition: {
      type: String,
      default: "start",
      validator: (e) => ["start", "end"].includes(e)
    },
    // 颜色
    color: {
      type: String,
      default: "",
      validator: (e) => !e || ["error", "warning", "success", "primary", "default"].includes(e)
    },
    // 前置图标
    preIcon: {
      type: [String, Object],
      default: null
    },
    // 后置图标
    postIcon: {
      type: [String, Object],
      default: null
    },
    // 图标大小
    iconSize: {
      type: Number,
      default: 14
    }
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const t = e, a = o, n = S(() => [
      "a-button",
      `a-button-${t.type}`,
      `a-button-size-${t.size}`,
      {
        [`a-button-${t.shape}`]: t.shape !== "default",
        "a-button-dangerous": t.danger,
        "a-button-disabled": t.disabled,
        "a-button-loading": t.loading,
        "a-button-ghost": t.ghost,
        "a-button-block": t.block,
        [`a-button-color-${t.color}`]: t.color && !t.type
      }
    ]);
    function l(c) {
      if (t.disabled || t.loading) {
        c.preventDefault();
        return;
      }
      t.href && (window.location.href = t.href), a("click", c);
    }
    return (c, y) => (i(), d("button", {
      class: g(n.value),
      type: e.htmlType,
      disabled: e.disabled || e.loading,
      onClick: l
    }, [
      e.loading ? (i(), d("span", W, [...y[0] || (y[0] = [
        f("svg", {
          viewBox: "0 0 1024 1024",
          class: "loading-icon",
          "data-icon": "loading"
        }, [
          f("path", { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" })
        ], -1)
      ])])) : m("", !0),
      e.preIcon && !e.loading ? (i(), d("span", {
        key: 1,
        class: g(["a-button-icon", { "a-button-icon-left": !0 }])
      }, [
        v(c.$slots, "preIcon", {}, () => [
          (i(), O(P(e.preIcon), {
            style: j({ fontSize: `${e.iconSize}px` })
          }, null, 8, ["style"]))
        ], !0)
      ])) : m("", !0),
      c.$slots.default || c.$attrs.title ? (i(), d("span", X, [
        v(c.$slots, "default", {}, void 0, !0)
      ])) : m("", !0),
      e.postIcon && !e.loading ? (i(), d("span", {
        key: 3,
        class: g(["a-button-icon", { "a-button-icon-right": !0 }])
      }, [
        v(c.$slots, "postIcon", {}, () => [
          (i(), O(P(e.postIcon), {
            style: j({ fontSize: `${e.iconSize}px` })
          }, null, 8, ["style"]))
        ], !0)
      ])) : m("", !0)
    ], 10, Q));
  }
}), ee = /* @__PURE__ */ A(Z, [["__scopeId", "data-v-e144f8ad"]]), te = {
  key: 0,
  class: "a-message"
}, ae = { class: "a-message-icon" }, le = {
  key: 0,
  class: "iconfont icon-success"
}, ne = {
  key: 1,
  class: "iconfont icon-error"
}, oe = {
  key: 2,
  class: "iconfont icon-warning"
}, se = {
  key: 3,
  class: "iconfont icon-info"
}, ce = { class: "a-message-text" }, ie = {
  __name: "AMessage",
  props: {
    content: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info"
    },
    duration: {
      type: Number,
      default: 3e3
    },
    onClose: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(e) {
    const o = e, t = b(!1);
    let a = null;
    const n = () => {
      o.duration > 0 && (a = setTimeout(() => {
        l();
      }, o.duration));
    }, l = () => {
      t.value = !1, a && (clearTimeout(a), a = null), o.onClose();
    };
    return E(() => {
      t.value = !0, n();
    }), L(() => {
      a && (clearTimeout(a), a = null);
    }), (c, y) => t.value ? (i(), d("div", te, [
      f("div", {
        class: g(["a-message-content", e.type])
      }, [
        f("span", ae, [
          e.type === "success" ? (i(), d("i", le)) : e.type === "error" ? (i(), d("i", ne)) : e.type === "warning" ? (i(), d("i", oe)) : e.type === "info" ? (i(), d("i", se)) : m("", !0)
        ]),
        f("span", ce, $(e.content), 1)
      ], 2)
    ])) : m("", !0);
  }
}, de = /* @__PURE__ */ A(ie, [["__scopeId", "data-v-02fc2c39"]]);
let k, p = [], ue = 1;
const I = function(e) {
  if (typeof window > "u") return;
  e = e || {}, typeof e == "string" && (e = {
    content: e
  });
  const o = "message_" + ue++, t = e.onClose;
  e.onClose = function() {
    I.close(o, t);
  };
  const a = document.createElement("div");
  document.body.appendChild(a), k = U({
    render() {
      return F(de, {
        ...e,
        onClose: () => {
          I.close(o, t);
        }
      });
    }
  }), k.mount(a), k.id = o, k.dom = a.firstElementChild;
  let n = 0;
  return p.forEach((l) => {
    n += l.dom.offsetHeight + 16;
  }), k.verticalOffset = n, p.push(k), k;
}, re = ["success", "warning", "info", "error"];
re.forEach((e) => {
  I[e] = (o) => (typeof o == "string" && (o = {
    content: o
  }), o.type = e, I(o));
});
I.close = function(e, o) {
  const t = p.length;
  let a = -1, n;
  for (let l = 0; l < t; l++)
    if (e === p[l].id) {
      typeof o == "function" && o(p[l]), a = l, p[l] && p[l].dom && (n = p[l].dom.offsetHeight), p[l].unmount(), p[l].dom && p[l].dom.parentNode && document.body.removeChild(p[l].dom.parentNode), p.splice(l, 1);
      break;
    }
  if (!(t <= 1 || a === -1 || a > p.length - 1))
    for (let l = a; l < t - 1; l++) {
      const c = p[l].dom;
      c.style.top = parseInt(c.style.top, 10) - n - 16 + "px";
    }
};
I.closeAll = function() {
  for (let e = p.length - 1; e >= 0; e--)
    p[e].unmount(), document.body.removeChild(p[e].dom.parentNode), p.splice(e, 1);
};
const fe = {
  name: "ASelectOption"
}, pe = /* @__PURE__ */ Object.assign(fe, {
  props: {
    // 选项值
    value: {
      type: [String, Number],
      required: !0
    },
    // 选项标签
    label: {
      type: String,
      default: ""
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: !1
    },
    // 是否选中
    selected: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: o }) {
    const t = e, a = o;
    function n() {
      a("select", {
        value: t.value,
        label: t.label || t.value
      });
    }
    return (l, c) => (i(), d("li", {
      class: g(["a-select-option", {
        "a-select-option-disabled": e.disabled,
        "a-select-option-selected": e.selected
      }]),
      onClick: c[0] || (c[0] = (y) => !e.disabled && n())
    }, [
      v(l.$slots, "default", {}, () => [
        B($(e.label || e.value), 1)
      ], !0)
    ], 2));
  }
}), K = /* @__PURE__ */ A(pe, [["__scopeId", "data-v-9b607517"]]), ye = { class: "a-select-selector" }, me = {
  key: 0,
  class: "a-select-selection-item"
}, ve = {
  key: 1,
  class: "a-select-selection-placeholder"
}, ge = { class: "a-select-dropdown-menu" }, he = ["onClick"], be = {
  name: "ASelect"
}, we = /* @__PURE__ */ Object.assign(be, {
  props: {
    // 绑定值
    modelValue: {
      type: [String, Number, Array],
      default: ""
    },
    // 选项列表
    options: {
      type: Array,
      default: () => []
    },
    // 占位符
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 是否有边框
    bordered: {
      type: Boolean,
      default: !0
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: !1
    },
    // 是否允许清除
    allowClear: {
      type: Boolean,
      default: !1
    },
    // 下拉菜单样式
    dropdownStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: o }) {
    const t = e, a = o, n = b(!1), l = b(!1), c = b(null), y = S(() => t.options.find((s) => s.value === t.modelValue));
    S(() => y.value ? y.value.label : "");
    function r(s) {
      s.stopPropagation(), !t.disabled && (n.value = !n.value, l.value = n.value, n.value && q(() => {
        h();
      }));
    }
    function u(s) {
      t.disabled || (a("update:modelValue", s.value), n.value = !1, a("change", s.value));
    }
    function w(s) {
      s.stopPropagation(), c.value && !c.value.contains(s.target) && (n.value = !1, l.value = !1);
    }
    function h() {
      if (!c.value) return;
      const s = c.value.querySelector(".a-select-dropdown");
      if (!s) return;
      const x = c.value.getBoundingClientRect();
      s.style.top = `${x.bottom}px`, s.style.left = `${x.left}px`, s.style.width = `${x.width}px`, s.style.display = "block";
    }
    return E(() => {
      document.addEventListener("click", w);
    }), L(() => {
      document.removeEventListener("click", w);
    }), (s, x) => (i(), d("div", {
      class: g(["a-select", {
        "a-select-focused": l.value,
        "a-select-bordered": e.bordered,
        "a-select-open": n.value,
        "a-select-disabled": e.disabled
      }]),
      ref_key: "selectRef",
      ref: c,
      onClick: r
    }, [
      f("div", ye, [
        y.value ? (i(), d("span", me, [
          v(s.$slots, "optionContent", { option: y.value }, () => [
            B($(y.value.label), 1)
          ], !0)
        ])) : (i(), d("span", ve, $(e.placeholder), 1))
      ]),
      x[0] || (x[0] = f("span", { class: "a-select-arrow" }, [
        f("span", { class: "a-select-arrow-icon" }, [
          f("svg", {
            viewBox: "64 64 896 896",
            focusable: "false",
            "data-icon": "down",
            "aria-hidden": "true"
          }, [
            f("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
          ])
        ])
      ], -1)),
      N(f("div", {
        class: "a-select-dropdown",
        style: j([e.dropdownStyle, { position: "fixed" }])
      }, [
        f("ul", ge, [
          (i(!0), d(H, null, _(e.options, (C) => (i(), d("li", {
            key: C.value,
            class: g([
              "a-select-dropdown-menu-item",
              { "a-select-dropdown-menu-item-selected": C.value === e.modelValue }
            ]),
            onClick: M((De) => u(C), ["stop"])
          }, [
            v(s.$slots, "optionContent", { option: C }, () => [
              B($(C.label), 1)
            ], !0)
          ], 10, he))), 128))
        ])
      ], 4), [
        [z, n.value]
      ])
    ], 2));
  }
}), R = /* @__PURE__ */ A(we, [["__scopeId", "data-v-459608c9"]]), $e = ["value", "placeholder", "rows", "disabled", "autofocus", "maxlength", "readonly"], xe = {
  key: 0,
  class: "a-textarea-count"
}, ke = {
  name: "ATextarea"
}, Se = /* @__PURE__ */ Object.assign(ke, {
  props: {
    // 绑定值
    modelValue: {
      type: String,
      default: ""
    },
    // 占位符
    placeholder: {
      type: String,
      default: ""
    },
    // 行数
    rows: {
      type: [String, Number],
      default: 4
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: !1
    },
    // 自动获取焦点
    autofocus: {
      type: Boolean,
      default: !1
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: void 0
    },
    // 显示字数统计
    showCount: {
      type: Boolean,
      default: !1
    },
    // 只读
    readonly: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "input", "focus", "blur", "keydown"],
  setup(e, { expose: o, emit: t }) {
    const a = t, n = b(!1), l = b(null);
    function c(s) {
      a("update:modelValue", s.target.value), a("input", s);
    }
    function y(s) {
      n.value = !0, a("focus", s);
    }
    function r(s) {
      n.value = !1, a("blur", s);
    }
    function u(s) {
      a("keydown", s);
    }
    function w() {
      l.value?.focus();
    }
    function h() {
      l.value?.blur();
    }
    return o({
      focus: w,
      blur: h
    }), (s, x) => (i(), d("div", {
      class: g(["a-textarea-wrapper", {
        "a-textarea-focused": n.value,
        "a-textarea-disabled": e.disabled
      }])
    }, [
      f("textarea", {
        ref_key: "textareaRef",
        ref: l,
        class: "a-textarea",
        value: e.modelValue,
        placeholder: e.placeholder,
        rows: e.rows,
        disabled: e.disabled,
        autofocus: e.autofocus,
        maxlength: e.maxlength,
        readonly: e.readonly,
        onInput: c,
        onFocus: y,
        onBlur: r,
        onKeydown: u
      }, null, 40, $e),
      e.showCount && e.maxlength ? (i(), d("span", xe, $(e.modelValue.length) + "/" + $(e.maxlength), 1)) : m("", !0)
    ], 2));
  }
}), Ie = /* @__PURE__ */ A(Se, [["__scopeId", "data-v-6dd2304c"]]), Ae = { class: "collapse-panel-header-text" }, Ce = {
  key: 0,
  class: "arrow-icon"
}, Be = {
  key: 0,
  viewBox: "0 0 1024 1024",
  class: "icon"
}, Oe = {
  key: 1,
  viewBox: "0 0 1024 1024",
  class: "icon"
}, Pe = { class: "collapse-panel-content-box" }, je = {
  name: "ACollapsePanel"
}, Ne = /* @__PURE__ */ Object.assign(je, {
  props: {
    // 面板头内容
    header: {
      type: String,
      default: ""
    },
    // 与activeKey对应的唯一标识
    itemKey: {
      type: [String, Number],
      required: !0
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: !1
    },
    // 是否显示箭头
    showArrow: {
      type: Boolean,
      default: !0
    },
    // 右上角额外元素
    extra: {
      type: [String, Object]
    }
  },
  emits: ["click", "motionEnd"],
  setup(e, { emit: o }) {
    const t = e, a = o, n = G("collapse", {
      isActive: () => !1,
      togglePanel: () => {
      },
      expandIconPosition: "right",
      expandIcon: "",
      collapseIcon: ""
    }), l = b(null), c = S(() => n.isActive ? n.isActive(t.itemKey) : !1), y = S(() => n.expandIconPosition || "right"), r = S(() => n.expandIcon), u = S(() => n.collapseIcon);
    function w() {
      n.togglePanel && n.togglePanel(t.itemKey), a("click", t.itemKey);
    }
    return (h, s) => (i(), d("div", {
      class: g(["collapse-panel", {
        "collapse-panel-active": c.value,
        "collapse-panel-disabled": e.disabled,
        "collapse-panel-no-arrow": !e.showArrow
      }])
    }, [
      f("div", {
        class: "collapse-panel-header",
        onClick: s[1] || (s[1] = (x) => !e.disabled && w())
      }, [
        f("div", Ae, [
          v(h.$slots, "header", {}, () => [
            B($(e.header), 1)
          ], !0)
        ]),
        h.$slots.extra || e.extra ? (i(), d("div", {
          key: 0,
          class: "collapse-panel-extra",
          onClick: s[0] || (s[0] = M(() => {
          }, ["stop"]))
        }, [
          v(h.$slots, "extra", {}, () => [
            B($(e.extra), 1)
          ], !0)
        ])) : m("", !0),
        e.showArrow ? (i(), d("div", {
          key: 1,
          class: g(["collapse-panel-arrow", { "collapse-panel-arrow-left": y.value === "left" }])
        }, [
          !h.$slots.expandIcon && !r.value && !u.value ? (i(), d("span", Ce, [
            c.value ? (i(), d("svg", Be, [...s[2] || (s[2] = [
              f("path", { d: "M512 704L195.2 387.2c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L512 614.4l272-272c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L512 704z" }, null, -1)
            ])])) : (i(), d("svg", Oe, [...s[3] || (s[3] = [
              f("path", { d: "M387.2 828.8c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L614.4 512 342.4 240c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l316.8 316.8c12.8 12.8 12.8 32 0 44.8L387.2 828.8z" }, null, -1)
            ])]))
          ])) : m("", !0),
          v(h.$slots, "expandIcon", {}, () => [
            c.value && r.value ? (i(), O(P(r.value), { key: 0 })) : !c.value && u.value ? (i(), O(P(u.value), { key: 1 })) : m("", !0)
          ], !0)
        ], 2)) : m("", !0)
      ]),
      N(f("div", {
        class: "collapse-panel-content",
        ref_key: "contentRef",
        ref: l
      }, [
        f("div", Pe, [
          v(h.$slots, "default", {}, void 0, !0)
        ])
      ], 512), [
        [z, c.value]
      ])
    ], 2));
  }
}), V = /* @__PURE__ */ A(Ne, [["__scopeId", "data-v-b2f44107"]]), ze = {
  name: "ACollapse"
}, Ve = /* @__PURE__ */ Object.assign(ze, {
  props: {
    // 手风琴模式，只允许展开一个面板
    accordion: {
      type: Boolean,
      default: !1
    },
    // 当前激活的面板的key
    activeKey: {
      type: [Array, String, Number]
    },
    // 默认激活的面板的key
    defaultActiveKey: {
      type: [Array, String, Number]
    },
    // 是否有边框
    bordered: {
      type: Boolean,
      default: !0
    },
    // 自定义展开图标
    expandIcon: {
      type: [String, Object],
      default: ""
    },
    // 自定义折叠图标
    collapseIcon: {
      type: [String, Object],
      default: ""
    },
    // 展开图标的位置
    expandIconPosition: {
      type: String,
      default: "right",
      validator: (e) => ["left", "right"].includes(e)
    }
  },
  emits: ["change"],
  setup(e, { expose: o, emit: t }) {
    const a = e, n = t, l = b(
      a.activeKey || a.defaultActiveKey || (a.accordion ? "" : [])
    );
    T(
      () => a.activeKey,
      (r) => {
        r !== void 0 && (l.value = r);
      }
    );
    function c(r) {
      let u = l.value;
      if (a.accordion)
        u = u === r ? "" : r;
      else {
        u = [...Array.isArray(u) ? u : [u]];
        const w = u.indexOf(r);
        w > -1 ? u.splice(w, 1) : u.push(r);
      }
      l.value = u, n("change", u);
    }
    function y(r) {
      const u = l.value;
      return a.accordion ? u === r : (Array.isArray(u) ? u : [u]).includes(r);
    }
    return J("collapse", {
      isActive: y,
      togglePanel: c,
      get expandIconPosition() {
        return a.expandIconPosition;
      },
      get expandIcon() {
        return a.expandIcon;
      },
      get collapseIcon() {
        return a.collapseIcon;
      }
    }), o({
      Panel: V
    }), (r, u) => (i(), d("div", {
      class: g(["collapse", {
        "collapse-accordion": e.accordion,
        "collapse-borderless": !e.bordered
      }])
    }, [
      v(r.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), D = /* @__PURE__ */ A(Ve, [["__scopeId", "data-v-f80cc4da"]]), Ee = { style: { width: "100%", height: "100%" } }, Le = ["src"], Me = {
  name: "AsyncImg"
}, Te = /* @__PURE__ */ Object.assign(Me, {
  props: {
    defaultImg: {
      type: String,
      default: ""
    },
    asyncUrl: {
      type: String,
      default: ""
    },
    apiUrl: {
      type: String,
      default: ""
    },
    apiMethod: {
      type: String,
      default: "POST"
    },
    apiHeaders: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const o = e, t = b(""), a = b(!1);
    return T(
      () => o.asyncUrl,
      async (n) => {
        if (n && o.apiUrl) {
          a.value = !0;
          try {
            const l = new FormData();
            l.append("logo", n);
            const y = await (await fetch(o.apiUrl, {
              method: o.apiMethod,
              body: l,
              headers: o.apiHeaders
            })).blob(), r = URL.createObjectURL(y);
            t.value = r;
          } catch (l) {
            console.error("图片加载失败:", l), t.value = o.defaultImg;
          } finally {
            a.value = !1;
          }
        } else
          t.value = o.defaultImg, a.value = !1;
      },
      { immediate: !0, deep: !0 }
    ), (n, l) => (i(), d("div", Ee, [
      N(f("img", {
        src: t.value,
        style: { width: "100%", height: "100%", "border-radius": "6px", position: "relative" }
      }, null, 8, Le), [
        [z, t.value]
      ])
    ]));
  }
});
R.Option = K;
D.Panel = V;
const Ke = [ee, I, K, R, Ie, V, D, Te], Re = function(e, o) {
  Ke.forEach((t) => {
    e.component(t.name, t);
  });
}, Fe = { install: Re };
export {
  ee as AButton,
  D as ACollapse,
  V as ACollapsePanel,
  R as ASelect,
  K as ASelectOption,
  Ie as ATextarea,
  Te as AsyncImg,
  I as Message,
  Fe as default
};
