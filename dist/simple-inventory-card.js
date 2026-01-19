const t = '0.3.7',
  e = globalThis,
  i =
    e.ShadowRoot &&
    (void 0 === e.ShadyCSS || e.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  o = /* @__PURE__ */ Symbol(),
  r = /* @__PURE__ */ new WeakMap();
let n = class {
  constructor(t, e, i) {
    if (((this._$cssResult$ = !0), i !== o))
      throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    ((this.cssText = t), (this.t = e));
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (i && void 0 === t) {
      const i = void 0 !== e && 1 === e.length;
      (i && (t = r.get(e)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && r.set(e, t)));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const a = (t, ...e) => {
    const i =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, i, o) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(i) +
              t[o + 1],
            t[0],
          );
    return new n(i, t, o);
  },
  s = i
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const i of t.cssRules) e += i.cssText;
              return ((t) => new n('string' == typeof t ? t : t + '', void 0, o))(e);
            })(t)
          : t,
  {
    is: l,
    defineProperty: d,
    getOwnPropertyDescriptor: c,
    getOwnPropertyNames: p,
    getOwnPropertySymbols: h,
    getPrototypeOf: u,
  } = Object,
  m = globalThis,
  g = m.trustedTypes,
  y = g ? g.emptyScript : '',
  f = m.reactiveElementPolyfillSupport,
  v = (t, e) => t,
  b = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? y : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let i = t;
      switch (e) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (o) {
            i = null;
          }
      }
      return i;
    },
  },
  x = (t, e) => !l(t, e),
  _ = { attribute: !0, type: String, converter: b, reflect: !1, useDefault: !1, hasChanged: x };
((Symbol.metadata ??= /* @__PURE__ */ Symbol('metadata')),
  (m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap()));
let $ = class extends HTMLElement {
  static addInitializer(t) {
    (this._$Ei(), (this.l ??= []).push(t));
  }
  static get observedAttributes() {
    return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
  }
  static createProperty(t, e = _) {
    if (
      (e.state && (e.attribute = !1),
      this._$Ei(),
      this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0),
      this.elementProperties.set(t, e),
      !e.noAccessor)
    ) {
      const i = /* @__PURE__ */ Symbol(),
        o = this.getPropertyDescriptor(t, i, e);
      void 0 !== o && d(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = c(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(t) {
        this[e] = t;
      },
    };
    return {
      get: o,
      set(e) {
        const n = o?.call(this);
        (r?.call(this, e), this.requestUpdate(t, n, i));
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _;
  }
  static _$Ei() {
    if (this.hasOwnProperty(v('elementProperties'))) return;
    const t = u(this);
    (t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties)));
  }
  static finalize() {
    if (this.hasOwnProperty(v('finalized'))) return;
    if (((this.finalized = !0), this._$Ei(), this.hasOwnProperty(v('properties')))) {
      const t = this.properties,
        e = [...p(t), ...h(t)];
      for (const i of e) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const e = litPropertyMetadata.get(t);
      if (void 0 !== e) for (const [t, i] of e) this.elementProperties.set(t, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const t = this._$Eu(e, i);
      void 0 !== t && this._$Eh.set(t, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) e.unshift(s(t));
    } else void 0 !== t && e.push(s(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return !1 === i
      ? void 0
      : 'string' == typeof i
        ? i
        : 'string' == typeof t
          ? t.toLowerCase()
          : void 0;
  }
  constructor() {
    (super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev());
  }
  _$Ev() {
    ((this._$ES = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this)));
  }
  addController(t) {
    ((this._$EO ??= /* @__PURE__ */ new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.());
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(),
      e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((t, o) => {
        if (i) t.adoptedStyleSheets = o.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet));
        else
          for (const i of o) {
            const o = document.createElement('style'),
              r = e.litNonce;
            (void 0 !== r && o.setAttribute('nonce', r),
              (o.textContent = i.cssText),
              t.appendChild(o));
          }
      })(t, this.constructor.elementStyles),
      t
    );
  }
  connectedCallback() {
    ((this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$EO?.forEach((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t),
      o = this.constructor._$Eu(t, i);
    if (void 0 !== o && !0 === i.reflect) {
      const r = (void 0 !== i.converter?.toAttribute ? i.converter : b).toAttribute(e, i.type);
      ((this._$Em = t),
        null == r ? this.removeAttribute(o) : this.setAttribute(o, r),
        (this._$Em = null));
    }
  }
  _$AK(t, e) {
    const i = this.constructor,
      o = i._$Eh.get(t);
    if (void 0 !== o && this._$Em !== o) {
      const t = i.getPropertyOptions(o),
        r =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== t.converter?.fromAttribute
              ? t.converter
              : b;
      this._$Em = o;
      const n = r.fromAttribute(e, t.type);
      ((this[o] = n ?? this._$Ej?.get(o) ?? n), (this._$Em = null));
    }
  }
  requestUpdate(t, e, i, o = !1, r) {
    if (void 0 !== t) {
      const n = this.constructor;
      if (
        (!1 === o && (r = this[t]),
        (i ??= n.getPropertyOptions(t)),
        !(
          (i.hasChanged ?? x)(r, e) ||
          (i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))
        ))
      )
        return;
      this.C(t, e, i);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: r }, n) {
    (i &&
      !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) &&
      (this._$Ej.set(t, n ?? e ?? this[t]), !0 !== r || void 0 !== n)) ||
      (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)),
      !0 === o && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return (null != t && (await t), !this.isUpdatePending);
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, e] of this._$Ep) this[t] = e;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [e, i] of t) {
          const { wrapped: t } = i,
            o = this[e];
          !0 !== t || this._$AL.has(e) || void 0 === o || this.C(e, void 0, i, o);
        }
    }
    let t = !1;
    const e = this._$AL;
    try {
      ((t = this.shouldUpdate(e)),
        t
          ? (this.willUpdate(e), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(e))
          : this._$EM());
    } catch (i) {
      throw ((t = !1), this._$EM(), i);
    }
    t && this._$AE(e);
  }
  willUpdate(t) {}
  _$AE(t) {
    (this._$EO?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t));
  }
  _$EM() {
    ((this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1));
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    ((this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM());
  }
  updated(t) {}
  firstUpdated(t) {}
};
(($.elementStyles = []),
  ($.shadowRootOptions = { mode: 'open' }),
  ($[v('elementProperties')] = /* @__PURE__ */ new Map()),
  ($[v('finalized')] = /* @__PURE__ */ new Map()),
  f?.({ ReactiveElement: $ }),
  (m.reactiveElementVersions ??= []).push('2.1.2'));
const w = globalThis,
  E = (t) => t,
  A = w.trustedTypes,
  I = A ? A.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  T = '$lit$',
  k = `lit$${Math.random().toFixed(9).slice(2)}$`,
  S = '?' + k,
  z = `<${S}>`,
  C = document,
  D = () => C.createComment(''),
  L = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  R = Array.isArray,
  M = '[ \t\n\f\r]',
  N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  O = /-->/g,
  q = />/g,
  F = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, 'g'),
  U = /'/g,
  P = /"/g,
  H = /^(?:script|style|textarea|title)$/i,
  B = ((W = 1), (t, ...e) => ({ _$litType$: W, strings: t, values: e })),
  j = /* @__PURE__ */ Symbol.for('lit-noChange'),
  V = /* @__PURE__ */ Symbol.for('lit-nothing'),
  Y = /* @__PURE__ */ new WeakMap(),
  Q = C.createTreeWalker(C, 129);
