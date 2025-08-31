
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function sfc32(a, b, c, d) {
        return function () {
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            d >>>= 0;
            var t = (a + b) | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            d = d + 1 | 0;
            t = t + d | 0;
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }
    }

    function xmur3(str) {
        for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
            h = h << 13 | h >>> 19;
        }
        return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        }
    }

    let rand;
    let seed = (seed) => {
        let gen = xmur3(seed);
        rand = sfc32(gen(), gen(), gen(), gen());
    };


    function randomChoice(arr) {
        return arr[Math.floor(arr.length * rand())];
    }

    let loadWords = async (path) => fetch(path)
        .then(response => response.text()).then(t => {
            let a = t.split('\n');
            a.pop();
            return a;
        });


    let solveCover = (Y) => {
        // Y is a list of list of elements
        let X = new Map();
        for (let y of Y) {
            for (let x of y) {
                if (!X.has(x))
                    X.set(x, new Set());
                X.get(x).add(y);
            }
        }
        let solution = new Array();
        let rec = () => {
            if (X.size == 0)
                return solution;
            let c = X.keys().next().value;
            for (const x of X.keys()) {
                if (X.get(x).size < X.get(c).size)
                    c = x;
            }
            for (let r of X.get(c)) {
                solution.push(r);
                let cols = select(X, r);
                let ans = rec();
                if (ans) return ans;
                deselect(X, r, cols);
                solution.pop();
            }
            return false;
        };
        return rec();
    };

    let select = (X, r) => {
        let cols = new Array();
        for (let j of r) {
            for (let i of X.get(j))
                for (let k of i)
                    if (k != j)
                        X.get(k).delete(i);
            cols.push(X.get(j)), X.delete(j);
        }
        return cols;
    };
    let deselect = (X, r, cols) => {
        for (let j of Array.from(r).reverse()) {
            X.set(j, cols.pop());
            for (let i of X.get(j))
                for (let k of i)
                    if (k != j)
                        X.get(k).add(i);
        }
    };


    let unorderedTriples = (set) => {
        let ans = new Array();
        let ar = Array.from(new Set(set));
        for (let i = 0; i < ar.length; i++) {
            for (let j = i + 1; j < ar.length; j++) {
                for (let k = j + 1; k < ar.length; k++) {
                    ans.push(ar[i] + ar[j] + ar[k]);

                }
            }
        }
        return ans;
    };


    let pairs = (set) => {
        let ar = Array.from(new Set(set));
        let ans = new Array();
        for (let i = 0; i < ar.length; i++) {
            for (let j = i + 1; j < ar.length; j++) {
                ans.push(ar[i] + ar[j]);

            }
        }
        return ans
    };
    let partition = (w1, w2) => {
        let w = w1 + w2.slice(1);
        let Y = new Array();
        for (let tri of unorderedTriples(w)) {
            if (pairs(tri).some(x => w.indexOf(x) != -1))
                continue;
            Y.push(tri);
        }
        return solveCover(Y);
    };
    let genPair = (words, wbfl, unique) => {
        while (1) {
            let w1 = randomChoice(words);
            let w2 = randomChoice(wbfl.get(w1.slice(-1)));
            if (new Set(w1 + w2).size == 12 && (!unique || (w1 + w2).length == 13))
                return [w1, w2];
        }
    };
    let getDate = (day) => {
        if (!day)
            day = new Date();
        return (
            day.getFullYear() +
            "-" +
            (day.getMonth() + 1) +
            "-" +
            day.getDate()
        );
    };

    let yesterday = () => {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return getDate(date);
    };

    let makeGenerate = (words) => {
        let wbfl = new Map();
        for (let w of words) {
            let c = w[0];
            if (!wbfl.has(c))
                wbfl.set(c, new Array());
            wbfl.get(c).push(w);
        }
        return (s) => {
            if (s)
                seed(s);
            while (true) {
                let [w1, w2] = genPair(words, wbfl, true);
                let puzzle = partition(w1, w2);
                if (puzzle)
                    return puzzle;
            }
        }

    };

    let makeCheck = (words) => (w) => {
        w = w.toLowerCase();
        let a = 0,
            b = words.length;
        while (b - a > 1) {
            let c = Math.floor((a + b) / 2);
            if (w < words[c])
                b = c;
            else
                a = c;
        }
        return w == words[a];
    };

    let makeSolve = (words) => (puzzle) => {
        puzzle = puzzle.toLowerCase();
        let valid = (w) => {
            let last = null;
            for (let c of w) {
                let i = puzzle.indexOf(c);
                if (i == -1 || i == last)
                    return false;
                last = i;
            }
            return true;
        };
        let ltp = new Map();
        for (let w of words) {
            if (!valid(w))
                continue;
            for (let [i, c] of [
                    [0, w.slice(-1)],
                    [1, w[0]]
                ]) {
                if (!ltp.has(c))
                    ltp.set(c, [
                        [],
                        []
                    ]);
                ltp.get(c)[i].push(w);
            }
        }
        let ans = [];
        for (let [l1, l2] of ltp.values()) {
            for (let w1 of l1) {
                for (let w2 of l2) {
                    if ((w1 + w2).length == 13 && new Set(w1 + w2).size == 12)
                        ans.push([w1, w2]);
                }
            }
        }
        return ans;
    };

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[40] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[40] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[48] = list[i];
    	child_ctx[50] = i;
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[51] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    // (163:4) {#if help}
    function create_if_block_5(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let ul;
    	let li0;
    	let t3;
    	let li1;
    	let t5;
    	let li2;
    	let t7;
    	let li3;
    	let t9;
    	let li4;
    	let t10;
    	let br0;
    	let t11;
    	let t12;
    	let li5;
    	let t14;
    	let li6;
    	let t16;
    	let li7;
    	let t17;
    	let br1;
    	let t18;
    	let t19;
    	let p0;
    	let t20;
    	let a0;
    	let t22;
    	let t23;
    	let p1;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "How to Play";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Connect letters to spell words";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "Words must be at least 3 letters long";
    			t5 = space();
    			li2 = element("li");
    			li2.textContent = "Letters can be reused";
    			t7 = space();
    			li3 = element("li");
    			li3.textContent = "Consecutive letters cannot be from the same side";
    			t9 = space();
    			li4 = element("li");
    			t10 = text("The last letter of a word becomes the first letter of\n                        the next word ");
    			br0 = element("br");
    			t11 = text("\n                        e.g. THY > YES > SINCE");
    			t12 = space();
    			li5 = element("li");
    			li5.textContent = "Words cannot be proper nouns or hyphenated";
    			t14 = space();
    			li6 = element("li");
    			li6.textContent = "Use all letters to solve!";
    			t16 = space();
    			li7 = element("li");
    			t17 = text("There is always a solution with two words that repeats\n                        only the common letter ");
    			br1 = element("br");
    			t18 = text("\n                        e.g. LANDS > SECURITY");
    			t19 = space();
    			p0 = element("p");
    			t20 = text("Inspired by the ");
    			a0 = element("a");
    			a0.textContent = "NYT's Letter Boxed";
    			t22 = text(".");
    			t23 = space();
    			p1 = element("p");
    			a1 = element("a");
    			a1.textContent = "Source code and trivia";
    			set_style(h3, "margin-top", ".5em");
    			add_location(h3, file, 171, 16, 5816);
    			add_location(li0, file, 173, 20, 5903);
    			add_location(li1, file, 174, 20, 5963);
    			add_location(li2, file, 175, 20, 6030);
    			add_location(li3, file, 176, 20, 6081);
    			add_location(br0, file, 179, 38, 6280);
    			add_location(li4, file, 177, 20, 6159);
    			add_location(li5, file, 182, 20, 6380);
    			add_location(li6, file, 183, 20, 6452);
    			add_location(br1, file, 186, 47, 6638);
    			add_location(li7, file, 184, 20, 6507);
    			attr_dev(a0, "href", "https://www.nytimes.com/puzzles/letter-boxed");
    			add_location(a0, file, 190, 40, 6781);
    			add_location(p0, file, 189, 20, 6737);
    			attr_dev(a1, "href", "https://github.com/louisabraham/litterboxed");
    			add_location(a1, file, 196, 24, 7015);
    			add_location(p1, file, 195, 20, 6987);
    			attr_dev(ul, "class", "svelte-en8w94");
    			add_location(ul, file, 172, 16, 5878);
    			attr_dev(div0, "class", "modal-content svelte-en8w94");
    			add_location(div0, file, 170, 12, 5772);
    			attr_dev(div1, "class", "modal svelte-en8w94");
    			add_location(div1, file, 163, 8, 5597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(ul, t7);
    			append_dev(ul, li3);
    			append_dev(ul, t9);
    			append_dev(ul, li4);
    			append_dev(li4, t10);
    			append_dev(li4, br0);
    			append_dev(li4, t11);
    			append_dev(ul, t12);
    			append_dev(ul, li5);
    			append_dev(ul, t14);
    			append_dev(ul, li6);
    			append_dev(ul, t16);
    			append_dev(ul, li7);
    			append_dev(li7, t17);
    			append_dev(li7, br1);
    			append_dev(li7, t18);
    			append_dev(ul, t19);
    			append_dev(ul, p0);
    			append_dev(p0, t20);
    			append_dev(p0, a0);
    			append_dev(p0, t22);
    			append_dev(ul, t23);
    			append_dev(ul, p1);
    			append_dev(p1, a1);
    			/*div1_binding*/ ctx[31](div1);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[32], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			/*div1_binding*/ ctx[31](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(163:4) {#if help}",
    		ctx
    	});

    	return block;
    }

    // (206:8) {#if message}
    function create_if_block_4(ctx) {
    	let span;
    	let t;
    	let span_transition;
    	let current;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*message*/ ctx[3]);
    			set_style(span, "position", "absolute");
    			set_style(span, "left", "0");
    			set_style(span, "right", "0");
    			set_style(span, "font-size", "medium");
    			attr_dev(span, "class", "message svelte-en8w94");
    			add_location(span, file, 206, 12, 7301);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*message*/ 8) set_data_dev(t, /*message*/ ctx[3]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!span_transition) span_transition = create_bidirectional_transition(span, fade, {}, true);
    				span_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!span_transition) span_transition = create_bidirectional_transition(span, fade, {}, false);
    			span_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching && span_transition) span_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(206:8) {#if message}",
    		ctx
    	});

    	return block;
    }

    // (219:8) {:else}
    function create_else_block_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "YOU WIN!";
    			attr_dev(span, "class", "blink svelte-en8w94");
    			set_style(span, "display", "inline");
    			add_location(span, file, 219, 12, 7784);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(219:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (213:8) {#if !done}
    function create_if_block_3(ctx) {
    	let span0;
    	let t0;
    	let span1;
    	let t1;
    	let span1_style_value;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text(/*currentWord*/ ctx[1]);
    			span1 = element("span");
    			t1 = text(/*caret*/ ctx[10]);
    			set_style(span0, "display", "inline");
    			add_location(span0, file, 213, 12, 7529);
    			attr_dev(span1, "class", "unselectable svelte-en8w94");
    			attr_dev(span1, "style", span1_style_value = (/*currentWord*/ ctx[1] ? "width: 0em;" : "") + "display: inline-block;");
    			add_location(span1, file, 213, 62, 7579);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentWord*/ 2) set_data_dev(t0, /*currentWord*/ ctx[1]);
    			if (dirty[0] & /*caret*/ 1024) set_data_dev(t1, /*caret*/ ctx[10]);

    			if (dirty[0] & /*currentWord*/ 2 && span1_style_value !== (span1_style_value = (/*currentWord*/ ctx[1] ? "width: 0em;" : "") + "display: inline-block;")) {
    				attr_dev(span1, "style", span1_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(213:8) {#if !done}",
    		ctx
    	});

    	return block;
    }

    // (249:16) {#if i + 1 < word.length}
    function create_if_block_2(ctx) {
    	let line;
    	let line_x__value;
    	let line_y__value;
    	let line_x__value_1;
    	let line_y__value_1;
    	let line_stroke_value;
    	let line_stroke_dasharray_value;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			attr_dev(line, "x1", line_x__value = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*l*/ ctx[51]))].x);
    			attr_dev(line, "y1", line_y__value = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*l*/ ctx[51]))].y);
    			attr_dev(line, "x2", line_x__value_1 = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*word*/ ctx[48][/*i*/ ctx[47] + 1]))].x);
    			attr_dev(line, "y2", line_y__value_1 = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*word*/ ctx[48][/*i*/ ctx[47] + 1]))].y);

    			attr_dev(line, "stroke", line_stroke_value = /*pos*/ ctx[50] == /*previousWords*/ ctx[2].length
    			? "#ff3e00"
    			: "#ff3e0080");

    			attr_dev(line, "stroke-width", /*stroke*/ ctx[24]);

    			attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*pos*/ ctx[50] == /*previousWords*/ ctx[2].length
    			? 2
    			: 0);

    			add_location(line, file, 249, 20, 8704);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*letters, previousWords, currentWord*/ 7 && line_x__value !== (line_x__value = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*l*/ ctx[51]))].x)) {
    				attr_dev(line, "x1", line_x__value);
    			}

    			if (dirty[0] & /*letters, previousWords, currentWord*/ 7 && line_y__value !== (line_y__value = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*l*/ ctx[51]))].y)) {
    				attr_dev(line, "y1", line_y__value);
    			}

    			if (dirty[0] & /*letters, previousWords, currentWord*/ 7 && line_x__value_1 !== (line_x__value_1 = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*word*/ ctx[48][/*i*/ ctx[47] + 1]))].x)) {
    				attr_dev(line, "x2", line_x__value_1);
    			}

    			if (dirty[0] & /*letters, previousWords, currentWord*/ 7 && line_y__value_1 !== (line_y__value_1 = /*circles*/ ctx[20][/*revindex*/ ctx[26](/*letters*/ ctx[0].indexOf(/*word*/ ctx[48][/*i*/ ctx[47] + 1]))].y)) {
    				attr_dev(line, "y2", line_y__value_1);
    			}

    			if (dirty[0] & /*previousWords*/ 4 && line_stroke_value !== (line_stroke_value = /*pos*/ ctx[50] == /*previousWords*/ ctx[2].length
    			? "#ff3e00"
    			: "#ff3e0080")) {
    				attr_dev(line, "stroke", line_stroke_value);
    			}

    			if (dirty[0] & /*previousWords*/ 4 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*pos*/ ctx[50] == /*previousWords*/ ctx[2].length
    			? 2
    			: 0)) {
    				attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(249:16) {#if i + 1 < word.length}",
    		ctx
    	});

    	return block;
    }

    // (248:12) {#each word as l, i}
    function create_each_block_4(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[47] + 1 < /*word*/ ctx[48].length && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*i*/ ctx[47] + 1 < /*word*/ ctx[48].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(248:12) {#each word as l, i}",
    		ctx
    	});

    	return block;
    }

    // (247:8) {#each [...previousWords, currentWord] as word, pos}
    function create_each_block_3(ctx) {
    	let each_1_anchor;
    	let each_value_4 = /*word*/ ctx[48];
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*circles, revindex, letters, previousWords, currentWord, stroke*/ 84934663) {
    				each_value_4 = /*word*/ ctx[48];
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_4.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(247:8) {#each [...previousWords, currentWord] as word, pos}",
    		ctx
    	});

    	return block;
    }

    // (265:8) {#each circles as c, i}
    function create_each_block_2(ctx) {
    	let circle;
    	let circle_fill_value;
    	let text_1;
    	let t_value = /*letters*/ ctx[0][/*index*/ ctx[25](/*i*/ ctx[47])] + "";
    	let t;
    	let rect;
    	let mounted;
    	let dispose;

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[34](/*i*/ ctx[47]);
    	}

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			text_1 = svg_element("text");
    			t = text(t_value);
    			rect = svg_element("rect");
    			attr_dev(circle, "cx", /*c*/ ctx[45].x);
    			attr_dev(circle, "cy", /*c*/ ctx[45].y);
    			attr_dev(circle, "r", "1");
    			attr_dev(circle, "fill", circle_fill_value = (/*lastLetter*/ ctx[13], /*currentWord*/ ctx[1], /*letterColor*/ ctx[30](/*index*/ ctx[25](/*i*/ ctx[47]))));
    			attr_dev(circle, "stroke", "black");
    			attr_dev(circle, "stroke-width", /*stroke*/ ctx[24]);
    			add_location(circle, file, 265, 12, 9400);
    			attr_dev(text_1, "text-anchor", "middle");
    			attr_dev(text_1, "dominant-baseline", "central");
    			attr_dev(text_1, "x", /*letters_pos*/ ctx[21][/*i*/ ctx[47]].x);
    			attr_dev(text_1, "y", /*letters_pos*/ ctx[21][/*i*/ ctx[47]].y);
    			attr_dev(text_1, "font-size", /*letter_size*/ ctx[22]);
    			attr_dev(text_1, "fill", "var(--text-color)");
    			add_location(text_1, file, 273, 12, 9648);
    			attr_dev(rect, "x", /*hitboxes*/ ctx[23][/*i*/ ctx[47]].x);
    			attr_dev(rect, "y", /*hitboxes*/ ctx[23][/*i*/ ctx[47]].y);
    			attr_dev(rect, "width", /*hitboxes*/ ctx[23][/*i*/ ctx[47]].width);
    			attr_dev(rect, "height", /*hitboxes*/ ctx[23][/*i*/ ctx[47]].height);
    			attr_dev(rect, "fill", "none");
    			attr_dev(rect, "stroke", "none");
    			attr_dev(rect, "stroke-width", ".1");
    			attr_dev(rect, "pointer-events", "fill");
    			add_location(rect, file, 282, 12, 9960);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);
    			insert_dev(target, rect, anchor);

    			if (!mounted) {
    				dispose = listen_dev(rect, "click", click_handler_2, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*lastLetter, currentWord*/ 8194 && circle_fill_value !== (circle_fill_value = (/*lastLetter*/ ctx[13], /*currentWord*/ ctx[1], /*letterColor*/ ctx[30](/*index*/ ctx[25](/*i*/ ctx[47]))))) {
    				attr_dev(circle, "fill", circle_fill_value);
    			}

    			if (dirty[0] & /*letters*/ 1 && t_value !== (t_value = /*letters*/ ctx[0][/*index*/ ctx[25](/*i*/ ctx[47])] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    			if (detaching) detach_dev(text_1);
    			if (detaching) detach_dev(rect);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(265:8) {#each circles as c, i}",
    		ctx
    	});

    	return block;
    }

    // (312:4) {:else}
    function create_else_block(ctx) {
    	let p0;
    	let t1;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Yesterday";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Help";
    			attr_dev(p0, "class", "link svelte-en8w94");
    			add_location(p0, file, 312, 8, 10904);
    			attr_dev(p1, "class", "link svelte-en8w94");
    			add_location(p1, file, 329, 8, 11496);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(p0, "click", /*click_handler_3*/ ctx[35], false, false, false, false),
    					listen_dev(p1, "click", /*click_handler_4*/ ctx[36], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(312:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (300:4) {#if displaySols}
    function create_if_block(ctx) {
    	let div;
    	let p;
    	let t1;
    	let t2;
    	let each_value_1 = /*solutions*/ ctx[8];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*allSolutions*/ ctx[9];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Some solutions for yesterday";
    			t1 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(p, file, 301, 12, 10559);
    			attr_dev(div, "class", "solutions");
    			add_location(div, file, 300, 8, 10523);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(div, null);
    				}
    			}

    			append_dev(div, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*solutions*/ 256) {
    				each_value_1 = /*solutions*/ ctx[8];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div, t2);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty[0] & /*allSolutions, solutions*/ 768) {
    				each_value = /*allSolutions*/ ctx[9];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(300:4) {#if displaySols}",
    		ctx
    	});

    	return block;
    }

    // (303:12) {#each solutions as sol}
    function create_each_block_1(ctx) {
    	let p;
    	let t_value = /*sol*/ ctx[40] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			set_style(p, "font-weight", "bold");
    			add_location(p, file, 303, 16, 10648);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*solutions*/ 256 && t_value !== (t_value = /*sol*/ ctx[40] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(303:12) {#each solutions as sol}",
    		ctx
    	});

    	return block;
    }

    // (307:16) {#if !solutions.includes(sol)}
    function create_if_block_1(ctx) {
    	let p;
    	let t_value = /*sol*/ ctx[40] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file, 307, 20, 10814);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*allSolutions*/ 512 && t_value !== (t_value = /*sol*/ ctx[40] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(307:16) {#if !solutions.includes(sol)}",
    		ctx
    	});

    	return block;
    }

    // (306:12) {#each allSolutions as sol}
    function create_each_block(ctx) {
    	let show_if = !/*solutions*/ ctx[8].includes(/*sol*/ ctx[40]);
    	let if_block_anchor;
    	let if_block = show_if && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*solutions, allSolutions*/ 768) show_if = !/*solutions*/ ctx[8].includes(/*sol*/ ctx[40]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(306:12) {#each allSolutions as sol}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let t2;
    	let div0;
    	let t3;
    	let t4;
    	let hr;
    	let t5;
    	let div1;
    	let p;
    	let t6;
    	let t7;
    	let svg;
    	let rect;
    	let each0_anchor;
    	let t8;
    	let div2;
    	let button0;
    	let t10;
    	let button1;
    	let t12;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*help*/ ctx[11] && create_if_block_5(ctx);
    	let if_block1 = /*message*/ ctx[3] && create_if_block_4(ctx);

    	function select_block_type(ctx, dirty) {
    		if (!/*done*/ ctx[15]) return create_if_block_3;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block2 = current_block_type(ctx);
    	let each_value_3 = [.../*previousWords*/ ctx[2], /*currentWord*/ ctx[1]];
    	validate_each_argument(each_value_3);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	let each_value_2 = /*circles*/ ctx[20];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	function select_block_type_1(ctx, dirty) {
    		if (/*displaySols*/ ctx[7]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block3 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "litter boxed";
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			div0 = element("div");
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if_block2.c();
    			t4 = space();
    			hr = element("hr");
    			t5 = space();
    			div1 = element("div");
    			p = element("p");
    			t6 = text(/*words*/ ctx[14]);
    			t7 = space();
    			svg = svg_element("svg");
    			rect = svg_element("rect");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			each0_anchor = empty();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			div2 = element("div");
    			button0 = element("button");
    			button0.textContent = "Delete";
    			t10 = space();
    			button1 = element("button");
    			button1.textContent = "Enter";
    			t12 = space();
    			if_block3.c();
    			attr_dev(h1, "class", "svelte-en8w94");
    			add_location(h1, file, 160, 4, 5551);
    			set_style(hr, "min-width", "10em");
    			set_style(hr, "max-width", "13em");
    			set_style(hr, "border", "1px solid var(--svg-stroke-color)");
    			set_style(hr, "margin-top", "0");
    			add_location(hr, file, 221, 8, 7866);
    			attr_dev(div0, "class", "current svelte-en8w94");
    			add_location(div0, file, 204, 4, 7245);
    			set_style(p, "width", "fit-content");
    			set_style(p, "margin", "auto");
    			add_location(p, file, 227, 8, 8046);
    			attr_dev(div1, "class", "words svelte-en8w94");
    			add_location(div1, file, 226, 4, 8018);
    			attr_dev(rect, "x", /*x*/ ctx[18]);
    			attr_dev(rect, "y", /*y*/ ctx[19]);
    			attr_dev(rect, "width", /*side*/ ctx[17]);
    			attr_dev(rect, "height", /*side*/ ctx[17]);
    			attr_dev(rect, "stroke", "var(--svg-stroke-color)");
    			attr_dev(rect, "stroke-width", /*stroke*/ ctx[24]);
    			attr_dev(rect, "fill", "none");
    			add_location(rect, file, 237, 8, 8345);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 42 42");
    			attr_dev(svg, "class", "svelte-en8w94");
    			add_location(svg, file, 236, 4, 8276);
    			attr_dev(button0, "class", "svelte-en8w94");
    			add_location(button0, file, 296, 8, 10382);
    			attr_dev(button1, "class", "svelte-en8w94");
    			add_location(button1, file, 297, 8, 10438);
    			attr_dev(div2, "class", "buttons svelte-en8w94");
    			add_location(div2, file, 295, 4, 10352);
    			attr_dev(main, "class", "svelte-en8w94");
    			add_location(main, file, 159, 0, 5540);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			if (if_block0) if_block0.m(main, null);
    			append_dev(main, t2);
    			append_dev(main, div0);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t3);
    			if_block2.m(div0, null);
    			append_dev(div0, t4);
    			append_dev(div0, hr);
    			append_dev(main, t5);
    			append_dev(main, div1);
    			append_dev(div1, p);
    			append_dev(p, t6);
    			append_dev(main, t7);
    			append_dev(main, svg);
    			append_dev(svg, rect);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(svg, null);
    				}
    			}

    			append_dev(svg, each0_anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(svg, null);
    				}
    			}

    			append_dev(main, t8);
    			append_dev(main, div2);
    			append_dev(div2, button0);
    			append_dev(div2, t10);
    			append_dev(div2, button1);
    			append_dev(main, t12);
    			if_block3.m(main, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(p, "click", /*click_handler_1*/ ctx[33], false, false, false, false),
    					listen_dev(button0, "click", /*deleteLetter*/ ctx[28], false, false, false, false),
    					listen_dev(button1, "click", /*enterWord*/ ctx[29], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*help*/ ctx[11]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					if_block0.m(main, t2);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*message*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*message*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div0, t4);
    				}
    			}

    			if (!current || dirty[0] & /*words*/ 16384) set_data_dev(t6, /*words*/ ctx[14]);

    			if (dirty[0] & /*previousWords, currentWord, circles, revindex, letters, stroke*/ 84934663) {
    				each_value_3 = [.../*previousWords*/ ctx[2], /*currentWord*/ ctx[1]];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_3(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(svg, each0_anchor);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_3.length;
    			}

    			if (dirty[0] & /*hitboxes, selectLetter, index, letters_pos, letter_size, letters, circles, lastLetter, currentWord, letterColor, stroke*/ 1274028035) {
    				each_value_2 = /*circles*/ ctx[20];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(svg, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type_1(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(main, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if_block2.d();
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let lastLetter;
    	let done;
    	let words;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let message = "loading";

    	let alert = msg => {
    		$$invalidate(3, message = msg);

    		setTimeout(
    			() => {
    				$$invalidate(3, message = "");
    			},
    			1000
    		);
    	};

    	let minlength = 3;
    	let side = 30;
    	let x = 6;
    	let y = 6;
    	let circles = [];
    	let letters_pos = [];
    	let letter_offset = 3.5;
    	let letter_size = 4;
    	let letters = "";

    	if (localStorage.getItem("date") != getDate()) {
    		localStorage.removeItem("puzzle");
    	}

    	letters = localStorage.getItem("puzzle") || "            ";
    	let generate, check, solve, solveAll;
    	let displaySols = false;
    	let solutions, allSolutions;

    	(async () => {
    		seed(getDate());
    		let easy = await loadWords("./easy.txt");
    		$$invalidate(4, generate = makeGenerate(easy));
    		$$invalidate(0, letters = generate(getDate()).join("").toUpperCase());
    		localStorage.setItem("puzzle", letters);
    		localStorage.setItem("date", getDate());
    		$$invalidate(3, message = "loading dict");
    		let scrabble = await loadWords("./scrabble.txt");
    		check = makeCheck(scrabble);
    		$$invalidate(3, message = " ");
    		$$invalidate(5, solve = makeSolve(easy));
    		$$invalidate(6, solveAll = makeSolve(scrabble));
    	})();

    	let hitboxes = [];

    	for (let i = 0; i < 3; i++) {
    		let offset = side / 3 * (i + 0.5);
    		circles.push({ x, y: y + offset });
    		letters_pos.push({ x: x - letter_offset, y: y + offset });

    		hitboxes.push({
    			x: x - letter_offset - letter_size / 2,
    			y: y + offset - letter_size / 2,
    			width: letter_size + letter_offset,
    			height: letter_size
    		});

    		circles.push({ x: x + side, y: y + offset });

    		letters_pos.push({
    			x: x + side + letter_offset,
    			y: y + offset
    		});

    		hitboxes.push({
    			x: x + side - letter_size / 2,
    			y: y + offset - letter_size / 2,
    			width: letter_size + letter_offset,
    			height: letter_size
    		});

    		circles.push({ x: x + offset, y });
    		letters_pos.push({ x: x + offset, y: y - letter_offset });

    		hitboxes.push({
    			x: x + offset - letter_size / 2,
    			y: y - letter_offset - letter_size / 2,
    			width: letter_size,
    			height: letter_size + letter_offset
    		});

    		circles.push({ x: x + offset, y: y + side });

    		letters_pos.push({
    			x: x + offset,
    			y: y + side + letter_offset
    		});

    		hitboxes.push({
    			x: x + offset - letter_size / 2,
    			y: y + side - letter_size / 2,
    			width: letter_size,
    			height: letter_size + letter_offset
    		});
    	}

    	let stroke = 0.3;
    	let index = i => i % 4 * 3 + Math.floor(i / 4);
    	let revindex = i => i % 3 * 4 + Math.floor(i / 3);
    	let currentWord = "";

    	let selectLetter = i => {
    		if (done) return;
    		if (Math.floor(lastLetter / 3) != Math.floor(i / 3)) $$invalidate(1, currentWord = currentWord + letters[i]);
    	};

    	let deleteLetter = () => {
    		$$invalidate(1, currentWord = currentWord.slice(0, -1));

    		if (currentWord == "") if (previousWords.length) {
    			$$invalidate(1, currentWord = previousWords.pop());
    			$$invalidate(2, previousWords);
    		}
    	};

    	let previousWords = [];

    	let enterWord = () => {
    		if (done) return;
    		if (currentWord.length < minlength) return alert("Too short");
    		if (!check(currentWord)) return alert("Not a word");
    		$$invalidate(2, previousWords = [...previousWords, currentWord]);
    		$$invalidate(1, currentWord = currentWord.slice(-1));
    		if (done) $$invalidate(1, currentWord = "");
    	};

    	let caret = "█";

    	setInterval(
    		() => {
    			$$invalidate(10, caret = caret ? "" : "█");
    		},
    		500
    	);

    	// UPDATED letterColor function
    	let letterColor = i => {
    		if (i == lastLetter) return "#ff3e00"; // Accent color, no change needed
    		if (previousWords.join("").indexOf(letters[i]) > -1) return "red"; // Grey for used letters, can be a CSS var if you want it to change

    		// For currently selected letters, use --text-color
    		if (currentWord.indexOf(letters[i]) > -1) {
    			// We can't directly use var() in JS for an inline style without a store
    			// For this specific use case, returning 'black' for light mode and 'white' for dark mode might be simpler
    			// Or, we need to create a reactive value for text-color in Svelte script or directly apply to SVG text element
    			// For now, let's keep it simple and ensure the <text> element itself uses var(--text-color)
    			return "white"; // Make circle fill transparent, text color handles the letter
    		}

    		return "white"; // Default circle fill
    	};

    	document.addEventListener("keydown", function (event) {
    		if (event.key == "Enter") {
    			enterWord();
    		} else if (event.key == "Backspace") {
    			deleteLetter();
    		} else {
    			let i = letters.indexOf(event.key.toUpperCase());
    			if (i != -1) selectLetter(i);
    		}
    	});

    	let help = false;
    	let modal;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			modal = $$value;
    			$$invalidate(12, modal);
    		});
    	}

    	const click_handler = evt => {
    		$$invalidate(11, help = evt.target != modal);
    	};

    	const click_handler_1 = () => {
    		(navigator.clipboard.writeText(words), alert("copied"));
    	};

    	const click_handler_2 = i => selectLetter(index(i));

    	const click_handler_3 = () => {
    		$$invalidate(7, displaySols = true);
    		let yesterdayPuzzle = generate(yesterday()).join("").toUpperCase();
    		$$invalidate(0, letters = yesterdayPuzzle);
    		$$invalidate(2, previousWords = []);
    		$$invalidate(1, currentWord = "");
    		let format = s => `${s[0]} - ${s[1]}`;
    		$$invalidate(8, solutions = solve(yesterdayPuzzle).map(format));
    		$$invalidate(9, allSolutions = solveAll(yesterdayPuzzle).map(format));
    	};

    	const click_handler_4 = () => {
    		$$invalidate(11, help = true);
    	};

    	$$self.$capture_state = () => ({
    		seed,
    		getDate,
    		yesterday,
    		loadWords,
    		makeGenerate,
    		makeCheck,
    		makeSolve,
    		fade,
    		message,
    		alert,
    		minlength,
    		side,
    		x,
    		y,
    		circles,
    		letters_pos,
    		letter_offset,
    		letter_size,
    		letters,
    		generate,
    		check,
    		solve,
    		solveAll,
    		displaySols,
    		solutions,
    		allSolutions,
    		hitboxes,
    		stroke,
    		index,
    		revindex,
    		currentWord,
    		selectLetter,
    		deleteLetter,
    		previousWords,
    		enterWord,
    		caret,
    		letterColor,
    		help,
    		modal,
    		lastLetter,
    		words,
    		done
    	});

    	$$self.$inject_state = $$props => {
    		if ('message' in $$props) $$invalidate(3, message = $$props.message);
    		if ('alert' in $$props) $$invalidate(16, alert = $$props.alert);
    		if ('minlength' in $$props) minlength = $$props.minlength;
    		if ('side' in $$props) $$invalidate(17, side = $$props.side);
    		if ('x' in $$props) $$invalidate(18, x = $$props.x);
    		if ('y' in $$props) $$invalidate(19, y = $$props.y);
    		if ('circles' in $$props) $$invalidate(20, circles = $$props.circles);
    		if ('letters_pos' in $$props) $$invalidate(21, letters_pos = $$props.letters_pos);
    		if ('letter_offset' in $$props) letter_offset = $$props.letter_offset;
    		if ('letter_size' in $$props) $$invalidate(22, letter_size = $$props.letter_size);
    		if ('letters' in $$props) $$invalidate(0, letters = $$props.letters);
    		if ('generate' in $$props) $$invalidate(4, generate = $$props.generate);
    		if ('check' in $$props) check = $$props.check;
    		if ('solve' in $$props) $$invalidate(5, solve = $$props.solve);
    		if ('solveAll' in $$props) $$invalidate(6, solveAll = $$props.solveAll);
    		if ('displaySols' in $$props) $$invalidate(7, displaySols = $$props.displaySols);
    		if ('solutions' in $$props) $$invalidate(8, solutions = $$props.solutions);
    		if ('allSolutions' in $$props) $$invalidate(9, allSolutions = $$props.allSolutions);
    		if ('hitboxes' in $$props) $$invalidate(23, hitboxes = $$props.hitboxes);
    		if ('stroke' in $$props) $$invalidate(24, stroke = $$props.stroke);
    		if ('index' in $$props) $$invalidate(25, index = $$props.index);
    		if ('revindex' in $$props) $$invalidate(26, revindex = $$props.revindex);
    		if ('currentWord' in $$props) $$invalidate(1, currentWord = $$props.currentWord);
    		if ('selectLetter' in $$props) $$invalidate(27, selectLetter = $$props.selectLetter);
    		if ('deleteLetter' in $$props) $$invalidate(28, deleteLetter = $$props.deleteLetter);
    		if ('previousWords' in $$props) $$invalidate(2, previousWords = $$props.previousWords);
    		if ('enterWord' in $$props) $$invalidate(29, enterWord = $$props.enterWord);
    		if ('caret' in $$props) $$invalidate(10, caret = $$props.caret);
    		if ('letterColor' in $$props) $$invalidate(30, letterColor = $$props.letterColor);
    		if ('help' in $$props) $$invalidate(11, help = $$props.help);
    		if ('modal' in $$props) $$invalidate(12, modal = $$props.modal);
    		if ('lastLetter' in $$props) $$invalidate(13, lastLetter = $$props.lastLetter);
    		if ('words' in $$props) $$invalidate(14, words = $$props.words);
    		if ('done' in $$props) $$invalidate(15, done = $$props.done);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*currentWord, letters*/ 3) {
    			$$invalidate(13, lastLetter = currentWord
    			? letters.indexOf(currentWord.slice(-1))
    			: -1);
    		}

    		if ($$self.$$.dirty[0] & /*previousWords, letters*/ 5) {
    			$$invalidate(15, done = [...Array(12).keys()].every(i => previousWords.join("").indexOf(letters[i]) > -1));
    		}

    		if ($$self.$$.dirty[0] & /*previousWords*/ 4) {
    			$$invalidate(14, words = previousWords.join(" - "));
    		}
    	};

    	return [
    		letters,
    		currentWord,
    		previousWords,
    		message,
    		generate,
    		solve,
    		solveAll,
    		displaySols,
    		solutions,
    		allSolutions,
    		caret,
    		help,
    		modal,
    		lastLetter,
    		words,
    		done,
    		alert,
    		side,
    		x,
    		y,
    		circles,
    		letters_pos,
    		letter_size,
    		hitboxes,
    		stroke,
    		index,
    		revindex,
    		selectLetter,
    		deleteLetter,
    		enterWord,
    		letterColor,
    		div1_binding,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