var W;
function X(t, e) {
  if (!R(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array');
  return void 0 !== I ? I.createHTML(e) : e;
}
class J {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0,
      n = 0;
    const a = t.length - 1,
      s = this.parts,
      [l, d] = ((t, e) => {
        const i = t.length - 1,
          o = [];
        let r,
          n = 2 === e ? '<svg>' : 3 === e ? '<math>' : '',
          a = N;
        for (let s = 0; s < i; s++) {
          const e = t[s];
          let i,
            l,
            d = -1,
            c = 0;
          for (; c < e.length && ((a.lastIndex = c), (l = a.exec(e)), null !== l); )
            ((c = a.lastIndex),
              a === N
                ? '!--' === l[1]
                  ? (a = O)
                  : void 0 !== l[1]
                    ? (a = q)
                    : void 0 !== l[2]
                      ? (H.test(l[2]) && (r = RegExp('</' + l[2], 'g')), (a = F))
                      : void 0 !== l[3] && (a = F)
                : a === F
                  ? '>' === l[0]
                    ? ((a = r ?? N), (d = -1))
                    : void 0 === l[1]
                      ? (d = -2)
                      : ((d = a.lastIndex - l[2].length),
                        (i = l[1]),
                        (a = void 0 === l[3] ? F : '"' === l[3] ? P : U))
                  : a === P || a === U
                    ? (a = F)
                    : a === O || a === q
                      ? (a = N)
                      : ((a = F), (r = void 0)));
          const p = a === F && t[s + 1].startsWith('/>') ? ' ' : '';
          n +=
            a === N
              ? e + z
              : d >= 0
                ? (o.push(i), e.slice(0, d) + T + e.slice(d) + k + p)
                : e + k + (-2 === d ? s : p);
        }
        return [X(t, n + (t[i] || '<?>') + (2 === e ? '</svg>' : 3 === e ? '</math>' : '')), o];
      })(t, e);
    if (
      ((this.el = J.createElement(l, i)), (Q.currentNode = this.el.content), 2 === e || 3 === e)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (o = Q.nextNode()) && s.length < a; ) {
      if (1 === o.nodeType) {
        if (o.hasAttributes())
          for (const t of o.getAttributeNames())
            if (t.endsWith(T)) {
              const e = d[n++],
                i = o.getAttribute(t).split(k),
                a = /([.?@])?(.*)/.exec(e);
              (s.push({
                type: 1,
                index: r,
                name: a[2],
                strings: i,
                ctor: '.' === a[1] ? et : '?' === a[1] ? it : '@' === a[1] ? ot : tt,
              }),
                o.removeAttribute(t));
            } else t.startsWith(k) && (s.push({ type: 6, index: r }), o.removeAttribute(t));
        if (H.test(o.tagName)) {
          const t = o.textContent.split(k),
            e = t.length - 1;
          if (e > 0) {
            o.textContent = A ? A.emptyScript : '';
            for (let i = 0; i < e; i++)
              (o.append(t[i], D()), Q.nextNode(), s.push({ type: 2, index: ++r }));
            o.append(t[e], D());
          }
        }
      } else if (8 === o.nodeType)
        if (o.data === S) s.push({ type: 2, index: r });
        else {
          let t = -1;
          for (; -1 !== (t = o.data.indexOf(k, t + 1)); )
            (s.push({ type: 7, index: r }), (t += k.length - 1));
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement('template');
    return ((i.innerHTML = t), i);
  }
}
function Z(t, e, i = t, o) {
  if (e === j) return e;
  let r = void 0 !== o ? i._$Co?.[o] : i._$Cl;
  const n = L(e) ? void 0 : e._$litDirective$;
  return (
    r?.constructor !== n &&
      (r?._$AO?.(!1),
      void 0 === n ? (r = void 0) : ((r = new n(t)), r._$AT(t, i, o)),
      void 0 !== o ? ((i._$Co ??= [])[o] = r) : (i._$Cl = r)),
    void 0 !== r && (e = Z(t, r._$AS(t, e.values), r, o)),
    e
  );
}
class G {
  constructor(t, e) {
    ((this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e));
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: e },
        parts: i,
      } = this._$AD,
      o = (t?.creationScope ?? C).importNode(e, !0);
    Q.currentNode = o;
    let r = Q.nextNode(),
      n = 0,
      a = 0,
      s = i[0];
    for (; void 0 !== s; ) {
      if (n === s.index) {
        let e;
        (2 === s.type
          ? (e = new K(r, r.nextSibling, this, t))
          : 1 === s.type
            ? (e = new s.ctor(r, s.name, s.strings, this, t))
            : 6 === s.type && (e = new rt(r, this, t)),
          this._$AV.push(e),
          (s = i[++a]));
      }
      n !== s?.index && ((r = Q.nextNode()), n++);
    }
    return ((Q.currentNode = C), o);
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      (void 0 !== i &&
        (void 0 !== i.strings ? (i._$AI(t, i, e), (e += i.strings.length - 2)) : i._$AI(t[e])),
        e++);
  }
}
class K {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    ((this.type = 2),
      (this._$AH = V),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = o),
      (this._$Cv = o?.isConnected ?? !0));
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return (void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t);
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    ((t = Z(this, t, e)),
      L(t)
        ? t === V || null == t || '' === t
          ? (this._$AH !== V && this._$AR(), (this._$AH = V))
          : t !== this._$AH && t !== j && this._(t)
        : void 0 !== t._$litType$
          ? this.$(t)
          : void 0 !== t.nodeType
            ? this.T(t)
            : ((t) => R(t) || 'function' == typeof t?.[Symbol.iterator])(t)
              ? this.k(t)
              : this._(t));
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  _(t) {
    (this._$AH !== V && L(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(C.createTextNode(t)),
      (this._$AH = t));
  }
  $(t) {
    const { values: e, _$litType$: i } = t,
      o =
        'number' == typeof i
          ? this._$AC(t)
          : (void 0 === i.el && (i.el = J.createElement(X(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const t = new G(o, this),
        i = t.u(this.options);
      (t.p(e), this.T(i), (this._$AH = t));
    }
  }
  _$AC(t) {
    let e = Y.get(t.strings);
    return (void 0 === e && Y.set(t.strings, (e = new J(t))), e);
  }
  k(t) {
    R(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      o = 0;
    for (const r of t)
      (o === e.length
        ? e.push((i = new K(this.O(D()), this.O(D()), this, this.options)))
        : (i = e[o]),
        i._$AI(r),
        o++);
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), (e.length = o));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const e = E(t).nextSibling;
      (E(t).remove(), (t = e));
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
  }
}
class tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, r) {
    ((this.type = 1),
      (this._$AH = V),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = o),
      (this.options = r),
      i.length > 2 || '' !== i[0] || '' !== i[1]
        ? ((this._$AH = Array(i.length - 1).fill(new String())), (this.strings = i))
        : (this._$AH = V));
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (void 0 === r)
      ((t = Z(this, t, e, 0)), (n = !L(t) || (t !== this._$AH && t !== j)), n && (this._$AH = t));
    else {
      const o = t;
      let a, s;
      for (t = r[0], a = 0; a < r.length - 1; a++)
        ((s = Z(this, o[i + a], e, a)),
          s === j && (s = this._$AH[a]),
          (n ||= !L(s) || s !== this._$AH[a]),
          s === V ? (t = V) : t !== V && (t += (s ?? '') + r[a + 1]),
          (this._$AH[a] = s));
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === V
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '');
  }
}
class et extends tt {
  constructor() {
    (super(...arguments), (this.type = 3));
  }
  j(t) {
    this.element[this.name] = t === V ? void 0 : t;
  }
}
class it extends tt {
  constructor() {
    (super(...arguments), (this.type = 4));
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== V);
  }
}
class ot extends tt {
  constructor(t, e, i, o, r) {
    (super(t, e, i, o, r), (this.type = 5));
  }
  _$AI(t, e = this) {
    if ((t = Z(this, t, e, 0) ?? V) === j) return;
    const i = this._$AH,
      o =
        (t === V && i !== V) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      r = t !== V && (i === V || o);
    (o && this.element.removeEventListener(this.name, this, i),
      r && this.element.addEventListener(this.name, this, t),
      (this._$AH = t));
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class rt {
  constructor(t, e, i) {
    ((this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i));
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Z(this, t);
  }
}
const nt = w.litHtmlPolyfillSupport;
(nt?.(J, K), (w.litHtmlVersions ??= []).push('3.3.2'));
const at = globalThis;
class st extends $ {
  constructor() {
    (super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0));
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return ((this.renderOptions.renderBefore ??= t.firstChild), t);
  }
  update(t) {
    const e = this.render();
    (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, e, i) => {
        const o = i?.renderBefore ?? e;
        let r = o._$litPart$;
        if (void 0 === r) {
          const t = i?.renderBefore ?? null;
          o._$litPart$ = r = new K(e.insertBefore(D(), t), t, void 0, i ?? {});
        }
        return (r._$AI(t), r);
      })(e, this.renderRoot, this.renderOptions)));
  }
  connectedCallback() {
    (super.connectedCallback(), this._$Do?.setConnected(!0));
  }
  disconnectedCallback() {
    (super.disconnectedCallback(), this._$Do?.setConnected(!1));
  }
  render() {
    return j;
  }
}
((st._$litElement$ = !0), (st.finalized = !0), at.litElementHydrateSupport?.({ LitElement: st }));
const lt = at.litElementPolyfillSupport;
(lt?.({ LitElement: st }), (at.litElementVersions ??= []).push('4.2.2'));
const dt = 'simple_inventory',
  ct = 'add_item',
  pt = 'decrement_item',
  ht = 'increment_item',
  ut = 'remove_item',
  mt = 'update_item',
  gt = 'amount',
  yt = 'auto_add_enabled',
  ft = 'auto_add_id_to_description_enabled',
  vt = 'auto_add_to_list_quantity',
  bt = 'category',
  xt = 'description',
  _t = 'expiry_alert_days',
  $t = 'expiry_date',
  wt = 'inventory_id',
  Et = 'location',
  At = 'name',
  It = 'old_name',
  Tt = 'quantity',
  kt = 'todo_list',
  St = 'unit',
  zt = 'add-modal',
  Ct = 'edit-modal',
  Dt = 'auto-add-enabled',
  Lt = 'auto-add-id-to-description-enabled',
  Rt = 'auto-add-to-list-quantity',
  Mt = 'category',
  Nt = 'description',
  Ot = 'expiry-alert-days',
  qt = 'expiry-date',
  Ft = 'location',
  Ut = 'name',
  Pt = 'quantity',
  Ht = 'todo-list',
  Bt = 'unit',
  jt = 'add-item-btn',
  Vt = 'open-add-modal',
  Yt = 'active-filters',
  Qt = 'active-filters-list',
  Wt = 'advanced-search-toggle',
  Xt = 'clear-filters',
  Jt = 'filter-category',
  Zt = 'filter-expiry',
  Gt = 'filter-location',
  Kt = 'filter-quantity',
  te = 'search-input',
  ee = 'sort-method',
  ie = 'cancel-btn',
  oe = 'category-group',
  re = 'category-header',
  ne = 'close-btn',
  ae = 'location-group',
  se = 'location-header',
  le = 'modal-content',
  de = 'save-btn',
  ce = 'show',
  pe = 'close_add_modal',
  he = 'decrement',
  ue = 'increment',
  me = 'item_click',
  ge = 'open_edit',
  ye = 'remove',
  fe = 'simple_inventory_item_click',
  ve = {
    AUTO_ADD_ENABLED: !1,
    AUTO_ADD_ID_TO_DESCRIPTION_ENABLED: !1,
    AUTO_ADD_TO_LIST_QUANTITY: 0,
    CATEGORY: '',
    DESCRIPTION: '',
    EXPIRY_ALERT_DAYS: 1,
    EXPIRY_DATE: '',
    LOCATION: '',
    QUANTITY: 1,
    SORT_METHOD: 'name',
    TODO_LIST: '',
    UNIT: '',
  },
  be = 'category',
  xe = 'expiry',
  _e = 'location',
  $e = 'name',
  we = 'quantity',
  Ee = 'quantity-low',
  Ae = 'zero-last',
  Ie = { ZERO: 'zero', NONZERO: 'nonzero' },
  Te = { NONE: 'none', EXPIRED: 'expired', SOON: 'soon', FUTURE: 'future' },
  ke = (t) => `simple_inventory_filters_${t}`,
  Se = 100,
  ze = 'Inventory',
  Ce = {
    getInventoryName(t, e) {
      if (t?.attributes?.friendly_name?.trim()) return t.attributes.friendly_name;
      const i = e.split('.');
      if (i.length > 1) {
        const t = i.at(-1),
          e = t
            ?.split('_')
            .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
            .filter((t) => 'inventory' !== t.toLowerCase()),
          o = e?.join(' ').trim();
        return o || ze;
      }
      return ze;
    },
    getInventoryDescription(t) {
      if (t?.attributes?.description) return t.attributes.description;
    },
    getInventoryId(t, e) {
      const i = t.states[e];
      if (i?.attributes?.inventory_id) return i.attributes.inventory_id;
      if (i?.attributes?.unique_id) {
        const t = i.attributes.unique_id;
        if ('string' == typeof t && t.startsWith('inventory_')) return t.slice(10);
      }
      const o = e.split('.');
      return o.length > 1 ? o[1] : e;
    },
    preserveInputValues(t, e) {
      const i = {};
      for (const o of e) {
        const e = t.getElementById(o);
        e &&
          ('checkbox' === e.type
            ? (i[o] = e.checked)
            : 'number' === e.type
              ? (i[o] = Number.parseFloat(e.value) || 0)
              : (i[o] = e.value));
      }
      return i;
    },
    restoreInputValues(t, e) {
      if (e)
        for (const [i, o] of Object.entries(e)) {
          const e = t.getElementById(i);
          e && ('checkbox' === e.type ? (e.checked = Boolean(o)) : (e.value = String(o)));
        }
    },
    formatDate(t) {
      if (!t) return '';
      try {
        let e;
        if (/^\d+$/.test(t.trim())) e = new Date(Number.parseInt(t.trim()));
        else if (/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) {
          const [i, o, r] = t.trim().split('-').map(Number);
          e = new Date(i, o - 1, r);
        } else e = new Date(t);
        return Number.isNaN(e.getTime()) ? t : e.toLocaleDateString('en-US', { timeZone: 'UTC' });
      } catch (e) {
        return (console.warn(`Error formatting date "${t}":`, e), t);
      }
    },
    isExpired(t) {
      if (!t) return !1;
      try {
        const e = new Date(t);
        if (Number.isNaN(e.getTime())) return !1;
        const i = /* @__PURE__ */ new Date(),
          o = e.toISOString().split('T')[0];
        return o < i.toISOString().split('T')[0];
      } catch {
        return !1;
      }
    },
    isExpiringSoon(t, e = 7) {
      if (!t) return !1;
      try {
        const i = /* @__PURE__ */ new Date();
        i.setHours(0, 0, 0, 0);
        const o = new Date(t).getTime() - i.getTime(),
          r = Math.ceil(o / 864e5);
        return r >= 0 && r <= e;
      } catch {
        return !1;
      }
    },
    debounce(t, e) {
      let i;
      return function (...o) {
        (i && clearTimeout(i),
          (i = setTimeout(() => {
            (i && (clearTimeout(i), (i = void 0)), t(...o));
          }, e)));
      };
    },
    validateRawFormData(t) {
      const e = [];
      if (
        (t.name?.trim() || e.push({ field: 'name', message: 'Item name is required' }),
        t.quantity?.trim())
      ) {
        const i = Number.parseFloat(t.quantity);
        Number.isNaN(i)
          ? e.push({ field: 'quantity', message: 'Quantity must be a valid number' })
          : i < 0 && e.push({ field: 'quantity', message: 'Quantity cannot be negative' });
      }
      if (t.autoAddEnabled) {
        if (t.autoAddToListQuantity?.trim()) {
          const i = Number.parseFloat(t.autoAddToListQuantity);
          Number.isNaN(i)
            ? e.push({
                field: 'autoAddToListQuantity',
                message: 'Quantity threshold must be a valid number',
              })
            : i < 0 &&
              e.push({ field: 'autoAddToListQuantity', message: 'Quantity cannot be negative' });
        } else
          e.push({
            field: 'autoAddToListQuantity',
            message: 'Quantity threshold is required when auto-add is enabled',
          });
        t.todoList?.trim() ||
          e.push({
            field: 'todoList',
            message: 'Todo list selection is required when auto-add is enabled',
          });
      }
      if (
        (t.expiryDate?.trim() &&
          !this.isValidDate(t.expiryDate) &&
          e.push({ field: 'expiryDate', message: 'Invalid expiry date format' }),
        t.expiryAlertDays?.trim())
      ) {
        const i = Number.parseFloat(t.expiryAlertDays);
        Number.isNaN(i)
          ? e.push({
              field: 'expiryAlertDays',
              message: 'Expiry alert days must be a valid number',
            })
          : i < 0 &&
            e.push({ field: 'expiryAlertDays', message: 'Expiry alert days cannot be negative' });
      }
      const i = t.expiryDate?.trim(),
        o = t.expiryAlertDays?.trim();
      return (
        o &&
          !i &&
          e.push({
            field: 'expiryAlertDays',
            message: 'Expiry threshold requires an expiry date to be set',
          }),
        { isValid: 0 === e.length, errors: e }
      );
    },
    convertRawFormDataToItemData: (t) => ({
      name: t.name?.trim() || '',
      quantity: Math.max(0, Ce.parseNumber(t.quantity, ve.QUANTITY)),
      autoAddEnabled: Boolean(t.autoAddEnabled),
      autoAddIdToDescriptionEnabled: Boolean(t.autoAddIdToDescriptionEnabled),
      autoAddToListQuantity: Math.max(
        0,
        Ce.parseNumber(t.autoAddToListQuantity, ve.AUTO_ADD_TO_LIST_QUANTITY),
      ),
      todoList: t.todoList?.trim() || ve.TODO_LIST,
      expiryDate: t.expiryDate?.trim() || ve.EXPIRY_DATE,
      expiryAlertDays: Math.max(0, Ce.parseNumber(t.expiryAlertDays, ve.EXPIRY_ALERT_DAYS)),
      category: t.category?.trim() || ve.CATEGORY,
      location: t.location?.trim() || ve.LOCATION,
      unit: t.unit?.trim() || ve.UNIT,
      description: t.description?.trim() || ve.DESCRIPTION,
    }),
    parseNumber: (t, e) => {
      if (('string' == typeof t && !t?.trim()) || void 0 === t) return e;
      const i = Number('string' == typeof t ? t.trim() : t);
      return Number.isNaN(i) || !Number.isFinite(i) ? e : i;
    },
    isValidDate(t) {
      try {
        const e = new Date(t);
        return !Number.isNaN(e.getTime());
      } catch {
        return !1;
      }
    },
    sanitizeHtml(t) {
      const e = document.createElement('div');
      return ((e.textContent = t), e.innerHTML);
    },
    groupItemsByCategory: (t) =>
      t.reduce((t, e) => {
        const i = e.category || 'Uncategorized';
        return (t[i] || (t[i] = []), t[i].push(e), t);
      }, {}),
    groupItemsByLocation: (t) =>
      t.reduce((t, e) => {
        const i = e.location || 'No Location';
        return (t[i] || (t[i] = []), t[i].push(e), t);
      }, {}),
    sanitizeItemData(t) {
      return {
        autoAddEnabled: Boolean(t.autoAddEnabled),
        autoAddIdToDescriptionEnabled: Boolean(t.autoAddIdToDescriptionEnabled),
        autoAddToListQuantity: Math.max(
          0,
          Ce.parseNumber(t.autoAddToListQuantity, ve.AUTO_ADD_TO_LIST_QUANTITY),
        ),
        category: this.sanitizeString(t.category, 50),
        description: this.sanitizeString(t.description, 500),
        expiryAlertDays: Math.max(0, Ce.parseNumber(t.expiryAlertDays, ve.EXPIRY_ALERT_DAYS)),
        expiryDate: t.expiryDate || ve.EXPIRY_DATE,
        name: this.sanitizeString(t.name, 100),
        quantity: Math.max(0, Math.min(999999, Ce.parseNumber(t.quantity, ve.QUANTITY))),
        todoList: this.sanitizeString(t.todoList, 100),
        unit: this.sanitizeString(t.unit, 20),
        location: this.sanitizeString(t.location, 50),
      };
    },
    sanitizeString: (t, e) =>
      t && 'string' == typeof t ? t.trim().slice(0, Math.max(0, e)).trim() : '',
    hasActiveFilters: (t) =>
      Boolean(
        t.searchText ||
        (t.category && t.category.length > 0) ||
        (t.location && t.location.length > 0) ||
        (t.quantity && t.quantity.length > 0) ||
        (t.expiry && t.expiry.length > 0),
      ),
    validateInventoryItems: (t) =>
      Array.isArray(t)
        ? t.filter(
            (t) =>
              !(!t || 'object' != typeof t || !t.name || 'string' != typeof t.name) &&
              ((t.quantity =
                'number' == typeof t.quantity && !Number.isNaN(t.quantity) && t.quantity >= 0
                  ? t.quantity
                  : ve.QUANTITY),
              (t.unit = 'string' == typeof t.unit ? t.unit : ve.UNIT),
              (t.category = 'string' == typeof t.category ? t.category : ve.CATEGORY),
              (t.location = 'string' == typeof t.location ? t.location : ve.LOCATION),
              (t.expiry_date = 'string' == typeof t.expiry_date ? t.expiry_date : ve.EXPIRY_DATE),
              (t.expiry_alert_days =
                'number' == typeof t.expiry_alert_days &&
                !Number.isNaN(t.expiry_alert_days) &&
                t.expiry_alert_days >= 0
                  ? t.expiry_alert_days
                  : ve.EXPIRY_ALERT_DAYS),
              (t.todo_list = 'string' == typeof t.todo_list ? t.todo_list : ve.TODO_LIST),
              (t.auto_add_enabled = Boolean(t.auto_add_enabled)),
              (t.auto_add_to_list_quantity =
                'number' == typeof t.auto_add_to_list_quantity &&
                !Number.isNaN(t.auto_add_to_list_quantity) &&
                t.auto_add_to_list_quantity >= 0
                  ? t.auto_add_to_list_quantity
                  : ve.AUTO_ADD_TO_LIST_QUANTITY),
              (t.auto_add_id_to_description_enabled = Boolean(
                t.auto_add_id_to_description_enabled,
              )),
              (t.description = 'string' == typeof t.description ? t.description : ve.DESCRIPTION),
              !0),
          )
        : [],
    extractTodoLists: (t) =>
      Object.keys(t.states)
        .filter((t) => t.startsWith('todo.'))
        .map((e) => ({ id: e, name: t.states[e].attributes?.friendly_name || e.split('.')[1] })),
    findInventoryEntities: (t) =>
      Object.keys(t?.states || {})
        .filter((e) => {
          if (!e.startsWith('sensor.')) return !1;
          const i = e.includes('inventory'),
            o = void 0 !== t?.states[e]?.attributes?.items;
          return i && o;
        })
        .sort(),
    createEntityOptions: (t, e) =>
      e.map((e) => ({ value: e, label: t.states[e]?.attributes?.friendly_name || e })),
  };
class De {
  static _cache = /* @__PURE__ */ new Map();
  static _loadingPromises = /* @__PURE__ */ new Map();
  static _cardName = 'simple-inventory-card';
  static async loadTranslations(t) {
    const e = `${this._cardName}-${t}`;
    if (this._cache.has(e)) return this._cache.get(e);
    if (this._loadingPromises.has(e)) return this._loadingPromises.get(e);
    const i = this._loadTranslationsInternal(t);
    this._loadingPromises.set(e, i);
    try {
      const t = await i;
      return (this._cache.set(e, t), t);
    } finally {
      this._loadingPromises.delete(e);
    }
  }
  static async _loadTranslationsInternal(t) {
    const e = [
      `/local/community/${this._cardName}/translations/${t}.json`,
      `/hacsfiles/${this._cardName}/translations/${t}.json`,
      `/local/community/${this._cardName}/${t}.json`,
      `/hacsfiles/${this._cardName}/${t}.json`,
    ];
    for (const o of e)
      try {
        const t = await fetch(o);
        if (t.ok) {
          return await t.json();
        }
        console.debug('❌ Failed to load from', o, 'Status:', t.status);
      } catch (i) {
        console.debug(`Failed to load translations from ${o}:`, i);
      }
    return 'en' !== t ? this.loadTranslations('en') : {};
  }
  static localize(t, e, i, o) {
    const r = e.split('.');
    let n = t;
    for (const s of r) {
      if (!n || 'object' != typeof n || !(s in n)) return o || e;
      n = n[s];
    }
    let a = 'string' == typeof n ? n : o || e;
    return (
      i &&
        Object.entries(i).forEach(([t, e]) => {
          a = a.replace(new RegExp(`{${t}}`, 'g'), String(e));
        }),
      a
    );
  }
}
const Le = a`
  .card-config {
    padding: 16px;
  }

  .option {
    margin-bottom: 16px;
  }

  .row {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }

  .col {
    flex: 1;
    margin-right: 15px;
  }

  .col:last-child {
    margin-right: 0;
  }

  ha-entity-picker {
    width: 100%;
  }

  ha-textfield,
  ha-textarea {
    width: 100%;
  }

  .section-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: var(--primary-text-color);
  }

  .entity-info {
    background: var(--secondary-background-color);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
  }

  .info-header {
    font-weight: bold;
    margin-bottom: 8px;
    color: var(--primary-color);
  }

  .info-content {
    color: var(--primary-text-color);
  }

  .no-entity {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: var(--warning-color);
    color: white;
    border-radius: 8px;
    margin-top: 16px;
  }
`;
class Re extends st {
  hass;
  _config;
  _translations = {};
  constructor() {
    (super(), (this._config = { entity: '', type: '' }));
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object } };
  }
  async firstUpdated() {
    await this._loadTranslations();
  }
  async updated(t) {
    if (t.has('hass') && this.hass) {
      const e = t.get('hass');
      (e &&
        e.language === this.hass.language &&
        e.selectedLanguage === this.hass.selectedLanguage) ||
        (await this._loadTranslations());
    }
  }
  async _loadTranslations() {
    const t = this.hass?.language || this.hass?.selectedLanguage || 'en';
    try {
      ((this._translations = await De.loadTranslations(t)), this.requestUpdate());
    } catch (e) {
      (console.warn('Failed to load translations:', e), (this._translations = {}));
    }
  }
  setConfig(t) {
    this._config = { ...t };
  }
  get _entity() {
    return this._config?.entity || '';
  }
  render() {
    if (!this.hass || !this._config)
      return B`<div>
        ${De.localize(this._translations, 'common.loading', void 0, 'Loading...')}
      </div>`;
    const t = Ce.findInventoryEntities(this.hass),
      e = Ce.createEntityOptions(this.hass, t);
    return (
      !this._config.entity &&
        t.length > 0 &&
        (this._config.type || (this._config.type = 'custom:simple-inventory-card'),
        (this._config.entity = t[0]),
        this.dispatchEvent(
          new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: !0,
            composed: !0,
          }),
        )),
      B`
      <div class="card-config">
        ${(function (t, e, i, o, r) {
          return B`
    <div class="option">
      <div class="row">
        <div class="col">
          <ha-combo-box
            .hass=${t}
            .label=${De.localize(r, 'config.inventory_entity_required', void 0, 'Inventory Entity (Required)')}
            .items=${e}
            .value=${i}
            @value-changed=${o}
          ></ha-combo-box>
        </div>
      </div>
    </div>
  `;
        })(this.hass, e, this._entity, this._valueChanged.bind(this), this._translations)}
        ${
          ((i = this._config?.item_click_action?.service || ''),
          (o = this._stringifyJson(this._config?.item_click_action?.target)),
          (r = this._stringifyJson(this._config?.item_click_action?.data)),
          (n = this._actionValueChanged.bind(this)),
          (a = this._translations),
          B`
    <div class="option">
      <div class="section-title">
        ${De.localize(a, 'config.item_click_action', void 0, 'Item click action (optional)')}
      </div>
      <div class="row">
        <div class="col">
          <ha-textfield
            .label=${De.localize(a, 'config.item_click_service', void 0, 'Service (domain.service)')}
            .value=${i}
            data-field="item_click_service"
            @change=${n}
          ></ha-textfield>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ha-textarea
            .label=${De.localize(a, 'config.item_click_target', void 0, 'Target JSON (optional)')}
            .value=${o}
            placeholder='{"entity_id":"automation.example"}'
            data-field="item_click_target"
            @change=${n}
          ></ha-textarea>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ha-textarea
            .label=${De.localize(a, 'config.item_click_data', void 0, 'Data JSON (optional, supports {{location}}, {{name}}, {{quantity}})')}
            .value=${r}
            placeholder='{"variables":{"location":"{{location}}","name":"{{name}}"}}'
            data-field="item_click_data"
            @change=${n}
          ></ha-textarea>
        </div>
      </div>
    </div>
  `)
        }
        ${
          this._entity
            ? (function (t, e, i) {
                const o = t.states[e],
                  r = o?.attributes?.friendly_name || e,
                  n = o?.attributes?.items?.length || 0;
                return B`
    <div class="entity-info">
      <div class="info-header">
        ${De.localize(i, 'config.selected_inventory', void 0, 'Selected Inventory:')}
      </div>
      <div class="info-content">
        <strong>${r}</strong>
        <br />
        <small>${e}</small>
        <br />
        <small>
          ${De.localize(i, 'config.items_count', void 0, 'Items')}:
          ${n}
        </small>
      </div>
    </div>
  `;
              })(this.hass, this._entity, this._translations)
            : (function (t) {
                return B`
    <div class="no-entity">
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <div>
        ${De.localize(t, 'config.select_entity_message', void 0, 'Please select an inventory entity above')}
      </div>
    </div>
  `;
              })(this._translations)
        }
      </div>
    `
    );
    var i, o, r, n, a;
  }
  _valueChanged(t) {
    if (!this._config) return;
    const e = t.detail?.value;
    if (this._entity === e) return;
    const i = {
      ...this._config,
      entity: e,
      type: this._config.type || 'custom:simple-inventory-card',
    };
    ((this._config = i),
      this.requestUpdate(),
      this.dispatchEvent(
        new CustomEvent('config-changed', { detail: { config: i }, bubbles: !0, composed: !0 }),
      ));
  }
  _actionValueChanged(t) {
    if (!this._config) return;
    const e = t.target,
      i = e?.dataset?.field;
    if (!i) return;
    const o = e.value ?? '',
      r = { ...(this._config.item_click_action || {}) };
    if (
      ('item_click_service' === i && (o.trim() ? (r.service = o.trim()) : delete r.service),
      'item_click_target' === i)
    ) {
      const t = this._parseJsonInput(o);
      if (void 0 === t) return;
      t ? (r.target = t) : delete r.target;
    }
    if ('item_click_data' === i) {
      const t = this._parseJsonInput(o);
      if (void 0 === t) return;
      t ? (r.data = t) : delete r.data;
    }
    const n = (r.service && r.service.trim()) || r.target || r.data,
      a = {
        ...this._config,
        ...(n ? { item_click_action: r } : {}),
        type: this._config.type || 'custom:simple-inventory-card',
      };
    ((this._config = a),
      this.requestUpdate(),
      this.dispatchEvent(
        new CustomEvent('config-changed', { detail: { config: a }, bubbles: !0, composed: !0 }),
      ));
  }
  _parseJsonInput(t) {
    const e = t.trim();
    if (!e) return null;
    try {
      return JSON.parse(e);
    } catch (i) {
      return (
        console.warn('Invalid JSON in item click action field:', i),
        void alert('Invalid JSON. Please correct it before saving.')
      );
    }
  }
  _stringifyJson(t) {
    return t ? JSON.stringify(t, null, 2) : '';
  }
  static get styles() {
    return Le;
  }
}
class Me {
  hass;
  constructor(t) {
    this.hass = t;
  }
  async addItem(t, e) {
    try {
      const i = Ce.sanitizeItemData(e),
        o = Ce.sanitizeString(t, 100);
      return o
        ? i.name
          ? (await this.hass.callService(dt, ct, {
              [yt]: i.autoAddEnabled,
              [ft]: i.autoAddIdToDescriptionEnabled,
              [vt]: i.autoAddToListQuantity,
              [bt]: i.category,
              [xt]: i.description,
              [_t]: i.expiryAlertDays,
              [$t]: i.expiryDate,
              [wt]: o,
              [Et]: i.location,
              [At]: i.name,
              [Tt]: i.quantity,
              [kt]: i.todoList,
              [St]: i.unit,
            }),
            { success: !0 })
          : { success: !1, error: 'Item name cannot be empty' }
        : { success: !1, error: 'Invalid inventory ID' };
    } catch (i) {
      return (
        console.error('Error adding item:', i),
        { success: !1, error: i instanceof Error ? i.message : String(i) }
      );
    }
  }
  async removeItem(t, e) {
    try {
      return (await this.hass.callService(dt, ut, { [wt]: t, [At]: e }), { success: !0 });
    } catch (i) {
      return (
        console.error('Error removing item:', i),
        { success: !1, error: i instanceof Error ? i.message : String(i) }
      );
    }
  }
  async incrementItem(t, e, i = 1) {
    try {
      return (await this.hass.callService(dt, ht, { [wt]: t, [At]: e, [gt]: i }), { success: !0 });
    } catch (o) {
      return (
        console.error('Error incrementing item:', o),
        { success: !1, error: o instanceof Error ? o.message : String(o) }
      );
    }
  }
  async decrementItem(t, e, i = 1) {
    try {
      return (await this.hass.callService(dt, pt, { [wt]: t, [At]: e, [gt]: i }), { success: !0 });
    } catch (o) {
      return (
        console.error('Error decrementing item:', o),
        { success: !1, error: o instanceof Error ? o.message : String(o) }
      );
    }
  }
  async updateItem(t, e, i) {
    try {
      const o = Ce.sanitizeItemData(i),
        r = Ce.sanitizeString(t, 100);
      if (!r) return { success: !1, error: 'Invalid inventory ID' };
      const n = {
        [yt]: o.autoAddEnabled,
        [ft]: o.autoAddIdToDescriptionEnabled,
        [vt]: o.autoAddToListQuantity,
        [bt]: o.category,
        [xt]: o.description,
        [_t]: o.expiryAlertDays,
        [$t]: o.expiryDate,
        [wt]: r,
        [Et]: o.location,
        [At]: o.name,
        [It]: e,
        [Tt]: o.quantity,
        [kt]: o.todoList,
        [St]: o.unit,
      };
      return (await this.hass.callService(dt, mt, n), { success: !0 });
    } catch (o) {
      return (
        console.error('Error updating item:', o),
        { success: !1, error: o instanceof Error ? o.message : String(o) }
      );
    }
  }
  async fireItemClickEvent(t, e, i, o) {
    try {
      const r = {
        inventory_id: Ce.sanitizeString(t, 100),
        entity_id: Ce.sanitizeString(e, 255),
        name: Ce.sanitizeString(i, 100),
        location: Ce.sanitizeString(o?.location ?? '', 50),
        category: Ce.sanitizeString(o?.category ?? '', 50),
        quantity: o?.quantity ?? 0,
        unit: Ce.sanitizeString(o?.unit ?? '', 20),
      };
      return (
        await this.hass.callWS({ type: 'fire_event', event_type: fe, event_data: r }),
        { success: !0 }
      );
    } catch (r) {
      return (
        console.error('Error firing item click event:', r),
        { success: !1, error: r instanceof Error ? r.message : String(r) }
      );
    }
  }
  async callItemClickAction(t, e) {
    try {
      const i = Ce.sanitizeString(t.service, 255);
      if (!i || !i.includes('.'))
        return { success: !1, error: 'Invalid service name for item click action' };
      const [o, r] = i.split('.', 2),
        n = this.interpolateTemplateValues(t.data, e),
        a = this.interpolateTemplateValues(t.target, e);
      return (await this.hass.callService(o, r, n, a), { success: !0 });
    } catch (i) {
      return (
        console.error('Error calling item click action:', i),
        { success: !1, error: i instanceof Error ? i.message : String(i) }
      );
    }
  }
  interpolateTemplateValues(t, e) {
    if ('string' == typeof t) {
      const i = t.match(/^{{\s*([a-z0-9_]+)\s*}}$/i);
      if (i) {
        const t = e[i[1]];
        return null == t ? '' : t;
      }
      return t.replace(/{{\s*([a-z0-9_]+)\s*}}/gi, (t, i) => {
        const o = e[i];
        return null == o ? '' : String(o);
      });
    }
    if (Array.isArray(t)) return t.map((t) => this.interpolateTemplateValues(t, e));
    if (t && 'object' == typeof t) {
      const i = {};
      return (
        Object.entries(t).forEach(([t, o]) => {
          i[t] = this.interpolateTemplateValues(o, e);
        }),
        i
      );
    }
    return t;
  }
}
class Ne {
  constructor(t) {
    this.shadowRoot = t;
  }
  getRawAddModalData() {
    return {
      autoAddEnabled: this.getInputChecked(`add-${Dt}`),
      autoAddIdToDescriptionEnabled: this.getInputChecked(`add-${Lt}`),
      autoAddToListQuantity: this.getInputValue(`add-${Rt}`),
      category: this.getInputValue(`add-${Mt}`),
      description: this.getInputValue(`add-${Nt}`),
      expiryAlertDays: this.getInputValue(`add-${Ot}`),
      expiryDate: this.getInputValue(`add-${qt}`),
      location: this.getInputValue(`add-${Ft}`),
      name: this.getInputValue(`add-${Ut}`),
      quantity: this.getInputValue(`add-${Pt}`),
      todoList: this.getInputValue(`add-${Ht}`),
      unit: this.getInputValue(`add-${Bt}`),
    };
  }
  getRawEditModalData() {
    return {
      autoAddEnabled: this.getInputChecked(`edit-${Dt}`),
      autoAddIdToDescriptionEnabled: this.getInputChecked(`edit-${Lt}`),
      autoAddToListQuantity: this.getInputValue(`edit-${Rt}`),
      category: this.getInputValue(`edit-${Mt}`),
      description: this.getInputValue(`edit-${Nt}`),
      expiryAlertDays: this.getInputValue(`edit-${Ot}`),
      expiryDate: this.getInputValue(`edit-${qt}`),
      location: this.getInputValue(`edit-${Ft}`),
      name: this.getInputValue(`edit-${Ut}`),
      quantity: this.getInputValue(`edit-${Pt}`),
      todoList: this.getInputValue(`edit-${Ht}`),
      unit: this.getInputValue(`edit-${Bt}`),
    };
  }
  populateEditModal(t) {
    const e = [
      {
        id: `edit-${Rt}`,
        value: (t.auto_add_to_list_quantity ?? ve.AUTO_ADD_TO_LIST_QUANTITY).toString(),
      },
      { id: `edit-${Mt}`, value: t.category ?? ve.CATEGORY },
      { id: `edit-${Nt}`, value: t.description ?? ve.DESCRIPTION },
      { id: `edit-${Ot}`, value: (t.expiry_alert_days ?? ve.EXPIRY_ALERT_DAYS).toString() },
      { id: `edit-${qt}`, value: t.expiry_date ?? ve.EXPIRY_DATE },
      { id: `edit-${Ft}`, value: t.location ?? ve.LOCATION },
      { id: `edit-${Ut}`, value: t.name ?? '' },
      { id: `edit-${Pt}`, value: (t.quantity ?? ve.QUANTITY).toString() },
      { id: `edit-${Ht}`, value: t.todo_list ?? ve.TODO_LIST },
      { id: `edit-${Bt}`, value: t.unit ?? ve.UNIT },
    ];
    this.setFormValues(e);
    const i = this.getElement(`edit-${Dt}`),
      o = this.getElement(`edit-${Lt}`);
    (i && (i.checked = t.auto_add_enabled ?? !1),
      o && (o.checked = t.auto_add_id_to_description_enabled ?? !1));
  }
  clearAddModalForm() {
    const t = [
      { id: `add-${Rt}`, value: ve.AUTO_ADD_TO_LIST_QUANTITY.toString() },
      { id: `add-${Mt}`, value: ve.CATEGORY },
      { id: `add-${Nt}`, value: ve.DESCRIPTION },
      { id: `add-${Ot}`, value: ve.EXPIRY_ALERT_DAYS.toString() },
      { id: `add-${qt}`, value: ve.EXPIRY_DATE },
      { id: `add-${Ft}`, value: ve.LOCATION },
      { id: `add-${Ut}`, value: '' },
      { id: `add-${Pt}`, value: ve.QUANTITY.toString() },
      { id: `add-${Ht}`, value: ve.TODO_LIST },
      { id: `add-${Bt}`, value: ve.UNIT },
    ];
    this.setFormValues(t);
    const e = this.getElement(`add-${Dt}`),
      i = this.getElement(`add-${Lt}`);
    (e && (e.checked = ve.AUTO_ADD_ENABLED),
      i && (i.checked = ve.AUTO_ADD_ID_TO_DESCRIPTION_ENABLED));
  }
  setFormValues(t) {
    for (const { id: e, value: i } of t) {
      const t = this.getElement(e);
      t && (t.value = i);
    }
  }
  getInputValue(t) {
    const e = this.getElement(t);
    return e?.value?.trim() ?? '';
  }
  getInputChecked(t) {
    const e = this.getElement(t);
    return e?.checked ?? !1;
  }
  getElement(t) {
    return this.shadowRoot.getElementById(t);
  }
}
class Oe {
  constructor(t, e, i) {
    ((this.shadowRoot = t),
      (this.formManager = e),
      (this.validationManager = i),
      this.setupEventListeners());
  }
  boundEscHandler = void 0;
  openAddModal(t) {
    const e = this.getElement(zt);
    e
      ? (this.validationManager.clearError(!0),
        e.classList.add(ce),
        this.focusElementWithDelay(Ut),
        this.setupExpiryThresholdInteraction(t),
        this.validationManager.setupValidationListeners())
      : console.warn('Add modal not found in DOM');
  }
  closeAddModal() {
    const t = this.getElement(zt);
    t && t.classList.remove(ce);
  }
  openEditModal(t, e, i) {
    const { hass: o, config: r } = e(),
      n = r.entity,
      a = o.states[n];
    if (!a) return (console.warn(`Entity not found: ${n}`), { item: void 0, found: !1 });
    const s = (a.attributes?.items || []).find((e) => e.name === t);
    if (!s) return (console.warn(`Item not found: ${t}`), { item: void 0, found: !1 });
    this.formManager.populateEditModal(s);
    const l = this.getElement(Ct);
    return (
      l &&
        (this.validationManager.clearError(!1),
        l.classList.add(ce),
        this.focusElementWithDelay(Ut, !0),
        this.setupExpiryThresholdInteraction(i),
        this.validationManager.setupValidationListeners()),
      { item: s, found: !0 }
    );
  }
  closeEditModal() {
    const t = this.getElement(Ct);
    t && t.classList.remove(ce);
  }
  closeAllModals() {
    (this.closeAddModal(), this.closeEditModal());
  }
  handleModalClick(t) {
    const e = t.target;
    return e.id === zt || e.id === Ct
      ? (t.preventDefault(),
        t.stopPropagation(),
        e.id === zt ? this.closeAddModal() : this.closeEditModal(),
        !0)
      : e.dataset.action === pe || (e.classList.contains(ne) && e.closest(`#${zt}`))
        ? (t.preventDefault(), t.stopPropagation(), this.closeAddModal(), !0)
        : e.classList.contains(ne) && e.closest(`#${Ct}`)
          ? (t.preventDefault(), t.stopPropagation(), this.closeEditModal(), !0)
          : (e.closest(`.${le}`), !1);
  }
  setupExpiryThresholdInteraction(t) {
    (this.setupExpiryThresholdFieldForModal(!0, t), this.setupExpiryThresholdFieldForModal(!1, t));
  }
  setupExpiryThresholdFieldForModal(t, e) {
    const i = t ? 'add' : 'edit',
      o = this.getElement(`${i}-${qt}`);
    o &&
      (this.updateExpiryThresholdState(t, e),
      o.addEventListener('input', () => {
        this.updateExpiryThresholdState(t, e);
      }),
      o.addEventListener('change', () => {
        this.updateExpiryThresholdState(t, e);
      }));
  }
  updateExpiryThresholdState(t, e) {
    const i = t ? 'add' : 'edit',
      o = this.getElement(`${i}-${qt}`),
      r = this.getElement(`${i}-${Ot}`);
    if (!o || !r) return;
    if ('' !== o.value.trim())
      ((r.disabled = !1),
        (r.placeholder = De.localize(
          e,
          'modal.expiry_threshold_placeholder',
          void 0,
          'Days before expiry to alert (default: 0)',
        )),
        r.value.trim() || (r.value = '0'));
    else {
      ((r.disabled = !0), (r.value = ''));
      const t = De.localize(e, 'modal.set_expiry_first', void 0, 'Set expiry date first');
      r.placeholder = t;
    }
  }
  setupEventListeners() {
    this.boundEscHandler ||
      ((this.boundEscHandler = this.handleEscapeKey.bind(this)),
      document.addEventListener('keydown', this.boundEscHandler));
  }
  handleEscapeKey(t) {
    'Escape' === t.key && this.closeAllModals();
  }
  focusElementWithDelay(t, e = !1) {
    setTimeout(() => {
      const i = this.getElement(t);
      i && (i.focus(), e && i.select && i.select());
    }, Se);
  }
  getElement(t) {
    return this.shadowRoot.getElementById(t);
  }
  destroy() {
    this.boundEscHandler &&
      (document.removeEventListener('keydown', this.boundEscHandler),
      (this.boundEscHandler = void 0));
  }
}
class qe {
  constructor(t) {
    this.shadowRoot = t;
  }
  highlightInvalidFields(t, e) {
    const i = e ? 'add' : 'edit';
    this.clearFieldErrors(e);
    for (const o of t) {
      let t = '';
      switch (o.field) {
        case 'name':
          t = `${i}-${Ut}`;
          break;
        case 'quantity':
          t = `${i}-${Pt}`;
          break;
        case 'autoAddToListQuantity':
          t = `${i}-${Rt}`;
          break;
        case 'todoList':
          t = `${i}-${Ht}`;
          break;
        case 'expiryDate':
          t = `${i}-${qt}`;
          break;
        case 'expiryAlertDays':
          t = `${i}-${Ot}`;
      }
      if (t) {
        const e = this.getElement(t);
        e && e.classList.add('input-error');
      }
    }
  }
  clearFieldErrors(t) {
    const e = t ? zt : Ct,
      i = this.getElement(e);
    if (i) for (const o of i.querySelectorAll('.input-error')) o.classList.remove('input-error');
  }
  showError(t, e = !0) {
    const i = e ? 'add' : 'edit',
      o = this.getElement(`${i}-validation-message`),
      r = o?.querySelector('.validation-text');
    if (o && r) {
      ((r.textContent = t), o.classList.add('show'));
      const i = o.closest('.modal-content');
      (i && (i.scrollTop = 0),
        setTimeout(() => {
          this.clearError(e);
        }, 5e3));
    } else console.error('Validation Error:', t);
  }
  clearError(t = !0) {
    const e = t ? 'add' : 'edit',
      i = this.getElement(`${e}-validation-message`);
    i && i.classList.remove('show');
  }
  setupValidationListeners() {
    (this.setupClearErrorsForModal(!0), this.setupClearErrorsForModal(!1));
  }
  setupClearErrorsForModal(t) {
    const e = t ? 'add' : 'edit',
      i = [
        this.getElement(`${e}-${Pt}`),
        this.getElement(`${e}-${Rt}`),
        this.getElement(`${e}-${Ht}`),
        this.getElement(`${e}-${Ut}`),
        this.getElement(`${e}-${qt}`),
      ],
      o = this.getElement(`${e}-${Dt}`),
      r = this.getElement(`${e}-${Rt}`),
      n = this.getElement(`${e}-${Ht}`);
    for (const a of i)
      if (a) {
        const e = () => {
          (a.classList.remove('input-error'), this.clearError(t));
        };
        (a.addEventListener('input', e), a.addEventListener('change', e));
      }
    o &&
      o.addEventListener('change', () => {
        o.checked ||
          (r?.classList.remove('input-error'),
          n?.classList.remove('input-error'),
          this.clearError(t));
      });
  }
  getElement(t) {
    return this.shadowRoot.getElementById(t);
  }
}
function Fe(t) {
  const e = t.shadowRoot || document,
    i = e.getElementById(t.id),
    o = e.getElementById(`${t.id}-dropdown`);
  if (!i || !o) return;
  let r = [...t.options],
    n = -1,
    a = !1;
  function s() {
    r.length > 0 && (o.style.display = 'block');
  }
  function l() {
    ((o.style.display = 'none'), (n = -1));
  }
  function d(e) {
    const a = e.toLowerCase();
    ((r = t.options.filter((t) => t.toLowerCase().includes(a))), (n = -1));
    const s = r
      .map(
        (t, e) =>
          `<div class="autocomplete-option ${e === n ? 'selected' : ''}" data-value="${t}">${t}</div>`,
      )
      .join('');
    ((o.innerHTML = s),
      o.querySelectorAll('.autocomplete-option').forEach((e) => {
        e.addEventListener('click', (o) => {
          (o.preventDefault(), o.stopPropagation());
          const r = e.getAttribute('data-value') || '';
          ((i.value = r), l(), t.onSelect?.(r));
        });
      }));
  }
  function c() {
    o.querySelectorAll('.autocomplete-option').forEach((t, e) => {
      t.classList.toggle('selected', e === n);
    });
  }
  (o.addEventListener('mouseenter', () => {
    a = !0;
  }),
    o.addEventListener('mouseleave', () => {
      a = !1;
    }),
    d(''),
    i.addEventListener('input', (t) => {
      (d(t.target.value), s());
    }),
    i.addEventListener('click', (t) => {
      (t.stopPropagation(), 'block' === o.style.display ? l() : (d(i.value), s()));
    }),
    i.addEventListener('blur', () => {
      setTimeout(() => {
        a || l();
      }, 100);
    }),
    i.addEventListener('keydown', (e) => {
      const a = 'block' === o.style.display;
      if (!a && ('ArrowDown' === e.key || 'ArrowUp' === e.key)) return (d(i.value), void s());
      if (a && 0 !== r.length)
        switch (e.key) {
          case 'ArrowDown':
            (e.preventDefault(), (n = Math.min(n + 1, r.length - 1)), c());
            break;
          case 'ArrowUp':
            (e.preventDefault(), (n = Math.max(n - 1, -1)), c());
            break;
          case 'Enter':
            (e.preventDefault(), n >= 0 && ((i.value = r[n]), t.onSelect?.(i.value)), l());
            break;
          case 'Escape':
            l();
        }
    }),
    l());
}
class Ue {
  constructor(t, e, i, o) {
    ((this.services = e),
      (this.getInventoryId = i),
      (this.onDataChanged = o),
      (this.formManager = new Ne(t)),
      (this.validationManager = new qe(t)),
      (this.uiManager = new Oe(t, this.formManager, this.validationManager)),
      (this.shadowRoot = t));
  }
  formManager;
  validationManager;
  uiManager;
  currentEditingItem = void 0;
  shadowRoot;
  openAddModal(t, e = [], i = []) {
    (this.uiManager.openAddModal(t), this.initializeAutoCompleteInputs('add', e, i));
  }
  closeAddModal() {
    this.uiManager.closeAddModal();
  }
  openEditModal(t, e, i, o = [], r = []) {
    this.uiManager.openEditModal(t, e, i).found &&
      ((this.currentEditingItem = t), this.initializeAutoCompleteInputs('edit', o, r));
  }
  closeEditModal() {
    (this.uiManager.closeEditModal(), (this.currentEditingItem = void 0));
  }
  closeAllModals() {
    (this.closeAddModal(), this.closeEditModal());
  }
  clearAddModalForm() {
    this.formManager.clearAddModalForm();
  }
  handleModalClick(t) {
    return this.uiManager.handleModalClick(t);
  }
  destroy() {
    this.uiManager.destroy();
  }
  async addItem(t) {
    try {
      this.validationManager.clearError(!0);
      const e = this.validateAndPrepareFormData(!0);
      if (!e) return !1;
      const i = await this.services.addItem(this.getInventoryId(t.entity), e);
      return this.handleAddResult(i);
    } catch (e) {
      return this.handleException(e, 'adding', !0);
    }
  }
  async saveEditModal(t) {
    if (!this.currentEditingItem) return !1;
    try {
      this.validationManager.clearError(!1);
      const e = this.validateAndPrepareFormData(!1);
      if (!e) return !1;
      const i = await this.services.updateItem(
        this.getInventoryId(t.entity),
        this.currentEditingItem,
        e,
      );
      return this.handleEditResult(i);
    } catch (e) {
      return this.handleException(e, 'updating', !1);
    }
  }
  validateAndPrepareFormData(t) {
    const e = t ? this.formManager.getRawAddModalData() : this.formManager.getRawEditModalData(),
      i = Ce.validateRawFormData(e);
    return i.isValid
      ? Ce.convertRawFormDataToItemData(e)
      : (this.validationManager.highlightInvalidFields(i.errors, t),
        void this.validationManager.showError(i.errors[0].message, t));
  }
  handleAddResult(t) {
    return t.success
      ? (this.clearAddModalForm(), this.triggerDataChanged(), !0)
      : (this.validationManager.showError(`Error adding item: ${t.error}`, !0), !1);
  }
  handleEditResult(t) {
    return t.success
      ? (this.triggerDataChanged(), !0)
      : (this.validationManager.showError(`Error updating item: ${t.error}`, !1), !1);
  }
  handleException(t, e, i) {
    return (
      console.error(`Error in ${e} item:`, t),
      this.validationManager.showError(`An error occurred while ${e} the item`, i),
      !1
    );
  }
  triggerDataChanged() {
    this.onDataChanged && this.onDataChanged();
  }
  initializeAutoCompleteInputs(t, e, i) {
    setTimeout(() => {
      (Fe({ id: `${t}-${Ft}`, options: e, shadowRoot: this.shadowRoot }),
        Fe({ id: `${t}-${Mt}`, options: i, shadowRoot: this.shadowRoot }));
    }, 0);
  }
}
function Pe(t, e) {
  const i = [];
  if (t.searchText) {
    const o = De.localize(e, 'active_filters.search', void 0, 'Search');
    i.push(`<span class="filter-badge search">\n        ${o}: "${t.searchText}"\n      </span>`);
  }
  const o = (t, o, r, n) => {
    if (t && t.length > 0) {
      const a = De.localize(e, o, void 0, n),
        s =
          t.length > 1
            ? `${a}: ${t.length} ${De.localize(e, 'active_filters.selected', void 0, 'selected')}`
            : `${a}: ${t[0]}`;
      i.push(`<span class="filter-badge ${r}">${s}</span>`);
    }
  };
  if (
    (o(t.category, 'active_filters.category', 'category', 'Category'),
    o(t.location, 'active_filters.location', 'location', 'Location'),
    o(t.quantity, 'active_filters.quantity', 'quantity', 'Quantity'),
    t.expiry && t.expiry.length > 0)
  ) {
    const o = De.localize(e, 'active_filters.expiry', void 0, 'Expiry');
    let r;
    if (t.expiry.length > 1)
      r = `${o}: ${t.expiry.length} ${De.localize(e, 'active_filters.selected', void 0, 'selected')}`;
    else {
      r = `${o}: ${De.localize(e, `filters.${t.expiry[0]}`, void 0, t.expiry[0])}`;
    }
    i.push(`<span class="filter-badge expiry">${r}</span>`);
  }
  return i;
}
class He {
  constructor(t) {
    this.shadowRoot = t;
  }
  searchTimeout = void 0;
  boundSearchHandler = void 0;
  getCurrentFilters(t) {
    const e = localStorage.getItem(ke(t));
    if (e)
      try {
        const t = JSON.parse(e);
        return (
          'string' == typeof t.category && (t.category = t.category ? [t.category] : []),
          'string' == typeof t.location && (t.location = t.location ? [t.location] : []),
          'string' == typeof t.expiry && (t.expiry = t.expiry ? [t.expiry] : []),
          'string' == typeof t.quantity && (t.quantity = t.quantity ? [t.quantity] : []),
          (t.category = Array.isArray(t.category) ? t.category : []),
          (t.location = Array.isArray(t.location) ? t.location : []),
          (t.quantity = Array.isArray(t.quantity) ? t.quantity : []),
          (t.expiry = Array.isArray(t.expiry) ? t.expiry : []),
          (t.searchText = t.searchText || ''),
          (t.showAdvanced = !!t.showAdvanced),
          (t.sortMethod = t.sortMethod || ve.SORT_METHOD),
          t
        );
      } catch (i) {
        console.error('Error parsing saved filters:', i);
      }
    return {
      category: [],
      expiry: [],
      location: [],
      quantity: [],
      searchText: '',
      showAdvanced: !1,
      sortMethod: ve.SORT_METHOD,
    };
  }
  saveFilters(t, e) {
    localStorage.setItem(ke(t), JSON.stringify(e));
  }
  clearFilters(t) {
    localStorage.removeItem(ke(t));
  }
  filterItems(t, e) {
    return e && 0 !== Object.keys(e).length
      ? t.filter(
          (t) =>
            !(e.searchText && !this.matchesTextSearch(t, e.searchText)) &&
            !(e.category && e.category.length > 0 && !e.category.includes(t.category || '')) &&
            !(e.location && e.location.length > 0 && !e.location.includes(t.location || '')) &&
            !(e.quantity && e.quantity.length > 0 && !this.matchesQuantityFilter(t, e.quantity)) &&
            !(e.expiry && e.expiry.length > 0 && !this.matchesExpiryFilter(t, e.expiry)),
        )
      : [...t];
  }
  matchesTextSearch(t, e) {
    const i = (t.category ?? '').toLowerCase(),
      o = (t.location ?? '').toLowerCase(),
      r = (t.name ?? '').toLowerCase(),
      n = (t.unit ?? '').toLowerCase(),
      a = e.toLowerCase();
    return r.includes(a) || i.includes(a) || n.includes(a) || o.includes(a);
  }
  matchesQuantityFilter(t, e) {
    return e.some((e) => {
      switch (e) {
        case Ie.ZERO:
          return 0 === t.quantity;
        case Ie.NONZERO:
          return t.quantity > 0;
        default:
          return !0;
      }
    });
  }
  matchesExpiryFilter(t, e) {
    const i = /* @__PURE__ */ new Date();
    return (
      i.setHours(0, 0, 0, 0),
      e.some((e) => {
        switch (e) {
          case Te.NONE:
            return !t.expiry_date;
          case Te.EXPIRED:
            return !(!t.expiry_date || (t.quantity ?? 0) <= 0) && Ce.isExpired(t.expiry_date);
          case Te.SOON: {
            if (!t.expiry_date || (t.quantity ?? 0) <= 0) return !1;
            const e = t.expiry_alert_days || 7;
            return Ce.isExpiringSoon(t.expiry_date, e);
          }
          case Te.FUTURE: {
            if (!t.expiry_date || (t.quantity ?? 0) <= 0) return !1;
            const e = new Date(t.expiry_date),
              o = t.expiry_alert_days || 7,
              r = new Date(i);
            return (r.setDate(i.getDate() + o), e > r);
          }
          default:
            return !0;
        }
      })
    );
  }
  sortItems(t, e, i) {
    const o = [...t];
    switch (e) {
      case $e:
        return this.sortByName(o);
      case be:
        return this.sortByCategory(o, i);
      case _e:
        return this.sortByLocation(o, i);
      case we:
        return this.sortByQuantity(o, !1);
      case Ee:
        return this.sortByQuantity(o, !0);
      case xe:
        return this.sortByExpiry(o);
      case Ae:
        return this.sortZeroLast(o);
      default:
        return o;
    }
  }
  sortByName(t) {
    return t.sort((t, e) => {
      const i = (t.name ?? '').toLowerCase().trim(),
        o = (e.name ?? '').toLowerCase().trim();
      return i.localeCompare(o, void 0, { numeric: !0, sensitivity: 'base' });
    });
  }
  sortByLocation(t, e) {
    return t.sort((t, i) => {
      const o = De.localize(e, 'common.no_location', void 0, 'No Location'),
        r = (t.location ?? o).toLowerCase().trim(),
        n = (i.location ?? o).toLowerCase().trim(),
        a = r.localeCompare(n);
      return 0 !== a ? a : this.compareNames(t.name, i.name);
    });
  }
  sortByCategory(t, e) {
    return t.sort((t, i) => {
      const o = De.localize(e, 'common.uncategorized', void 0, 'Uncategorized'),
        r = (t.category ?? o).toLowerCase().trim(),
        n = (i.category ?? o).toLowerCase().trim(),
        a = r.localeCompare(n);
      return 0 !== a ? a : this.compareNames(t.name, i.name);
    });
  }
  sortByQuantity(t, e = !1) {
    return t.sort((t, i) => {
      const o = e ? (t.quantity ?? 0) - (i.quantity ?? 0) : (i.quantity ?? 0) - (t.quantity ?? 0);
      return 0 !== o ? o : this.compareNames(t.name, i.name);
    });
  }
  sortByExpiry(t) {
    return t.sort((t, e) => {
      const i = t.expiry_date ?? '9999-12-31',
        o = e.expiry_date ?? '9999-12-31',
        r = i.localeCompare(o);
      return 0 !== r ? r : this.compareNames(t.name, e.name);
    });
  }
  sortZeroLast(t) {
    return t.sort((t, e) => {
      const i = (t.quantity ?? 0) > 0,
        o = (e.quantity ?? 0) > 0;
      return i && !o ? -1 : !i && o ? 1 : this.compareNames(t.name, e.name);
    });
  }
  compareNames(t, e) {
    const i = (t ?? '').toLowerCase().trim(),
      o = (e ?? '').toLowerCase().trim();
    return i.localeCompare(o, void 0, { numeric: !0, sensitivity: 'base' });
  }
  setupSearchInput(t, e) {
    const i = this.shadowRoot.getElementById(te);
    i &&
      (i.removeEventListener('input', this.boundSearchHandler),
      (this.boundSearchHandler = (i) => {
        const o = i.target.value;
        (this.searchTimeout && clearTimeout(this.searchTimeout),
          (this.searchTimeout = setTimeout(() => {
            const i = this.getCurrentFilters(t);
            ((i.searchText = o), this.saveFilters(t, i), e());
          }, 300)));
      }),
      i.addEventListener('input', this.boundSearchHandler));
  }
  updateFilterIndicators(t, e) {
    const i = this.shadowRoot.getElementById(Wt);
    if (i)
      if (Ce.hasActiveFilters(t)) {
        const o = De.localize(e, 'filters.hide_filters', void 0, 'Hide Filters'),
          r = De.localize(e, 'filters.filters', void 0, 'Filters'),
          n = t.showAdvanced ? `${o} ●` : `${r} ●`;
        ((i.textContent = n), (i.style.background = 'var(--warning-color, #ff9800)'));
      } else {
        const o = De.localize(e, 'filters.hide_filters', void 0, 'Hide Filters'),
          r = De.localize(e, 'filters.filters', void 0, 'Filters'),
          n = t.showAdvanced ? o : r;
        ((i.textContent = n), (i.style.background = 'var(--primary-color)'));
      }
    this.updateActiveFiltersDisplay(t, e);
  }
  updateActiveFiltersDisplay(t, e) {
    const i = this.shadowRoot.getElementById(Yt),
      o = this.shadowRoot.getElementById(Qt);
    if (i && o) {
      const r = Pe(t, e);
      r.length > 0
        ? ((o.innerHTML = r.join('')), (i.style.display = 'block'))
        : (i.style.display = 'none');
    }
  }
}
const Be = a`
  ${a`
  ha-card {
    padding: 16px;
  }

  .inventory-title {
    margin: 0;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  .no-items {
    text-align: center;
    color: var(--secondary-text-color);
    padding: 20px;
  }

  .active-filters {
    display: block;
    padding: 8px 16px;
  }

  .filter-badges-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .filter-badge {
    display: inline-block;
    padding: 4px 12px;
    margin: 2px;
    color: white;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .filter-badge.search {
    background: var(--purple-color, #9c27b0);
  }

  .filter-badge.category {
    background: var(--orange-color, #ff9800);
  }

  .filter-badge.location {
    background: var(--blue-color, #2196f3);
  }

  .filter-badge.category,
  .filter-badge.location {
    font-style: normal !important;
    opacity: 1 !important;
  }

  .filter-badge.quantity {
    background: var(--green-color, #4caf50);
    color: white !important;
  }

  .filter-badge.expiry {
    background: var(--red-color, #ff5722);
    border-radius: 12px !important;
  }
`}
  ${a`
  .item-row {
    display: flex;
    flex-direction: column;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid var(--divider-color, #e8e8e8);
    border-radius: 8px;
    gap: 8px;
    cursor: pointer;
  }

  .item-row.zero-quantity {
    opacity: 0.6;
    background: var(--secondary-background-color, #f5f5f5);
  }

  .item-row.auto-add-enabled {
    border-left: 4px solid var(--success-color, #4caf50);
  }

  .item-info {
    flex: 1;
    min-width: 0;
    max-width: calc(100% - 200px); /* Reserve space for buttons */
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .item-name {
    font-weight: bold;
    font-size: 1.1em;
  }

  .category {
    font-style: italic;
    font-size: 0.9em;
    opacity: 0.7;
  }

  .location {
    font-size: 0.9em;
    font-style: italic;
    opacity: 0.7;
  }

  .location-category {
    font-size: 0.9em;
    font-style: italic;
    opacity: 0.7;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .item-name-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
    max-width: 100%;
  }

  .item-name-line .item-name {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-name-line .category {
    flex-shrink: 0;
    font-size: 0.9em;
    opacity: 0.7;
    font-style: italic;
    white-space: nowrap;
    margin-left: auto;
  }

  .item-details {
    color: var(--secondary-text-color);
    font-size: 0.9em;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    flex: 1;
  }

  .item-controls {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    align-items: center;
  }

  .quantity {
    font-weight: bold;
    color: var(--primary-color);
  }

  .expiry {
    font-weight: 500;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .expiry.expired {
    color: var(--error-color, #dc3545);
    background-color: rgba(220, 53, 69, 0.1);
  }

  .expiry.expires-today {
    color: var(--warning-color, #ff9800);
    background-color: rgba(255, 152, 0, 0.1);
    font-weight: 600;
  }

  .expiry.expiring-soon {
    color: var(--warning-color, #ff9800);
    background-color: rgba(255, 152, 0, 0.05);
  }

  .expiry.expiry-safe {
    color: var(--success-color, #4caf50);
    background-color: rgba(76, 175, 80, 0.05);
  }

  .auto-add-info {
    font-size: 0.8em;
    color: var(--success-color);
    font-weight: bold;
  }

  .category-group {
    margin-bottom: 20px;
  }

  .location-group {
    margin-bottom: 20px;
  }

  .category-header {
    font-weight: bold;
    font-size: 1.1em;
    color: var(--primary-color);
    margin-bottom: 8px;
    padding: 8px 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 6px;
    border-left: 4px solid var(--primary-color);
  }

  .location-header {
    font-weight: bold;
    font-size: 1.1em;
    color: var(--primary-color);
    margin-bottom: 8px;
    padding: 8px 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 6px;
    border-left: 4px solid var(--primary-color);
  }
`}
  ${a`
  .validation-message {
    background: var(--error-color, #f44336);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9em;
    display: none;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
    border-left: 4px solid rgba(255, 255, 255, 0.3);
    position: relative;
  }

  .validation-message.show {
    display: flex;
    animation: slideInDown 0.3s ease-out;
  }

  .validation-message::before {
    content: '⚠️';
    font-size: 1.1em;
    flex-shrink: 0;
  }

  .validation-text {
    flex: 1;
    line-height: 1.4;
    font-weight: 500;
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .input-error {
    border-color: var(--error-color, #f44336) !important;
    box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
    animation: shake 0.3s ease-in-out;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(2px);
    }
  }

  .add-item-form {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid var(--divider-color);
  }

  .form-header {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 16px;
    color: var(--primary-text-color);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--primary-text-color);
    font-size: 0.9em;
  }

  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 120px;
  }

  .input-group label {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  input:not([type='checkbox']),
  select {
    padding: 14px 16px;
    border: 2px solid var(--divider-color);
    border-radius: 8px;
    font-size: 16px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    box-sizing: border-box;
  }

  input:not([type='checkbox']):focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--rgb-primary-color), 0.1);
    transform: translateY(-1px);
  }

  input::placeholder {
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  input[type='checkbox'] {
    appearance: none !important;
    width: 20px !important;
    height: 20px !important;
    border: 2px solid var(--primary-color) !important;
    border-radius: 4px !important;
    background: var(--card-background-color) !important;
    cursor: pointer !important;
    position: relative !important;
    margin: 0 !important;
    padding: 0 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    flex-shrink: 0 !important;
  }

  input[type='checkbox']:checked {
    background: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    transform: scale(1.05) !important;
  }

  input[type='checkbox']:checked::after {
    content: '✓' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) scale(1) !important;
    color: var(--text-primary-color, white) !important;
    font-size: 12px !important;
    font-weight: bold !important;
    animation: checkmark 0.2s ease-in-out !important;
  }

  @keyframes checkmark {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  input[type='checkbox']:hover {
    border-color: var(--primary-color) !important;
    box-shadow: 0 0 0 3px rgba(var(--rgb-primary-color, 25, 118, 210), 0.1) !important;
  }

  .checkbox-label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95em;
    color: var(--primary-text-color);
    font-weight: 500;
    margin: 0;
    line-height: 1.5;
    padding: 4px 0;
  }

  .auto-add-id-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .auto-add-section {
    border-top: 1px solid var(--divider-color);
    padding-top: 20px;
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
  }

  .auto-add-section .checkbox-label {
    cursor: pointer;
    font-size: 0.95em;
    color: var(--primary-text-color);
    font-weight: 500;
    margin: 0;
    line-height: 1.5;
    flex: 1;
  }

  .auto-add-section .auto-add-controls {
    flex-basis: 100%;
    margin-top: 8px;
  }

  .auto-add-controls {
    display: none;
    margin-top: 16px;
    padding: 20px;
    background: var(--secondary-background-color, rgba(var(--rgb-primary-color), 0.05));
    border-radius: 12px;
    border: 1px solid var(--divider-color, #e9ecef);
  }

  .auto-add-header {
    display: block;
    font-size: 0.85em;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input[type='checkbox']:checked + label + .auto-add-controls,
  input[type='checkbox']:checked ~ .auto-add-controls {
    display: block !important;
  }

  #item-auto-add:checked ~ .auto-add-controls,
  #modal-auto-add:checked ~ .auto-add-controls,
  [id$='auto-add']:checked ~ .auto-add-controls,
  [id$='AUTO_ADD']:checked ~ .auto-add-controls {
    display: block !important;
  }

  .auto-add-required {
    border-color: var(--primary-color) !important;
  }

  .auto-add-controls label:has(+ .auto-add-required)::after,
  .auto-add-controls .input-group:has(.auto-add-required) label::after {
    content: ' *';
    color: var(--error-color, #f44336);
    font-weight: bold;
  }

  .auto-add-controls.has-errors {
    border-color: var(--error-color, #f44336);
    background: rgba(244, 67, 54, 0.05);
  }

  .input-error:focus {
    animation: none; /* Stop shake when user focuses to fix */
  }

  .autocomplete-container {
    position: relative;
  }

  .autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-background-color);
    border: 2px solid var(--divider-color);
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .autocomplete-option {
    padding: 14px 16px;
    cursor: pointer;
    color: var(--primary-text-color);
    font-size: 16px;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid var(--divider-color);
  }

  .autocomplete-option:last-child {
    border-bottom: none;
  }

  .autocomplete-option:hover,
  .autocomplete-option.selected {
    background: var(--secondary-background-color, rgba(var(--rgb-primary-color), 0.05));
  }

  .autocomplete-option.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  .autocomplete-container input {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4l3 3 3-3' stroke='%23666' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 48px;
  }

  .autocomplete-container input:focus {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4l3 3 3-3' stroke='var(--primary-color)' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  }

  .multi-select-container {
    position: relative;
  }

  .multi-select-trigger {
    padding: 14px 16px;
    border: 2px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }

  .multi-select-trigger:hover {
    border-color: var(--primary-color);
  }

  .multi-select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-background-color);
    border: 2px solid var(--divider-color);
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .multi-select-option {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid var(--divider-color);
    gap: 12px;
  }

  .multi-select-option:last-child {
    border-bottom: none;
  }

  .multi-select-option:hover {
    background: var(--secondary-background-color);
  }

  .multi-select-option input[type='checkbox'] {
    margin: 0;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .multi-select-option span {
    flex: 1;
    user-select: none;
  }

  .multi-select-arrow {
    transition: transform 0.3s ease;
    margin-left: 8px;
  }

  .multi-select-trigger.open .multi-select-arrow {
    transform: rotate(180deg);
  }
`}
  ${a`
  button {
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 48px;
  }

  .primary-btn,
  .save-btn {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  .primary-btn:hover,
  .save-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--rgb-primary-color), 0.3);
  }

  .add-new-btn {
    padding: 12px 16px;
    background: var(--primary-color);
    color: var(--text-primary-color, white);
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .add-new-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .add-new-btn:active {
    transform: translateY(0);
  }

  .control-btn {
    padding: 8px 12px;
    font-size: 16px;
    font-weight: bold;
    min-width: 40px;
    min-height: 40px;
    background: var(--primary-color);
    color: var(--text-primary-color);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .control-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: var(--disabled-color, #ccc);
    transform: none;
    box-shadow: none;
  }

  .add-btn {
    width: 100%;
    margin-top: 8px;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
  }

  .edit-btn {
    padding: 6px 8px;
    font-size: 12px;
    min-width: auto;
    min-height: auto;
    background: var(--secondary-color, #f0f0f0);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .edit-btn:hover {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }

  .toggle-btn {
    padding: 12px 16px;
    background: var(--primary-color);
    color: var(--text-primary-color, white);
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover {
    opacity: 0.9;
  }

  .toggle-btn.has-active-filters {
    background: var(--warning-color, #ff9800) !important;
    position: relative;
  }

  .toggle-btn.has-active-filters::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--error-color, #f44336);
    border-radius: 50%;
    border: 2px solid var(--card-background-color, white);
  }

  .cancel-btn {
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color);
    border: 2px solid var(--divider-color, #e0e0e0);
  }

  .cancel-btn:hover {
    background: var(--primary-background-color);
    transform: translateY(-1px);
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: var(--secondary-text-color);
    padding: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    min-height: auto;
  }

  .close-btn:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
`}
  ${a`
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: var(--card-background-color);
    padding: 32px;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--divider-color);
  }

  .modal-header h3 {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--primary-text-color);
    margin: 0;
  }

  .modal-title {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .modal-buttons {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    justify-content: flex-end;
  }

  .modal-buttons button {
    padding: 12px 24px;
    min-width: 100px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`}
  ${a`
  .controls-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .controls-row .sorting-controls {
    flex: 1;
    margin-bottom: 0;
  }

  .search-controls {
    margin-bottom: 20px;
    padding: 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
  }

  .search-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 0;
  }

  .search-row input {
    flex: 1;
    min-width: 0;
  }

  .search-row input.has-value {
    border-color: var(--warning-color, #ff9800);
    box-shadow: 0 0 0 1px var(--warning-color, #ff9800);
  }

  .sorting-controls {
    margin-bottom: 20px;
    padding: 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sorting-controls label {
    font-weight: bold;
    color: var(--primary-text-color);
    white-space: nowrap;
    margin-bottom: 0;
  }

  .sorting-controls select {
    flex: 1;
    max-width: 200px;
  }

  .advanced-filters {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--divider-color);
  }

  .filter-row {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 120px;
    flex: 1;
  }

  .filter-group label {
    font-size: 0.9em;
    font-weight: 500;
    color: var(--secondary-text-color);
  }

  .filter-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .filter-actions button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  #apply-filters {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
    border: none;
  }

  #clear-filters {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  #apply-filters:hover,
  #clear-filters:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`}
  ${a`
  @media (max-width: 768px) {
    .controls-row {
      flex-direction: column;
      align-items: stretch;
    }

    .add-new-btn {
      width: 100%;
      margin-top: 8px;
    }

    .modal-content {
      padding: 24px;
      margin: 16px;
      width: calc(100% - 32px);
      border-radius: 12px;
    }

    .form-row {
      flex-direction: column;
      gap: 12px;
    }

    .modal-buttons {
      flex-direction: column-reverse;
    }

    .modal-buttons button {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .item-row {
      flex-wrap: nowrap;
    }

    .add-btn {
      width: auto;
      margin-top: 0;
    }
  }
`}
  ${a`
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
    background-color: var(--card-background-color);
  }

  .header-content {
    flex: 1;
    min-width: 0; /* Allows text to wrap */
  }

  .inventory-title {
    margin: 0 0 2px 0;
    font-size: 1.1em; /* Reduced from 1.2em */
    font-weight: 500;
    color: var(--primary-text-color);
    line-height: 1.1;
  }

  .inventory-description {
    margin: 0;
    font-size: 0.75em; /* Reduced from 0.8em */
    color: var(--secondary-text-color);
    line-height: 1.2;
    opacity: 0.8;
    max-width: 300px;
  }

  .expiry-indicators {
    display: flex;
    flex-direction: row; /* Changed from column to row */
    gap: 6px; /* Increased gap for horizontal layout */
    margin-left: 16px;
    flex-shrink: 0;
  }

  .expiring-badge,
  .expired-badge {
    display: inline-flex;
    align-items: center;
    gap: 2px; /* Reduced from 3px */
    padding: 2px 5px; /* Reduced from 2px 6px */
    border-radius: 6px; /* Reduced from 8px */
    font-size: 0.65em; /* Reduced from 0.7em */
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .expiring-badge:hover,
  .expired-badge:hover {
    transform: translateY(-1px);
  }

  .expiring-badge {
    background-color: var(--warning-color, #ff9800);
    color: var(--text-primary-color, white);
  }

  .expired-badge {
    background-color: var(--error-color, #f44336);
    color: var(--text-primary-color, white);
  }

  .expiring-badge ha-icon,
  .expired-badge ha-icon {
    --mdc-icon-size: 11px; /* Reduced from 12px */
  }

  @media (max-width: 600px) {
    .card-header {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .expiry-indicators {
      margin-left: 0;
      align-self: flex-end;
      gap: 6px;
    }

    .inventory-description {
      max-width: none;
    }
  }

  @media (max-width: 480px) {
    .card-header {
      padding: 12px;
    }

    .inventory-title {
      font-size: 1em; /* Further reduced for mobile */
    }

    .inventory-description {
      font-size: 0.7em; /* Further reduced for mobile */
    }

    .expiring-badge,
    .expired-badge {
      padding: 2px 4px; /* Even more compact on mobile */
      font-size: 0.6em; /* Smaller text on mobile */
    }

    .expiring-badge ha-icon,
    .expired-badge ha-icon {
      --mdc-icon-size: 10px; /* Smaller icon on mobile */
    }
  }
`}
`;
function je(t, e, i, o) {
  const r = e.filter((t) => {
    if (!t.expiry_date || (t.quantity ?? 0) <= 0) return !1;
    const e = t.expiry_alert_days || ve.EXPIRY_ALERT_DAYS;
    return Ce.isExpiringSoon(t.expiry_date, e);
  }).length;
  const n = (function (t) {
    return t.filter(
      (t) => !(!t.expiry_date || (t.quantity ?? 0) <= 0) && Ce.isExpired(t.expiry_date),
    ).length;
  })(e);
  return `\n      <div class="card-header">\n        <div class="header-content">\n          <h2 class="inventory-title">${Ce.sanitizeHtml(t)}</h2>\n          ${o && o.trim() ? `<p class="inventory-description">${Ce.sanitizeHtml(o)}</p>` : ''}\n        </div>\n        ${n > 0 || r > 0 ? `\n          <div class="expiry-indicators">\n            ${n > 0 ? `\n                <span class="expired-badge" title="${De.localize(i, 'header.items_expired', { count: n }, `${n} items expired`)}">\n                <ha-icon icon="mdi:calendar-remove"></ha-icon>\n                ${n}\n              </span>\n            ` : ''}\n            ${r > 0 ? `\n                <span class="expiring-badge" title="${De.localize(i, 'header.items_expiring_soon', { count: r }, `${r} items expiring soon`)}">\n                <ha-icon icon="mdi:calendar-alert"></ha-icon>\n                ${r}\n              </span>\n            ` : ''}\n          </div>\n        ` : ''}\n      </div>\n    `;
}
function Ve(t) {
  return `\n    <div class="multi-select-container">\n      <div class="multi-select-trigger" id="${t.id}-trigger">\n        <span class="multi-select-label">\n          ${t.selected && t.selected.length > 0 ? `${t.selected.length} selected` : t.placeholder}\n        </span>\n        <span class="multi-select-arrow">▼</span>\n      </div>\n      <div class="multi-select-dropdown" id="${t.id}-dropdown" style="display: none;">\n        ${t.options.map((e) => `\n              <label class="multi-select-option">\n                <input type="checkbox" value="${e}" ${t.selected && t.selected.includes(e) ? 'checked' : ''}>\n                <span>${t.labels?.[e] || e}</span>\n              </label>\n            `).join('')}\n      </div>\n    </div>\n  `;
}
function Ye(t, e, i, o) {
  return `\n    ${(function (t, e) {
    return `\n    <div class="search-row">\n      <input \n        type="text" \n        id="${te}" \n        placeholder="${De.localize(e, 'filters.search_placeholder', void 0, 'Search items...')}" \n        value="${t.searchText || ''}"\n        class="search-input ${t.searchText ? 'has-value' : ''}"\n      />\n      <button id="${Wt}" \n        class="toggle-btn ${Ce.hasActiveFilters(t) ? 'has-active-filters' : ''}">\n      ${t.showAdvanced ? De.localize(e, 'filters.hide_filters', void 0, 'Hide Filters') : De.localize(e, 'filters.filters', void 0, 'Filters')}\n      </button>\n    </div>\n`;
  })(t, o)}\n    ${(function (t, e, i, o) {
    return `\n    <div id="advanced-filters" class="advanced-filters" style="display: ${t.showAdvanced ? 'block' : 'none'}">\n      ${(function (
      t,
      e,
      i,
    ) {
      return `\n    <div class="filter-row">\n      <div class="filter-group">\n        <label>\n          ${De.localize(i, 'filters.category', void 0, 'Category')}\n        </label>\n        ${Ve({ id: Jt, options: e, selected: t.category, placeholder: De.localize(i, 'filters.all_categories', void 0, 'All Categories') })}\n      </div>\n    </div>\n`;
    })(t, e, o)}\n      ${(function (t, e, i) {
      return `\n    <div class="filter-row">\n      <div class="filter-group">\n        <label>\n          ${De.localize(i, 'filters.location', void 0, 'Location')}\n        </label>\n        ${Ve({ id: Gt, options: e, selected: t.location, placeholder: De.localize(i, 'filters.all_locations', void 0, 'All Locations') })}\n      </div>\n    </div>\n`;
    })(t, i, o)}\n      ${(function (t, e) {
      return `\n    <div class="filter-row">\n      <div class="filter-group">\n        <label>\n          ${De.localize(e, 'filters.quantity', void 0, 'Quantity')}\n        </label>\n        ${Ve({ id: Kt, options: ['zero', 'nonzero'], selected: t.quantity, placeholder: De.localize(e, 'filters.all_quantities', void 0, 'All Quantities'), labels: { zero: De.localize(e, 'filters.zero', void 0, 'Zero'), nonzero: De.localize(e, 'filters.non_zero', void 0, 'Non-zero') } })}\n      </div>\n    </div>\n  `;
    })(t, o)}\n      ${(function (t, e) {
      return `\n    <div class="filter-row">\n      <div class="filter-group">\n        <label>\n          ${De.localize(e, 'filters.expiry', void 0, 'Expiry')}\n        </label>\n        ${Ve({ id: Zt, options: ['none', 'expired', 'soon', 'future'], selected: t.expiry, placeholder: De.localize(e, 'filters.all_items', void 0, 'All Items'), labels: { none: De.localize(e, 'filters.no_expiry', void 0, 'No Expiry'), expired: De.localize(e, 'filters.expired', void 0, 'Expired'), soon: De.localize(e, 'filters.expiring_soon', void 0, 'Expiring Soon'), future: De.localize(e, 'filters.future', void 0, 'Future') } })}\n      </div>\n    </div>\n  `;
    })(t, o)}\n      ${(function (t) {
      return `\n    <div class="filter-actions">\n      <button id="${Xt}" class="clear-only-btn">\n        ${De.localize(t, 'filters.clear_all_filters', void 0, 'Clear All Filters')}\n      </button>\n    </div>\n`;
    })(o)}\n    </div>\n`;
  })(t, e, i, o)}\n  `;
}
function Qe(t) {
  return `\n    <div class="autocomplete-container">\n      <input \n        type="text" \n        id="${t.id}" \n        value="${t.value || ''}"\n        placeholder="${t.placeholder || ''}"\n        autocomplete="off"\n      />\n      <div class="autocomplete-dropdown" id="${t.id}-dropdown"></div>\n    </div>\n  `;
}
function We(t, e, i, o = [], r = []) {
  const n = e.id === zt ? 'add' : 'edit';
  return `\n    <div id="${e.id}" class="modal">\n      <div class="modal-content">\n\n        ${(function (
    t,
  ) {
    return `\n    <div class="modal-header">\n      <h3>${t.title}</h3>\n      <button class="${ne}" ${t.closeAction ? `data-action="${t.closeAction}"` : ''}>\n        ×\n      </button>\n    </div>\n  `;
  })(
    e,
  )}\n\n        <div class="modal-body">\n          <div id="${n}-validation-message" class="validation-message">\n            <span class="validation-text"></span>\n          </div>\n\n          ${(function (
    t,
    e,
  ) {
    return `\n    <div class="form-group">\n      <label for="${t}-${Ut}" class="form-label">\n        ${De.localize(e, 'modal.name_required', void 0, 'Name *')}\n      </label>\n      <input type="text" id="${t}-${Ut}" required />\n    </div> \n  `;
  })(n, i)}\n          ${(function (t, e) {
    return `\n    <div class="form-group">\n      <label for="${t}-${Nt}" class="form-label">\n        ${De.localize(e, 'modal.description', void 0, 'Description')}\n      </label>\n      <input type="text" id="${t}-${Nt}" placeholder="${De.localize(e, 'modal.description_placeholder', void 0, 'Item description')}" />\n    </div> \n  `;
  })(n, i)}\n          ${(function (t, e) {
    return `\n    <div class="auto-add-id-container">\n      <input type="checkbox" id="${t}-${Lt}" class="auto-add-id-checkbox" />\n      <label for="${t}-${Lt}" class="checkbox-label">\n        ${De.localize(e, 'modal.auto_add_id_to_description', void 0, 'Append inventory ID to item description')}\n      </label>\n    </div>\n  `;
  })(n, i)}\n\n          <div class="form-row">\n            ${(function (t, e) {
    return `\n    <div class="input-group">\n      <label for="${t}-${Pt}">\n        ${De.localize(e, 'modal.quantity', void 0, 'Quantity')}\n      </label>\n      <input type="number" id="${t}-${Pt}" min="0" />\n    </div>\n  `;
  })(n, i)}\n            ${(function (t, e) {
    return `\n    <div class="input-group">\n      <label for="${t}-${Bt}">\n        ${De.localize(e, 'modal.unit', void 0, 'Unit')}\n      </label>\n      <input type="text" id="${t}-${Bt}" placeholder="${De.localize(e, 'modal.unit_placeholder', void 0, 'kg, pcs, etc.')}" />\n    </div>\n  `;
  })(n, i)}\n          </div>\n\n          <div class="form-row">\n            ${(function (
    t,
    e,
    i = [],
  ) {
    return `\n    <div class="input-group">\n      <label for="${t}-${Mt}" class="form-label">\n        ${De.localize(e, 'modal.category', void 0, 'Category')}\n      </label>\n      ${Qe({ id: `${t}-${Mt}`, placeholder: De.localize(e, 'modal.category_placeholder', void 0, 'Food, Tools, Supplies, etc.'), options: i.sort((t, e) => t.localeCompare(e, void 0, { sensitivity: 'base' })) })}\n    </div>\n  `;
  })(n, i, o)}\n            ${(function (t, e, i = []) {
    return `\n    <div class="input-group">\n      <label for="${t}-${Ft}" class="form-label">\n        ${De.localize(e, 'modal.location', void 0, 'Location')}\n      </label>\n      ${Qe({ id: `${t}-${Ft}`, placeholder: De.localize(e, 'modal.location_placeholder', void 0, 'Pantry, Garage Shelf, etc.'), options: i.sort((t, e) => t.localeCompare(e, void 0, { sensitivity: 'base' })) })}\n    </div>\n  `;
  })(n, i, r)}\n          </div>\n\n          <div class="form-row">\n            ${(function (
    t,
    e,
  ) {
    return `\n    <div class="input-group">\n      <label for="${t}-${qt}" class="form-label">\n        ${De.localize(e, 'modal.expiry_date', void 0, 'Expiry Date')}\n      </label>\n      <input type="date" id="${t}-${qt}" />\n    </div>\n  `;
  })(n, i)}\n            ${(function (t, e) {
    return `\n    <div class="input-group expiry-threshold-section">\n      <label for="${t}-${Ot}" class="form-label">\n        ${De.localize(e, 'modal.expiry_alert_threshold', void 0, 'Expiry Alert Threshold')}\n        <span class="optional">\n          ${De.localize(e, 'modal.days_before_expiry', void 0, '(days before expiry)')}\n        </span>\n      </label>\n      <input \n        type="number" \n        id="${t}-${Ot}" \n        min="1" \n        max="365"\n        placeholder="${De.localize(e, 'modal.set_expiry_first', void 0, 'Set expiry date first')}"\n        disabled\n      />\n      <small class="help-text">\n        ${De.localize(e, 'modal.expiry_help_text', void 0, 'How many days before expiry to show alerts')}\n      </small>\n    </div>\n  `;
  })(
    n,
    i,
  )}\n          </div>\n\n          <div class="form-group auto-add-section">\n            ${(function (
    t,
    e,
  ) {
    return `\n    <input type="checkbox" id="${t}-${Dt}" class="auto-add-checkbox" />\n    <label for="${t}-${Dt}" class="checkbox-label">\n      ${De.localize(e, 'modal.auto_add_when_low', void 0, 'Auto-add to todo list when low')}\n    </label>\n  `;
  })(n, i)}\n            ${(function (t, e, i) {
    return `\n    <div class="auto-add-controls" id="${t}-auto-add-controls">\n      <div class="auto-add-header">${De.localize(i, 'modal.auto_add_settings', void 0, 'Auto-add Settings')}</div>\n\n      <div class="form-row">\n\n        <div class="input-group">\n          <label for="${t}-${Rt}">\n            ${De.localize(i, 'modal.quantity_threshold', void 0, 'Quantity Threshold')}\n          </label>\n          <input \n            type="number" \n            id="${t}-${Rt}" \n            min="0"\n            class="auto-add-required"\n            placeholder="${De.localize(i, 'modal.minimum_quantity', void 0, 'Minimum quantity')}"\n          />\n        </div>\n\n        <div class="input-group">\n          <label for="${t}-${Ht}">${De.localize(i, 'modal.todo_list', void 0, 'Todo List')}</label>\n          <select id="${t}-${Ht}" class="auto-add-required">\n            <option value="">${De.localize(i, 'modal.select_list', void 0, 'Select list...')}</option>\n            ${e.map((t) => `<option value="${t.id}">${t.name}</option>`).join('')}\n          </select>\n        </div>\n\n      </div>\n\n    </div>\n  `;
  })(
    n,
    t,
    i,
  )}\n          </div>\n        </div>\n\n        <div class="modal-buttons">\n          <button ${e.primaryButtonId ? `id="${e.primaryButtonId}"` : ''} class="save-btn">${e.primaryButtonText}</button>\n          <button class="cancel-btn" ${e.closeAction ? `data-action="${e.closeAction}"` : ''}>\n            ${De.localize(i, 'modal.cancel', void 0, 'Cancel')}\n          </button>\n        </div>\n      </div>\n    </div>\n  `;
}
function Xe(t, e, i) {
  const o = (t) => {
      const i = e.find((e) => e.entity_id === t || e.id === t);
      return i ? i.name : t;
    },
    r = t.expiry_date
      ? ((t, e = ve.EXPIRY_ALERT_DAYS) => {
          const o = /* @__PURE__ */ new Date();
          o.setHours(0, 0, 0, 0);
          const r = /* @__PURE__ */ new Date(t + 'T00:00:00'),
            n = Math.floor((r.getTime() - o.getTime()) / 864e5);
          if (n < 0) {
            const t = Math.abs(n),
              e = 1 === t ? 'expiry.expired_day_ago' : 'expiry.expired_days_ago';
            return {
              class: 'expired',
              label: De.localize(i, e, { days: t }, `Expired ${t} day${1 !== t ? 's' : ''} ago`),
            };
          }
          if (0 === n)
            return {
              class: 'expires-today',
              label: De.localize(i, 'expiry.expires_today', void 0, 'Expires today'),
            };
          if (n <= e) {
            const t = 1 === n ? 'expiry.expires_in_day' : 'expiry.expires_in_days';
            return {
              class: 'expiring-soon',
              label: De.localize(i, t, { days: n }, `Expires in ${n} day${1 !== n ? 's' : ''}`),
            };
          }
          return { class: 'expiry-safe', label: `${t}` };
        })(t.expiry_date, t.expiry_alert_days)
      : null;
  return `\n    <div class="item-row ${0 === t.quantity ? 'zero-quantity' : ''} ${t.auto_add_enabled ? 'auto-add-enabled' : ''}" data-action="item_click" data-name="${t.name}">\n      <div class="item-header">\n        <span class="item-name">${t.name}</span>\n        ${t.location && t.category ? `<span class="location-category">${t.location} | ${t.category}</span>` : t.location ? `<span class="location">${t.location}</span>` : t.category ? `<span class="category">${t.category}</span>` : ''}\n      </div>\n      <div class="item-description">\n        <span>${t.description || ''}</span>\n      </div>\n      <div class="item-footer">\n        <div class="item-details">\n          <span class="quantity">${t.quantity} ${t.unit || ''}</span>\n          ${r ? `<span class="expiry ${r.class}">${r.label}</span>` : ''}\n          ${t.auto_add_enabled ? `<span class="auto-add-info">${De.localize(i, 'items.auto_add_info', { quantity: t.auto_add_to_list_quantity || 0, list: o(t.todo_list || '') }, `Auto-add at ≤ ${t.auto_add_to_list_quantity || 0} → ${o(t.todo_list || '')}`)}</span>` : ''}\n\n        </div>\n        <div class="item-controls">\n          <button class="edit-btn" data-action="open_edit" data-name="${t.name}">⚙️</button>\n          <button class="control-btn" data-action="decrement" data-name="${t.name}" ${0 === t.quantity ? 'disabled' : ''}>➖</button>\n          <button class="control-btn" data-action="increment" data-name="${t.name}">➕</button>\n          <button class="control-btn" data-action="remove" data-name="${t.name}">❌</button>\n        </div>\n      </div>\n    </div>\n  `;
}
function Je(t, e, i, o) {
  if (0 === t.length) {
    return `<div class="no-items">${De.localize(o, 'items.no_items', void 0, 'No items in inventory')}</div>`;
  }
  return 'category' === e
    ? Ze(t, i, o)
    : 'location' === e
      ? Ge(t, i, o)
      : t.map((t) => Xe(t, i, o)).join('');
}
function Ze(t, e, i) {
  const o = Ce.groupItemsByCategory(t);
  return Object.keys(o)
    .sort()
    .map(
      (t) =>
        `\n        <div class="${oe}">\n          <div class="${re}">${t}</div>\n          ${o[t].map((t) => Xe(t, e, i)).join('')}\n        </div>\n      `,
    )
    .join('');
}
function Ge(t, e, i) {
  const o = Ce.groupItemsByLocation(t);
  return Object.keys(o)
    .sort()
    .map(
      (t) =>
        `\n        <div class="${ae}">\n          <div class="${se}">${t}</div>\n          ${o[t].map((t) => Xe(t, e, i)).join('')}\n        </div>\n`,
    )
    .join('');
}
const Ke = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    { __proto__: null, createItemsByCategory: Ze, createItemsByLocation: Ge, createItemsList: Je },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function ti(t, e, i, o, r, n, a, s, l, d) {
  return `\n    <style>${Be}</style>\n    <ha-card>\n      ${je(t, s, d, l)}\n\n      <div class="controls-row">\n        <div class="sorting-controls">\n          ${(function (
    t,
    e,
  ) {
    return `\n    <label for="${ee}">${De.localize(e, 'sort.sort_by', void 0, 'Sort by:')}</label> \n    <select id="${ee}">\n      <option value="name" ${'name' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.name', void 0, 'Name')}\n      </option>\n\n      <option value="category" ${'category' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.category', void 0, 'Category')}\n      </option>\n\n      <option value="location" ${'location' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.location', void 0, 'Location')}\n      </option>\n\n      <option value="quantity" ${'quantity' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.quantity_high', void 0, 'Quantity (High)')}\n      </option>\n\n      <option value="quantity-low" ${'quantity-low' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.quantity_low', void 0, 'Quantity (Low)')}\n      </option>\n\n      <option value="expiry" ${'expiry' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.expiry_date', void 0, 'Expiry Date')}\n      </option>\n\n      <option value="zero-last" ${'zero-last' === t ? 'selected' : ''}>\n        ${De.localize(e, 'sort.zero_last', void 0, 'Zero Last')}\n      </option>\n\n    </select>\n  `;
  })(
    o,
    d,
  )}\n        </div>\n        <button id="${Vt}" class="add-new-btn">\n          + ${De.localize(d, 'modal.add_item', void 0, 'Add Item')}\n        </button>\n      </div>\n\n      <div class="search-controls">\n        ${Ye(i, r, n, d)}\n      </div>\n\n      ${(function (
    t,
    e,
  ) {
    const i = Pe(t, e),
      o = i.length > 0;
    return `\n    <div id="${Yt}" class="active-filters" style="display: ${o ? 'block' : 'none'};">\n      <div id="${Qt}" class="filter-badges-container">\n        ${i.join('')}\n      </div>\n    </div>\n  `;
  })(
    i,
    d,
  )}\n\n      <div class="items-container">\n        ${e.length > 0 ? Je(e, o, a, d) : `<div class="empty-state">${De.localize(d, 'items.no_items', void 0, 'No items in inventory')}</div>`}\n      </div>\n\n      ${(function (
    t,
    e,
    i,
    o,
  ) {
    return We(
      t,
      {
        id: zt,
        title: De.localize(e, 'modal.add_item', void 0, 'Add Item'),
        primaryButtonText: De.localize(e, 'modal.add_item', void 0, 'Add Item'),
        primaryButtonId: jt,
        closeAction: pe,
      },
      e,
      i,
      o,
    );
  })(a, d, r, n)}\n      ${(function (t, e, i, o) {
    return We(
      t,
      {
        id: Ct,
        title: De.localize(e, 'modal.edit_item', void 0, 'Edit Item'),
        primaryButtonText: De.localize(e, 'modal.save_changes', void 0, 'Save Changes'),
      },
      e,
      i,
      o,
    );
  })(a, d, r, n)}\n    </ha-card>\n  `;
}
class ei {
  constructor(t) {
    this.shadowRoot = t;
  }
  renderCard(t, e, i, o, r, n, a) {
    const s = Ce.getInventoryName(t, e),
      l = Ce.getInventoryDescription(t),
      d = t?.attributes?.items || [],
      c = [...new Set(d.map((t) => t.category).filter((t) => !!t))].sort(),
      p = [...new Set(d.map((t) => t.location).filter((t) => !!t))].sort();
    this.shadowRoot.innerHTML = ti(s, i, o, r, c, p, n, d, l, a);
  }
  renderError(t, e) {
    const i = e ? De.localize(e, 'common.error', void 0, 'Error') : 'Error';
    this.shadowRoot.innerHTML = `\n      <style>${Be}</style>\n      <ha-card>\n        <div class="card-content">\n          <div class="error-message" style="color: var(--error-color); padding: 16px; text-align: center;">\n            <p><strong>${i}:</strong> ${Ce.sanitizeHtml(t)}</p>\n          </div>\n        </div>\n      </ha-card>\n    `;
  }
  renderLoading(t) {
    const e = t ? De.localize(t, 'common.loading', void 0, 'Loading...') : 'Loading...';
    this.shadowRoot.innerHTML = `\n      <style>${Be}</style>\n      <ha-card>\n        <div class="card-content">\n          <div class="loading-container" style="padding: 16px; text-align: center;">\n            <p>${e}</p>\n          </div>\n        </div>\n      </ha-card>\n    `;
  }
}
class ii {
  userInteracting = !1;
  renderTimeout = void 0;
  _lastEntityState = void 0;
  _renderCallback = void 0;
  _debouncedRenderFn = void 0;
  trackUserInteraction(t) {
    const e = t.querySelectorAll('input, select, textarea');
    for (const i of e)
      (i.addEventListener('focus', () => {
        this.userInteracting = !0;
      }),
        i.addEventListener('blur', () => {
          setTimeout(() => {
            this.userInteracting = !1;
          }, 100);
        }));
  }
  hasRealEntityChange(t, e) {
    const i = t.states[e];
    return (
      !!i &&
      (this._lastEntityState
        ? this.hasItemsChanged(this._lastEntityState.attributes?.items, i.attributes?.items)
        : ((this._lastEntityState = i), !0))
    );
  }
  hasItemsChanged(t, e) {
    const i = t || [],
      o = e || [],
      r = JSON.stringify(i) !== JSON.stringify(o);
    return (
      r &&
        e &&
        (this._lastEntityState = {
          ...this._lastEntityState,
          attributes: { ...this._lastEntityState?.attributes, items: [...o] },
        }),
      r
    );
  }
  debouncedRender(t, e = 100) {
    t || this._renderCallback
      ? (this._debouncedRenderFn ||
          (this._debouncedRenderFn = Ce.debounce(() => {
            this._renderCallback && this._renderCallback();
          }, e)),
        this._debouncedRenderFn())
      : console.warn('No render function provided to debouncedRender');
  }
  setRenderCallback(t) {
    this._renderCallback = t;
  }
  debouncedRenderWithCallback(t, e = 100) {
    this.debouncedRender(t, e);
  }
  debouncedRenderDefault(t = 100) {
    this.debouncedRender(void 0, t);
  }
  cleanup() {
    (this.renderTimeout && (clearTimeout(this.renderTimeout), (this.renderTimeout = void 0)),
      (this._renderCallback = void 0),
      (this.userInteracting = !1));
  }
}
function oi(t) {
  const e = t.shadowRoot || document,
    i = e.getElementById(`${t.id}-trigger`),
    o = e.getElementById(`${t.id}-dropdown`);
  if (!i || !o) return;
  let r = !1,
    n = [...t.selected];
  (i.addEventListener('click', (t) => {
    (t.stopPropagation(),
      e.querySelectorAll('.multi-select-dropdown').forEach((t) => {
        t !== o && (t.style.display = 'none');
      }),
      (r = !r),
      (o.style.display = r ? 'block' : 'none'));
  }),
    o.addEventListener('change', (e) => {
      const o = e.target;
      'checkbox' === o.type &&
        (o.checked ? n.includes(o.value) || n.push(o.value) : (n = n.filter((t) => t !== o.value)),
        (function () {
          const e = i.querySelector('.multi-select-label');
          e && (e.textContent = n.length > 0 ? `${n.length} selected` : t.placeholder);
        })(),
        t.onChange?.(n));
    }),
    o.addEventListener('click', (t) => {
      t.stopPropagation();
    }),
    e.addEventListener('click', (t) => {
      i.contains(t.target) || o.contains(t.target) || ((o.style.display = 'none'), (r = !1));
    }));
}
class ri {
  constructor(t, e, i, o, r, n, a, s, l, d) {
    ((this.getFreshState = l),
      (this.renderRoot = t),
      (this.services = e),
      (this.modals = i),
      (this.filters = o),
      (this.config = r),
      (this.hass = n),
      (this.renderCallback = a),
      (this.updateItemsCallback = s),
      (this.translations = d));
  }
  renderRoot;
  services;
  modals;
  filters;
  config;
  hass;
  renderCallback;
  updateItemsCallback;
  translations;
  boundClickHandler = void 0;
  boundChangeHandler = void 0;
  eventListenersSetup = !1;
  setupEventListeners() {
    if (this.eventListenersSetup) return;
    (this.renderRoot.addEventListener('click', (t) => {
      this.handleClick(t).catch((t) => {
        console.error('Error in handleClick:', t);
      });
    }),
      this.renderRoot.addEventListener('change', (t) => {
        this.handleChange(t);
      }),
      this.filters.setupSearchInput(this.config.entity, () => this.handleSearchChange()),
      (this.eventListenersSetup = !0));
    this.filters.getCurrentFilters(this.config.entity).showAdvanced &&
      this.initializeMultiSelects();
  }
  cleanupEventListeners() {
    (this.boundClickHandler && this.renderRoot.removeEventListener('click', this.boundClickHandler),
      this.boundChangeHandler &&
        this.renderRoot.removeEventListener('change', this.boundChangeHandler),
      (this.eventListenersSetup = !1));
  }
  updateDependencies(t, e) {
    ((this.config = t), (this.hass = e));
  }
  async handleClick(t) {
    const e = t.target,
      i = e.closest('[data-action][data-name]');
    if ('BUTTON' === i?.tagName && i.hasAttribute('data-processing'))
      return (t.preventDefault(), void t.stopPropagation());
    if (i?.dataset.action && i?.dataset.name)
      return (
        t.preventDefault(),
        t.stopPropagation(),
        void (await this.handleItemAction(i, i.dataset.action, i.dataset.name))
      );
    if (this.modals.handleModalClick(t)) return;
    const o = e.id;
    if (o && 'BUTTON' === e.tagName)
      switch (o) {
        case Vt: {
          (t.preventDefault(), t.stopPropagation());
          const e = this.getUniqueLocations(),
            i = this.getUniqueCategories();
          this.modals.openAddModal(this.translations, e, i);
          break;
        }
        case jt:
          (t.preventDefault(), t.stopPropagation(), await this.handleAddItem());
          break;
        case Wt:
          (t.preventDefault(), t.stopPropagation(), this.toggleAdvancedFilters());
          break;
        case Xt:
          (t.preventDefault(), t.stopPropagation(), this.clearFilters());
          break;
        default:
          return;
      }
    else if ('BUTTON' === e.tagName) {
      if (e.classList.contains(de))
        return (
          t.preventDefault(),
          t.stopPropagation(),
          void (e.closest(`#${Ct}`) && (await this.handleSaveEdits()))
        );
      if (e.classList.contains(ie))
        return (
          t.preventDefault(),
          t.stopPropagation(),
          void (e.closest(`#${zt}`)
            ? this.modals.closeAddModal()
            : e.closest(`#${Ct}`) && this.modals.closeEditModal())
        );
    }
  }
  handleChange(t) {
    const e = t.target;
    if (e.id === ee) {
      const t = this.filters.getCurrentFilters(this.config.entity);
      return (
        (t.sortMethod = e.value),
        this.filters.saveFilters(this.config.entity, t),
        void this.renderCallback()
      );
    }
    if (
      (e instanceof HTMLInputElement &&
        'checkbox' === e.type &&
        (e.id.includes('auto') || e.id.includes('AUTO_ADD')) &&
        setTimeout(() => {
          const t = e.parentElement?.querySelector('.auto-add-controls');
          t && (t.style.display = e.checked ? 'block' : 'none');
        }, 0),
      e.id === te && e instanceof HTMLInputElement)
    ) {
      const t = this.filters.getCurrentFilters(this.config.entity);
      ((t.searchText = e.value), this.filters.saveFilters(this.config.entity, t));
      const i = this.hass.states[this.config.entity];
      if (i) {
        const e = Ce.validateInventoryItems(i.attributes?.items || []),
          o = this.filters.filterItems(e, t),
          r = this.filters.sortItems(o, 'name', this.translations);
        (this.updateItemsCallback(r, 'name'),
          this.filters.updateFilterIndicators(t, this.translations));
      }
      return;
    }
  }
  handleSearchChange() {
    const t = this.hass.states[this.config.entity];
    if (!t) return;
    const e = this.filters.getCurrentFilters(this.config.entity),
      i = this.renderRoot.querySelector(ee),
      o = i?.value || ve.SORT_METHOD,
      r = Ce.validateInventoryItems(t.attributes?.items || []),
      n = this.filters.filterItems(r, e),
      a = this.filters.sortItems(n, o, this.translations);
    (this.updateItemsCallback(a, o), this.filters.updateFilterIndicators(e, this.translations));
  }
  async handleItemAction(t, e, i) {
    const o = 'BUTTON' === t.tagName;
    if (!o || (!t.hasAttribute('disabled') && 'true' !== t.getAttribute('aria-disabled'))) {
      o &&
        (t.setAttribute('data-processing', 'true'),
        t.setAttribute('disabled', 'true'),
        (t.style.opacity = '0.6'),
        (t.style.pointerEvents = 'none'));
      try {
        const t = Ce.getInventoryId(this.hass, this.config.entity);
        switch (e) {
          case me: {
            const e = this.hass.states[this.config.entity],
              o = Ce.validateInventoryItems(e?.attributes?.items || []).find((t) => t.name === i),
              r = {
                inventory_id: t,
                entity_id: this.config.entity,
                name: i,
                location: o?.location ?? '',
                category: o?.category ?? '',
                quantity: o?.quantity ?? 0,
                unit: o?.unit ?? '',
                description: o?.description ?? '',
                expiry_date: o?.expiry_date ?? '',
                expiry_alert_days: o?.expiry_alert_days ?? 0,
                auto_add_enabled: o?.auto_add_enabled ?? !1,
                auto_add_to_list_quantity: o?.auto_add_to_list_quantity ?? 0,
                todo_list: o?.todo_list ?? '',
              };
            (this.config.item_click_action?.service &&
              (await this.services.callItemClickAction(this.config.item_click_action, r)),
              await this.services.fireItemClickEvent(t, this.config.entity, i, o));
            break;
          }
          case ue:
            (await this.services.incrementItem(t, i), this.renderCallback());
            break;
          case he:
            (await this.services.decrementItem(t, i), this.renderCallback());
            break;
          case ye: {
            const e = De.localize(
              this.translations,
              'actions.confirm_remove',
              { name: i },
              `Remove ${i} from inventory?`,
            );
            confirm(e) && (await this.services.removeItem(t, i), this.renderCallback());
            break;
          }
          case ge: {
            const t = this.getFreshState(),
              e = this.getUniqueLocations(),
              o = this.getUniqueCategories();
            this.modals.openEditModal(i, () => t, this.translations, e, o);
            break;
          }
          default:
            console.warn(`Unknown action: ${e}`);
        }
      } catch (r) {
        console.error(`Error performing ${e} on ${i}:`, r);
      } finally {
        setTimeout(() => {
          'BUTTON' === t.tagName &&
            (t.setAttribute('data-processing', 'true'),
            t.removeAttribute('disabled'),
            (t.style.opacity = '1'),
            (t.style.pointerEvents = 'auto'));
        }, 200);
      }
    }
  }
  async handleAddItem() {
    (await this.modals.addItem(this.config)) && this.modals.closeAddModal();
  }
  async handleSaveEdits() {
    (await this.modals.saveEditModal(this.config)) && this.modals.closeEditModal();
  }
  toggleAdvancedFilters() {
    try {
      const t = this.filters.getCurrentFilters(this.config.entity);
      ((t.showAdvanced = !t.showAdvanced),
        this.filters.saveFilters(this.config.entity, t),
        this.renderCallback(),
        t.showAdvanced && this.initializeMultiSelects());
    } catch (t) {
      console.error('Error toggling advanced filters:', t);
    }
  }
  clearFilters() {
    try {
      this.filters.clearFilters(this.config.entity);
      const t = this.renderRoot.querySelector(te);
      (t && (t.value = ''), this.renderCallback());
      const e = this.filters.getCurrentFilters(this.config.entity);
      setTimeout(() => {
        (this.filters.updateFilterIndicators(e, this.translations),
          e.showAdvanced && this.initializeMultiSelects());
      }, 50);
    } catch (t) {
      console.error('Error clearing filters:', t);
      const e = De.localize(
        this.translations,
        'errors.clear_filters_error',
        void 0,
        'Error clearing filters. Please try again.',
      );
      alert(e);
    }
  }
  getUniqueLocations() {
    const t = this.hass.states[this.config.entity];
    if (!t?.attributes?.items) return [];
    const e = /* @__PURE__ */ new Set();
    return (
      Object.values(t.attributes.items).forEach((t) => {
        t.location?.trim() && e.add(t.location.trim());
      }),
      Array.from(e).sort((t, e) => t.localeCompare(e, void 0, { sensitivity: 'base' }))
    );
  }
  getUniqueCategories() {
    const t = this.hass.states[this.config.entity];
    if (!t?.attributes?.items) return [];
    const e = /* @__PURE__ */ new Set();
    return (
      Object.values(t.attributes.items).forEach((t) => {
        t.category?.trim() && e.add(t.category.trim());
      }),
      Array.from(e).sort((t, e) => t.localeCompare(e, void 0, { sensitivity: 'base' }))
    );
  }
  initializeMultiSelects() {
    const t = this.filters.getCurrentFilters(this.config.entity),
      e = this.getUniqueCategories(),
      i = this.getUniqueLocations();
    setTimeout(() => {
      (oi({
        id: Jt,
        options: e,
        selected: t.category,
        placeholder: De.localize(
          this.translations,
          'filters.all_categories',
          void 0,
          'All Categories',
        ),
        shadowRoot: this.renderRoot,
        onChange: (t) => {
          const e = this.filters.getCurrentFilters(this.config.entity);
          ((e.category = t),
            this.filters.saveFilters(this.config.entity, e),
            this.filters.updateFilterIndicators(e, this.translations),
            this.applyFiltersWithoutRender());
        },
      }),
        oi({
          id: Gt,
          options: i,
          selected: t.location,
          placeholder: De.localize(
            this.translations,
            'filters.all_locations',
            void 0,
            'All Locations',
          ),
          shadowRoot: this.renderRoot,
          onChange: (t) => {
            const e = this.filters.getCurrentFilters(this.config.entity);
            ((e.location = t),
              this.filters.saveFilters(this.config.entity, e),
              this.filters.updateFilterIndicators(e, this.translations),
              this.applyFiltersWithoutRender());
          },
        }),
        oi({
          id: Zt,
          options: ['none', 'expired', 'soon', 'future'],
          selected: t.expiry,
          placeholder: De.localize(this.translations, 'filters.all_items', void 0, 'All Items'),
          labels: {
            none: De.localize(this.translations, 'filters.no_expiry', void 0, 'No Expiry'),
            expired: De.localize(this.translations, 'filters.expired', void 0, 'Expired'),
            soon: De.localize(this.translations, 'filters.expiring_soon', void 0, 'Expiring Soon'),
            future: De.localize(this.translations, 'filters.future', void 0, 'Future'),
          },
          shadowRoot: this.renderRoot,
          onChange: (t) => {
            const e = this.filters.getCurrentFilters(this.config.entity);
            ((e.expiry = t),
              this.filters.saveFilters(this.config.entity, e),
              this.filters.updateFilterIndicators(e, this.translations),
              this.applyFiltersWithoutRender());
          },
        }),
        oi({
          id: Kt,
          options: ['zero', 'nonzero'],
          selected: t.quantity,
          placeholder: De.localize(
            this.translations,
            'filters.all_quantities',
            void 0,
            'All Quantities',
          ),
          labels: {
            zero: De.localize(this.translations, 'filters.zero', void 0, 'Zero'),
            nonzero: De.localize(this.translations, 'filters.non_zero', void 0, 'Non-zero'),
          },
          shadowRoot: this.renderRoot,
          onChange: (t) => {
            const e = this.filters.getCurrentFilters(this.config.entity);
            ((e.quantity = t),
              this.filters.saveFilters(this.config.entity, e),
              this.filters.updateFilterIndicators(e, this.translations),
              this.applyFiltersWithoutRender());
          },
        }));
    }, 0);
  }
  applyFiltersWithoutRender() {
    const t = this.hass.states[this.config.entity];
    if (!t) return;
    const e = this.filters.getCurrentFilters(this.config.entity),
      i = this.renderRoot.querySelector(`#${ee}`),
      o = i?.value || e.sortMethod || ve.SORT_METHOD,
      r = Ce.validateInventoryItems(t.attributes?.items || []),
      n = this.filters.filterItems(r, e),
      a = this.filters.sortItems(n, o, this.translations);
    this.updateItemsCallback(a, o);
  }
}
class ni {
  renderRoot;
  isInitialized = !1;
  services;
  constructor(t) {
    this.renderRoot = t;
  }
  initialize(t, e, i, o, r, n, a) {
    if (this.isInitialized && this.services) return this.services;
    if (t && e && this.renderRoot)
      try {
        const s = new Me(t),
          l = new He(this.renderRoot),
          d = new ei(this.renderRoot),
          c = new ii();
        c.setRenderCallback(i);
        const p = (e) => Ce.getInventoryId(t, e),
          h = new Ue(this.renderRoot, s, p, o),
          u = new ri(this.renderRoot, s, h, l, e, t, i, r, n, a);
        return (
          (this.services = {
            services: s,
            modals: h,
            filters: l,
            renderer: d,
            state: c,
            eventHandler: u,
          }),
          (this.isInitialized = !0),
          this.services
        );
      } catch (s) {
        return void console.error('Failed to initialize modules:', s);
      }
  }
  updateDependencies(t, e) {
    this.services && this.isInitialized && this.services.eventHandler.updateDependencies(e, t);
  }
  getServices() {
    return this.isInitialized ? this.services : void 0;
  }
  isReady() {
    return this.isInitialized && void 0 !== this.services;
  }
  cleanup() {
    (this.services &&
      (this.services.eventHandler?.cleanupEventListeners(),
      this.services.state?.cleanup(),
      this.services.modals?.destroy()),
      (this.services = void 0),
      (this.isInitialized = !1));
  }
}
class ai {
  lifecycleManager;
  renderRoot;
  updateTimeout = void 0;
  constructor(t, e) {
    ((this.lifecycleManager = t), (this.renderRoot = e));
  }
  render(t, e, i, o, r) {
    if (t && e && this.renderRoot)
      try {
        const n = t.entity,
          a = e.states[n];
        if (!a) {
          const t = De.localize(
            o,
            'errors.entity_not_found',
            { entity: n },
            `Entity ${n} not found. Please check your configuration.`,
          );
          return void this.renderError(t);
        }
        const s = this.lifecycleManager.getServices();
        if (!s) {
          const t = De.localize(
            o,
            'errors.initialization_failed',
            void 0,
            'Failed to initialize card components',
          );
          return void this.renderError(t);
        }
        const { filters: l, renderer: d, eventHandler: c, state: p } = s,
          h = l.getCurrentFilters(n),
          u = h.sortMethod || ve.SORT_METHOD,
          m = r(a.attributes?.items || []),
          g = l.filterItems(m, h),
          y = l.sortItems(g, u, o);
        (d.renderCard(a, n, y, h, u, i, o),
          c.setupEventListeners(),
          l.updateFilterIndicators(h, o),
          p.trackUserInteraction(this.renderRoot));
      } catch (n) {
        console.error('Error rendering card:', n);
        const t = De.localize(
          o,
          'errors.render_error',
          void 0,
          'An error occurred while rendering the card',
        );
        this.renderError(t);
      }
  }
  updateItemsOnly(t, e, i, o) {
    if (!this.renderRoot) return;
    const r = this.renderRoot.querySelector('.items-container');
    r &&
      Promise.resolve()
        .then(() => Ke)
        .then(({ createItemsList: n }) => {
          r.innerHTML = n(t, e, i, o || {});
        })
        .catch((t) => {
          console.error('Error loading templates:', t);
        });
  }
  debouncedRender(t) {
    (this.updateTimeout && clearTimeout(this.updateTimeout),
      (this.updateTimeout = setTimeout(() => t(), 100)));
  }
  refreshAfterSave(t) {
    setTimeout(() => t(), 50);
  }
  renderError(t, e) {
    if (!this.renderRoot) return;
    const i = this.lifecycleManager.getServices();
    if (i?.renderer) i.renderer.renderError(t);
    else {
      const i = e ? De.localize(e, 'common.error', void 0, 'Error') : 'Error';
      this.renderRoot.innerHTML = `\n        <ha-card>\n          <div class="card-content">\n            <div class="error-message" style="color: var(--error-color); padding: 16px; text-align: center;">\n              <p><strong>${i}:</strong> ${Ce.sanitizeHtml(t)}</p>\n            </div>\n          </div>\n        </ha-card>\n      `;
    }
  }
  cleanup() {
    this.updateTimeout && (clearTimeout(this.updateTimeout), (this.updateTimeout = void 0));
  }
}
let si = 'A card to manage your inventories';
class li extends st {
  _config = void 0;
  _hass = void 0;
  _todoLists = [];
  _translations = {};
  lifecycleManager;
  renderingCoordinator;
  constructor() {
    (super(),
      this.attachShadow({ mode: 'open' }),
      (this.lifecycleManager = new ni(this.shadowRoot)),
      (this.renderingCoordinator = new ai(this.lifecycleManager, this.shadowRoot)));
  }
  setConfig(t) {
    if (!t.entity) throw new Error('Entity is required');
    this._config = t;
  }
  set hass(t) {
    const e = this._hass;
    if (((this._hass = t), !e))
      return void this._loadTranslations().then(() => {
        (this._updateTodoLists(), this.render());
      });
    if (e && (e.language !== t.language || e.selectedLanguage !== t.selectedLanguage))
      return void this._loadTranslations().then(() => {
        (this._updateTodoLists(), this.render());
      });
    if ((this._updateTodoLists(), !e)) return void this.render();
    const i = this._config?.entity;
    if (i) {
      this.lifecycleManager.updateDependencies(this._hass, this._config);
      const e = this.lifecycleManager.getServices();
      e &&
        e.state.hasRealEntityChange(t, i) &&
        (e.state.userInteracting ? e.state.debouncedRender() : this.render());
    }
  }
  render() {
    if (
      this._config &&
      this._hass &&
      this.renderRoot &&
      this._translations &&
      0 !== Object.keys(this._translations).length
    ) {
      if (!this.lifecycleManager.isReady()) {
        if (
          !this.lifecycleManager.initialize(
            this._hass,
            this._config,
            () => this.render(),
            () => this._refreshAfterSave(),
            (t, e) => this._updateItemsOnly(t, e),
            () => ({ hass: this._hass, config: this._config, translations: this._translations }),
            this._translations,
          )
        )
          return void this.renderingCoordinator.renderError('Failed to initialize card components');
      }
      this.renderingCoordinator.render(
        this._config,
        this._hass,
        this._todoLists,
        this._translations,
        (t) => Ce.validateInventoryItems(t),
      );
    }
  }
  async _loadTranslations() {
    const t = this._hass?.language || this._hass?.selectedLanguage || 'en';
    try {
      this._translations = await De.loadTranslations(t);
    } catch (e) {
      (console.warn('Failed to load translations:', e), (this._translations = {}));
    }
  }
  localize(t, e, i) {
    return De.localize(this._translations, t, e, i);
  }
  _refreshAfterSave() {
    this.renderingCoordinator.refreshAfterSave(() => this.render());
  }
  _updateItemsOnly(t, e) {
    this.renderingCoordinator.updateItemsOnly(t, e, this._todoLists, this._translations);
  }
  _updateTodoLists() {
    this._hass && (this._todoLists = Ce.extractTodoLists(this._hass));
  }
  getCardSize() {
    return 4;
  }
  static getConfigElement() {
    return document.createElement('simple-inventory-config-editor');
  }
  static getStubConfig() {
    return {};
  }
}
(!(async function () {
  try {
    const t = document.documentElement.lang || navigator.language.substring(0, 2) || 'en',
      e = await De.loadTranslations(t),
      i = De.localize(e, 'card.description', void 0, si);
    if (i !== si) {
      si = i;
      const t = window.customCards?.find((t) => 'simple-inventory-card' === t.type);
      t && (t.description = si);
    }
  } catch (t) {
    console.warn('Failed to load card description translation:', t);
  }
})(),
  customElements.get('simple-inventory-card') || customElements.define('simple-inventory-card', li),
  customElements.get('simple-inventory-config-editor') ||
    customElements.define('simple-inventory-config-editor', Re),
  (window.customCards = window.customCards || []));
const di = {
  type: 'simple-inventory-card',
  name: 'Simple Inventory Card',
  description: si,
  preview: !0,
  documentationURL: 'https://github.com/blaineventurine/simple-inventory-card',
};
(window.customCards.find((t) => 'simple-inventory-card' === t.type) || window.customCards.push(di),
  globalThis.setTimeout(() => {
    const t = new Event('custom_card_update', { bubbles: !0, cancelable: !1 });
    document.dispatchEvent(t);
  }, 2e3),
  console.info(
    `%c Simple Inventory Card %c ${t}`,
    'color: steelblue; background: black; font-weight: bold;',
  ));
export { Re as ConfigEditor, li as SimpleInventoryCard };
