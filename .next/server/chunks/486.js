"use strict";
exports.id = 486;
exports.ids = [486];
exports.modules = {

/***/ 4934:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { EMPTY_BUFFER } = __webpack_require__(3337);

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

try {
  const bufferUtil = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = {
    concat,
    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    },
    toArrayBuffer,
    toBuffer,
    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    }
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}


/***/ }),

/***/ 3337:
/***/ ((module) => {



module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};


/***/ }),

/***/ 6237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { kForOnEventAttribute, kListener } = __webpack_require__(3337);

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, listener, options = {}) {
    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
    wrapper[kListener] = listener;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {Function} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

module.exports = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};


/***/ }),

/***/ 1735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { tokenChars } = __webpack_require__(4827);

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = { format, parse };


/***/ }),

/***/ 9466:
/***/ ((module) => {



const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

module.exports = Limiter;


/***/ }),

/***/ 3394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const zlib = __webpack_require__(9796);

const bufferUtil = __webpack_require__(4934);
const Limiter = __webpack_require__(9466);
const { kStatusCode } = __webpack_require__(3337);

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}


/***/ }),

/***/ 7881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Writable } = __webpack_require__(2781);

const PerMessageDeflate = __webpack_require__(3394);
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__(3337);
const { concat, toArrayBuffer, unmask } = __webpack_require__(4934);
const { isValidStatusCode, isValidUTF8 } = __webpack_require__(4827);

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER);
        this.end();
      } else if (data.length === 1) {
        return error(
          RangeError,
          'invalid payload length 1',
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode] = statusCode;
  return err;
}


/***/ }),

/***/ 485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */



const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { randomFillSync } = __webpack_require__(6113);

const PerMessageDeflate = __webpack_require__(3394);
const { EMPTY_BUFFER } = __webpack_require__(3337);
const { isValidStatusCode } = __webpack_require__(4827);
const { mask: applyMask, toBuffer } = __webpack_require__(4934);

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;


/***/ }),

/***/ 8724:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Duplex } = __webpack_require__(2781);

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */
function emitClose(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg, isBinary) {
    const data =
      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) ws.pause();
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.
    terminateOnDestroy = false;
    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });

    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.isPaused) ws.resume();
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;


/***/ }),

/***/ 4516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { tokenChars } = __webpack_require__(4827);

/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */
function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (
      i !== 0 &&
      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c /* ',' */) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;

      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

module.exports = { parse };


/***/ }),

/***/ 4827:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

try {
  const isValidUTF8 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = {
    isValidStatusCode,
    isValidUTF8(buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    },
    tokenChars
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    isValidStatusCode,
    isValidUTF8: _isValidUTF8,
    tokenChars
  };
}


/***/ }),

/***/ 5764:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls|https$" }] */



const EventEmitter = __webpack_require__(2361);
const http = __webpack_require__(3685);
const https = __webpack_require__(5687);
const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { createHash } = __webpack_require__(6113);

const extension = __webpack_require__(1735);
const PerMessageDeflate = __webpack_require__(3394);
const subprotocol = __webpack_require__(4516);
const WebSocket = __webpack_require__(8999);
const { GUID, kWebSocket } = __webpack_require__(3337);

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key = req.headers['sec-websocket-key'];
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET') {
      const message = 'Invalid HTTP method';
      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
      return;
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      const message = 'Invalid Upgrade header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!key || !keyRegex.test(key)) {
      const message = 'Missing or invalid Sec-WebSocket-Key header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (version !== 8 && version !== 13) {
      const message = 'Missing or invalid Sec-WebSocket-Version header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!this.shouldHandle(req)) {
      abortHandshake(socket, 400);
      return;
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Protocol header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        const message =
          'Invalid or unacceptable Sec-WebSocket-Extensions header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  //
  // The socket is writable unless the user destroyed or ended it before calling
  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
  // error. Handling this does not make much sense as the worst that can happen
  // is that some of the data written by the user might be discarded due to the
  // call to `socket.end()` below, which triggers an `'error'` event that in
  // turn causes the socket to be destroyed.
  //
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: 'close',
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(message),
    ...headers
  };

  socket.once('finish', socket.destroy);

  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      Object.keys(headers)
        .map((h) => `${h}: ${headers[h]}`)
        .join('\r\n') +
      '\r\n\r\n' +
      message
  );
}

/**
 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
 * one listener for it, otherwise call `abortHandshake()`.
 *
 * @param {WebSocketServer} server The WebSocket server
 * @param {http.IncomingMessage} req The request object
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} message The HTTP response body
 * @private
 */
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount('wsClientError')) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

    server.emit('wsClientError', err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}


/***/ }),

/***/ 8999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */



const EventEmitter = __webpack_require__(2361);
const https = __webpack_require__(5687);
const http = __webpack_require__(3685);
const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { randomBytes, createHash } = __webpack_require__(6113);
const { Readable } = __webpack_require__(2781);
const { URL } = __webpack_require__(7310);

const PerMessageDeflate = __webpack_require__(3394);
const Receiver = __webpack_require__(7881);
const Sender = __webpack_require__(485);
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__(3337);
const {
  EventTarget: { addEventListener, removeEventListener }
} = __webpack_require__(6237);
const { format, parse } = __webpack_require__(1735);
const { toBuffer } = __webpack_require__(4934);

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new Sender(socket, this._extensions, options.generateMask);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';
  let invalidURLMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isUnixSocket) {
    invalidURLMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isUnixSocket && !parsedUrl.pathname) {
    invalidURLMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidURLMessage = 'The URL contains a fragment identifier';
  }

  if (invalidURLMessage) {
    const err = new SyntaxError(invalidURLMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalSecure = isSecure;
      websocket._originalHost = parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = parsedUrl.host === websocket._originalHost;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    if (res.headers.upgrade.toLowerCase() !== 'websocket') {
      abortHandshake(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  if (websocket._socket[kWebSocket] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}


/***/ }),

/***/ 8486:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cJ": () => (/* binding */ scrapeAnimeDetails),
  "ey": () => (/* binding */ scrapeMP4),
  "Ab": () => (/* binding */ scrapeSearch)
});

// UNUSED EXPORTS: DownloadReferer, scrapeAnimeMovies, scrapeDownloadLinks, scrapeFembed, scrapeGenre, scrapeNewSeason, scrapePopularAnime, scrapeRecentRelease, scrapeSeason, scrapeStreamSB, scrapeThread, scrapeTopAiringAnime

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
// EXTERNAL MODULE: external "cheerio"
var external_cheerio_ = __webpack_require__(8048);
// EXTERNAL MODULE: external "pkg-dir"
var external_pkg_dir_ = __webpack_require__(8873);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
// EXTERNAL MODULE: external "module"
var external_module_ = __webpack_require__(8188);
// EXTERNAL MODULE: external "url"
var external_url_ = __webpack_require__(7310);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/compat.js



const compat_require = (0,external_module_.createRequire)("file:///Users/areccusbranch/Documents/PersonalProjects/animestream/node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/compat.js");
let puppeteerDirname;
try {
    // In some environments, like esbuild, this will throw an error.
    // We suppress the error since the bundled binary is not expected
    // to be used or installed in this case and, therefore, the
    // root directory does not have to be known.
    puppeteerDirname = (0,external_path_.dirname)(compat_require.resolve('./compat'));
}
catch (error) {
    puppeteerDirname = (0,external_path_.dirname)((0,external_url_.fileURLToPath)("file:///Users/areccusbranch/Documents/PersonalProjects/animestream/node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/compat.js"));
}

//# sourceMappingURL=compat.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/constants.js


const rootDirname = (0,external_path_.dirname)((0,external_path_.dirname)((0,external_path_.dirname)(puppeteerDirname)));
//# sourceMappingURL=constants.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Errors.js
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @public
 */
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
/**
 * TimeoutError is emitted whenever certain operations are terminated due to timeout.
 *
 * @remarks
 *
 * Example operations are {@link Page.waitForSelector | page.waitForSelector}
 * or {@link PuppeteerNode.launch | puppeteer.launch}.
 *
 * @public
 */
class TimeoutError extends CustomError {
}
/**
 * ProtocolError is emitted whenever there is an error from the protocol.
 *
 * @public
 */
class ProtocolError extends CustomError {
    constructor() {
        super(...arguments);
        this.originalMessage = '';
    }
}
/**
 * @public
 */
const puppeteerErrors = Object.freeze({
    TimeoutError,
    ProtocolError,
});
//# sourceMappingURL=Errors.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/DeviceDescriptors.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const devices = [
    {
        name: 'Blackberry PlayBook',
        userAgent: 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        viewport: {
            width: 600,
            height: 1024,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Blackberry PlayBook landscape',
        userAgent: 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        viewport: {
            width: 1024,
            height: 600,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'BlackBerry Z30',
        userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'BlackBerry Z30 landscape',
        userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy Note 3',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy Note 3 landscape',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy Note II',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy Note II landscape',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy S III',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy S III landscape',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy S5',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy S5 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy S8',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
        viewport: {
            width: 360,
            height: 740,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy S8 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
        viewport: {
            width: 740,
            height: 360,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy S9+',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36',
        viewport: {
            width: 320,
            height: 658,
            deviceScaleFactor: 4.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy S9+ landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36',
        viewport: {
            width: 658,
            height: 320,
            deviceScaleFactor: 4.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Galaxy Tab S4',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
        viewport: {
            width: 712,
            height: 1138,
            deviceScaleFactor: 2.25,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Galaxy Tab S4 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
        viewport: {
            width: 1138,
            height: 712,
            deviceScaleFactor: 2.25,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 768,
            height: 1024,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 1024,
            height: 768,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad (gen 6)',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 768,
            height: 1024,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad (gen 6) landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 1024,
            height: 768,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad (gen 7)',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 810,
            height: 1080,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad (gen 7) landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 1080,
            height: 810,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad Mini',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 768,
            height: 1024,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad Mini landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 1024,
            height: 768,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad Pro',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 1024,
            height: 1366,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad Pro landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        viewport: {
            width: 1366,
            height: 1024,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPad Pro 11',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 834,
            height: 1194,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPad Pro 11 landscape',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 1194,
            height: 834,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 4',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
        viewport: {
            width: 320,
            height: 480,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 4 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
        viewport: {
            width: 480,
            height: 320,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 5',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        viewport: {
            width: 320,
            height: 568,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 5 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        viewport: {
            width: 568,
            height: 320,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 6',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 6 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 667,
            height: 375,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 6 Plus',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 414,
            height: 736,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 6 Plus landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 736,
            height: 414,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 7',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 7 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 667,
            height: 375,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 7 Plus',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 414,
            height: 736,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 7 Plus landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 736,
            height: 414,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 8',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 8 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 667,
            height: 375,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 8 Plus',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 414,
            height: 736,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 8 Plus landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 736,
            height: 414,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone SE',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        viewport: {
            width: 320,
            height: 568,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone SE landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        viewport: {
            width: 568,
            height: 320,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone X',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 375,
            height: 812,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone X landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        viewport: {
            width: 812,
            height: 375,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone XR',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 414,
            height: 896,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone XR landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 896,
            height: 414,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 11',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 414,
            height: 828,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 11 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 828,
            height: 414,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 11 Pro',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 375,
            height: 812,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 11 Pro landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 812,
            height: 375,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 11 Pro Max',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 414,
            height: 896,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 11 Pro Max landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 896,
            height: 414,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 12',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 12 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 844,
            height: 390,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 12 Pro',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 12 Pro landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 844,
            height: 390,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 12 Pro Max',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 428,
            height: 926,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 12 Pro Max landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 926,
            height: 428,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 12 Mini',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 375,
            height: 812,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 12 Mini landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 812,
            height: 375,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 13',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 13 landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 844,
            height: 390,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 13 Pro',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 13 Pro landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 844,
            height: 390,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 13 Pro Max',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 428,
            height: 926,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 13 Pro Max landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 926,
            height: 428,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'iPhone 13 Mini',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 375,
            height: 812,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'iPhone 13 Mini landscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 812,
            height: 375,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'JioPhone 2',
        userAgent: 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
        viewport: {
            width: 240,
            height: 320,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'JioPhone 2 landscape',
        userAgent: 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
        viewport: {
            width: 320,
            height: 240,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Kindle Fire HDX',
        userAgent: 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
        viewport: {
            width: 800,
            height: 1280,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Kindle Fire HDX landscape',
        userAgent: 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
        viewport: {
            width: 1280,
            height: 800,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'LG Optimus L70',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 384,
            height: 640,
            deviceScaleFactor: 1.25,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'LG Optimus L70 landscape',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 640,
            height: 384,
            deviceScaleFactor: 1.25,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Microsoft Lumia 550',
        userAgent: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Microsoft Lumia 950',
        userAgent: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 4,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Microsoft Lumia 950 landscape',
        userAgent: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 4,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 10',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        viewport: {
            width: 800,
            height: 1280,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 10 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        viewport: {
            width: 1280,
            height: 800,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 4',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 384,
            height: 640,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 4 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 640,
            height: 384,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 5',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 5 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 5X',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 412,
            height: 732,
            deviceScaleFactor: 2.625,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 5X landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 732,
            height: 412,
            deviceScaleFactor: 2.625,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 6',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 412,
            height: 732,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 6 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 732,
            height: 412,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 6P',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 412,
            height: 732,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 6P landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 732,
            height: 412,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nexus 7',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        viewport: {
            width: 600,
            height: 960,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nexus 7 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        viewport: {
            width: 960,
            height: 600,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nokia Lumia 520',
        userAgent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
        viewport: {
            width: 320,
            height: 533,
            deviceScaleFactor: 1.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nokia Lumia 520 landscape',
        userAgent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
        viewport: {
            width: 533,
            height: 320,
            deviceScaleFactor: 1.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Nokia N9',
        userAgent: 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
        viewport: {
            width: 480,
            height: 854,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Nokia N9 landscape',
        userAgent: 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
        viewport: {
            width: 854,
            height: 480,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 2',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 411,
            height: 731,
            deviceScaleFactor: 2.625,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 2 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 731,
            height: 411,
            deviceScaleFactor: 2.625,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 2 XL',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 411,
            height: 823,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 2 XL landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        viewport: {
            width: 823,
            height: 411,
            deviceScaleFactor: 3.5,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 3',
        userAgent: 'Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36',
        viewport: {
            width: 393,
            height: 786,
            deviceScaleFactor: 2.75,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 3 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36',
        viewport: {
            width: 786,
            height: 393,
            deviceScaleFactor: 2.75,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 4',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
        viewport: {
            width: 353,
            height: 745,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 4 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
        viewport: {
            width: 745,
            height: 353,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 4a (5G)',
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 353,
            height: 745,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 4a (5G) landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 745,
            height: 353,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Pixel 5',
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 393,
            height: 851,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Pixel 5 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 851,
            height: 393,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
    {
        name: 'Moto G4',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    },
    {
        name: 'Moto G4 landscape',
        userAgent: 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36',
        viewport: {
            width: 640,
            height: 360,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: true,
        },
    },
];
/**
 * @internal
 */
const _devicesMap = {};
for (const device of devices) {
    _devicesMap[device.name] = device;
}
//# sourceMappingURL=DeviceDescriptors.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/assert.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asserts that the given value is truthy.
 * @param value - some conditional statement
 * @param message - the error message to throw if the value is not truthy.
 */
const assert = (value, message) => {
    if (!value) {
        throw new Error(message);
    }
};
const assertNever = (value, message) => {
    if (value) {
        throw new Error(message);
    }
};
//# sourceMappingURL=assert.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/AriaQueryHandler.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

async function queryAXTree(client, element, accessibleName, role) {
    const { nodes } = await client.send('Accessibility.queryAXTree', {
        objectId: element._remoteObject.objectId,
        accessibleName,
        role,
    });
    const filteredNodes = nodes.filter((node) => {
        return !node.role || node.role.value !== 'StaticText';
    });
    return filteredNodes;
}
const normalizeValue = (value) => {
    return value.replace(/ +/g, ' ').trim();
};
const knownAttributes = new Set(['name', 'role']);
const attributeRegexp = /\[\s*(?<attribute>\w+)\s*=\s*(?<quote>"|')(?<value>\\.|.*?(?=\k<quote>))\k<quote>\s*\]/g;
function isKnownAttribute(attribute) {
    return knownAttributes.has(attribute);
}
/*
 * The selectors consist of an accessible name to query for and optionally
 * further aria attributes on the form `[<attribute>=<value>]`.
 * Currently, we only support the `name` and `role` attribute.
 * The following examples showcase how the syntax works wrt. querying:
 * - 'title[role="heading"]' queries for elements with name 'title' and role 'heading'.
 * - '[role="img"]' queries for elements with role 'img' and any name.
 * - 'label' queries for elements with name 'label' and any role.
 * - '[name=""][role="button"]' queries for elements with no name and role 'button'.
 */
function parseAriaSelector(selector) {
    const queryOptions = {};
    const defaultName = selector.replace(attributeRegexp, (_, attribute, _quote, value) => {
        attribute = attribute.trim();
        assert(isKnownAttribute(attribute), `Unknown aria attribute "${attribute}" in selector`);
        queryOptions[attribute] = normalizeValue(value);
        return '';
    });
    if (defaultName && !queryOptions.name) {
        queryOptions.name = normalizeValue(defaultName);
    }
    return queryOptions;
}
const queryOne = async (element, selector) => {
    const exeCtx = element.executionContext();
    const { name, role } = parseAriaSelector(selector);
    const res = await queryAXTree(exeCtx._client, element, name, role);
    if (!res[0] || !res[0].backendDOMNodeId) {
        return null;
    }
    return exeCtx._adoptBackendNodeId(res[0].backendDOMNodeId);
};
const waitFor = async (domWorld, selector, options) => {
    const binding = {
        name: 'ariaQuerySelector',
        pptrFunction: async (selector) => {
            const root = options.root || (await domWorld._document());
            const element = await queryOne(root, selector);
            return element;
        },
    };
    return domWorld._waitForSelectorInPage((_, selector) => {
        return globalThis.ariaQuerySelector(selector);
    }, selector, options, binding);
};
const queryAll = async (element, selector) => {
    const exeCtx = element.executionContext();
    const { name, role } = parseAriaSelector(selector);
    const res = await queryAXTree(exeCtx._client, element, name, role);
    return Promise.all(res.map((axNode) => {
        return exeCtx._adoptBackendNodeId(axNode.backendDOMNodeId);
    }));
};
const queryAllArray = async (element, selector) => {
    const elementHandles = await queryAll(element, selector);
    const exeCtx = element.executionContext();
    const jsHandle = exeCtx.evaluateHandle((...elements) => {
        return elements;
    }, ...elementHandles);
    return jsHandle;
};
/**
 * @internal
 */
const _ariaHandler = {
    queryOne,
    waitFor,
    queryAll,
    queryAllArray,
};
//# sourceMappingURL=AriaQueryHandler.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/QueryHandler.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function makeQueryHandler(handler) {
    const internalHandler = {};
    if (handler.queryOne) {
        const queryOne = handler.queryOne;
        internalHandler.queryOne = async (element, selector) => {
            const jsHandle = await element.evaluateHandle(queryOne, selector);
            const elementHandle = jsHandle.asElement();
            if (elementHandle) {
                return elementHandle;
            }
            await jsHandle.dispose();
            return null;
        };
        internalHandler.waitFor = (domWorld, selector, options) => {
            return domWorld._waitForSelectorInPage(queryOne, selector, options);
        };
    }
    if (handler.queryAll) {
        const queryAll = handler.queryAll;
        internalHandler.queryAll = async (element, selector) => {
            const jsHandle = await element.evaluateHandle(queryAll, selector);
            const properties = await jsHandle.getProperties();
            await jsHandle.dispose();
            const result = [];
            for (const property of properties.values()) {
                const elementHandle = property.asElement();
                if (elementHandle) {
                    result.push(elementHandle);
                }
            }
            return result;
        };
        internalHandler.queryAllArray = async (element, selector) => {
            const resultHandle = await element.evaluateHandle(queryAll, selector);
            const arrayHandle = await resultHandle.evaluateHandle((res) => {
                return Array.from(res);
            });
            return arrayHandle;
        };
    }
    return internalHandler;
}
const _defaultHandler = makeQueryHandler({
    queryOne: (element, selector) => {
        return element.querySelector(selector);
    },
    queryAll: (element, selector) => {
        return element.querySelectorAll(selector);
    },
});
const pierceHandler = makeQueryHandler({
    queryOne: (element, selector) => {
        let found = null;
        const search = (root) => {
            const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
            do {
                const currentNode = iter.currentNode;
                if (currentNode.shadowRoot) {
                    search(currentNode.shadowRoot);
                }
                if (currentNode instanceof ShadowRoot) {
                    continue;
                }
                if (currentNode !== root && !found && currentNode.matches(selector)) {
                    found = currentNode;
                }
            } while (!found && iter.nextNode());
        };
        if (element instanceof Document) {
            element = element.documentElement;
        }
        search(element);
        return found;
    },
    queryAll: (element, selector) => {
        const result = [];
        const collect = (root) => {
            const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
            do {
                const currentNode = iter.currentNode;
                if (currentNode.shadowRoot) {
                    collect(currentNode.shadowRoot);
                }
                if (currentNode instanceof ShadowRoot) {
                    continue;
                }
                if (currentNode !== root && currentNode.matches(selector)) {
                    result.push(currentNode);
                }
            } while (iter.nextNode());
        };
        if (element instanceof Document) {
            element = element.documentElement;
        }
        collect(element);
        return result;
    },
});
const builtInHandlers = new Map([
    ['aria', _ariaHandler],
    ['pierce', pierceHandler],
]);
const queryHandlers = new Map(builtInHandlers);
/**
 * @internal
 */
function _registerCustomQueryHandler(name, handler) {
    if (queryHandlers.get(name)) {
        throw new Error(`A custom query handler named "${name}" already exists`);
    }
    const isValidName = /^[a-zA-Z]+$/.test(name);
    if (!isValidName) {
        throw new Error(`Custom query handler names may only contain [a-zA-Z]`);
    }
    const internalHandler = makeQueryHandler(handler);
    queryHandlers.set(name, internalHandler);
}
/**
 * @internal
 */
function _unregisterCustomQueryHandler(name) {
    if (queryHandlers.has(name) && !builtInHandlers.has(name)) {
        queryHandlers.delete(name);
    }
}
/**
 * @internal
 */
function _customQueryHandlerNames() {
    return [...queryHandlers.keys()].filter((name) => {
        return !builtInHandlers.has(name);
    });
}
/**
 * @internal
 */
function _clearCustomQueryHandlers() {
    _customQueryHandlerNames().forEach(_unregisterCustomQueryHandler);
}
/**
 * @internal
 */
function _getQueryHandlerAndSelector(selector) {
    const hasCustomQueryHandler = /^[a-zA-Z]+\//.test(selector);
    if (!hasCustomQueryHandler) {
        return { updatedSelector: selector, queryHandler: _defaultHandler };
    }
    const index = selector.indexOf('/');
    const name = selector.slice(0, index);
    const updatedSelector = selector.slice(index + 1);
    const queryHandler = queryHandlers.get(name);
    if (!queryHandler) {
        throw new Error(`Query set to use "${name}", but no query handler of that name was found`);
    }
    return {
        updatedSelector,
        queryHandler,
    };
}
//# sourceMappingURL=QueryHandler.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/environment.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const isNode = !!(typeof process !== 'undefined' && process.version);
//# sourceMappingURL=environment.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Debug.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A debug function that can be used in any environment.
 *
 * @remarks
 *
 * If used in Node, it falls back to the
 * {@link https://www.npmjs.com/package/debug | debug module}. In the browser it
 * uses `console.log`.
 *
 * @param prefix - this will be prefixed to each log.
 * @returns a function that can be called to log to that debug channel.
 *
 * In Node, use the `DEBUG` environment variable to control logging:
 *
 * ```
 * DEBUG=* // logs all channels
 * DEBUG=foo // logs the `foo` channel
 * DEBUG=foo* // logs any channels starting with `foo`
 * ```
 *
 * In the browser, set `window.__PUPPETEER_DEBUG` to a string:
 *
 * ```
 * window.__PUPPETEER_DEBUG='*'; // logs all channels
 * window.__PUPPETEER_DEBUG='foo'; // logs the `foo` channel
 * window.__PUPPETEER_DEBUG='foo*'; // logs any channels starting with `foo`
 * ```
 *
 * @example
 * ```
 * const log = debug('Page');
 *
 * log('new page created')
 * // logs "Page: new page created"
 * ```
 */
const debug = (prefix) => {
    if (isNode) {
        return async (...logArgs) => {
            (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 6974, 19))).default(prefix)(logArgs);
        };
    }
    return (...logArgs) => {
        const debugLevel = globalThis.__PUPPETEER_DEBUG;
        if (!debugLevel) {
            return;
        }
        const everythingShouldBeLogged = debugLevel === '*';
        const prefixMatchesDebugLevel = everythingShouldBeLogged ||
            /**
             * If the debug level is `foo*`, that means we match any prefix that
             * starts with `foo`. If the level is `foo`, we match only the prefix
             * `foo`.
             */
            (debugLevel.endsWith('*')
                ? prefix.startsWith(debugLevel)
                : prefix === debugLevel);
        if (!prefixMatchesDebugLevel) {
            return;
        }
        // eslint-disable-next-line no-console
        console.log(`${prefix}:`, ...logArgs);
    };
};
//# sourceMappingURL=Debug.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/util.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




const debugError = debug('puppeteer:error');
function getExceptionMessage(exceptionDetails) {
    if (exceptionDetails.exception) {
        return (exceptionDetails.exception.description || exceptionDetails.exception.value);
    }
    let message = exceptionDetails.text;
    if (exceptionDetails.stackTrace) {
        for (const callframe of exceptionDetails.stackTrace.callFrames) {
            const location = callframe.url +
                ':' +
                callframe.lineNumber +
                ':' +
                callframe.columnNumber;
            const functionName = callframe.functionName || '<anonymous>';
            message += `\n    at ${functionName} (${location})`;
        }
    }
    return message;
}
function valueFromRemoteObject(remoteObject) {
    assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
        if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined') {
            return BigInt(remoteObject.unserializableValue.replace('n', ''));
        }
        switch (remoteObject.unserializableValue) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                throw new Error('Unsupported unserializable value: ' +
                    remoteObject.unserializableValue);
        }
    }
    return remoteObject.value;
}
async function releaseObject(client, remoteObject) {
    if (!remoteObject.objectId) {
        return;
    }
    await client
        .send('Runtime.releaseObject', { objectId: remoteObject.objectId })
        .catch((error) => {
        // Exceptions might happen in case of a page been navigated or closed.
        // Swallow these since they are harmless and we don't leak anything in this case.
        debugError(error);
    });
}
function addEventListener(emitter, eventName, handler) {
    emitter.on(eventName, handler);
    return { emitter, eventName, handler };
}
function removeEventListeners(listeners) {
    for (const listener of listeners) {
        listener.emitter.removeListener(listener.eventName, listener.handler);
    }
    listeners.length = 0;
}
const isString = (obj) => {
    return typeof obj === 'string' || obj instanceof String;
};
const isNumber = (obj) => {
    return typeof obj === 'number' || obj instanceof Number;
};
async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
    let eventTimeout;
    let resolveCallback;
    let rejectCallback;
    const promise = new Promise((resolve, reject) => {
        resolveCallback = resolve;
        rejectCallback = reject;
    });
    const listener = addEventListener(emitter, eventName, async (event) => {
        if (!(await predicate(event))) {
            return;
        }
        resolveCallback(event);
    });
    if (timeout) {
        eventTimeout = setTimeout(() => {
            rejectCallback(new TimeoutError('Timeout exceeded while waiting for event'));
        }, timeout);
    }
    function cleanup() {
        removeEventListeners([listener]);
        clearTimeout(eventTimeout);
    }
    const result = await Promise.race([promise, abortPromise]).then((r) => {
        cleanup();
        return r;
    }, (error) => {
        cleanup();
        throw error;
    });
    if (isErrorLike(result)) {
        throw result;
    }
    return result;
}
function evaluationString(fun, ...args) {
    if (isString(fun)) {
        assert(args.length === 0, 'Cannot evaluate a string with arguments');
        return fun;
    }
    function serializeArgument(arg) {
        if (Object.is(arg, undefined)) {
            return 'undefined';
        }
        return JSON.stringify(arg);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;
}
function pageBindingInitString(type, name) {
    function addPageBinding(type, bindingName) {
        /* Cast window to any here as we're about to add properties to it
         * via win[bindingName] which TypeScript doesn't like.
         */
        const win = window;
        const binding = win[bindingName];
        win[bindingName] = (...args) => {
            const me = window[bindingName];
            let callbacks = me.callbacks;
            if (!callbacks) {
                callbacks = new Map();
                me.callbacks = callbacks;
            }
            const seq = (me.lastSeq || 0) + 1;
            me.lastSeq = seq;
            const promise = new Promise((resolve, reject) => {
                return callbacks.set(seq, { resolve, reject });
            });
            binding(JSON.stringify({ type, name: bindingName, seq, args }));
            return promise;
        };
    }
    return evaluationString(addPageBinding, type, name);
}
function pageBindingDeliverResultString(name, seq, result) {
    function deliverResult(name, seq, result) {
        window[name].callbacks.get(seq).resolve(result);
        window[name].callbacks.delete(seq);
    }
    return evaluationString(deliverResult, name, seq, result);
}
function pageBindingDeliverErrorString(name, seq, message, stack) {
    function deliverError(name, seq, message, stack) {
        const error = new Error(message);
        error.stack = stack;
        window[name].callbacks.get(seq).reject(error);
        window[name].callbacks.delete(seq);
    }
    return evaluationString(deliverError, name, seq, message, stack);
}
function pageBindingDeliverErrorValueString(name, seq, value) {
    function deliverErrorValue(name, seq, value) {
        window[name].callbacks.get(seq).reject(value);
        window[name].callbacks.delete(seq);
    }
    return evaluationString(deliverErrorValue, name, seq, value);
}
function makePredicateString(predicate, predicateQueryHandler) {
    function checkWaitForOptions(node, waitForVisible, waitForHidden) {
        if (!node) {
            return waitForHidden;
        }
        if (!waitForVisible && !waitForHidden) {
            return node;
        }
        const element = node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : node;
        const style = window.getComputedStyle(element);
        const isVisible = style && style.visibility !== 'hidden' && hasVisibleBoundingBox();
        const success = waitForVisible === isVisible || waitForHidden === !isVisible;
        return success ? node : null;
        function hasVisibleBoundingBox() {
            const rect = element.getBoundingClientRect();
            return !!(rect.top || rect.bottom || rect.width || rect.height);
        }
    }
    const predicateQueryHandlerDef = predicateQueryHandler
        ? `const predicateQueryHandler = ${predicateQueryHandler};`
        : '';
    return `
    (() => {
      ${predicateQueryHandlerDef}
      const checkWaitForOptions = ${checkWaitForOptions};
      return (${predicate})(...args)
    })() `;
}
async function waitWithTimeout(promise, taskName, timeout) {
    let reject;
    const timeoutError = new TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
    const timeoutPromise = new Promise((_res, rej) => {
        return (reject = rej);
    });
    let timeoutTimer = null;
    if (timeout) {
        timeoutTimer = setTimeout(() => {
            return reject(timeoutError);
        }, timeout);
    }
    try {
        return await Promise.race([promise, timeoutPromise]);
    }
    finally {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
        }
    }
}
async function getReadableAsBuffer(readable, path) {
    const buffers = [];
    if (path) {
        let fs;
        try {
            fs = (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 19))).promises;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Cannot write to a path outside of a Node-like environment.');
            }
            throw error;
        }
        const fileHandle = await fs.open(path, 'w+');
        for await (const chunk of readable) {
            buffers.push(chunk);
            await fileHandle.writeFile(chunk);
        }
        await fileHandle.close();
    }
    else {
        for await (const chunk of readable) {
            buffers.push(chunk);
        }
    }
    try {
        return Buffer.concat(buffers);
    }
    catch (error) {
        return null;
    }
}
async function getReadableFromProtocolStream(client, handle) {
    // TODO: Once Node 18 becomes the lowest supported version, we can migrate to
    // ReadableStream.
    if (!isNode) {
        throw new Error('Cannot create a stream outside of Node.js environment.');
    }
    const { Readable } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 2781, 19));
    let eof = false;
    return new Readable({
        async read(size) {
            if (eof) {
                return;
            }
            const response = await client.send('IO.read', { handle, size });
            this.push(response.data, response.base64Encoded ? 'base64' : undefined);
            if (response.eof) {
                eof = true;
                await client.send('IO.close', { handle });
                this.push(null);
            }
        },
    });
}
function isErrorLike(obj) {
    return (typeof obj === 'object' && obj !== null && 'name' in obj && 'message' in obj);
}
function isErrnoException(obj) {
    return (isErrorLike(obj) &&
        ('errno' in obj || 'code' in obj || 'path' in obj || 'syscall' in obj));
}
//# sourceMappingURL=util.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/vendor/mitt/src/index.js
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
function mitt(all) {
    all = all || new Map();
    return {
        /**
         * A Map of event names to registered handler functions.
         */
        all: all,
        /**
         * Register an event handler for the given type.
         * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
         * @param {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on: function (type, handler) {
            var handlers = all.get(type);
            var added = handlers && handlers.push(handler);
            if (!added) {
                all.set(type, [handler]);
            }
        },
        /**
         * Remove an event handler for the given type.
         * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
         * @param {Function} handler Handler function to remove
         * @memberOf mitt
         */
        off: function (type, handler) {
            var handlers = all.get(type);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        /**
         * Invoke all handlers for the given type.
         * If present, `"*"` handlers are invoked after type-matched handlers.
         *
         * Note: Manually firing "*" handlers is not supported.
         *
         * @param {string|symbol} type The event type to invoke
         * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit: function (type, evt) {
            (all.get(type) || []).slice().map(function (handler) { handler(evt); });
            (all.get('*') || []).slice().map(function (handler) { handler(type, evt); });
        }
    };
}

;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/EventEmitter.js

/**
 * The EventEmitter class that many Puppeteer classes extend.
 *
 * @remarks
 *
 * This allows you to listen to events that Puppeteer classes fire and act
 * accordingly. Therefore you'll mostly use {@link EventEmitter.on | on} and
 * {@link EventEmitter.off | off} to bind
 * and unbind to event listeners.
 *
 * @public
 */
class EventEmitter {
    /**
     * @internal
     */
    constructor() {
        this.eventsMap = new Map();
        this.emitter = mitt(this.eventsMap);
    }
    /**
     * Bind an event listener to fire when an event occurs.
     * @param event - the event type you'd like to listen to. Can be a string or symbol.
     * @param handler  - the function to be called when the event occurs.
     * @returns `this` to enable you to chain method calls.
     */
    on(event, handler) {
        this.emitter.on(event, handler);
        return this;
    }
    /**
     * Remove an event listener from firing.
     * @param event - the event type you'd like to stop listening to.
     * @param handler  - the function that should be removed.
     * @returns `this` to enable you to chain method calls.
     */
    off(event, handler) {
        this.emitter.off(event, handler);
        return this;
    }
    /**
     * Remove an event listener.
     * @deprecated please use {@link EventEmitter.off} instead.
     */
    removeListener(event, handler) {
        this.off(event, handler);
        return this;
    }
    /**
     * Add an event listener.
     * @deprecated please use {@link EventEmitter.on} instead.
     */
    addListener(event, handler) {
        this.on(event, handler);
        return this;
    }
    /**
     * Emit an event and call any associated listeners.
     *
     * @param event - the event you'd like to emit
     * @param eventData - any data you'd like to emit with the event
     * @returns `true` if there are any listeners, `false` if there are not.
     */
    emit(event, eventData) {
        this.emitter.emit(event, eventData);
        return this.eventListenersCount(event) > 0;
    }
    /**
     * Like `on` but the listener will only be fired once and then it will be removed.
     * @param event - the event you'd like to listen to
     * @param handler - the handler function to run when the event occurs
     * @returns `this` to enable you to chain method calls.
     */
    once(event, handler) {
        const onceHandler = (eventData) => {
            handler(eventData);
            this.off(event, onceHandler);
        };
        return this.on(event, onceHandler);
    }
    /**
     * Gets the number of listeners for a given event.
     *
     * @param event - the event to get the listener count for
     * @returns the number of listeners bound to the given event
     */
    listenerCount(event) {
        return this.eventListenersCount(event);
    }
    /**
     * Removes all listeners. If given an event argument, it will remove only
     * listeners for that event.
     * @param event - the event to remove listeners for.
     * @returns `this` to enable you to chain method calls.
     */
    removeAllListeners(event) {
        if (event) {
            this.eventsMap.delete(event);
        }
        else {
            this.eventsMap.clear();
        }
        return this;
    }
    eventListenersCount(event) {
        var _a;
        return ((_a = this.eventsMap.get(event)) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
}
//# sourceMappingURL=EventEmitter.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Connection.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Connection_instances, _Connection_url, _Connection_transport, _Connection_delay, _Connection_lastId, _Connection_sessions, _Connection_closed, _Connection_callbacks, _Connection_onMessage, _Connection_onClose, _CDPSession_sessionId, _CDPSession_targetType, _CDPSession_callbacks, _CDPSession_connection;
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const debugProtocolSend = debug('puppeteer:protocol:SEND ►');
const debugProtocolReceive = debug('puppeteer:protocol:RECV ◀');


/**
 * Internal events that the Connection class emits.
 *
 * @internal
 */
const ConnectionEmittedEvents = {
    Disconnected: Symbol('Connection.Disconnected'),
};
/**
 * @public
 */
class Connection extends EventEmitter {
    constructor(url, transport, delay = 0) {
        super();
        _Connection_instances.add(this);
        _Connection_url.set(this, void 0);
        _Connection_transport.set(this, void 0);
        _Connection_delay.set(this, void 0);
        _Connection_lastId.set(this, 0);
        _Connection_sessions.set(this, new Map());
        _Connection_closed.set(this, false);
        _Connection_callbacks.set(this, new Map());
        __classPrivateFieldSet(this, _Connection_url, url, "f");
        __classPrivateFieldSet(this, _Connection_delay, delay, "f");
        __classPrivateFieldSet(this, _Connection_transport, transport, "f");
        __classPrivateFieldGet(this, _Connection_transport, "f").onmessage = __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onMessage).bind(this);
        __classPrivateFieldGet(this, _Connection_transport, "f").onclose = __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onClose).bind(this);
    }
    static fromSession(session) {
        return session.connection();
    }
    /**
     * @internal
     */
    get _closed() {
        return __classPrivateFieldGet(this, _Connection_closed, "f");
    }
    /**
     * @param sessionId - The session id
     * @returns The current CDP session if it exists
     */
    session(sessionId) {
        return __classPrivateFieldGet(this, _Connection_sessions, "f").get(sessionId) || null;
    }
    url() {
        return __classPrivateFieldGet(this, _Connection_url, "f");
    }
    send(method, ...paramArgs) {
        // There is only ever 1 param arg passed, but the Protocol defines it as an
        // array of 0 or 1 items See this comment:
        // https://github.com/ChromeDevTools/devtools-protocol/pull/113#issuecomment-412603285
        // which explains why the protocol defines the params this way for better
        // type-inference.
        // So now we check if there are any params or not and deal with them accordingly.
        const params = paramArgs.length ? paramArgs[0] : undefined;
        const id = this._rawSend({ method, params });
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _Connection_callbacks, "f").set(id, {
                resolve,
                reject,
                error: new ProtocolError(),
                method,
            });
        });
    }
    /**
     * @internal
     */
    _rawSend(message) {
        var _a;
        const id = __classPrivateFieldSet(this, _Connection_lastId, (_a = __classPrivateFieldGet(this, _Connection_lastId, "f"), ++_a), "f");
        const stringifiedMessage = JSON.stringify(Object.assign({}, message, { id }));
        debugProtocolSend(stringifiedMessage);
        __classPrivateFieldGet(this, _Connection_transport, "f").send(stringifiedMessage);
        return id;
    }
    dispose() {
        __classPrivateFieldGet(this, _Connection_instances, "m", _Connection_onClose).call(this);
        __classPrivateFieldGet(this, _Connection_transport, "f").close();
    }
    /**
     * @param targetInfo - The target info
     * @returns The CDP session that is created
     */
    async createSession(targetInfo) {
        const { sessionId } = await this.send('Target.attachToTarget', {
            targetId: targetInfo.targetId,
            flatten: true,
        });
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(sessionId);
        if (!session) {
            throw new Error('CDPSession creation failed.');
        }
        return session;
    }
}
_Connection_url = new WeakMap(), _Connection_transport = new WeakMap(), _Connection_delay = new WeakMap(), _Connection_lastId = new WeakMap(), _Connection_sessions = new WeakMap(), _Connection_closed = new WeakMap(), _Connection_callbacks = new WeakMap(), _Connection_instances = new WeakSet(), _Connection_onMessage = async function _Connection_onMessage(message) {
    if (__classPrivateFieldGet(this, _Connection_delay, "f")) {
        await new Promise((f) => {
            return setTimeout(f, __classPrivateFieldGet(this, _Connection_delay, "f"));
        });
    }
    debugProtocolReceive(message);
    const object = JSON.parse(message);
    if (object.method === 'Target.attachedToTarget') {
        const sessionId = object.params.sessionId;
        const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
        __classPrivateFieldGet(this, _Connection_sessions, "f").set(sessionId, session);
        this.emit('sessionattached', session);
        const parentSession = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
        if (parentSession) {
            parentSession.emit('sessionattached', session);
        }
    }
    else if (object.method === 'Target.detachedFromTarget') {
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.params.sessionId);
        if (session) {
            session._onClosed();
            __classPrivateFieldGet(this, _Connection_sessions, "f").delete(object.params.sessionId);
            this.emit('sessiondetached', session);
            const parentSession = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
            if (parentSession) {
                parentSession.emit('sessiondetached', session);
            }
        }
    }
    if (object.sessionId) {
        const session = __classPrivateFieldGet(this, _Connection_sessions, "f").get(object.sessionId);
        if (session) {
            session._onMessage(object);
        }
    }
    else if (object.id) {
        const callback = __classPrivateFieldGet(this, _Connection_callbacks, "f").get(object.id);
        // Callbacks could be all rejected if someone has called `.dispose()`.
        if (callback) {
            __classPrivateFieldGet(this, _Connection_callbacks, "f").delete(object.id);
            if (object.error) {
                callback.reject(createProtocolError(callback.error, callback.method, object));
            }
            else {
                callback.resolve(object.result);
            }
        }
    }
    else {
        this.emit(object.method, object.params);
    }
}, _Connection_onClose = function _Connection_onClose() {
    if (__classPrivateFieldGet(this, _Connection_closed, "f")) {
        return;
    }
    __classPrivateFieldSet(this, _Connection_closed, true, "f");
    __classPrivateFieldGet(this, _Connection_transport, "f").onmessage = undefined;
    __classPrivateFieldGet(this, _Connection_transport, "f").onclose = undefined;
    for (const callback of __classPrivateFieldGet(this, _Connection_callbacks, "f").values()) {
        callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
    }
    __classPrivateFieldGet(this, _Connection_callbacks, "f").clear();
    for (const session of __classPrivateFieldGet(this, _Connection_sessions, "f").values()) {
        session._onClosed();
    }
    __classPrivateFieldGet(this, _Connection_sessions, "f").clear();
    this.emit(ConnectionEmittedEvents.Disconnected);
};
/**
 * Internal events that the CDPSession class emits.
 *
 * @internal
 */
const CDPSessionEmittedEvents = {
    Disconnected: Symbol('CDPSession.Disconnected'),
};
/**
 * The `CDPSession` instances are used to talk raw Chrome Devtools Protocol.
 *
 * @remarks
 *
 * Protocol methods can be called with {@link CDPSession.send} method and protocol
 * events can be subscribed to with `CDPSession.on` method.
 *
 * Useful links: {@link https://chromedevtools.github.io/devtools-protocol/ | DevTools Protocol Viewer}
 * and {@link https://github.com/aslushnikov/getting-started-with-cdp/blob/HEAD/README.md | Getting Started with DevTools Protocol}.
 *
 * @example
 * ```js
 * const client = await page.target().createCDPSession();
 * await client.send('Animation.enable');
 * client.on('Animation.animationCreated', () => console.log('Animation created!'));
 * const response = await client.send('Animation.getPlaybackRate');
 * console.log('playback rate is ' + response.playbackRate);
 * await client.send('Animation.setPlaybackRate', {
 *   playbackRate: response.playbackRate / 2
 * });
 * ```
 *
 * @public
 */
class CDPSession extends EventEmitter {
    /**
     * @internal
     */
    constructor(connection, targetType, sessionId) {
        super();
        _CDPSession_sessionId.set(this, void 0);
        _CDPSession_targetType.set(this, void 0);
        _CDPSession_callbacks.set(this, new Map());
        _CDPSession_connection.set(this, void 0);
        __classPrivateFieldSet(this, _CDPSession_connection, connection, "f");
        __classPrivateFieldSet(this, _CDPSession_targetType, targetType, "f");
        __classPrivateFieldSet(this, _CDPSession_sessionId, sessionId, "f");
    }
    connection() {
        return __classPrivateFieldGet(this, _CDPSession_connection, "f");
    }
    send(method, ...paramArgs) {
        if (!__classPrivateFieldGet(this, _CDPSession_connection, "f")) {
            return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${__classPrivateFieldGet(this, _CDPSession_targetType, "f")} has been closed.`));
        }
        // See the comment in Connection#send explaining why we do this.
        const params = paramArgs.length ? paramArgs[0] : undefined;
        const id = __classPrivateFieldGet(this, _CDPSession_connection, "f")._rawSend({
            sessionId: __classPrivateFieldGet(this, _CDPSession_sessionId, "f"),
            method,
            params,
        });
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _CDPSession_callbacks, "f").set(id, {
                resolve,
                reject,
                error: new ProtocolError(),
                method,
            });
        });
    }
    /**
     * @internal
     */
    _onMessage(object) {
        const callback = object.id ? __classPrivateFieldGet(this, _CDPSession_callbacks, "f").get(object.id) : undefined;
        if (object.id && callback) {
            __classPrivateFieldGet(this, _CDPSession_callbacks, "f").delete(object.id);
            if (object.error) {
                callback.reject(createProtocolError(callback.error, callback.method, object));
            }
            else {
                callback.resolve(object.result);
            }
        }
        else {
            assert(!object.id);
            this.emit(object.method, object.params);
        }
    }
    /**
     * Detaches the cdpSession from the target. Once detached, the cdpSession object
     * won't emit any events and can't be used to send messages.
     */
    async detach() {
        if (!__classPrivateFieldGet(this, _CDPSession_connection, "f")) {
            throw new Error(`Session already detached. Most likely the ${__classPrivateFieldGet(this, _CDPSession_targetType, "f")} has been closed.`);
        }
        await __classPrivateFieldGet(this, _CDPSession_connection, "f").send('Target.detachFromTarget', {
            sessionId: __classPrivateFieldGet(this, _CDPSession_sessionId, "f"),
        });
    }
    /**
     * @internal
     */
    _onClosed() {
        for (const callback of __classPrivateFieldGet(this, _CDPSession_callbacks, "f").values()) {
            callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
        }
        __classPrivateFieldGet(this, _CDPSession_callbacks, "f").clear();
        __classPrivateFieldSet(this, _CDPSession_connection, undefined, "f");
        this.emit(CDPSessionEmittedEvents.Disconnected);
    }
    /**
     * Returns the session's id.
     */
    id() {
        return __classPrivateFieldGet(this, _CDPSession_sessionId, "f");
    }
}
_CDPSession_sessionId = new WeakMap(), _CDPSession_targetType = new WeakMap(), _CDPSession_callbacks = new WeakMap(), _CDPSession_connection = new WeakMap();
function createProtocolError(error, method, object) {
    let message = `Protocol error (${method}): ${object.error.message}`;
    if ('data' in object.error) {
        message += ` ${object.error.data}`;
    }
    return rewriteError(error, message, object.error.message);
}
function rewriteError(error, message, originalMessage) {
    error.message = message;
    error.originalMessage = originalMessage !== null && originalMessage !== void 0 ? originalMessage : error.originalMessage;
    return error;
}
//# sourceMappingURL=Connection.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Accessibility.js
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Accessibility_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Accessibility_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Accessibility_client, _AXNode_instances, _AXNode_richlyEditable, _AXNode_editable, _AXNode_focusable, _AXNode_hidden, _AXNode_name, _AXNode_role, _AXNode_ignored, _AXNode_cachedHasFocusableChild, _AXNode_isPlainTextField, _AXNode_isTextOnlyObject, _AXNode_hasFocusableChild;
/**
 * The Accessibility class provides methods for inspecting Chromium's
 * accessibility tree. The accessibility tree is used by assistive technology
 * such as {@link https://en.wikipedia.org/wiki/Screen_reader | screen readers} or
 * {@link https://en.wikipedia.org/wiki/Switch_access | switches}.
 *
 * @remarks
 *
 * Accessibility is a very platform-specific thing. On different platforms,
 * there are different screen readers that might have wildly different output.
 *
 * Blink - Chrome's rendering engine - has a concept of "accessibility tree",
 * which is then translated into different platform-specific APIs. Accessibility
 * namespace gives users access to the Blink Accessibility Tree.
 *
 * Most of the accessibility tree gets filtered out when converting from Blink
 * AX Tree to Platform-specific AX-Tree or by assistive technologies themselves.
 * By default, Puppeteer tries to approximate this filtering, exposing only
 * the "interesting" nodes of the tree.
 *
 * @public
 */
class Accessibility {
    /**
     * @internal
     */
    constructor(client) {
        _Accessibility_client.set(this, void 0);
        Accessibility_classPrivateFieldSet(this, _Accessibility_client, client, "f");
    }
    /**
     * Captures the current state of the accessibility tree.
     * The returned object represents the root accessible node of the page.
     *
     * @remarks
     *
     * **NOTE** The Chromium accessibility tree contains nodes that go unused on
     * most platforms and by most screen readers. Puppeteer will discard them as
     * well for an easier to process tree, unless `interestingOnly` is set to
     * `false`.
     *
     * @example
     * An example of dumping the entire accessibility tree:
     * ```js
     * const snapshot = await page.accessibility.snapshot();
     * console.log(snapshot);
     * ```
     *
     * @example
     * An example of logging the focused node's name:
     * ```js
     * const snapshot = await page.accessibility.snapshot();
     * const node = findFocusedNode(snapshot);
     * console.log(node && node.name);
     *
     * function findFocusedNode(node) {
     *   if (node.focused)
     *     return node;
     *   for (const child of node.children || []) {
     *     const foundNode = findFocusedNode(child);
     *     return foundNode;
     *   }
     *   return null;
     * }
     * ```
     *
     * @returns An AXNode object representing the snapshot.
     *
     */
    async snapshot(options = {}) {
        var _a, _b;
        const { interestingOnly = true, root = null } = options;
        const { nodes } = await Accessibility_classPrivateFieldGet(this, _Accessibility_client, "f").send('Accessibility.getFullAXTree');
        let backendNodeId;
        if (root) {
            const { node } = await Accessibility_classPrivateFieldGet(this, _Accessibility_client, "f").send('DOM.describeNode', {
                objectId: root._remoteObject.objectId,
            });
            backendNodeId = node.backendNodeId;
        }
        const defaultRoot = AXNode.createTree(nodes);
        let needle = defaultRoot;
        if (backendNodeId) {
            needle = defaultRoot.find((node) => {
                return node.payload.backendDOMNodeId === backendNodeId;
            });
            if (!needle) {
                return null;
            }
        }
        if (!interestingOnly) {
            return (_a = this.serializeTree(needle)[0]) !== null && _a !== void 0 ? _a : null;
        }
        const interestingNodes = new Set();
        this.collectInterestingNodes(interestingNodes, defaultRoot, false);
        if (!interestingNodes.has(needle)) {
            return null;
        }
        return (_b = this.serializeTree(needle, interestingNodes)[0]) !== null && _b !== void 0 ? _b : null;
    }
    serializeTree(node, interestingNodes) {
        const children = [];
        for (const child of node.children) {
            children.push(...this.serializeTree(child, interestingNodes));
        }
        if (interestingNodes && !interestingNodes.has(node)) {
            return children;
        }
        const serializedNode = node.serialize();
        if (children.length) {
            serializedNode.children = children;
        }
        return [serializedNode];
    }
    collectInterestingNodes(collection, node, insideControl) {
        if (node.isInteresting(insideControl)) {
            collection.add(node);
        }
        if (node.isLeafNode()) {
            return;
        }
        insideControl = insideControl || node.isControl();
        for (const child of node.children) {
            this.collectInterestingNodes(collection, child, insideControl);
        }
    }
}
_Accessibility_client = new WeakMap();
class AXNode {
    constructor(payload) {
        _AXNode_instances.add(this);
        this.children = [];
        _AXNode_richlyEditable.set(this, false);
        _AXNode_editable.set(this, false);
        _AXNode_focusable.set(this, false);
        _AXNode_hidden.set(this, false);
        _AXNode_name.set(this, void 0);
        _AXNode_role.set(this, void 0);
        _AXNode_ignored.set(this, void 0);
        _AXNode_cachedHasFocusableChild.set(this, void 0);
        this.payload = payload;
        Accessibility_classPrivateFieldSet(this, _AXNode_name, this.payload.name ? this.payload.name.value : '', "f");
        Accessibility_classPrivateFieldSet(this, _AXNode_role, this.payload.role ? this.payload.role.value : 'Unknown', "f");
        Accessibility_classPrivateFieldSet(this, _AXNode_ignored, this.payload.ignored, "f");
        for (const property of this.payload.properties || []) {
            if (property.name === 'editable') {
                Accessibility_classPrivateFieldSet(this, _AXNode_richlyEditable, property.value.value === 'richtext', "f");
                Accessibility_classPrivateFieldSet(this, _AXNode_editable, true, "f");
            }
            if (property.name === 'focusable') {
                Accessibility_classPrivateFieldSet(this, _AXNode_focusable, property.value.value, "f");
            }
            if (property.name === 'hidden') {
                Accessibility_classPrivateFieldSet(this, _AXNode_hidden, property.value.value, "f");
            }
        }
    }
    find(predicate) {
        if (predicate(this)) {
            return this;
        }
        for (const child of this.children) {
            const result = child.find(predicate);
            if (result) {
                return result;
            }
        }
        return null;
    }
    isLeafNode() {
        if (!this.children.length) {
            return true;
        }
        // These types of objects may have children that we use as internal
        // implementation details, but we want to expose them as leaves to platform
        // accessibility APIs because screen readers might be confused if they find
        // any children.
        if (Accessibility_classPrivateFieldGet(this, _AXNode_instances, "m", _AXNode_isPlainTextField).call(this) || Accessibility_classPrivateFieldGet(this, _AXNode_instances, "m", _AXNode_isTextOnlyObject).call(this)) {
            return true;
        }
        // Roles whose children are only presentational according to the ARIA and
        // HTML5 Specs should be hidden from screen readers.
        // (Note that whilst ARIA buttons can have only presentational children, HTML5
        // buttons are allowed to have content.)
        switch (Accessibility_classPrivateFieldGet(this, _AXNode_role, "f")) {
            case 'doc-cover':
            case 'graphics-symbol':
            case 'img':
            case 'Meter':
            case 'scrollbar':
            case 'slider':
            case 'separator':
            case 'progressbar':
                return true;
            default:
                break;
        }
        // Here and below: Android heuristics
        if (Accessibility_classPrivateFieldGet(this, _AXNode_instances, "m", _AXNode_hasFocusableChild).call(this)) {
            return false;
        }
        if (Accessibility_classPrivateFieldGet(this, _AXNode_focusable, "f") && Accessibility_classPrivateFieldGet(this, _AXNode_name, "f")) {
            return true;
        }
        if (Accessibility_classPrivateFieldGet(this, _AXNode_role, "f") === 'heading' && Accessibility_classPrivateFieldGet(this, _AXNode_name, "f")) {
            return true;
        }
        return false;
    }
    isControl() {
        switch (Accessibility_classPrivateFieldGet(this, _AXNode_role, "f")) {
            case 'button':
            case 'checkbox':
            case 'ColorWell':
            case 'combobox':
            case 'DisclosureTriangle':
            case 'listbox':
            case 'menu':
            case 'menubar':
            case 'menuitem':
            case 'menuitemcheckbox':
            case 'menuitemradio':
            case 'radio':
            case 'scrollbar':
            case 'searchbox':
            case 'slider':
            case 'spinbutton':
            case 'switch':
            case 'tab':
            case 'textbox':
            case 'tree':
            case 'treeitem':
                return true;
            default:
                return false;
        }
    }
    isInteresting(insideControl) {
        const role = Accessibility_classPrivateFieldGet(this, _AXNode_role, "f");
        if (role === 'Ignored' || Accessibility_classPrivateFieldGet(this, _AXNode_hidden, "f") || Accessibility_classPrivateFieldGet(this, _AXNode_ignored, "f")) {
            return false;
        }
        if (Accessibility_classPrivateFieldGet(this, _AXNode_focusable, "f") || Accessibility_classPrivateFieldGet(this, _AXNode_richlyEditable, "f")) {
            return true;
        }
        // If it's not focusable but has a control role, then it's interesting.
        if (this.isControl()) {
            return true;
        }
        // A non focusable child of a control is not interesting
        if (insideControl) {
            return false;
        }
        return this.isLeafNode() && !!Accessibility_classPrivateFieldGet(this, _AXNode_name, "f");
    }
    serialize() {
        const properties = new Map();
        for (const property of this.payload.properties || []) {
            properties.set(property.name.toLowerCase(), property.value.value);
        }
        if (this.payload.name) {
            properties.set('name', this.payload.name.value);
        }
        if (this.payload.value) {
            properties.set('value', this.payload.value.value);
        }
        if (this.payload.description) {
            properties.set('description', this.payload.description.value);
        }
        const node = {
            role: Accessibility_classPrivateFieldGet(this, _AXNode_role, "f"),
        };
        const userStringProperties = [
            'name',
            'value',
            'description',
            'keyshortcuts',
            'roledescription',
            'valuetext',
        ];
        const getUserStringPropertyValue = (key) => {
            return properties.get(key);
        };
        for (const userStringProperty of userStringProperties) {
            if (!properties.has(userStringProperty)) {
                continue;
            }
            node[userStringProperty] = getUserStringPropertyValue(userStringProperty);
        }
        const booleanProperties = [
            'disabled',
            'expanded',
            'focused',
            'modal',
            'multiline',
            'multiselectable',
            'readonly',
            'required',
            'selected',
        ];
        const getBooleanPropertyValue = (key) => {
            return properties.get(key);
        };
        for (const booleanProperty of booleanProperties) {
            // RootWebArea's treat focus differently than other nodes. They report whether
            // their frame  has focus, not whether focus is specifically on the root
            // node.
            if (booleanProperty === 'focused' && Accessibility_classPrivateFieldGet(this, _AXNode_role, "f") === 'RootWebArea') {
                continue;
            }
            const value = getBooleanPropertyValue(booleanProperty);
            if (!value) {
                continue;
            }
            node[booleanProperty] = getBooleanPropertyValue(booleanProperty);
        }
        const tristateProperties = ['checked', 'pressed'];
        for (const tristateProperty of tristateProperties) {
            if (!properties.has(tristateProperty)) {
                continue;
            }
            const value = properties.get(tristateProperty);
            node[tristateProperty] =
                value === 'mixed' ? 'mixed' : value === 'true' ? true : false;
        }
        const numericalProperties = [
            'level',
            'valuemax',
            'valuemin',
        ];
        const getNumericalPropertyValue = (key) => {
            return properties.get(key);
        };
        for (const numericalProperty of numericalProperties) {
            if (!properties.has(numericalProperty)) {
                continue;
            }
            node[numericalProperty] = getNumericalPropertyValue(numericalProperty);
        }
        const tokenProperties = [
            'autocomplete',
            'haspopup',
            'invalid',
            'orientation',
        ];
        const getTokenPropertyValue = (key) => {
            return properties.get(key);
        };
        for (const tokenProperty of tokenProperties) {
            const value = getTokenPropertyValue(tokenProperty);
            if (!value || value === 'false') {
                continue;
            }
            node[tokenProperty] = getTokenPropertyValue(tokenProperty);
        }
        return node;
    }
    static createTree(payloads) {
        const nodeById = new Map();
        for (const payload of payloads) {
            nodeById.set(payload.nodeId, new AXNode(payload));
        }
        for (const node of nodeById.values()) {
            for (const childId of node.payload.childIds || []) {
                node.children.push(nodeById.get(childId));
            }
        }
        return nodeById.values().next().value;
    }
}
_AXNode_richlyEditable = new WeakMap(), _AXNode_editable = new WeakMap(), _AXNode_focusable = new WeakMap(), _AXNode_hidden = new WeakMap(), _AXNode_name = new WeakMap(), _AXNode_role = new WeakMap(), _AXNode_ignored = new WeakMap(), _AXNode_cachedHasFocusableChild = new WeakMap(), _AXNode_instances = new WeakSet(), _AXNode_isPlainTextField = function _AXNode_isPlainTextField() {
    if (Accessibility_classPrivateFieldGet(this, _AXNode_richlyEditable, "f")) {
        return false;
    }
    if (Accessibility_classPrivateFieldGet(this, _AXNode_editable, "f")) {
        return true;
    }
    return Accessibility_classPrivateFieldGet(this, _AXNode_role, "f") === 'textbox' || Accessibility_classPrivateFieldGet(this, _AXNode_role, "f") === 'searchbox';
}, _AXNode_isTextOnlyObject = function _AXNode_isTextOnlyObject() {
    const role = Accessibility_classPrivateFieldGet(this, _AXNode_role, "f");
    return role === 'LineBreak' || role === 'text' || role === 'InlineTextBox';
}, _AXNode_hasFocusableChild = function _AXNode_hasFocusableChild() {
    if (Accessibility_classPrivateFieldGet(this, _AXNode_cachedHasFocusableChild, "f") === undefined) {
        Accessibility_classPrivateFieldSet(this, _AXNode_cachedHasFocusableChild, false, "f");
        for (const child of this.children) {
            if (Accessibility_classPrivateFieldGet(child, _AXNode_focusable, "f") || Accessibility_classPrivateFieldGet(child, _AXNode_instances, "m", _AXNode_hasFocusableChild).call(child)) {
                Accessibility_classPrivateFieldSet(this, _AXNode_cachedHasFocusableChild, true, "f");
                break;
            }
        }
    }
    return Accessibility_classPrivateFieldGet(this, _AXNode_cachedHasFocusableChild, "f");
};
//# sourceMappingURL=Accessibility.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/ConsoleMessage.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ConsoleMessage_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var ConsoleMessage_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConsoleMessage_type, _ConsoleMessage_text, _ConsoleMessage_args, _ConsoleMessage_stackTraceLocations;
/**
 * ConsoleMessage objects are dispatched by page via the 'console' event.
 * @public
 */
class ConsoleMessage {
    /**
     * @public
     */
    constructor(type, text, args, stackTraceLocations) {
        _ConsoleMessage_type.set(this, void 0);
        _ConsoleMessage_text.set(this, void 0);
        _ConsoleMessage_args.set(this, void 0);
        _ConsoleMessage_stackTraceLocations.set(this, void 0);
        ConsoleMessage_classPrivateFieldSet(this, _ConsoleMessage_type, type, "f");
        ConsoleMessage_classPrivateFieldSet(this, _ConsoleMessage_text, text, "f");
        ConsoleMessage_classPrivateFieldSet(this, _ConsoleMessage_args, args, "f");
        ConsoleMessage_classPrivateFieldSet(this, _ConsoleMessage_stackTraceLocations, stackTraceLocations, "f");
    }
    /**
     * @returns The type of the console message.
     */
    type() {
        return ConsoleMessage_classPrivateFieldGet(this, _ConsoleMessage_type, "f");
    }
    /**
     * @returns The text of the console message.
     */
    text() {
        return ConsoleMessage_classPrivateFieldGet(this, _ConsoleMessage_text, "f");
    }
    /**
     * @returns An array of arguments passed to the console.
     */
    args() {
        return ConsoleMessage_classPrivateFieldGet(this, _ConsoleMessage_args, "f");
    }
    /**
     * @returns The location of the console message.
     */
    location() {
        var _a;
        return (_a = ConsoleMessage_classPrivateFieldGet(this, _ConsoleMessage_stackTraceLocations, "f")[0]) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * @returns The array of locations on the stack of the console message.
     */
    stackTrace() {
        return ConsoleMessage_classPrivateFieldGet(this, _ConsoleMessage_stackTraceLocations, "f");
    }
}
_ConsoleMessage_type = new WeakMap(), _ConsoleMessage_text = new WeakMap(), _ConsoleMessage_args = new WeakMap(), _ConsoleMessage_stackTraceLocations = new WeakMap();
//# sourceMappingURL=ConsoleMessage.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/JSHandle.js
/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var JSHandle_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var JSHandle_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSHandle_client, _JSHandle_disposed, _JSHandle_context, _JSHandle_remoteObject, _ElementHandle_instances, _ElementHandle_frame, _ElementHandle_page, _ElementHandle_frameManager, _ElementHandle_scrollIntoViewIfNeeded, _ElementHandle_getOOPIFOffsets, _ElementHandle_getBoxModel, _ElementHandle_fromProtocolQuad, _ElementHandle_intersectQuadWithViewport;



/**
 * @internal
 */
function _createJSHandle(context, remoteObject) {
    const frame = context.frame();
    if (remoteObject.subtype === 'node' && frame) {
        const frameManager = frame._frameManager;
        return new ElementHandle(context, context._client, remoteObject, frame, frameManager.page(), frameManager);
    }
    return new JSHandle(context, context._client, remoteObject);
}
const applyOffsetsToQuad = (quad, offsetX, offsetY) => {
    return quad.map((part) => {
        return { x: part.x + offsetX, y: part.y + offsetY };
    });
};
/**
 * Represents an in-page JavaScript object. JSHandles can be created with the
 * {@link Page.evaluateHandle | page.evaluateHandle} method.
 *
 * @example
 * ```js
 * const windowHandle = await page.evaluateHandle(() => window);
 * ```
 *
 * JSHandle prevents the referenced JavaScript object from being garbage-collected
 * unless the handle is {@link JSHandle.dispose | disposed}. JSHandles are auto-
 * disposed when their origin frame gets navigated or the parent context gets destroyed.
 *
 * JSHandle instances can be used as arguments for {@link Page.$eval},
 * {@link Page.evaluate}, and {@link Page.evaluateHandle}.
 *
 * @public
 */
class JSHandle {
    /**
     * @internal
     */
    constructor(context, client, remoteObject) {
        _JSHandle_client.set(this, void 0);
        _JSHandle_disposed.set(this, false);
        _JSHandle_context.set(this, void 0);
        _JSHandle_remoteObject.set(this, void 0);
        JSHandle_classPrivateFieldSet(this, _JSHandle_context, context, "f");
        JSHandle_classPrivateFieldSet(this, _JSHandle_client, client, "f");
        JSHandle_classPrivateFieldSet(this, _JSHandle_remoteObject, remoteObject, "f");
    }
    /**
     * @internal
     */
    get _client() {
        return JSHandle_classPrivateFieldGet(this, _JSHandle_client, "f");
    }
    /**
     * @internal
     */
    get _disposed() {
        return JSHandle_classPrivateFieldGet(this, _JSHandle_disposed, "f");
    }
    /**
     * @internal
     */
    get _remoteObject() {
        return JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f");
    }
    /**
     * @internal
     */
    get _context() {
        return JSHandle_classPrivateFieldGet(this, _JSHandle_context, "f");
    }
    /** Returns the execution context the handle belongs to.
     */
    executionContext() {
        return JSHandle_classPrivateFieldGet(this, _JSHandle_context, "f");
    }
    /**
     * This method passes this handle as the first argument to `pageFunction`.
     * If `pageFunction` returns a Promise, then `handle.evaluate` would wait
     * for the promise to resolve and return its value.
     *
     * @example
     * ```js
     * const tweetHandle = await page.$('.tweet .retweets');
     * expect(await tweetHandle.evaluate(node => node.innerText)).toBe('10');
     * ```
     */
    async evaluate(pageFunction, ...args) {
        return await this.executionContext().evaluate(pageFunction, this, ...args);
    }
    /**
     * This method passes this handle as the first argument to `pageFunction`.
     *
     * @remarks
     *
     * The only difference between `jsHandle.evaluate` and
     * `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle`
     * returns an in-page object (JSHandle).
     *
     * If the function passed to `jsHandle.evaluateHandle` returns a Promise,
     * then `evaluateHandle.evaluateHandle` waits for the promise to resolve and
     * returns its value.
     *
     * See {@link Page.evaluateHandle} for more details.
     */
    async evaluateHandle(pageFunction, ...args) {
        return await this.executionContext().evaluateHandle(pageFunction, this, ...args);
    }
    /** Fetches a single property from the referenced object.
     */
    async getProperty(propertyName) {
        const objectHandle = await this.evaluateHandle((object, propertyName) => {
            const result = { __proto__: null };
            result[propertyName] = object[propertyName];
            return result;
        }, propertyName);
        const properties = await objectHandle.getProperties();
        const result = properties.get(propertyName);
        assert(result instanceof JSHandle);
        await objectHandle.dispose();
        return result;
    }
    /**
     * The method returns a map with property names as keys and JSHandle
     * instances for the property values.
     *
     * @example
     * ```js
     * const listHandle = await page.evaluateHandle(() => document.body.children);
     * const properties = await listHandle.getProperties();
     * const children = [];
     * for (const property of properties.values()) {
     *   const element = property.asElement();
     *   if (element)
     *     children.push(element);
     * }
     * children; // holds elementHandles to all children of document.body
     * ```
     */
    async getProperties() {
        assert(JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId);
        const response = await JSHandle_classPrivateFieldGet(this, _JSHandle_client, "f").send('Runtime.getProperties', {
            objectId: JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId,
            ownProperties: true,
        });
        const result = new Map();
        for (const property of response.result) {
            if (!property.enumerable || !property.value) {
                continue;
            }
            result.set(property.name, _createJSHandle(JSHandle_classPrivateFieldGet(this, _JSHandle_context, "f"), property.value));
        }
        return result;
    }
    /**
     * @returns Returns a JSON representation of the object.If the object has a
     * `toJSON` function, it will not be called.
     * @remarks
     *
     * The JSON is generated by running {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify | JSON.stringify}
     * on the object in page and consequent {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse | JSON.parse} in puppeteer.
     * **NOTE** The method throws if the referenced object is not stringifiable.
     */
    async jsonValue() {
        if (JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId) {
            const response = await JSHandle_classPrivateFieldGet(this, _JSHandle_client, "f").send('Runtime.callFunctionOn', {
                functionDeclaration: 'function() { return this; }',
                objectId: JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId,
                returnByValue: true,
                awaitPromise: true,
            });
            return valueFromRemoteObject(response.result);
        }
        return valueFromRemoteObject(JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
    /**
     * @returns Either `null` or the object handle itself, if the object
     * handle is an instance of {@link ElementHandle}.
     */
    asElement() {
        /*  This always returns null, but subclasses can override this and return an
             ElementHandle.
         */
        return null;
    }
    /**
     * Stops referencing the element handle, and resolves when the object handle is
     * successfully disposed of.
     */
    async dispose() {
        if (JSHandle_classPrivateFieldGet(this, _JSHandle_disposed, "f")) {
            return;
        }
        JSHandle_classPrivateFieldSet(this, _JSHandle_disposed, true, "f");
        await releaseObject(JSHandle_classPrivateFieldGet(this, _JSHandle_client, "f"), JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
    /**
     * Returns a string representation of the JSHandle.
     *
     * @remarks Useful during debugging.
     */
    toString() {
        if (JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId) {
            const type = JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").subtype || JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f").type;
            return 'JSHandle@' + type;
        }
        return 'JSHandle:' + valueFromRemoteObject(JSHandle_classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
}
_JSHandle_client = new WeakMap(), _JSHandle_disposed = new WeakMap(), _JSHandle_context = new WeakMap(), _JSHandle_remoteObject = new WeakMap();
/**
 * ElementHandle represents an in-page DOM element.
 *
 * @remarks
 *
 * ElementHandles can be created with the {@link Page.$} method.
 *
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *  const browser = await puppeteer.launch();
 *  const page = await browser.newPage();
 *  await page.goto('https://example.com');
 *  const hrefElement = await page.$('a');
 *  await hrefElement.click();
 *  // ...
 * })();
 * ```
 *
 * ElementHandle prevents the DOM element from being garbage-collected unless the
 * handle is {@link JSHandle.dispose | disposed}. ElementHandles are auto-disposed
 * when their origin frame gets navigated.
 *
 * ElementHandle instances can be used as arguments in {@link Page.$eval} and
 * {@link Page.evaluate} methods.
 *
 * If you're using TypeScript, ElementHandle takes a generic argument that
 * denotes the type of element the handle is holding within. For example, if you
 * have a handle to a `<select>` element, you can type it as
 * `ElementHandle<HTMLSelectElement>` and you get some nicer type checks.
 *
 * @public
 */
class ElementHandle extends JSHandle {
    /**
     * @internal
     */
    constructor(context, client, remoteObject, frame, page, frameManager) {
        super(context, client, remoteObject);
        _ElementHandle_instances.add(this);
        _ElementHandle_frame.set(this, void 0);
        _ElementHandle_page.set(this, void 0);
        _ElementHandle_frameManager.set(this, void 0);
        JSHandle_classPrivateFieldSet(this, _ElementHandle_frame, frame, "f");
        JSHandle_classPrivateFieldSet(this, _ElementHandle_page, page, "f");
        JSHandle_classPrivateFieldSet(this, _ElementHandle_frameManager, frameManager, "f");
    }
    /**
     * Wait for the `selector` to appear within the element. If at the moment of calling the
     * method the `selector` already exists, the method will return immediately. If
     * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * This method does not work across navigations or if the element is detached from DOM.
     *
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * of an element to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when element specified by selector string
     * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
     * selector is not found in DOM.
     * @remarks
     * The optional parameters in `options` are:
     *
     * - `visible`: wait for the selected element to be present in DOM and to be
     * visible, i.e. to not have `display: none` or `visibility: hidden` CSS
     * properties. Defaults to `false`.
     *
     * - `hidden`: wait for the selected element to not be found in the DOM or to be hidden,
     * i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
     * `false`.
     *
     * - `timeout`: maximum time to wait in milliseconds. Defaults to `30000`
     * (30 seconds). Pass `0` to disable timeout. The default value can be changed
     * by using the {@link Page.setDefaultTimeout} method.
     */
    async waitForSelector(selector, options = {}) {
        const frame = this._context.frame();
        assert(frame);
        const secondaryContext = await frame._secondaryWorld.executionContext();
        const adoptedRoot = await secondaryContext._adoptElementHandle(this);
        const handle = await frame._secondaryWorld.waitForSelector(selector, {
            ...options,
            root: adoptedRoot,
        });
        await adoptedRoot.dispose();
        if (!handle) {
            return null;
        }
        const mainExecutionContext = await frame._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    /**
     * Wait for the `xpath` within the element. If at the moment of calling the
     * method the `xpath` already exists, the method will return immediately. If
     * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * If `xpath` starts with `//` instead of `.//`, the dot will be appended automatically.
     *
     * This method works across navigation
     * ```js
     * const puppeteer = require('puppeteer');
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     * .waitForXPath('//img')
     * .then(() => console.log('First URL with image: ' + currentURL));
     * for (currentURL of [
     * 'https://example.com',
     * 'https://google.com',
     * 'https://bbc.com',
     * ]) {
     * await page.goto(currentURL);
     * }
     * await browser.close();
     * })();
     * ```
     * @param xpath - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
     * element to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when element specified by xpath string is
     * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
     * not found in DOM.
     * @remarks
     * The optional Argument `options` have properties:
     *
     * - `visible`: A boolean to wait for element to be present in DOM and to be
     * visible, i.e. to not have `display: none` or `visibility: hidden` CSS
     * properties. Defaults to `false`.
     *
     * - `hidden`: A boolean wait for element to not be found in the DOM or to be
     * hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
     * Defaults to `false`.
     *
     * - `timeout`: A number which is maximum time to wait for in milliseconds.
     * Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
     * value can be changed by using the {@link Page.setDefaultTimeout} method.
     */
    async waitForXPath(xpath, options = {}) {
        const frame = this._context.frame();
        assert(frame);
        const secondaryContext = await frame._secondaryWorld.executionContext();
        const adoptedRoot = await secondaryContext._adoptElementHandle(this);
        xpath = xpath.startsWith('//') ? '.' + xpath : xpath;
        if (!xpath.startsWith('.//')) {
            await adoptedRoot.dispose();
            throw new Error('Unsupported xpath expression: ' + xpath);
        }
        const handle = await frame._secondaryWorld.waitForXPath(xpath, {
            ...options,
            root: adoptedRoot,
        });
        await adoptedRoot.dispose();
        if (!handle) {
            return null;
        }
        const mainExecutionContext = await frame._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    asElement() {
        return this;
    }
    /**
     * Resolves to the content frame for element handles referencing
     * iframe nodes, or null otherwise
     */
    async contentFrame() {
        const nodeInfo = await this._client.send('DOM.describeNode', {
            objectId: this._remoteObject.objectId,
        });
        if (typeof nodeInfo.node.frameId !== 'string') {
            return null;
        }
        return JSHandle_classPrivateFieldGet(this, _ElementHandle_frameManager, "f").frame(nodeInfo.node.frameId);
    }
    /**
     * Returns the middle point within an element unless a specific offset is provided.
     */
    async clickablePoint(offset) {
        const [result, layoutMetrics] = await Promise.all([
            this._client
                .send('DOM.getContentQuads', {
                objectId: this._remoteObject.objectId,
            })
                .catch(debugError),
            JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f")._client().send('Page.getLayoutMetrics'),
        ]);
        if (!result || !result.quads.length) {
            throw new Error('Node is either not clickable or not an HTMLElement');
        }
        // Filter out quads that have too small area to click into.
        // Fallback to `layoutViewport` in case of using Firefox.
        const { clientWidth, clientHeight } = layoutMetrics.cssLayoutViewport || layoutMetrics.layoutViewport;
        const { offsetX, offsetY } = await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, JSHandle_classPrivateFieldGet(this, _ElementHandle_frame, "f"));
        const quads = result.quads
            .map((quad) => {
            return JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, quad);
        })
            .map((quad) => {
            return applyOffsetsToQuad(quad, offsetX, offsetY);
        })
            .map((quad) => {
            return JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_intersectQuadWithViewport).call(this, quad, clientWidth, clientHeight);
        })
            .filter((quad) => {
            return computeQuadArea(quad) > 1;
        });
        if (!quads.length) {
            throw new Error('Node is either not clickable or not an HTMLElement');
        }
        const quad = quads[0];
        if (offset) {
            // Return the point of the first quad identified by offset.
            let minX = Number.MAX_SAFE_INTEGER;
            let minY = Number.MAX_SAFE_INTEGER;
            for (const point of quad) {
                if (point.x < minX) {
                    minX = point.x;
                }
                if (point.y < minY) {
                    minY = point.y;
                }
            }
            if (minX !== Number.MAX_SAFE_INTEGER &&
                minY !== Number.MAX_SAFE_INTEGER) {
                return {
                    x: minX + offset.x,
                    y: minY + offset.y,
                };
            }
        }
        // Return the middle point of the first quad.
        let x = 0;
        let y = 0;
        for (const point of quad) {
            x += point.x;
            y += point.y;
        }
        return {
            x: x / 4,
            y: y / 4,
        };
    }
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to hover over the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async hover() {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const { x, y } = await this.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.move(x, y);
    }
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to click in the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async click(options = {}) {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const { x, y } = await this.clickablePoint(options.offset);
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.click(x, y, options);
    }
    /**
     * This method creates and captures a dragevent from the element.
     */
    async drag(target) {
        assert(JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").isDragInterceptionEnabled(), 'Drag Interception is not enabled!');
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const start = await this.clickablePoint();
        return await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.drag(start, target);
    }
    /**
     * This method creates a `dragenter` event on the element.
     */
    async dragEnter(data = { items: [], dragOperationsMask: 1 }) {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const target = await this.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.dragEnter(target, data);
    }
    /**
     * This method creates a `dragover` event on the element.
     */
    async dragOver(data = { items: [], dragOperationsMask: 1 }) {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const target = await this.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.dragOver(target, data);
    }
    /**
     * This method triggers a drop on the element.
     */
    async drop(data = { items: [], dragOperationsMask: 1 }) {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const destination = await this.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.drop(destination, data);
    }
    /**
     * This method triggers a dragenter, dragover, and drop on the element.
     */
    async dragAndDrop(target, options) {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const startPoint = await this.clickablePoint();
        const targetPoint = await target.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").mouse.dragAndDrop(startPoint, targetPoint, options);
    }
    /**
     * Triggers a `change` and `input` event once all the provided options have been
     * selected. If there's no `<select>` element matching `selector`, the method
     * throws an error.
     *
     * @example
     * ```js
     * handle.select('blue'); // single selection
     * handle.select('red', 'green', 'blue'); // multiple selections
     * ```
     * @param values - Values of options to select. If the `<select>` has the
     *    `multiple` attribute, all values are considered, otherwise only the first
     *    one is taken into account.
     */
    async select(...values) {
        for (const value of values) {
            assert(isString(value), 'Values must be strings. Found value "' +
                value +
                '" of type "' +
                typeof value +
                '"');
        }
        return this.evaluate((element, vals) => {
            const values = new Set(vals);
            if (!(element instanceof HTMLSelectElement)) {
                throw new Error('Element is not a <select> element.');
            }
            const selectedValues = new Set();
            if (!element.multiple) {
                for (const option of element.options) {
                    option.selected = false;
                }
                for (const option of element.options) {
                    if (values.has(option.value)) {
                        option.selected = true;
                        selectedValues.add(option.value);
                        break;
                    }
                }
            }
            else {
                for (const option of element.options) {
                    option.selected = values.has(option.value);
                    if (option.selected) {
                        selectedValues.add(option.value);
                    }
                }
            }
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            return [...selectedValues.values()];
        }, values);
    }
    /**
     * This method expects `elementHandle` to point to an
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input | input element}.
     *
     * @param filePaths - Sets the value of the file input to these paths.
     *    If a path is relative, then it is resolved against the
     *    {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
     *    Note for locals script connecting to remote chrome environments,
     *    paths must be absolute.
     */
    async uploadFile(...filePaths) {
        const isMultiple = await this.evaluate((element) => {
            if (!(element instanceof HTMLInputElement)) {
                throw new Error('uploadFile can only be called on an input element.');
            }
            return element.multiple;
        });
        assert(filePaths.length <= 1 || isMultiple, 'Multiple file uploads only work with <input type=file multiple>');
        // Locate all files and confirm that they exist.
        let path;
        try {
            path = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 1017, 19));
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error(`JSHandle#uploadFile can only be used in Node-like environments.`);
            }
            throw error;
        }
        const files = filePaths.map((filePath) => {
            if (path.win32.isAbsolute(filePath) || path.posix.isAbsolute(filePath)) {
                return filePath;
            }
            else {
                return path.resolve(filePath);
            }
        });
        const { objectId } = this._remoteObject;
        const { node } = await this._client.send('DOM.describeNode', { objectId });
        const { backendNodeId } = node;
        /*  The zero-length array is a special case, it seems that
             DOM.setFileInputFiles does not actually update the files in that case,
             so the solution is to eval the element value to a new FileList directly.
         */
        if (files.length === 0) {
            await this.evaluate((element) => {
                element.files = new DataTransfer().files;
                // Dispatch events for this case because it should behave akin to a user action.
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            });
        }
        else {
            await this._client.send('DOM.setFileInputFiles', {
                objectId,
                files,
                backendNodeId,
            });
        }
    }
    /**
     * This method scrolls element into view if needed, and then uses
     * {@link Touchscreen.tap} to tap in the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async tap() {
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        const { x, y } = await this.clickablePoint();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").touchscreen.tap(x, y);
    }
    /**
     * Calls {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus | focus} on the element.
     */
    async focus() {
        await this.evaluate((element) => {
            return element.focus();
        });
    }
    /**
     * Focuses the element, and then sends a `keydown`, `keypress`/`input`, and
     * `keyup` event for each character in the text.
     *
     * To press a special key, like `Control` or `ArrowDown`,
     * use {@link ElementHandle.press}.
     *
     * @example
     * ```js
     * await elementHandle.type('Hello'); // Types instantly
     * await elementHandle.type('World', {delay: 100}); // Types slower, like a user
     * ```
     *
     * @example
     * An example of typing into a text field and then submitting the form:
     *
     * ```js
     * const elementHandle = await page.$('input');
     * await elementHandle.type('some text');
     * await elementHandle.press('Enter');
     * ```
     */
    async type(text, options) {
        await this.focus();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").keyboard.type(text, options);
    }
    /**
     * Focuses the element, and then uses {@link Keyboard.down} and {@link Keyboard.up}.
     *
     * @remarks
     * If `key` is a single character and no modifier keys besides `Shift`
     * are being held down, a `keypress`/`input` event will also be generated.
     * The `text` option can be specified to force an input event to be generated.
     *
     * **NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift`
     * will type the text in upper case.
     *
     * @param key - Name of key to press, such as `ArrowLeft`.
     *    See {@link KeyInput} for a list of all key names.
     */
    async press(key, options) {
        await this.focus();
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").keyboard.press(key, options);
    }
    /**
     * This method returns the bounding box of the element (relative to the main frame),
     * or `null` if the element is not visible.
     */
    async boundingBox() {
        const result = await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
        if (!result) {
            return null;
        }
        const { offsetX, offsetY } = await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, JSHandle_classPrivateFieldGet(this, _ElementHandle_frame, "f"));
        const quad = result.model.border;
        const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
        const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
        const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x;
        const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y;
        return { x: x + offsetX, y: y + offsetY, width, height };
    }
    /**
     * This method returns boxes of the element, or `null` if the element is not visible.
     *
     * @remarks
     *
     * Boxes are represented as an array of points;
     * Each Point is an object `{x, y}`. Box points are sorted clock-wise.
     */
    async boxModel() {
        const result = await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
        if (!result) {
            return null;
        }
        const { offsetX, offsetY } = await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, JSHandle_classPrivateFieldGet(this, _ElementHandle_frame, "f"));
        const { content, padding, border, margin, width, height } = result.model;
        return {
            content: applyOffsetsToQuad(JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, content), offsetX, offsetY),
            padding: applyOffsetsToQuad(JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, padding), offsetX, offsetY),
            border: applyOffsetsToQuad(JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, border), offsetX, offsetY),
            margin: applyOffsetsToQuad(JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, margin), offsetX, offsetY),
            width,
            height,
        };
    }
    /**
     * This method scrolls element into view if needed, and then uses
     * {@link Page.screenshot} to take a screenshot of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async screenshot(options = {}) {
        let needsViewportReset = false;
        let boundingBox = await this.boundingBox();
        assert(boundingBox, 'Node is either not visible or not an HTMLElement');
        const viewport = JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").viewport();
        assert(viewport);
        if (boundingBox.width > viewport.width ||
            boundingBox.height > viewport.height) {
            const newViewport = {
                width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
                height: Math.max(viewport.height, Math.ceil(boundingBox.height)),
            };
            await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").setViewport(Object.assign({}, viewport, newViewport));
            needsViewportReset = true;
        }
        await JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
        boundingBox = await this.boundingBox();
        assert(boundingBox, 'Node is either not visible or not an HTMLElement');
        assert(boundingBox.width !== 0, 'Node has 0 width.');
        assert(boundingBox.height !== 0, 'Node has 0 height.');
        const layoutMetrics = await this._client.send('Page.getLayoutMetrics');
        // Fallback to `layoutViewport` in case of using Firefox.
        const { pageX, pageY } = layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;
        const clip = Object.assign({}, boundingBox);
        clip.x += pageX;
        clip.y += pageY;
        const imageData = await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").screenshot(Object.assign({}, {
            clip,
        }, options));
        if (needsViewportReset) {
            await JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").setViewport(viewport);
        }
        return imageData;
    }
    /**
     * Runs `element.querySelector` within the page.
     *
     * @param selector - The selector to query with.
     * @returns `null` if no element matches the selector.
     * @throws `Error` if the selector has no associated query handler.
     */
    async $(selector) {
        const { updatedSelector, queryHandler } = _getQueryHandlerAndSelector(selector);
        assert(queryHandler.queryOne, 'Cannot handle queries for a single element with the given selector');
        return queryHandler.queryOne(this, updatedSelector);
    }
    /**
     * Runs `element.querySelectorAll` within the page. If no elements match the selector,
     * the return value resolves to `[]`.
     */
    /**
     * Runs `element.querySelectorAll` within the page.
     *
     * @param selector - The selector to query with.
     * @returns `[]` if no element matches the selector.
     * @throws `Error` if the selector has no associated query handler.
     */
    async $$(selector) {
        const { updatedSelector, queryHandler } = _getQueryHandlerAndSelector(selector);
        assert(queryHandler.queryAll, 'Cannot handle queries for a multiple element with the given selector');
        return queryHandler.queryAll(this, updatedSelector);
    }
    /**
     * This method runs `document.querySelector` within the element and passes it as
     * the first argument to `pageFunction`. If there's no element matching `selector`,
     * the method throws an error.
     *
     * If `pageFunction` returns a Promise, then `frame.$eval` would wait for the promise
     * to resolve and return its value.
     *
     * @example
     * ```js
     * const tweetHandle = await page.$('.tweet');
     * expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
     * expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
     * ```
     */
    async $eval(selector, pageFunction, ...args) {
        const elementHandle = await this.$(selector);
        if (!elementHandle) {
            throw new Error(`Error: failed to find element matching selector "${selector}"`);
        }
        const result = await elementHandle.evaluate(pageFunction, ...args);
        await elementHandle.dispose();
        /**
         * This `as` is a little unfortunate but helps TS understand the behavior of
         * `elementHandle.evaluate`. If evaluate returns an element it will return an
         * ElementHandle instance, rather than the plain object. All the
         * WrapElementHandle type does is wrap ReturnType into
         * ElementHandle<ReturnType> if it is an ElementHandle, or leave it alone as
         * ReturnType if it isn't.
         */
        return result;
    }
    /**
     * This method runs `document.querySelectorAll` within the element and passes it as
     * the first argument to `pageFunction`. If there's no element matching `selector`,
     * the method throws an error.
     *
     * If `pageFunction` returns a Promise, then `frame.$$eval` would wait for the
     * promise to resolve and return its value.
     *
     * @example
     * ```html
     * <div class="feed">
     *   <div class="tweet">Hello!</div>
     *   <div class="tweet">Hi!</div>
     * </div>
     * ```
     *
     * @example
     * ```js
     * const feedHandle = await page.$('.feed');
     * expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText)))
     *  .toEqual(['Hello!', 'Hi!']);
     * ```
     */
    async $$eval(selector, pageFunction, ...args) {
        const { updatedSelector, queryHandler } = _getQueryHandlerAndSelector(selector);
        assert(queryHandler.queryAllArray);
        const arrayHandle = await queryHandler.queryAllArray(this, updatedSelector);
        const result = await arrayHandle.evaluate(pageFunction, ...args);
        await arrayHandle.dispose();
        /* This `as` exists for the same reason as the `as` in $eval above.
         * See the comment there for a full explanation.
         */
        return result;
    }
    /**
     * The method evaluates the XPath expression relative to the elementHandle.
     * If there are no such elements, the method will resolve to an empty array.
     * @param expression - Expression to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate | evaluate}
     */
    async $x(expression) {
        const arrayHandle = await this.evaluateHandle((element, expression) => {
            const document = element.ownerDocument || element;
            const iterator = document.evaluate(expression, element, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
            const array = [];
            let item;
            while ((item = iterator.iterateNext())) {
                array.push(item);
            }
            return array;
        }, expression);
        const properties = await arrayHandle.getProperties();
        await arrayHandle.dispose();
        const result = [];
        for (const property of properties.values()) {
            const elementHandle = property.asElement();
            if (elementHandle) {
                result.push(elementHandle);
            }
        }
        return result;
    }
    /**
     * Resolves to true if the element is visible in the current viewport.
     */
    async isIntersectingViewport(options) {
        const { threshold = 0 } = options || {};
        return await this.evaluate(async (element, threshold) => {
            const visibleRatio = await new Promise((resolve) => {
                const observer = new IntersectionObserver((entries) => {
                    resolve(entries[0].intersectionRatio);
                    observer.disconnect();
                });
                observer.observe(element);
            });
            return threshold === 1 ? visibleRatio === 1 : visibleRatio > threshold;
        }, threshold);
    }
}
_ElementHandle_frame = new WeakMap(), _ElementHandle_page = new WeakMap(), _ElementHandle_frameManager = new WeakMap(), _ElementHandle_instances = new WeakSet(), _ElementHandle_scrollIntoViewIfNeeded = async function _ElementHandle_scrollIntoViewIfNeeded() {
    const error = await this.evaluate(async (element, pageJavascriptEnabled) => {
        if (!element.isConnected) {
            return 'Node is detached from document';
        }
        if (element.nodeType !== Node.ELEMENT_NODE) {
            return 'Node is not of type HTMLElement';
        }
        // force-scroll if page's javascript is disabled.
        if (!pageJavascriptEnabled) {
            element.scrollIntoView({
                block: 'center',
                inline: 'center',
                // @ts-expect-error Chrome still supports behavior: instant but
                // it's not in the spec so TS shouts We don't want to make this
                // breaking change in Puppeteer yet so we'll ignore the line.
                behavior: 'instant',
            });
            return false;
        }
        const visibleRatio = await new Promise((resolve) => {
            const observer = new IntersectionObserver((entries) => {
                resolve(entries[0].intersectionRatio);
                observer.disconnect();
            });
            observer.observe(element);
        });
        if (visibleRatio !== 1.0) {
            element.scrollIntoView({
                block: 'center',
                inline: 'center',
                // @ts-expect-error Chrome still supports behavior: instant but
                // it's not in the spec so TS shouts We don't want to make this
                // breaking change in Puppeteer yet so we'll ignore the line.
                behavior: 'instant',
            });
        }
        return false;
    }, JSHandle_classPrivateFieldGet(this, _ElementHandle_page, "f").isJavaScriptEnabled());
    if (error) {
        throw new Error(error);
    }
}, _ElementHandle_getOOPIFOffsets = async function _ElementHandle_getOOPIFOffsets(frame) {
    let offsetX = 0;
    let offsetY = 0;
    let currentFrame = frame;
    while (currentFrame && currentFrame.parentFrame()) {
        const parent = currentFrame.parentFrame();
        if (!currentFrame.isOOPFrame() || !parent) {
            currentFrame = parent;
            continue;
        }
        const { backendNodeId } = await parent
            ._client()
            .send('DOM.getFrameOwner', {
            frameId: currentFrame._id,
        });
        const result = await parent._client().send('DOM.getBoxModel', {
            backendNodeId: backendNodeId,
        });
        if (!result) {
            break;
        }
        const contentBoxQuad = result.model.content;
        const topLeftCorner = JSHandle_classPrivateFieldGet(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, contentBoxQuad)[0];
        offsetX += topLeftCorner.x;
        offsetY += topLeftCorner.y;
        currentFrame = parent;
    }
    return { offsetX, offsetY };
}, _ElementHandle_getBoxModel = function _ElementHandle_getBoxModel() {
    const params = {
        objectId: this._remoteObject.objectId,
    };
    return this._client.send('DOM.getBoxModel', params).catch((error) => {
        return debugError(error);
    });
}, _ElementHandle_fromProtocolQuad = function _ElementHandle_fromProtocolQuad(quad) {
    return [
        { x: quad[0], y: quad[1] },
        { x: quad[2], y: quad[3] },
        { x: quad[4], y: quad[5] },
        { x: quad[6], y: quad[7] },
    ];
}, _ElementHandle_intersectQuadWithViewport = function _ElementHandle_intersectQuadWithViewport(quad, width, height) {
    return quad.map((point) => {
        return {
            x: Math.min(Math.max(point.x, 0), width),
            y: Math.min(Math.max(point.y, 0), height),
        };
    });
};
function computeQuadArea(quad) {
    /* Compute sum of all directed areas of adjacent triangles
       https://en.wikipedia.org/wiki/Polygon#Simple_polygons
     */
    let area = 0;
    for (let i = 0; i < quad.length; ++i) {
        const p1 = quad[i];
        const p2 = quad[(i + 1) % quad.length];
        area += (p1.x * p2.y - p2.x * p1.y) / 2;
    }
    return Math.abs(area);
}
//# sourceMappingURL=JSHandle.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/ExecutionContext.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ExecutionContext_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExecutionContext_instances, _ExecutionContext_evaluate;



/**
 * @public
 */
const EVALUATION_SCRIPT_URL = 'pptr://__puppeteer_evaluation_script__';
const SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
/**
 * This class represents a context for JavaScript execution. A [Page] might have
 * many execution contexts:
 * - each
 *   {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe |
 *   frame } has "default" execution context that is always created after frame is
 *   attached to DOM. This context is returned by the
 *   {@link Frame.executionContext} method.
 * - {@link https://developer.chrome.com/extensions | Extension}'s content scripts
 *   create additional execution contexts.
 *
 * Besides pages, execution contexts can be found in
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
 * workers }.
 *
 * @public
 */
class ExecutionContext {
    /**
     * @internal
     */
    constructor(client, contextPayload, world) {
        _ExecutionContext_instances.add(this);
        this._client = client;
        this._world = world;
        this._contextId = contextPayload.id;
        this._contextName = contextPayload.name;
    }
    /**
     * @remarks
     *
     * Not every execution context is associated with a frame. For
     * example, workers and extensions have execution contexts that are not
     * associated with frames.
     *
     * @returns The frame associated with this execution context.
     */
    frame() {
        return this._world ? this._world.frame() : null;
    }
    /**
     * @remarks
     * If the function passed to the `executionContext.evaluate` returns a
     * Promise, then `executionContext.evaluate` would wait for the promise to
     * resolve and return its value. If the function passed to the
     * `executionContext.evaluate` returns a non-serializable value, then
     * `executionContext.evaluate` resolves to `undefined`. DevTools Protocol also
     * supports transferring some additional values that are not serializable by
     * `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.
     *
     *
     * @example
     * ```js
     * const executionContext = await page.mainFrame().executionContext();
     * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
     * console.log(result); // prints "56"
     * ```
     *
     * @example
     * A string can also be passed in instead of a function.
     *
     * ```js
     * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
     * ```
     *
     * @example
     * {@link JSHandle} instances can be passed as arguments to the
     * `executionContext.* evaluate`:
     * ```js
     * const oneHandle = await executionContext.evaluateHandle(() => 1);
     * const twoHandle = await executionContext.evaluateHandle(() => 2);
     * const result = await executionContext.evaluate(
     *    (a, b) => a + b, oneHandle, * twoHandle
     * );
     * await oneHandle.dispose();
     * await twoHandle.dispose();
     * console.log(result); // prints '3'.
     * ```
     * @param pageFunction - a function to be evaluated in the `executionContext`
     * @param args - argument to pass to the page function
     *
     * @returns A promise that resolves to the return value of the given function.
     */
    async evaluate(pageFunction, ...args) {
        return await ExecutionContext_classPrivateFieldGet(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, true, pageFunction, ...args);
    }
    /**
     * @remarks
     * The only difference between `executionContext.evaluate` and
     * `executionContext.evaluateHandle` is that `executionContext.evaluateHandle`
     * returns an in-page object (a {@link JSHandle}).
     * If the function passed to the `executionContext.evaluateHandle` returns a
     * Promise, then `executionContext.evaluateHandle` would wait for the
     * promise to resolve and return its value.
     *
     * @example
     * ```js
     * const context = await page.mainFrame().executionContext();
     * const aHandle = await context.evaluateHandle(() => Promise.resolve(self));
     * aHandle; // Handle for the global object.
     * ```
     *
     * @example
     * A string can also be passed in instead of a function.
     *
     * ```js
     * // Handle for the '3' * object.
     * const aHandle = await context.evaluateHandle('1 + 2');
     * ```
     *
     * @example
     * JSHandle instances can be passed as arguments
     * to the `executionContext.* evaluateHandle`:
     *
     * ```js
     * const aHandle = await context.evaluateHandle(() => document.body);
     * const resultHandle = await context.evaluateHandle(body => body.innerHTML, * aHandle);
     * console.log(await resultHandle.jsonValue()); // prints body's innerHTML
     * await aHandle.dispose();
     * await resultHandle.dispose();
     * ```
     *
     * @param pageFunction - a function to be evaluated in the `executionContext`
     * @param args - argument to pass to the page function
     *
     * @returns A promise that resolves to the return value of the given function
     * as an in-page object (a {@link JSHandle}).
     */
    async evaluateHandle(pageFunction, ...args) {
        return ExecutionContext_classPrivateFieldGet(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, false, pageFunction, ...args);
    }
    /**
     * This method iterates the JavaScript heap and finds all the objects with the
     * given prototype.
     * @remarks
     * @example
     * ```js
     * // Create a Map object
     * await page.evaluate(() => window.map = new Map());
     * // Get a handle to the Map object prototype
     * const mapPrototype = await page.evaluateHandle(() => Map.prototype);
     * // Query all map instances into an array
     * const mapInstances = await page.queryObjects(mapPrototype);
     * // Count amount of map objects in heap
     * const count = await page.evaluate(maps => maps.length, mapInstances);
     * await mapInstances.dispose();
     * await mapPrototype.dispose();
     * ```
     *
     * @param prototypeHandle - a handle to the object prototype
     *
     * @returns A handle to an array of objects with the given prototype.
     */
    async queryObjects(prototypeHandle) {
        assert(!prototypeHandle._disposed, 'Prototype JSHandle is disposed!');
        assert(prototypeHandle._remoteObject.objectId, 'Prototype JSHandle must not be referencing primitive value');
        const response = await this._client.send('Runtime.queryObjects', {
            prototypeObjectId: prototypeHandle._remoteObject.objectId,
        });
        return _createJSHandle(this, response.objects);
    }
    /**
     * @internal
     */
    async _adoptBackendNodeId(backendNodeId) {
        const { object } = await this._client.send('DOM.resolveNode', {
            backendNodeId: backendNodeId,
            executionContextId: this._contextId,
        });
        return _createJSHandle(this, object);
    }
    /**
     * @internal
     */
    async _adoptElementHandle(elementHandle) {
        assert(elementHandle.executionContext() !== this, 'Cannot adopt handle that already belongs to this execution context');
        assert(this._world, 'Cannot adopt handle without DOMWorld');
        const nodeInfo = await this._client.send('DOM.describeNode', {
            objectId: elementHandle._remoteObject.objectId,
        });
        return this._adoptBackendNodeId(nodeInfo.node.backendNodeId);
    }
}
_ExecutionContext_instances = new WeakSet(), _ExecutionContext_evaluate = async function _ExecutionContext_evaluate(returnByValue, pageFunction, ...args) {
    const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
    if (isString(pageFunction)) {
        const contextId = this._contextId;
        const expression = pageFunction;
        const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression)
            ? expression
            : expression + '\n' + suffix;
        const { exceptionDetails, result: remoteObject } = await this._client
            .send('Runtime.evaluate', {
            expression: expressionWithSourceUrl,
            contextId,
            returnByValue,
            awaitPromise: true,
            userGesture: true,
        })
            .catch(rewriteError);
        if (exceptionDetails) {
            throw new Error('Evaluation failed: ' + getExceptionMessage(exceptionDetails));
        }
        return returnByValue
            ? valueFromRemoteObject(remoteObject)
            : _createJSHandle(this, remoteObject);
    }
    if (typeof pageFunction !== 'function') {
        throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);
    }
    let functionText = pageFunction.toString();
    try {
        new Function('(' + functionText + ')');
    }
    catch (error) {
        // This means we might have a function shorthand. Try another
        // time prefixing 'function '.
        if (functionText.startsWith('async ')) {
            functionText =
                'async function ' + functionText.substring('async '.length);
        }
        else {
            functionText = 'function ' + functionText;
        }
        try {
            new Function('(' + functionText + ')');
        }
        catch (error) {
            // We tried hard to serialize, but there's a weird beast here.
            throw new Error('Passed function is not well-serializable!');
        }
    }
    let callFunctionOnPromise;
    try {
        callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
            functionDeclaration: functionText + '\n' + suffix + '\n',
            executionContextId: this._contextId,
            arguments: args.map(convertArgument.bind(this)),
            returnByValue,
            awaitPromise: true,
            userGesture: true,
        });
    }
    catch (error) {
        if (error instanceof TypeError &&
            error.message.startsWith('Converting circular structure to JSON')) {
            error.message += ' Recursive objects are not allowed.';
        }
        throw error;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
    if (exceptionDetails) {
        throw new Error('Evaluation failed: ' + getExceptionMessage(exceptionDetails));
    }
    return returnByValue
        ? valueFromRemoteObject(remoteObject)
        : _createJSHandle(this, remoteObject);
    function convertArgument(arg) {
        if (typeof arg === 'bigint') {
            // eslint-disable-line valid-typeof
            return { unserializableValue: `${arg.toString()}n` };
        }
        if (Object.is(arg, -0)) {
            return { unserializableValue: '-0' };
        }
        if (Object.is(arg, Infinity)) {
            return { unserializableValue: 'Infinity' };
        }
        if (Object.is(arg, -Infinity)) {
            return { unserializableValue: '-Infinity' };
        }
        if (Object.is(arg, NaN)) {
            return { unserializableValue: 'NaN' };
        }
        const objectHandle = arg && arg instanceof JSHandle ? arg : null;
        if (objectHandle) {
            if (objectHandle._context !== this) {
                throw new Error('JSHandles can be evaluated only in the context they were created!');
            }
            if (objectHandle._disposed) {
                throw new Error('JSHandle is disposed!');
            }
            if (objectHandle._remoteObject.unserializableValue) {
                return {
                    unserializableValue: objectHandle._remoteObject.unserializableValue,
                };
            }
            if (!objectHandle._remoteObject.objectId) {
                return { value: objectHandle._remoteObject.value };
            }
            return { objectId: objectHandle._remoteObject.objectId };
        }
        return { value: arg };
    }
    function rewriteError(error) {
        if (error.message.includes('Object reference chain is too long')) {
            return { result: { type: 'undefined' } };
        }
        if (error.message.includes("Object couldn't be returned by value")) {
            return { result: { type: 'undefined' } };
        }
        if (error.message.endsWith('Cannot find context with specified id') ||
            error.message.endsWith('Inspected target navigated or closed')) {
            throw new Error('Execution context was destroyed, most likely because of a navigation.');
        }
        throw error;
    }
};
//# sourceMappingURL=ExecutionContext.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Coverage.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Coverage_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Coverage_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Coverage_jsCoverage, _Coverage_cssCoverage, _JSCoverage_instances, _JSCoverage_client, _JSCoverage_enabled, _JSCoverage_scriptURLs, _JSCoverage_scriptSources, _JSCoverage_eventListeners, _JSCoverage_resetOnNavigation, _JSCoverage_reportAnonymousScripts, _JSCoverage_includeRawScriptCoverage, _JSCoverage_onExecutionContextsCleared, _JSCoverage_onScriptParsed, _CSSCoverage_instances, _CSSCoverage_client, _CSSCoverage_enabled, _CSSCoverage_stylesheetURLs, _CSSCoverage_stylesheetSources, _CSSCoverage_eventListeners, _CSSCoverage_resetOnNavigation, _CSSCoverage_onExecutionContextsCleared, _CSSCoverage_onStyleSheet;




/**
 * The Coverage class provides methods to gathers information about parts of
 * JavaScript and CSS that were used by the page.
 *
 * @remarks
 * To output coverage in a form consumable by {@link https://github.com/istanbuljs | Istanbul},
 * see {@link https://github.com/istanbuljs/puppeteer-to-istanbul | puppeteer-to-istanbul}.
 *
 * @example
 * An example of using JavaScript and CSS coverage to get percentage of initially
 * executed code:
 * ```js
 * // Enable both JavaScript and CSS coverage
 * await Promise.all([
 *   page.coverage.startJSCoverage(),
 *   page.coverage.startCSSCoverage()
 * ]);
 * // Navigate to page
 * await page.goto('https://example.com');
 * // Disable both JavaScript and CSS coverage
 * const [jsCoverage, cssCoverage] = await Promise.all([
 *   page.coverage.stopJSCoverage(),
 *   page.coverage.stopCSSCoverage(),
 * ]);
 * let totalBytes = 0;
 * let usedBytes = 0;
 * const coverage = [...jsCoverage, ...cssCoverage];
 * for (const entry of coverage) {
 *   totalBytes += entry.text.length;
 *   for (const range of entry.ranges)
 *     usedBytes += range.end - range.start - 1;
 * }
 * console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
 * ```
 * @public
 */
class Coverage {
    constructor(client) {
        _Coverage_jsCoverage.set(this, void 0);
        _Coverage_cssCoverage.set(this, void 0);
        Coverage_classPrivateFieldSet(this, _Coverage_jsCoverage, new JSCoverage(client), "f");
        Coverage_classPrivateFieldSet(this, _Coverage_cssCoverage, new CSSCoverage(client), "f");
    }
    /**
     * @param options - Set of configurable options for coverage defaults to
     * `resetOnNavigation : true, reportAnonymousScripts : false`
     * @returns Promise that resolves when coverage is started.
     *
     * @remarks
     * Anonymous scripts are ones that don't have an associated url. These are
     * scripts that are dynamically created on the page using `eval` or
     * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
     * scripts will have `pptr://__puppeteer_evaluation_script__` as their URL.
     */
    async startJSCoverage(options = {}) {
        return await Coverage_classPrivateFieldGet(this, _Coverage_jsCoverage, "f").start(options);
    }
    /**
     * @returns Promise that resolves to the array of coverage reports for
     * all scripts.
     *
     * @remarks
     * JavaScript Coverage doesn't include anonymous scripts by default.
     * However, scripts with sourceURLs are reported.
     */
    async stopJSCoverage() {
        return await Coverage_classPrivateFieldGet(this, _Coverage_jsCoverage, "f").stop();
    }
    /**
     * @param options - Set of configurable options for coverage, defaults to
     * `resetOnNavigation : true`
     * @returns Promise that resolves when coverage is started.
     */
    async startCSSCoverage(options = {}) {
        return await Coverage_classPrivateFieldGet(this, _Coverage_cssCoverage, "f").start(options);
    }
    /**
     * @returns Promise that resolves to the array of coverage reports
     * for all stylesheets.
     * @remarks
     * CSS Coverage doesn't include dynamically injected style tags
     * without sourceURLs.
     */
    async stopCSSCoverage() {
        return await Coverage_classPrivateFieldGet(this, _Coverage_cssCoverage, "f").stop();
    }
}
_Coverage_jsCoverage = new WeakMap(), _Coverage_cssCoverage = new WeakMap();
/**
 * @public
 */
class JSCoverage {
    constructor(client) {
        _JSCoverage_instances.add(this);
        _JSCoverage_client.set(this, void 0);
        _JSCoverage_enabled.set(this, false);
        _JSCoverage_scriptURLs.set(this, new Map());
        _JSCoverage_scriptSources.set(this, new Map());
        _JSCoverage_eventListeners.set(this, []);
        _JSCoverage_resetOnNavigation.set(this, false);
        _JSCoverage_reportAnonymousScripts.set(this, false);
        _JSCoverage_includeRawScriptCoverage.set(this, false);
        Coverage_classPrivateFieldSet(this, _JSCoverage_client, client, "f");
    }
    async start(options = {}) {
        assert(!Coverage_classPrivateFieldGet(this, _JSCoverage_enabled, "f"), 'JSCoverage is already enabled');
        const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false, } = options;
        Coverage_classPrivateFieldSet(this, _JSCoverage_resetOnNavigation, resetOnNavigation, "f");
        Coverage_classPrivateFieldSet(this, _JSCoverage_reportAnonymousScripts, reportAnonymousScripts, "f");
        Coverage_classPrivateFieldSet(this, _JSCoverage_includeRawScriptCoverage, includeRawScriptCoverage, "f");
        Coverage_classPrivateFieldSet(this, _JSCoverage_enabled, true, "f");
        Coverage_classPrivateFieldGet(this, _JSCoverage_scriptURLs, "f").clear();
        Coverage_classPrivateFieldGet(this, _JSCoverage_scriptSources, "f").clear();
        Coverage_classPrivateFieldSet(this, _JSCoverage_eventListeners, [
            addEventListener(Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f"), 'Debugger.scriptParsed', Coverage_classPrivateFieldGet(this, _JSCoverage_instances, "m", _JSCoverage_onScriptParsed).bind(this)),
            addEventListener(Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f"), 'Runtime.executionContextsCleared', Coverage_classPrivateFieldGet(this, _JSCoverage_instances, "m", _JSCoverage_onExecutionContextsCleared).bind(this)),
        ], "f");
        await Promise.all([
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Profiler.enable'),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Profiler.startPreciseCoverage', {
                callCount: Coverage_classPrivateFieldGet(this, _JSCoverage_includeRawScriptCoverage, "f"),
                detailed: true,
            }),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Debugger.enable'),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Debugger.setSkipAllPauses', { skip: true }),
        ]);
    }
    async stop() {
        assert(Coverage_classPrivateFieldGet(this, _JSCoverage_enabled, "f"), 'JSCoverage is not enabled');
        Coverage_classPrivateFieldSet(this, _JSCoverage_enabled, false, "f");
        const result = await Promise.all([
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Profiler.takePreciseCoverage'),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Profiler.stopPreciseCoverage'),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Profiler.disable'),
            Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Debugger.disable'),
        ]);
        removeEventListeners(Coverage_classPrivateFieldGet(this, _JSCoverage_eventListeners, "f"));
        const coverage = [];
        const profileResponse = result[0];
        for (const entry of profileResponse.result) {
            let url = Coverage_classPrivateFieldGet(this, _JSCoverage_scriptURLs, "f").get(entry.scriptId);
            if (!url && Coverage_classPrivateFieldGet(this, _JSCoverage_reportAnonymousScripts, "f")) {
                url = 'debugger://VM' + entry.scriptId;
            }
            const text = Coverage_classPrivateFieldGet(this, _JSCoverage_scriptSources, "f").get(entry.scriptId);
            if (text === undefined || url === undefined) {
                continue;
            }
            const flattenRanges = [];
            for (const func of entry.functions) {
                flattenRanges.push(...func.ranges);
            }
            const ranges = convertToDisjointRanges(flattenRanges);
            if (!Coverage_classPrivateFieldGet(this, _JSCoverage_includeRawScriptCoverage, "f")) {
                coverage.push({ url, ranges, text });
            }
            else {
                coverage.push({ url, ranges, text, rawScriptCoverage: entry });
            }
        }
        return coverage;
    }
}
_JSCoverage_client = new WeakMap(), _JSCoverage_enabled = new WeakMap(), _JSCoverage_scriptURLs = new WeakMap(), _JSCoverage_scriptSources = new WeakMap(), _JSCoverage_eventListeners = new WeakMap(), _JSCoverage_resetOnNavigation = new WeakMap(), _JSCoverage_reportAnonymousScripts = new WeakMap(), _JSCoverage_includeRawScriptCoverage = new WeakMap(), _JSCoverage_instances = new WeakSet(), _JSCoverage_onExecutionContextsCleared = function _JSCoverage_onExecutionContextsCleared() {
    if (!Coverage_classPrivateFieldGet(this, _JSCoverage_resetOnNavigation, "f")) {
        return;
    }
    Coverage_classPrivateFieldGet(this, _JSCoverage_scriptURLs, "f").clear();
    Coverage_classPrivateFieldGet(this, _JSCoverage_scriptSources, "f").clear();
}, _JSCoverage_onScriptParsed = async function _JSCoverage_onScriptParsed(event) {
    // Ignore puppeteer-injected scripts
    if (event.url === EVALUATION_SCRIPT_URL) {
        return;
    }
    // Ignore other anonymous scripts unless the reportAnonymousScripts option is true.
    if (!event.url && !Coverage_classPrivateFieldGet(this, _JSCoverage_reportAnonymousScripts, "f")) {
        return;
    }
    try {
        const response = await Coverage_classPrivateFieldGet(this, _JSCoverage_client, "f").send('Debugger.getScriptSource', {
            scriptId: event.scriptId,
        });
        Coverage_classPrivateFieldGet(this, _JSCoverage_scriptURLs, "f").set(event.scriptId, event.url);
        Coverage_classPrivateFieldGet(this, _JSCoverage_scriptSources, "f").set(event.scriptId, response.scriptSource);
    }
    catch (error) {
        // This might happen if the page has already navigated away.
        debugError(error);
    }
};
/**
 * @public
 */
class CSSCoverage {
    constructor(client) {
        _CSSCoverage_instances.add(this);
        _CSSCoverage_client.set(this, void 0);
        _CSSCoverage_enabled.set(this, false);
        _CSSCoverage_stylesheetURLs.set(this, new Map());
        _CSSCoverage_stylesheetSources.set(this, new Map());
        _CSSCoverage_eventListeners.set(this, []);
        _CSSCoverage_resetOnNavigation.set(this, false);
        Coverage_classPrivateFieldSet(this, _CSSCoverage_client, client, "f");
    }
    async start(options = {}) {
        assert(!Coverage_classPrivateFieldGet(this, _CSSCoverage_enabled, "f"), 'CSSCoverage is already enabled');
        const { resetOnNavigation = true } = options;
        Coverage_classPrivateFieldSet(this, _CSSCoverage_resetOnNavigation, resetOnNavigation, "f");
        Coverage_classPrivateFieldSet(this, _CSSCoverage_enabled, true, "f");
        Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetURLs, "f").clear();
        Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetSources, "f").clear();
        Coverage_classPrivateFieldSet(this, _CSSCoverage_eventListeners, [
            addEventListener(Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f"), 'CSS.styleSheetAdded', Coverage_classPrivateFieldGet(this, _CSSCoverage_instances, "m", _CSSCoverage_onStyleSheet).bind(this)),
            addEventListener(Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f"), 'Runtime.executionContextsCleared', Coverage_classPrivateFieldGet(this, _CSSCoverage_instances, "m", _CSSCoverage_onExecutionContextsCleared).bind(this)),
        ], "f");
        await Promise.all([
            Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('DOM.enable'),
            Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('CSS.enable'),
            Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('CSS.startRuleUsageTracking'),
        ]);
    }
    async stop() {
        assert(Coverage_classPrivateFieldGet(this, _CSSCoverage_enabled, "f"), 'CSSCoverage is not enabled');
        Coverage_classPrivateFieldSet(this, _CSSCoverage_enabled, false, "f");
        const ruleTrackingResponse = await Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('CSS.stopRuleUsageTracking');
        await Promise.all([
            Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('CSS.disable'),
            Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('DOM.disable'),
        ]);
        removeEventListeners(Coverage_classPrivateFieldGet(this, _CSSCoverage_eventListeners, "f"));
        // aggregate by styleSheetId
        const styleSheetIdToCoverage = new Map();
        for (const entry of ruleTrackingResponse.ruleUsage) {
            let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
            if (!ranges) {
                ranges = [];
                styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
            }
            ranges.push({
                startOffset: entry.startOffset,
                endOffset: entry.endOffset,
                count: entry.used ? 1 : 0,
            });
        }
        const coverage = [];
        for (const styleSheetId of Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetURLs, "f").keys()) {
            const url = Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetURLs, "f").get(styleSheetId);
            assert(url);
            const text = Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetSources, "f").get(styleSheetId);
            assert(text);
            const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
            coverage.push({ url, ranges, text });
        }
        return coverage;
    }
}
_CSSCoverage_client = new WeakMap(), _CSSCoverage_enabled = new WeakMap(), _CSSCoverage_stylesheetURLs = new WeakMap(), _CSSCoverage_stylesheetSources = new WeakMap(), _CSSCoverage_eventListeners = new WeakMap(), _CSSCoverage_resetOnNavigation = new WeakMap(), _CSSCoverage_instances = new WeakSet(), _CSSCoverage_onExecutionContextsCleared = function _CSSCoverage_onExecutionContextsCleared() {
    if (!Coverage_classPrivateFieldGet(this, _CSSCoverage_resetOnNavigation, "f")) {
        return;
    }
    Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetURLs, "f").clear();
    Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetSources, "f").clear();
}, _CSSCoverage_onStyleSheet = async function _CSSCoverage_onStyleSheet(event) {
    const header = event.header;
    // Ignore anonymous scripts
    if (!header.sourceURL) {
        return;
    }
    try {
        const response = await Coverage_classPrivateFieldGet(this, _CSSCoverage_client, "f").send('CSS.getStyleSheetText', {
            styleSheetId: header.styleSheetId,
        });
        Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetURLs, "f").set(header.styleSheetId, header.sourceURL);
        Coverage_classPrivateFieldGet(this, _CSSCoverage_stylesheetSources, "f").set(header.styleSheetId, response.text);
    }
    catch (error) {
        // This might happen if the page has already navigated away.
        debugError(error);
    }
};
function convertToDisjointRanges(nestedRanges) {
    const points = [];
    for (const range of nestedRanges) {
        points.push({ offset: range.startOffset, type: 0, range });
        points.push({ offset: range.endOffset, type: 1, range });
    }
    // Sort points to form a valid parenthesis sequence.
    points.sort((a, b) => {
        // Sort with increasing offsets.
        if (a.offset !== b.offset) {
            return a.offset - b.offset;
        }
        // All "end" points should go before "start" points.
        if (a.type !== b.type) {
            return b.type - a.type;
        }
        const aLength = a.range.endOffset - a.range.startOffset;
        const bLength = b.range.endOffset - b.range.startOffset;
        // For two "start" points, the one with longer range goes first.
        if (a.type === 0) {
            return bLength - aLength;
        }
        // For two "end" points, the one with shorter range goes first.
        return aLength - bLength;
    });
    const hitCountStack = [];
    const results = [];
    let lastOffset = 0;
    // Run scanning line to intersect all ranges.
    for (const point of points) {
        if (hitCountStack.length &&
            lastOffset < point.offset &&
            hitCountStack[hitCountStack.length - 1] > 0) {
            const lastResult = results[results.length - 1];
            if (lastResult && lastResult.end === lastOffset) {
                lastResult.end = point.offset;
            }
            else {
                results.push({ start: lastOffset, end: point.offset });
            }
        }
        lastOffset = point.offset;
        if (point.type === 0) {
            hitCountStack.push(point.range.count);
        }
        else {
            hitCountStack.pop();
        }
    }
    // Filter out empty ranges.
    return results.filter((range) => {
        return range.end - range.start > 1;
    });
}
//# sourceMappingURL=Coverage.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Dialog.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Dialog_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Dialog_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dialog_client, _Dialog_type, _Dialog_message, _Dialog_defaultValue, _Dialog_handled;

/**
 * Dialog instances are dispatched by the {@link Page} via the `dialog` event.
 *
 * @remarks
 *
 * @example
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   page.on('dialog', async dialog => {
 *     console.log(dialog.message());
 *     await dialog.dismiss();
 *     await browser.close();
 *   });
 *   page.evaluate(() => alert('1'));
 * })();
 * ```
 * @public
 */
class Dialog {
    /**
     * @internal
     */
    constructor(client, type, message, defaultValue = '') {
        _Dialog_client.set(this, void 0);
        _Dialog_type.set(this, void 0);
        _Dialog_message.set(this, void 0);
        _Dialog_defaultValue.set(this, void 0);
        _Dialog_handled.set(this, false);
        Dialog_classPrivateFieldSet(this, _Dialog_client, client, "f");
        Dialog_classPrivateFieldSet(this, _Dialog_type, type, "f");
        Dialog_classPrivateFieldSet(this, _Dialog_message, message, "f");
        Dialog_classPrivateFieldSet(this, _Dialog_defaultValue, defaultValue, "f");
    }
    /**
     * @returns The type of the dialog.
     */
    type() {
        return Dialog_classPrivateFieldGet(this, _Dialog_type, "f");
    }
    /**
     * @returns The message displayed in the dialog.
     */
    message() {
        return Dialog_classPrivateFieldGet(this, _Dialog_message, "f");
    }
    /**
     * @returns The default value of the prompt, or an empty string if the dialog
     * is not a `prompt`.
     */
    defaultValue() {
        return Dialog_classPrivateFieldGet(this, _Dialog_defaultValue, "f");
    }
    /**
     * @param promptText - optional text that will be entered in the dialog
     * prompt. Has no effect if the dialog's type is not `prompt`.
     *
     * @returns A promise that resolves when the dialog has been accepted.
     */
    async accept(promptText) {
        assert(!Dialog_classPrivateFieldGet(this, _Dialog_handled, "f"), 'Cannot accept dialog which is already handled!');
        Dialog_classPrivateFieldSet(this, _Dialog_handled, true, "f");
        await Dialog_classPrivateFieldGet(this, _Dialog_client, "f").send('Page.handleJavaScriptDialog', {
            accept: true,
            promptText: promptText,
        });
    }
    /**
     * @returns A promise which will resolve once the dialog has been dismissed
     */
    async dismiss() {
        assert(!Dialog_classPrivateFieldGet(this, _Dialog_handled, "f"), 'Cannot dismiss dialog which is already handled!');
        Dialog_classPrivateFieldSet(this, _Dialog_handled, true, "f");
        await Dialog_classPrivateFieldGet(this, _Dialog_client, "f").send('Page.handleJavaScriptDialog', {
            accept: false,
        });
    }
}
_Dialog_client = new WeakMap(), _Dialog_type = new WeakMap(), _Dialog_message = new WeakMap(), _Dialog_defaultValue = new WeakMap(), _Dialog_handled = new WeakMap();
//# sourceMappingURL=Dialog.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/EmulationManager.js
var EmulationManager_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var EmulationManager_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmulationManager_client, _EmulationManager_emulatingMobile, _EmulationManager_hasTouch;
class EmulationManager {
    constructor(client) {
        _EmulationManager_client.set(this, void 0);
        _EmulationManager_emulatingMobile.set(this, false);
        _EmulationManager_hasTouch.set(this, false);
        EmulationManager_classPrivateFieldSet(this, _EmulationManager_client, client, "f");
    }
    async emulateViewport(viewport) {
        const mobile = viewport.isMobile || false;
        const width = viewport.width;
        const height = viewport.height;
        const deviceScaleFactor = viewport.deviceScaleFactor || 1;
        const screenOrientation = viewport.isLandscape
            ? { angle: 90, type: 'landscapePrimary' }
            : { angle: 0, type: 'portraitPrimary' };
        const hasTouch = viewport.hasTouch || false;
        await Promise.all([
            EmulationManager_classPrivateFieldGet(this, _EmulationManager_client, "f").send('Emulation.setDeviceMetricsOverride', {
                mobile,
                width,
                height,
                deviceScaleFactor,
                screenOrientation,
            }),
            EmulationManager_classPrivateFieldGet(this, _EmulationManager_client, "f").send('Emulation.setTouchEmulationEnabled', {
                enabled: hasTouch,
            }),
        ]);
        const reloadNeeded = EmulationManager_classPrivateFieldGet(this, _EmulationManager_emulatingMobile, "f") !== mobile || EmulationManager_classPrivateFieldGet(this, _EmulationManager_hasTouch, "f") !== hasTouch;
        EmulationManager_classPrivateFieldSet(this, _EmulationManager_emulatingMobile, mobile, "f");
        EmulationManager_classPrivateFieldSet(this, _EmulationManager_hasTouch, hasTouch, "f");
        return reloadNeeded;
    }
}
_EmulationManager_client = new WeakMap(), _EmulationManager_emulatingMobile = new WeakMap(), _EmulationManager_hasTouch = new WeakMap();
//# sourceMappingURL=EmulationManager.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/FileChooser.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FileChooser_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var FileChooser_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FileChooser_element, _FileChooser_multiple, _FileChooser_handled;

/**
 * File choosers let you react to the page requesting for a file.
 * @remarks
 * `FileChooser` objects are returned via the `page.waitForFileChooser` method.
 * @example
 * An example of using `FileChooser`:
 * ```js
 * const [fileChooser] = await Promise.all([
 *   page.waitForFileChooser(),
 *   page.click('#upload-file-button'), // some button that triggers file selection
 * ]);
 * await fileChooser.accept(['/tmp/myfile.pdf']);
 * ```
 * **NOTE** In browsers, only one file chooser can be opened at a time.
 * All file choosers must be accepted or canceled. Not doing so will prevent
 * subsequent file choosers from appearing.
 * @public
 */
class FileChooser {
    /**
     * @internal
     */
    constructor(element, event) {
        _FileChooser_element.set(this, void 0);
        _FileChooser_multiple.set(this, void 0);
        _FileChooser_handled.set(this, false);
        FileChooser_classPrivateFieldSet(this, _FileChooser_element, element, "f");
        FileChooser_classPrivateFieldSet(this, _FileChooser_multiple, event.mode !== 'selectSingle', "f");
    }
    /**
     * Whether file chooser allow for {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple} file selection.
     */
    isMultiple() {
        return FileChooser_classPrivateFieldGet(this, _FileChooser_multiple, "f");
    }
    /**
     * Accept the file chooser request with given paths.
     * @param filePaths - If some of the  `filePaths` are relative paths,
     * then they are resolved relative to the {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
     */
    async accept(filePaths) {
        assert(!FileChooser_classPrivateFieldGet(this, _FileChooser_handled, "f"), 'Cannot accept FileChooser which is already handled!');
        FileChooser_classPrivateFieldSet(this, _FileChooser_handled, true, "f");
        await FileChooser_classPrivateFieldGet(this, _FileChooser_element, "f").uploadFile(...filePaths);
    }
    /**
     * Closes the file chooser without selecting any files.
     */
    cancel() {
        assert(!FileChooser_classPrivateFieldGet(this, _FileChooser_handled, "f"), 'Cannot cancel FileChooser which is already handled!');
        FileChooser_classPrivateFieldSet(this, _FileChooser_handled, true, "f");
    }
}
_FileChooser_element = new WeakMap(), _FileChooser_multiple = new WeakMap(), _FileChooser_handled = new WeakMap();
//# sourceMappingURL=FileChooser.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/HTTPRequest.js
var HTTPRequest_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var HTTPRequest_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPRequest_instances, _HTTPRequest_client, _HTTPRequest_isNavigationRequest, _HTTPRequest_allowInterception, _HTTPRequest_interceptionHandled, _HTTPRequest_url, _HTTPRequest_resourceType, _HTTPRequest_method, _HTTPRequest_postData, _HTTPRequest_headers, _HTTPRequest_frame, _HTTPRequest_continueRequestOverrides, _HTTPRequest_responseForRequest, _HTTPRequest_abortErrorReason, _HTTPRequest_interceptResolutionState, _HTTPRequest_interceptHandlers, _HTTPRequest_initiator, _HTTPRequest_continue, _HTTPRequest_respond, _HTTPRequest_abort;


/**
 * The default cooperative request interception resolution priority
 *
 * @public
 */
const DEFAULT_INTERCEPT_RESOLUTION_PRIORITY = 0;
/**
 *
 * Represents an HTTP request sent by a page.
 * @remarks
 *
 * Whenever the page sends a request, such as for a network resource, the
 * following events are emitted by Puppeteer's `page`:
 *
 * - `request`:  emitted when the request is issued by the page.
 * - `requestfinished` - emitted when the response body is downloaded and the
 *   request is complete.
 *
 * If request fails at some point, then instead of `requestfinished` event the
 * `requestfailed` event is emitted.
 *
 * All of these events provide an instance of `HTTPRequest` representing the
 * request that occurred:
 *
 * ```
 * page.on('request', request => ...)
 * ```
 *
 * NOTE: HTTP Error responses, such as 404 or 503, are still successful
 * responses from HTTP standpoint, so request will complete with
 * `requestfinished` event.
 *
 * If request gets a 'redirect' response, the request is successfully finished
 * with the `requestfinished` event, and a new request is issued to a
 * redirected url.
 *
 * @public
 */
class HTTPRequest {
    /**
     * @internal
     */
    constructor(client, frame, interceptionId, allowInterception, event, redirectChain) {
        _HTTPRequest_instances.add(this);
        /**
         * @internal
         */
        this._failureText = null;
        /**
         * @internal
         */
        this._response = null;
        /**
         * @internal
         */
        this._fromMemoryCache = false;
        _HTTPRequest_client.set(this, void 0);
        _HTTPRequest_isNavigationRequest.set(this, void 0);
        _HTTPRequest_allowInterception.set(this, void 0);
        _HTTPRequest_interceptionHandled.set(this, false);
        _HTTPRequest_url.set(this, void 0);
        _HTTPRequest_resourceType.set(this, void 0);
        _HTTPRequest_method.set(this, void 0);
        _HTTPRequest_postData.set(this, void 0);
        _HTTPRequest_headers.set(this, {});
        _HTTPRequest_frame.set(this, void 0);
        _HTTPRequest_continueRequestOverrides.set(this, void 0);
        _HTTPRequest_responseForRequest.set(this, null);
        _HTTPRequest_abortErrorReason.set(this, null);
        _HTTPRequest_interceptResolutionState.set(this, {
            action: InterceptResolutionAction.None,
        });
        _HTTPRequest_interceptHandlers.set(this, void 0);
        _HTTPRequest_initiator.set(this, void 0);
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_client, client, "f");
        this._requestId = event.requestId;
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_isNavigationRequest, event.requestId === event.loaderId && event.type === 'Document', "f");
        this._interceptionId = interceptionId;
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_allowInterception, allowInterception, "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_url, event.request.url, "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_resourceType, (event.type || 'other').toLowerCase(), "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_method, event.request.method, "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_postData, event.request.postData, "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_frame, frame, "f");
        this._redirectChain = redirectChain;
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_continueRequestOverrides, {}, "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptHandlers, [], "f");
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_initiator, event.initiator, "f");
        for (const [key, value] of Object.entries(event.request.headers)) {
            HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_headers, "f")[key.toLowerCase()] = value;
        }
    }
    /**
     * @returns the URL of the request
     */
    url() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_url, "f");
    }
    /**
     * @returns the `ContinueRequestOverrides` that will be used
     * if the interception is allowed to continue (ie, `abort()` and
     * `respond()` aren't called).
     */
    continueRequestOverrides() {
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_continueRequestOverrides, "f");
    }
    /**
     * @returns The `ResponseForRequest` that gets used if the
     * interception is allowed to respond (ie, `abort()` is not called).
     */
    responseForRequest() {
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_responseForRequest, "f");
    }
    /**
     * @returns the most recent reason for aborting the request
     */
    abortErrorReason() {
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_abortErrorReason, "f");
    }
    /**
     * @returns An InterceptResolutionState object describing the current resolution
     *  action and priority.
     *
     *  InterceptResolutionState contains:
     *    action: InterceptResolutionAction
     *    priority?: number
     *
     *  InterceptResolutionAction is one of: `abort`, `respond`, `continue`,
     *  `disabled`, `none`, or `already-handled`.
     */
    interceptResolutionState() {
        if (!HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f")) {
            return { action: InterceptResolutionAction.Disabled };
        }
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptionHandled, "f")) {
            return { action: InterceptResolutionAction.AlreadyHandled };
        }
        return { ...HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f") };
    }
    /**
     * @returns `true` if the intercept resolution has already been handled,
     * `false` otherwise.
     */
    isInterceptResolutionHandled() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptionHandled, "f");
    }
    /**
     * Adds an async request handler to the processing queue.
     * Deferred handlers are not guaranteed to execute in any particular order,
     * but they are guaranteed to resolve before the request interception
     * is finalized.
     */
    enqueueInterceptAction(pendingHandler) {
        HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptHandlers, "f").push(pendingHandler);
    }
    /**
     * Awaits pending interception handlers and then decides how to fulfill
     * the request interception.
     */
    async finalizeInterceptions() {
        await HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptHandlers, "f").reduce((promiseChain, interceptAction) => {
            return promiseChain.then(interceptAction);
        }, Promise.resolve());
        const { action } = this.interceptResolutionState();
        switch (action) {
            case 'abort':
                return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_abortErrorReason, "f"));
            case 'respond':
                if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_responseForRequest, "f") === null) {
                    throw new Error('Response is missing for the interception');
                }
                return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_responseForRequest, "f"));
            case 'continue':
                return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_continueRequestOverrides, "f"));
        }
    }
    /**
     * Contains the request's resource type as it was perceived by the rendering
     * engine.
     */
    resourceType() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_resourceType, "f");
    }
    /**
     * @returns the method used (`GET`, `POST`, etc.)
     */
    method() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_method, "f");
    }
    /**
     * @returns the request's post body, if any.
     */
    postData() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_postData, "f");
    }
    /**
     * @returns an object with HTTP headers associated with the request. All
     * header names are lower-case.
     */
    headers() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_headers, "f");
    }
    /**
     * @returns A matching `HTTPResponse` object, or null if the response has not
     * been received yet.
     */
    response() {
        return this._response;
    }
    /**
     * @returns the frame that initiated the request, or null if navigating to
     * error pages.
     */
    frame() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_frame, "f");
    }
    /**
     * @returns true if the request is the driver of the current frame's navigation.
     */
    isNavigationRequest() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_isNavigationRequest, "f");
    }
    /**
     * @returns the initiator of the request.
     */
    initiator() {
        return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_initiator, "f");
    }
    /**
     * A `redirectChain` is a chain of requests initiated to fetch a resource.
     * @remarks
     *
     * `redirectChain` is shared between all the requests of the same chain.
     *
     * For example, if the website `http://example.com` has a single redirect to
     * `https://example.com`, then the chain will contain one request:
     *
     * ```js
     * const response = await page.goto('http://example.com');
     * const chain = response.request().redirectChain();
     * console.log(chain.length); // 1
     * console.log(chain[0].url()); // 'http://example.com'
     * ```
     *
     * If the website `https://google.com` has no redirects, then the chain will be empty:
     *
     * ```js
     * const response = await page.goto('https://google.com');
     * const chain = response.request().redirectChain();
     * console.log(chain.length); // 0
     * ```
     *
     * @returns the chain of requests - if a server responds with at least a
     * single redirect, this chain will contain all requests that were redirected.
     */
    redirectChain() {
        return this._redirectChain.slice();
    }
    /**
     * Access information about the request's failure.
     *
     * @remarks
     *
     * @example
     *
     * Example of logging all failed requests:
     *
     * ```js
     * page.on('requestfailed', request => {
     *   console.log(request.url() + ' ' + request.failure().errorText);
     * });
     * ```
     *
     * @returns `null` unless the request failed. If the request fails this can
     * return an object with `errorText` containing a human-readable error
     * message, e.g. `net::ERR_FAILED`. It is not guaranteed that there will be
     * failure text if the request fails.
     */
    failure() {
        if (!this._failureText) {
            return null;
        }
        return {
            errorText: this._failureText,
        };
    }
    /**
     * Continues request with optional request overrides.
     *
     * @remarks
     *
     * To use this, request
     * interception should be enabled with {@link Page.setRequestInterception}.
     *
     * Exception is immediately thrown if the request interception is not enabled.
     *
     * @example
     * ```js
     * await page.setRequestInterception(true);
     * page.on('request', request => {
     *   // Override headers
     *   const headers = Object.assign({}, request.headers(), {
     *     foo: 'bar', // set "foo" header
     *     origin: undefined, // remove "origin" header
     *   });
     *   request.continue({headers});
     * });
     * ```
     *
     * @param overrides - optional overrides to apply to the request.
     * @param priority - If provided, intercept is resolved using
     * cooperative handling rules. Otherwise, intercept is resolved
     * immediately.
     */
    async continue(overrides = {}, priority) {
        // Request interception is not supported for data: urls.
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_url, "f").startsWith('data:')) {
            return;
        }
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        assert(!HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptionHandled, "f"), 'Request is already handled!');
        if (priority === undefined) {
            return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, overrides);
        }
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_continueRequestOverrides, overrides, "f");
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority === undefined ||
            priority > HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority) {
            HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptResolutionState, {
                action: InterceptResolutionAction.Continue,
                priority,
            }, "f");
            return;
        }
        if (priority === HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority) {
            if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").action === 'abort' ||
                HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").action === 'respond') {
                return;
            }
            HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").action =
                InterceptResolutionAction.Continue;
        }
        return;
    }
    /**
     * Fulfills a request with the given response.
     *
     * @remarks
     *
     * To use this, request
     * interception should be enabled with {@link Page.setRequestInterception}.
     *
     * Exception is immediately thrown if the request interception is not enabled.
     *
     * @example
     * An example of fulfilling all requests with 404 responses:
     * ```js
     * await page.setRequestInterception(true);
     * page.on('request', request => {
     *   request.respond({
     *     status: 404,
     *     contentType: 'text/plain',
     *     body: 'Not Found!'
     *   });
     * });
     * ```
     *
     * NOTE: Mocking responses for dataURL requests is not supported.
     * Calling `request.respond` for a dataURL request is a noop.
     *
     * @param response - the response to fulfill the request with.
     * @param priority - If provided, intercept is resolved using
     * cooperative handling rules. Otherwise, intercept is resolved
     * immediately.
     */
    async respond(response, priority) {
        // Mocking responses for dataURL requests is not currently supported.
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_url, "f").startsWith('data:')) {
            return;
        }
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        assert(!HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptionHandled, "f"), 'Request is already handled!');
        if (priority === undefined) {
            return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, response);
        }
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_responseForRequest, response, "f");
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority === undefined ||
            priority > HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority) {
            HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptResolutionState, {
                action: InterceptResolutionAction.Respond,
                priority,
            }, "f");
            return;
        }
        if (priority === HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority) {
            if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").action === 'abort') {
                return;
            }
            HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").action = InterceptResolutionAction.Respond;
        }
    }
    /**
     * Aborts a request.
     *
     * @remarks
     * To use this, request interception should be enabled with
     * {@link Page.setRequestInterception}. If it is not enabled, this method will
     * throw an exception immediately.
     *
     * @param errorCode - optional error code to provide.
     * @param priority - If provided, intercept is resolved using
     * cooperative handling rules. Otherwise, intercept is resolved
     * immediately.
     */
    async abort(errorCode = 'failed', priority) {
        // Request interception is not supported for data: urls.
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_url, "f").startsWith('data:')) {
            return;
        }
        const errorReason = errorReasons[errorCode];
        assert(errorReason, 'Unknown error code: ' + errorCode);
        assert(HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_allowInterception, "f"), 'Request Interception is not enabled!');
        assert(!HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptionHandled, "f"), 'Request is already handled!');
        if (priority === undefined) {
            return HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, errorReason);
        }
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_abortErrorReason, errorReason, "f");
        if (HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority === undefined ||
            priority >= HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_interceptResolutionState, "f").priority) {
            HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptResolutionState, {
                action: InterceptResolutionAction.Abort,
                priority,
            }, "f");
            return;
        }
    }
}
_HTTPRequest_client = new WeakMap(), _HTTPRequest_isNavigationRequest = new WeakMap(), _HTTPRequest_allowInterception = new WeakMap(), _HTTPRequest_interceptionHandled = new WeakMap(), _HTTPRequest_url = new WeakMap(), _HTTPRequest_resourceType = new WeakMap(), _HTTPRequest_method = new WeakMap(), _HTTPRequest_postData = new WeakMap(), _HTTPRequest_headers = new WeakMap(), _HTTPRequest_frame = new WeakMap(), _HTTPRequest_continueRequestOverrides = new WeakMap(), _HTTPRequest_responseForRequest = new WeakMap(), _HTTPRequest_abortErrorReason = new WeakMap(), _HTTPRequest_interceptResolutionState = new WeakMap(), _HTTPRequest_interceptHandlers = new WeakMap(), _HTTPRequest_initiator = new WeakMap(), _HTTPRequest_instances = new WeakSet(), _HTTPRequest_continue = async function _HTTPRequest_continue(overrides = {}) {
    const { url, method, postData, headers } = overrides;
    HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptionHandled, true, "f");
    const postDataBinaryBase64 = postData
        ? Buffer.from(postData).toString('base64')
        : undefined;
    if (this._interceptionId === undefined) {
        throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.continueRequest');
    }
    await HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_client, "f")
        .send('Fetch.continueRequest', {
        requestId: this._interceptionId,
        url,
        method,
        postData: postDataBinaryBase64,
        headers: headers ? headersArray(headers) : undefined,
    })
        .catch((error) => {
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptionHandled, false, "f");
        return handleError(error);
    });
}, _HTTPRequest_respond = async function _HTTPRequest_respond(response) {
    HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptionHandled, true, "f");
    const responseBody = response.body && isString(response.body)
        ? Buffer.from(response.body)
        : response.body || null;
    const responseHeaders = {};
    if (response.headers) {
        for (const header of Object.keys(response.headers)) {
            const value = response.headers[header];
            responseHeaders[header.toLowerCase()] = Array.isArray(value)
                ? value.map((item) => {
                    return String(item);
                })
                : String(value);
        }
    }
    if (response.contentType) {
        responseHeaders['content-type'] = response.contentType;
    }
    if (responseBody && !('content-length' in responseHeaders)) {
        responseHeaders['content-length'] = String(Buffer.byteLength(responseBody));
    }
    const status = response.status || 200;
    if (this._interceptionId === undefined) {
        throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest');
    }
    await HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_client, "f")
        .send('Fetch.fulfillRequest', {
        requestId: this._interceptionId,
        responseCode: status,
        responsePhrase: STATUS_TEXTS[status],
        responseHeaders: headersArray(responseHeaders),
        body: responseBody ? responseBody.toString('base64') : undefined,
    })
        .catch((error) => {
        HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptionHandled, false, "f");
        return handleError(error);
    });
}, _HTTPRequest_abort = async function _HTTPRequest_abort(errorReason) {
    HTTPRequest_classPrivateFieldSet(this, _HTTPRequest_interceptionHandled, true, "f");
    if (this._interceptionId === undefined) {
        throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.failRequest');
    }
    await HTTPRequest_classPrivateFieldGet(this, _HTTPRequest_client, "f")
        .send('Fetch.failRequest', {
        requestId: this._interceptionId,
        errorReason: errorReason || 'Failed',
    })
        .catch(handleError);
};
/**
 * @public
 */
var InterceptResolutionAction;
(function (InterceptResolutionAction) {
    InterceptResolutionAction["Abort"] = "abort";
    InterceptResolutionAction["Respond"] = "respond";
    InterceptResolutionAction["Continue"] = "continue";
    InterceptResolutionAction["Disabled"] = "disabled";
    InterceptResolutionAction["None"] = "none";
    InterceptResolutionAction["AlreadyHandled"] = "already-handled";
})(InterceptResolutionAction || (InterceptResolutionAction = {}));
const errorReasons = {
    aborted: 'Aborted',
    accessdenied: 'AccessDenied',
    addressunreachable: 'AddressUnreachable',
    blockedbyclient: 'BlockedByClient',
    blockedbyresponse: 'BlockedByResponse',
    connectionaborted: 'ConnectionAborted',
    connectionclosed: 'ConnectionClosed',
    connectionfailed: 'ConnectionFailed',
    connectionrefused: 'ConnectionRefused',
    connectionreset: 'ConnectionReset',
    internetdisconnected: 'InternetDisconnected',
    namenotresolved: 'NameNotResolved',
    timedout: 'TimedOut',
    failed: 'Failed',
};
function headersArray(headers) {
    const result = [];
    for (const name in headers) {
        const value = headers[name];
        if (!Object.is(value, undefined)) {
            const values = Array.isArray(value) ? value : [value];
            result.push(...values.map((value) => {
                return { name, value: value + '' };
            }));
        }
    }
    return result;
}
async function handleError(error) {
    if (['Invalid header'].includes(error.originalMessage)) {
        throw error;
    }
    // In certain cases, protocol will return error if the request was
    // already canceled or the page was closed. We should tolerate these
    // errors.
    debugError(error);
}
// List taken from
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
// with extra 306 and 418 codes.
const STATUS_TEXTS = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '103': 'Early Hints',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': 'Switch Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': "I'm a teapot",
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Too Early',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
};
//# sourceMappingURL=HTTPRequest.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/SecurityDetails.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SecurityDetails_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var SecurityDetails_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SecurityDetails_subjectName, _SecurityDetails_issuer, _SecurityDetails_validFrom, _SecurityDetails_validTo, _SecurityDetails_protocol, _SecurityDetails_sanList;
/**
 * The SecurityDetails class represents the security details of a
 * response that was received over a secure connection.
 *
 * @public
 */
class SecurityDetails {
    /**
     * @internal
     */
    constructor(securityPayload) {
        _SecurityDetails_subjectName.set(this, void 0);
        _SecurityDetails_issuer.set(this, void 0);
        _SecurityDetails_validFrom.set(this, void 0);
        _SecurityDetails_validTo.set(this, void 0);
        _SecurityDetails_protocol.set(this, void 0);
        _SecurityDetails_sanList.set(this, void 0);
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_subjectName, securityPayload.subjectName, "f");
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_issuer, securityPayload.issuer, "f");
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_validFrom, securityPayload.validFrom, "f");
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_validTo, securityPayload.validTo, "f");
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_protocol, securityPayload.protocol, "f");
        SecurityDetails_classPrivateFieldSet(this, _SecurityDetails_sanList, securityPayload.sanList, "f");
    }
    /**
     * @returns The name of the issuer of the certificate.
     */
    issuer() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_issuer, "f");
    }
    /**
     * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
     * marking the start of the certificate's validity.
     */
    validFrom() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_validFrom, "f");
    }
    /**
     * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
     * marking the end of the certificate's validity.
     */
    validTo() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_validTo, "f");
    }
    /**
     * @returns The security protocol being used, e.g. "TLS 1.2".
     */
    protocol() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_protocol, "f");
    }
    /**
     * @returns The name of the subject to which the certificate was issued.
     */
    subjectName() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_subjectName, "f");
    }
    /**
     * @returns The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
     */
    subjectAlternativeNames() {
        return SecurityDetails_classPrivateFieldGet(this, _SecurityDetails_sanList, "f");
    }
}
_SecurityDetails_subjectName = new WeakMap(), _SecurityDetails_issuer = new WeakMap(), _SecurityDetails_validFrom = new WeakMap(), _SecurityDetails_validTo = new WeakMap(), _SecurityDetails_protocol = new WeakMap(), _SecurityDetails_sanList = new WeakMap();
//# sourceMappingURL=SecurityDetails.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/HTTPResponse.js
var HTTPResponse_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var HTTPResponse_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPResponse_instances, _HTTPResponse_client, _HTTPResponse_request, _HTTPResponse_contentPromise, _HTTPResponse_bodyLoadedPromise, _HTTPResponse_bodyLoadedPromiseFulfill, _HTTPResponse_remoteAddress, _HTTPResponse_status, _HTTPResponse_statusText, _HTTPResponse_url, _HTTPResponse_fromDiskCache, _HTTPResponse_fromServiceWorker, _HTTPResponse_headers, _HTTPResponse_securityDetails, _HTTPResponse_timing, _HTTPResponse_parseStatusTextFromExtrInfo;


/**
 * The HTTPResponse class represents responses which are received by the
 * {@link Page} class.
 *
 * @public
 */
class HTTPResponse {
    /**
     * @internal
     */
    constructor(client, request, responsePayload, extraInfo) {
        _HTTPResponse_instances.add(this);
        _HTTPResponse_client.set(this, void 0);
        _HTTPResponse_request.set(this, void 0);
        _HTTPResponse_contentPromise.set(this, null);
        _HTTPResponse_bodyLoadedPromise.set(this, void 0);
        _HTTPResponse_bodyLoadedPromiseFulfill.set(this, () => { });
        _HTTPResponse_remoteAddress.set(this, void 0);
        _HTTPResponse_status.set(this, void 0);
        _HTTPResponse_statusText.set(this, void 0);
        _HTTPResponse_url.set(this, void 0);
        _HTTPResponse_fromDiskCache.set(this, void 0);
        _HTTPResponse_fromServiceWorker.set(this, void 0);
        _HTTPResponse_headers.set(this, {});
        _HTTPResponse_securityDetails.set(this, void 0);
        _HTTPResponse_timing.set(this, void 0);
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_client, client, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_request, request, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_bodyLoadedPromise, new Promise((fulfill) => {
            HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_bodyLoadedPromiseFulfill, fulfill, "f");
        }), "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_remoteAddress, {
            ip: responsePayload.remoteIPAddress,
            port: responsePayload.remotePort,
        }, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_statusText, HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_instances, "m", _HTTPResponse_parseStatusTextFromExtrInfo).call(this, extraInfo) ||
            responsePayload.statusText, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_url, request.url(), "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_fromDiskCache, !!responsePayload.fromDiskCache, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_fromServiceWorker, !!responsePayload.fromServiceWorker, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_status, extraInfo ? extraInfo.statusCode : responsePayload.status, "f");
        const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
        for (const [key, value] of Object.entries(headers)) {
            HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_headers, "f")[key.toLowerCase()] = value;
        }
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_securityDetails, responsePayload.securityDetails
            ? new SecurityDetails(responsePayload.securityDetails)
            : null, "f");
        HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_timing, responsePayload.timing || null, "f");
    }
    /**
     * @internal
     */
    _resolveBody(err) {
        if (err) {
            return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this, err);
        }
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this);
    }
    /**
     * @returns The IP address and port number used to connect to the remote
     * server.
     */
    remoteAddress() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_remoteAddress, "f");
    }
    /**
     * @returns The URL of the response.
     */
    url() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_url, "f");
    }
    /**
     * @returns True if the response was successful (status in the range 200-299).
     */
    ok() {
        // TODO: document === 0 case?
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_status, "f") === 0 || (HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_status, "f") >= 200 && HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_status, "f") <= 299);
    }
    /**
     * @returns The status code of the response (e.g., 200 for a success).
     */
    status() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_status, "f");
    }
    /**
     * @returns  The status text of the response (e.g. usually an "OK" for a
     * success).
     */
    statusText() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_statusText, "f");
    }
    /**
     * @returns An object with HTTP headers associated with the response. All
     * header names are lower-case.
     */
    headers() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_headers, "f");
    }
    /**
     * @returns {@link SecurityDetails} if the response was received over the
     * secure connection, or `null` otherwise.
     */
    securityDetails() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_securityDetails, "f");
    }
    /**
     * @returns Timing information related to the response.
     */
    timing() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_timing, "f");
    }
    /**
     * @returns Promise which resolves to a buffer with response body.
     */
    buffer() {
        if (!HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_contentPromise, "f")) {
            HTTPResponse_classPrivateFieldSet(this, _HTTPResponse_contentPromise, HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_bodyLoadedPromise, "f").then(async (error) => {
                if (error) {
                    throw error;
                }
                try {
                    const response = await HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_client, "f").send('Network.getResponseBody', {
                        requestId: HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_request, "f")._requestId,
                    });
                    return Buffer.from(response.body, response.base64Encoded ? 'base64' : 'utf8');
                }
                catch (error) {
                    if (error instanceof ProtocolError &&
                        error.originalMessage === 'No resource with given identifier found') {
                        throw new ProtocolError('Could not load body for this request. This might happen if the request is a preflight request.');
                    }
                    throw error;
                }
            }), "f");
        }
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_contentPromise, "f");
    }
    /**
     * @returns Promise which resolves to a text representation of response body.
     */
    async text() {
        const content = await this.buffer();
        return content.toString('utf8');
    }
    /**
     *
     * @returns Promise which resolves to a JSON representation of response body.
     *
     * @remarks
     *
     * This method will throw if the response body is not parsable via
     * `JSON.parse`.
     */
    async json() {
        const content = await this.text();
        return JSON.parse(content);
    }
    /**
     * @returns A matching {@link HTTPRequest} object.
     */
    request() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_request, "f");
    }
    /**
     * @returns True if the response was served from either the browser's disk
     * cache or memory cache.
     */
    fromCache() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_fromDiskCache, "f") || HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_request, "f")._fromMemoryCache;
    }
    /**
     * @returns True if the response was served by a service worker.
     */
    fromServiceWorker() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_fromServiceWorker, "f");
    }
    /**
     * @returns A {@link Frame} that initiated this response, or `null` if
     * navigating to error pages.
     */
    frame() {
        return HTTPResponse_classPrivateFieldGet(this, _HTTPResponse_request, "f").frame();
    }
}
_HTTPResponse_client = new WeakMap(), _HTTPResponse_request = new WeakMap(), _HTTPResponse_contentPromise = new WeakMap(), _HTTPResponse_bodyLoadedPromise = new WeakMap(), _HTTPResponse_bodyLoadedPromiseFulfill = new WeakMap(), _HTTPResponse_remoteAddress = new WeakMap(), _HTTPResponse_status = new WeakMap(), _HTTPResponse_statusText = new WeakMap(), _HTTPResponse_url = new WeakMap(), _HTTPResponse_fromDiskCache = new WeakMap(), _HTTPResponse_fromServiceWorker = new WeakMap(), _HTTPResponse_headers = new WeakMap(), _HTTPResponse_securityDetails = new WeakMap(), _HTTPResponse_timing = new WeakMap(), _HTTPResponse_instances = new WeakSet(), _HTTPResponse_parseStatusTextFromExtrInfo = function _HTTPResponse_parseStatusTextFromExtrInfo(extraInfo) {
    if (!extraInfo || !extraInfo.headersText) {
        return;
    }
    const firstLine = extraInfo.headersText.split('\r', 1)[0];
    if (!firstLine) {
        return;
    }
    const match = firstLine.match(/[^ ]* [^ ]* (.*)/);
    if (!match) {
        return;
    }
    const statusText = match[1];
    if (!statusText) {
        return;
    }
    return statusText;
};
//# sourceMappingURL=HTTPResponse.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/NetworkEventManager.js
var NetworkEventManager_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkEventManager_requestWillBeSentMap, _NetworkEventManager_requestPausedMap, _NetworkEventManager_httpRequestsMap, _NetworkEventManager_responseReceivedExtraInfoMap, _NetworkEventManager_queuedRedirectInfoMap, _NetworkEventManager_queuedEventGroupMap;
/**
 * @internal
 *
 * Helper class to track network events by request ID
 */
class NetworkEventManager {
    constructor() {
        /*
         * There are four possible orders of events:
         *  A. `_onRequestWillBeSent`
         *  B. `_onRequestWillBeSent`, `_onRequestPaused`
         *  C. `_onRequestPaused`, `_onRequestWillBeSent`
         *  D. `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
         *     `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`
         *     (see crbug.com/1196004)
         *
         * For `_onRequest` we need the event from `_onRequestWillBeSent` and
         * optionally the `interceptionId` from `_onRequestPaused`.
         *
         * If request interception is disabled, call `_onRequest` once per call to
         * `_onRequestWillBeSent`.
         * If request interception is enabled, call `_onRequest` once per call to
         * `_onRequestPaused` (once per `interceptionId`).
         *
         * Events are stored to allow for subsequent events to call `_onRequest`.
         *
         * Note that (chains of) redirect requests have the same `requestId` (!) as
         * the original request. We have to anticipate series of events like these:
         *  A. `_onRequestWillBeSent`,
         *     `_onRequestWillBeSent`, ...
         *  B. `_onRequestWillBeSent`, `_onRequestPaused`,
         *     `_onRequestWillBeSent`, `_onRequestPaused`, ...
         *  C. `_onRequestWillBeSent`, `_onRequestPaused`,
         *     `_onRequestPaused`, `_onRequestWillBeSent`, ...
         *  D. `_onRequestPaused`, `_onRequestWillBeSent`,
         *     `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
         *     `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`, ...
         *     (see crbug.com/1196004)
         */
        _NetworkEventManager_requestWillBeSentMap.set(this, new Map());
        _NetworkEventManager_requestPausedMap.set(this, new Map());
        _NetworkEventManager_httpRequestsMap.set(this, new Map());
        /*
         * The below maps are used to reconcile Network.responseReceivedExtraInfo
         * events with their corresponding request. Each response and redirect
         * response gets an ExtraInfo event, and we don't know which will come first.
         * This means that we have to store a Response or an ExtraInfo for each
         * response, and emit the event when we get both of them. In addition, to
         * handle redirects, we have to make them Arrays to represent the chain of
         * events.
         */
        _NetworkEventManager_responseReceivedExtraInfoMap.set(this, new Map());
        _NetworkEventManager_queuedRedirectInfoMap.set(this, new Map());
        _NetworkEventManager_queuedEventGroupMap.set(this, new Map());
    }
    forget(networkRequestId) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedRedirectInfoMap, "f").delete(networkRequestId);
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").delete(networkRequestId);
    }
    responseExtraInfo(networkRequestId) {
        if (!NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").has(networkRequestId)) {
            NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").set(networkRequestId, []);
        }
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").get(networkRequestId);
    }
    queuedRedirectInfo(fetchRequestId) {
        if (!NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedRedirectInfoMap, "f").has(fetchRequestId)) {
            NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedRedirectInfoMap, "f").set(fetchRequestId, []);
        }
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedRedirectInfoMap, "f").get(fetchRequestId);
    }
    queueRedirectInfo(fetchRequestId, redirectInfo) {
        this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
    }
    takeQueuedRedirectInfo(fetchRequestId) {
        return this.queuedRedirectInfo(fetchRequestId).shift();
    }
    numRequestsInProgress() {
        return [...NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_httpRequestsMap, "f")].filter(([, request]) => {
            return !request.response();
        }).length;
    }
    storeRequestWillBeSent(networkRequestId, event) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestWillBeSentMap, "f").set(networkRequestId, event);
    }
    getRequestWillBeSent(networkRequestId) {
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestWillBeSentMap, "f").get(networkRequestId);
    }
    forgetRequestWillBeSent(networkRequestId) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
    }
    getRequestPaused(networkRequestId) {
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestPausedMap, "f").get(networkRequestId);
    }
    forgetRequestPaused(networkRequestId) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
    }
    storeRequestPaused(networkRequestId, event) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_requestPausedMap, "f").set(networkRequestId, event);
    }
    getRequest(networkRequestId) {
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_httpRequestsMap, "f").get(networkRequestId);
    }
    storeRequest(networkRequestId, request) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_httpRequestsMap, "f").set(networkRequestId, request);
    }
    forgetRequest(networkRequestId) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_httpRequestsMap, "f").delete(networkRequestId);
    }
    getQueuedEventGroup(networkRequestId) {
        return NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedEventGroupMap, "f").get(networkRequestId);
    }
    queueEventGroup(networkRequestId, event) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedEventGroupMap, "f").set(networkRequestId, event);
    }
    forgetQueuedEventGroup(networkRequestId) {
        NetworkEventManager_classPrivateFieldGet(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
    }
}
_NetworkEventManager_requestWillBeSentMap = new WeakMap(), _NetworkEventManager_requestPausedMap = new WeakMap(), _NetworkEventManager_httpRequestsMap = new WeakMap(), _NetworkEventManager_responseReceivedExtraInfoMap = new WeakMap(), _NetworkEventManager_queuedRedirectInfoMap = new WeakMap(), _NetworkEventManager_queuedEventGroupMap = new WeakMap();
//# sourceMappingURL=NetworkEventManager.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/NetworkManager.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var NetworkManager_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var NetworkManager_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkManager_instances, _NetworkManager_client, _NetworkManager_ignoreHTTPSErrors, _NetworkManager_frameManager, _NetworkManager_networkEventManager, _NetworkManager_extraHTTPHeaders, _NetworkManager_credentials, _NetworkManager_attemptedAuthentications, _NetworkManager_userRequestInterceptionEnabled, _NetworkManager_protocolRequestInterceptionEnabled, _NetworkManager_userCacheDisabled, _NetworkManager_emulatedNetworkConditions, _NetworkManager_updateNetworkConditions, _NetworkManager_updateProtocolRequestInterception, _NetworkManager_cacheDisabled, _NetworkManager_updateProtocolCacheDisabled, _NetworkManager_onRequestWillBeSent, _NetworkManager_onAuthRequired, _NetworkManager_onRequestPaused, _NetworkManager_patchRequestEventHeaders, _NetworkManager_onRequest, _NetworkManager_onRequestServedFromCache, _NetworkManager_handleRequestRedirect, _NetworkManager_emitResponseEvent, _NetworkManager_onResponseReceived, _NetworkManager_onResponseReceivedExtraInfo, _NetworkManager_forgetRequest, _NetworkManager_onLoadingFinished, _NetworkManager_emitLoadingFinished, _NetworkManager_onLoadingFailed, _NetworkManager_emitLoadingFailed;






/**
 * We use symbols to prevent any external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
const NetworkManagerEmittedEvents = {
    Request: Symbol('NetworkManager.Request'),
    RequestServedFromCache: Symbol('NetworkManager.RequestServedFromCache'),
    Response: Symbol('NetworkManager.Response'),
    RequestFailed: Symbol('NetworkManager.RequestFailed'),
    RequestFinished: Symbol('NetworkManager.RequestFinished'),
};
/**
 * @internal
 */
class NetworkManager extends EventEmitter {
    constructor(client, ignoreHTTPSErrors, frameManager) {
        super();
        _NetworkManager_instances.add(this);
        _NetworkManager_client.set(this, void 0);
        _NetworkManager_ignoreHTTPSErrors.set(this, void 0);
        _NetworkManager_frameManager.set(this, void 0);
        _NetworkManager_networkEventManager.set(this, new NetworkEventManager());
        _NetworkManager_extraHTTPHeaders.set(this, {});
        _NetworkManager_credentials.set(this, void 0);
        _NetworkManager_attemptedAuthentications.set(this, new Set());
        _NetworkManager_userRequestInterceptionEnabled.set(this, false);
        _NetworkManager_protocolRequestInterceptionEnabled.set(this, false);
        _NetworkManager_userCacheDisabled.set(this, false);
        _NetworkManager_emulatedNetworkConditions.set(this, {
            offline: false,
            upload: -1,
            download: -1,
            latency: 0,
        });
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_client, client, "f");
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_frameManager, frameManager, "f");
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Fetch.requestPaused', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestPaused).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Fetch.authRequired', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onAuthRequired).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.requestWillBeSent', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestWillBeSent).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.requestServedFromCache', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestServedFromCache).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.responseReceived', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceived).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.loadingFinished', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFinished).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.loadingFailed', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFailed).bind(this));
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.responseReceivedExtraInfo', NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceivedExtraInfo).bind(this));
    }
    async initialize() {
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.enable');
        if (NetworkManager_classPrivateFieldGet(this, _NetworkManager_ignoreHTTPSErrors, "f")) {
            await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Security.setIgnoreCertificateErrors', {
                ignore: true,
            });
        }
    }
    async authenticate(credentials) {
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_credentials, credentials, "f");
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
    }
    async setExtraHTTPHeaders(extraHTTPHeaders) {
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_extraHTTPHeaders, {}, "f");
        for (const key of Object.keys(extraHTTPHeaders)) {
            const value = extraHTTPHeaders[key];
            assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_extraHTTPHeaders, "f")[key.toLowerCase()] = value;
        }
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.setExtraHTTPHeaders', {
            headers: NetworkManager_classPrivateFieldGet(this, _NetworkManager_extraHTTPHeaders, "f"),
        });
    }
    extraHTTPHeaders() {
        return Object.assign({}, NetworkManager_classPrivateFieldGet(this, _NetworkManager_extraHTTPHeaders, "f"));
    }
    numRequestsInProgress() {
        return NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").numRequestsInProgress();
    }
    async setOfflineMode(value) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").offline = value;
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
    }
    async emulateNetworkConditions(networkConditions) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").upload = networkConditions
            ? networkConditions.upload
            : -1;
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").download = networkConditions
            ? networkConditions.download
            : -1;
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").latency = networkConditions
            ? networkConditions.latency
            : 0;
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
    }
    async setUserAgent(userAgent, userAgentMetadata) {
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.setUserAgentOverride', {
            userAgent: userAgent,
            userAgentMetadata: userAgentMetadata,
        });
    }
    async setCacheEnabled(enabled) {
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_userCacheDisabled, !enabled, "f");
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this);
    }
    async setRequestInterception(value) {
        NetworkManager_classPrivateFieldSet(this, _NetworkManager_userRequestInterceptionEnabled, value, "f");
        await NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
    }
}
_NetworkManager_client = new WeakMap(), _NetworkManager_ignoreHTTPSErrors = new WeakMap(), _NetworkManager_frameManager = new WeakMap(), _NetworkManager_networkEventManager = new WeakMap(), _NetworkManager_extraHTTPHeaders = new WeakMap(), _NetworkManager_credentials = new WeakMap(), _NetworkManager_attemptedAuthentications = new WeakMap(), _NetworkManager_userRequestInterceptionEnabled = new WeakMap(), _NetworkManager_protocolRequestInterceptionEnabled = new WeakMap(), _NetworkManager_userCacheDisabled = new WeakMap(), _NetworkManager_emulatedNetworkConditions = new WeakMap(), _NetworkManager_instances = new WeakSet(), _NetworkManager_updateNetworkConditions = async function _NetworkManager_updateNetworkConditions() {
    await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.emulateNetworkConditions', {
        offline: NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").offline,
        latency: NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").latency,
        uploadThroughput: NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").upload,
        downloadThroughput: NetworkManager_classPrivateFieldGet(this, _NetworkManager_emulatedNetworkConditions, "f").download,
    });
}, _NetworkManager_updateProtocolRequestInterception = async function _NetworkManager_updateProtocolRequestInterception() {
    const enabled = NetworkManager_classPrivateFieldGet(this, _NetworkManager_userRequestInterceptionEnabled, "f") || !!NetworkManager_classPrivateFieldGet(this, _NetworkManager_credentials, "f");
    if (enabled === NetworkManager_classPrivateFieldGet(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
        return;
    }
    NetworkManager_classPrivateFieldSet(this, _NetworkManager_protocolRequestInterceptionEnabled, enabled, "f");
    if (enabled) {
        await Promise.all([
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Fetch.enable', {
                handleAuthRequests: true,
                patterns: [{ urlPattern: '*' }],
            }),
        ]);
    }
    else {
        await Promise.all([
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Fetch.disable'),
        ]);
    }
}, _NetworkManager_cacheDisabled = function _NetworkManager_cacheDisabled() {
    return NetworkManager_classPrivateFieldGet(this, _NetworkManager_userCacheDisabled, "f");
}, _NetworkManager_updateProtocolCacheDisabled = async function _NetworkManager_updateProtocolCacheDisabled() {
    await NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.setCacheDisabled', {
        cacheDisabled: NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_cacheDisabled).call(this),
    });
}, _NetworkManager_onRequestWillBeSent = function _NetworkManager_onRequestWillBeSent(event) {
    // Request interception doesn't happen for data URLs with Network Service.
    if (NetworkManager_classPrivateFieldGet(this, _NetworkManager_userRequestInterceptionEnabled, "f") &&
        !event.request.url.startsWith('data:')) {
        const { requestId: networkRequestId } = event;
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").storeRequestWillBeSent(networkRequestId, event);
        /**
         * CDP may have sent a Fetch.requestPaused event already. Check for it.
         */
        const requestPausedEvent = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequestPaused(networkRequestId);
        if (requestPausedEvent) {
            const { requestId: fetchRequestId } = requestPausedEvent;
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, event, requestPausedEvent);
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, fetchRequestId);
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetRequestPaused(networkRequestId);
        }
        return;
    }
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, undefined);
}, _NetworkManager_onAuthRequired = function _NetworkManager_onAuthRequired(event) {
    let response = 'Default';
    if (NetworkManager_classPrivateFieldGet(this, _NetworkManager_attemptedAuthentications, "f").has(event.requestId)) {
        response = 'CancelAuth';
    }
    else if (NetworkManager_classPrivateFieldGet(this, _NetworkManager_credentials, "f")) {
        response = 'ProvideCredentials';
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_attemptedAuthentications, "f").add(event.requestId);
    }
    const { username, password } = NetworkManager_classPrivateFieldGet(this, _NetworkManager_credentials, "f") || {
        username: undefined,
        password: undefined,
    };
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f")
        .send('Fetch.continueWithAuth', {
        requestId: event.requestId,
        authChallengeResponse: { response, username, password },
    })
        .catch(debugError);
}, _NetworkManager_onRequestPaused = function _NetworkManager_onRequestPaused(event) {
    if (!NetworkManager_classPrivateFieldGet(this, _NetworkManager_userRequestInterceptionEnabled, "f") &&
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f")
            .send('Fetch.continueRequest', {
            requestId: event.requestId,
        })
            .catch(debugError);
    }
    const { networkId: networkRequestId, requestId: fetchRequestId } = event;
    if (!networkRequestId) {
        return;
    }
    const requestWillBeSentEvent = (() => {
        const requestWillBeSentEvent = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequestWillBeSent(networkRequestId);
        // redirect requests have the same `requestId`,
        if (requestWillBeSentEvent &&
            (requestWillBeSentEvent.request.url !== event.request.url ||
                requestWillBeSentEvent.request.method !== event.request.method)) {
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetRequestWillBeSent(networkRequestId);
            return;
        }
        return requestWillBeSentEvent;
    })();
    if (requestWillBeSentEvent) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, requestWillBeSentEvent, event);
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, requestWillBeSentEvent, fetchRequestId);
    }
    else {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").storeRequestPaused(networkRequestId, event);
    }
}, _NetworkManager_patchRequestEventHeaders = function _NetworkManager_patchRequestEventHeaders(requestWillBeSentEvent, requestPausedEvent) {
    requestWillBeSentEvent.request.headers = {
        ...requestWillBeSentEvent.request.headers,
        // includes extra headers, like: Accept, Origin
        ...requestPausedEvent.request.headers,
    };
}, _NetworkManager_onRequest = function _NetworkManager_onRequest(event, fetchRequestId) {
    let redirectChain = [];
    if (event.redirectResponse) {
        // We want to emit a response and requestfinished for the
        // redirectResponse, but we can't do so unless we have a
        // responseExtraInfo ready to pair it up with. If we don't have any
        // responseExtraInfos saved in our queue, they we have to wait until
        // the next one to emit response and requestfinished, *and* we should
        // also wait to emit this Request too because it should come after the
        // response/requestfinished.
        let redirectResponseExtraInfo = null;
        if (event.redirectHasExtraInfo) {
            redirectResponseExtraInfo = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f")
                .responseExtraInfo(event.requestId)
                .shift();
            if (!redirectResponseExtraInfo) {
                NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").queueRedirectInfo(event.requestId, {
                    event,
                    fetchRequestId,
                });
                return;
            }
        }
        const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
        // If we connect late to the target, we could have missed the
        // requestWillBeSent event.
        if (request) {
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_handleRequestRedirect).call(this, request, event.redirectResponse, redirectResponseExtraInfo);
            redirectChain = request._redirectChain;
        }
    }
    const frame = event.frameId
        ? NetworkManager_classPrivateFieldGet(this, _NetworkManager_frameManager, "f").frame(event.frameId)
        : null;
    const request = new HTTPRequest(NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f"), frame, fetchRequestId, NetworkManager_classPrivateFieldGet(this, _NetworkManager_userRequestInterceptionEnabled, "f"), event, redirectChain);
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").storeRequest(event.requestId, request);
    this.emit(NetworkManagerEmittedEvents.Request, request);
    request.finalizeInterceptions();
}, _NetworkManager_onRequestServedFromCache = function _NetworkManager_onRequestServedFromCache(event) {
    const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    if (request) {
        request._fromMemoryCache = true;
    }
    this.emit(NetworkManagerEmittedEvents.RequestServedFromCache, request);
}, _NetworkManager_handleRequestRedirect = function _NetworkManager_handleRequestRedirect(request, responsePayload, extraInfo) {
    const response = new HTTPResponse(NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f"), request, responsePayload, extraInfo);
    request._response = response;
    request._redirectChain.push(request);
    response._resolveBody(new Error('Response body is unavailable for redirect responses'));
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, false);
    this.emit(NetworkManagerEmittedEvents.Response, response);
    this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
}, _NetworkManager_emitResponseEvent = function _NetworkManager_emitResponseEvent(responseReceived, extraInfo) {
    const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(responseReceived.requestId);
    // FileUpload sends a response without a matching request.
    if (!request) {
        return;
    }
    const extraInfos = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(responseReceived.requestId);
    if (extraInfos.length) {
        debugError(new Error('Unexpected extraInfo events for request ' +
            responseReceived.requestId));
    }
    const response = new HTTPResponse(NetworkManager_classPrivateFieldGet(this, _NetworkManager_client, "f"), request, responseReceived.response, extraInfo);
    request._response = response;
    this.emit(NetworkManagerEmittedEvents.Response, response);
}, _NetworkManager_onResponseReceived = function _NetworkManager_onResponseReceived(event) {
    const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    let extraInfo = null;
    if (request && !request._fromMemoryCache && event.hasExtraInfo) {
        extraInfo = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f")
            .responseExtraInfo(event.requestId)
            .shift();
        if (!extraInfo) {
            // Wait until we get the corresponding ExtraInfo event.
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").queueEventGroup(event.requestId, {
                responseReceivedEvent: event,
            });
            return;
        }
    }
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, event, extraInfo);
}, _NetworkManager_onResponseReceivedExtraInfo = function _NetworkManager_onResponseReceivedExtraInfo(event) {
    // We may have skipped a redirect response/request pair due to waiting for
    // this ExtraInfo event. If so, continue that work now that we have the
    // request.
    const redirectInfo = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").takeQueuedRedirectInfo(event.requestId);
    if (redirectInfo) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, redirectInfo.event, redirectInfo.fetchRequestId);
        return;
    }
    // We may have skipped response and loading events because we didn't have
    // this ExtraInfo event yet. If so, emit those events now.
    const queuedEvents = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetQueuedEventGroup(event.requestId);
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, queuedEvents.responseReceivedEvent, event);
        if (queuedEvents.loadingFinishedEvent) {
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, queuedEvents.loadingFinishedEvent);
        }
        if (queuedEvents.loadingFailedEvent) {
            NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, queuedEvents.loadingFailedEvent);
        }
        return;
    }
    // Wait until we get another event that can use this ExtraInfo event.
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
}, _NetworkManager_forgetRequest = function _NetworkManager_forgetRequest(request, events) {
    const requestId = request._requestId;
    const interceptionId = request._interceptionId;
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetRequest(requestId);
    interceptionId !== undefined &&
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_attemptedAuthentications, "f").delete(interceptionId);
    if (events) {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forget(requestId);
    }
}, _NetworkManager_onLoadingFinished = function _NetworkManager_onLoadingFinished(event) {
    // If the response event for this request is still waiting on a
    // corresponding ExtraInfo event, then wait to emit this event too.
    const queuedEvents = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        queuedEvents.loadingFinishedEvent = event;
    }
    else {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, event);
    }
}, _NetworkManager_emitLoadingFinished = function _NetworkManager_emitLoadingFinished(event) {
    var _a;
    const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    // For certain requestIds we never receive requestWillBeSent event.
    // @see https://crbug.com/750469
    if (!request) {
        return;
    }
    // Under certain conditions we never get the Network.responseReceived
    // event from protocol. @see https://crbug.com/883475
    if (request.response()) {
        (_a = request.response()) === null || _a === void 0 ? void 0 : _a._resolveBody(null);
    }
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
    this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
}, _NetworkManager_onLoadingFailed = function _NetworkManager_onLoadingFailed(event) {
    // If the response event for this request is still waiting on a
    // corresponding ExtraInfo event, then wait to emit this event too.
    const queuedEvents = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        queuedEvents.loadingFailedEvent = event;
    }
    else {
        NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, event);
    }
}, _NetworkManager_emitLoadingFailed = function _NetworkManager_emitLoadingFailed(event) {
    const request = NetworkManager_classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    // For certain requestIds we never receive requestWillBeSent event.
    // @see https://crbug.com/750469
    if (!request) {
        return;
    }
    request._failureText = event.errorText;
    const response = request.response();
    if (response) {
        response._resolveBody(null);
    }
    NetworkManager_classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
    this.emit(NetworkManagerEmittedEvents.RequestFailed, request);
};
//# sourceMappingURL=NetworkManager.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/LifecycleWatcher.js
/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LifecycleWatcher_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var LifecycleWatcher_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LifecycleWatcher_instances, _LifecycleWatcher_expectedLifecycle, _LifecycleWatcher_frameManager, _LifecycleWatcher_frame, _LifecycleWatcher_timeout, _LifecycleWatcher_navigationRequest, _LifecycleWatcher_eventListeners, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, _LifecycleWatcher_sameDocumentNavigationPromise, _LifecycleWatcher_lifecycleCallback, _LifecycleWatcher_lifecyclePromise, _LifecycleWatcher_newDocumentNavigationCompleteCallback, _LifecycleWatcher_newDocumentNavigationPromise, _LifecycleWatcher_terminationCallback, _LifecycleWatcher_terminationPromise, _LifecycleWatcher_timeoutPromise, _LifecycleWatcher_maximumTimer, _LifecycleWatcher_hasSameDocumentNavigation, _LifecycleWatcher_newDocumentNavigation, _LifecycleWatcher_swapped, _LifecycleWatcher_onRequest, _LifecycleWatcher_onFrameDetached, _LifecycleWatcher_terminate, _LifecycleWatcher_createTimeoutPromise, _LifecycleWatcher_navigatedWithinDocument, _LifecycleWatcher_navigated, _LifecycleWatcher_frameSwapped, _LifecycleWatcher_checkLifecycleComplete;






const puppeteerToProtocolLifecycle = new Map([
    ['load', 'load'],
    ['domcontentloaded', 'DOMContentLoaded'],
    ['networkidle0', 'networkIdle'],
    ['networkidle2', 'networkAlmostIdle'],
]);
const noop = () => { };
/**
 * @internal
 */
class LifecycleWatcher {
    constructor(frameManager, frame, waitUntil, timeout) {
        _LifecycleWatcher_instances.add(this);
        _LifecycleWatcher_expectedLifecycle.set(this, void 0);
        _LifecycleWatcher_frameManager.set(this, void 0);
        _LifecycleWatcher_frame.set(this, void 0);
        _LifecycleWatcher_timeout.set(this, void 0);
        _LifecycleWatcher_navigationRequest.set(this, null);
        _LifecycleWatcher_eventListeners.set(this, void 0);
        _LifecycleWatcher_sameDocumentNavigationCompleteCallback.set(this, noop);
        _LifecycleWatcher_sameDocumentNavigationPromise.set(this, new Promise((fulfill) => {
            LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, fulfill, "f");
        }));
        _LifecycleWatcher_lifecycleCallback.set(this, noop);
        _LifecycleWatcher_lifecyclePromise.set(this, new Promise((fulfill) => {
            LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_lifecycleCallback, fulfill, "f");
        }));
        _LifecycleWatcher_newDocumentNavigationCompleteCallback.set(this, noop);
        _LifecycleWatcher_newDocumentNavigationPromise.set(this, new Promise((fulfill) => {
            LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, fulfill, "f");
        }));
        _LifecycleWatcher_terminationCallback.set(this, noop);
        _LifecycleWatcher_terminationPromise.set(this, new Promise((fulfill) => {
            LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_terminationCallback, fulfill, "f");
        }));
        _LifecycleWatcher_timeoutPromise.set(this, void 0);
        _LifecycleWatcher_maximumTimer.set(this, void 0);
        _LifecycleWatcher_hasSameDocumentNavigation.set(this, void 0);
        _LifecycleWatcher_newDocumentNavigation.set(this, void 0);
        _LifecycleWatcher_swapped.set(this, void 0);
        if (Array.isArray(waitUntil)) {
            waitUntil = waitUntil.slice();
        }
        else if (typeof waitUntil === 'string') {
            waitUntil = [waitUntil];
        }
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_expectedLifecycle, waitUntil.map((value) => {
            const protocolEvent = puppeteerToProtocolLifecycle.get(value);
            assert(protocolEvent, 'Unknown value for options.waitUntil: ' + value);
            return protocolEvent;
        }), "f");
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_frameManager, frameManager, "f");
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_frame, frame, "f");
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_timeout, timeout, "f");
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_eventListeners, [
            addEventListener(frameManager._client, CDPSessionEmittedEvents.Disconnected, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_terminate).bind(this, new Error('Navigation failed because browser has disconnected!'))),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.LifecycleEvent, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).bind(this)),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigatedWithinDocument, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigatedWithinDocument).bind(this)),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigated).bind(this)),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameSwapped, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_frameSwapped).bind(this)),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameDetached, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onFrameDetached).bind(this)),
            addEventListener(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frameManager, "f").networkManager(), NetworkManagerEmittedEvents.Request, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onRequest).bind(this)),
        ], "f");
        LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_timeoutPromise, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_createTimeoutPromise).call(this), "f");
        LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
    }
    async navigationResponse() {
        // We may need to wait for ExtraInfo events before the request is complete.
        return LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_navigationRequest, "f") ? LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_navigationRequest, "f").response() : null;
    }
    sameDocumentNavigationPromise() {
        return LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_sameDocumentNavigationPromise, "f");
    }
    newDocumentNavigationPromise() {
        return LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_newDocumentNavigationPromise, "f");
    }
    lifecyclePromise() {
        return LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_lifecyclePromise, "f");
    }
    timeoutOrTerminationPromise() {
        return Promise.race([LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_timeoutPromise, "f"), LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_terminationPromise, "f")]);
    }
    dispose() {
        removeEventListeners(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_eventListeners, "f"));
        LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_maximumTimer, "f") !== undefined && clearTimeout(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_maximumTimer, "f"));
    }
}
_LifecycleWatcher_expectedLifecycle = new WeakMap(), _LifecycleWatcher_frameManager = new WeakMap(), _LifecycleWatcher_frame = new WeakMap(), _LifecycleWatcher_timeout = new WeakMap(), _LifecycleWatcher_navigationRequest = new WeakMap(), _LifecycleWatcher_eventListeners = new WeakMap(), _LifecycleWatcher_sameDocumentNavigationCompleteCallback = new WeakMap(), _LifecycleWatcher_sameDocumentNavigationPromise = new WeakMap(), _LifecycleWatcher_lifecycleCallback = new WeakMap(), _LifecycleWatcher_lifecyclePromise = new WeakMap(), _LifecycleWatcher_newDocumentNavigationCompleteCallback = new WeakMap(), _LifecycleWatcher_newDocumentNavigationPromise = new WeakMap(), _LifecycleWatcher_terminationCallback = new WeakMap(), _LifecycleWatcher_terminationPromise = new WeakMap(), _LifecycleWatcher_timeoutPromise = new WeakMap(), _LifecycleWatcher_maximumTimer = new WeakMap(), _LifecycleWatcher_hasSameDocumentNavigation = new WeakMap(), _LifecycleWatcher_newDocumentNavigation = new WeakMap(), _LifecycleWatcher_swapped = new WeakMap(), _LifecycleWatcher_instances = new WeakSet(), _LifecycleWatcher_onRequest = function _LifecycleWatcher_onRequest(request) {
    if (request.frame() !== LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f") || !request.isNavigationRequest()) {
        return;
    }
    LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_navigationRequest, request, "f");
}, _LifecycleWatcher_onFrameDetached = function _LifecycleWatcher_onFrameDetached(frame) {
    if (LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f") === frame) {
        LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_terminationCallback, "f").call(null, new Error('Navigating frame was detached'));
        return;
    }
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_terminate = function _LifecycleWatcher_terminate(error) {
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_terminationCallback, "f").call(null, error);
}, _LifecycleWatcher_createTimeoutPromise = async function _LifecycleWatcher_createTimeoutPromise() {
    if (!LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_timeout, "f")) {
        return new Promise(noop);
    }
    const errorMessage = 'Navigation timeout of ' + LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_timeout, "f") + ' ms exceeded';
    await new Promise((fulfill) => {
        return (LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_maximumTimer, setTimeout(fulfill, LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_timeout, "f")), "f"));
    });
    return new TimeoutError(errorMessage);
}, _LifecycleWatcher_navigatedWithinDocument = function _LifecycleWatcher_navigatedWithinDocument(frame) {
    if (frame !== LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f")) {
        return;
    }
    LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_hasSameDocumentNavigation, true, "f");
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_navigated = function _LifecycleWatcher_navigated(frame) {
    if (frame !== LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f")) {
        return;
    }
    LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_newDocumentNavigation, true, "f");
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_frameSwapped = function _LifecycleWatcher_frameSwapped(frame) {
    if (frame !== LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f")) {
        return;
    }
    LifecycleWatcher_classPrivateFieldSet(this, _LifecycleWatcher_swapped, true, "f");
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_checkLifecycleComplete = function _LifecycleWatcher_checkLifecycleComplete() {
    // We expect navigation to commit.
    if (!checkLifecycle(LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_frame, "f"), LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_expectedLifecycle, "f"))) {
        return;
    }
    LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_lifecycleCallback, "f").call(this);
    if (LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_hasSameDocumentNavigation, "f")) {
        LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, "f").call(this);
    }
    if (LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_swapped, "f") || LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_newDocumentNavigation, "f")) {
        LifecycleWatcher_classPrivateFieldGet(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, "f").call(this);
    }
    function checkLifecycle(frame, expectedLifecycle) {
        for (const event of expectedLifecycle) {
            if (!frame._lifecycleEvents.has(event)) {
                return false;
            }
        }
        for (const child of frame.childFrames()) {
            if (child._hasStartedLoading &&
                !checkLifecycle(child, expectedLifecycle)) {
                return false;
            }
        }
        return true;
    }
};
//# sourceMappingURL=LifecycleWatcher.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/DOMWorld.js
/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DOMWorld_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var DOMWorld_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _DOMWorld_frameManager, _DOMWorld_client, _DOMWorld_frame, _DOMWorld_timeoutSettings, _DOMWorld_documentPromise, _DOMWorld_contextPromise, _DOMWorld_contextResolveCallback, _DOMWorld_detached, _DOMWorld_ctxBindings, _DOMWorld_boundFunctions, _DOMWorld_waitTasks, _DOMWorld_bindingIdentifier, _DOMWorld_settingUpBinding, _DOMWorld_onBindingCalled, _WaitTask_instances, _WaitTask_domWorld, _WaitTask_polling, _WaitTask_timeout, _WaitTask_predicateBody, _WaitTask_predicateAcceptsContextElement, _WaitTask_args, _WaitTask_binding, _WaitTask_runCount, _WaitTask_resolve, _WaitTask_reject, _WaitTask_timeoutTimer, _WaitTask_terminated, _WaitTask_root, _WaitTask_cleanup;





/**
 * @internal
 */
class DOMWorld {
    constructor(client, frameManager, frame, timeoutSettings) {
        _DOMWorld_frameManager.set(this, void 0);
        _DOMWorld_client.set(this, void 0);
        _DOMWorld_frame.set(this, void 0);
        _DOMWorld_timeoutSettings.set(this, void 0);
        _DOMWorld_documentPromise.set(this, null);
        _DOMWorld_contextPromise.set(this, null);
        _DOMWorld_contextResolveCallback.set(this, null);
        _DOMWorld_detached.set(this, false);
        // Set of bindings that have been registered in the current context.
        _DOMWorld_ctxBindings.set(this, new Set());
        // Contains mapping from functions that should be bound to Puppeteer functions.
        _DOMWorld_boundFunctions.set(this, new Map());
        _DOMWorld_waitTasks.set(this, new Set());
        // If multiple waitFor are set up asynchronously, we need to wait for the
        // first one to set up the binding in the page before running the others.
        _DOMWorld_settingUpBinding.set(this, null);
        _DOMWorld_onBindingCalled.set(this, async (event) => {
            let payload;
            if (!this._hasContext()) {
                return;
            }
            const context = await this.executionContext();
            try {
                payload = JSON.parse(event.payload);
            }
            catch {
                // The binding was either called by something in the page or it was
                // called before our wrapper was initialized.
                return;
            }
            const { type, name, seq, args } = payload;
            if (type !== 'internal' ||
                !DOMWorld_classPrivateFieldGet(this, _DOMWorld_ctxBindings, "f").has(DOMWorld_classPrivateFieldGet(DOMWorld, _a, "f", _DOMWorld_bindingIdentifier).call(DOMWorld, name, context._contextId))) {
                return;
            }
            if (context._contextId !== event.executionContextId) {
                return;
            }
            try {
                const fn = this._boundFunctions.get(name);
                if (!fn) {
                    throw new Error(`Bound function $name is not found`);
                }
                const result = await fn(...args);
                await context.evaluate(deliverResult, name, seq, result);
            }
            catch (error) {
                // The WaitTask may already have been resolved by timing out, or the
                // exection context may have been destroyed.
                // In both caes, the promises above are rejected with a protocol error.
                // We can safely ignores these, as the WaitTask is re-installed in
                // the next execution context if needed.
                if (error.message.includes('Protocol error')) {
                    return;
                }
                debugError(error);
            }
            function deliverResult(name, seq, result) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Code is evaluated in a different context.
                globalThis[name].callbacks.get(seq).resolve(result);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Code is evaluated in a different context.
                globalThis[name].callbacks.delete(seq);
            }
        });
        // Keep own reference to client because it might differ from the FrameManager's
        // client for OOP iframes.
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_client, client, "f");
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_frameManager, frameManager, "f");
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_frame, frame, "f");
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_timeoutSettings, timeoutSettings, "f");
        this._setContext(null);
        DOMWorld_classPrivateFieldGet(this, _DOMWorld_client, "f").on('Runtime.bindingCalled', DOMWorld_classPrivateFieldGet(this, _DOMWorld_onBindingCalled, "f"));
    }
    /**
     * @internal
     */
    get _waitTasks() {
        return DOMWorld_classPrivateFieldGet(this, _DOMWorld_waitTasks, "f");
    }
    /**
     * @internal
     */
    get _boundFunctions() {
        return DOMWorld_classPrivateFieldGet(this, _DOMWorld_boundFunctions, "f");
    }
    frame() {
        return DOMWorld_classPrivateFieldGet(this, _DOMWorld_frame, "f");
    }
    /**
     * @internal
     */
    async _setContext(context) {
        var _b;
        if (context) {
            assert(DOMWorld_classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f"), 'Execution Context has already been set.');
            DOMWorld_classPrivateFieldGet(this, _DOMWorld_ctxBindings, "f").clear();
            (_b = DOMWorld_classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f")) === null || _b === void 0 ? void 0 : _b.call(null, context);
            DOMWorld_classPrivateFieldSet(this, _DOMWorld_contextResolveCallback, null, "f");
            for (const waitTask of this._waitTasks) {
                waitTask.rerun();
            }
        }
        else {
            DOMWorld_classPrivateFieldSet(this, _DOMWorld_documentPromise, null, "f");
            DOMWorld_classPrivateFieldSet(this, _DOMWorld_contextPromise, new Promise((fulfill) => {
                DOMWorld_classPrivateFieldSet(this, _DOMWorld_contextResolveCallback, fulfill, "f");
            }), "f");
        }
    }
    /**
     * @internal
     */
    _hasContext() {
        return !DOMWorld_classPrivateFieldGet(this, _DOMWorld_contextResolveCallback, "f");
    }
    /**
     * @internal
     */
    _detach() {
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_detached, true, "f");
        DOMWorld_classPrivateFieldGet(this, _DOMWorld_client, "f").off('Runtime.bindingCalled', DOMWorld_classPrivateFieldGet(this, _DOMWorld_onBindingCalled, "f"));
        for (const waitTask of this._waitTasks) {
            waitTask.terminate(new Error('waitForFunction failed: frame got detached.'));
        }
    }
    executionContext() {
        if (DOMWorld_classPrivateFieldGet(this, _DOMWorld_detached, "f")) {
            throw new Error(`Execution context is not available in detached frame "${DOMWorld_classPrivateFieldGet(this, _DOMWorld_frame, "f").url()}" (are you trying to evaluate?)`);
        }
        if (DOMWorld_classPrivateFieldGet(this, _DOMWorld_contextPromise, "f") === null) {
            throw new Error(`Execution content promise is missing`);
        }
        return DOMWorld_classPrivateFieldGet(this, _DOMWorld_contextPromise, "f");
    }
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    async evaluate(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluate(pageFunction, ...args);
    }
    async $(selector) {
        const document = await this._document();
        const value = await document.$(selector);
        return value;
    }
    /**
     * @internal
     */
    async _document() {
        if (DOMWorld_classPrivateFieldGet(this, _DOMWorld_documentPromise, "f")) {
            return DOMWorld_classPrivateFieldGet(this, _DOMWorld_documentPromise, "f");
        }
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_documentPromise, this.executionContext().then(async (context) => {
            const document = await context.evaluateHandle('document');
            const element = document.asElement();
            if (element === null) {
                throw new Error('Document is null');
            }
            return element;
        }), "f");
        return DOMWorld_classPrivateFieldGet(this, _DOMWorld_documentPromise, "f");
    }
    async $x(expression) {
        const document = await this._document();
        const value = await document.$x(expression);
        return value;
    }
    async $eval(selector, pageFunction, ...args) {
        const document = await this._document();
        return document.$eval(selector, pageFunction, ...args);
    }
    async $$eval(selector, pageFunction, ...args) {
        const document = await this._document();
        const value = await document.$$eval(selector, pageFunction, ...args);
        return value;
    }
    async $$(selector) {
        const document = await this._document();
        const value = await document.$$(selector);
        return value;
    }
    async content() {
        return await this.evaluate(() => {
            let retVal = '';
            if (document.doctype) {
                retVal = new XMLSerializer().serializeToString(document.doctype);
            }
            if (document.documentElement) {
                retVal += document.documentElement.outerHTML;
            }
            return retVal;
        });
    }
    async setContent(html, options = {}) {
        const { waitUntil = ['load'], timeout = DOMWorld_classPrivateFieldGet(this, _DOMWorld_timeoutSettings, "f").navigationTimeout(), } = options;
        // We rely upon the fact that document.open() will reset frame lifecycle with "init"
        // lifecycle event. @see https://crrev.com/608658
        await this.evaluate((html) => {
            document.open();
            document.write(html);
            document.close();
        }, html);
        const watcher = new LifecycleWatcher(DOMWorld_classPrivateFieldGet(this, _DOMWorld_frameManager, "f"), DOMWorld_classPrivateFieldGet(this, _DOMWorld_frame, "f"), waitUntil, timeout);
        const error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            watcher.lifecyclePromise(),
        ]);
        watcher.dispose();
        if (error) {
            throw error;
        }
    }
    /**
     * Adds a script tag into the current context.
     *
     * @remarks
     *
     * You can pass a URL, filepath or string of contents. Note that when running Puppeteer
     * in a browser environment you cannot pass a filepath and should use either
     * `url` or `content`.
     */
    async addScriptTag(options) {
        const { url = null, path = null, content = null, id = '', type = '', } = options;
        if (url !== null) {
            try {
                const context = await this.executionContext();
                const handle = await context.evaluateHandle(addScriptUrl, url, id, type);
                const elementHandle = handle.asElement();
                if (elementHandle === null) {
                    throw new Error('Script element is not found');
                }
                return elementHandle;
            }
            catch (error) {
                throw new Error(`Loading script from ${url} failed`);
            }
        }
        if (path !== null) {
            let fs;
            try {
                fs = (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 19))).promises;
            }
            catch (error) {
                if (error instanceof TypeError) {
                    throw new Error('Can only pass a filepath to addScriptTag in a Node-like environment.');
                }
                throw error;
            }
            let contents = await fs.readFile(path, 'utf8');
            contents += '//# sourceURL=' + path.replace(/\n/g, '');
            const context = await this.executionContext();
            const handle = await context.evaluateHandle(addScriptContent, contents, id, type);
            const elementHandle = handle.asElement();
            if (elementHandle === null) {
                throw new Error('Script element is not found');
            }
            return elementHandle;
        }
        if (content !== null) {
            const context = await this.executionContext();
            const handle = await context.evaluateHandle(addScriptContent, content, id, type);
            const elementHandle = handle.asElement();
            if (elementHandle === null) {
                throw new Error('Script element is not found');
            }
            return elementHandle;
        }
        throw new Error('Provide an object with a `url`, `path` or `content` property');
        async function addScriptUrl(url, id, type) {
            const script = document.createElement('script');
            script.src = url;
            if (id) {
                script.id = id;
            }
            if (type) {
                script.type = type;
            }
            const promise = new Promise((res, rej) => {
                script.onload = res;
                script.onerror = rej;
            });
            document.head.appendChild(script);
            await promise;
            return script;
        }
        function addScriptContent(content, id, type = 'text/javascript') {
            const script = document.createElement('script');
            script.type = type;
            script.text = content;
            if (id) {
                script.id = id;
            }
            let error = null;
            script.onerror = (e) => {
                return (error = e);
            };
            document.head.appendChild(script);
            if (error) {
                throw error;
            }
            return script;
        }
    }
    /**
     * Adds a style tag into the current context.
     *
     * @remarks
     *
     * You can pass a URL, filepath or string of contents. Note that when running Puppeteer
     * in a browser environment you cannot pass a filepath and should use either
     * `url` or `content`.
     *
     */
    async addStyleTag(options) {
        const { url = null, path = null, content = null } = options;
        if (url !== null) {
            try {
                const context = await this.executionContext();
                const handle = await context.evaluateHandle(addStyleUrl, url);
                const elementHandle = handle.asElement();
                if (elementHandle === null) {
                    throw new Error('Style element is not found');
                }
                return elementHandle;
            }
            catch (error) {
                throw new Error(`Loading style from ${url} failed`);
            }
        }
        if (path !== null) {
            let fs;
            try {
                fs = (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 19))).promises;
            }
            catch (error) {
                if (error instanceof TypeError) {
                    throw new Error('Cannot pass a filepath to addStyleTag in the browser environment.');
                }
                throw error;
            }
            let contents = await fs.readFile(path, 'utf8');
            contents += '/*# sourceURL=' + path.replace(/\n/g, '') + '*/';
            const context = await this.executionContext();
            const handle = await context.evaluateHandle(addStyleContent, contents);
            const elementHandle = handle.asElement();
            if (elementHandle === null) {
                throw new Error('Style element is not found');
            }
            return elementHandle;
        }
        if (content !== null) {
            const context = await this.executionContext();
            const handle = await context.evaluateHandle(addStyleContent, content);
            const elementHandle = handle.asElement();
            if (elementHandle === null) {
                throw new Error('Style element is not found');
            }
            return elementHandle;
        }
        throw new Error('Provide an object with a `url`, `path` or `content` property');
        async function addStyleUrl(url) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            const promise = new Promise((res, rej) => {
                link.onload = res;
                link.onerror = rej;
            });
            document.head.appendChild(link);
            await promise;
            return link;
        }
        async function addStyleContent(content) {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(content));
            const promise = new Promise((res, rej) => {
                style.onload = res;
                style.onerror = rej;
            });
            document.head.appendChild(style);
            await promise;
            return style;
        }
    }
    async click(selector, options) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.click(options);
        await handle.dispose();
    }
    async focus(selector) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.focus();
        await handle.dispose();
    }
    async hover(selector) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.hover();
        await handle.dispose();
    }
    async select(selector, ...values) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        const result = await handle.select(...values);
        await handle.dispose();
        return result;
    }
    async tap(selector) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.tap();
        await handle.dispose();
    }
    async type(selector, text, options) {
        const handle = await this.$(selector);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.type(text, options);
        await handle.dispose();
    }
    async waitForSelector(selector, options) {
        const { updatedSelector, queryHandler } = _getQueryHandlerAndSelector(selector);
        assert(queryHandler.waitFor, 'Query handler does not support waiting');
        return queryHandler.waitFor(this, updatedSelector, options);
    }
    /**
     * @internal
     */
    async _addBindingToContext(context, name) {
        // Previous operation added the binding so we are done.
        if (DOMWorld_classPrivateFieldGet(this, _DOMWorld_ctxBindings, "f").has(DOMWorld_classPrivateFieldGet(DOMWorld, _a, "f", _DOMWorld_bindingIdentifier).call(DOMWorld, name, context._contextId))) {
            return;
        }
        // Wait for other operation to finish
        if (DOMWorld_classPrivateFieldGet(this, _DOMWorld_settingUpBinding, "f")) {
            await DOMWorld_classPrivateFieldGet(this, _DOMWorld_settingUpBinding, "f");
            return this._addBindingToContext(context, name);
        }
        const bind = async (name) => {
            const expression = pageBindingInitString('internal', name);
            try {
                // TODO: In theory, it would be enough to call this just once
                await context._client.send('Runtime.addBinding', {
                    name,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore The protocol definition is not up to date.
                    executionContextName: context._contextName,
                });
                await context.evaluate(expression);
            }
            catch (error) {
                // We could have tried to evaluate in a context which was already
                // destroyed. This happens, for example, if the page is navigated while
                // we are trying to add the binding
                const ctxDestroyed = error.message.includes('Execution context was destroyed');
                const ctxNotFound = error.message.includes('Cannot find context with specified id');
                if (ctxDestroyed || ctxNotFound) {
                    return;
                }
                else {
                    debugError(error);
                    return;
                }
            }
            DOMWorld_classPrivateFieldGet(this, _DOMWorld_ctxBindings, "f").add(DOMWorld_classPrivateFieldGet(DOMWorld, _a, "f", _DOMWorld_bindingIdentifier).call(DOMWorld, name, context._contextId));
        };
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_settingUpBinding, bind(name), "f");
        await DOMWorld_classPrivateFieldGet(this, _DOMWorld_settingUpBinding, "f");
        DOMWorld_classPrivateFieldSet(this, _DOMWorld_settingUpBinding, null, "f");
    }
    /**
     * @internal
     */
    async _waitForSelectorInPage(queryOne, selector, options, binding) {
        const { visible: waitForVisible = false, hidden: waitForHidden = false, timeout = DOMWorld_classPrivateFieldGet(this, _DOMWorld_timeoutSettings, "f").timeout(), } = options;
        const polling = waitForVisible || waitForHidden ? 'raf' : 'mutation';
        const title = `selector \`${selector}\`${waitForHidden ? ' to be hidden' : ''}`;
        async function predicate(root, selector, waitForVisible, waitForHidden) {
            const node = predicateQueryHandler
                ? (await predicateQueryHandler(root, selector))
                : root.querySelector(selector);
            return checkWaitForOptions(node, waitForVisible, waitForHidden);
        }
        const waitTaskOptions = {
            domWorld: this,
            predicateBody: makePredicateString(predicate, queryOne),
            predicateAcceptsContextElement: true,
            title,
            polling,
            timeout,
            args: [selector, waitForVisible, waitForHidden],
            binding,
            root: options.root,
        };
        const waitTask = new WaitTask(waitTaskOptions);
        const jsHandle = await waitTask.promise;
        const elementHandle = jsHandle.asElement();
        if (!elementHandle) {
            await jsHandle.dispose();
            return null;
        }
        return elementHandle;
    }
    async waitForXPath(xpath, options) {
        const { visible: waitForVisible = false, hidden: waitForHidden = false, timeout = DOMWorld_classPrivateFieldGet(this, _DOMWorld_timeoutSettings, "f").timeout(), } = options;
        const polling = waitForVisible || waitForHidden ? 'raf' : 'mutation';
        const title = `XPath \`${xpath}\`${waitForHidden ? ' to be hidden' : ''}`;
        function predicate(root, xpath, waitForVisible, waitForHidden) {
            const node = document.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return checkWaitForOptions(node, waitForVisible, waitForHidden);
        }
        const waitTaskOptions = {
            domWorld: this,
            predicateBody: makePredicateString(predicate),
            predicateAcceptsContextElement: true,
            title,
            polling,
            timeout,
            args: [xpath, waitForVisible, waitForHidden],
            root: options.root,
        };
        const waitTask = new WaitTask(waitTaskOptions);
        const jsHandle = await waitTask.promise;
        const elementHandle = jsHandle.asElement();
        if (!elementHandle) {
            await jsHandle.dispose();
            return null;
        }
        return elementHandle;
    }
    waitForFunction(pageFunction, options = {}, ...args) {
        const { polling = 'raf', timeout = DOMWorld_classPrivateFieldGet(this, _DOMWorld_timeoutSettings, "f").timeout() } = options;
        const waitTaskOptions = {
            domWorld: this,
            predicateBody: pageFunction,
            predicateAcceptsContextElement: false,
            title: 'function',
            polling,
            timeout,
            args,
        };
        const waitTask = new WaitTask(waitTaskOptions);
        return waitTask.promise;
    }
    async title() {
        return this.evaluate(() => {
            return document.title;
        });
    }
}
_a = DOMWorld, _DOMWorld_frameManager = new WeakMap(), _DOMWorld_client = new WeakMap(), _DOMWorld_frame = new WeakMap(), _DOMWorld_timeoutSettings = new WeakMap(), _DOMWorld_documentPromise = new WeakMap(), _DOMWorld_contextPromise = new WeakMap(), _DOMWorld_contextResolveCallback = new WeakMap(), _DOMWorld_detached = new WeakMap(), _DOMWorld_ctxBindings = new WeakMap(), _DOMWorld_boundFunctions = new WeakMap(), _DOMWorld_waitTasks = new WeakMap(), _DOMWorld_settingUpBinding = new WeakMap(), _DOMWorld_onBindingCalled = new WeakMap();
_DOMWorld_bindingIdentifier = { value: (name, contextId) => {
        return `${name}_${contextId}`;
    } };
const DOMWorld_noop = () => { };
/**
 * @internal
 */
class WaitTask {
    constructor(options) {
        _WaitTask_instances.add(this);
        _WaitTask_domWorld.set(this, void 0);
        _WaitTask_polling.set(this, void 0);
        _WaitTask_timeout.set(this, void 0);
        _WaitTask_predicateBody.set(this, void 0);
        _WaitTask_predicateAcceptsContextElement.set(this, void 0);
        _WaitTask_args.set(this, void 0);
        _WaitTask_binding.set(this, void 0);
        _WaitTask_runCount.set(this, 0);
        _WaitTask_resolve.set(this, DOMWorld_noop);
        _WaitTask_reject.set(this, DOMWorld_noop);
        _WaitTask_timeoutTimer.set(this, void 0);
        _WaitTask_terminated.set(this, false);
        _WaitTask_root.set(this, null);
        if (isString(options.polling)) {
            assert(options.polling === 'raf' || options.polling === 'mutation', 'Unknown polling option: ' + options.polling);
        }
        else if (isNumber(options.polling)) {
            assert(options.polling > 0, 'Cannot poll with non-positive interval: ' + options.polling);
        }
        else {
            throw new Error('Unknown polling options: ' + options.polling);
        }
        function getPredicateBody(predicateBody) {
            if (isString(predicateBody)) {
                return `return (${predicateBody});`;
            }
            return `return (${predicateBody})(...args);`;
        }
        DOMWorld_classPrivateFieldSet(this, _WaitTask_domWorld, options.domWorld, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_polling, options.polling, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_timeout, options.timeout, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_root, options.root || null, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_predicateBody, getPredicateBody(options.predicateBody), "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_predicateAcceptsContextElement, options.predicateAcceptsContextElement, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_args, options.args, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_binding, options.binding, "f");
        DOMWorld_classPrivateFieldSet(this, _WaitTask_runCount, 0, "f");
        DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f")._waitTasks.add(this);
        if (DOMWorld_classPrivateFieldGet(this, _WaitTask_binding, "f")) {
            DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f")._boundFunctions.set(DOMWorld_classPrivateFieldGet(this, _WaitTask_binding, "f").name, DOMWorld_classPrivateFieldGet(this, _WaitTask_binding, "f").pptrFunction);
        }
        this.promise = new Promise((resolve, reject) => {
            DOMWorld_classPrivateFieldSet(this, _WaitTask_resolve, resolve, "f");
            DOMWorld_classPrivateFieldSet(this, _WaitTask_reject, reject, "f");
        });
        // Since page navigation requires us to re-install the pageScript, we should track
        // timeout on our end.
        if (options.timeout) {
            const timeoutError = new TimeoutError(`waiting for ${options.title} failed: timeout ${options.timeout}ms exceeded`);
            DOMWorld_classPrivateFieldSet(this, _WaitTask_timeoutTimer, setTimeout(() => {
                return this.terminate(timeoutError);
            }, options.timeout), "f");
        }
        this.rerun();
    }
    terminate(error) {
        DOMWorld_classPrivateFieldSet(this, _WaitTask_terminated, true, "f");
        DOMWorld_classPrivateFieldGet(this, _WaitTask_reject, "f").call(this, error);
        DOMWorld_classPrivateFieldGet(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
    }
    async rerun() {
        var _b;
        const runCount = DOMWorld_classPrivateFieldSet(this, _WaitTask_runCount, (_b = DOMWorld_classPrivateFieldGet(this, _WaitTask_runCount, "f"), ++_b), "f");
        let success = null;
        let error = null;
        const context = await DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f").executionContext();
        if (DOMWorld_classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== DOMWorld_classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            return;
        }
        if (DOMWorld_classPrivateFieldGet(this, _WaitTask_binding, "f")) {
            await DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f")._addBindingToContext(context, DOMWorld_classPrivateFieldGet(this, _WaitTask_binding, "f").name);
        }
        if (DOMWorld_classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== DOMWorld_classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            return;
        }
        try {
            success = await context.evaluateHandle(waitForPredicatePageFunction, DOMWorld_classPrivateFieldGet(this, _WaitTask_root, "f") || null, DOMWorld_classPrivateFieldGet(this, _WaitTask_predicateBody, "f"), DOMWorld_classPrivateFieldGet(this, _WaitTask_predicateAcceptsContextElement, "f"), DOMWorld_classPrivateFieldGet(this, _WaitTask_polling, "f"), DOMWorld_classPrivateFieldGet(this, _WaitTask_timeout, "f"), ...DOMWorld_classPrivateFieldGet(this, _WaitTask_args, "f"));
        }
        catch (error_) {
            error = error_;
        }
        if (DOMWorld_classPrivateFieldGet(this, _WaitTask_terminated, "f") || runCount !== DOMWorld_classPrivateFieldGet(this, _WaitTask_runCount, "f")) {
            if (success) {
                await success.dispose();
            }
            return;
        }
        // Ignore timeouts in pageScript - we track timeouts ourselves.
        // If the frame's execution context has already changed, `frame.evaluate` will
        // throw an error - ignore this predicate run altogether.
        if (!error &&
            (await DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f")
                .evaluate((s) => {
                return !s;
            }, success)
                .catch(() => {
                return true;
            }))) {
            if (!success) {
                throw new Error('Assertion: result handle is not available');
            }
            await success.dispose();
            return;
        }
        if (error) {
            if (error.message.includes('TypeError: binding is not a function')) {
                return this.rerun();
            }
            // When frame is detached the task should have been terminated by the DOMWorld.
            // This can fail if we were adding this task while the frame was detached,
            // so we terminate here instead.
            if (error.message.includes('Execution context is not available in detached frame')) {
                this.terminate(new Error('waitForFunction failed: frame got detached.'));
                return;
            }
            // When the page is navigated, the promise is rejected.
            // We will try again in the new execution context.
            if (error.message.includes('Execution context was destroyed')) {
                return;
            }
            // We could have tried to evaluate in a context which was already
            // destroyed.
            if (error.message.includes('Cannot find context with specified id')) {
                return;
            }
            DOMWorld_classPrivateFieldGet(this, _WaitTask_reject, "f").call(this, error);
        }
        else {
            if (!success) {
                throw new Error('Assertion: result handle is not available');
            }
            DOMWorld_classPrivateFieldGet(this, _WaitTask_resolve, "f").call(this, success);
        }
        DOMWorld_classPrivateFieldGet(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
    }
}
_WaitTask_domWorld = new WeakMap(), _WaitTask_polling = new WeakMap(), _WaitTask_timeout = new WeakMap(), _WaitTask_predicateBody = new WeakMap(), _WaitTask_predicateAcceptsContextElement = new WeakMap(), _WaitTask_args = new WeakMap(), _WaitTask_binding = new WeakMap(), _WaitTask_runCount = new WeakMap(), _WaitTask_resolve = new WeakMap(), _WaitTask_reject = new WeakMap(), _WaitTask_timeoutTimer = new WeakMap(), _WaitTask_terminated = new WeakMap(), _WaitTask_root = new WeakMap(), _WaitTask_instances = new WeakSet(), _WaitTask_cleanup = function _WaitTask_cleanup() {
    DOMWorld_classPrivateFieldGet(this, _WaitTask_timeoutTimer, "f") !== undefined && clearTimeout(DOMWorld_classPrivateFieldGet(this, _WaitTask_timeoutTimer, "f"));
    DOMWorld_classPrivateFieldGet(this, _WaitTask_domWorld, "f")._waitTasks.delete(this);
};
async function waitForPredicatePageFunction(root, predicateBody, predicateAcceptsContextElement, polling, timeout, ...args) {
    root = root || document;
    const predicate = new Function('...args', predicateBody);
    let timedOut = false;
    if (timeout) {
        setTimeout(() => {
            return (timedOut = true);
        }, timeout);
    }
    switch (polling) {
        case 'raf':
            return await pollRaf();
        case 'mutation':
            return await pollMutation();
        default:
            return await pollInterval(polling);
    }
    async function pollMutation() {
        const success = predicateAcceptsContextElement
            ? await predicate(root, ...args)
            : await predicate(...args);
        if (success) {
            return Promise.resolve(success);
        }
        let fulfill = (_) => { };
        const result = new Promise((x) => {
            return (fulfill = x);
        });
        const observer = new MutationObserver(async () => {
            if (timedOut) {
                observer.disconnect();
                fulfill();
            }
            const success = predicateAcceptsContextElement
                ? await predicate(root, ...args)
                : await predicate(...args);
            if (success) {
                observer.disconnect();
                fulfill(success);
            }
        });
        if (!root) {
            throw new Error('Root element is not found.');
        }
        observer.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
        });
        return result;
    }
    async function pollRaf() {
        let fulfill = (_) => { };
        const result = new Promise((x) => {
            return (fulfill = x);
        });
        await onRaf();
        return result;
        async function onRaf() {
            if (timedOut) {
                fulfill();
                return;
            }
            const success = predicateAcceptsContextElement
                ? await predicate(root, ...args)
                : await predicate(...args);
            if (success) {
                fulfill(success);
            }
            else {
                requestAnimationFrame(onRaf);
            }
        }
    }
    async function pollInterval(pollInterval) {
        let fulfill = (_) => { };
        const result = new Promise((x) => {
            return (fulfill = x);
        });
        await onTimeout();
        return result;
        async function onTimeout() {
            if (timedOut) {
                fulfill();
                return;
            }
            const success = predicateAcceptsContextElement
                ? await predicate(root, ...args)
                : await predicate(...args);
            if (success) {
                fulfill(success);
            }
            else {
                setTimeout(onTimeout, pollInterval);
            }
        }
    }
}
//# sourceMappingURL=DOMWorld.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/FrameManager.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FrameManager_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var FrameManager_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FrameManager_instances, _FrameManager_page, _FrameManager_networkManager, _FrameManager_timeoutSettings, _FrameManager_frames, _FrameManager_contextIdToContext, _FrameManager_isolatedWorlds, _FrameManager_mainFrame, _FrameManager_client, _FrameManager_onAttachedToTarget, _FrameManager_onDetachedFromTarget, _FrameManager_onLifecycleEvent, _FrameManager_onFrameStartedLoading, _FrameManager_onFrameStoppedLoading, _FrameManager_handleFrameTree, _FrameManager_onFrameAttached, _FrameManager_onFrameNavigated, _FrameManager_onFrameNavigatedWithinDocument, _FrameManager_onFrameDetached, _FrameManager_onExecutionContextCreated, _FrameManager_onExecutionContextDestroyed, _FrameManager_onExecutionContextsCleared, _FrameManager_removeFramesRecursively, _Frame_parentFrame, _Frame_url, _Frame_detached, _Frame_client;








const UTILITY_WORLD_NAME = '__puppeteer_utility_world__';
const xPathPattern = /^\(\/\/[^\)]+\)|^\/\//;
/**
 * We use symbols to prevent external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
const FrameManagerEmittedEvents = {
    FrameAttached: Symbol('FrameManager.FrameAttached'),
    FrameNavigated: Symbol('FrameManager.FrameNavigated'),
    FrameDetached: Symbol('FrameManager.FrameDetached'),
    FrameSwapped: Symbol('FrameManager.FrameSwapped'),
    LifecycleEvent: Symbol('FrameManager.LifecycleEvent'),
    FrameNavigatedWithinDocument: Symbol('FrameManager.FrameNavigatedWithinDocument'),
    ExecutionContextCreated: Symbol('FrameManager.ExecutionContextCreated'),
    ExecutionContextDestroyed: Symbol('FrameManager.ExecutionContextDestroyed'),
};
/**
 * @internal
 */
class FrameManager extends EventEmitter {
    constructor(client, page, ignoreHTTPSErrors, timeoutSettings) {
        super();
        _FrameManager_instances.add(this);
        _FrameManager_page.set(this, void 0);
        _FrameManager_networkManager.set(this, void 0);
        _FrameManager_timeoutSettings.set(this, void 0);
        _FrameManager_frames.set(this, new Map());
        _FrameManager_contextIdToContext.set(this, new Map());
        _FrameManager_isolatedWorlds.set(this, new Set());
        _FrameManager_mainFrame.set(this, void 0);
        _FrameManager_client.set(this, void 0);
        FrameManager_classPrivateFieldSet(this, _FrameManager_client, client, "f");
        FrameManager_classPrivateFieldSet(this, _FrameManager_page, page, "f");
        FrameManager_classPrivateFieldSet(this, _FrameManager_networkManager, new NetworkManager(client, ignoreHTTPSErrors, this), "f");
        FrameManager_classPrivateFieldSet(this, _FrameManager_timeoutSettings, timeoutSettings, "f");
        this.setupEventListeners(FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f"));
    }
    /**
     * @internal
     */
    get _timeoutSettings() {
        return FrameManager_classPrivateFieldGet(this, _FrameManager_timeoutSettings, "f");
    }
    /**
     * @internal
     */
    get _client() {
        return FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f");
    }
    setupEventListeners(session) {
        session.on('Page.frameAttached', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, event.frameId, event.parentFrameId);
        });
        session.on('Page.frameNavigated', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, event.frame);
        });
        session.on('Page.navigatedWithinDocument', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigatedWithinDocument).call(this, event.frameId, event.url);
        });
        session.on('Page.frameDetached', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameDetached).call(this, event.frameId, event.reason);
        });
        session.on('Page.frameStartedLoading', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameStartedLoading).call(this, event.frameId);
        });
        session.on('Page.frameStoppedLoading', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameStoppedLoading).call(this, event.frameId);
        });
        session.on('Runtime.executionContextCreated', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextCreated).call(this, event.context, session);
        });
        session.on('Runtime.executionContextDestroyed', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextDestroyed).call(this, event.executionContextId, session);
        });
        session.on('Runtime.executionContextsCleared', () => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextsCleared).call(this, session);
        });
        session.on('Page.lifecycleEvent', (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onLifecycleEvent).call(this, event);
        });
        session.on('Target.attachedToTarget', async (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onAttachedToTarget).call(this, event);
        });
        session.on('Target.detachedFromTarget', async (event) => {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onDetachedFromTarget).call(this, event);
        });
    }
    async initialize(client = FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f")) {
        try {
            const result = await Promise.all([
                client.send('Page.enable'),
                client.send('Page.getFrameTree'),
                client !== FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f")
                    ? client.send('Target.setAutoAttach', {
                        autoAttach: true,
                        waitForDebuggerOnStart: false,
                        flatten: true,
                    })
                    : Promise.resolve(),
            ]);
            const { frameTree } = result[1];
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, client, frameTree);
            await Promise.all([
                client.send('Page.setLifecycleEventsEnabled', { enabled: true }),
                client.send('Runtime.enable').then(() => {
                    return this._ensureIsolatedWorld(client, UTILITY_WORLD_NAME);
                }),
                // TODO: Network manager is not aware of OOP iframes yet.
                client === FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f")
                    ? FrameManager_classPrivateFieldGet(this, _FrameManager_networkManager, "f").initialize()
                    : Promise.resolve(),
            ]);
        }
        catch (error) {
            // The target might have been closed before the initialization finished.
            if (isErrorLike(error) &&
                (error.message.includes('Target closed') ||
                    error.message.includes('Session closed'))) {
                return;
            }
            throw error;
        }
    }
    networkManager() {
        return FrameManager_classPrivateFieldGet(this, _FrameManager_networkManager, "f");
    }
    async navigateFrame(frame, url, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const { referer = FrameManager_classPrivateFieldGet(this, _FrameManager_networkManager, "f").extraHTTPHeaders()['referer'], waitUntil = ['load'], timeout = FrameManager_classPrivateFieldGet(this, _FrameManager_timeoutSettings, "f").navigationTimeout(), } = options;
        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        let error = await Promise.race([
            navigate(FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f"), url, referer, frame._id),
            watcher.timeoutOrTerminationPromise(),
        ]);
        if (!error) {
            error = await Promise.race([
                watcher.timeoutOrTerminationPromise(),
                watcher.newDocumentNavigationPromise(),
                watcher.sameDocumentNavigationPromise(),
            ]);
        }
        watcher.dispose();
        if (error) {
            throw error;
        }
        return await watcher.navigationResponse();
        async function navigate(client, url, referrer, frameId) {
            try {
                const response = await client.send('Page.navigate', {
                    url,
                    referrer,
                    frameId,
                });
                return response.errorText
                    ? new Error(`${response.errorText} at ${url}`)
                    : null;
            }
            catch (error) {
                if (isErrorLike(error)) {
                    return error;
                }
                throw error;
            }
        }
    }
    async waitForFrameNavigation(frame, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const { waitUntil = ['load'], timeout = FrameManager_classPrivateFieldGet(this, _FrameManager_timeoutSettings, "f").navigationTimeout(), } = options;
        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        const error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            watcher.sameDocumentNavigationPromise(),
            watcher.newDocumentNavigationPromise(),
        ]);
        watcher.dispose();
        if (error) {
            throw error;
        }
        return await watcher.navigationResponse();
    }
    page() {
        return FrameManager_classPrivateFieldGet(this, _FrameManager_page, "f");
    }
    mainFrame() {
        assert(FrameManager_classPrivateFieldGet(this, _FrameManager_mainFrame, "f"), 'Requesting main frame too early!');
        return FrameManager_classPrivateFieldGet(this, _FrameManager_mainFrame, "f");
    }
    frames() {
        return Array.from(FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").values());
    }
    frame(frameId) {
        return FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId) || null;
    }
    async _ensureIsolatedWorld(session, name) {
        const key = `${session.id()}:${name}`;
        if (FrameManager_classPrivateFieldGet(this, _FrameManager_isolatedWorlds, "f").has(key)) {
            return;
        }
        FrameManager_classPrivateFieldGet(this, _FrameManager_isolatedWorlds, "f").add(key);
        await session.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        });
        // Frames might be removed before we send this.
        await Promise.all(this.frames()
            .filter((frame) => {
            return frame._client() === session;
        })
            .map((frame) => {
            return session
                .send('Page.createIsolatedWorld', {
                frameId: frame._id,
                worldName: name,
                grantUniveralAccess: true,
            })
                .catch(debugError);
        }));
    }
    executionContextById(contextId, session = FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f")) {
        const key = `${session.id()}:${contextId}`;
        const context = FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").get(key);
        assert(context, 'INTERNAL ERROR: missing context with id = ' + contextId);
        return context;
    }
}
_FrameManager_page = new WeakMap(), _FrameManager_networkManager = new WeakMap(), _FrameManager_timeoutSettings = new WeakMap(), _FrameManager_frames = new WeakMap(), _FrameManager_contextIdToContext = new WeakMap(), _FrameManager_isolatedWorlds = new WeakMap(), _FrameManager_mainFrame = new WeakMap(), _FrameManager_client = new WeakMap(), _FrameManager_instances = new WeakSet(), _FrameManager_onAttachedToTarget = async function _FrameManager_onAttachedToTarget(event) {
    if (event.targetInfo.type !== 'iframe') {
        return;
    }
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.targetInfo.targetId);
    const connection = Connection.fromSession(FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f"));
    assert(connection);
    const session = connection.session(event.sessionId);
    assert(session);
    if (frame) {
        frame._updateClient(session);
    }
    this.setupEventListeners(session);
    await this.initialize(session);
}, _FrameManager_onDetachedFromTarget = async function _FrameManager_onDetachedFromTarget(event) {
    if (!event.targetId) {
        return;
    }
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.targetId);
    if (frame && frame.isOOPFrame()) {
        // When an OOP iframe is removed from the page, it
        // will only get a Target.detachedFromTarget event.
        FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
}, _FrameManager_onLifecycleEvent = function _FrameManager_onLifecycleEvent(event) {
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.frameId);
    if (!frame) {
        return;
    }
    frame._onLifecycleEvent(event.loaderId, event.name);
    this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_onFrameStartedLoading = function _FrameManager_onFrameStartedLoading(frameId) {
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._onLoadingStarted();
}, _FrameManager_onFrameStoppedLoading = function _FrameManager_onFrameStoppedLoading(frameId) {
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._onLoadingStopped();
    this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_handleFrameTree = function _FrameManager_handleFrameTree(session, frameTree) {
    if (frameTree.frame.parentId) {
        FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, frameTree.frame.id, frameTree.frame.parentId);
    }
    FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, frameTree.frame);
    if (!frameTree.childFrames) {
        return;
    }
    for (const child of frameTree.childFrames) {
        FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, session, child);
    }
}, _FrameManager_onFrameAttached = function _FrameManager_onFrameAttached(session, frameId, parentFrameId) {
    if (FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").has(frameId)) {
        const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
        if (session && frame.isOOPFrame()) {
            // If an OOP iframes becomes a normal iframe again
            // it is first attached to the parent page before
            // the target is removed.
            frame._updateClient(session);
        }
        return;
    }
    assert(parentFrameId);
    const parentFrame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(parentFrameId);
    assert(parentFrame);
    const frame = new Frame(this, parentFrame, frameId, session);
    FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").set(frame._id, frame);
    this.emit(FrameManagerEmittedEvents.FrameAttached, frame);
}, _FrameManager_onFrameNavigated = function _FrameManager_onFrameNavigated(framePayload) {
    const isMainFrame = !framePayload.parentId;
    let frame = isMainFrame
        ? FrameManager_classPrivateFieldGet(this, _FrameManager_mainFrame, "f")
        : FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(framePayload.id);
    assert(isMainFrame || frame, 'We either navigate top level or have old version of the navigated frame');
    // Detach all child frames first.
    if (frame) {
        for (const child of frame.childFrames()) {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
        }
    }
    // Update or create main frame.
    if (isMainFrame) {
        if (frame) {
            // Update frame id to retain frame identity on cross-process navigation.
            FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").delete(frame._id);
            frame._id = framePayload.id;
        }
        else {
            // Initial main frame navigation.
            frame = new Frame(this, null, framePayload.id, FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f"));
        }
        FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").set(framePayload.id, frame);
        FrameManager_classPrivateFieldSet(this, _FrameManager_mainFrame, frame, "f");
    }
    // Update frame payload.
    assert(frame);
    frame._navigated(framePayload);
    this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameNavigatedWithinDocument = function _FrameManager_onFrameNavigatedWithinDocument(frameId, url) {
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._navigatedWithinDocument(url);
    this.emit(FrameManagerEmittedEvents.FrameNavigatedWithinDocument, frame);
    this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameDetached = function _FrameManager_onFrameDetached(frameId, reason) {
    const frame = FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (reason === 'remove') {
        // Only remove the frame if the reason for the detached event is
        // an actual removement of the frame.
        // For frames that become OOP iframes, the reason would be 'swap'.
        if (frame) {
            FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
        }
    }
    else if (reason === 'swap') {
        this.emit(FrameManagerEmittedEvents.FrameSwapped, frame);
    }
}, _FrameManager_onExecutionContextCreated = function _FrameManager_onExecutionContextCreated(contextPayload, session) {
    const auxData = contextPayload.auxData;
    const frameId = auxData && auxData.frameId;
    const frame = typeof frameId === 'string' ? FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId) : undefined;
    let world;
    if (frame) {
        // Only care about execution contexts created for the current session.
        if (frame._client() !== session) {
            return;
        }
        if (contextPayload.auxData && !!contextPayload.auxData['isDefault']) {
            world = frame._mainWorld;
        }
        else if (contextPayload.name === UTILITY_WORLD_NAME &&
            !frame._secondaryWorld._hasContext()) {
            // In case of multiple sessions to the same target, there's a race between
            // connections so we might end up creating multiple isolated worlds.
            // We can use either.
            world = frame._secondaryWorld;
        }
    }
    const context = new ExecutionContext((frame === null || frame === void 0 ? void 0 : frame._client()) || FrameManager_classPrivateFieldGet(this, _FrameManager_client, "f"), contextPayload, world);
    if (world) {
        world._setContext(context);
    }
    const key = `${session.id()}:${contextPayload.id}`;
    FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").set(key, context);
}, _FrameManager_onExecutionContextDestroyed = function _FrameManager_onExecutionContextDestroyed(executionContextId, session) {
    const key = `${session.id()}:${executionContextId}`;
    const context = FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").get(key);
    if (!context) {
        return;
    }
    FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").delete(key);
    if (context._world) {
        context._world._setContext(null);
    }
}, _FrameManager_onExecutionContextsCleared = function _FrameManager_onExecutionContextsCleared(session) {
    for (const [key, context] of FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").entries()) {
        // Make sure to only clear execution contexts that belong
        // to the current session.
        if (context._client !== session) {
            continue;
        }
        if (context._world) {
            context._world._setContext(null);
        }
        FrameManager_classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").delete(key);
    }
}, _FrameManager_removeFramesRecursively = function _FrameManager_removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
        FrameManager_classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
    }
    frame._detach();
    FrameManager_classPrivateFieldGet(this, _FrameManager_frames, "f").delete(frame._id);
    this.emit(FrameManagerEmittedEvents.FrameDetached, frame);
};
/**
 * At every point of time, page exposes its current frame tree via the
 * {@link Page.mainFrame | page.mainFrame} and
 * {@link Frame.childFrames | frame.childFrames} methods.
 *
 * @remarks
 *
 * `Frame` object lifecycles are controlled by three events that are all
 * dispatched on the page object:
 *
 * - {@link PageEmittedEvents.FrameAttached}
 *
 * - {@link PageEmittedEvents.FrameNavigated}
 *
 * - {@link PageEmittedEvents.FrameDetached}
 *
 * @Example
 * An example of dumping frame tree:
 *
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://www.google.com/chrome/browser/canary.html');
 *   dumpFrameTree(page.mainFrame(), '');
 *   await browser.close();
 *
 *   function dumpFrameTree(frame, indent) {
 *     console.log(indent + frame.url());
 *     for (const child of frame.childFrames()) {
 *     dumpFrameTree(child, indent + '  ');
 *     }
 *   }
 * })();
 * ```
 *
 * @Example
 * An example of getting text from an iframe element:
 *
 * ```js
 * const frame = page.frames().find(frame => frame.name() === 'myframe');
 * const text = await frame.$eval('.selector', element => element.textContent);
 * console.log(text);
 * ```
 *
 * @public
 */
class Frame {
    /**
     * @internal
     */
    constructor(frameManager, parentFrame, frameId, client) {
        _Frame_parentFrame.set(this, void 0);
        _Frame_url.set(this, '');
        _Frame_detached.set(this, false);
        _Frame_client.set(this, void 0);
        /**
         * @internal
         */
        this._loaderId = '';
        /**
         * @internal
         */
        this._hasStartedLoading = false;
        /**
         * @internal
         */
        this._lifecycleEvents = new Set();
        this._frameManager = frameManager;
        FrameManager_classPrivateFieldSet(this, _Frame_parentFrame, parentFrame !== null && parentFrame !== void 0 ? parentFrame : null, "f");
        FrameManager_classPrivateFieldSet(this, _Frame_url, '', "f");
        this._id = frameId;
        FrameManager_classPrivateFieldSet(this, _Frame_detached, false, "f");
        this._loaderId = '';
        this._childFrames = new Set();
        if (FrameManager_classPrivateFieldGet(this, _Frame_parentFrame, "f")) {
            FrameManager_classPrivateFieldGet(this, _Frame_parentFrame, "f")._childFrames.add(this);
        }
        this._updateClient(client);
    }
    /**
     * @internal
     */
    _updateClient(client) {
        FrameManager_classPrivateFieldSet(this, _Frame_client, client, "f");
        this._mainWorld = new DOMWorld(FrameManager_classPrivateFieldGet(this, _Frame_client, "f"), this._frameManager, this, this._frameManager._timeoutSettings);
        this._secondaryWorld = new DOMWorld(FrameManager_classPrivateFieldGet(this, _Frame_client, "f"), this._frameManager, this, this._frameManager._timeoutSettings);
    }
    /**
     * @remarks
     *
     * @returns `true` if the frame is an OOP frame, or `false` otherwise.
     */
    isOOPFrame() {
        return FrameManager_classPrivateFieldGet(this, _Frame_client, "f") !== this._frameManager._client;
    }
    /**
     * @remarks
     *
     * `frame.goto` will throw an error if:
     * - there's an SSL error (e.g. in case of self-signed certificates).
     *
     * - target URL is invalid.
     *
     * - the `timeout` is exceeded during navigation.
     *
     * - the remote server does not respond or is unreachable.
     *
     * - the main resource failed to load.
     *
     * `frame.goto` will not throw an error when any valid HTTP status code is
     * returned by the remote server, including 404 "Not Found" and 500 "Internal
     * Server Error".  The status code for such responses can be retrieved by
     * calling {@link HTTPResponse.status}.
     *
     * NOTE: `frame.goto` either throws an error or returns a main resource
     * response. The only exceptions are navigation to `about:blank` or
     * navigation to the same URL with a different hash, which would succeed and
     * return `null`.
     *
     * NOTE: Headless mode doesn't support navigation to a PDF document. See
     * the {@link https://bugs.chromium.org/p/chromium/issues/detail?id=761295 | upstream
     * issue}.
     *
     * @param url - the URL to navigate the frame to. This should include the
     * scheme, e.g. `https://`.
     * @param options - navigation options. `waitUntil` is useful to define when
     * the navigation should be considered successful - see the docs for
     * {@link PuppeteerLifeCycleEvent} for more details.
     *
     * @returns A promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect.
     */
    async goto(url, options = {}) {
        return await this._frameManager.navigateFrame(this, url, options);
    }
    /**
     * @remarks
     *
     * This resolves when the frame navigates to a new URL. It is useful for when
     * you run code which will indirectly cause the frame to navigate. Consider
     * this example:
     *
     * ```js
     * const [response] = await Promise.all([
     *   // The navigation promise resolves after navigation has finished
     *   frame.waitForNavigation(),
     *   // Clicking the link will indirectly cause a navigation
     *   frame.click('a.my-link'),
     * ]);
     * ```
     *
     * Usage of the {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API} to change the URL is considered a navigation.
     *
     * @param options - options to configure when the navigation is consided finished.
     * @returns a promise that resolves when the frame navigates to a new URL.
     */
    async waitForNavigation(options = {}) {
        return await this._frameManager.waitForFrameNavigation(this, options);
    }
    /**
     * @internal
     */
    _client() {
        return FrameManager_classPrivateFieldGet(this, _Frame_client, "f");
    }
    /**
     * @returns a promise that resolves to the frame's default execution context.
     */
    executionContext() {
        return this._mainWorld.executionContext();
    }
    /**
     * @remarks
     *
     * The only difference between {@link Frame.evaluate} and
     * `frame.evaluateHandle` is that `evaluateHandle` will return the value
     * wrapped in an in-page object.
     *
     * This method behaves identically to {@link Page.evaluateHandle} except it's
     * run within the context of the `frame`, rather than the entire page.
     *
     * @param pageFunction - a function that is run within the frame
     * @param args - arguments to be passed to the pageFunction
     */
    async evaluateHandle(pageFunction, ...args) {
        return this._mainWorld.evaluateHandle(pageFunction, ...args);
    }
    /**
     * @remarks
     *
     * This method behaves identically to {@link Page.evaluate} except it's run
     * within the context of the `frame`, rather than the entire page.
     *
     * @param pageFunction - a function that is run within the frame
     * @param args - arguments to be passed to the pageFunction
     */
    async evaluate(pageFunction, ...args) {
        return this._mainWorld.evaluate(pageFunction, ...args);
    }
    /**
     * This method queries the frame for the given selector.
     *
     * @param selector - a selector to query for.
     * @returns A promise which resolves to an `ElementHandle` pointing at the
     * element, or `null` if it was not found.
     */
    async $(selector) {
        return this._mainWorld.$(selector);
    }
    /**
     * This method evaluates the given XPath expression and returns the results.
     *
     * @param expression - the XPath expression to evaluate.
     */
    async $x(expression) {
        return this._mainWorld.$x(expression);
    }
    /**
     * @remarks
     *
     * This method runs `document.querySelector` within
     * the frame and passes it as the first argument to `pageFunction`.
     *
     * If `pageFunction` returns a Promise, then `frame.$eval` would wait for
     * the promise to resolve and return its value.
     *
     * @example
     *
     * ```js
     * const searchValue = await frame.$eval('#search', el => el.value);
     * ```
     *
     * @param selector - the selector to query for
     * @param pageFunction - the function to be evaluated in the frame's context
     * @param args - additional arguments to pass to `pageFunction`
     */
    async $eval(selector, pageFunction, ...args) {
        return this._mainWorld.$eval(selector, pageFunction, ...args);
    }
    /**
     * @remarks
     *
     * This method runs `Array.from(document.querySelectorAll(selector))` within
     * the frame and passes it as the first argument to `pageFunction`.
     *
     * If `pageFunction` returns a Promise, then `frame.$$eval` would wait for
     * the promise to resolve and return its value.
     *
     * @example
     *
     * ```js
     * const divsCounts = await frame.$$eval('div', divs => divs.length);
     * ```
     *
     * @param selector - the selector to query for
     * @param pageFunction - the function to be evaluated in the frame's context
     * @param args - additional arguments to pass to `pageFunction`
     */
    async $$eval(selector, pageFunction, ...args) {
        return this._mainWorld.$$eval(selector, pageFunction, ...args);
    }
    /**
     * This runs `document.querySelectorAll` in the frame and returns the result.
     *
     * @param selector - a selector to search for
     * @returns An array of element handles pointing to the found frame elements.
     */
    async $$(selector) {
        return this._mainWorld.$$(selector);
    }
    /**
     * @returns the full HTML contents of the frame, including the doctype.
     */
    async content() {
        return this._secondaryWorld.content();
    }
    /**
     * Set the content of the frame.
     *
     * @param html - HTML markup to assign to the page.
     * @param options - options to configure how long before timing out and at
     * what point to consider the content setting successful.
     */
    async setContent(html, options = {}) {
        return this._secondaryWorld.setContent(html, options);
    }
    /**
     * @remarks
     *
     * If the name is empty, it returns the `id` attribute instead.
     *
     * Note: This value is calculated once when the frame is created, and will not
     * update if the attribute is changed later.
     *
     * @returns the frame's `name` attribute as specified in the tag.
     */
    name() {
        return this._name || '';
    }
    /**
     * @returns the frame's URL.
     */
    url() {
        return FrameManager_classPrivateFieldGet(this, _Frame_url, "f");
    }
    /**
     * @returns the parent `Frame`, if any. Detached and main frames return `null`.
     */
    parentFrame() {
        return FrameManager_classPrivateFieldGet(this, _Frame_parentFrame, "f");
    }
    /**
     * @returns an array of child frames.
     */
    childFrames() {
        return Array.from(this._childFrames);
    }
    /**
     * @returns `true` if the frame has been detached, or `false` otherwise.
     */
    isDetached() {
        return FrameManager_classPrivateFieldGet(this, _Frame_detached, "f");
    }
    /**
     * Adds a `<script>` tag into the page with the desired url or content.
     *
     * @param options - configure the script to add to the page.
     *
     * @returns a promise that resolves to the added tag when the script's
     * `onload` event fires or when the script content was injected into the
     * frame.
     */
    async addScriptTag(options) {
        return this._mainWorld.addScriptTag(options);
    }
    /**
     * Adds a `<link rel="stylesheet">` tag into the page with the desired url or
     * a `<style type="text/css">` tag with the content.
     *
     * @param options - configure the CSS to add to the page.
     *
     * @returns a promise that resolves to the added tag when the stylesheets's
     * `onload` event fires or when the CSS content was injected into the
     * frame.
     */
    async addStyleTag(options) {
        return this._mainWorld.addStyleTag(options);
    }
    /**
     *
     * This method clicks the first element found that matches `selector`.
     *
     * @remarks
     *
     * This method scrolls the element into view if needed, and then uses
     * {@link Page.mouse} to click in the center of the element. If there's no
     * element matching `selector`, the method throws an error.
     *
     * Bear in mind that if `click()` triggers a navigation event and there's a
     * separate `page.waitForNavigation()` promise to be resolved, you may end up
     * with a race condition that yields unexpected results. The correct pattern
     * for click and wait for navigation is the following:
     *
     * ```javascript
     * const [response] = await Promise.all([
     *   page.waitForNavigation(waitOptions),
     *   frame.click(selector, clickOptions),
     * ]);
     * ```
     * @param selector - the selector to search for to click. If there are
     * multiple elements, the first will be clicked.
     */
    async click(selector, options = {}) {
        return this._secondaryWorld.click(selector, options);
    }
    /**
     * This method fetches an element with `selector` and focuses it.
     *
     * @remarks
     * If there's no element matching `selector`, the method throws an error.
     *
     * @param selector - the selector for the element to focus. If there are
     * multiple elements, the first will be focused.
     */
    async focus(selector) {
        return this._secondaryWorld.focus(selector);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.mouse} to hover over the center of the
     * element.
     *
     * @remarks
     * If there's no element matching `selector`, the method throws an
     *
     * @param selector - the selector for the element to hover. If there are
     * multiple elements, the first will be hovered.
     */
    async hover(selector) {
        return this._secondaryWorld.hover(selector);
    }
    /**
     * Triggers a `change` and `input` event once all the provided options have
     * been selected.
     *
     * @remarks
     *
     * If there's no `<select>` element matching `selector`, the
     * method throws an error.
     *
     * @example
     * ```js
     * frame.select('select#colors', 'blue'); // single selection
     * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
     * ```
     *
     * @param selector - a selector to query the frame for
     * @param values - an array of values to select. If the `<select>` has the
     * `multiple` attribute, all values are considered, otherwise only the first
     * one is taken into account.
     * @returns the list of values that were successfully selected.
     */
    select(selector, ...values) {
        return this._secondaryWorld.select(selector, ...values);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.touchscreen} to tap in the center of the
     * element.
     *
     * @remarks
     *
     * If there's no element matching `selector`, the method throws an error.
     *
     * @param selector - the selector to tap.
     * @returns a promise that resolves when the element has been tapped.
     */
    async tap(selector) {
        return this._secondaryWorld.tap(selector);
    }
    /**
     * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
     * in the text.
     *
     * @remarks
     * To press a special key, like `Control` or `ArrowDown`, use
     * {@link Keyboard.press}.
     *
     * @example
     * ```js
     * await frame.type('#mytextarea', 'Hello'); // Types instantly
     * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
     * ```
     *
     * @param selector - the selector for the element to type into. If there are
     * multiple the first will be used.
     * @param text - text to type into the element
     * @param options - takes one option, `delay`, which sets the time to wait
     * between key presses in milliseconds. Defaults to `0`.
     *
     * @returns a promise that resolves when the typing is complete.
     */
    async type(selector, text, options) {
        return this._mainWorld.type(selector, text, options);
    }
    /**
     * @remarks
     *
     * This method behaves differently depending on the first parameter. If it's a
     * `string`, it will be treated as a `selector` or `xpath` (if the string
     * starts with `//`). This method then is a shortcut for
     * {@link Frame.waitForSelector} or {@link Frame.waitForXPath}.
     *
     * If the first argument is a function this method is a shortcut for
     * {@link Frame.waitForFunction}.
     *
     * If the first argument is a `number`, it's treated as a timeout in
     * milliseconds and the method returns a promise which resolves after the
     * timeout.
     *
     * @param selectorOrFunctionOrTimeout - a selector, predicate or timeout to
     * wait for.
     * @param options - optional waiting parameters.
     * @param args - arguments to pass to `pageFunction`.
     *
     * @deprecated Don't use this method directly. Instead use the more explicit
     * methods available: {@link Frame.waitForSelector},
     * {@link Frame.waitForXPath}, {@link Frame.waitForFunction} or
     * {@link Frame.waitForTimeout}.
     */
    waitFor(selectorOrFunctionOrTimeout, options = {}, ...args) {
        console.warn('waitFor is deprecated and will be removed in a future release. See https://github.com/puppeteer/puppeteer/issues/6214 for details and how to migrate your code.');
        if (isString(selectorOrFunctionOrTimeout)) {
            const string = selectorOrFunctionOrTimeout;
            if (xPathPattern.test(string)) {
                return this.waitForXPath(string, options);
            }
            return this.waitForSelector(string, options);
        }
        if (isNumber(selectorOrFunctionOrTimeout)) {
            return new Promise((fulfill) => {
                return setTimeout(fulfill, selectorOrFunctionOrTimeout);
            });
        }
        if (typeof selectorOrFunctionOrTimeout === 'function') {
            return this.waitForFunction(selectorOrFunctionOrTimeout, options, ...args);
        }
        return Promise.reject(new Error('Unsupported target type: ' + typeof selectorOrFunctionOrTimeout));
    }
    /**
     * Causes your script to wait for the given number of milliseconds.
     *
     * @remarks
     * It's generally recommended to not wait for a number of seconds, but instead
     * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
     * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
     *
     * @example
     *
     * Wait for 1 second:
     *
     * ```
     * await frame.waitForTimeout(1000);
     * ```
     *
     * @param milliseconds - the number of milliseconds to wait.
     */
    waitForTimeout(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }
    /**
     * @remarks
     *
     *
     * Wait for the `selector` to appear in page. If at the moment of calling the
     * method the `selector` already exists, the method will return immediately.
     * If the selector doesn't appear after the `timeout` milliseconds of waiting,
     * the function will throw.
     *
     * This method works across navigations.
     *
     * @example
     * ```js
     * const puppeteer = require('puppeteer');
     *
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   let currentURL;
     *   page.mainFrame()
     *   .waitForSelector('img')
     *   .then(() => console.log('First URL with image: ' + currentURL));
     *
     *   for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
     *     await page.goto(currentURL);
     *   }
     *   await browser.close();
     * })();
     * ```
     * @param selector - the selector to wait for.
     * @param options - options to define if the element should be visible and how
     * long to wait before timing out.
     * @returns a promise which resolves when an element matching the selector
     * string is added to the DOM.
     */
    async waitForSelector(selector, options = {}) {
        const handle = await this._secondaryWorld.waitForSelector(selector, options);
        if (!handle) {
            return null;
        }
        const mainExecutionContext = await this._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    /**
     * @remarks
     * Wait for the `xpath` to appear in page. If at the moment of calling the
     * method the `xpath` already exists, the method will return immediately. If
     * the xpath doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * For a code example, see the example for {@link Frame.waitForSelector}. That
     * function behaves identically other than taking a CSS selector rather than
     * an XPath.
     *
     * @param xpath - the XPath expression to wait for.
     * @param options  - options to configure the visiblity of the element and how
     * long to wait before timing out.
     */
    async waitForXPath(xpath, options = {}) {
        const handle = await this._secondaryWorld.waitForXPath(xpath, options);
        if (!handle) {
            return null;
        }
        const mainExecutionContext = await this._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    /**
     * @remarks
     *
     * @example
     *
     * The `waitForFunction` can be used to observe viewport size change:
     * ```js
     * const puppeteer = require('puppeteer');
     *
     * (async () => {
     * .  const browser = await puppeteer.launch();
     * .  const page = await browser.newPage();
     * .  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
     * .  page.setViewport({width: 50, height: 50});
     * .  await watchDog;
     * .  await browser.close();
     * })();
     * ```
     *
     * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
     *
     * ```js
     * const selector = '.foo';
     * await frame.waitForFunction(
     *   selector => !!document.querySelector(selector),
     *   {}, // empty options object
     *   selector
     *);
     * ```
     *
     * @param pageFunction - the function to evaluate in the frame context.
     * @param options - options to configure the polling method and timeout.
     * @param args - arguments to pass to the `pageFunction`.
     * @returns the promise which resolve when the `pageFunction` returns a truthy value.
     */
    waitForFunction(pageFunction, options = {}, ...args) {
        return this._mainWorld.waitForFunction(pageFunction, options, ...args);
    }
    /**
     * @returns the frame's title.
     */
    async title() {
        return this._secondaryWorld.title();
    }
    /**
     * @internal
     */
    _navigated(framePayload) {
        this._name = framePayload.name;
        FrameManager_classPrivateFieldSet(this, _Frame_url, `${framePayload.url}${framePayload.urlFragment || ''}`, "f");
    }
    /**
     * @internal
     */
    _navigatedWithinDocument(url) {
        FrameManager_classPrivateFieldSet(this, _Frame_url, url, "f");
    }
    /**
     * @internal
     */
    _onLifecycleEvent(loaderId, name) {
        if (name === 'init') {
            this._loaderId = loaderId;
            this._lifecycleEvents.clear();
        }
        this._lifecycleEvents.add(name);
    }
    /**
     * @internal
     */
    _onLoadingStopped() {
        this._lifecycleEvents.add('DOMContentLoaded');
        this._lifecycleEvents.add('load');
    }
    /**
     * @internal
     */
    _onLoadingStarted() {
        this._hasStartedLoading = true;
    }
    /**
     * @internal
     */
    _detach() {
        FrameManager_classPrivateFieldSet(this, _Frame_detached, true, "f");
        this._mainWorld._detach();
        this._secondaryWorld._detach();
        if (FrameManager_classPrivateFieldGet(this, _Frame_parentFrame, "f")) {
            FrameManager_classPrivateFieldGet(this, _Frame_parentFrame, "f")._childFrames.delete(this);
        }
        FrameManager_classPrivateFieldSet(this, _Frame_parentFrame, null, "f");
    }
}
_Frame_parentFrame = new WeakMap(), _Frame_url = new WeakMap(), _Frame_detached = new WeakMap(), _Frame_client = new WeakMap();
function assertNoLegacyNavigationOptions(options) {
    assert(options['networkIdleTimeout'] === undefined, 'ERROR: networkIdleTimeout option is no longer supported.');
    assert(options['networkIdleInflight'] === undefined, 'ERROR: networkIdleInflight option is no longer supported.');
    assert(options['waitUntil'] !== 'networkidle', 'ERROR: "networkidle" option is no longer supported. Use "networkidle2" instead');
}
//# sourceMappingURL=FrameManager.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/USKeyboardLayout.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _keyDefinitions = {
    '0': { keyCode: 48, key: '0', code: 'Digit0' },
    '1': { keyCode: 49, key: '1', code: 'Digit1' },
    '2': { keyCode: 50, key: '2', code: 'Digit2' },
    '3': { keyCode: 51, key: '3', code: 'Digit3' },
    '4': { keyCode: 52, key: '4', code: 'Digit4' },
    '5': { keyCode: 53, key: '5', code: 'Digit5' },
    '6': { keyCode: 54, key: '6', code: 'Digit6' },
    '7': { keyCode: 55, key: '7', code: 'Digit7' },
    '8': { keyCode: 56, key: '8', code: 'Digit8' },
    '9': { keyCode: 57, key: '9', code: 'Digit9' },
    Power: { key: 'Power', code: 'Power' },
    Eject: { key: 'Eject', code: 'Eject' },
    Abort: { keyCode: 3, code: 'Abort', key: 'Cancel' },
    Help: { keyCode: 6, code: 'Help', key: 'Help' },
    Backspace: { keyCode: 8, code: 'Backspace', key: 'Backspace' },
    Tab: { keyCode: 9, code: 'Tab', key: 'Tab' },
    Numpad5: {
        keyCode: 12,
        shiftKeyCode: 101,
        key: 'Clear',
        code: 'Numpad5',
        shiftKey: '5',
        location: 3,
    },
    NumpadEnter: {
        keyCode: 13,
        code: 'NumpadEnter',
        key: 'Enter',
        text: '\r',
        location: 3,
    },
    Enter: { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    '\r': { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    '\n': { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    ShiftLeft: { keyCode: 16, code: 'ShiftLeft', key: 'Shift', location: 1 },
    ShiftRight: { keyCode: 16, code: 'ShiftRight', key: 'Shift', location: 2 },
    ControlLeft: {
        keyCode: 17,
        code: 'ControlLeft',
        key: 'Control',
        location: 1,
    },
    ControlRight: {
        keyCode: 17,
        code: 'ControlRight',
        key: 'Control',
        location: 2,
    },
    AltLeft: { keyCode: 18, code: 'AltLeft', key: 'Alt', location: 1 },
    AltRight: { keyCode: 18, code: 'AltRight', key: 'Alt', location: 2 },
    Pause: { keyCode: 19, code: 'Pause', key: 'Pause' },
    CapsLock: { keyCode: 20, code: 'CapsLock', key: 'CapsLock' },
    Escape: { keyCode: 27, code: 'Escape', key: 'Escape' },
    Convert: { keyCode: 28, code: 'Convert', key: 'Convert' },
    NonConvert: { keyCode: 29, code: 'NonConvert', key: 'NonConvert' },
    Space: { keyCode: 32, code: 'Space', key: ' ' },
    Numpad9: {
        keyCode: 33,
        shiftKeyCode: 105,
        key: 'PageUp',
        code: 'Numpad9',
        shiftKey: '9',
        location: 3,
    },
    PageUp: { keyCode: 33, code: 'PageUp', key: 'PageUp' },
    Numpad3: {
        keyCode: 34,
        shiftKeyCode: 99,
        key: 'PageDown',
        code: 'Numpad3',
        shiftKey: '3',
        location: 3,
    },
    PageDown: { keyCode: 34, code: 'PageDown', key: 'PageDown' },
    End: { keyCode: 35, code: 'End', key: 'End' },
    Numpad1: {
        keyCode: 35,
        shiftKeyCode: 97,
        key: 'End',
        code: 'Numpad1',
        shiftKey: '1',
        location: 3,
    },
    Home: { keyCode: 36, code: 'Home', key: 'Home' },
    Numpad7: {
        keyCode: 36,
        shiftKeyCode: 103,
        key: 'Home',
        code: 'Numpad7',
        shiftKey: '7',
        location: 3,
    },
    ArrowLeft: { keyCode: 37, code: 'ArrowLeft', key: 'ArrowLeft' },
    Numpad4: {
        keyCode: 37,
        shiftKeyCode: 100,
        key: 'ArrowLeft',
        code: 'Numpad4',
        shiftKey: '4',
        location: 3,
    },
    Numpad8: {
        keyCode: 38,
        shiftKeyCode: 104,
        key: 'ArrowUp',
        code: 'Numpad8',
        shiftKey: '8',
        location: 3,
    },
    ArrowUp: { keyCode: 38, code: 'ArrowUp', key: 'ArrowUp' },
    ArrowRight: { keyCode: 39, code: 'ArrowRight', key: 'ArrowRight' },
    Numpad6: {
        keyCode: 39,
        shiftKeyCode: 102,
        key: 'ArrowRight',
        code: 'Numpad6',
        shiftKey: '6',
        location: 3,
    },
    Numpad2: {
        keyCode: 40,
        shiftKeyCode: 98,
        key: 'ArrowDown',
        code: 'Numpad2',
        shiftKey: '2',
        location: 3,
    },
    ArrowDown: { keyCode: 40, code: 'ArrowDown', key: 'ArrowDown' },
    Select: { keyCode: 41, code: 'Select', key: 'Select' },
    Open: { keyCode: 43, code: 'Open', key: 'Execute' },
    PrintScreen: { keyCode: 44, code: 'PrintScreen', key: 'PrintScreen' },
    Insert: { keyCode: 45, code: 'Insert', key: 'Insert' },
    Numpad0: {
        keyCode: 45,
        shiftKeyCode: 96,
        key: 'Insert',
        code: 'Numpad0',
        shiftKey: '0',
        location: 3,
    },
    Delete: { keyCode: 46, code: 'Delete', key: 'Delete' },
    NumpadDecimal: {
        keyCode: 46,
        shiftKeyCode: 110,
        code: 'NumpadDecimal',
        key: '\u0000',
        shiftKey: '.',
        location: 3,
    },
    Digit0: { keyCode: 48, code: 'Digit0', shiftKey: ')', key: '0' },
    Digit1: { keyCode: 49, code: 'Digit1', shiftKey: '!', key: '1' },
    Digit2: { keyCode: 50, code: 'Digit2', shiftKey: '@', key: '2' },
    Digit3: { keyCode: 51, code: 'Digit3', shiftKey: '#', key: '3' },
    Digit4: { keyCode: 52, code: 'Digit4', shiftKey: '$', key: '4' },
    Digit5: { keyCode: 53, code: 'Digit5', shiftKey: '%', key: '5' },
    Digit6: { keyCode: 54, code: 'Digit6', shiftKey: '^', key: '6' },
    Digit7: { keyCode: 55, code: 'Digit7', shiftKey: '&', key: '7' },
    Digit8: { keyCode: 56, code: 'Digit8', shiftKey: '*', key: '8' },
    Digit9: { keyCode: 57, code: 'Digit9', shiftKey: '(', key: '9' },
    KeyA: { keyCode: 65, code: 'KeyA', shiftKey: 'A', key: 'a' },
    KeyB: { keyCode: 66, code: 'KeyB', shiftKey: 'B', key: 'b' },
    KeyC: { keyCode: 67, code: 'KeyC', shiftKey: 'C', key: 'c' },
    KeyD: { keyCode: 68, code: 'KeyD', shiftKey: 'D', key: 'd' },
    KeyE: { keyCode: 69, code: 'KeyE', shiftKey: 'E', key: 'e' },
    KeyF: { keyCode: 70, code: 'KeyF', shiftKey: 'F', key: 'f' },
    KeyG: { keyCode: 71, code: 'KeyG', shiftKey: 'G', key: 'g' },
    KeyH: { keyCode: 72, code: 'KeyH', shiftKey: 'H', key: 'h' },
    KeyI: { keyCode: 73, code: 'KeyI', shiftKey: 'I', key: 'i' },
    KeyJ: { keyCode: 74, code: 'KeyJ', shiftKey: 'J', key: 'j' },
    KeyK: { keyCode: 75, code: 'KeyK', shiftKey: 'K', key: 'k' },
    KeyL: { keyCode: 76, code: 'KeyL', shiftKey: 'L', key: 'l' },
    KeyM: { keyCode: 77, code: 'KeyM', shiftKey: 'M', key: 'm' },
    KeyN: { keyCode: 78, code: 'KeyN', shiftKey: 'N', key: 'n' },
    KeyO: { keyCode: 79, code: 'KeyO', shiftKey: 'O', key: 'o' },
    KeyP: { keyCode: 80, code: 'KeyP', shiftKey: 'P', key: 'p' },
    KeyQ: { keyCode: 81, code: 'KeyQ', shiftKey: 'Q', key: 'q' },
    KeyR: { keyCode: 82, code: 'KeyR', shiftKey: 'R', key: 'r' },
    KeyS: { keyCode: 83, code: 'KeyS', shiftKey: 'S', key: 's' },
    KeyT: { keyCode: 84, code: 'KeyT', shiftKey: 'T', key: 't' },
    KeyU: { keyCode: 85, code: 'KeyU', shiftKey: 'U', key: 'u' },
    KeyV: { keyCode: 86, code: 'KeyV', shiftKey: 'V', key: 'v' },
    KeyW: { keyCode: 87, code: 'KeyW', shiftKey: 'W', key: 'w' },
    KeyX: { keyCode: 88, code: 'KeyX', shiftKey: 'X', key: 'x' },
    KeyY: { keyCode: 89, code: 'KeyY', shiftKey: 'Y', key: 'y' },
    KeyZ: { keyCode: 90, code: 'KeyZ', shiftKey: 'Z', key: 'z' },
    MetaLeft: { keyCode: 91, code: 'MetaLeft', key: 'Meta', location: 1 },
    MetaRight: { keyCode: 92, code: 'MetaRight', key: 'Meta', location: 2 },
    ContextMenu: { keyCode: 93, code: 'ContextMenu', key: 'ContextMenu' },
    NumpadMultiply: {
        keyCode: 106,
        code: 'NumpadMultiply',
        key: '*',
        location: 3,
    },
    NumpadAdd: { keyCode: 107, code: 'NumpadAdd', key: '+', location: 3 },
    NumpadSubtract: {
        keyCode: 109,
        code: 'NumpadSubtract',
        key: '-',
        location: 3,
    },
    NumpadDivide: { keyCode: 111, code: 'NumpadDivide', key: '/', location: 3 },
    F1: { keyCode: 112, code: 'F1', key: 'F1' },
    F2: { keyCode: 113, code: 'F2', key: 'F2' },
    F3: { keyCode: 114, code: 'F3', key: 'F3' },
    F4: { keyCode: 115, code: 'F4', key: 'F4' },
    F5: { keyCode: 116, code: 'F5', key: 'F5' },
    F6: { keyCode: 117, code: 'F6', key: 'F6' },
    F7: { keyCode: 118, code: 'F7', key: 'F7' },
    F8: { keyCode: 119, code: 'F8', key: 'F8' },
    F9: { keyCode: 120, code: 'F9', key: 'F9' },
    F10: { keyCode: 121, code: 'F10', key: 'F10' },
    F11: { keyCode: 122, code: 'F11', key: 'F11' },
    F12: { keyCode: 123, code: 'F12', key: 'F12' },
    F13: { keyCode: 124, code: 'F13', key: 'F13' },
    F14: { keyCode: 125, code: 'F14', key: 'F14' },
    F15: { keyCode: 126, code: 'F15', key: 'F15' },
    F16: { keyCode: 127, code: 'F16', key: 'F16' },
    F17: { keyCode: 128, code: 'F17', key: 'F17' },
    F18: { keyCode: 129, code: 'F18', key: 'F18' },
    F19: { keyCode: 130, code: 'F19', key: 'F19' },
    F20: { keyCode: 131, code: 'F20', key: 'F20' },
    F21: { keyCode: 132, code: 'F21', key: 'F21' },
    F22: { keyCode: 133, code: 'F22', key: 'F22' },
    F23: { keyCode: 134, code: 'F23', key: 'F23' },
    F24: { keyCode: 135, code: 'F24', key: 'F24' },
    NumLock: { keyCode: 144, code: 'NumLock', key: 'NumLock' },
    ScrollLock: { keyCode: 145, code: 'ScrollLock', key: 'ScrollLock' },
    AudioVolumeMute: {
        keyCode: 173,
        code: 'AudioVolumeMute',
        key: 'AudioVolumeMute',
    },
    AudioVolumeDown: {
        keyCode: 174,
        code: 'AudioVolumeDown',
        key: 'AudioVolumeDown',
    },
    AudioVolumeUp: { keyCode: 175, code: 'AudioVolumeUp', key: 'AudioVolumeUp' },
    MediaTrackNext: {
        keyCode: 176,
        code: 'MediaTrackNext',
        key: 'MediaTrackNext',
    },
    MediaTrackPrevious: {
        keyCode: 177,
        code: 'MediaTrackPrevious',
        key: 'MediaTrackPrevious',
    },
    MediaStop: { keyCode: 178, code: 'MediaStop', key: 'MediaStop' },
    MediaPlayPause: {
        keyCode: 179,
        code: 'MediaPlayPause',
        key: 'MediaPlayPause',
    },
    Semicolon: { keyCode: 186, code: 'Semicolon', shiftKey: ':', key: ';' },
    Equal: { keyCode: 187, code: 'Equal', shiftKey: '+', key: '=' },
    NumpadEqual: { keyCode: 187, code: 'NumpadEqual', key: '=', location: 3 },
    Comma: { keyCode: 188, code: 'Comma', shiftKey: '<', key: ',' },
    Minus: { keyCode: 189, code: 'Minus', shiftKey: '_', key: '-' },
    Period: { keyCode: 190, code: 'Period', shiftKey: '>', key: '.' },
    Slash: { keyCode: 191, code: 'Slash', shiftKey: '?', key: '/' },
    Backquote: { keyCode: 192, code: 'Backquote', shiftKey: '~', key: '`' },
    BracketLeft: { keyCode: 219, code: 'BracketLeft', shiftKey: '{', key: '[' },
    Backslash: { keyCode: 220, code: 'Backslash', shiftKey: '|', key: '\\' },
    BracketRight: { keyCode: 221, code: 'BracketRight', shiftKey: '}', key: ']' },
    Quote: { keyCode: 222, code: 'Quote', shiftKey: '"', key: "'" },
    AltGraph: { keyCode: 225, code: 'AltGraph', key: 'AltGraph' },
    Props: { keyCode: 247, code: 'Props', key: 'CrSel' },
    Cancel: { keyCode: 3, key: 'Cancel', code: 'Abort' },
    Clear: { keyCode: 12, key: 'Clear', code: 'Numpad5', location: 3 },
    Shift: { keyCode: 16, key: 'Shift', code: 'ShiftLeft', location: 1 },
    Control: { keyCode: 17, key: 'Control', code: 'ControlLeft', location: 1 },
    Alt: { keyCode: 18, key: 'Alt', code: 'AltLeft', location: 1 },
    Accept: { keyCode: 30, key: 'Accept' },
    ModeChange: { keyCode: 31, key: 'ModeChange' },
    ' ': { keyCode: 32, key: ' ', code: 'Space' },
    Print: { keyCode: 42, key: 'Print' },
    Execute: { keyCode: 43, key: 'Execute', code: 'Open' },
    '\u0000': { keyCode: 46, key: '\u0000', code: 'NumpadDecimal', location: 3 },
    a: { keyCode: 65, key: 'a', code: 'KeyA' },
    b: { keyCode: 66, key: 'b', code: 'KeyB' },
    c: { keyCode: 67, key: 'c', code: 'KeyC' },
    d: { keyCode: 68, key: 'd', code: 'KeyD' },
    e: { keyCode: 69, key: 'e', code: 'KeyE' },
    f: { keyCode: 70, key: 'f', code: 'KeyF' },
    g: { keyCode: 71, key: 'g', code: 'KeyG' },
    h: { keyCode: 72, key: 'h', code: 'KeyH' },
    i: { keyCode: 73, key: 'i', code: 'KeyI' },
    j: { keyCode: 74, key: 'j', code: 'KeyJ' },
    k: { keyCode: 75, key: 'k', code: 'KeyK' },
    l: { keyCode: 76, key: 'l', code: 'KeyL' },
    m: { keyCode: 77, key: 'm', code: 'KeyM' },
    n: { keyCode: 78, key: 'n', code: 'KeyN' },
    o: { keyCode: 79, key: 'o', code: 'KeyO' },
    p: { keyCode: 80, key: 'p', code: 'KeyP' },
    q: { keyCode: 81, key: 'q', code: 'KeyQ' },
    r: { keyCode: 82, key: 'r', code: 'KeyR' },
    s: { keyCode: 83, key: 's', code: 'KeyS' },
    t: { keyCode: 84, key: 't', code: 'KeyT' },
    u: { keyCode: 85, key: 'u', code: 'KeyU' },
    v: { keyCode: 86, key: 'v', code: 'KeyV' },
    w: { keyCode: 87, key: 'w', code: 'KeyW' },
    x: { keyCode: 88, key: 'x', code: 'KeyX' },
    y: { keyCode: 89, key: 'y', code: 'KeyY' },
    z: { keyCode: 90, key: 'z', code: 'KeyZ' },
    Meta: { keyCode: 91, key: 'Meta', code: 'MetaLeft', location: 1 },
    '*': { keyCode: 106, key: '*', code: 'NumpadMultiply', location: 3 },
    '+': { keyCode: 107, key: '+', code: 'NumpadAdd', location: 3 },
    '-': { keyCode: 109, key: '-', code: 'NumpadSubtract', location: 3 },
    '/': { keyCode: 111, key: '/', code: 'NumpadDivide', location: 3 },
    ';': { keyCode: 186, key: ';', code: 'Semicolon' },
    '=': { keyCode: 187, key: '=', code: 'Equal' },
    ',': { keyCode: 188, key: ',', code: 'Comma' },
    '.': { keyCode: 190, key: '.', code: 'Period' },
    '`': { keyCode: 192, key: '`', code: 'Backquote' },
    '[': { keyCode: 219, key: '[', code: 'BracketLeft' },
    '\\': { keyCode: 220, key: '\\', code: 'Backslash' },
    ']': { keyCode: 221, key: ']', code: 'BracketRight' },
    "'": { keyCode: 222, key: "'", code: 'Quote' },
    Attn: { keyCode: 246, key: 'Attn' },
    CrSel: { keyCode: 247, key: 'CrSel', code: 'Props' },
    ExSel: { keyCode: 248, key: 'ExSel' },
    EraseEof: { keyCode: 249, key: 'EraseEof' },
    Play: { keyCode: 250, key: 'Play' },
    ZoomOut: { keyCode: 251, key: 'ZoomOut' },
    ')': { keyCode: 48, key: ')', code: 'Digit0' },
    '!': { keyCode: 49, key: '!', code: 'Digit1' },
    '@': { keyCode: 50, key: '@', code: 'Digit2' },
    '#': { keyCode: 51, key: '#', code: 'Digit3' },
    $: { keyCode: 52, key: '$', code: 'Digit4' },
    '%': { keyCode: 53, key: '%', code: 'Digit5' },
    '^': { keyCode: 54, key: '^', code: 'Digit6' },
    '&': { keyCode: 55, key: '&', code: 'Digit7' },
    '(': { keyCode: 57, key: '(', code: 'Digit9' },
    A: { keyCode: 65, key: 'A', code: 'KeyA' },
    B: { keyCode: 66, key: 'B', code: 'KeyB' },
    C: { keyCode: 67, key: 'C', code: 'KeyC' },
    D: { keyCode: 68, key: 'D', code: 'KeyD' },
    E: { keyCode: 69, key: 'E', code: 'KeyE' },
    F: { keyCode: 70, key: 'F', code: 'KeyF' },
    G: { keyCode: 71, key: 'G', code: 'KeyG' },
    H: { keyCode: 72, key: 'H', code: 'KeyH' },
    I: { keyCode: 73, key: 'I', code: 'KeyI' },
    J: { keyCode: 74, key: 'J', code: 'KeyJ' },
    K: { keyCode: 75, key: 'K', code: 'KeyK' },
    L: { keyCode: 76, key: 'L', code: 'KeyL' },
    M: { keyCode: 77, key: 'M', code: 'KeyM' },
    N: { keyCode: 78, key: 'N', code: 'KeyN' },
    O: { keyCode: 79, key: 'O', code: 'KeyO' },
    P: { keyCode: 80, key: 'P', code: 'KeyP' },
    Q: { keyCode: 81, key: 'Q', code: 'KeyQ' },
    R: { keyCode: 82, key: 'R', code: 'KeyR' },
    S: { keyCode: 83, key: 'S', code: 'KeyS' },
    T: { keyCode: 84, key: 'T', code: 'KeyT' },
    U: { keyCode: 85, key: 'U', code: 'KeyU' },
    V: { keyCode: 86, key: 'V', code: 'KeyV' },
    W: { keyCode: 87, key: 'W', code: 'KeyW' },
    X: { keyCode: 88, key: 'X', code: 'KeyX' },
    Y: { keyCode: 89, key: 'Y', code: 'KeyY' },
    Z: { keyCode: 90, key: 'Z', code: 'KeyZ' },
    ':': { keyCode: 186, key: ':', code: 'Semicolon' },
    '<': { keyCode: 188, key: '<', code: 'Comma' },
    _: { keyCode: 189, key: '_', code: 'Minus' },
    '>': { keyCode: 190, key: '>', code: 'Period' },
    '?': { keyCode: 191, key: '?', code: 'Slash' },
    '~': { keyCode: 192, key: '~', code: 'Backquote' },
    '{': { keyCode: 219, key: '{', code: 'BracketLeft' },
    '|': { keyCode: 220, key: '|', code: 'Backslash' },
    '}': { keyCode: 221, key: '}', code: 'BracketRight' },
    '"': { keyCode: 222, key: '"', code: 'Quote' },
    SoftLeft: { key: 'SoftLeft', code: 'SoftLeft', location: 4 },
    SoftRight: { key: 'SoftRight', code: 'SoftRight', location: 4 },
    Camera: { keyCode: 44, key: 'Camera', code: 'Camera', location: 4 },
    Call: { key: 'Call', code: 'Call', location: 4 },
    EndCall: { keyCode: 95, key: 'EndCall', code: 'EndCall', location: 4 },
    VolumeDown: {
        keyCode: 182,
        key: 'VolumeDown',
        code: 'VolumeDown',
        location: 4,
    },
    VolumeUp: { keyCode: 183, key: 'VolumeUp', code: 'VolumeUp', location: 4 },
};
//# sourceMappingURL=USKeyboardLayout.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Input.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Input_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Input_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Keyboard_instances, _Keyboard_client, _Keyboard_pressedKeys, _Keyboard_modifierBit, _Keyboard_keyDescriptionForString, _Mouse_client, _Mouse_keyboard, _Mouse_x, _Mouse_y, _Mouse_button, _Touchscreen_client, _Touchscreen_keyboard;


/**
 * Keyboard provides an api for managing a virtual keyboard.
 * The high level api is {@link Keyboard."type"},
 * which takes raw characters and generates proper keydown, keypress/input,
 * and keyup events on your page.
 *
 * @remarks
 * For finer control, you can use {@link Keyboard.down},
 * {@link Keyboard.up}, and {@link Keyboard.sendCharacter}
 * to manually fire events as if they were generated from a real keyboard.
 *
 * On MacOS, keyboard shortcuts like `⌘ A` -\> Select All do not work.
 * See {@link https://github.com/puppeteer/puppeteer/issues/1313 | #1313}.
 *
 * @example
 * An example of holding down `Shift` in order to select and delete some text:
 * ```js
 * await page.keyboard.type('Hello World!');
 * await page.keyboard.press('ArrowLeft');
 *
 * await page.keyboard.down('Shift');
 * for (let i = 0; i < ' World'.length; i++)
 *   await page.keyboard.press('ArrowLeft');
 * await page.keyboard.up('Shift');
 *
 * await page.keyboard.press('Backspace');
 * // Result text will end up saying 'Hello!'
 * ```
 *
 * @example
 * An example of pressing `A`
 * ```js
 * await page.keyboard.down('Shift');
 * await page.keyboard.press('KeyA');
 * await page.keyboard.up('Shift');
 * ```
 *
 * @public
 */
class Keyboard {
    /**
     * @internal
     */
    constructor(client) {
        _Keyboard_instances.add(this);
        _Keyboard_client.set(this, void 0);
        _Keyboard_pressedKeys.set(this, new Set());
        /**
         * @internal
         */
        this._modifiers = 0;
        Input_classPrivateFieldSet(this, _Keyboard_client, client, "f");
    }
    /**
     * Dispatches a `keydown` event.
     *
     * @remarks
     * If `key` is a single character and no modifier keys besides `Shift`
     * are being held down, a `keypress`/`input` event will also generated.
     * The `text` option can be specified to force an input event to be generated.
     * If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`,
     * subsequent key presses will be sent with that modifier active.
     * To release the modifier key, use {@link Keyboard.up}.
     *
     * After the key is pressed once, subsequent calls to
     * {@link Keyboard.down} will have
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat | repeat}
     * set to true. To release the key, use {@link Keyboard.up}.
     *
     * Modifier keys DO influence {@link Keyboard.down}.
     * Holding down `Shift` will type the text in upper case.
     *
     * @param key - Name of key to press, such as `ArrowLeft`.
     * See {@link KeyInput} for a list of all key names.
     *
     * @param options - An object of options. Accepts text which, if specified,
     * generates an input event with this text.
     */
    async down(key, options = { text: undefined }) {
        const description = Input_classPrivateFieldGet(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
        const autoRepeat = Input_classPrivateFieldGet(this, _Keyboard_pressedKeys, "f").has(description.code);
        Input_classPrivateFieldGet(this, _Keyboard_pressedKeys, "f").add(description.code);
        this._modifiers |= Input_classPrivateFieldGet(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
        const text = options.text === undefined ? description.text : options.text;
        await Input_classPrivateFieldGet(this, _Keyboard_client, "f").send('Input.dispatchKeyEvent', {
            type: text ? 'keyDown' : 'rawKeyDown',
            modifiers: this._modifiers,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            key: description.key,
            text: text,
            unmodifiedText: text,
            autoRepeat,
            location: description.location,
            isKeypad: description.location === 3,
        });
    }
    /**
     * Dispatches a `keyup` event.
     *
     * @param key - Name of key to release, such as `ArrowLeft`.
     * See {@link KeyInput | KeyInput}
     * for a list of all key names.
     */
    async up(key) {
        const description = Input_classPrivateFieldGet(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
        this._modifiers &= ~Input_classPrivateFieldGet(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
        Input_classPrivateFieldGet(this, _Keyboard_pressedKeys, "f").delete(description.code);
        await Input_classPrivateFieldGet(this, _Keyboard_client, "f").send('Input.dispatchKeyEvent', {
            type: 'keyUp',
            modifiers: this._modifiers,
            key: description.key,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            location: description.location,
        });
    }
    /**
     * Dispatches a `keypress` and `input` event.
     * This does not send a `keydown` or `keyup` event.
     *
     * @remarks
     * Modifier keys DO NOT effect {@link Keyboard.sendCharacter | Keyboard.sendCharacter}.
     * Holding down `Shift` will not type the text in upper case.
     *
     * @example
     * ```js
     * page.keyboard.sendCharacter('嗨');
     * ```
     *
     * @param char - Character to send into the page.
     */
    async sendCharacter(char) {
        await Input_classPrivateFieldGet(this, _Keyboard_client, "f").send('Input.insertText', { text: char });
    }
    charIsKey(char) {
        return !!_keyDefinitions[char];
    }
    /**
     * Sends a `keydown`, `keypress`/`input`,
     * and `keyup` event for each character in the text.
     *
     * @remarks
     * To press a special key, like `Control` or `ArrowDown`,
     * use {@link Keyboard.press}.
     *
     * Modifier keys DO NOT effect `keyboard.type`.
     * Holding down `Shift` will not type the text in upper case.
     *
     * @example
     * ```js
     * await page.keyboard.type('Hello'); // Types instantly
     * await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
     * ```
     *
     * @param text - A text to type into a focused element.
     * @param options - An object of options. Accepts delay which,
     * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
     * Defaults to 0.
     */
    async type(text, options = {}) {
        const delay = options.delay || undefined;
        for (const char of text) {
            if (this.charIsKey(char)) {
                await this.press(char, { delay });
            }
            else {
                if (delay) {
                    await new Promise((f) => {
                        return setTimeout(f, delay);
                    });
                }
                await this.sendCharacter(char);
            }
        }
    }
    /**
     * Shortcut for {@link Keyboard.down}
     * and {@link Keyboard.up}.
     *
     * @remarks
     * If `key` is a single character and no modifier keys besides `Shift`
     * are being held down, a `keypress`/`input` event will also generated.
     * The `text` option can be specified to force an input event to be generated.
     *
     * Modifier keys DO effect {@link Keyboard.press}.
     * Holding down `Shift` will type the text in upper case.
     *
     * @param key - Name of key to press, such as `ArrowLeft`.
     * See {@link KeyInput} for a list of all key names.
     *
     * @param options - An object of options. Accepts text which, if specified,
     * generates an input event with this text. Accepts delay which,
     * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
     * Defaults to 0.
     */
    async press(key, options = {}) {
        const { delay = null } = options;
        await this.down(key, options);
        if (delay) {
            await new Promise((f) => {
                return setTimeout(f, options.delay);
            });
        }
        await this.up(key);
    }
}
_Keyboard_client = new WeakMap(), _Keyboard_pressedKeys = new WeakMap(), _Keyboard_instances = new WeakSet(), _Keyboard_modifierBit = function _Keyboard_modifierBit(key) {
    if (key === 'Alt') {
        return 1;
    }
    if (key === 'Control') {
        return 2;
    }
    if (key === 'Meta') {
        return 4;
    }
    if (key === 'Shift') {
        return 8;
    }
    return 0;
}, _Keyboard_keyDescriptionForString = function _Keyboard_keyDescriptionForString(keyString) {
    const shift = this._modifiers & 8;
    const description = {
        key: '',
        keyCode: 0,
        code: '',
        text: '',
        location: 0,
    };
    const definition = _keyDefinitions[keyString];
    assert(definition, `Unknown key: "${keyString}"`);
    if (definition.key) {
        description.key = definition.key;
    }
    if (shift && definition.shiftKey) {
        description.key = definition.shiftKey;
    }
    if (definition.keyCode) {
        description.keyCode = definition.keyCode;
    }
    if (shift && definition.shiftKeyCode) {
        description.keyCode = definition.shiftKeyCode;
    }
    if (definition.code) {
        description.code = definition.code;
    }
    if (definition.location) {
        description.location = definition.location;
    }
    if (description.key.length === 1) {
        description.text = description.key;
    }
    if (definition.text) {
        description.text = definition.text;
    }
    if (shift && definition.shiftText) {
        description.text = definition.shiftText;
    }
    // if any modifiers besides shift are pressed, no text should be sent
    if (this._modifiers & ~8) {
        description.text = '';
    }
    return description;
};
/**
 * The Mouse class operates in main-frame CSS pixels
 * relative to the top-left corner of the viewport.
 * @remarks
 * Every `page` object has its own Mouse, accessible with [`page.mouse`](#pagemouse).
 *
 * @example
 * ```js
 * // Using ‘page.mouse’ to trace a 100x100 square.
 * await page.mouse.move(0, 0);
 * await page.mouse.down();
 * await page.mouse.move(0, 100);
 * await page.mouse.move(100, 100);
 * await page.mouse.move(100, 0);
 * await page.mouse.move(0, 0);
 * await page.mouse.up();
 * ```
 *
 * **Note**: The mouse events trigger synthetic `MouseEvent`s.
 * This means that it does not fully replicate the functionality of what a normal user
 * would be able to do with their mouse.
 *
 * For example, dragging and selecting text is not possible using `page.mouse`.
 * Instead, you can use the {@link https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/getSelection | `DocumentOrShadowRoot.getSelection()`} functionality implemented in the platform.
 *
 * @example
 * For example, if you want to select all content between nodes:
 * ```js
 * await page.evaluate((from, to) => {
 *   const selection = from.getRootNode().getSelection();
 *   const range = document.createRange();
 *   range.setStartBefore(from);
 *   range.setEndAfter(to);
 *   selection.removeAllRanges();
 *   selection.addRange(range);
 * }, fromJSHandle, toJSHandle);
 * ```
 * If you then would want to copy-paste your selection, you can use the clipboard api:
 * ```js
 * // The clipboard api does not allow you to copy, unless the tab is focused.
 * await page.bringToFront();
 * await page.evaluate(() => {
 *   // Copy the selected content to the clipboard
 *   document.execCommand('copy');
 *   // Obtain the content of the clipboard as a string
 *   return navigator.clipboard.readText();
 * });
 * ```
 * **Note**: If you want access to the clipboard API,
 * you have to give it permission to do so:
 * ```js
 * await browser.defaultBrowserContext().overridePermissions(
 *   '<your origin>', ['clipboard-read', 'clipboard-write']
 * );
 * ```
 * @public
 */
class Mouse {
    /**
     * @internal
     */
    constructor(client, keyboard) {
        _Mouse_client.set(this, void 0);
        _Mouse_keyboard.set(this, void 0);
        _Mouse_x.set(this, 0);
        _Mouse_y.set(this, 0);
        _Mouse_button.set(this, 'none');
        Input_classPrivateFieldSet(this, _Mouse_client, client, "f");
        Input_classPrivateFieldSet(this, _Mouse_keyboard, keyboard, "f");
    }
    /**
     * Dispatches a `mousemove` event.
     * @param x - Horizontal position of the mouse.
     * @param y - Vertical position of the mouse.
     * @param options - Optional object. If specified, the `steps` property
     * sends intermediate `mousemove` events when set to `1` (default).
     */
    async move(x, y, options = {}) {
        const { steps = 1 } = options;
        const fromX = Input_classPrivateFieldGet(this, _Mouse_x, "f"), fromY = Input_classPrivateFieldGet(this, _Mouse_y, "f");
        Input_classPrivateFieldSet(this, _Mouse_x, x, "f");
        Input_classPrivateFieldSet(this, _Mouse_y, y, "f");
        for (let i = 1; i <= steps; i++) {
            await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchMouseEvent', {
                type: 'mouseMoved',
                button: Input_classPrivateFieldGet(this, _Mouse_button, "f"),
                x: fromX + (Input_classPrivateFieldGet(this, _Mouse_x, "f") - fromX) * (i / steps),
                y: fromY + (Input_classPrivateFieldGet(this, _Mouse_y, "f") - fromY) * (i / steps),
                modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            });
        }
    }
    /**
     * Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.
     * @param x - Horizontal position of the mouse.
     * @param y - Vertical position of the mouse.
     * @param options - Optional `MouseOptions`.
     */
    async click(x, y, options = {}) {
        const { delay = null } = options;
        if (delay !== null) {
            await this.move(x, y);
            await this.down(options);
            await new Promise((f) => {
                return setTimeout(f, delay);
            });
            await this.up(options);
        }
        else {
            await this.move(x, y);
            await this.down(options);
            await this.up(options);
        }
    }
    /**
     * Dispatches a `mousedown` event.
     * @param options - Optional `MouseOptions`.
     */
    async down(options = {}) {
        const { button = 'left', clickCount = 1 } = options;
        Input_classPrivateFieldSet(this, _Mouse_button, button, "f");
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchMouseEvent', {
            type: 'mousePressed',
            button,
            x: Input_classPrivateFieldGet(this, _Mouse_x, "f"),
            y: Input_classPrivateFieldGet(this, _Mouse_y, "f"),
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            clickCount,
        });
    }
    /**
     * Dispatches a `mouseup` event.
     * @param options - Optional `MouseOptions`.
     */
    async up(options = {}) {
        const { button = 'left', clickCount = 1 } = options;
        Input_classPrivateFieldSet(this, _Mouse_button, 'none', "f");
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            button,
            x: Input_classPrivateFieldGet(this, _Mouse_x, "f"),
            y: Input_classPrivateFieldGet(this, _Mouse_y, "f"),
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            clickCount,
        });
    }
    /**
     * Dispatches a `mousewheel` event.
     * @param options - Optional: `MouseWheelOptions`.
     *
     * @example
     * An example of zooming into an element:
     * ```js
     * await page.goto('https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366');
     *
     * const elem = await page.$('div');
     * const boundingBox = await elem.boundingBox();
     * await page.mouse.move(
     *   boundingBox.x + boundingBox.width / 2,
     *   boundingBox.y + boundingBox.height / 2
     * );
     *
     * await page.mouse.wheel({ deltaY: -100 })
     * ```
     */
    async wheel(options = {}) {
        const { deltaX = 0, deltaY = 0 } = options;
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchMouseEvent', {
            type: 'mouseWheel',
            x: Input_classPrivateFieldGet(this, _Mouse_x, "f"),
            y: Input_classPrivateFieldGet(this, _Mouse_y, "f"),
            deltaX,
            deltaY,
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            pointerType: 'mouse',
        });
    }
    /**
     * Dispatches a `drag` event.
     * @param start - starting point for drag
     * @param target - point to drag to
     */
    async drag(start, target) {
        const promise = new Promise((resolve) => {
            Input_classPrivateFieldGet(this, _Mouse_client, "f").once('Input.dragIntercepted', (event) => {
                return resolve(event.data);
            });
        });
        await this.move(start.x, start.y);
        await this.down();
        await this.move(target.x, target.y);
        return promise;
    }
    /**
     * Dispatches a `dragenter` event.
     * @param target - point for emitting `dragenter` event
     * @param data - drag data containing items and operations mask
     */
    async dragEnter(target, data) {
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchDragEvent', {
            type: 'dragEnter',
            x: target.x,
            y: target.y,
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            data,
        });
    }
    /**
     * Dispatches a `dragover` event.
     * @param target - point for emitting `dragover` event
     * @param data - drag data containing items and operations mask
     */
    async dragOver(target, data) {
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchDragEvent', {
            type: 'dragOver',
            x: target.x,
            y: target.y,
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            data,
        });
    }
    /**
     * Performs a dragenter, dragover, and drop in sequence.
     * @param target - point to drop on
     * @param data - drag data containing items and operations mask
     */
    async drop(target, data) {
        await Input_classPrivateFieldGet(this, _Mouse_client, "f").send('Input.dispatchDragEvent', {
            type: 'drop',
            x: target.x,
            y: target.y,
            modifiers: Input_classPrivateFieldGet(this, _Mouse_keyboard, "f")._modifiers,
            data,
        });
    }
    /**
     * Performs a drag, dragenter, dragover, and drop in sequence.
     * @param target - point to drag from
     * @param target - point to drop on
     * @param options - An object of options. Accepts delay which,
     * if specified, is the time to wait between `dragover` and `drop` in milliseconds.
     * Defaults to 0.
     */
    async dragAndDrop(start, target, options = {}) {
        const { delay = null } = options;
        const data = await this.drag(start, target);
        await this.dragEnter(target, data);
        await this.dragOver(target, data);
        if (delay) {
            await new Promise((resolve) => {
                return setTimeout(resolve, delay);
            });
        }
        await this.drop(target, data);
        await this.up();
    }
}
_Mouse_client = new WeakMap(), _Mouse_keyboard = new WeakMap(), _Mouse_x = new WeakMap(), _Mouse_y = new WeakMap(), _Mouse_button = new WeakMap();
/**
 * The Touchscreen class exposes touchscreen events.
 * @public
 */
class Touchscreen {
    /**
     * @internal
     */
    constructor(client, keyboard) {
        _Touchscreen_client.set(this, void 0);
        _Touchscreen_keyboard.set(this, void 0);
        Input_classPrivateFieldSet(this, _Touchscreen_client, client, "f");
        Input_classPrivateFieldSet(this, _Touchscreen_keyboard, keyboard, "f");
    }
    /**
     * Dispatches a `touchstart` and `touchend` event.
     * @param x - Horizontal position of the tap.
     * @param y - Vertical position of the tap.
     */
    async tap(x, y) {
        const touchPoints = [{ x: Math.round(x), y: Math.round(y) }];
        await Input_classPrivateFieldGet(this, _Touchscreen_client, "f").send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints,
            modifiers: Input_classPrivateFieldGet(this, _Touchscreen_keyboard, "f")._modifiers,
        });
        await Input_classPrivateFieldGet(this, _Touchscreen_client, "f").send('Input.dispatchTouchEvent', {
            type: 'touchEnd',
            touchPoints: [],
            modifiers: Input_classPrivateFieldGet(this, _Touchscreen_keyboard, "f")._modifiers,
        });
    }
}
_Touchscreen_client = new WeakMap(), _Touchscreen_keyboard = new WeakMap();
//# sourceMappingURL=Input.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/PDFOptions.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _paperFormats = {
    letter: { width: 8.5, height: 11 },
    legal: { width: 8.5, height: 14 },
    tabloid: { width: 11, height: 17 },
    ledger: { width: 17, height: 11 },
    a0: { width: 33.1, height: 46.8 },
    a1: { width: 23.4, height: 33.1 },
    a2: { width: 16.54, height: 23.4 },
    a3: { width: 11.7, height: 16.54 },
    a4: { width: 8.27, height: 11.7 },
    a5: { width: 5.83, height: 8.27 },
    a6: { width: 4.13, height: 5.83 },
};
//# sourceMappingURL=PDFOptions.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/TimeoutSettings.js
/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TimeoutSettings_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var TimeoutSettings_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimeoutSettings_defaultTimeout, _TimeoutSettings_defaultNavigationTimeout;
const DEFAULT_TIMEOUT = 30000;
/**
 * @internal
 */
class TimeoutSettings {
    constructor() {
        _TimeoutSettings_defaultTimeout.set(this, void 0);
        _TimeoutSettings_defaultNavigationTimeout.set(this, void 0);
        TimeoutSettings_classPrivateFieldSet(this, _TimeoutSettings_defaultTimeout, null, "f");
        TimeoutSettings_classPrivateFieldSet(this, _TimeoutSettings_defaultNavigationTimeout, null, "f");
    }
    setDefaultTimeout(timeout) {
        TimeoutSettings_classPrivateFieldSet(this, _TimeoutSettings_defaultTimeout, timeout, "f");
    }
    setDefaultNavigationTimeout(timeout) {
        TimeoutSettings_classPrivateFieldSet(this, _TimeoutSettings_defaultNavigationTimeout, timeout, "f");
    }
    navigationTimeout() {
        if (TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultNavigationTimeout, "f") !== null) {
            return TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultNavigationTimeout, "f");
        }
        if (TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
            return TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultTimeout, "f");
        }
        return DEFAULT_TIMEOUT;
    }
    timeout() {
        if (TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
            return TimeoutSettings_classPrivateFieldGet(this, _TimeoutSettings_defaultTimeout, "f");
        }
        return DEFAULT_TIMEOUT;
    }
}
_TimeoutSettings_defaultTimeout = new WeakMap(), _TimeoutSettings_defaultNavigationTimeout = new WeakMap();
//# sourceMappingURL=TimeoutSettings.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Tracing.js
var Tracing_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Tracing_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tracing_client, _Tracing_recording, _Tracing_path;
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The Tracing class exposes the tracing audit interface.
 * @remarks
 * You can use `tracing.start` and `tracing.stop` to create a trace file
 * which can be opened in Chrome DevTools or {@link https://chromedevtools.github.io/timeline-viewer/ | timeline viewer}.
 *
 * @example
 * ```js
 * await page.tracing.start({path: 'trace.json'});
 * await page.goto('https://www.google.com');
 * await page.tracing.stop();
 * ```
 *
 * @public
 */
class Tracing {
    /**
     * @internal
     */
    constructor(client) {
        _Tracing_client.set(this, void 0);
        _Tracing_recording.set(this, false);
        _Tracing_path.set(this, void 0);
        Tracing_classPrivateFieldSet(this, _Tracing_client, client, "f");
    }
    /**
     * Starts a trace for the current page.
     * @remarks
     * Only one trace can be active at a time per browser.
     *
     * @param options - Optional `TracingOptions`.
     */
    async start(options = {}) {
        assert(!Tracing_classPrivateFieldGet(this, _Tracing_recording, "f"), 'Cannot start recording trace while already recording trace.');
        const defaultCategories = [
            '-*',
            'devtools.timeline',
            'v8.execute',
            'disabled-by-default-devtools.timeline',
            'disabled-by-default-devtools.timeline.frame',
            'toplevel',
            'blink.console',
            'blink.user_timing',
            'latencyInfo',
            'disabled-by-default-devtools.timeline.stack',
            'disabled-by-default-v8.cpu_profiler',
        ];
        const { path, screenshots = false, categories = defaultCategories, } = options;
        if (screenshots) {
            categories.push('disabled-by-default-devtools.screenshot');
        }
        const excludedCategories = categories
            .filter((cat) => {
            return cat.startsWith('-');
        })
            .map((cat) => {
            return cat.slice(1);
        });
        const includedCategories = categories.filter((cat) => {
            return !cat.startsWith('-');
        });
        Tracing_classPrivateFieldSet(this, _Tracing_path, path, "f");
        Tracing_classPrivateFieldSet(this, _Tracing_recording, true, "f");
        await Tracing_classPrivateFieldGet(this, _Tracing_client, "f").send('Tracing.start', {
            transferMode: 'ReturnAsStream',
            traceConfig: {
                excludedCategories,
                includedCategories,
            },
        });
    }
    /**
     * Stops a trace started with the `start` method.
     * @returns Promise which resolves to buffer with trace data.
     */
    async stop() {
        let resolve;
        let reject;
        const contentPromise = new Promise((x, y) => {
            resolve = x;
            reject = y;
        });
        Tracing_classPrivateFieldGet(this, _Tracing_client, "f").once('Tracing.tracingComplete', async (event) => {
            try {
                const readable = await getReadableFromProtocolStream(Tracing_classPrivateFieldGet(this, _Tracing_client, "f"), event.stream);
                const buffer = await getReadableAsBuffer(readable, Tracing_classPrivateFieldGet(this, _Tracing_path, "f"));
                resolve(buffer !== null && buffer !== void 0 ? buffer : undefined);
            }
            catch (error) {
                if (isErrorLike(error)) {
                    reject(error);
                }
                else {
                    reject(new Error(`Unknown error: ${error}`));
                }
            }
        });
        await Tracing_classPrivateFieldGet(this, _Tracing_client, "f").send('Tracing.end');
        Tracing_classPrivateFieldSet(this, _Tracing_recording, false, "f");
        return contentPromise;
    }
}
_Tracing_client = new WeakMap(), _Tracing_recording = new WeakMap(), _Tracing_path = new WeakMap();
//# sourceMappingURL=Tracing.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/WebWorker.js
var WebWorker_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var WebWorker_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WebWorker_client, _WebWorker_url, _WebWorker_executionContextPromise, _WebWorker_executionContextCallback;




/**
 * The WebWorker class represents a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API | WebWorker}.
 *
 * @remarks
 * The events `workercreated` and `workerdestroyed` are emitted on the page
 * object to signal the worker lifecycle.
 *
 * @example
 * ```js
 * page.on('workercreated', worker => console.log('Worker created: ' + worker.url()));
 * page.on('workerdestroyed', worker => console.log('Worker destroyed: ' + worker.url()));
 *
 * console.log('Current workers:');
 * for (const worker of page.workers()) {
 *   console.log('  ' + worker.url());
 * }
 * ```
 *
 * @public
 */
class WebWorker extends EventEmitter {
    /**
     *
     * @internal
     */
    constructor(client, url, consoleAPICalled, exceptionThrown) {
        super();
        _WebWorker_client.set(this, void 0);
        _WebWorker_url.set(this, void 0);
        _WebWorker_executionContextPromise.set(this, void 0);
        _WebWorker_executionContextCallback.set(this, void 0);
        WebWorker_classPrivateFieldSet(this, _WebWorker_client, client, "f");
        WebWorker_classPrivateFieldSet(this, _WebWorker_url, url, "f");
        WebWorker_classPrivateFieldSet(this, _WebWorker_executionContextPromise, new Promise((x) => {
            return (WebWorker_classPrivateFieldSet(this, _WebWorker_executionContextCallback, x, "f"));
        }), "f");
        let jsHandleFactory;
        WebWorker_classPrivateFieldGet(this, _WebWorker_client, "f").once('Runtime.executionContextCreated', async (event) => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            jsHandleFactory = (remoteObject) => {
                return new JSHandle(executionContext, client, remoteObject);
            };
            const executionContext = new ExecutionContext(client, event.context);
            WebWorker_classPrivateFieldGet(this, _WebWorker_executionContextCallback, "f").call(this, executionContext);
        });
        // This might fail if the target is closed before we receive all execution contexts.
        WebWorker_classPrivateFieldGet(this, _WebWorker_client, "f").send('Runtime.enable').catch(debugError);
        WebWorker_classPrivateFieldGet(this, _WebWorker_client, "f").on('Runtime.consoleAPICalled', (event) => {
            return consoleAPICalled(event.type, event.args.map(jsHandleFactory), event.stackTrace);
        });
        WebWorker_classPrivateFieldGet(this, _WebWorker_client, "f").on('Runtime.exceptionThrown', (exception) => {
            return exceptionThrown(exception.exceptionDetails);
        });
    }
    /**
     * @returns The URL of this web worker.
     */
    url() {
        return WebWorker_classPrivateFieldGet(this, _WebWorker_url, "f");
    }
    /**
     * Returns the ExecutionContext the WebWorker runs in
     * @returns The ExecutionContext the web worker runs in.
     */
    async executionContext() {
        return WebWorker_classPrivateFieldGet(this, _WebWorker_executionContextPromise, "f");
    }
    /**
     * If the function passed to the `worker.evaluate` returns a Promise, then
     * `worker.evaluate` would wait for the promise to resolve and return its
     * value. If the function passed to the `worker.evaluate` returns a
     * non-serializable value, then `worker.evaluate` resolves to `undefined`.
     * DevTools Protocol also supports transferring some additional values that
     * are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and
     * bigint literals.
     * Shortcut for `await worker.executionContext()).evaluate(pageFunction, ...args)`.
     *
     * @param pageFunction - Function to be evaluated in the worker context.
     * @param args - Arguments to pass to `pageFunction`.
     * @returns Promise which resolves to the return value of `pageFunction`.
     */
    async evaluate(pageFunction, ...args) {
        return (await WebWorker_classPrivateFieldGet(this, _WebWorker_executionContextPromise, "f")).evaluate(pageFunction, ...args);
    }
    /**
     * The only difference between `worker.evaluate` and `worker.evaluateHandle`
     * is that `worker.evaluateHandle` returns in-page object (JSHandle). If the
     * function passed to the `worker.evaluateHandle` returns a `Promise`, then
     * `worker.evaluateHandle` would wait for the promise to resolve and return
     * its value. Shortcut for
     * `await worker.executionContext()).evaluateHandle(pageFunction, ...args)`
     *
     * @param pageFunction - Function to be evaluated in the page context.
     * @param args - Arguments to pass to `pageFunction`.
     * @returns Promise which resolves to the return value of `pageFunction`.
     */
    async evaluateHandle(pageFunction, ...args) {
        return (await WebWorker_classPrivateFieldGet(this, _WebWorker_executionContextPromise, "f")).evaluateHandle(pageFunction, ...args);
    }
}
_WebWorker_client = new WeakMap(), _WebWorker_url = new WeakMap(), _WebWorker_executionContextPromise = new WeakMap(), _WebWorker_executionContextCallback = new WeakMap();
//# sourceMappingURL=WebWorker.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Page.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Page_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Page_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_instances, _Page_closed, _Page_client, _Page_target, _Page_keyboard, _Page_mouse, _Page_timeoutSettings, _Page_touchscreen, _Page_accessibility, _Page_frameManager, _Page_emulationManager, _Page_tracing, _Page_pageBindings, _Page_coverage, _Page_javascriptEnabled, _Page_viewport, _Page_screenshotTaskQueue, _Page_workers, _Page_fileChooserInterceptors, _Page_disconnectPromise, _Page_userDragInterceptionEnabled, _Page_handlerMap, _Page_initialize, _Page_onFileChooser, _Page_onTargetCrashed, _Page_onLogEntryAdded, _Page_emitMetrics, _Page_buildMetricsObject, _Page_handleException, _Page_onConsoleAPI, _Page_onBindingCalled, _Page_addConsoleMessage, _Page_onDialog, _Page_resetDefaultBackgroundColor, _Page_setTransparentBackgroundColor, _Page_sessionClosePromise, _Page_go, _Page_screenshotTask;


















/**
 * Page provides methods to interact with a single tab or
 * {@link https://developer.chrome.com/extensions/background_pages | extension background page} in Chromium.
 *
 * @remarks
 *
 * One Browser instance might have multiple Page instances.
 *
 * @example
 * This example creates a page, navigates it to a URL, and then * saves a screenshot:
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://example.com');
 *   await page.screenshot({path: 'screenshot.png'});
 *   await browser.close();
 * })();
 * ```
 *
 * The Page class extends from Puppeteer's {@link EventEmitter} class and will
 * emit various events which are documented in the {@link PageEmittedEvents} enum.
 *
 * @example
 * This example logs a message for a single page `load` event:
 * ```js
 * page.once('load', () => console.log('Page loaded!'));
 * ```
 *
 * To unsubscribe from events use the `off` method:
 *
 * ```js
 * function logRequest(interceptedRequest) {
 *   console.log('A request was made:', interceptedRequest.url());
 * }
 * page.on('request', logRequest);
 * // Sometime later...
 * page.off('request', logRequest);
 * ```
 * @public
 */
class Page extends EventEmitter {
    /**
     * @internal
     */
    constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
        super();
        _Page_instances.add(this);
        _Page_closed.set(this, false);
        _Page_client.set(this, void 0);
        _Page_target.set(this, void 0);
        _Page_keyboard.set(this, void 0);
        _Page_mouse.set(this, void 0);
        _Page_timeoutSettings.set(this, new TimeoutSettings());
        _Page_touchscreen.set(this, void 0);
        _Page_accessibility.set(this, void 0);
        _Page_frameManager.set(this, void 0);
        _Page_emulationManager.set(this, void 0);
        _Page_tracing.set(this, void 0);
        _Page_pageBindings.set(this, new Map());
        _Page_coverage.set(this, void 0);
        _Page_javascriptEnabled.set(this, true);
        _Page_viewport.set(this, void 0);
        _Page_screenshotTaskQueue.set(this, void 0);
        _Page_workers.set(this, new Map());
        // TODO: improve this typedef - it's a function that takes a file chooser or
        // something?
        _Page_fileChooserInterceptors.set(this, new Set());
        _Page_disconnectPromise.set(this, void 0);
        _Page_userDragInterceptionEnabled.set(this, false);
        _Page_handlerMap.set(this, new WeakMap());
        Page_classPrivateFieldSet(this, _Page_client, client, "f");
        Page_classPrivateFieldSet(this, _Page_target, target, "f");
        Page_classPrivateFieldSet(this, _Page_keyboard, new Keyboard(client), "f");
        Page_classPrivateFieldSet(this, _Page_mouse, new Mouse(client, Page_classPrivateFieldGet(this, _Page_keyboard, "f")), "f");
        Page_classPrivateFieldSet(this, _Page_touchscreen, new Touchscreen(client, Page_classPrivateFieldGet(this, _Page_keyboard, "f")), "f");
        Page_classPrivateFieldSet(this, _Page_accessibility, new Accessibility(client), "f");
        Page_classPrivateFieldSet(this, _Page_frameManager, new FrameManager(client, this, ignoreHTTPSErrors, Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f")), "f");
        Page_classPrivateFieldSet(this, _Page_emulationManager, new EmulationManager(client), "f");
        Page_classPrivateFieldSet(this, _Page_tracing, new Tracing(client), "f");
        Page_classPrivateFieldSet(this, _Page_coverage, new Coverage(client), "f");
        Page_classPrivateFieldSet(this, _Page_screenshotTaskQueue, screenshotTaskQueue, "f");
        Page_classPrivateFieldSet(this, _Page_viewport, null, "f");
        client.on('Target.attachedToTarget', (event) => {
            switch (event.targetInfo.type) {
                case 'worker':
                    const connection = Connection.fromSession(client);
                    assert(connection);
                    const session = connection.session(event.sessionId);
                    assert(session);
                    const worker = new WebWorker(session, event.targetInfo.url, Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_addConsoleMessage).bind(this), Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_handleException).bind(this));
                    Page_classPrivateFieldGet(this, _Page_workers, "f").set(event.sessionId, worker);
                    this.emit("workercreated" /* PageEmittedEvents.WorkerCreated */, worker);
                    break;
                case 'iframe':
                    break;
                default:
                    // If we don't detach from service workers, they will never die.
                    // We still want to attach to workers for emitting events.
                    // We still want to attach to iframes so sessions may interact with them.
                    // We detach from all other types out of an abundance of caution.
                    // See https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/devtools_agent_host_impl.cc?ss=chromium&q=f:devtools%20-f:out%20%22::kTypePage%5B%5D%22
                    // for the complete list of available types.
                    client
                        .send('Target.detachFromTarget', {
                        sessionId: event.sessionId,
                    })
                        .catch(debugError);
            }
        });
        client.on('Target.detachedFromTarget', (event) => {
            const worker = Page_classPrivateFieldGet(this, _Page_workers, "f").get(event.sessionId);
            if (!worker) {
                return;
            }
            Page_classPrivateFieldGet(this, _Page_workers, "f").delete(event.sessionId);
            this.emit("workerdestroyed" /* PageEmittedEvents.WorkerDestroyed */, worker);
        });
        Page_classPrivateFieldGet(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameAttached, (event) => {
            return this.emit("frameattached" /* PageEmittedEvents.FrameAttached */, event);
        });
        Page_classPrivateFieldGet(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameDetached, (event) => {
            return this.emit("framedetached" /* PageEmittedEvents.FrameDetached */, event);
        });
        Page_classPrivateFieldGet(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameNavigated, (event) => {
            return this.emit("framenavigated" /* PageEmittedEvents.FrameNavigated */, event);
        });
        const networkManager = Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager();
        networkManager.on(NetworkManagerEmittedEvents.Request, (event) => {
            return this.emit("request" /* PageEmittedEvents.Request */, event);
        });
        networkManager.on(NetworkManagerEmittedEvents.RequestServedFromCache, (event) => {
            return this.emit("requestservedfromcache" /* PageEmittedEvents.RequestServedFromCache */, event);
        });
        networkManager.on(NetworkManagerEmittedEvents.Response, (event) => {
            return this.emit("response" /* PageEmittedEvents.Response */, event);
        });
        networkManager.on(NetworkManagerEmittedEvents.RequestFailed, (event) => {
            return this.emit("requestfailed" /* PageEmittedEvents.RequestFailed */, event);
        });
        networkManager.on(NetworkManagerEmittedEvents.RequestFinished, (event) => {
            return this.emit("requestfinished" /* PageEmittedEvents.RequestFinished */, event);
        });
        Page_classPrivateFieldSet(this, _Page_fileChooserInterceptors, new Set(), "f");
        client.on('Page.domContentEventFired', () => {
            return this.emit("domcontentloaded" /* PageEmittedEvents.DOMContentLoaded */);
        });
        client.on('Page.loadEventFired', () => {
            return this.emit("load" /* PageEmittedEvents.Load */);
        });
        client.on('Runtime.consoleAPICalled', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onConsoleAPI).call(this, event);
        });
        client.on('Runtime.bindingCalled', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onBindingCalled).call(this, event);
        });
        client.on('Page.javascriptDialogOpening', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onDialog).call(this, event);
        });
        client.on('Runtime.exceptionThrown', (exception) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_handleException).call(this, exception.exceptionDetails);
        });
        client.on('Inspector.targetCrashed', () => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onTargetCrashed).call(this);
        });
        client.on('Performance.metrics', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_emitMetrics).call(this, event);
        });
        client.on('Log.entryAdded', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onLogEntryAdded).call(this, event);
        });
        client.on('Page.fileChooserOpened', (event) => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_onFileChooser).call(this, event);
        });
        Page_classPrivateFieldGet(this, _Page_target, "f")._isClosedPromise.then(() => {
            this.emit("close" /* PageEmittedEvents.Close */);
            Page_classPrivateFieldSet(this, _Page_closed, true, "f");
        });
    }
    /**
     * @internal
     */
    static async _create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        const page = new Page(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
        await Page_classPrivateFieldGet(page, _Page_instances, "m", _Page_initialize).call(page);
        if (defaultViewport) {
            await page.setViewport(defaultViewport);
        }
        return page;
    }
    /**
     * @returns `true` if drag events are being intercepted, `false` otherwise.
     */
    isDragInterceptionEnabled() {
        return Page_classPrivateFieldGet(this, _Page_userDragInterceptionEnabled, "f");
    }
    /**
     * @returns `true` if the page has JavaScript enabled, `false` otherwise.
     */
    isJavaScriptEnabled() {
        return Page_classPrivateFieldGet(this, _Page_javascriptEnabled, "f");
    }
    /**
     * Listen to page events.
     */
    // Note: this method exists to define event typings and handle
    // proper wireup of cooperative request interception. Actual event listening and
    // dispatching is delegated to EventEmitter.
    on(eventName, handler) {
        if (eventName === 'request') {
            const wrap = Page_classPrivateFieldGet(this, _Page_handlerMap, "f").get(handler) ||
                ((event) => {
                    event.enqueueInterceptAction(() => {
                        return handler(event);
                    });
                });
            Page_classPrivateFieldGet(this, _Page_handlerMap, "f").set(handler, wrap);
            return super.on(eventName, wrap);
        }
        return super.on(eventName, handler);
    }
    once(eventName, handler) {
        // Note: this method only exists to define the types; we delegate the impl
        // to EventEmitter.
        return super.once(eventName, handler);
    }
    off(eventName, handler) {
        if (eventName === 'request') {
            handler = Page_classPrivateFieldGet(this, _Page_handlerMap, "f").get(handler) || handler;
        }
        return super.off(eventName, handler);
    }
    /**
     * This method is typically coupled with an action that triggers file
     * choosing. The following example clicks a button that issues a file chooser
     * and then responds with `/tmp/myfile.pdf` as if a user has selected this file.
     *
     * ```js
     * const [fileChooser] = await Promise.all([
     * page.waitForFileChooser(),
     * page.click('#upload-file-button'),
     * // some button that triggers file selection
     * ]);
     * await fileChooser.accept(['/tmp/myfile.pdf']);
     * ```
     *
     * NOTE: This must be called before the file chooser is launched. It will not
     * return a currently active file chooser.
     * @param options - Optional waiting parameters
     * @returns Resolves after a page requests a file picker.
     * @remarks
     * NOTE: In non-headless Chromium, this method results in the native file picker
     * dialog `not showing up` for the user.
     */
    async waitForFileChooser(options = {}) {
        if (!Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f").size) {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.setInterceptFileChooserDialog', {
                enabled: true,
            });
        }
        const { timeout = Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        let callback;
        const promise = new Promise((x) => {
            return (callback = x);
        });
        Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f").add(callback);
        return waitWithTimeout(promise, 'waiting for file chooser', timeout).catch((error) => {
            Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f").delete(callback);
            throw error;
        });
    }
    /**
     * Sets the page's geolocation.
     * @remarks
     * NOTE: Consider using {@link BrowserContext.overridePermissions} to grant
     * permissions for the page to read its geolocation.
     * @example
     * ```js
     * await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
     * ```
     */
    async setGeolocation(options) {
        const { longitude, latitude, accuracy = 0 } = options;
        if (longitude < -180 || longitude > 180) {
            throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
        }
        if (latitude < -90 || latitude > 90) {
            throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
        }
        if (accuracy < 0) {
            throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
        }
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setGeolocationOverride', {
            longitude,
            latitude,
            accuracy,
        });
    }
    /**
     * @returns A target this page was created from.
     */
    target() {
        return Page_classPrivateFieldGet(this, _Page_target, "f");
    }
    /**
     * @internal
     */
    _client() {
        return Page_classPrivateFieldGet(this, _Page_client, "f");
    }
    /**
     * Get the browser the page belongs to.
     */
    browser() {
        return Page_classPrivateFieldGet(this, _Page_target, "f").browser();
    }
    /**
     * Get the browser context that the page belongs to.
     */
    browserContext() {
        return Page_classPrivateFieldGet(this, _Page_target, "f").browserContext();
    }
    /**
     * @returns The page's main frame.
     * @remarks
     * Page is guaranteed to have a main frame which persists during navigations.
     */
    mainFrame() {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame();
    }
    get keyboard() {
        return Page_classPrivateFieldGet(this, _Page_keyboard, "f");
    }
    get touchscreen() {
        return Page_classPrivateFieldGet(this, _Page_touchscreen, "f");
    }
    get coverage() {
        return Page_classPrivateFieldGet(this, _Page_coverage, "f");
    }
    get tracing() {
        return Page_classPrivateFieldGet(this, _Page_tracing, "f");
    }
    get accessibility() {
        return Page_classPrivateFieldGet(this, _Page_accessibility, "f");
    }
    /**
     * @returns An array of all frames attached to the page.
     */
    frames() {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").frames();
    }
    /**
     * @returns all of the dedicated
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
     * WebWorkers}
     * associated with the page.
     * @remarks
     * NOTE: This does not contain ServiceWorkers
     */
    workers() {
        return Array.from(Page_classPrivateFieldGet(this, _Page_workers, "f").values());
    }
    /**
     * @param value - Whether to enable request interception.
     *
     * @remarks
     * Activating request interception enables {@link HTTPRequest.abort},
     * {@link HTTPRequest.continue} and {@link HTTPRequest.respond} methods.  This
     * provides the capability to modify network requests that are made by a page.
     *
     * Once request interception is enabled, every request will stall unless it's
     * continued, responded or aborted; or completed using the browser cache.
     *
     * @example
     * An example of a naïve request interceptor that aborts all image requests:
     * ```js
     * const puppeteer = require('puppeteer');
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   await page.setRequestInterception(true);
     *   page.on('request', interceptedRequest => {
     *     if (interceptedRequest.url().endsWith('.png') ||
     *         interceptedRequest.url().endsWith('.jpg'))
     *       interceptedRequest.abort();
     *     else
     *       interceptedRequest.continue();
     *     });
     *   await page.goto('https://example.com');
     *   await browser.close();
     * })();
     * ```
     * NOTE: Enabling request interception disables page caching.
     */
    async setRequestInterception(value) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager().setRequestInterception(value);
    }
    /**
     * @param enabled - Whether to enable drag interception.
     *
     * @remarks
     * Activating drag interception enables the `Input.drag`,
     * methods  This provides the capability to capture drag events emitted
     * on the page, which can then be used to simulate drag-and-drop.
     */
    async setDragInterception(enabled) {
        Page_classPrivateFieldSet(this, _Page_userDragInterceptionEnabled, enabled, "f");
        return Page_classPrivateFieldGet(this, _Page_client, "f").send('Input.setInterceptDrags', { enabled });
    }
    /**
     * @param enabled - When `true`, enables offline mode for the page.
     * @remarks
     * NOTE: while this method sets the network connection to offline, it does
     * not change the parameters used in [page.emulateNetworkConditions(networkConditions)]
     * (#pageemulatenetworkconditionsnetworkconditions)
     */
    setOfflineMode(enabled) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager().setOfflineMode(enabled);
    }
    /**
     * @param networkConditions - Passing `null` disables network condition emulation.
     * @example
     * ```js
     * const puppeteer = require('puppeteer');
     * const slow3G = puppeteer.networkConditions['Slow 3G'];
     *
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * await page.emulateNetworkConditions(slow3G);
     * await page.goto('https://www.google.com');
     * // other actions...
     * await browser.close();
     * })();
     * ```
     * @remarks
     * NOTE: This does not affect WebSockets and WebRTC PeerConnections (see
     * https://crbug.com/563644). To set the page offline, you can use
     * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled).
     */
    emulateNetworkConditions(networkConditions) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f")
            .networkManager()
            .emulateNetworkConditions(networkConditions);
    }
    /**
     * This setting will change the default maximum navigation time for the
     * following methods and related shortcuts:
     *
     * - {@link Page.goBack | page.goBack(options)}
     *
     * - {@link Page.goForward | page.goForward(options)}
     *
     * - {@link Page.goto | page.goto(url,options)}
     *
     * - {@link Page.reload | page.reload(options)}
     *
     * - {@link Page.setContent | page.setContent(html,options)}
     *
     * - {@link Page.waitForNavigation | page.waitForNavigation(options)}
     * @param timeout - Maximum navigation time in milliseconds.
     */
    setDefaultNavigationTimeout(timeout) {
        Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
    }
    /**
     * @param timeout - Maximum time in milliseconds.
     */
    setDefaultTimeout(timeout) {
        Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultTimeout(timeout);
    }
    /**
     * Runs `document.querySelector` within the page. If no element matches the
     * selector, the return value resolves to `null`.
     *
     * @remarks
     * Shortcut for {@link Frame.$ | Page.mainFrame().$(selector) }.
     *
     * @param selector - A `selector` to query page for
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * to query page for.
     */
    async $(selector) {
        return this.mainFrame().$(selector);
    }
    /**
     * @remarks
     *
     * The only difference between {@link Page.evaluate | page.evaluate} and
     * `page.evaluateHandle` is that `evaluateHandle` will return the value
     * wrapped in an in-page object.
     *
     * If the function passed to `page.evaluteHandle` returns a Promise, the
     * function will wait for the promise to resolve and return its value.
     *
     * You can pass a string instead of a function (although functions are
     * recommended as they are easier to debug and use with TypeScript):
     *
     * @example
     * ```
     * const aHandle = await page.evaluateHandle('document')
     * ```
     *
     * @example
     * {@link JSHandle} instances can be passed as arguments to the `pageFunction`:
     * ```
     * const aHandle = await page.evaluateHandle(() => document.body);
     * const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
     * console.log(await resultHandle.jsonValue());
     * await resultHandle.dispose();
     * ```
     *
     * Most of the time this function returns a {@link JSHandle},
     * but if `pageFunction` returns a reference to an element,
     * you instead get an {@link ElementHandle} back:
     *
     * @example
     * ```
     * const button = await page.evaluateHandle(() => document.querySelector('button'));
     * // can call `click` because `button` is an `ElementHandle`
     * await button.click();
     * ```
     *
     * The TypeScript definitions assume that `evaluateHandle` returns
     *  a `JSHandle`, but if you know it's going to return an
     * `ElementHandle`, pass it as the generic argument:
     *
     * ```
     * const button = await page.evaluateHandle<ElementHandle>(...);
     * ```
     *
     * @param pageFunction - a function that is run within the page
     * @param args - arguments to be passed to the pageFunction
     */
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.mainFrame().executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    /**
     * This method iterates the JavaScript heap and finds all objects with the
     * given prototype.
     *
     * @remarks
     * Shortcut for
     * {@link ExecutionContext.queryObjects |
     * page.mainFrame().executionContext().queryObjects(prototypeHandle)}.
     *
     * @example
     *
     * ```js
     * // Create a Map object
     * await page.evaluate(() => window.map = new Map());
     * // Get a handle to the Map object prototype
     * const mapPrototype = await page.evaluateHandle(() => Map.prototype);
     * // Query all map instances into an array
     * const mapInstances = await page.queryObjects(mapPrototype);
     * // Count amount of map objects in heap
     * const count = await page.evaluate(maps => maps.length, mapInstances);
     * await mapInstances.dispose();
     * await mapPrototype.dispose();
     * ```
     * @param prototypeHandle - a handle to the object prototype.
     * @returns Promise which resolves to a handle to an array of objects with
     * this prototype.
     */
    async queryObjects(prototypeHandle) {
        const context = await this.mainFrame().executionContext();
        return context.queryObjects(prototypeHandle);
    }
    /**
     * This method runs `document.querySelector` within the page and passes the
     * result as the first argument to the `pageFunction`.
     *
     * @remarks
     *
     * If no element is found matching `selector`, the method will throw an error.
     *
     * If `pageFunction` returns a promise `$eval` will wait for the promise to
     * resolve and then return its value.
     *
     * @example
     *
     * ```
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', el => el.outerHTML);
     * ```
     *
     * If you are using TypeScript, you may have to provide an explicit type to the
     * first argument of the `pageFunction`.
     * By default it is typed as `Element`, but you may need to provide a more
     * specific sub-type:
     *
     * @example
     *
     * ```
     * // if you don't provide HTMLInputElement here, TS will error
     * // as `value` is not on `Element`
     * const searchValue = await page.$eval('#search', (el: HTMLInputElement) => el.value);
     * ```
     *
     * The compiler should be able to infer the return type
     * from the `pageFunction` you provide. If it is unable to, you can use the generic
     * type to tell the compiler what return type you expect from `$eval`:
     *
     * @example
     *
     * ```
     * // The compiler can infer the return type in this case, but if it can't
     * // or if you want to be more explicit, provide it as the generic type.
     * const searchValue = await page.$eval<string>(
     *  '#search', (el: HTMLInputElement) => el.value
     * );
     * ```
     *
     * @param selector - the
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * to query for
     * @param pageFunction - the function to be evaluated in the page context.
     * Will be passed the result of `document.querySelector(selector)` as its
     * first argument.
     * @param args - any additional arguments to pass through to `pageFunction`.
     *
     * @returns The result of calling `pageFunction`. If it returns an element it
     * is wrapped in an {@link ElementHandle}, else the raw value itself is
     * returned.
     */
    async $eval(selector, pageFunction, ...args) {
        return this.mainFrame().$eval(selector, pageFunction, ...args);
    }
    /**
     * This method runs `Array.from(document.querySelectorAll(selector))` within
     * the page and passes the result as the first argument to the `pageFunction`.
     *
     * @remarks
     *
     * If `pageFunction` returns a promise `$$eval` will wait for the promise to
     * resolve and then return its value.
     *
     * @example
     *
     * ```
     * // get the amount of divs on the page
     * const divCount = await page.$$eval('div', divs => divs.length);
     *
     * // get the text content of all the `.options` elements:
     * const options = await page.$$eval('div > span.options', options => {
     *   return options.map(option => option.textContent)
     * });
     * ```
     *
     * If you are using TypeScript, you may have to provide an explicit type to the
     * first argument of the `pageFunction`.
     * By default it is typed as `Element[]`, but you may need to provide a more
     * specific sub-type:
     *
     * @example
     *
     * ```
     * // if you don't provide HTMLInputElement here, TS will error
     * // as `value` is not on `Element`
     * await page.$$eval('input', (elements: HTMLInputElement[]) => {
     *   return elements.map(e => e.value);
     * });
     * ```
     *
     * The compiler should be able to infer the return type
     * from the `pageFunction` you provide. If it is unable to, you can use the generic
     * type to tell the compiler what return type you expect from `$$eval`:
     *
     * @example
     *
     * ```
     * // The compiler can infer the return type in this case, but if it can't
     * // or if you want to be more explicit, provide it as the generic type.
     * const allInputValues = await page.$$eval<string[]>(
     *  'input', (elements: HTMLInputElement[]) => elements.map(e => e.textContent)
     * );
     * ```
     *
     * @param selector - the
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * to query for
     * @param pageFunction - the function to be evaluated in the page context. Will
     * be passed the result of `Array.from(document.querySelectorAll(selector))`
     * as its first argument.
     * @param args - any additional arguments to pass through to `pageFunction`.
     *
     * @returns The result of calling `pageFunction`. If it returns an element it
     * is wrapped in an {@link ElementHandle}, else the raw value itself is
     * returned.
     */
    async $$eval(selector, pageFunction, ...args) {
        return this.mainFrame().$$eval(selector, pageFunction, ...args);
    }
    /**
     * The method runs `document.querySelectorAll` within the page. If no elements
     * match the selector, the return value resolves to `[]`.
     * @remarks
     * Shortcut for {@link Frame.$$ | Page.mainFrame().$$(selector) }.
     * @param selector - A `selector` to query page for
     */
    async $$(selector) {
        return this.mainFrame().$$(selector);
    }
    /**
     * The method evaluates the XPath expression relative to the page document as
     * its context node. If there are no such elements, the method resolves to an
     * empty array.
     * @remarks
     * Shortcut for {@link Frame.$x | Page.mainFrame().$x(expression) }.
     * @param expression - Expression to evaluate
     */
    async $x(expression) {
        return this.mainFrame().$x(expression);
    }
    /**
     * If no URLs are specified, this method returns cookies for the current page
     * URL. If URLs are specified, only cookies for those URLs are returned.
     */
    async cookies(...urls) {
        const originalCookies = (await Page_classPrivateFieldGet(this, _Page_client, "f").send('Network.getCookies', {
            urls: urls.length ? urls : [this.url()],
        })).cookies;
        const unsupportedCookieAttributes = ['priority'];
        const filterUnsupportedAttributes = (cookie) => {
            for (const attr of unsupportedCookieAttributes) {
                delete cookie[attr];
            }
            return cookie;
        };
        return originalCookies.map(filterUnsupportedAttributes);
    }
    async deleteCookie(...cookies) {
        const pageURL = this.url();
        for (const cookie of cookies) {
            const item = Object.assign({}, cookie);
            if (!cookie.url && pageURL.startsWith('http')) {
                item.url = pageURL;
            }
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Network.deleteCookies', item);
        }
    }
    /**
     * @example
     * ```js
     * await page.setCookie(cookieObject1, cookieObject2);
     * ```
     */
    async setCookie(...cookies) {
        const pageURL = this.url();
        const startsWithHTTP = pageURL.startsWith('http');
        const items = cookies.map((cookie) => {
            const item = Object.assign({}, cookie);
            if (!item.url && startsWithHTTP) {
                item.url = pageURL;
            }
            assert(item.url !== 'about:blank', `Blank page can not have cookie "${item.name}"`);
            assert(!String.prototype.startsWith.call(item.url || '', 'data:'), `Data URL page can not have cookie "${item.name}"`);
            return item;
        });
        await this.deleteCookie(...items);
        if (items.length) {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Network.setCookies', { cookies: items });
        }
    }
    /**
     * Adds a `<script>` tag into the page with the desired URL or content.
     * @remarks
     * Shortcut for {@link Frame.addScriptTag | page.mainFrame().addScriptTag(options) }.
     * @returns Promise which resolves to the added tag when the script's onload fires or
     * when the script content was injected into frame.
     */
    async addScriptTag(options) {
        return this.mainFrame().addScriptTag(options);
    }
    /**
     * Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a
     * `<style type="text/css">` tag with the content.
     * @returns Promise which resolves to the added tag when the stylesheet's
     * onload fires or when the CSS content was injected into frame.
     */
    async addStyleTag(options) {
        return this.mainFrame().addStyleTag(options);
    }
    /**
     * The method adds a function called `name` on the page's `window` object. When
     * called, the function executes `puppeteerFunction` in node.js and returns a
     * `Promise` which resolves to the return value of `puppeteerFunction`.
     *
     * If the puppeteerFunction returns a `Promise`, it will be awaited.
     *
     * NOTE: Functions installed via `page.exposeFunction` survive navigations.
     * @param name - Name of the function on the window object
     * @param puppeteerFunction -  Callback function which will be called in
     * Puppeteer's context.
     * @example
     * An example of adding an `md5` function into the page:
     * ```js
     * const puppeteer = require('puppeteer');
     * const crypto = require('crypto');
     *
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * page.on('console', (msg) => console.log(msg.text()));
     * await page.exposeFunction('md5', (text) =>
     * crypto.createHash('md5').update(text).digest('hex')
     * );
     * await page.evaluate(async () => {
     * // use window.md5 to compute hashes
     * const myString = 'PUPPETEER';
     * const myHash = await window.md5(myString);
     * console.log(`md5 of ${myString} is ${myHash}`);
     * });
     * await browser.close();
     * })();
     * ```
     * An example of adding a `window.readfile` function into the page:
     * ```js
     * const puppeteer = require('puppeteer');
     * const fs = require('fs');
     *
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * page.on('console', (msg) => console.log(msg.text()));
     * await page.exposeFunction('readfile', async (filePath) => {
     * return new Promise((resolve, reject) => {
     * fs.readFile(filePath, 'utf8', (err, text) => {
     *    if (err) reject(err);
     *    else resolve(text);
     *  });
     * });
     * });
     * await page.evaluate(async () => {
     * // use window.readfile to read contents of a file
     * const content = await window.readfile('/etc/hosts');
     * console.log(content);
     * });
     * await browser.close();
     * })();
     * ```
     */
    async exposeFunction(name, puppeteerFunction) {
        if (Page_classPrivateFieldGet(this, _Page_pageBindings, "f").has(name)) {
            throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
        }
        let exposedFunction;
        if (typeof puppeteerFunction === 'function') {
            exposedFunction = puppeteerFunction;
        }
        else if (typeof puppeteerFunction.default === 'function') {
            exposedFunction = puppeteerFunction.default;
        }
        else {
            throw new Error(`Failed to add page binding with name ${name}: ${puppeteerFunction} is not a function or a module with a default export.`);
        }
        Page_classPrivateFieldGet(this, _Page_pageBindings, "f").set(name, exposedFunction);
        const expression = pageBindingInitString('exposedFun', name);
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Runtime.addBinding', { name: name });
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.addScriptToEvaluateOnNewDocument', {
            source: expression,
        });
        await Promise.all(this.frames().map((frame) => {
            return frame.evaluate(expression).catch(debugError);
        }));
    }
    /**
     * Provide credentials for `HTTP authentication`.
     * @remarks To disable authentication, pass `null`.
     */
    async authenticate(credentials) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager().authenticate(credentials);
    }
    /**
     * The extra HTTP headers will be sent with every request the page initiates.
     * NOTE: All HTTP header names are lowercased. (HTTP headers are
     * case-insensitive, so this shouldn’t impact your server code.)
     * NOTE: page.setExtraHTTPHeaders does not guarantee the order of headers in
     * the outgoing requests.
     * @param headers - An object containing additional HTTP headers to be sent
     * with every request. All header values must be strings.
     * @returns
     */
    async setExtraHTTPHeaders(headers) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager().setExtraHTTPHeaders(headers);
    }
    /**
     * @param userAgent - Specific user agent to use in this page
     * @param userAgentData - Specific user agent client hint data to use in this
     * page
     * @returns Promise which resolves when the user agent is set.
     */
    async setUserAgent(userAgent, userAgentMetadata) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f")
            .networkManager()
            .setUserAgent(userAgent, userAgentMetadata);
    }
    /**
     * @returns Object containing metrics as key/value pairs.
     *
     * - `Timestamp` : The timestamp when the metrics sample was taken.
     *
     * - `Documents` : Number of documents in the page.
     *
     * - `Frames` : Number of frames in the page.
     *
     * - `JSEventListeners` : Number of events in the page.
     *
     * - `Nodes` : Number of DOM nodes in the page.
     *
     * - `LayoutCount` : Total number of full or partial page layout.
     *
     * - `RecalcStyleCount` : Total number of page style recalculations.
     *
     * - `LayoutDuration` : Combined durations of all page layouts.
     *
     * - `RecalcStyleDuration` : Combined duration of all page style
     *   recalculations.
     *
     * - `ScriptDuration` : Combined duration of JavaScript execution.
     *
     * - `TaskDuration` : Combined duration of all tasks performed by the browser.
     *
     *
     * - `JSHeapUsedSize` : Used JavaScript heap size.
     *
     * - `JSHeapTotalSize` : Total JavaScript heap size.
     * @remarks
     * NOTE: All timestamps are in monotonic time: monotonically increasing time
     * in seconds since an arbitrary point in the past.
     */
    async metrics() {
        const response = await Page_classPrivateFieldGet(this, _Page_client, "f").send('Performance.getMetrics');
        return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_buildMetricsObject).call(this, response.metrics);
    }
    /**
     *
     * @returns
     * @remarks Shortcut for
     * {@link Frame.url | page.mainFrame().url()}.
     */
    url() {
        return this.mainFrame().url();
    }
    async content() {
        return await Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().content();
    }
    /**
     * @param html - HTML markup to assign to the page.
     * @param options - Parameters that has some properties.
     * @remarks
     * The parameter `options` might have the following options.
     *
     * - `timeout` : Maximum time in milliseconds for resources to load, defaults
     *   to 30 seconds, pass `0` to disable timeout. The default value can be
     *   changed by using the
     *   {@link Page.setDefaultNavigationTimeout |
     *   page.setDefaultNavigationTimeout(timeout)}
     *   or {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)}
     *   methods.
     *
     * - `waitUntil`: When to consider setting markup succeeded, defaults to `load`.
     *    Given an array of event strings, setting content is considered to be
     *    successful after all events have been fired. Events can be either:<br/>
     *  - `load` : consider setting content to be finished when the `load` event is
     *    fired.<br/>
     *  - `domcontentloaded` : consider setting content to be finished when the
     *   `DOMContentLoaded` event is fired.<br/>
     *  - `networkidle0` : consider setting content to be finished when there are no
     *   more than 0 network connections for at least `500` ms.<br/>
     *  - `networkidle2` : consider setting content to be finished when there are no
     *   more than 2 network connections for at least `500` ms.
     */
    async setContent(html, options = {}) {
        await Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().setContent(html, options);
    }
    /**
     * @param url - URL to navigate page to. The URL should include scheme, e.g.
     * `https://`
     * @param options - Navigation Parameter
     * @returns Promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect.
     * @remarks
     * The argument `options` might have the following properties:
     *
     * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
     *   seconds, pass 0 to disable timeout. The default value can be changed by
     *   using the
     *   {@link Page.setDefaultNavigationTimeout |
     *   page.setDefaultNavigationTimeout(timeout)}
     *   or {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)}
     *   methods.
     *
     * - `waitUntil`:When to consider navigation succeeded, defaults to `load`.
     *    Given an array of event strings, navigation is considered to be successful
     *    after all events have been fired. Events can be either:<br/>
     *  - `load` : consider navigation to be finished when the load event is
     *    fired.<br/>
     *  - `domcontentloaded` : consider navigation to be finished when the
     *    DOMContentLoaded event is fired.<br/>
     *  - `networkidle0` : consider navigation to be finished when there are no
     *    more than 0 network connections for at least `500` ms.<br/>
     *  - `networkidle2` : consider navigation to be finished when there are no
     *    more than 2 network connections for at least `500` ms.
     *
     * - `referer` : Referer header value. If provided it will take preference
     *   over the referer header value set by
     *   {@link Page.setExtraHTTPHeaders |page.setExtraHTTPHeaders()}.
     *
     * `page.goto` will throw an error if:
     * - there's an SSL error (e.g. in case of self-signed certificates).
     * - target URL is invalid.
     * - the timeout is exceeded during navigation.
     * - the remote server does not respond or is unreachable.
     * - the main resource failed to load.
     *
     * `page.goto` will not throw an error when any valid HTTP status code is
     *   returned by the remote server, including 404 "Not Found" and 500
     *   "Internal Server Error". The status code for such responses can be
     *   retrieved by calling response.status().
     *
     * NOTE: `page.goto` either throws an error or returns a main resource
     * response. The only exceptions are navigation to about:blank or navigation
     * to the same URL with a different hash, which would succeed and return null.
     *
     * NOTE: Headless mode doesn't support navigation to a PDF document. See the
     * {@link https://bugs.chromium.org/p/chromium/issues/detail?id=761295
     * | upstream issue}.
     *
     * Shortcut for {@link Frame.goto | page.mainFrame().goto(url, options)}.
     */
    async goto(url, options = {}) {
        return await Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().goto(url, options);
    }
    /**
     * @param options - Navigation parameters which might have the following
     * properties:
     * @returns Promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect.
     * @remarks
     * The argument `options` might have the following properties:
     *
     * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
     *   seconds, pass 0 to disable timeout. The default value can be changed by
     *   using the
     *   {@link Page.setDefaultNavigationTimeout |
     *   page.setDefaultNavigationTimeout(timeout)}
     *   or {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)}
     *   methods.
     *
     * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
     *    Given an array of event strings, navigation is considered to be
     *    successful after all events have been fired. Events can be either:<br/>
     *  - `load` : consider navigation to be finished when the load event is fired.<br/>
     *  - `domcontentloaded` : consider navigation to be finished when the
     *   DOMContentLoaded event is fired.<br/>
     *  - `networkidle0` : consider navigation to be finished when there are no
     *   more than 0 network connections for at least `500` ms.<br/>
     *  - `networkidle2` : consider navigation to be finished when there are no
     *   more than 2 network connections for at least `500` ms.
     */
    async reload(options) {
        const result = await Promise.all([
            this.waitForNavigation(options),
            Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.reload'),
        ]);
        return result[0];
    }
    /**
     * This resolves when the page navigates to a new URL or reloads. It is useful
     * when you run code that will indirectly cause the page to navigate. Consider
     * this example:
     * ```js
     * const [response] = await Promise.all([
     * page.waitForNavigation(), // The promise resolves after navigation has finished
     * page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
     * ]);
     * ```
     *
     * @param options - Navigation parameters which might have the following properties:
     * @returns Promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect. In case of navigation to a different anchor or navigation
     * due to History API usage, the navigation will resolve with `null`.
     * @remarks
     * NOTE: Usage of the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
     * to change the URL is considered a navigation.
     *
     * Shortcut for
     * {@link Frame.waitForNavigation | page.mainFrame().waitForNavigation(options)}.
     */
    async waitForNavigation(options = {}) {
        return await Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().waitForNavigation(options);
    }
    /**
     * @param urlOrPredicate - A URL or predicate to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves to the matched response
     * @example
     * ```js
     * const firstResponse = await page.waitForResponse(
     * 'https://example.com/resource'
     * );
     * const finalResponse = await page.waitForResponse(
     * (response) =>
     * response.url() === 'https://example.com' && response.status() === 200
     * );
     * const finalResponse = await page.waitForResponse(async (response) => {
     * return (await response.text()).includes('<html>');
     * });
     * return finalResponse.ok();
     * ```
     * @remarks
     * Optional Waiting Parameters have:
     *
     * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass
     * `0` to disable the timeout. The default value can be changed by using the
     * {@link Page.setDefaultTimeout} method.
     */
    async waitForRequest(urlOrPredicate, options = {}) {
        const { timeout = Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        return waitForEvent(Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager(), NetworkManagerEmittedEvents.Request, (request) => {
            if (isString(urlOrPredicate)) {
                return urlOrPredicate === request.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!urlOrPredicate(request);
            }
            return false;
        }, timeout, Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_sessionClosePromise).call(this));
    }
    /**
     * @param urlOrPredicate - A URL or predicate to wait for.
     * @param options - Optional waiting parameters
     * @returns Promise which resolves to the matched response.
     * @example
     * ```js
     * const firstResponse = await page.waitForResponse(
     * 'https://example.com/resource'
     * );
     * const finalResponse = await page.waitForResponse(
     * (response) =>
     * response.url() === 'https://example.com' && response.status() === 200
     * );
     * const finalResponse = await page.waitForResponse(async (response) => {
     * return (await response.text()).includes('<html>');
     * });
     * return finalResponse.ok();
     * ```
     * @remarks
     * Optional Parameter have:
     *
     * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
     * pass `0` to disable the timeout. The default value can be changed by using
     * the {@link Page.setDefaultTimeout} method.
     */
    async waitForResponse(urlOrPredicate, options = {}) {
        const { timeout = Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        return waitForEvent(Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager(), NetworkManagerEmittedEvents.Response, async (response) => {
            if (isString(urlOrPredicate)) {
                return urlOrPredicate === response.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!(await urlOrPredicate(response));
            }
            return false;
        }, timeout, Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_sessionClosePromise).call(this));
    }
    /**
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when network is idle
     */
    async waitForNetworkIdle(options = {}) {
        const { idleTime = 500, timeout = Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        const networkManager = Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager();
        let idleResolveCallback;
        const idlePromise = new Promise((resolve) => {
            idleResolveCallback = resolve;
        });
        let abortRejectCallback;
        const abortPromise = new Promise((_, reject) => {
            abortRejectCallback = reject;
        });
        let idleTimer;
        const onIdle = () => {
            return idleResolveCallback();
        };
        const cleanup = () => {
            idleTimer && clearTimeout(idleTimer);
            abortRejectCallback(new Error('abort'));
        };
        const evaluate = () => {
            idleTimer && clearTimeout(idleTimer);
            if (networkManager.numRequestsInProgress() === 0) {
                idleTimer = setTimeout(onIdle, idleTime);
            }
        };
        evaluate();
        const eventHandler = () => {
            evaluate();
            return false;
        };
        const listenToEvent = (event) => {
            return waitForEvent(networkManager, event, eventHandler, timeout, abortPromise);
        };
        const eventPromises = [
            listenToEvent(NetworkManagerEmittedEvents.Request),
            listenToEvent(NetworkManagerEmittedEvents.Response),
        ];
        await Promise.race([
            idlePromise,
            ...eventPromises,
            Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_sessionClosePromise).call(this),
        ]).then((r) => {
            cleanup();
            return r;
        }, (error) => {
            cleanup();
            throw error;
        });
    }
    /**
     * @param urlOrPredicate - A URL or predicate to wait for.
     * @param options - Optional waiting parameters
     * @returns Promise which resolves to the matched frame.
     * @example
     * ```js
     * const frame = await page.waitForFrame(async (frame) => {
     *   return frame.name() === 'Test';
     * });
     * ```
     * @remarks
     * Optional Parameter have:
     *
     * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
     * pass `0` to disable the timeout. The default value can be changed by using
     * the {@link Page.setDefaultTimeout} method.
     */
    async waitForFrame(urlOrPredicate, options = {}) {
        const { timeout = Page_classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        let predicate;
        if (isString(urlOrPredicate)) {
            predicate = (frame) => {
                return Promise.resolve(urlOrPredicate === frame.url());
            };
        }
        else {
            predicate = (frame) => {
                const value = urlOrPredicate(frame);
                if (typeof value === 'boolean') {
                    return Promise.resolve(value);
                }
                return value;
            };
        }
        const eventRace = Promise.race([
            waitForEvent(Page_classPrivateFieldGet(this, _Page_frameManager, "f"), FrameManagerEmittedEvents.FrameAttached, predicate, timeout, Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_sessionClosePromise).call(this)),
            waitForEvent(Page_classPrivateFieldGet(this, _Page_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, predicate, timeout, Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_sessionClosePromise).call(this)),
            ...this.frames().map(async (frame) => {
                if (await predicate(frame)) {
                    return frame;
                }
                return await eventRace;
            }),
        ]);
        return eventRace;
    }
    /**
     * This method navigate to the previous page in history.
     * @param options - Navigation parameters
     * @returns Promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect. If can not go back, resolves to `null`.
     * @remarks
     * The argument `options` might have the following properties:
     *
     * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
     *   seconds, pass 0 to disable timeout. The default value can be changed by
     *   using the
     *   {@link Page.setDefaultNavigationTimeout
     *   | page.setDefaultNavigationTimeout(timeout)}
     *   or {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)}
     *   methods.
     *
     * - `waitUntil` : When to consider navigation succeeded, defaults to `load`.
     *    Given an array of event strings, navigation is considered to be
     *    successful after all events have been fired. Events can be either:<br/>
     *  - `load` : consider navigation to be finished when the load event is fired.<br/>
     *  - `domcontentloaded` : consider navigation to be finished when the
     *   DOMContentLoaded event is fired.<br/>
     *  - `networkidle0` : consider navigation to be finished when there are no
     *   more than 0 network connections for at least `500` ms.<br/>
     *  - `networkidle2` : consider navigation to be finished when there are no
     *   more than 2 network connections for at least `500` ms.
     */
    async goBack(options = {}) {
        return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_go).call(this, -1, options);
    }
    /**
     * This method navigate to the next page in history.
     * @param options - Navigation Parameter
     * @returns Promise which resolves to the main resource response. In case of
     * multiple redirects, the navigation will resolve with the response of the
     * last redirect. If can not go forward, resolves to `null`.
     * @remarks
     * The argument `options` might have the following properties:
     *
     * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
     *   seconds, pass 0 to disable timeout. The default value can be changed by
     *   using the
     *   {@link Page.setDefaultNavigationTimeout
     *   | page.setDefaultNavigationTimeout(timeout)}
     *   or {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)}
     *   methods.
     *
     * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
     *    Given an array of event strings, navigation is considered to be
     *    successful after all events have been fired. Events can be either:<br/>
     *  - `load` : consider navigation to be finished when the load event is fired.<br/>
     *  - `domcontentloaded` : consider navigation to be finished when the
     *   DOMContentLoaded event is fired.<br/>
     *  - `networkidle0` : consider navigation to be finished when there are no
     *   more than 0 network connections for at least `500` ms.<br/>
     *  - `networkidle2` : consider navigation to be finished when there are no
     *   more than 2 network connections for at least `500` ms.
     */
    async goForward(options = {}) {
        return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_go).call(this, +1, options);
    }
    /**
     * Brings page to front (activates tab).
     */
    async bringToFront() {
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.bringToFront');
    }
    /**
     * Emulates given device metrics and user agent. This method is a shortcut for
     * calling two methods: {@link Page.setUserAgent} and {@link Page.setViewport}
     * To aid emulation, Puppeteer provides a list of device descriptors that can
     * be obtained via the {@link Puppeteer.devices} `page.emulate` will resize
     * the page. A lot of websites don't expect phones to change size, so you
     * should emulate before navigating to the page.
     * @example
     * ```js
     * const puppeteer = require('puppeteer');
     * const iPhone = puppeteer.devices['iPhone 6'];
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * await page.emulate(iPhone);
     * await page.goto('https://www.google.com');
     * // other actions...
     * await browser.close();
     * })();
     * ```
     * @remarks List of all available devices is available in the source code:
     * {@link https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts | src/common/DeviceDescriptors.ts}.
     */
    async emulate(options) {
        await Promise.all([
            this.setViewport(options.viewport),
            this.setUserAgent(options.userAgent),
        ]);
    }
    /**
     * @param enabled - Whether or not to enable JavaScript on the page.
     * @returns
     * @remarks
     * NOTE: changing this value won't affect scripts that have already been run.
     * It will take full effect on the next navigation.
     */
    async setJavaScriptEnabled(enabled) {
        if (Page_classPrivateFieldGet(this, _Page_javascriptEnabled, "f") === enabled) {
            return;
        }
        Page_classPrivateFieldSet(this, _Page_javascriptEnabled, enabled, "f");
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setScriptExecutionDisabled', {
            value: !enabled,
        });
    }
    /**
     * Toggles bypassing page's Content-Security-Policy.
     * @param enabled - sets bypassing of page's Content-Security-Policy.
     * @remarks
     * NOTE: CSP bypassing happens at the moment of CSP initialization rather than
     * evaluation. Usually, this means that `page.setBypassCSP` should be called
     * before navigating to the domain.
     */
    async setBypassCSP(enabled) {
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.setBypassCSP', { enabled });
    }
    /**
     * @param type - Changes the CSS media type of the page. The only allowed
     * values are `screen`, `print` and `null`. Passing `null` disables CSS media
     * emulation.
     * @example
     * ```
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → true
     * await page.evaluate(() => matchMedia('print').matches);
     * // → false
     *
     * await page.emulateMediaType('print');
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → false
     * await page.evaluate(() => matchMedia('print').matches);
     * // → true
     *
     * await page.emulateMediaType(null);
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → true
     * await page.evaluate(() => matchMedia('print').matches);
     * // → false
     * ```
     */
    async emulateMediaType(type) {
        assert(type === 'screen' ||
            type === 'print' ||
            (type !== null && type !== void 0 ? type : undefined) === undefined, 'Unsupported media type: ' + type);
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setEmulatedMedia', {
            media: type || '',
        });
    }
    /**
     * Enables CPU throttling to emulate slow CPUs.
     * @param factor - slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
     */
    async emulateCPUThrottling(factor) {
        assert(factor === null || factor >= 1, 'Throttling rate should be greater or equal to 1');
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setCPUThrottlingRate', {
            rate: factor !== null ? factor : 1,
        });
    }
    /**
     * @param features - `<?Array<Object>>` Given an array of media feature
     * objects, emulates CSS media features on the page. Each media feature object
     * must have the following properties:
     * @example
     * ```js
     * await page.emulateMediaFeatures([
     * { name: 'prefers-color-scheme', value: 'dark' },
     * ]);
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
     * // → true
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
     * // → false
     *
     * await page.emulateMediaFeatures([
     * { name: 'prefers-reduced-motion', value: 'reduce' },
     * ]);
     * await page.evaluate(
     * () => matchMedia('(prefers-reduced-motion: reduce)').matches
     * );
     * // → true
     * await page.evaluate(
     * () => matchMedia('(prefers-reduced-motion: no-preference)').matches
     * );
     * // → false
     *
     * await page.emulateMediaFeatures([
     * { name: 'prefers-color-scheme', value: 'dark' },
     * { name: 'prefers-reduced-motion', value: 'reduce' },
     * ]);
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
     * // → true
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
     * // → false
     * await page.evaluate(
     * () => matchMedia('(prefers-reduced-motion: reduce)').matches
     * );
     * // → true
     * await page.evaluate(
     * () => matchMedia('(prefers-reduced-motion: no-preference)').matches
     * );
     * // → false
     *
     * await page.emulateMediaFeatures([{ name: 'color-gamut', value: 'p3' }]);
     * await page.evaluate(() => matchMedia('(color-gamut: srgb)').matches);
     * // → true
     * await page.evaluate(() => matchMedia('(color-gamut: p3)').matches);
     * // → true
     * await page.evaluate(() => matchMedia('(color-gamut: rec2020)').matches);
     * // → false
     * ```
     */
    async emulateMediaFeatures(features) {
        if (!features) {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setEmulatedMedia', {});
        }
        if (Array.isArray(features)) {
            for (const mediaFeature of features) {
                const name = mediaFeature.name;
                assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), 'Unsupported media feature: ' + name);
            }
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setEmulatedMedia', {
                features: features,
            });
        }
    }
    /**
     * @param timezoneId - Changes the timezone of the page. See
     * {@link https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt | ICU’s metaZones.txt}
     * for a list of supported timezone IDs. Passing
     * `null` disables timezone emulation.
     */
    async emulateTimezone(timezoneId) {
        try {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setTimezoneOverride', {
                timezoneId: timezoneId || '',
            });
        }
        catch (error) {
            if (isErrorLike(error) && error.message.includes('Invalid timezone')) {
                throw new Error(`Invalid timezone ID: ${timezoneId}`);
            }
            throw error;
        }
    }
    /**
     * Emulates the idle state.
     * If no arguments set, clears idle state emulation.
     *
     * @example
     * ```js
     * // set idle emulation
     * await page.emulateIdleState({isUserActive: true, isScreenUnlocked: false});
     *
     * // do some checks here
     * ...
     *
     * // clear idle emulation
     * await page.emulateIdleState();
     * ```
     *
     * @param overrides - Mock idle state. If not set, clears idle overrides
     */
    async emulateIdleState(overrides) {
        if (overrides) {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setIdleOverride', {
                isUserActive: overrides.isUserActive,
                isScreenUnlocked: overrides.isScreenUnlocked,
            });
        }
        else {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.clearIdleOverride');
        }
    }
    /**
     * Simulates the given vision deficiency on the page.
     *
     * @example
     * ```js
     * const puppeteer = require('puppeteer');
     *
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   await page.goto('https://v8.dev/blog/10-years');
     *
     *   await page.emulateVisionDeficiency('achromatopsia');
     *   await page.screenshot({ path: 'achromatopsia.png' });
     *
     *   await page.emulateVisionDeficiency('deuteranopia');
     *   await page.screenshot({ path: 'deuteranopia.png' });
     *
     *   await page.emulateVisionDeficiency('blurredVision');
     *   await page.screenshot({ path: 'blurred-vision.png' });
     *
     *   await browser.close();
     * })();
     * ```
     *
     * @param type - the type of deficiency to simulate, or `'none'` to reset.
     */
    async emulateVisionDeficiency(type) {
        const visionDeficiencies = new Set([
            'none',
            'achromatopsia',
            'blurredVision',
            'deuteranopia',
            'protanopia',
            'tritanopia',
        ]);
        try {
            assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setEmulatedVisionDeficiency', {
                type: type || 'none',
            });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * `page.setViewport` will resize the page. A lot of websites don't expect
     * phones to change size, so you should set the viewport before navigating to
     * the page.
     *
     * In the case of multiple pages in a single browser, each page can have its
     * own viewport size.
     * @example
     * ```js
     * const page = await browser.newPage();
     * await page.setViewport({
     * width: 640,
     * height: 480,
     * deviceScaleFactor: 1,
     * });
     * await page.goto('https://example.com');
     * ```
     *
     * @param viewport -
     * @remarks
     * Argument viewport have following properties:
     *
     * - `width`: page width in pixels. required
     *
     * - `height`: page height in pixels. required
     *
     * - `deviceScaleFactor`: Specify device scale factor (can be thought of as
     *   DPR). Defaults to `1`.
     *
     * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
     *   to `false`.
     *
     * - `hasTouch`: Specifies if viewport supports touch events. Defaults to `false`
     *
     * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to false.
     *
     * NOTE: in certain cases, setting viewport will reload the page in order to
     * set the isMobile or hasTouch properties.
     */
    async setViewport(viewport) {
        const needsReload = await Page_classPrivateFieldGet(this, _Page_emulationManager, "f").emulateViewport(viewport);
        Page_classPrivateFieldSet(this, _Page_viewport, viewport, "f");
        if (needsReload) {
            await this.reload();
        }
    }
    /**
     * @returns
     *
     * - `width`: page's width in pixels
     *
     * - `height`: page's height in pixels
     *
     * - `deviceScalarFactor`: Specify device scale factor (can be though of as
     *   dpr). Defaults to `1`.
     *
     * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
     *   to `false`.
     *
     * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
     *   `false`.
     *
     * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
     *   `false`.
     */
    viewport() {
        return Page_classPrivateFieldGet(this, _Page_viewport, "f");
    }
    /**
     * @remarks
     *
     * Evaluates a function in the page's context and returns the result.
     *
     * If the function passed to `page.evaluteHandle` returns a Promise, the
     * function will wait for the promise to resolve and return its value.
     *
     * @example
     *
     * ```js
     * const result = await frame.evaluate(() => {
     *   return Promise.resolve(8 * 7);
     * });
     * console.log(result); // prints "56"
     * ```
     *
     * You can pass a string instead of a function (although functions are
     * recommended as they are easier to debug and use with TypeScript):
     *
     * @example
     * ```
     * const aHandle = await page.evaluate('1 + 2');
     * ```
     *
     * To get the best TypeScript experience, you should pass in as the
     * generic the type of `pageFunction`:
     *
     * ```
     * const aHandle = await page.evaluate<() => number>(() => 2);
     * ```
     *
     * @example
     *
     * {@link ElementHandle} instances (including {@link JSHandle}s) can be passed
     * as arguments to the `pageFunction`:
     *
     * ```
     * const bodyHandle = await page.$('body');
     * const html = await page.evaluate(body => body.innerHTML, bodyHandle);
     * await bodyHandle.dispose();
     * ```
     *
     * @param pageFunction - a function that is run within the page
     * @param args - arguments to be passed to the pageFunction
     *
     * @returns the return value of `pageFunction`.
     */
    async evaluate(pageFunction, ...args) {
        return Page_classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().evaluate(pageFunction, ...args);
    }
    /**
     * Adds a function which would be invoked in one of the following scenarios:
     *
     * - whenever the page is navigated
     *
     * - whenever the child frame is attached or navigated. In this case, the
     * function is invoked in the context of the newly attached frame.
     *
     * The function is invoked after the document was created but before any of
     * its scripts were run. This is useful to amend the JavaScript environment,
     * e.g. to seed `Math.random`.
     * @param pageFunction - Function to be evaluated in browser context
     * @param args - Arguments to pass to `pageFunction`
     * @example
     * An example of overriding the navigator.languages property before the page loads:
     * ```js
     * // preload.js
     *
     * // overwrite the `languages` property to use a custom getter
     * Object.defineProperty(navigator, 'languages', {
     * get: function () {
     * return ['en-US', 'en', 'bn'];
     * },
     * });
     *
     * // In your puppeteer script, assuming the preload.js file is
     * in same folder of our script
     * const preloadFile = fs.readFileSync('./preload.js', 'utf8');
     * await page.evaluateOnNewDocument(preloadFile);
     * ```
     */
    async evaluateOnNewDocument(pageFunction, ...args) {
        const source = evaluationString(pageFunction, ...args);
        await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.addScriptToEvaluateOnNewDocument', {
            source,
        });
    }
    /**
     * Toggles ignoring cache for each request based on the enabled state. By
     * default, caching is enabled.
     * @param enabled - sets the `enabled` state of cache
     */
    async setCacheEnabled(enabled = true) {
        await Page_classPrivateFieldGet(this, _Page_frameManager, "f").networkManager().setCacheEnabled(enabled);
    }
    /**
     * @remarks
     * Options object which might have the following properties:
     *
     * - `path` : The file path to save the image to. The screenshot type
     *   will be inferred from file extension. If `path` is a relative path, then
     *   it is resolved relative to
     *   {@link https://nodejs.org/api/process.html#process_process_cwd
     *   | current working directory}.
     *   If no path is provided, the image won't be saved to the disk.
     *
     * - `type` : Specify screenshot type, can be either `jpeg` or `png`.
     *   Defaults to 'png'.
     *
     * - `quality` : The quality of the image, between 0-100. Not
     *   applicable to `png` images.
     *
     * - `fullPage` : When true, takes a screenshot of the full
     *   scrollable page. Defaults to `false`
     *
     * - `clip` : An object which specifies clipping region of the page.
     *   Should have the following fields:<br/>
     *  - `x` : x-coordinate of top-left corner of clip area.<br/>
     *  - `y` :  y-coordinate of top-left corner of clip area.<br/>
     *  - `width` : width of clipping area.<br/>
     *  - `height` : height of clipping area.
     *
     * - `omitBackground` : Hides default white background and allows
     *   capturing screenshots with transparency. Defaults to `false`
     *
     * - `encoding` : The encoding of the image, can be either base64 or
     *   binary. Defaults to `binary`.
     *
     *
     * NOTE: Screenshots take at least 1/6 second on OS X. See
     * {@link https://crbug.com/741689} for discussion.
     * @returns Promise which resolves to buffer or a base64 string (depending on
     * the value of `encoding`) with captured screenshot.
     */
    async screenshot(options = {}) {
        let screenshotType = "png" /* Protocol.Page.CaptureScreenshotRequestFormat.Png */;
        // options.type takes precedence over inferring the type from options.path
        // because it may be a 0-length file with no extension created beforehand
        // (i.e. as a temp file).
        if (options.type) {
            const type = options.type;
            if (type !== 'png' && type !== 'jpeg' && type !== 'webp') {
                assertNever(type, 'Unknown options.type value: ' + type);
            }
            screenshotType =
                options.type;
        }
        else if (options.path) {
            const filePath = options.path;
            const extension = filePath
                .slice(filePath.lastIndexOf('.') + 1)
                .toLowerCase();
            switch (extension) {
                case 'png':
                    screenshotType = "png" /* Protocol.Page.CaptureScreenshotRequestFormat.Png */;
                    break;
                case 'jpeg':
                case 'jpg':
                    screenshotType = "jpeg" /* Protocol.Page.CaptureScreenshotRequestFormat.Jpeg */;
                    break;
                case 'webp':
                    screenshotType = "webp" /* Protocol.Page.CaptureScreenshotRequestFormat.Webp */;
                    break;
                default:
                    throw new Error(`Unsupported screenshot type for extension \`.${extension}\``);
            }
        }
        if (options.quality) {
            assert(screenshotType === "jpeg" /* Protocol.Page.CaptureScreenshotRequestFormat.Jpeg */ ||
                screenshotType === "webp" /* Protocol.Page.CaptureScreenshotRequestFormat.Webp */, 'options.quality is unsupported for the ' +
                screenshotType +
                ' screenshots');
            assert(typeof options.quality === 'number', 'Expected options.quality to be a number but found ' +
                typeof options.quality);
            assert(Number.isInteger(options.quality), 'Expected options.quality to be an integer');
            assert(options.quality >= 0 && options.quality <= 100, 'Expected options.quality to be between 0 and 100 (inclusive), got ' +
                options.quality);
        }
        assert(!options.clip || !options.fullPage, 'options.clip and options.fullPage are exclusive');
        if (options.clip) {
            assert(typeof options.clip.x === 'number', 'Expected options.clip.x to be a number but found ' +
                typeof options.clip.x);
            assert(typeof options.clip.y === 'number', 'Expected options.clip.y to be a number but found ' +
                typeof options.clip.y);
            assert(typeof options.clip.width === 'number', 'Expected options.clip.width to be a number but found ' +
                typeof options.clip.width);
            assert(typeof options.clip.height === 'number', 'Expected options.clip.height to be a number but found ' +
                typeof options.clip.height);
            assert(options.clip.width !== 0, 'Expected options.clip.width not to be 0.');
            assert(options.clip.height !== 0, 'Expected options.clip.height not to be 0.');
        }
        return Page_classPrivateFieldGet(this, _Page_screenshotTaskQueue, "f").postTask(() => {
            return Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_screenshotTask).call(this, screenshotType, options);
        });
    }
    /**
     * Generates a PDF of the page with the `print` CSS media type.
     * @remarks
     *
     * NOTE: PDF generation is only supported in Chrome headless mode.
     *
     * To generate a PDF with the `screen` media type, call
     * {@link Page.emulateMediaType | `page.emulateMediaType('screen')`} before
     * calling `page.pdf()`.
     *
     * By default, `page.pdf()` generates a pdf with modified colors for printing.
     * Use the
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust | `-webkit-print-color-adjust`}
     * property to force rendering of exact colors.
     *
     *
     * @param options - options for generating the PDF.
     */
    async createPDFStream(options = {}) {
        const { scale = 1, displayHeaderFooter = false, headerTemplate = '', footerTemplate = '', printBackground = false, landscape = false, pageRanges = '', preferCSSPageSize = false, margin = {}, omitBackground = false, timeout = 30000, } = options;
        let paperWidth = 8.5;
        let paperHeight = 11;
        if (options.format) {
            const format = _paperFormats[options.format.toLowerCase()];
            assert(format, 'Unknown paper format: ' + options.format);
            paperWidth = format.width;
            paperHeight = format.height;
        }
        else {
            paperWidth = convertPrintParameterToInches(options.width) || paperWidth;
            paperHeight =
                convertPrintParameterToInches(options.height) || paperHeight;
        }
        const marginTop = convertPrintParameterToInches(margin.top) || 0;
        const marginLeft = convertPrintParameterToInches(margin.left) || 0;
        const marginBottom = convertPrintParameterToInches(margin.bottom) || 0;
        const marginRight = convertPrintParameterToInches(margin.right) || 0;
        if (omitBackground) {
            await Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_setTransparentBackgroundColor).call(this);
        }
        const printCommandPromise = Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.printToPDF', {
            transferMode: 'ReturnAsStream',
            landscape,
            displayHeaderFooter,
            headerTemplate,
            footerTemplate,
            printBackground,
            scale,
            paperWidth,
            paperHeight,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            pageRanges,
            preferCSSPageSize,
        });
        const result = await waitWithTimeout(printCommandPromise, 'Page.printToPDF', timeout);
        if (omitBackground) {
            await Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_resetDefaultBackgroundColor).call(this);
        }
        assert(result.stream, '`stream` is missing from `Page.printToPDF');
        return getReadableFromProtocolStream(Page_classPrivateFieldGet(this, _Page_client, "f"), result.stream);
    }
    /**
     * @param options -
     * @returns
     */
    async pdf(options = {}) {
        const { path = undefined } = options;
        const readable = await this.createPDFStream(options);
        const buffer = await getReadableAsBuffer(readable, path);
        assert(buffer, 'Could not create buffer');
        return buffer;
    }
    /**
     * @returns The page's title
     * @remarks
     * Shortcut for {@link Frame.title | page.mainFrame().title()}.
     */
    async title() {
        return this.mainFrame().title();
    }
    async close(options = { runBeforeUnload: undefined }) {
        const connection = Page_classPrivateFieldGet(this, _Page_client, "f").connection();
        assert(connection, 'Protocol error: Connection closed. Most likely the page has been closed.');
        const runBeforeUnload = !!options.runBeforeUnload;
        if (runBeforeUnload) {
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.close');
        }
        else {
            await connection.send('Target.closeTarget', {
                targetId: Page_classPrivateFieldGet(this, _Page_target, "f")._targetId,
            });
            await Page_classPrivateFieldGet(this, _Page_target, "f")._isClosedPromise;
        }
    }
    /**
     * Indicates that the page has been closed.
     * @returns
     */
    isClosed() {
        return Page_classPrivateFieldGet(this, _Page_closed, "f");
    }
    get mouse() {
        return Page_classPrivateFieldGet(this, _Page_mouse, "f");
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.mouse} to click in the center of the
     * element. If there's no element matching `selector`, the method throws an
     * error.
     * @remarks Bear in mind that if `click()` triggers a navigation event and
     * there's a separate `page.waitForNavigation()` promise to be resolved, you
     * may end up with a race condition that yields unexpected results. The
     * correct pattern for click and wait for navigation is the following:
     * ```js
     * const [response] = await Promise.all([
     * page.waitForNavigation(waitOptions),
     * page.click(selector, clickOptions),
     * ]);
     * ```
     * Shortcut for {@link Frame.click | page.mainFrame().click(selector[, options]) }.
     * @param selector - A `selector` to search for element to click. If there are
     * multiple elements satisfying the `selector`, the first will be clicked
     * @param options - `Object`
     * @returns Promise which resolves when the element matching `selector` is
     * successfully clicked. The Promise will be rejected if there is no element
     * matching `selector`.
     */
    click(selector, options = {}) {
        return this.mainFrame().click(selector, options);
    }
    /**
     * This method fetches an element with `selector` and focuses it. If there's no
     * element matching `selector`, the method throws an error.
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector }
     * of an element to focus. If there are multiple elements satisfying the
     * selector, the first will be focused.
     * @returns  Promise which resolves when the element matching selector is
     * successfully focused. The promise will be rejected if there is no element
     * matching selector.
     * @remarks
     * Shortcut for {@link Frame.focus | page.mainFrame().focus(selector)}.
     */
    focus(selector) {
        return this.mainFrame().focus(selector);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.mouse} to hover over the center of the element.
     * If there's no element matching `selector`, the method throws an error.
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * to search for element to hover. If there are multiple elements satisfying
     * the selector, the first will be hovered.
     * @returns Promise which resolves when the element matching `selector` is
     * successfully hovered. Promise gets rejected if there's no element matching
     * `selector`.
     * @remarks
     * Shortcut for {@link Page.hover | page.mainFrame().hover(selector)}.
     */
    hover(selector) {
        return this.mainFrame().hover(selector);
    }
    /**
     * Triggers a `change` and `input` event once all the provided options have been
     * selected. If there's no `<select>` element matching `selector`, the method
     * throws an error.
     *
     * @example
     * ```js
     * page.select('select#colors', 'blue'); // single selection
     * page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
     * ```
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
     * to query the page for
     * @param values - Values of options to select. If the `<select>` has the
     * `multiple` attribute, all values are considered, otherwise only the first one
     * is taken into account.
     * @returns
     *
     * @remarks
     * Shortcut for {@link Frame.select | page.mainFrame().select()}
     */
    select(selector, ...values) {
        return this.mainFrame().select(selector, ...values);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.touchscreen} to tap in the center of the element.
     * If there's no element matching `selector`, the method throws an error.
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
     * to search for element to tap. If there are multiple elements satisfying the
     * selector, the first will be tapped.
     * @returns
     * @remarks
     * Shortcut for {@link Frame.tap | page.mainFrame().tap(selector)}.
     */
    tap(selector) {
        return this.mainFrame().tap(selector);
    }
    /**
     * Sends a `keydown`, `keypress/input`, and `keyup` event for each character
     * in the text.
     *
     * To press a special key, like `Control` or `ArrowDown`, use {@link Keyboard.press}.
     * @example
     * ```
     * await page.type('#mytextarea', 'Hello');
     * // Types instantly
     * await page.type('#mytextarea', 'World', { delay: 100 });
     * // Types slower, like a user
     * ```
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * of an element to type into. If there are multiple elements satisfying the
     * selector, the first will be used.
     * @param text - A text to type into a focused element.
     * @param options - have property `delay` which is the Time to wait between
     * key presses in milliseconds. Defaults to `0`.
     * @returns
     * @remarks
     */
    type(selector, text, options) {
        return this.mainFrame().type(selector, text, options);
    }
    /**
     * @remarks
     *
     * This method behaves differently depending on the first parameter. If it's a
     * `string`, it will be treated as a `selector` or `xpath` (if the string
     * starts with `//`). This method then is a shortcut for
     * {@link Page.waitForSelector} or {@link Page.waitForXPath}.
     *
     * If the first argument is a function this method is a shortcut for
     * {@link Page.waitForFunction}.
     *
     * If the first argument is a `number`, it's treated as a timeout in
     * milliseconds and the method returns a promise which resolves after the
     * timeout.
     *
     * @param selectorOrFunctionOrTimeout - a selector, predicate or timeout to
     * wait for.
     * @param options - optional waiting parameters.
     * @param args - arguments to pass to `pageFunction`.
     *
     * @deprecated Don't use this method directly. Instead use the more explicit
     * methods available: {@link Page.waitForSelector},
     * {@link Page.waitForXPath}, {@link Page.waitForFunction} or
     * {@link Page.waitForTimeout}.
     */
    waitFor(selectorOrFunctionOrTimeout, options = {}, ...args) {
        return this.mainFrame().waitFor(selectorOrFunctionOrTimeout, options, ...args);
    }
    /**
     * Causes your script to wait for the given number of milliseconds.
     *
     * @remarks
     *
     * It's generally recommended to not wait for a number of seconds, but instead
     * use {@link Page.waitForSelector}, {@link Page.waitForXPath} or
     * {@link Page.waitForFunction} to wait for exactly the conditions you want.
     *
     * @example
     *
     * Wait for 1 second:
     *
     * ```
     * await page.waitForTimeout(1000);
     * ```
     *
     * @param milliseconds - the number of milliseconds to wait.
     */
    waitForTimeout(milliseconds) {
        return this.mainFrame().waitForTimeout(milliseconds);
    }
    /**
     * Wait for the `selector` to appear in page. If at the moment of calling the
     * method the `selector` already exists, the method will return immediately. If
     * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * This method works across navigations:
     * ```js
     * const puppeteer = require('puppeteer');
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     * .waitForSelector('img')
     * .then(() => console.log('First URL with image: ' + currentURL));
     * for (currentURL of [
     * 'https://example.com',
     * 'https://google.com',
     * 'https://bbc.com',
     * ]) {
     * await page.goto(currentURL);
     * }
     * await browser.close();
     * })();
     * ```
     * @param selector - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
     * of an element to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when element specified by selector string
     * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
     * selector is not found in DOM.
     * @remarks
     * The optional Parameter in Arguments `options` are :
     *
     * - `Visible`: A boolean wait for element to be present in DOM and to be
     * visible, i.e. to not have `display: none` or `visibility: hidden` CSS
     * properties. Defaults to `false`.
     *
     * - `hidden`: ait for element to not be found in the DOM or to be hidden,
     * i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
     * `false`.
     *
     * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
     * (30 seconds). Pass `0` to disable timeout. The default value can be changed
     * by using the {@link Page.setDefaultTimeout} method.
     */
    waitForSelector(selector, options = {}) {
        return this.mainFrame().waitForSelector(selector, options);
    }
    /**
     * Wait for the `xpath` to appear in page. If at the moment of calling the
     * method the `xpath` already exists, the method will return immediately. If
     * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * This method works across navigation
     * ```js
     * const puppeteer = require('puppeteer');
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     * .waitForXPath('//img')
     * .then(() => console.log('First URL with image: ' + currentURL));
     * for (currentURL of [
     * 'https://example.com',
     * 'https://google.com',
     * 'https://bbc.com',
     * ]) {
     * await page.goto(currentURL);
     * }
     * await browser.close();
     * })();
     * ```
     * @param xpath - A
     * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
     * element to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when element specified by xpath string is
     * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
     * not found in DOM.
     * @remarks
     * The optional Argument `options` have properties:
     *
     * - `visible`: A boolean to wait for element to be present in DOM and to be
     * visible, i.e. to not have `display: none` or `visibility: hidden` CSS
     * properties. Defaults to `false`.
     *
     * - `hidden`: A boolean wait for element to not be found in the DOM or to be
     * hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
     * Defaults to `false`.
     *
     * - `timeout`: A number which is maximum time to wait for in milliseconds.
     * Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
     * value can be changed by using the {@link Page.setDefaultTimeout} method.
     */
    waitForXPath(xpath, options = {}) {
        return this.mainFrame().waitForXPath(xpath, options);
    }
    /**
     * The `waitForFunction` can be used to observe viewport size change:
     *
     * ```
     * const puppeteer = require('puppeteer');
     * (async () => {
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * const watchDog = page.waitForFunction('window.innerWidth < 100');
     * await page.setViewport({ width: 50, height: 50 });
     * await watchDog;
     * await browser.close();
     * })();
     * ```
     * To pass arguments from node.js to the predicate of `page.waitForFunction` function:
     * ```
     * const selector = '.foo';
     * await page.waitForFunction(
     * (selector) => !!document.querySelector(selector),
     * {},
     * selector
     * );
     * ```
     * The predicate of `page.waitForFunction` can be asynchronous too:
     * ```
     * const username = 'github-username';
     * await page.waitForFunction(
     * async (username) => {
     * const githubResponse = await fetch(
     *  `https://api.github.com/users/${username}`
     * );
     * const githubUser = await githubResponse.json();
     * // show the avatar
     * const img = document.createElement('img');
     * img.src = githubUser.avatar_url;
     * // wait 3 seconds
     * await new Promise((resolve, reject) => setTimeout(resolve, 3000));
     * img.remove();
     * },
     * {},
     * username
     * );
     * ```
     * @param pageFunction - Function to be evaluated in browser context
     * @param options - Optional waiting parameters
     * @param args -  Arguments to pass to `pageFunction`
     * @returns Promise which resolves when the `pageFunction` returns a truthy
     * value. It resolves to a JSHandle of the truthy value.
     *
     * The optional waiting parameter can be:
     *
     * - `Polling`: An interval at which the `pageFunction` is executed, defaults to
     *   `raf`. If `polling` is a number, then it is treated as an interval in
     *   milliseconds at which the function would be executed. If polling is a
     *   string, then it can be one of the following values:<br/>
     *    - `raf`: to constantly execute `pageFunction` in `requestAnimationFrame`
     *      callback. This is the tightest polling mode which is suitable to
     *      observe styling changes.<br/>
     *    - `mutation`: to execute pageFunction on every DOM mutation.
     *
     * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
     * (30 seconds). Pass `0` to disable timeout. The default value can be changed
     * by using the
     * {@link Page.setDefaultTimeout | page.setDefaultTimeout(timeout)} method.
     *
     */
    waitForFunction(pageFunction, options = {}, ...args) {
        return this.mainFrame().waitForFunction(pageFunction, options, ...args);
    }
}
_Page_closed = new WeakMap(), _Page_client = new WeakMap(), _Page_target = new WeakMap(), _Page_keyboard = new WeakMap(), _Page_mouse = new WeakMap(), _Page_timeoutSettings = new WeakMap(), _Page_touchscreen = new WeakMap(), _Page_accessibility = new WeakMap(), _Page_frameManager = new WeakMap(), _Page_emulationManager = new WeakMap(), _Page_tracing = new WeakMap(), _Page_pageBindings = new WeakMap(), _Page_coverage = new WeakMap(), _Page_javascriptEnabled = new WeakMap(), _Page_viewport = new WeakMap(), _Page_screenshotTaskQueue = new WeakMap(), _Page_workers = new WeakMap(), _Page_fileChooserInterceptors = new WeakMap(), _Page_disconnectPromise = new WeakMap(), _Page_userDragInterceptionEnabled = new WeakMap(), _Page_handlerMap = new WeakMap(), _Page_instances = new WeakSet(), _Page_initialize = async function _Page_initialize() {
    await Promise.all([
        Page_classPrivateFieldGet(this, _Page_frameManager, "f").initialize(),
        Page_classPrivateFieldGet(this, _Page_client, "f").send('Target.setAutoAttach', {
            autoAttach: true,
            waitForDebuggerOnStart: false,
            flatten: true,
        }),
        Page_classPrivateFieldGet(this, _Page_client, "f").send('Performance.enable'),
        Page_classPrivateFieldGet(this, _Page_client, "f").send('Log.enable'),
    ]);
}, _Page_onFileChooser = async function _Page_onFileChooser(event) {
    if (!Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f").size) {
        return;
    }
    const frame = Page_classPrivateFieldGet(this, _Page_frameManager, "f").frame(event.frameId);
    assert(frame);
    const context = await frame.executionContext();
    const element = await context._adoptBackendNodeId(event.backendNodeId);
    const interceptors = Array.from(Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f"));
    Page_classPrivateFieldGet(this, _Page_fileChooserInterceptors, "f").clear();
    const fileChooser = new FileChooser(element, event);
    for (const interceptor of interceptors) {
        interceptor.call(null, fileChooser);
    }
}, _Page_onTargetCrashed = function _Page_onTargetCrashed() {
    this.emit('error', new Error('Page crashed!'));
}, _Page_onLogEntryAdded = function _Page_onLogEntryAdded(event) {
    const { level, text, args, source, url, lineNumber } = event.entry;
    if (args) {
        args.map((arg) => {
            return releaseObject(Page_classPrivateFieldGet(this, _Page_client, "f"), arg);
        });
    }
    if (source !== 'worker') {
        this.emit("console" /* PageEmittedEvents.Console */, new ConsoleMessage(level, text, [], [{ url, lineNumber }]));
    }
}, _Page_emitMetrics = function _Page_emitMetrics(event) {
    this.emit("metrics" /* PageEmittedEvents.Metrics */, {
        title: event.title,
        metrics: Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_buildMetricsObject).call(this, event.metrics),
    });
}, _Page_buildMetricsObject = function _Page_buildMetricsObject(metrics) {
    const result = {};
    for (const metric of metrics || []) {
        if (supportedMetrics.has(metric.name)) {
            result[metric.name] = metric.value;
        }
    }
    return result;
}, _Page_handleException = function _Page_handleException(exceptionDetails) {
    const message = getExceptionMessage(exceptionDetails);
    const err = new Error(message);
    err.stack = ''; // Don't report clientside error with a node stack attached
    this.emit("pageerror" /* PageEmittedEvents.PageError */, err);
}, _Page_onConsoleAPI = async function _Page_onConsoleAPI(event) {
    if (event.executionContextId === 0) {
        // DevTools protocol stores the last 1000 console messages. These
        // messages are always reported even for removed execution contexts. In
        // this case, they are marked with executionContextId = 0 and are
        // reported upon enabling Runtime agent.
        //
        // Ignore these messages since:
        // - there's no execution context we can use to operate with message
        //   arguments
        // - these messages are reported before Puppeteer clients can subscribe
        //   to the 'console'
        //   page event.
        //
        // @see https://github.com/puppeteer/puppeteer/issues/3865
        return;
    }
    const context = Page_classPrivateFieldGet(this, _Page_frameManager, "f").executionContextById(event.executionContextId, Page_classPrivateFieldGet(this, _Page_client, "f"));
    const values = event.args.map((arg) => {
        return _createJSHandle(context, arg);
    });
    Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_addConsoleMessage).call(this, event.type, values, event.stackTrace);
}, _Page_onBindingCalled = async function _Page_onBindingCalled(event) {
    let payload;
    try {
        payload = JSON.parse(event.payload);
    }
    catch {
        // The binding was either called by something in the page or it was
        // called before our wrapper was initialized.
        return;
    }
    const { type, name, seq, args } = payload;
    if (type !== 'exposedFun' || !Page_classPrivateFieldGet(this, _Page_pageBindings, "f").has(name)) {
        return;
    }
    let expression = null;
    try {
        const pageBinding = Page_classPrivateFieldGet(this, _Page_pageBindings, "f").get(name);
        assert(pageBinding);
        const result = await pageBinding(...args);
        expression = pageBindingDeliverResultString(name, seq, result);
    }
    catch (error) {
        if (isErrorLike(error)) {
            expression = pageBindingDeliverErrorString(name, seq, error.message, error.stack);
        }
        else {
            expression = pageBindingDeliverErrorValueString(name, seq, error);
        }
    }
    Page_classPrivateFieldGet(this, _Page_client, "f")
        .send('Runtime.evaluate', {
        expression,
        contextId: event.executionContextId,
    })
        .catch(debugError);
}, _Page_addConsoleMessage = function _Page_addConsoleMessage(eventType, args, stackTrace) {
    if (!this.listenerCount("console" /* PageEmittedEvents.Console */)) {
        args.forEach((arg) => {
            return arg.dispose();
        });
        return;
    }
    const textTokens = [];
    for (const arg of args) {
        const remoteObject = arg._remoteObject;
        if (remoteObject.objectId) {
            textTokens.push(arg.toString());
        }
        else {
            textTokens.push(valueFromRemoteObject(remoteObject));
        }
    }
    const stackTraceLocations = [];
    if (stackTrace) {
        for (const callFrame of stackTrace.callFrames) {
            stackTraceLocations.push({
                url: callFrame.url,
                lineNumber: callFrame.lineNumber,
                columnNumber: callFrame.columnNumber,
            });
        }
    }
    const message = new ConsoleMessage(eventType, textTokens.join(' '), args, stackTraceLocations);
    this.emit("console" /* PageEmittedEvents.Console */, message);
}, _Page_onDialog = function _Page_onDialog(event) {
    let dialogType = null;
    const validDialogTypes = new Set([
        'alert',
        'confirm',
        'prompt',
        'beforeunload',
    ]);
    if (validDialogTypes.has(event.type)) {
        dialogType = event.type;
    }
    assert(dialogType, 'Unknown javascript dialog type: ' + event.type);
    const dialog = new Dialog(Page_classPrivateFieldGet(this, _Page_client, "f"), dialogType, event.message, event.defaultPrompt);
    this.emit("dialog" /* PageEmittedEvents.Dialog */, dialog);
}, _Page_resetDefaultBackgroundColor = 
/**
 * Resets default white background
 */
async function _Page_resetDefaultBackgroundColor() {
    await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setDefaultBackgroundColorOverride');
}, _Page_setTransparentBackgroundColor = 
/**
 * Hides default white background
 */
async function _Page_setTransparentBackgroundColor() {
    await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setDefaultBackgroundColorOverride', {
        color: { r: 0, g: 0, b: 0, a: 0 },
    });
}, _Page_sessionClosePromise = function _Page_sessionClosePromise() {
    if (!Page_classPrivateFieldGet(this, _Page_disconnectPromise, "f")) {
        Page_classPrivateFieldSet(this, _Page_disconnectPromise, new Promise((fulfill) => {
            return Page_classPrivateFieldGet(this, _Page_client, "f").once(CDPSessionEmittedEvents.Disconnected, () => {
                return fulfill(new Error('Target closed'));
            });
        }), "f");
    }
    return Page_classPrivateFieldGet(this, _Page_disconnectPromise, "f");
}, _Page_go = async function _Page_go(delta, options) {
    const history = await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.getNavigationHistory');
    const entry = history.entries[history.currentIndex + delta];
    if (!entry) {
        return null;
    }
    const result = await Promise.all([
        this.waitForNavigation(options),
        Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.navigateToHistoryEntry', { entryId: entry.id }),
    ]);
    return result[0];
}, _Page_screenshotTask = async function _Page_screenshotTask(format, options = {}) {
    await Page_classPrivateFieldGet(this, _Page_client, "f").send('Target.activateTarget', {
        targetId: Page_classPrivateFieldGet(this, _Page_target, "f")._targetId,
    });
    let clip = options.clip ? processClip(options.clip) : undefined;
    let { captureBeyondViewport = true } = options;
    captureBeyondViewport =
        typeof captureBeyondViewport === 'boolean' ? captureBeyondViewport : true;
    if (options.fullPage) {
        const metrics = await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.getLayoutMetrics');
        // Fallback to `contentSize` in case of using Firefox.
        const { width, height } = metrics.cssContentSize || metrics.contentSize;
        // Overwrite clip for full page.
        clip = { x: 0, y: 0, width, height, scale: 1 };
        if (!captureBeyondViewport) {
            const { isMobile = false, deviceScaleFactor = 1, isLandscape = false, } = Page_classPrivateFieldGet(this, _Page_viewport, "f") || {};
            const screenOrientation = isLandscape
                ? { angle: 90, type: 'landscapePrimary' }
                : { angle: 0, type: 'portraitPrimary' };
            await Page_classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setDeviceMetricsOverride', {
                mobile: isMobile,
                width,
                height,
                deviceScaleFactor,
                screenOrientation,
            });
        }
    }
    const shouldSetDefaultBackground = options.omitBackground && (format === 'png' || format === 'webp');
    if (shouldSetDefaultBackground) {
        await Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_setTransparentBackgroundColor).call(this);
    }
    const result = await Page_classPrivateFieldGet(this, _Page_client, "f").send('Page.captureScreenshot', {
        format,
        quality: options.quality,
        clip,
        captureBeyondViewport,
    });
    if (shouldSetDefaultBackground) {
        await Page_classPrivateFieldGet(this, _Page_instances, "m", _Page_resetDefaultBackgroundColor).call(this);
    }
    if (options.fullPage && Page_classPrivateFieldGet(this, _Page_viewport, "f")) {
        await this.setViewport(Page_classPrivateFieldGet(this, _Page_viewport, "f"));
    }
    const buffer = options.encoding === 'base64'
        ? result.data
        : Buffer.from(result.data, 'base64');
    if (options.path) {
        try {
            const fs = (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 19))).promises;
            await fs.writeFile(options.path, buffer);
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Screenshots can only be written to a file path in a Node-like environment.');
            }
            throw error;
        }
    }
    return buffer;
    function processClip(clip) {
        const x = Math.round(clip.x);
        const y = Math.round(clip.y);
        const width = Math.round(clip.width + clip.x - x);
        const height = Math.round(clip.height + clip.y - y);
        return { x, y, width, height, scale: 1 };
    }
};
const supportedMetrics = new Set([
    'Timestamp',
    'Documents',
    'Frames',
    'JSEventListeners',
    'Nodes',
    'LayoutCount',
    'RecalcStyleCount',
    'LayoutDuration',
    'RecalcStyleDuration',
    'ScriptDuration',
    'TaskDuration',
    'JSHeapUsedSize',
    'JSHeapTotalSize',
]);
const unitToPixels = {
    px: 1,
    in: 96,
    cm: 37.8,
    mm: 3.78,
};
function convertPrintParameterToInches(parameter) {
    if (typeof parameter === 'undefined') {
        return undefined;
    }
    let pixels;
    if (isNumber(parameter)) {
        // Treat numbers as pixel values to be aligned with phantom's paperSize.
        pixels = parameter;
    }
    else if (isString(parameter)) {
        const text = parameter;
        let unit = text.substring(text.length - 2).toLowerCase();
        let valueText = '';
        if (unit in unitToPixels) {
            valueText = text.substring(0, text.length - 2);
        }
        else {
            // In case of unknown unit try to parse the whole parameter as number of pixels.
            // This is consistent with phantom's paperSize behavior.
            unit = 'px';
            valueText = text;
        }
        const value = Number(valueText);
        assert(!isNaN(value), 'Failed to parse parameter value: ' + text);
        pixels = value * unitToPixels[unit];
    }
    else {
        throw new Error('page.pdf() Cannot handle parameter type: ' + typeof parameter);
    }
    return pixels / 96;
}
//# sourceMappingURL=Page.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Target.js
/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Target_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Target_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Target_browserContext, _Target_targetInfo, _Target_sessionFactory, _Target_ignoreHTTPSErrors, _Target_defaultViewport, _Target_pagePromise, _Target_workerPromise, _Target_screenshotTaskQueue;


/**
 * @public
 */
class Target {
    /**
     * @internal
     */
    constructor(targetInfo, browserContext, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue, isPageTargetCallback) {
        _Target_browserContext.set(this, void 0);
        _Target_targetInfo.set(this, void 0);
        _Target_sessionFactory.set(this, void 0);
        _Target_ignoreHTTPSErrors.set(this, void 0);
        _Target_defaultViewport.set(this, void 0);
        _Target_pagePromise.set(this, void 0);
        _Target_workerPromise.set(this, void 0);
        _Target_screenshotTaskQueue.set(this, void 0);
        Target_classPrivateFieldSet(this, _Target_targetInfo, targetInfo, "f");
        Target_classPrivateFieldSet(this, _Target_browserContext, browserContext, "f");
        this._targetId = targetInfo.targetId;
        Target_classPrivateFieldSet(this, _Target_sessionFactory, sessionFactory, "f");
        Target_classPrivateFieldSet(this, _Target_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
        Target_classPrivateFieldSet(this, _Target_defaultViewport, defaultViewport !== null && defaultViewport !== void 0 ? defaultViewport : undefined, "f");
        Target_classPrivateFieldSet(this, _Target_screenshotTaskQueue, screenshotTaskQueue, "f");
        this._isPageTargetCallback = isPageTargetCallback;
        this._initializedPromise = new Promise((fulfill) => {
            return (this._initializedCallback = fulfill);
        }).then(async (success) => {
            if (!success) {
                return false;
            }
            const opener = this.opener();
            if (!opener || !Target_classPrivateFieldGet(opener, _Target_pagePromise, "f") || this.type() !== 'page') {
                return true;
            }
            const openerPage = await Target_classPrivateFieldGet(opener, _Target_pagePromise, "f");
            if (!openerPage.listenerCount("popup" /* PageEmittedEvents.Popup */)) {
                return true;
            }
            const popupPage = await this.page();
            openerPage.emit("popup" /* PageEmittedEvents.Popup */, popupPage);
            return true;
        });
        this._isClosedPromise = new Promise((fulfill) => {
            return (this._closedCallback = fulfill);
        });
        this._isInitialized =
            !this._isPageTargetCallback(Target_classPrivateFieldGet(this, _Target_targetInfo, "f")) ||
                Target_classPrivateFieldGet(this, _Target_targetInfo, "f").url !== '';
        if (this._isInitialized) {
            this._initializedCallback(true);
        }
    }
    /**
     * Creates a Chrome Devtools Protocol session attached to the target.
     */
    createCDPSession() {
        return Target_classPrivateFieldGet(this, _Target_sessionFactory, "f").call(this);
    }
    /**
     * @internal
     */
    _getTargetInfo() {
        return Target_classPrivateFieldGet(this, _Target_targetInfo, "f");
    }
    /**
     * If the target is not of type `"page"` or `"background_page"`, returns `null`.
     */
    async page() {
        var _a;
        if (this._isPageTargetCallback(Target_classPrivateFieldGet(this, _Target_targetInfo, "f")) && !Target_classPrivateFieldGet(this, _Target_pagePromise, "f")) {
            Target_classPrivateFieldSet(this, _Target_pagePromise, Target_classPrivateFieldGet(this, _Target_sessionFactory, "f").call(this).then((client) => {
                var _a;
                return Page._create(client, this, Target_classPrivateFieldGet(this, _Target_ignoreHTTPSErrors, "f"), (_a = Target_classPrivateFieldGet(this, _Target_defaultViewport, "f")) !== null && _a !== void 0 ? _a : null, Target_classPrivateFieldGet(this, _Target_screenshotTaskQueue, "f"));
            }), "f");
        }
        return (_a = (await Target_classPrivateFieldGet(this, _Target_pagePromise, "f"))) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.
     */
    async worker() {
        if (Target_classPrivateFieldGet(this, _Target_targetInfo, "f").type !== 'service_worker' &&
            Target_classPrivateFieldGet(this, _Target_targetInfo, "f").type !== 'shared_worker') {
            return null;
        }
        if (!Target_classPrivateFieldGet(this, _Target_workerPromise, "f")) {
            // TODO(einbinder): Make workers send their console logs.
            Target_classPrivateFieldSet(this, _Target_workerPromise, Target_classPrivateFieldGet(this, _Target_sessionFactory, "f").call(this).then((client) => {
                return new WebWorker(client, Target_classPrivateFieldGet(this, _Target_targetInfo, "f").url, () => { } /* consoleAPICalled */, () => { } /* exceptionThrown */);
            }), "f");
        }
        return Target_classPrivateFieldGet(this, _Target_workerPromise, "f");
    }
    url() {
        return Target_classPrivateFieldGet(this, _Target_targetInfo, "f").url;
    }
    /**
     * Identifies what kind of target this is.
     *
     * @remarks
     *
     * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
     */
    type() {
        const type = Target_classPrivateFieldGet(this, _Target_targetInfo, "f").type;
        if (type === 'page' ||
            type === 'background_page' ||
            type === 'service_worker' ||
            type === 'shared_worker' ||
            type === 'browser' ||
            type === 'webview') {
            return type;
        }
        return 'other';
    }
    /**
     * Get the browser the target belongs to.
     */
    browser() {
        return Target_classPrivateFieldGet(this, _Target_browserContext, "f").browser();
    }
    /**
     * Get the browser context the target belongs to.
     */
    browserContext() {
        return Target_classPrivateFieldGet(this, _Target_browserContext, "f");
    }
    /**
     * Get the target that opened this target. Top-level targets return `null`.
     */
    opener() {
        const { openerId } = Target_classPrivateFieldGet(this, _Target_targetInfo, "f");
        if (!openerId) {
            return;
        }
        return this.browser()._targets.get(openerId);
    }
    /**
     * @internal
     */
    _targetInfoChanged(targetInfo) {
        Target_classPrivateFieldSet(this, _Target_targetInfo, targetInfo, "f");
        if (!this._isInitialized &&
            (!this._isPageTargetCallback(Target_classPrivateFieldGet(this, _Target_targetInfo, "f")) ||
                Target_classPrivateFieldGet(this, _Target_targetInfo, "f").url !== '')) {
            this._isInitialized = true;
            this._initializedCallback(true);
            return;
        }
    }
}
_Target_browserContext = new WeakMap(), _Target_targetInfo = new WeakMap(), _Target_sessionFactory = new WeakMap(), _Target_ignoreHTTPSErrors = new WeakMap(), _Target_defaultViewport = new WeakMap(), _Target_pagePromise = new WeakMap(), _Target_workerPromise = new WeakMap(), _Target_screenshotTaskQueue = new WeakMap();
//# sourceMappingURL=Target.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/TaskQueue.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TaskQueue_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var TaskQueue_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskQueue_chain;
class TaskQueue {
    constructor() {
        _TaskQueue_chain.set(this, void 0);
        TaskQueue_classPrivateFieldSet(this, _TaskQueue_chain, Promise.resolve(), "f");
    }
    postTask(task) {
        const result = TaskQueue_classPrivateFieldGet(this, _TaskQueue_chain, "f").then(task);
        TaskQueue_classPrivateFieldSet(this, _TaskQueue_chain, result.then(() => {
            return undefined;
        }, () => {
            return undefined;
        }), "f");
        return result;
    }
}
_TaskQueue_chain = new WeakMap();
//# sourceMappingURL=TaskQueue.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Browser.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Browser_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Browser_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Browser_instances, _Browser_ignoreHTTPSErrors, _Browser_defaultViewport, _Browser_process, _Browser_connection, _Browser_closeCallback, _Browser_targetFilterCallback, _Browser_isPageTargetCallback, _Browser_defaultContext, _Browser_contexts, _Browser_screenshotTaskQueue, _Browser_targets, _Browser_ignoredTargets, _Browser_setIsPageTargetCallback, _Browser_targetCreated, _Browser_targetDestroyed, _Browser_targetInfoChanged, _Browser_getVersion, _BrowserContext_connection, _BrowserContext_browser, _BrowserContext_id;






const WEB_PERMISSION_TO_PROTOCOL_PERMISSION = new Map([
    ['geolocation', 'geolocation'],
    ['midi', 'midi'],
    ['notifications', 'notifications'],
    // TODO: push isn't a valid type?
    // ['push', 'push'],
    ['camera', 'videoCapture'],
    ['microphone', 'audioCapture'],
    ['background-sync', 'backgroundSync'],
    ['ambient-light-sensor', 'sensors'],
    ['accelerometer', 'sensors'],
    ['gyroscope', 'sensors'],
    ['magnetometer', 'sensors'],
    ['accessibility-events', 'accessibilityEvents'],
    ['clipboard-read', 'clipboardReadWrite'],
    ['clipboard-write', 'clipboardReadWrite'],
    ['payment-handler', 'paymentHandler'],
    ['persistent-storage', 'durableStorage'],
    ['idle-detection', 'idleDetection'],
    // chrome-specific permissions we have.
    ['midi-sysex', 'midiSysex'],
]);
/**
 * A Browser is created when Puppeteer connects to a Chromium instance, either through
 * {@link PuppeteerNode.launch} or {@link Puppeteer.connect}.
 *
 * @remarks
 *
 * The Browser class extends from Puppeteer's {@link EventEmitter} class and will
 * emit various events which are documented in the {@link BrowserEmittedEvents} enum.
 *
 * @example
 *
 * An example of using a {@link Browser} to create a {@link Page}:
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://example.com');
 *   await browser.close();
 * })();
 * ```
 *
 * @example
 *
 * An example of disconnecting from and reconnecting to a {@link Browser}:
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   // Store the endpoint to be able to reconnect to Chromium
 *   const browserWSEndpoint = browser.wsEndpoint();
 *   // Disconnect puppeteer from Chromium
 *   browser.disconnect();
 *
 *   // Use the endpoint to reestablish a connection
 *   const browser2 = await puppeteer.connect({browserWSEndpoint});
 *   // Close Chromium
 *   await browser2.close();
 * })();
 * ```
 *
 * @public
 */
class Browser extends EventEmitter {
    /**
     * @internal
     */
    constructor(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback, targetFilterCallback, isPageTargetCallback) {
        super();
        _Browser_instances.add(this);
        _Browser_ignoreHTTPSErrors.set(this, void 0);
        _Browser_defaultViewport.set(this, void 0);
        _Browser_process.set(this, void 0);
        _Browser_connection.set(this, void 0);
        _Browser_closeCallback.set(this, void 0);
        _Browser_targetFilterCallback.set(this, void 0);
        _Browser_isPageTargetCallback.set(this, void 0);
        _Browser_defaultContext.set(this, void 0);
        _Browser_contexts.set(this, void 0);
        _Browser_screenshotTaskQueue.set(this, void 0);
        _Browser_targets.set(this, void 0);
        _Browser_ignoredTargets.set(this, new Set());
        Browser_classPrivateFieldSet(this, _Browser_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
        Browser_classPrivateFieldSet(this, _Browser_defaultViewport, defaultViewport, "f");
        Browser_classPrivateFieldSet(this, _Browser_process, process, "f");
        Browser_classPrivateFieldSet(this, _Browser_screenshotTaskQueue, new TaskQueue(), "f");
        Browser_classPrivateFieldSet(this, _Browser_connection, connection, "f");
        Browser_classPrivateFieldSet(this, _Browser_closeCallback, closeCallback || function () { }, "f");
        Browser_classPrivateFieldSet(this, _Browser_targetFilterCallback, targetFilterCallback ||
            (() => {
                return true;
            }), "f");
        Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_setIsPageTargetCallback).call(this, isPageTargetCallback);
        Browser_classPrivateFieldSet(this, _Browser_defaultContext, new BrowserContext(Browser_classPrivateFieldGet(this, _Browser_connection, "f"), this), "f");
        Browser_classPrivateFieldSet(this, _Browser_contexts, new Map(), "f");
        for (const contextId of contextIds) {
            Browser_classPrivateFieldGet(this, _Browser_contexts, "f").set(contextId, new BrowserContext(Browser_classPrivateFieldGet(this, _Browser_connection, "f"), this, contextId));
        }
        Browser_classPrivateFieldSet(this, _Browser_targets, new Map(), "f");
        Browser_classPrivateFieldGet(this, _Browser_connection, "f").on(ConnectionEmittedEvents.Disconnected, () => {
            return this.emit("disconnected" /* BrowserEmittedEvents.Disconnected */);
        });
        Browser_classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetCreated', Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetCreated).bind(this));
        Browser_classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetDestroyed', Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetDestroyed).bind(this));
        Browser_classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetInfoChanged', Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetInfoChanged).bind(this));
    }
    /**
     * @internal
     */
    static async _create(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback, targetFilterCallback, isPageTargetCallback) {
        const browser = new Browser(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback, targetFilterCallback, isPageTargetCallback);
        await connection.send('Target.setDiscoverTargets', { discover: true });
        return browser;
    }
    /**
     * @internal
     */
    get _targets() {
        return Browser_classPrivateFieldGet(this, _Browser_targets, "f");
    }
    /**
     * The spawned browser process. Returns `null` if the browser instance was created with
     * {@link Puppeteer.connect}.
     */
    process() {
        var _a;
        return (_a = Browser_classPrivateFieldGet(this, _Browser_process, "f")) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * @internal
     */
    _getIsPageTargetCallback() {
        return Browser_classPrivateFieldGet(this, _Browser_isPageTargetCallback, "f");
    }
    /**
     * Creates a new incognito browser context. This won't share cookies/cache with other
     * browser contexts.
     *
     * @example
     * ```js
     * (async () => {
     *  const browser = await puppeteer.launch();
     *   // Create a new incognito browser context.
     *   const context = await browser.createIncognitoBrowserContext();
     *   // Create a new page in a pristine context.
     *   const page = await context.newPage();
     *   // Do stuff
     *   await page.goto('https://example.com');
     * })();
     * ```
     */
    async createIncognitoBrowserContext(options = {}) {
        const { proxyServer, proxyBypassList } = options;
        const { browserContextId } = await Browser_classPrivateFieldGet(this, _Browser_connection, "f").send('Target.createBrowserContext', {
            proxyServer,
            proxyBypassList: proxyBypassList && proxyBypassList.join(','),
        });
        const context = new BrowserContext(Browser_classPrivateFieldGet(this, _Browser_connection, "f"), this, browserContextId);
        Browser_classPrivateFieldGet(this, _Browser_contexts, "f").set(browserContextId, context);
        return context;
    }
    /**
     * Returns an array of all open browser contexts. In a newly created browser, this will
     * return a single instance of {@link BrowserContext}.
     */
    browserContexts() {
        return [Browser_classPrivateFieldGet(this, _Browser_defaultContext, "f"), ...Array.from(Browser_classPrivateFieldGet(this, _Browser_contexts, "f").values())];
    }
    /**
     * Returns the default browser context. The default browser context cannot be closed.
     */
    defaultBrowserContext() {
        return Browser_classPrivateFieldGet(this, _Browser_defaultContext, "f");
    }
    /**
     * @internal
     */
    async _disposeContext(contextId) {
        if (!contextId) {
            return;
        }
        await Browser_classPrivateFieldGet(this, _Browser_connection, "f").send('Target.disposeBrowserContext', {
            browserContextId: contextId,
        });
        Browser_classPrivateFieldGet(this, _Browser_contexts, "f").delete(contextId);
    }
    /**
     * The browser websocket endpoint which can be used as an argument to
     * {@link Puppeteer.connect}.
     *
     * @returns The Browser websocket url.
     *
     * @remarks
     *
     * The format is `ws://${host}:${port}/devtools/browser/<id>`.
     *
     * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
     * Learn more about the
     * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
     * the {@link
     * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
     * | browser endpoint}.
     */
    wsEndpoint() {
        return Browser_classPrivateFieldGet(this, _Browser_connection, "f").url();
    }
    /**
     * Promise which resolves to a new {@link Page} object. The Page is created in
     * a default browser context.
     */
    async newPage() {
        return Browser_classPrivateFieldGet(this, _Browser_defaultContext, "f").newPage();
    }
    /**
     * @internal
     */
    async _createPageInContext(contextId) {
        const { targetId } = await Browser_classPrivateFieldGet(this, _Browser_connection, "f").send('Target.createTarget', {
            url: 'about:blank',
            browserContextId: contextId || undefined,
        });
        const target = Browser_classPrivateFieldGet(this, _Browser_targets, "f").get(targetId);
        if (!target) {
            throw new Error(`Missing target for page (id = ${targetId})`);
        }
        const initialized = await target._initializedPromise;
        if (!initialized) {
            throw new Error(`Failed to create target for page (id = ${targetId})`);
        }
        const page = await target.page();
        if (!page) {
            throw new Error(`Failed to create a page for context (id = ${contextId})`);
        }
        return page;
    }
    /**
     * All active targets inside the Browser. In case of multiple browser contexts, returns
     * an array with all the targets in all browser contexts.
     */
    targets() {
        return Array.from(Browser_classPrivateFieldGet(this, _Browser_targets, "f").values()).filter((target) => {
            return target._isInitialized;
        });
    }
    /**
     * The target associated with the browser.
     */
    target() {
        const browserTarget = this.targets().find((target) => {
            return target.type() === 'browser';
        });
        if (!browserTarget) {
            throw new Error('Browser target is not found');
        }
        return browserTarget;
    }
    /**
     * Searches for a target in all browser contexts.
     *
     * @param predicate - A function to be run for every target.
     * @returns The first target found that matches the `predicate` function.
     *
     * @example
     *
     * An example of finding a target for a page opened via `window.open`:
     * ```js
     * await page.evaluate(() => window.open('https://www.example.com/'));
     * const newWindowTarget = await browser.waitForTarget(target => target.url() === 'https://www.example.com/');
     * ```
     */
    async waitForTarget(predicate, options = {}) {
        const { timeout = 30000 } = options;
        let resolve;
        let isResolved = false;
        const targetPromise = new Promise((x) => {
            return (resolve = x);
        });
        this.on("targetcreated" /* BrowserEmittedEvents.TargetCreated */, check);
        this.on("targetchanged" /* BrowserEmittedEvents.TargetChanged */, check);
        try {
            if (!timeout) {
                return await targetPromise;
            }
            this.targets().forEach(check);
            return await waitWithTimeout(targetPromise, 'target', timeout);
        }
        finally {
            this.off("targetcreated" /* BrowserEmittedEvents.TargetCreated */, check);
            this.off("targetchanged" /* BrowserEmittedEvents.TargetChanged */, check);
        }
        async function check(target) {
            if ((await predicate(target)) && !isResolved) {
                isResolved = true;
                resolve(target);
            }
        }
    }
    /**
     * An array of all open pages inside the Browser.
     *
     * @remarks
     *
     * In case of multiple browser contexts, returns an array with all the pages in all
     * browser contexts. Non-visible pages, such as `"background_page"`, will not be listed
     * here. You can find them using {@link Target.page}.
     */
    async pages() {
        const contextPages = await Promise.all(this.browserContexts().map((context) => {
            return context.pages();
        }));
        // Flatten array.
        return contextPages.reduce((acc, x) => {
            return acc.concat(x);
        }, []);
    }
    /**
     * A string representing the browser name and version.
     *
     * @remarks
     *
     * For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For
     * non-headless, this is similar to `Chrome/61.0.3153.0`.
     *
     * The format of browser.version() might change with future releases of Chromium.
     */
    async version() {
        const version = await Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_getVersion).call(this);
        return version.product;
    }
    /**
     * The browser's original user agent. Pages can override the browser user agent with
     * {@link Page.setUserAgent}.
     */
    async userAgent() {
        const version = await Browser_classPrivateFieldGet(this, _Browser_instances, "m", _Browser_getVersion).call(this);
        return version.userAgent;
    }
    /**
     * Closes Chromium and all of its pages (if any were opened). The {@link Browser} object
     * itself is considered to be disposed and cannot be used anymore.
     */
    async close() {
        await Browser_classPrivateFieldGet(this, _Browser_closeCallback, "f").call(null);
        this.disconnect();
    }
    /**
     * Disconnects Puppeteer from the browser, but leaves the Chromium process running.
     * After calling `disconnect`, the {@link Browser} object is considered disposed and
     * cannot be used anymore.
     */
    disconnect() {
        Browser_classPrivateFieldGet(this, _Browser_connection, "f").dispose();
    }
    /**
     * Indicates that the browser is connected.
     */
    isConnected() {
        return !Browser_classPrivateFieldGet(this, _Browser_connection, "f")._closed;
    }
}
_Browser_ignoreHTTPSErrors = new WeakMap(), _Browser_defaultViewport = new WeakMap(), _Browser_process = new WeakMap(), _Browser_connection = new WeakMap(), _Browser_closeCallback = new WeakMap(), _Browser_targetFilterCallback = new WeakMap(), _Browser_isPageTargetCallback = new WeakMap(), _Browser_defaultContext = new WeakMap(), _Browser_contexts = new WeakMap(), _Browser_screenshotTaskQueue = new WeakMap(), _Browser_targets = new WeakMap(), _Browser_ignoredTargets = new WeakMap(), _Browser_instances = new WeakSet(), _Browser_setIsPageTargetCallback = function _Browser_setIsPageTargetCallback(isPageTargetCallback) {
    Browser_classPrivateFieldSet(this, _Browser_isPageTargetCallback, isPageTargetCallback ||
        ((target) => {
            return (target.type === 'page' ||
                target.type === 'background_page' ||
                target.type === 'webview');
        }), "f");
}, _Browser_targetCreated = async function _Browser_targetCreated(event) {
    var _a;
    const targetInfo = event.targetInfo;
    const { browserContextId } = targetInfo;
    const context = browserContextId && Browser_classPrivateFieldGet(this, _Browser_contexts, "f").has(browserContextId)
        ? Browser_classPrivateFieldGet(this, _Browser_contexts, "f").get(browserContextId)
        : Browser_classPrivateFieldGet(this, _Browser_defaultContext, "f");
    if (!context) {
        throw new Error('Missing browser context');
    }
    const shouldAttachToTarget = Browser_classPrivateFieldGet(this, _Browser_targetFilterCallback, "f").call(this, targetInfo);
    if (!shouldAttachToTarget) {
        Browser_classPrivateFieldGet(this, _Browser_ignoredTargets, "f").add(targetInfo.targetId);
        return;
    }
    const target = new Target(targetInfo, context, () => {
        return Browser_classPrivateFieldGet(this, _Browser_connection, "f").createSession(targetInfo);
    }, Browser_classPrivateFieldGet(this, _Browser_ignoreHTTPSErrors, "f"), (_a = Browser_classPrivateFieldGet(this, _Browser_defaultViewport, "f")) !== null && _a !== void 0 ? _a : null, Browser_classPrivateFieldGet(this, _Browser_screenshotTaskQueue, "f"), Browser_classPrivateFieldGet(this, _Browser_isPageTargetCallback, "f"));
    assert(!Browser_classPrivateFieldGet(this, _Browser_targets, "f").has(event.targetInfo.targetId), 'Target should not exist before targetCreated');
    Browser_classPrivateFieldGet(this, _Browser_targets, "f").set(event.targetInfo.targetId, target);
    if (await target._initializedPromise) {
        this.emit("targetcreated" /* BrowserEmittedEvents.TargetCreated */, target);
        context.emit("targetcreated" /* BrowserContextEmittedEvents.TargetCreated */, target);
    }
}, _Browser_targetDestroyed = async function _Browser_targetDestroyed(event) {
    if (Browser_classPrivateFieldGet(this, _Browser_ignoredTargets, "f").has(event.targetId)) {
        return;
    }
    const target = Browser_classPrivateFieldGet(this, _Browser_targets, "f").get(event.targetId);
    if (!target) {
        throw new Error(`Missing target in _targetDestroyed (id = ${event.targetId})`);
    }
    target._initializedCallback(false);
    Browser_classPrivateFieldGet(this, _Browser_targets, "f").delete(event.targetId);
    target._closedCallback();
    if (await target._initializedPromise) {
        this.emit("targetdestroyed" /* BrowserEmittedEvents.TargetDestroyed */, target);
        target
            .browserContext()
            .emit("targetdestroyed" /* BrowserContextEmittedEvents.TargetDestroyed */, target);
    }
}, _Browser_targetInfoChanged = function _Browser_targetInfoChanged(event) {
    if (Browser_classPrivateFieldGet(this, _Browser_ignoredTargets, "f").has(event.targetInfo.targetId)) {
        return;
    }
    const target = Browser_classPrivateFieldGet(this, _Browser_targets, "f").get(event.targetInfo.targetId);
    if (!target) {
        throw new Error(`Missing target in targetInfoChanged (id = ${event.targetInfo.targetId})`);
    }
    const previousURL = target.url();
    const wasInitialized = target._isInitialized;
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
        this.emit("targetchanged" /* BrowserEmittedEvents.TargetChanged */, target);
        target
            .browserContext()
            .emit("targetchanged" /* BrowserContextEmittedEvents.TargetChanged */, target);
    }
}, _Browser_getVersion = function _Browser_getVersion() {
    return Browser_classPrivateFieldGet(this, _Browser_connection, "f").send('Browser.getVersion');
};
/**
 * BrowserContexts provide a way to operate multiple independent browser
 * sessions. When a browser is launched, it has a single BrowserContext used by
 * default. The method {@link Browser.newPage | Browser.newPage} creates a page
 * in the default browser context.
 *
 * @remarks
 *
 * The Browser class extends from Puppeteer's {@link EventEmitter} class and
 * will emit various events which are documented in the
 * {@link BrowserContextEmittedEvents} enum.
 *
 * If a page opens another page, e.g. with a `window.open` call, the popup will
 * belong to the parent page's browser context.
 *
 * Puppeteer allows creation of "incognito" browser contexts with
 * {@link Browser.createIncognitoBrowserContext | Browser.createIncognitoBrowserContext}
 * method. "Incognito" browser contexts don't write any browsing data to disk.
 *
 * @example
 * ```js
 * // Create a new incognito browser context
 * const context = await browser.createIncognitoBrowserContext();
 * // Create a new page inside context.
 * const page = await context.newPage();
 * // ... do stuff with page ...
 * await page.goto('https://example.com');
 * // Dispose context once it's no longer needed.
 * await context.close();
 * ```
 * @public
 */
class BrowserContext extends EventEmitter {
    /**
     * @internal
     */
    constructor(connection, browser, contextId) {
        super();
        _BrowserContext_connection.set(this, void 0);
        _BrowserContext_browser.set(this, void 0);
        _BrowserContext_id.set(this, void 0);
        Browser_classPrivateFieldSet(this, _BrowserContext_connection, connection, "f");
        Browser_classPrivateFieldSet(this, _BrowserContext_browser, browser, "f");
        Browser_classPrivateFieldSet(this, _BrowserContext_id, contextId, "f");
    }
    /**
     * An array of all active targets inside the browser context.
     */
    targets() {
        return Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f").targets().filter((target) => {
            return target.browserContext() === this;
        });
    }
    /**
     * This searches for a target in this specific browser context.
     *
     * @example
     * An example of finding a target for a page opened via `window.open`:
     * ```js
     * await page.evaluate(() => window.open('https://www.example.com/'));
     * const newWindowTarget = await browserContext.waitForTarget(target => target.url() === 'https://www.example.com/');
     * ```
     *
     * @param predicate - A function to be run for every target
     * @param options - An object of options. Accepts a timout,
     * which is the maximum wait time in milliseconds.
     * Pass `0` to disable the timeout. Defaults to 30 seconds.
     * @returns Promise which resolves to the first target found
     * that matches the `predicate` function.
     */
    waitForTarget(predicate, options = {}) {
        return Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f").waitForTarget((target) => {
            return target.browserContext() === this && predicate(target);
        }, options);
    }
    /**
     * An array of all pages inside the browser context.
     *
     * @returns Promise which resolves to an array of all open pages.
     * Non visible pages, such as `"background_page"`, will not be listed here.
     * You can find them using {@link Target.page | the target page}.
     */
    async pages() {
        const pages = await Promise.all(this.targets()
            .filter((target) => {
            var _a;
            return (target.type() === 'page' ||
                (target.type() === 'other' &&
                    ((_a = Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f")._getIsPageTargetCallback()) === null || _a === void 0 ? void 0 : _a(target._getTargetInfo()))));
        })
            .map((target) => {
            return target.page();
        }));
        return pages.filter((page) => {
            return !!page;
        });
    }
    /**
     * Returns whether BrowserContext is incognito.
     * The default browser context is the only non-incognito browser context.
     *
     * @remarks
     * The default browser context cannot be closed.
     */
    isIncognito() {
        return !!Browser_classPrivateFieldGet(this, _BrowserContext_id, "f");
    }
    /**
     * @example
     * ```js
     * const context = browser.defaultBrowserContext();
     * await context.overridePermissions('https://html5demos.com', ['geolocation']);
     * ```
     *
     * @param origin - The origin to grant permissions to, e.g. "https://example.com".
     * @param permissions - An array of permissions to grant.
     * All permissions that are not listed here will be automatically denied.
     */
    async overridePermissions(origin, permissions) {
        const protocolPermissions = permissions.map((permission) => {
            const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
            if (!protocolPermission) {
                throw new Error('Unknown permission: ' + permission);
            }
            return protocolPermission;
        });
        await Browser_classPrivateFieldGet(this, _BrowserContext_connection, "f").send('Browser.grantPermissions', {
            origin,
            browserContextId: Browser_classPrivateFieldGet(this, _BrowserContext_id, "f") || undefined,
            permissions: protocolPermissions,
        });
    }
    /**
     * Clears all permission overrides for the browser context.
     *
     * @example
     * ```js
     * const context = browser.defaultBrowserContext();
     * context.overridePermissions('https://example.com', ['clipboard-read']);
     * // do stuff ..
     * context.clearPermissionOverrides();
     * ```
     */
    async clearPermissionOverrides() {
        await Browser_classPrivateFieldGet(this, _BrowserContext_connection, "f").send('Browser.resetPermissions', {
            browserContextId: Browser_classPrivateFieldGet(this, _BrowserContext_id, "f") || undefined,
        });
    }
    /**
     * Creates a new page in the browser context.
     */
    newPage() {
        return Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f")._createPageInContext(Browser_classPrivateFieldGet(this, _BrowserContext_id, "f"));
    }
    /**
     * The browser this browser context belongs to.
     */
    browser() {
        return Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f");
    }
    /**
     * Closes the browser context. All the targets that belong to the browser context
     * will be closed.
     *
     * @remarks
     * Only incognito browser contexts can be closed.
     */
    async close() {
        assert(Browser_classPrivateFieldGet(this, _BrowserContext_id, "f"), 'Non-incognito profiles cannot be closed!');
        await Browser_classPrivateFieldGet(this, _BrowserContext_browser, "f")._disposeContext(Browser_classPrivateFieldGet(this, _BrowserContext_id, "f"));
    }
}
_BrowserContext_connection = new WeakMap(), _BrowserContext_browser = new WeakMap(), _BrowserContext_id = new WeakMap();
//# sourceMappingURL=Browser.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/fetch.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* Use the global version if we're in the browser, else load the node-fetch module. */
const getFetch = async () => {
    return globalThis.fetch || (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 9031, 19))).fetch;
};
//# sourceMappingURL=fetch.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/BrowserConnector.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






const getWebSocketTransportClass = async () => {
    return isNode
        ? (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 2679))).NodeWebSocketTransport
        : (await __webpack_require__.e(/* import() */ 129).then(__webpack_require__.bind(__webpack_require__, 1129)))
            .BrowserWebSocketTransport;
};
/**
 * Users should never call this directly; it's called when calling
 * `puppeteer.connect`.
 *
 * @internal
 */
async function _connectToBrowser(options) {
    const { browserWSEndpoint, browserURL, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, transport, slowMo = 0, targetFilter, _isPageTarget: isPageTarget, } = options;
    assert(Number(!!browserWSEndpoint) + Number(!!browserURL) + Number(!!transport) ===
        1, 'Exactly one of browserWSEndpoint, browserURL or transport must be passed to puppeteer.connect');
    let connection;
    if (transport) {
        connection = new Connection('', transport, slowMo);
    }
    else if (browserWSEndpoint) {
        const WebSocketClass = await getWebSocketTransportClass();
        const connectionTransport = await WebSocketClass.create(browserWSEndpoint);
        connection = new Connection(browserWSEndpoint, connectionTransport, slowMo);
    }
    else if (browserURL) {
        const connectionURL = await getWSEndpoint(browserURL);
        const WebSocketClass = await getWebSocketTransportClass();
        const connectionTransport = await WebSocketClass.create(connectionURL);
        connection = new Connection(connectionURL, connectionTransport, slowMo);
    }
    const { browserContextIds } = await connection.send('Target.getBrowserContexts');
    return Browser._create(connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, undefined, () => {
        return connection.send('Browser.close').catch(debugError);
    }, targetFilter, isPageTarget);
}
async function getWSEndpoint(browserURL) {
    const endpointURL = new URL('/json/version', browserURL);
    const fetch = await getFetch();
    try {
        const result = await fetch(endpointURL.toString(), {
            method: 'GET',
        });
        if (!result.ok) {
            throw new Error(`HTTP ${result.statusText}`);
        }
        const data = await result.json();
        return data.webSocketDebuggerUrl;
    }
    catch (error) {
        if (isErrorLike(error)) {
            error.message =
                `Failed to fetch browser webSocket URL from ${endpointURL}: ` +
                    error.message;
        }
        throw error;
    }
}
//# sourceMappingURL=BrowserConnector.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/NetworkConditions.js
/**
 * Copyright 2021 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @public
 */
const networkConditions = {
    'Slow 3G': {
        download: ((500 * 1000) / 8) * 0.8,
        upload: ((500 * 1000) / 8) * 0.8,
        latency: 400 * 5,
    },
    'Fast 3G': {
        download: ((1.6 * 1000 * 1000) / 8) * 0.9,
        upload: ((750 * 1000) / 8) * 0.9,
        latency: 150 * 3.75,
    },
};
//# sourceMappingURL=NetworkConditions.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/common/Puppeteer.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * The main Puppeteer class.
 *
 * IMPORTANT: if you are using Puppeteer in a Node environment, you will get an
 * instance of {@link PuppeteerNode} when you import or require `puppeteer`.
 * That class extends `Puppeteer`, so has all the methods documented below as
 * well as all that are defined on {@link PuppeteerNode}.
 * @public
 */
class Puppeteer {
    /**
     * @internal
     */
    constructor(settings) {
        this._changedProduct = false;
        this._isPuppeteerCore = settings.isPuppeteerCore;
        this.connect = this.connect.bind(this);
        this.registerCustomQueryHandler =
            this.registerCustomQueryHandler.bind(this);
        this.unregisterCustomQueryHandler =
            this.unregisterCustomQueryHandler.bind(this);
        this.customQueryHandlerNames = this.customQueryHandlerNames.bind(this);
        this.clearCustomQueryHandlers = this.clearCustomQueryHandlers.bind(this);
    }
    /**
     * This method attaches Puppeteer to an existing browser instance.
     *
     * @remarks
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns Promise which resolves to browser instance.
     */
    connect(options) {
        return _connectToBrowser(options);
    }
    /**
     * @remarks
     * A list of devices to be used with `page.emulate(options)`. Actual list of devices can be found in {@link https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts | src/common/DeviceDescriptors.ts}.
     *
     * @example
     *
     * ```js
     * const puppeteer = require('puppeteer');
     * const iPhone = puppeteer.devices['iPhone 6'];
     *
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   await page.emulate(iPhone);
     *   await page.goto('https://www.google.com');
     *   // other actions...
     *   await browser.close();
     * })();
     * ```
     *
     */
    get devices() {
        return _devicesMap;
    }
    /**
     * @remarks
     *
     * Puppeteer methods might throw errors if they are unable to fulfill a request.
     * For example, `page.waitForSelector(selector[, options])` might fail if
     * the selector doesn't match any nodes during the given timeframe.
     *
     * For certain types of errors Puppeteer uses specific error classes.
     * These classes are available via `puppeteer.errors`.
     *
     * @example
     * An example of handling a timeout error:
     * ```js
     * try {
     *   await page.waitForSelector('.foo');
     * } catch (e) {
     *   if (e instanceof puppeteer.errors.TimeoutError) {
     *     // Do something if this is a timeout.
     *   }
     * }
     * ```
     */
    get errors() {
        return puppeteerErrors;
    }
    /**
     * @remarks
     * Returns a list of network conditions to be used with `page.emulateNetworkConditions(networkConditions)`. Actual list of predefined conditions can be found in {@link https://github.com/puppeteer/puppeteer/blob/main/src/common/NetworkConditions.ts | src/common/NetworkConditions.ts}.
     *
     * @example
     *
     * ```js
     * const puppeteer = require('puppeteer');
     * const slow3G = puppeteer.networkConditions['Slow 3G'];
     *
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   await page.emulateNetworkConditions(slow3G);
     *   await page.goto('https://www.google.com');
     *   // other actions...
     *   await browser.close();
     * })();
     * ```
     *
     */
    get networkConditions() {
        return networkConditions;
    }
    /**
     * Registers a {@link CustomQueryHandler | custom query handler}. After
     * registration, the handler can be used everywhere where a selector is
     * expected by prepending the selection string with `<name>/`. The name is
     * only allowed to consist of lower- and upper case latin letters.
     * @example
     * ```
     * puppeteer.registerCustomQueryHandler('text', { … });
     * const aHandle = await page.$('text/…');
     * ```
     * @param name - The name that the custom query handler will be registered under.
     * @param queryHandler - The {@link CustomQueryHandler | custom query handler} to
     * register.
     */
    registerCustomQueryHandler(name, queryHandler) {
        _registerCustomQueryHandler(name, queryHandler);
    }
    /**
     * @param name - The name of the query handler to unregistered.
     */
    unregisterCustomQueryHandler(name) {
        _unregisterCustomQueryHandler(name);
    }
    /**
     * @returns a list with the names of all registered custom query handlers.
     */
    customQueryHandlerNames() {
        return _customQueryHandlerNames();
    }
    /**
     * Clears all registered handlers.
     */
    clearCustomQueryHandlers() {
        _clearCustomQueryHandlers();
    }
}
//# sourceMappingURL=Puppeteer.js.map
// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(2037);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_namespaceObject = /*#__PURE__*/__webpack_require__.t(external_fs_, 2);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "https"
var external_https_ = __webpack_require__(5687);
// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(3685);
// EXTERNAL MODULE: external "extract-zip"
var external_extract_zip_ = __webpack_require__(8586);
// EXTERNAL MODULE: external "rimraf"
var external_rimraf_ = __webpack_require__(6076);
// EXTERNAL MODULE: external "https-proxy-agent"
var external_https_proxy_agent_ = __webpack_require__(3510);
// EXTERNAL MODULE: external "proxy-from-env"
var external_proxy_from_env_ = __webpack_require__(3149);
// EXTERNAL MODULE: external "tar-fs"
var external_tar_fs_ = __webpack_require__(5362);
// EXTERNAL MODULE: external "unbzip2-stream"
var external_unbzip2_stream_ = __webpack_require__(6550);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/BrowserFetcher.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BrowserFetcher_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var BrowserFetcher_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserFetcher_instances, _BrowserFetcher_product, _BrowserFetcher_downloadsFolder, _BrowserFetcher_downloadHost, _BrowserFetcher_platform, _BrowserFetcher_getFolderPath;

















const { PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM } = process.env;
const debugFetcher = debug('puppeteer:fetcher');
const downloadURLs = {
    chrome: {
        linux: '%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip',
        mac: '%s/chromium-browser-snapshots/Mac/%d/%s.zip',
        mac_arm: '%s/chromium-browser-snapshots/Mac_Arm/%d/%s.zip',
        win32: '%s/chromium-browser-snapshots/Win/%d/%s.zip',
        win64: '%s/chromium-browser-snapshots/Win_x64/%d/%s.zip',
    },
    firefox: {
        linux: '%s/firefox-%s.en-US.%s-x86_64.tar.bz2',
        mac: '%s/firefox-%s.en-US.%s.dmg',
        win32: '%s/firefox-%s.en-US.%s.zip',
        win64: '%s/firefox-%s.en-US.%s.zip',
    },
};
const browserConfig = {
    chrome: {
        host: 'https://storage.googleapis.com',
        destination: '.local-chromium',
    },
    firefox: {
        host: 'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central',
        destination: '.local-firefox',
    },
};
function archiveName(product, platform, revision) {
    switch (product) {
        case 'chrome':
            switch (platform) {
                case 'linux':
                    return 'chrome-linux';
                case 'mac_arm':
                case 'mac':
                    return 'chrome-mac';
                case 'win32':
                case 'win64':
                    // Windows archive name changed at r591479.
                    return parseInt(revision, 10) > 591479
                        ? 'chrome-win'
                        : 'chrome-win32';
            }
        case 'firefox':
            return platform;
    }
}
/**
 * @internal
 */
function _downloadURL(product, platform, host, revision) {
    const url = external_util_.format(downloadURLs[product][platform], host, revision, archiveName(product, platform, revision));
    return url;
}
function handleArm64() {
    let exists = external_fs_.existsSync('/usr/bin/chromium-browser');
    if (exists) {
        return;
    }
    exists = external_fs_.existsSync('/usr/bin/chromium');
    if (exists) {
        return;
    }
    console.error('The chromium binary is not available for arm64.' +
        '\nIf you are on Ubuntu, you can install with: ' +
        '\n\n sudo apt install chromium\n' +
        '\n\n sudo apt install chromium-browser\n');
    throw new Error();
}
const readdirAsync = (0,external_util_.promisify)(external_fs_.readdir.bind(external_fs_namespaceObject));
const mkdirAsync = (0,external_util_.promisify)(external_fs_.mkdir.bind(external_fs_namespaceObject));
const unlinkAsync = (0,external_util_.promisify)(external_fs_.unlink.bind(external_fs_namespaceObject));
const chmodAsync = (0,external_util_.promisify)(external_fs_.chmod.bind(external_fs_namespaceObject));
function existsAsync(filePath) {
    return new Promise((resolve) => {
        external_fs_.access(filePath, (err) => {
            return resolve(!err);
        });
    });
}
/**
 * BrowserFetcher can download and manage different versions of Chromium and Firefox.
 *
 * @remarks
 * BrowserFetcher operates on revision strings that specify a precise version of Chromium, e.g. `"533271"`. Revision strings can be obtained from {@link http://omahaproxy.appspot.com/ | omahaproxy.appspot.com}.
 * In the Firefox case, BrowserFetcher downloads Firefox Nightly and
 * operates on version numbers such as `"75"`.
 *
 * @example
 * An example of using BrowserFetcher to download a specific version of Chromium
 * and running Puppeteer against it:
 *
 * ```js
 * const browserFetcher = puppeteer.createBrowserFetcher();
 * const revisionInfo = await browserFetcher.download('533271');
 * const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
 * ```
 *
 * **NOTE** BrowserFetcher is not designed to work concurrently with other
 * instances of BrowserFetcher that share the same downloads directory.
 *
 * @public
 */
class BrowserFetcher {
    /**
     * @internal
     */
    constructor(projectRoot, options = {}) {
        _BrowserFetcher_instances.add(this);
        _BrowserFetcher_product.set(this, void 0);
        _BrowserFetcher_downloadsFolder.set(this, void 0);
        _BrowserFetcher_downloadHost.set(this, void 0);
        _BrowserFetcher_platform.set(this, void 0);
        BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_product, (options.product || 'chrome').toLowerCase(), "f");
        assert(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f") === 'chrome' || BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f") === 'firefox', `Unknown product: "${options.product}"`);
        BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_downloadsFolder, options.path ||
            external_path_.join(projectRoot, browserConfig[BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f")].destination), "f");
        BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_downloadHost, options.host || browserConfig[BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f")].host, "f");
        if (options.platform) {
            BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_platform, options.platform, "f");
        }
        else {
            const platform = external_os_.platform();
            switch (platform) {
                case 'darwin':
                    switch (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f")) {
                        case 'chrome':
                            BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_platform, external_os_.arch() === 'arm64' && PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM
                                ? 'mac_arm'
                                : 'mac', "f");
                            break;
                        case 'firefox':
                            BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_platform, 'mac', "f");
                            break;
                    }
                    break;
                case 'linux':
                    BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_platform, 'linux', "f");
                    break;
                case 'win32':
                    BrowserFetcher_classPrivateFieldSet(this, _BrowserFetcher_platform, external_os_.arch() === 'x64' ? 'win64' : 'win32', "f");
                    return;
                default:
                    assert(false, 'Unsupported platform: ' + platform);
            }
        }
        assert(downloadURLs[BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f")][BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f")], 'Unsupported platform: ' + BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"));
    }
    /**
     * @returns Returns the current `Platform`, which is one of `mac`, `linux`,
     * `win32` or `win64`.
     */
    platform() {
        return BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f");
    }
    /**
     * @returns Returns the current `Product`, which is one of `chrome` or
     * `firefox`.
     */
    product() {
        return BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f");
    }
    /**
     * @returns The download host being used.
     */
    host() {
        return BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadHost, "f");
    }
    /**
     * Initiates a HEAD request to check if the revision is available.
     * @remarks
     * This method is affected by the current `product`.
     * @param revision - The revision to check availability for.
     * @returns A promise that resolves to `true` if the revision could be downloaded
     * from the host.
     */
    canDownload(revision) {
        const url = _downloadURL(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadHost, "f"), revision);
        return new Promise((resolve) => {
            const request = httpRequest(url, 'HEAD', (response) => {
                resolve(response.statusCode === 200);
            }, false);
            request.on('error', (error) => {
                console.error(error);
                resolve(false);
            });
        });
    }
    /**
     * Initiates a GET request to download the revision from the host.
     * @remarks
     * This method is affected by the current `product`.
     * @param revision - The revision to download.
     * @param progressCallback - A function that will be called with two arguments:
     * How many bytes have been downloaded and the total number of bytes of the download.
     * @returns A promise with revision information when the revision is downloaded
     * and extracted.
     */
    async download(revision, progressCallback = () => { }) {
        const url = _downloadURL(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadHost, "f"), revision);
        const fileName = url.split('/').pop();
        assert(fileName, `A malformed download URL was found: ${url}.`);
        const archivePath = external_path_.join(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f"), fileName);
        const outputPath = BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
        if (await existsAsync(outputPath)) {
            return this.revisionInfo(revision);
        }
        if (!(await existsAsync(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f")))) {
            await mkdirAsync(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f"));
        }
        // Use system Chromium builds on Linux ARM devices
        if (external_os_.platform() !== 'darwin' && external_os_.arch() === 'arm64') {
            handleArm64();
            return;
        }
        try {
            await _downloadFile(url, archivePath, progressCallback);
            await install(archivePath, outputPath);
        }
        finally {
            if (await existsAsync(archivePath)) {
                await unlinkAsync(archivePath);
            }
        }
        const revisionInfo = this.revisionInfo(revision);
        if (revisionInfo) {
            await chmodAsync(revisionInfo.executablePath, 0o755);
        }
        return revisionInfo;
    }
    /**
     * @remarks
     * This method is affected by the current `product`.
     * @returns A promise with a list of all revision strings (for the current `product`)
     * available locally on disk.
     */
    async localRevisions() {
        if (!(await existsAsync(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f")))) {
            return [];
        }
        const fileNames = await readdirAsync(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f"));
        return fileNames
            .map((fileName) => {
            return parseFolderPath(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), fileName);
        })
            .filter((entry) => {
            var _a;
            return (_a = (entry && entry.platform === BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"))) !== null && _a !== void 0 ? _a : false;
        })
            .map((entry) => {
            return entry.revision;
        });
    }
    /**
     * @remarks
     * This method is affected by the current `product`.
     * @param revision - A revision to remove for the current `product`.
     * @returns A promise that resolves when the revision has been removes or
     * throws if the revision has not been downloaded.
     */
    async remove(revision) {
        const folderPath = BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
        assert(await existsAsync(folderPath), `Failed to remove: revision ${revision} is not downloaded`);
        await new Promise((fulfill) => {
            return external_rimraf_(folderPath, fulfill);
        });
    }
    /**
     * @param revision - The revision to get info for.
     * @returns The revision info for the given revision.
     */
    revisionInfo(revision) {
        const folderPath = BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
        let executablePath = '';
        if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f") === 'chrome') {
            if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'mac' || BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'mac_arm') {
                executablePath = external_path_.join(folderPath, archiveName(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), revision), 'Chromium.app', 'Contents', 'MacOS', 'Chromium');
            }
            else if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'linux') {
                executablePath = external_path_.join(folderPath, archiveName(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), revision), 'chrome');
            }
            else if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'win32' || BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'win64') {
                executablePath = external_path_.join(folderPath, archiveName(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), revision), 'chrome.exe');
            }
            else {
                throw new Error('Unsupported platform: ' + BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"));
            }
        }
        else if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f") === 'firefox') {
            if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'mac' || BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'mac_arm') {
                executablePath = external_path_.join(folderPath, 'Firefox Nightly.app', 'Contents', 'MacOS', 'firefox');
            }
            else if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'linux') {
                executablePath = external_path_.join(folderPath, 'firefox', 'firefox');
            }
            else if (BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'win32' || BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f") === 'win64') {
                executablePath = external_path_.join(folderPath, 'firefox', 'firefox.exe');
            }
            else {
                throw new Error('Unsupported platform: ' + BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"));
            }
        }
        else {
            throw new Error('Unsupported product: ' + BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"));
        }
        const url = _downloadURL(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f"), BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadHost, "f"), revision);
        const local = external_fs_.existsSync(folderPath);
        debugFetcher({
            revision,
            executablePath,
            folderPath,
            local,
            url,
            product: BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"),
        });
        return {
            revision,
            executablePath,
            folderPath,
            local,
            url,
            product: BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_product, "f"),
        };
    }
}
_BrowserFetcher_product = new WeakMap(), _BrowserFetcher_downloadsFolder = new WeakMap(), _BrowserFetcher_downloadHost = new WeakMap(), _BrowserFetcher_platform = new WeakMap(), _BrowserFetcher_instances = new WeakSet(), _BrowserFetcher_getFolderPath = function _BrowserFetcher_getFolderPath(revision) {
    return external_path_.resolve(BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_downloadsFolder, "f"), `${BrowserFetcher_classPrivateFieldGet(this, _BrowserFetcher_platform, "f")}-${revision}`);
};
function parseFolderPath(product, folderPath) {
    const name = external_path_.basename(folderPath);
    const splits = name.split('-');
    if (splits.length !== 2) {
        return;
    }
    const [platform, revision] = splits;
    if (!revision || !platform || !(platform in downloadURLs[product])) {
        return;
    }
    return { product, platform, revision };
}
/**
 * @internal
 */
function _downloadFile(url, destinationPath, progressCallback) {
    debugFetcher(`Downloading binary from ${url}`);
    let fulfill;
    let reject;
    const promise = new Promise((x, y) => {
        fulfill = x;
        reject = y;
    });
    let downloadedBytes = 0;
    let totalBytes = 0;
    const request = httpRequest(url, 'GET', (response) => {
        if (response.statusCode !== 200) {
            const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
            // consume response data to free up memory
            response.resume();
            reject(error);
            return;
        }
        const file = external_fs_.createWriteStream(destinationPath);
        file.on('finish', () => {
            return fulfill();
        });
        file.on('error', (error) => {
            return reject(error);
        });
        response.pipe(file);
        totalBytes = parseInt(response.headers['content-length'], 10);
        if (progressCallback) {
            response.on('data', onData);
        }
    });
    request.on('error', (error) => {
        return reject(error);
    });
    return promise;
    function onData(chunk) {
        downloadedBytes += chunk.length;
        progressCallback(downloadedBytes, totalBytes);
    }
}
function install(archivePath, folderPath) {
    debugFetcher(`Installing ${archivePath} to ${folderPath}`);
    if (archivePath.endsWith('.zip')) {
        return external_extract_zip_(archivePath, { dir: folderPath });
    }
    else if (archivePath.endsWith('.tar.bz2')) {
        return _extractTar(archivePath, folderPath);
    }
    else if (archivePath.endsWith('.dmg')) {
        return mkdirAsync(folderPath).then(() => {
            return _installDMG(archivePath, folderPath);
        });
    }
    else {
        throw new Error(`Unsupported archive format: ${archivePath}`);
    }
}
/**
 * @internal
 */
function _extractTar(tarPath, folderPath) {
    return new Promise((fulfill, reject) => {
        const tarStream = external_tar_fs_.extract(folderPath);
        tarStream.on('error', reject);
        tarStream.on('finish', fulfill);
        const readStream = external_fs_.createReadStream(tarPath);
        readStream.pipe(external_unbzip2_stream_()).pipe(tarStream);
    });
}
/**
 * @internal
 */
function _installDMG(dmgPath, folderPath) {
    let mountPath;
    return new Promise((fulfill, reject) => {
        const mountCommand = `hdiutil attach -nobrowse -noautoopen "${dmgPath}"`;
        external_child_process_.exec(mountCommand, (err, stdout) => {
            if (err) {
                return reject(err);
            }
            const volumes = stdout.match(/\/Volumes\/(.*)/m);
            if (!volumes) {
                return reject(new Error(`Could not find volume path in ${stdout}`));
            }
            mountPath = volumes[0];
            readdirAsync(mountPath)
                .then((fileNames) => {
                const appName = fileNames.find((item) => {
                    return typeof item === 'string' && item.endsWith('.app');
                });
                if (!appName) {
                    return reject(new Error(`Cannot find app in ${mountPath}`));
                }
                const copyPath = external_path_.join(mountPath, appName);
                debugFetcher(`Copying ${copyPath} to ${folderPath}`);
                external_child_process_.exec(`cp -R "${copyPath}" "${folderPath}"`, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fulfill();
                    }
                });
            })
                .catch(reject);
        });
    })
        .catch((error) => {
        console.error(error);
    })
        .finally(() => {
        if (!mountPath) {
            return;
        }
        const unmountCommand = `hdiutil detach "${mountPath}" -quiet`;
        debugFetcher(`Unmounting ${mountPath}`);
        external_child_process_.exec(unmountCommand, (err) => {
            if (err) {
                console.error(`Error unmounting dmg: ${err}`);
            }
        });
    });
}
function httpRequest(url, method, response, keepAlive = true) {
    const urlParsed = external_url_.parse(url);
    let options = {
        ...urlParsed,
        method,
        headers: keepAlive
            ? {
                Connection: 'keep-alive',
            }
            : undefined,
    };
    const proxyURL = (0,external_proxy_from_env_.getProxyForUrl)(url);
    if (proxyURL) {
        if (url.startsWith('http:')) {
            const proxy = external_url_.parse(proxyURL);
            options = {
                path: options.href,
                host: proxy.hostname,
                port: proxy.port,
            };
        }
        else {
            const parsedProxyURL = external_url_.parse(proxyURL);
            const proxyOptions = {
                ...parsedProxyURL,
                secureProxy: parsedProxyURL.protocol === 'https:',
            };
            options.agent = external_https_proxy_agent_(proxyOptions);
            options.rejectUnauthorized = false;
        }
    }
    const requestCallback = (res) => {
        if (res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location) {
            httpRequest(res.headers.location, method, response);
        }
        else {
            response(res);
        }
    };
    const request = options.protocol === 'https:'
        ? external_https_.request(options, requestCallback)
        : external_http_.request(options, requestCallback);
    request.end();
    return request;
}
//# sourceMappingURL=BrowserFetcher.js.map
// EXTERNAL MODULE: external "readline"
var external_readline_ = __webpack_require__(4521);
// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/NodeWebSocketTransport.js + 2 modules
var NodeWebSocketTransport = __webpack_require__(2679);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/PipeTransport.js
var PipeTransport_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var PipeTransport_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PipeTransport_instances, _PipeTransport_pipeWrite, _PipeTransport_eventListeners, _PipeTransport_isClosed, _PipeTransport_pendingMessage, _PipeTransport_dispatch;
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class PipeTransport {
    constructor(pipeWrite, pipeRead) {
        _PipeTransport_instances.add(this);
        _PipeTransport_pipeWrite.set(this, void 0);
        _PipeTransport_eventListeners.set(this, void 0);
        _PipeTransport_isClosed.set(this, false);
        _PipeTransport_pendingMessage.set(this, '');
        PipeTransport_classPrivateFieldSet(this, _PipeTransport_pipeWrite, pipeWrite, "f");
        PipeTransport_classPrivateFieldSet(this, _PipeTransport_eventListeners, [
            addEventListener(pipeRead, 'data', (buffer) => {
                return PipeTransport_classPrivateFieldGet(this, _PipeTransport_instances, "m", _PipeTransport_dispatch).call(this, buffer);
            }),
            addEventListener(pipeRead, 'close', () => {
                if (this.onclose) {
                    this.onclose.call(null);
                }
            }),
            addEventListener(pipeRead, 'error', debugError),
            addEventListener(pipeWrite, 'error', debugError),
        ], "f");
    }
    send(message) {
        assert(!PipeTransport_classPrivateFieldGet(this, _PipeTransport_isClosed, "f"), '`PipeTransport` is closed.');
        PipeTransport_classPrivateFieldGet(this, _PipeTransport_pipeWrite, "f").write(message);
        PipeTransport_classPrivateFieldGet(this, _PipeTransport_pipeWrite, "f").write('\0');
    }
    close() {
        PipeTransport_classPrivateFieldSet(this, _PipeTransport_isClosed, true, "f");
        removeEventListeners(PipeTransport_classPrivateFieldGet(this, _PipeTransport_eventListeners, "f"));
    }
}
_PipeTransport_pipeWrite = new WeakMap(), _PipeTransport_eventListeners = new WeakMap(), _PipeTransport_isClosed = new WeakMap(), _PipeTransport_pendingMessage = new WeakMap(), _PipeTransport_instances = new WeakSet(), _PipeTransport_dispatch = function _PipeTransport_dispatch(buffer) {
    assert(!PipeTransport_classPrivateFieldGet(this, _PipeTransport_isClosed, "f"), '`PipeTransport` is closed.');
    let end = buffer.indexOf('\0');
    if (end === -1) {
        PipeTransport_classPrivateFieldSet(this, _PipeTransport_pendingMessage, PipeTransport_classPrivateFieldGet(this, _PipeTransport_pendingMessage, "f") + buffer.toString(), "f");
        return;
    }
    const message = PipeTransport_classPrivateFieldGet(this, _PipeTransport_pendingMessage, "f") + buffer.toString(undefined, 0, end);
    if (this.onmessage) {
        this.onmessage.call(null, message);
    }
    let start = end + 1;
    end = buffer.indexOf('\0', start);
    while (end !== -1) {
        if (this.onmessage) {
            this.onmessage.call(null, buffer.toString(undefined, start, end));
        }
        start = end + 1;
        end = buffer.indexOf('\0', start);
    }
    PipeTransport_classPrivateFieldSet(this, _PipeTransport_pendingMessage, buffer.toString(undefined, start), "f");
};
//# sourceMappingURL=PipeTransport.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/BrowserRunner.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BrowserRunner_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var BrowserRunner_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserRunner_product, _BrowserRunner_executablePath, _BrowserRunner_processArguments, _BrowserRunner_userDataDir, _BrowserRunner_isTempUserDataDir, _BrowserRunner_closed, _BrowserRunner_listeners, _BrowserRunner_processClosing;













const removeFolderAsync = (0,external_util_.promisify)(external_rimraf_);
const renameAsync = (0,external_util_.promisify)(external_fs_.rename);
const BrowserRunner_unlinkAsync = (0,external_util_.promisify)(external_fs_.unlink);
const debugLauncher = debug('puppeteer:launcher');
const PROCESS_ERROR_EXPLANATION = `Puppeteer was unable to kill the process which ran the browser binary.
This means that, on future Puppeteer launches, Puppeteer might not be able to launch the browser.
Please check your open processes and ensure that the browser processes that Puppeteer launched have been killed.
If you think this is a bug, please report it on the Puppeteer issue tracker.`;
class BrowserRunner {
    constructor(product, executablePath, processArguments, userDataDir, isTempUserDataDir) {
        _BrowserRunner_product.set(this, void 0);
        _BrowserRunner_executablePath.set(this, void 0);
        _BrowserRunner_processArguments.set(this, void 0);
        _BrowserRunner_userDataDir.set(this, void 0);
        _BrowserRunner_isTempUserDataDir.set(this, void 0);
        _BrowserRunner_closed.set(this, true);
        _BrowserRunner_listeners.set(this, []);
        _BrowserRunner_processClosing.set(this, void 0);
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_product, product, "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_executablePath, executablePath, "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_processArguments, processArguments, "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_userDataDir, userDataDir, "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_isTempUserDataDir, isTempUserDataDir, "f");
    }
    start(options) {
        var _a, _b;
        const { handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, env, pipe } = options;
        let stdio;
        if (pipe) {
            if (dumpio) {
                stdio = ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'];
            }
            else {
                stdio = ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'];
            }
        }
        else {
            if (dumpio) {
                stdio = ['pipe', 'pipe', 'pipe'];
            }
            else {
                stdio = ['pipe', 'ignore', 'pipe'];
            }
        }
        assert(!this.proc, 'This process has previously been started.');
        debugLauncher(`Calling ${BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_executablePath, "f")} ${BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_processArguments, "f").join(' ')}`);
        this.proc = external_child_process_.spawn(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_executablePath, "f"), BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_processArguments, "f"), {
            // On non-windows platforms, `detached: true` makes child process a
            // leader of a new process group, making it possible to kill child
            // process tree with `.kill(-pid)` command. @see
            // https://nodejs.org/api/child_process.html#child_process_options_detached
            detached: process.platform !== 'win32',
            env,
            stdio,
        });
        if (dumpio) {
            (_a = this.proc.stderr) === null || _a === void 0 ? void 0 : _a.pipe(process.stderr);
            (_b = this.proc.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
        }
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_closed, false, "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_processClosing, new Promise((fulfill, reject) => {
            this.proc.once('exit', async () => {
                BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_closed, true, "f");
                // Cleanup as processes exit.
                if (BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_isTempUserDataDir, "f")) {
                    try {
                        await removeFolderAsync(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_userDataDir, "f"));
                        fulfill();
                    }
                    catch (error) {
                        debugError(error);
                        reject(error);
                    }
                }
                else {
                    if (BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_product, "f") === 'firefox') {
                        try {
                            // When an existing user profile has been used remove the user
                            // preferences file and restore possibly backuped preferences.
                            await BrowserRunner_unlinkAsync(external_path_.join(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_userDataDir, "f"), 'user.js'));
                            const prefsBackupPath = external_path_.join(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_userDataDir, "f"), 'prefs.js.puppeteer');
                            if (external_fs_.existsSync(prefsBackupPath)) {
                                const prefsPath = external_path_.join(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_userDataDir, "f"), 'prefs.js');
                                await BrowserRunner_unlinkAsync(prefsPath);
                                await renameAsync(prefsBackupPath, prefsPath);
                            }
                        }
                        catch (error) {
                            debugError(error);
                            reject(error);
                        }
                    }
                    fulfill();
                }
            });
        }), "f");
        BrowserRunner_classPrivateFieldSet(this, _BrowserRunner_listeners, [addEventListener(process, 'exit', this.kill.bind(this))], "f");
        if (handleSIGINT) {
            BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_listeners, "f").push(addEventListener(process, 'SIGINT', () => {
                this.kill();
                process.exit(130);
            }));
        }
        if (handleSIGTERM) {
            BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_listeners, "f").push(addEventListener(process, 'SIGTERM', this.close.bind(this)));
        }
        if (handleSIGHUP) {
            BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_listeners, "f").push(addEventListener(process, 'SIGHUP', this.close.bind(this)));
        }
    }
    close() {
        if (BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_closed, "f")) {
            return Promise.resolve();
        }
        if (BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_isTempUserDataDir, "f")) {
            this.kill();
        }
        else if (this.connection) {
            // Attempt to close the browser gracefully
            this.connection.send('Browser.close').catch((error) => {
                debugError(error);
                this.kill();
            });
        }
        // Cleanup this listener last, as that makes sure the full callback runs. If we
        // perform this earlier, then the previous function calls would not happen.
        removeEventListeners(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_listeners, "f"));
        return BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_processClosing, "f");
    }
    kill() {
        // If the process failed to launch (for example if the browser executable path
        // is invalid), then the process does not get a pid assigned. A call to
        // `proc.kill` would error, as the `pid` to-be-killed can not be found.
        if (this.proc && this.proc.pid && pidExists(this.proc.pid)) {
            const proc = this.proc;
            try {
                if (process.platform === 'win32') {
                    external_child_process_.exec(`taskkill /pid ${this.proc.pid} /T /F`, (error) => {
                        if (error) {
                            // taskkill can fail to kill the process e.g. due to missing permissions.
                            // Let's kill the process via Node API. This delays killing of all child
                            // processes of `this.proc` until the main Node.js process dies.
                            proc.kill();
                        }
                    });
                }
                else {
                    // on linux the process group can be killed with the group id prefixed with
                    // a minus sign. The process group id is the group leader's pid.
                    const processGroupId = -this.proc.pid;
                    try {
                        process.kill(processGroupId, 'SIGKILL');
                    }
                    catch (error) {
                        // Killing the process group can fail due e.g. to missing permissions.
                        // Let's kill the process via Node API. This delays killing of all child
                        // processes of `this.proc` until the main Node.js process dies.
                        proc.kill('SIGKILL');
                    }
                }
            }
            catch (error) {
                throw new Error(`${PROCESS_ERROR_EXPLANATION}\nError cause: ${isErrorLike(error) ? error.stack : error}`);
            }
        }
        // Attempt to remove temporary profile directory to avoid littering.
        try {
            if (BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_isTempUserDataDir, "f")) {
                external_rimraf_.sync(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_userDataDir, "f"));
            }
        }
        catch (error) { }
        // Cleanup this listener last, as that makes sure the full callback runs. If we
        // perform this earlier, then the previous function calls would not happen.
        removeEventListeners(BrowserRunner_classPrivateFieldGet(this, _BrowserRunner_listeners, "f"));
    }
    async setupConnection(options) {
        assert(this.proc, 'BrowserRunner not started.');
        const { usePipe, timeout, slowMo, preferredRevision } = options;
        if (!usePipe) {
            const browserWSEndpoint = await waitForWSEndpoint(this.proc, timeout, preferredRevision);
            const transport = await NodeWebSocketTransport.NodeWebSocketTransport.create(browserWSEndpoint);
            this.connection = new Connection(browserWSEndpoint, transport, slowMo);
        }
        else {
            // stdio was assigned during start(), and the 'pipe' option there adds the
            // 4th and 5th items to stdio array
            const { 3: pipeWrite, 4: pipeRead } = this.proc.stdio;
            const transport = new PipeTransport(pipeWrite, pipeRead);
            this.connection = new Connection('', transport, slowMo);
        }
        return this.connection;
    }
}
_BrowserRunner_product = new WeakMap(), _BrowserRunner_executablePath = new WeakMap(), _BrowserRunner_processArguments = new WeakMap(), _BrowserRunner_userDataDir = new WeakMap(), _BrowserRunner_isTempUserDataDir = new WeakMap(), _BrowserRunner_closed = new WeakMap(), _BrowserRunner_listeners = new WeakMap(), _BrowserRunner_processClosing = new WeakMap();
function waitForWSEndpoint(browserProcess, timeout, preferredRevision) {
    assert(browserProcess.stderr, '`browserProcess` does not have stderr.');
    const rl = external_readline_.createInterface(browserProcess.stderr);
    let stderr = '';
    return new Promise((resolve, reject) => {
        const listeners = [
            addEventListener(rl, 'line', onLine),
            addEventListener(rl, 'close', () => {
                return onClose();
            }),
            addEventListener(browserProcess, 'exit', () => {
                return onClose();
            }),
            addEventListener(browserProcess, 'error', (error) => {
                return onClose(error);
            }),
        ];
        const timeoutId = timeout ? setTimeout(onTimeout, timeout) : 0;
        function onClose(error) {
            cleanup();
            reject(new Error([
                'Failed to launch the browser process!' +
                    (error ? ' ' + error.message : ''),
                stderr,
                '',
                'TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md',
                '',
            ].join('\n')));
        }
        function onTimeout() {
            cleanup();
            reject(new TimeoutError(`Timed out after ${timeout} ms while trying to connect to the browser! Only Chrome at revision r${preferredRevision} is guaranteed to work.`));
        }
        function onLine(line) {
            stderr += line + '\n';
            const match = line.match(/^DevTools listening on (ws:\/\/.*)$/);
            if (!match) {
                return;
            }
            cleanup();
            // The RegExp matches, so this will obviously exist.
            resolve(match[1]);
        }
        function cleanup() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            removeEventListeners(listeners);
        }
    });
}
function pidExists(pid) {
    try {
        return process.kill(pid, 0);
    }
    catch (error) {
        if (isErrnoException(error)) {
            if (error.code && error.code === 'ESRCH') {
                return false;
            }
        }
        throw error;
    }
}
//# sourceMappingURL=BrowserRunner.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/Launcher.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








const copyFileAsync = (0,external_util_.promisify)(external_fs_.copyFile);
const mkdtempAsync = (0,external_util_.promisify)(external_fs_.mkdtemp);
const writeFileAsync = (0,external_util_.promisify)(external_fs_.writeFile);
const tmpDir = () => {
    return process.env['PUPPETEER_TMP_DIR'] || external_os_.tmpdir();
};
/**
 * @internal
 */
class ChromeLauncher {
    constructor(projectRoot, preferredRevision, isPuppeteerCore) {
        this._projectRoot = projectRoot;
        this._preferredRevision = preferredRevision;
        this._isPuppeteerCore = isPuppeteerCore;
    }
    async launch(options = {}) {
        const { ignoreDefaultArgs = false, args = [], dumpio = false, channel, executablePath, pipe = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, slowMo = 0, timeout = 30000, waitForInitialPage = true, debuggingPort, } = options;
        const chromeArguments = [];
        if (!ignoreDefaultArgs) {
            chromeArguments.push(...this.defaultArgs(options));
        }
        else if (Array.isArray(ignoreDefaultArgs)) {
            chromeArguments.push(...this.defaultArgs(options).filter((arg) => {
                return !ignoreDefaultArgs.includes(arg);
            }));
        }
        else {
            chromeArguments.push(...args);
        }
        if (!chromeArguments.some((argument) => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                assert(!debuggingPort, 'Browser should be launched with either pipe or debugging port - not both.');
                chromeArguments.push('--remote-debugging-pipe');
            }
            else {
                chromeArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
            }
        }
        let isTempUserDataDir = true;
        // Check for the user data dir argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        let userDataDirIndex = chromeArguments.findIndex((arg) => {
            return arg.startsWith('--user-data-dir');
        });
        if (userDataDirIndex < 0) {
            chromeArguments.push(`--user-data-dir=${await mkdtempAsync(external_path_.join(tmpDir(), 'puppeteer_dev_chrome_profile-'))}`);
            userDataDirIndex = chromeArguments.length - 1;
        }
        const userDataDir = chromeArguments[userDataDirIndex].split('=', 2)[1];
        assert(typeof userDataDir === 'string', '`--user-data-dir` is malformed');
        isTempUserDataDir = false;
        let chromeExecutable = executablePath;
        if (channel) {
            // executablePath is detected by channel, so it should not be specified by user.
            assert(!chromeExecutable, '`executablePath` must not be specified when `channel` is given.');
            chromeExecutable = executablePathForChannel(channel);
        }
        else if (!chromeExecutable) {
            const { missingText, executablePath } = resolveExecutablePath(this);
            if (missingText) {
                throw new Error(missingText);
            }
            chromeExecutable = executablePath;
        }
        const usePipe = chromeArguments.includes('--remote-debugging-pipe');
        const runner = new BrowserRunner(this.product, chromeExecutable, chromeArguments, userDataDir, isTempUserDataDir);
        runner.start({
            handleSIGHUP,
            handleSIGTERM,
            handleSIGINT,
            dumpio,
            env,
            pipe: usePipe,
        });
        let browser;
        try {
            const connection = await runner.setupConnection({
                usePipe,
                timeout,
                slowMo,
                preferredRevision: this._preferredRevision,
            });
            browser = await Browser._create(connection, [], ignoreHTTPSErrors, defaultViewport, runner.proc, runner.close.bind(runner));
        }
        catch (error) {
            runner.kill();
            throw error;
        }
        if (waitForInitialPage) {
            try {
                await browser.waitForTarget((t) => {
                    return t.type() === 'page';
                }, { timeout });
            }
            catch (error) {
                await browser.close();
                throw error;
            }
        }
        return browser;
    }
    defaultArgs(options = {}) {
        const chromeArguments = [
            '--allow-pre-commit-input',
            '--disable-background-networking',
            '--enable-features=NetworkServiceInProcess2',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            // TODO: remove AvoidUnnecessaryBeforeUnloadCheckSync below
            // once crbug.com/1324138 is fixed and released.
            '--disable-features=Translate,BackForwardCache,AvoidUnnecessaryBeforeUnloadCheckSync',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-sync',
            '--force-color-profile=srgb',
            '--metrics-recording-only',
            '--no-first-run',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain',
            // TODO(sadym): remove '--enable-blink-features=IdleDetection'
            // once IdleDetection is turned on by default.
            '--enable-blink-features=IdleDetection',
            '--export-tagged-pdf',
        ];
        const { devtools = false, headless = !devtools, args = [], userDataDir, } = options;
        if (userDataDir) {
            chromeArguments.push(`--user-data-dir=${external_path_.resolve(userDataDir)}`);
        }
        if (devtools) {
            chromeArguments.push('--auto-open-devtools-for-tabs');
        }
        if (headless) {
            chromeArguments.push(headless === 'chrome' ? '--headless=chrome' : '--headless', '--hide-scrollbars', '--mute-audio');
        }
        if (args.every((arg) => {
            return arg.startsWith('-');
        })) {
            chromeArguments.push('about:blank');
        }
        chromeArguments.push(...args);
        return chromeArguments;
    }
    executablePath(channel) {
        if (channel) {
            return executablePathForChannel(channel);
        }
        else {
            const results = resolveExecutablePath(this);
            return results.executablePath;
        }
    }
    get product() {
        return 'chrome';
    }
}
/**
 * @internal
 */
class FirefoxLauncher {
    constructor(projectRoot, preferredRevision, isPuppeteerCore) {
        this._projectRoot = projectRoot;
        this._preferredRevision = preferredRevision;
        this._isPuppeteerCore = isPuppeteerCore;
    }
    async launch(options = {}) {
        const { ignoreDefaultArgs = false, args = [], dumpio = false, executablePath = null, pipe = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, slowMo = 0, timeout = 30000, extraPrefsFirefox = {}, waitForInitialPage = true, debuggingPort = null, } = options;
        const firefoxArguments = [];
        if (!ignoreDefaultArgs) {
            firefoxArguments.push(...this.defaultArgs(options));
        }
        else if (Array.isArray(ignoreDefaultArgs)) {
            firefoxArguments.push(...this.defaultArgs(options).filter((arg) => {
                return !ignoreDefaultArgs.includes(arg);
            }));
        }
        else {
            firefoxArguments.push(...args);
        }
        if (!firefoxArguments.some((argument) => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                assert(debuggingPort === null, 'Browser should be launched with either pipe or debugging port - not both.');
            }
            firefoxArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
        }
        let userDataDir;
        let isTempUserDataDir = true;
        // Check for the profile argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        const profileArgIndex = firefoxArguments.findIndex((arg) => {
            return ['-profile', '--profile'].includes(arg);
        });
        if (profileArgIndex !== -1) {
            userDataDir = firefoxArguments[profileArgIndex + 1];
            if (!userDataDir || !external_fs_.existsSync(userDataDir)) {
                throw new Error(`Firefox profile not found at '${userDataDir}'`);
            }
            // When using a custom Firefox profile it needs to be populated
            // with required preferences.
            isTempUserDataDir = false;
            const prefs = this.defaultPreferences(extraPrefsFirefox);
            this.writePreferences(prefs, userDataDir);
        }
        else {
            userDataDir = await this._createProfile(extraPrefsFirefox);
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        await this._updateRevision();
        let firefoxExecutable = executablePath;
        if (!executablePath) {
            const { missingText, executablePath } = resolveExecutablePath(this);
            if (missingText) {
                throw new Error(missingText);
            }
            firefoxExecutable = executablePath;
        }
        if (!firefoxExecutable) {
            throw new Error('firefoxExecutable is not found.');
        }
        const runner = new BrowserRunner(this.product, firefoxExecutable, firefoxArguments, userDataDir, isTempUserDataDir);
        runner.start({
            handleSIGHUP,
            handleSIGTERM,
            handleSIGINT,
            dumpio,
            env,
            pipe,
        });
        let browser;
        try {
            const connection = await runner.setupConnection({
                usePipe: pipe,
                timeout,
                slowMo,
                preferredRevision: this._preferredRevision,
            });
            browser = await Browser._create(connection, [], ignoreHTTPSErrors, defaultViewport, runner.proc, runner.close.bind(runner));
        }
        catch (error) {
            runner.kill();
            throw error;
        }
        if (waitForInitialPage) {
            try {
                await browser.waitForTarget((t) => {
                    return t.type() === 'page';
                }, { timeout });
            }
            catch (error) {
                await browser.close();
                throw error;
            }
        }
        return browser;
    }
    executablePath() {
        return resolveExecutablePath(this).executablePath;
    }
    async _updateRevision() {
        // replace 'latest' placeholder with actual downloaded revision
        if (this._preferredRevision === 'latest') {
            if (!this._projectRoot) {
                throw new Error('_projectRoot is undefined. Unable to create a BrowserFetcher.');
            }
            const browserFetcher = new BrowserFetcher(this._projectRoot, {
                product: this.product,
            });
            const localRevisions = await browserFetcher.localRevisions();
            if (localRevisions[0]) {
                this._preferredRevision = localRevisions[0];
            }
        }
    }
    get product() {
        return 'firefox';
    }
    defaultArgs(options = {}) {
        const { devtools = false, headless = !devtools, args = [], userDataDir = null, } = options;
        const firefoxArguments = ['--no-remote'];
        if (external_os_.platform() === 'darwin') {
            firefoxArguments.push('--foreground');
        }
        else if (external_os_.platform().startsWith('win')) {
            firefoxArguments.push('--wait-for-browser');
        }
        if (userDataDir) {
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        if (headless) {
            firefoxArguments.push('--headless');
        }
        if (devtools) {
            firefoxArguments.push('--devtools');
        }
        if (args.every((arg) => {
            return arg.startsWith('-');
        })) {
            firefoxArguments.push('about:blank');
        }
        firefoxArguments.push(...args);
        return firefoxArguments;
    }
    defaultPreferences(extraPrefs) {
        const server = 'dummy.test';
        const defaultPrefs = {
            // Make sure Shield doesn't hit the network.
            'app.normandy.api_url': '',
            // Disable Firefox old build background check
            'app.update.checkInstallTime': false,
            // Disable automatically upgrading Firefox
            'app.update.disabledForTesting': true,
            // Increase the APZ content response timeout to 1 minute
            'apz.content_response_timeout': 60000,
            // Prevent various error message on the console
            // jest-puppeteer asserts that no error message is emitted by the console
            'browser.contentblocking.features.standard': '-tp,tpPrivate,cookieBehavior0,-cm,-fp',
            // Enable the dump function: which sends messages to the system
            // console
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1543115
            'browser.dom.window.dump.enabled': true,
            // Disable topstories
            'browser.newtabpage.activity-stream.feeds.system.topstories': false,
            // Always display a blank page
            'browser.newtabpage.enabled': false,
            // Background thumbnails in particular cause grief: and disabling
            // thumbnails in general cannot hurt
            'browser.pagethumbnails.capturing_disabled': true,
            // Disable safebrowsing components.
            'browser.safebrowsing.blockedURIs.enabled': false,
            'browser.safebrowsing.downloads.enabled': false,
            'browser.safebrowsing.malware.enabled': false,
            'browser.safebrowsing.passwords.enabled': false,
            'browser.safebrowsing.phishing.enabled': false,
            // Disable updates to search engines.
            'browser.search.update': false,
            // Do not restore the last open set of tabs if the browser has crashed
            'browser.sessionstore.resume_from_crash': false,
            // Skip check for default browser on startup
            'browser.shell.checkDefaultBrowser': false,
            // Disable newtabpage
            'browser.startup.homepage': 'about:blank',
            // Do not redirect user when a milstone upgrade of Firefox is detected
            'browser.startup.homepage_override.mstone': 'ignore',
            // Start with a blank page about:blank
            'browser.startup.page': 0,
            // Do not allow background tabs to be zombified on Android: otherwise for
            // tests that open additional tabs: the test harness tab itself might get
            // unloaded
            'browser.tabs.disableBackgroundZombification': false,
            // Do not warn when closing all other open tabs
            'browser.tabs.warnOnCloseOtherTabs': false,
            // Do not warn when multiple tabs will be opened
            'browser.tabs.warnOnOpen': false,
            // Disable the UI tour.
            'browser.uitour.enabled': false,
            // Turn off search suggestions in the location bar so as not to trigger
            // network connections.
            'browser.urlbar.suggest.searches': false,
            // Disable first run splash page on Windows 10
            'browser.usedOnWindows10.introURL': '',
            // Do not warn on quitting Firefox
            'browser.warnOnQuit': false,
            // Defensively disable data reporting systems
            'datareporting.healthreport.documentServerURI': `http://${server}/dummy/healthreport/`,
            'datareporting.healthreport.logging.consoleEnabled': false,
            'datareporting.healthreport.service.enabled': false,
            'datareporting.healthreport.service.firstRun': false,
            'datareporting.healthreport.uploadEnabled': false,
            // Do not show datareporting policy notifications which can interfere with tests
            'datareporting.policy.dataSubmissionEnabled': false,
            'datareporting.policy.dataSubmissionPolicyBypassNotification': true,
            // DevTools JSONViewer sometimes fails to load dependencies with its require.js.
            // This doesn't affect Puppeteer but spams console (Bug 1424372)
            'devtools.jsonview.enabled': false,
            // Disable popup-blocker
            'dom.disable_open_during_load': false,
            // Enable the support for File object creation in the content process
            // Required for |Page.setFileInputFiles| protocol method.
            'dom.file.createInChild': true,
            // Disable the ProcessHangMonitor
            'dom.ipc.reportProcessHangs': false,
            // Disable slow script dialogues
            'dom.max_chrome_script_run_time': 0,
            'dom.max_script_run_time': 0,
            // Only load extensions from the application and user profile
            // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
            'extensions.autoDisableScopes': 0,
            'extensions.enabledScopes': 5,
            // Disable metadata caching for installed add-ons by default
            'extensions.getAddons.cache.enabled': false,
            // Disable installing any distribution extensions or add-ons.
            'extensions.installDistroAddons': false,
            // Disabled screenshots extension
            'extensions.screenshots.disabled': true,
            // Turn off extension updates so they do not bother tests
            'extensions.update.enabled': false,
            // Turn off extension updates so they do not bother tests
            'extensions.update.notifyUser': false,
            // Make sure opening about:addons will not hit the network
            'extensions.webservice.discoverURL': `http://${server}/dummy/discoveryURL`,
            // Temporarily force disable BFCache in parent (https://bit.ly/bug-1732263)
            'fission.bfcacheInParent': false,
            // Force all web content to use a single content process
            'fission.webContentIsolationStrategy': 0,
            // Allow the application to have focus even it runs in the background
            'focusmanager.testmode': true,
            // Disable useragent updates
            'general.useragent.updates.enabled': false,
            // Always use network provider for geolocation tests so we bypass the
            // macOS dialog raised by the corelocation provider
            'geo.provider.testing': true,
            // Do not scan Wifi
            'geo.wifi.scan': false,
            // No hang monitor
            'hangmonitor.timeout': 0,
            // Show chrome errors and warnings in the error console
            'javascript.options.showInConsole': true,
            // Disable download and usage of OpenH264: and Widevine plugins
            'media.gmp-manager.updateEnabled': false,
            // Prevent various error message on the console
            // jest-puppeteer asserts that no error message is emitted by the console
            'network.cookie.cookieBehavior': 0,
            // Disable experimental feature that is only available in Nightly
            'network.cookie.sameSite.laxByDefault': false,
            // Do not prompt for temporary redirects
            'network.http.prompt-temp-redirect': false,
            // Disable speculative connections so they are not reported as leaking
            // when they are hanging around
            'network.http.speculative-parallel-limit': 0,
            // Do not automatically switch between offline and online
            'network.manage-offline-status': false,
            // Make sure SNTP requests do not hit the network
            'network.sntp.pools': server,
            // Disable Flash.
            'plugin.state.flash': 0,
            'privacy.trackingprotection.enabled': false,
            // Can be removed once Firefox 89 is no longer supported
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1710839
            'remote.enabled': true,
            // Don't do network connections for mitm priming
            'security.certerrors.mitm.priming.enabled': false,
            // Local documents have access to all other local documents,
            // including directory listings
            'security.fileuri.strict_origin_policy': false,
            // Do not wait for the notification button security delay
            'security.notification_enable_delay': 0,
            // Ensure blocklist updates do not hit the network
            'services.settings.server': `http://${server}/dummy/blocklist/`,
            // Do not automatically fill sign-in forms with known usernames and
            // passwords
            'signon.autofillForms': false,
            // Disable password capture, so that tests that include forms are not
            // influenced by the presence of the persistent doorhanger notification
            'signon.rememberSignons': false,
            // Disable first-run welcome page
            'startup.homepage_welcome_url': 'about:blank',
            // Disable first-run welcome page
            'startup.homepage_welcome_url.additional': '',
            // Disable browser animations (tabs, fullscreen, sliding alerts)
            'toolkit.cosmeticAnimations.enabled': false,
            // Prevent starting into safe mode after application crashes
            'toolkit.startup.max_resumed_crashes': -1,
        };
        return Object.assign(defaultPrefs, extraPrefs);
    }
    /**
     * Populates the user.js file with custom preferences as needed to allow
     * Firefox's CDP support to properly function. These preferences will be
     * automatically copied over to prefs.js during startup of Firefox. To be
     * able to restore the original values of preferences a backup of prefs.js
     * will be created.
     *
     * @param prefs - List of preferences to add.
     * @param profilePath - Firefox profile to write the preferences to.
     */
    async writePreferences(prefs, profilePath) {
        const lines = Object.entries(prefs).map(([key, value]) => {
            return `user_pref(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
        });
        await writeFileAsync(external_path_.join(profilePath, 'user.js'), lines.join('\n'));
        // Create a backup of the preferences file if it already exitsts.
        const prefsPath = external_path_.join(profilePath, 'prefs.js');
        if (external_fs_.existsSync(prefsPath)) {
            const prefsBackupPath = external_path_.join(profilePath, 'prefs.js.puppeteer');
            await copyFileAsync(prefsPath, prefsBackupPath);
        }
    }
    async _createProfile(extraPrefs) {
        const temporaryProfilePath = await mkdtempAsync(external_path_.join(tmpDir(), 'puppeteer_dev_firefox_profile-'));
        const prefs = this.defaultPreferences(extraPrefs);
        await this.writePreferences(prefs, temporaryProfilePath);
        return temporaryProfilePath;
    }
}
function executablePathForChannel(channel) {
    const platform = external_os_.platform();
    let chromePath;
    switch (platform) {
        case 'win32':
            switch (channel) {
                case 'chrome':
                    chromePath = `${process.env['PROGRAMFILES']}\\Google\\Chrome\\Application\\chrome.exe`;
                    break;
                case 'chrome-beta':
                    chromePath = `${process.env['PROGRAMFILES']}\\Google\\Chrome Beta\\Application\\chrome.exe`;
                    break;
                case 'chrome-canary':
                    chromePath = `${process.env['PROGRAMFILES']}\\Google\\Chrome SxS\\Application\\chrome.exe`;
                    break;
                case 'chrome-dev':
                    chromePath = `${process.env['PROGRAMFILES']}\\Google\\Chrome Dev\\Application\\chrome.exe`;
                    break;
            }
            break;
        case 'darwin':
            switch (channel) {
                case 'chrome':
                    chromePath =
                        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
                    break;
                case 'chrome-beta':
                    chromePath =
                        '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta';
                    break;
                case 'chrome-canary':
                    chromePath =
                        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';
                    break;
                case 'chrome-dev':
                    chromePath =
                        '/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev';
                    break;
            }
            break;
        case 'linux':
            switch (channel) {
                case 'chrome':
                    chromePath = '/opt/google/chrome/chrome';
                    break;
                case 'chrome-beta':
                    chromePath = '/opt/google/chrome-beta/chrome';
                    break;
                case 'chrome-dev':
                    chromePath = '/opt/google/chrome-unstable/chrome';
                    break;
            }
            break;
    }
    if (!chromePath) {
        throw new Error(`Unable to detect browser executable path for '${channel}' on ${platform}.`);
    }
    // Check if Chrome exists and is accessible.
    try {
        external_fs_.accessSync(chromePath);
    }
    catch (error) {
        throw new Error(`Could not find Google Chrome executable for channel '${channel}' at '${chromePath}'.`);
    }
    return chromePath;
}
function resolveExecutablePath(launcher) {
    const { product, _isPuppeteerCore, _projectRoot, _preferredRevision } = launcher;
    let downloadPath;
    // puppeteer-core doesn't take into account PUPPETEER_* env variables.
    if (!_isPuppeteerCore) {
        const executablePath = process.env['PUPPETEER_EXECUTABLE_PATH'] ||
            process.env['npm_config_puppeteer_executable_path'] ||
            process.env['npm_package_config_puppeteer_executable_path'];
        if (executablePath) {
            const missingText = !external_fs_.existsSync(executablePath)
                ? 'Tried to use PUPPETEER_EXECUTABLE_PATH env variable to launch browser but did not find any executable at: ' +
                    executablePath
                : undefined;
            return { executablePath, missingText };
        }
        const ubuntuChromiumPath = '/usr/bin/chromium-browser';
        if (product === 'chrome' &&
            external_os_.platform() !== 'darwin' &&
            external_os_.arch() === 'arm64' &&
            external_fs_.existsSync(ubuntuChromiumPath)) {
            return { executablePath: ubuntuChromiumPath, missingText: undefined };
        }
        downloadPath =
            process.env['PUPPETEER_DOWNLOAD_PATH'] ||
                process.env['npm_config_puppeteer_download_path'] ||
                process.env['npm_package_config_puppeteer_download_path'];
    }
    if (!_projectRoot) {
        throw new Error('_projectRoot is undefined. Unable to create a BrowserFetcher.');
    }
    const browserFetcher = new BrowserFetcher(_projectRoot, {
        product: product,
        path: downloadPath,
    });
    if (!_isPuppeteerCore && product === 'chrome') {
        const revision = process.env['PUPPETEER_CHROMIUM_REVISION'];
        if (revision) {
            const revisionInfo = browserFetcher.revisionInfo(revision);
            const missingText = !revisionInfo.local
                ? 'Tried to use PUPPETEER_CHROMIUM_REVISION env variable to launch browser but did not find executable at: ' +
                    revisionInfo.executablePath
                : undefined;
            return { executablePath: revisionInfo.executablePath, missingText };
        }
    }
    const revisionInfo = browserFetcher.revisionInfo(_preferredRevision);
    const firefoxHelp = `Run \`PUPPETEER_PRODUCT=firefox npm install\` to download a supported Firefox browser binary.`;
    const chromeHelp = `Run \`npm install\` to download the correct Chromium revision (${launcher._preferredRevision}).`;
    const missingText = !revisionInfo.local
        ? `Could not find expected browser (${product}) locally. ${product === 'chrome' ? chromeHelp : firefoxHelp}`
        : undefined;
    return { executablePath: revisionInfo.executablePath, missingText };
}
/**
 * @internal
 */
function Launcher(projectRoot, preferredRevision, isPuppeteerCore, product) {
    // puppeteer-core doesn't take into account PUPPETEER_* env variables.
    if (!product && !isPuppeteerCore) {
        product =
            process.env['PUPPETEER_PRODUCT'] ||
                process.env['npm_config_puppeteer_product'] ||
                process.env['npm_package_config_puppeteer_product'];
    }
    switch (product) {
        case 'firefox':
            return new FirefoxLauncher(projectRoot, preferredRevision, isPuppeteerCore);
        case 'chrome':
        default:
            if (typeof product !== 'undefined' && product !== 'chrome') {
                /* The user gave us an incorrect product name
                 * we'll default to launching Chrome, but log to the console
                 * to let the user know (they've probably typoed).
                 */
                console.warn(`Warning: unknown product name ${product}. Falling back to chrome.`);
            }
            return new ChromeLauncher(projectRoot, preferredRevision, isPuppeteerCore);
    }
}
//# sourceMappingURL=Launcher.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/revisions.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PUPPETEER_REVISIONS = {
    chromium: '1002410',
    firefox: 'latest',
};
//# sourceMappingURL=revisions.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/Puppeteer.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Puppeteer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var Puppeteer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PuppeteerNode_lazyLauncher, _PuppeteerNode_projectRoot, _PuppeteerNode_productName;




/**
 * Extends the main {@link Puppeteer} class with Node specific behaviour for fetching and
 * downloading browsers.
 *
 * If you're using Puppeteer in a Node environment, this is the class you'll get
 * when you run `require('puppeteer')` (or the equivalent ES `import`).
 *
 * @remarks
 *
 * The most common method to use is {@link PuppeteerNode.launch | launch}, which
 * is used to launch and connect to a new browser instance.
 *
 * See {@link Puppeteer | the main Puppeteer class} for methods common to all
 * environments, such as {@link Puppeteer.connect}.
 *
 * @example
 * The following is a typical example of using Puppeteer to drive automation:
 * ```js
 * const puppeteer = require('puppeteer');
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://www.google.com');
 *   // other actions...
 *   await browser.close();
 * })();
 * ```
 *
 * Once you have created a `page` you have access to a large API to interact
 * with the page, navigate, or find certain elements in that page.
 * The {@link Page | `page` documentation} lists all the available methods.
 *
 * @public
 */
class PuppeteerNode extends Puppeteer {
    /**
     * @internal
     */
    constructor(settings) {
        const { projectRoot, preferredRevision, productName, ...commonSettings } = settings;
        super(commonSettings);
        _PuppeteerNode_lazyLauncher.set(this, void 0);
        _PuppeteerNode_projectRoot.set(this, void 0);
        _PuppeteerNode_productName.set(this, void 0);
        Puppeteer_classPrivateFieldSet(this, _PuppeteerNode_projectRoot, projectRoot, "f");
        Puppeteer_classPrivateFieldSet(this, _PuppeteerNode_productName, productName, "f");
        this._preferredRevision = preferredRevision;
        this.connect = this.connect.bind(this);
        this.launch = this.launch.bind(this);
        this.executablePath = this.executablePath.bind(this);
        this.defaultArgs = this.defaultArgs.bind(this);
        this.createBrowserFetcher = this.createBrowserFetcher.bind(this);
    }
    /**
     * This method attaches Puppeteer to an existing browser instance.
     *
     * @remarks
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns Promise which resolves to browser instance.
     */
    connect(options) {
        if (options.product) {
            this._productName = options.product;
        }
        return super.connect(options);
    }
    /**
     * @internal
     */
    get _productName() {
        return Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_productName, "f");
    }
    /**
     * @internal
     */
    set _productName(name) {
        if (Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_productName, "f") !== name) {
            this._changedProduct = true;
        }
        Puppeteer_classPrivateFieldSet(this, _PuppeteerNode_productName, name, "f");
    }
    /**
     * Launches puppeteer and launches a browser instance with given arguments
     * and options when specified.
     *
     * @remarks
     *
     * @example
     * You can use `ignoreDefaultArgs` to filter out `--mute-audio` from default arguments:
     * ```js
     * const browser = await puppeteer.launch({
     *   ignoreDefaultArgs: ['--mute-audio']
     * });
     * ```
     *
     * **NOTE** Puppeteer can also be used to control the Chrome browser,
     * but it works best with the version of Chromium it is bundled with.
     * There is no guarantee it will work with any other version.
     * Use `executablePath` option with extreme caution.
     * If Google Chrome (rather than Chromium) is preferred, a {@link https://www.google.com/chrome/browser/canary.html | Chrome Canary} or {@link https://www.chromium.org/getting-involved/dev-channel | Dev Channel} build is suggested.
     * In `puppeteer.launch([options])`, any mention of Chromium also applies to Chrome.
     * See {@link https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/ | this article} for a description of the differences between Chromium and Chrome. {@link https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md | This article} describes some differences for Linux users.
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns Promise which resolves to browser instance.
     */
    launch(options = {}) {
        if (options.product) {
            this._productName = options.product;
        }
        return this._launcher.launch(options);
    }
    /**
     * @remarks
     *
     * **NOTE** `puppeteer.executablePath()` is affected by the `PUPPETEER_EXECUTABLE_PATH`
     * and `PUPPETEER_CHROMIUM_REVISION` environment variables.
     *
     * @returns A path where Puppeteer expects to find the bundled browser.
     * The browser binary might not be there if the download was skipped with
     * the `PUPPETEER_SKIP_DOWNLOAD` environment variable.
     */
    executablePath(channel) {
        return this._launcher.executablePath(channel);
    }
    /**
     * @internal
     */
    get _launcher() {
        if (!Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f") ||
            Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f").product !== this._productName ||
            this._changedProduct) {
            switch (this._productName) {
                case 'firefox':
                    this._preferredRevision = PUPPETEER_REVISIONS.firefox;
                    break;
                case 'chrome':
                default:
                    this._preferredRevision = PUPPETEER_REVISIONS.chromium;
            }
            this._changedProduct = false;
            Puppeteer_classPrivateFieldSet(this, _PuppeteerNode_lazyLauncher, Launcher(Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_projectRoot, "f"), this._preferredRevision, this._isPuppeteerCore, this._productName), "f");
        }
        return Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f");
    }
    /**
     * The name of the browser that is under automation (`"chrome"` or `"firefox"`)
     *
     * @remarks
     * The product is set by the `PUPPETEER_PRODUCT` environment variable or the `product`
     * option in `puppeteer.launch([options])` and defaults to `chrome`.
     * Firefox support is experimental.
     */
    get product() {
        return this._launcher.product;
    }
    /**
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns The default flags that Chromium will be launched with.
     */
    defaultArgs(options = {}) {
        return this._launcher.defaultArgs(options);
    }
    /**
     * @param options - Set of configurable options to specify the settings
     * of the BrowserFetcher.
     * @returns A new BrowserFetcher instance.
     */
    createBrowserFetcher(options) {
        if (!Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_projectRoot, "f")) {
            throw new Error('_projectRoot is undefined. Unable to create a BrowserFetcher.');
        }
        return new BrowserFetcher(Puppeteer_classPrivateFieldGet(this, _PuppeteerNode_projectRoot, "f"), options);
    }
}
_PuppeteerNode_lazyLauncher = new WeakMap(), _PuppeteerNode_projectRoot = new WeakMap(), _PuppeteerNode_productName = new WeakMap();
//# sourceMappingURL=Puppeteer.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/initializePuppeteer.js
/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




const initializePuppeteer = (packageName) => {
    const isPuppeteerCore = packageName === 'puppeteer-core';
    const puppeteerRootDirectory = (0,external_pkg_dir_.sync)(rootDirname);
    let preferredRevision = PUPPETEER_REVISIONS.chromium;
    // puppeteer-core ignores environment variables
    const productName = !isPuppeteerCore
        ? (process.env['PUPPETEER_PRODUCT'] ||
            process.env['npm_config_puppeteer_product'] ||
            process.env['npm_package_config_puppeteer_product'])
        : undefined;
    if (!isPuppeteerCore && productName === 'firefox') {
        preferredRevision = PUPPETEER_REVISIONS.firefox;
    }
    return new PuppeteerNode({
        projectRoot: puppeteerRootDirectory,
        preferredRevision,
        isPuppeteerCore,
        productName,
    });
};
//# sourceMappingURL=initializePuppeteer.js.map
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const puppeteer_puppeteer = initializePuppeteer('puppeteer');
const { clearCustomQueryHandlers, connect, createBrowserFetcher, customQueryHandlerNames, defaultArgs, devices: puppeteer_devices, errors, executablePath, launch, networkConditions: puppeteer_networkConditions, registerCustomQueryHandler, unregisterCustomQueryHandler, } = puppeteer_puppeteer;
/* harmony default export */ const esm_puppeteer_puppeteer = ((/* unused pure expression or super */ null && (puppeteer_puppeteer)));
//# sourceMappingURL=puppeteer.js.map
// EXTERNAL MODULE: external "user-agents"
var external_user_agents_ = __webpack_require__(807);
// EXTERNAL MODULE: external "crypto-js"
var external_crypto_js_ = __webpack_require__(5666);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/lib/helpers/extractors/goload.js



const ENCRYPTION_KEYS_URL = "https://raw.githubusercontent.com/justfoolingaround/animdl-provider-benchmarks/master/api/gogoanime.json"

let iv = null;
let key = null;
let second_key = null;

const fetch_keys = async() => {
    const response = await external_axios_.get(ENCRYPTION_KEYS_URL);
    const res = response.data;
    return {
        iv: external_crypto_js_.enc.Utf8.parse(res.iv),
        key: external_crypto_js_.enc.Utf8.parse(res.key),
        second_key: external_crypto_js_.enc.Utf8.parse(res.second_key)
    };
}


/**
 * Parses the embedded video URL to encrypt-ajax.php parameters
 * @param {cheerio} $ Cheerio object of the embedded video page
 * @param {string} id Id of the embedded video URL
 */
async function generateEncryptAjaxParameters($, id) {

    const keys = await fetch_keys();
    iv = keys.iv;
    key = keys.key;
    second_key = keys.second_key;

    // encrypt the key
    const encrypted_key = external_crypto_js_.AES.encrypt(id, key, {
        iv: iv,
    });

    const script = $("script[data-name='episode']").data().value
    const token = external_crypto_js_.AES.decrypt(script, key, {
        iv: iv,
    }).toString(external_crypto_js_.enc.Utf8);


    return 'id=' + encrypted_key + '&alias=' + id + '&' + token;
}
/**
 * Decrypts the encrypted-ajax.php response
 * @param {object} obj Response from the server
 */
function decryptEncryptAjaxResponse(obj) {

    const decrypted = external_crypto_js_.enc.Utf8.stringify(external_crypto_js_.AES.decrypt(obj.data, second_key, {
        iv: iv
    }));
    return JSON.parse(decrypted);
}
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/lib/helpers/extractors/streamsb.js




const HOST = "https://sbplay2.com/sources43"

const PAYLOAD = (hex) => `7361696b6f757c7c${hex}7c7c7361696b6f757c7c73747265616d7362/7361696b6f757c7c363136653639366436343663363136653639366436343663376337633631366536393664363436633631366536393664363436633763376336313665363936643634366336313665363936643634366337633763373337343732363536313664373336327c7c7361696b6f757c7c73747265616d7362`

const streamsb_extractStreamSB = async(url) => {
    url = new URL(url)

    const id = url.href.split("/e/").pop()
    let arrBytes = new TextEncoder().encode(id)

    const res = await axios.get(`${HOST}/${PAYLOAD(toHexString(Array.from(arrBytes)))}`, { headers: { watchsb: "streamsb", "User-Agent": USER_AGENT } })

    return res.data
}

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/lib/helpers/extractors/fembed.js


const fembed_extractFembed = async(url) => {
    try {
        url = new URL(url)
        const fembedApiUrl = url.href.replace("/v/", "/api/source/")
        const res = await axios.post(fembedApiUrl, {
            headers: {
                Referer: url.href,

            }
        })

        if (!res.data.success) return false

        return {
            headers: {
                Referer: url.href,
            },
            data: res.data.data
        }
    } catch (e) {
        return { error: "No sources found!! Try different source\n\n" + e.message }
    }
}
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/lib/utils.js
const utils_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
const renameKey = (obj, oldKey, newKey) => {
    if (!obj.hasOwnProperty(oldKey)) return
    const oldValue = obj[oldKey]
    delete obj[oldKey]
    obj[newKey] = oldValue
}
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/lib/anime_parser.js











const BASE_URL = "https://gogoanime.film/"
const BASE_URL2 = "https://gogoanime.gg/"
const ajax_url = "https://ajax.gogo-load.com/"
const anime_info_url = "https://gogoanime.film/category/"
const anime_movies_path = "/anime-movies.html"
const popular_path = "/popular.html"
const new_season_path = "/new-season.html"
const search_path = "/search.html"
const popular_ongoing_url = `${ajax_url}ajax/page-recent-release-ongoing.html`;
const recent_release_url = `${ajax_url}ajax/page-recent-release.html`
const list_episodes_url = `${ajax_url}ajax/load-list-episode`
const seasons_url = "https://gogoanime.film/sub-category/"

const Referer = "https://gogoplay.io/"
const goload_stream_url = "https://goload.pro/streaming.php"
const DownloadReferer = "https://goload.pro/"

const disqus_iframe = (episodeId) => `https://disqus.com/embed/comments/?base=default&f=gogoanimetv&t_u=https%3A%2F%2Fgogoanime.vc%2F${episodeId}&s_o=default#version=cfefa856cbcd7efb87102e7242c9a829`
const disqus_api = (threadId, page) => `https://disqus.com/api/3.0/threads/listPostsThreaded?limit=100&thread=${threadId}&forum=gogoanimetv&order=popular&cursor=${page}:0:0&api_key=E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F`

const Genres = (/* unused pure expression or super */ null && ([
    "action",
    "adventure",
    "cars",
    "comedy",
    "crime",
    "dementia",
    "demons",
    "drama",
    "dub",
    "ecchi",
    "family",
    "fantasy",
    "game",
    "gourmet",
    "harem",
    "hentai",
    "historical",
    "horror",
    "josei",
    "kids",
    "magic",
    "martial-arts",
    "mecha",
    "military",
    "Mmusic",
    "mystery",
    "parody",
    "police",
    "psychological",
    "romance",
    "samurai",
    "school",
    "sci-fi",
    "seinen",
    "shoujo",
    "shoujo-ai",
    "shounen",
    "shounen-ai",
    "slice-of-Life",
    "space",
    "sports",
    "super-power",
    "supernatural",
    "suspense",
    "thriller",
    "vampire",
    "yaoi",
    "yuri",
]))

const cachedDownloadLinks = {}

const scrapeFembed = async({ id }) => {
    try {
        const epPage = await axios.get(BASE_URL2 + id);
        const $ = cheerio.load(epPage.data)

        const server = $(".xstreamcdn > a:nth-child(1)").attr("data-video")
        const serverUrl = new URL(server)

        const sources = await extractFembed(serverUrl.href)

        if (!sources) return { error: "No sources found!! Try different source." }

        return sources

    } catch (e) {
        return { error: e.message }
    }

}


const scrapeStreamSB = async({ id }) => {
    try {
        const epPage = await axios.get(BASE_URL2 + id);
        const $ = cheerio.load(epPage.data)

        const server = $('div.anime_video_body > div.anime_muti_link > ul > li.streamsb > a').attr('data-video')
        const serverUrl = new URL(server)

        const res = await extractStreamSB(serverUrl.href)

        if (!res.stream_data) return { error: "No sources found!! Try different source." }

        return {
            headers: { Referer: serverUrl.href },
            data: [{ file: res.stream_data.file }, { backup: res.stream_data.backup }]
        }


    } catch (err) {
        console.log(err)
        return { error: err.message }
    }
}

const scrapeMP4 = async({ id }) => {
    let sources = [];
    let sources_bk = [];
    try {
        let epPage, server, $, serverUrl;

        if (id.includes("episode")) {
            epPage = await external_axios_.get(BASE_URL2 + id);
            $ = external_cheerio_.load(epPage.data)

            server = $('#load_anime > div > div > iframe').attr('src')
            serverUrl = new URL("https:" + server)

        } else serverUrl = new URL(`${goload_stream_url}?id=${id}`)


        const goGoServerPage = await external_axios_.get(serverUrl.href, { headers: { 'User-Agent': utils_USER_AGENT } })
        const $$ = external_cheerio_.load(goGoServerPage.data)

        const params = await generateEncryptAjaxParameters($$, serverUrl.searchParams.get('id'));

        const fetchRes = await external_axios_.get(`
        ${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${params}`, {
            headers: {
                'User-Agent': utils_USER_AGENT,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        const res = decryptEncryptAjaxResponse(fetchRes.data)

        if (!res.source) return { error: "No sources found!! Try different source." };

        res.source.forEach(source => sources.push(source))
        res.source_bk.forEach(source => sources_bk.push(source))

        return {
            Referer: serverUrl.href,
            sources: sources,
            sources_bk: sources_bk
        }

    } catch (err) {
        return { error: err }
    }
}

const scrapeSearch = async({ list = [], keyw, page = 1 }) => {
    try {
        const searchPage = await external_axios_.get(`${ BASE_URL + search_path }?keyword=${keyw}&page=${page}`);
        const $ = external_cheerio_.load(searchPage.data);

        $('div.last_episodes > ul > li').each((i, el) => {
            list.push({
                animeId: $(el).find('p.name > a').attr('href').split('/')[2],
                animeTitle: $(el).find('p.name > a').attr('title'),
                animeUrl: BASE_URL + "/" + $(el).find('p.name > a').attr('href'),
                animeImg: $(el).find('div > a > img').attr('src'),
                status: $(el).find('p.released').text().trim()
            });
        });

        return list;
    } catch (err) {
        console.log(err)
        return { error: err }
    }
};

const scrapeRecentRelease = async({ list = [], page = 1, type = 1 }) => {
    try {

        const mainPage = await axios.get(`
        ${recent_release_url}?page=${page}&type=${type}
        `)
        const $ = cheerio.load(mainPage.data)

        $('div.last_episodes.loaddub > ul > li').each((i, el) => {
            list.push({
                episodeId: $(el).find('p.name > a').attr('href').split('/')[1],
                animeTitle: $(el).find('p.name > a').attr('title'),
                episodeNum: $(el).find('p.episode').text().replace('Episode ', '').trim(),
                subOrDub: $(el).find('div > a > div').attr('class').replace('type ic-', ''),
                animeImg: $(el).find('div > a > img').attr('src'),
                episodeUrl: BASE_URL + "/" + $(el).find('p.name > a').attr('href')
            })
        })
        return list

    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const scrapeNewSeason = async({ list = [], page = 1 }) => {
    try {
        const popularPage = await axios.get(`
        ${BASE_URL+new_season_path}?page=${page}
        `)
        const $ = cheerio.load(popularPage.data)


        $('div.last_episodes > ul > li').each((i, el) => {

            list.push({
                animeId: $(el).find('p.name > a').attr('href').split('/')[2],
                animeTitle: $(el).find('p.name > a').attr('title'),
                animeImg: $(el).find('div > a > img').attr('src'),
                releasedDate: $(el).find('p.released').text().replace('Released: ', '').trim(),
                animeUrl: BASE_URL + "/" + $(el).find('p.name > a').attr('href')
            })
        })
        return list

    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const scrapePopularAnime = async({ list = [], page = 1 }) => {
    try {
        const popularPage = await axios.get(`
        ${BASE_URL+popular_path}?page=${page}
       `)
        const $ = cheerio.load(popularPage.data)


        $('div.last_episodes > ul > li').each((i, el) => {

            list.push({
                animeId: $(el).find('p.name > a').attr('href').split('/')[2],
                animeTitle: $(el).find('p.name > a').attr('title'),
                animeImg: $(el).find('div > a > img').attr('src'),
                releasedDate: $(el).find('p.released').text().replace('Released: ', '').trim(),
                animeUrl: BASE_URL + "/" + $(el).find('p.name > a').attr('href')
            })
        })
        return list

    } catch (err) {
        console.log(err)
        return { error: err }
    }

}


const scrapeAnimeMovies = async({ list = [], aph = "", page = 1 }) => {
    try {
        const popularPage = await axios.get(`
        ${BASE_URL+anime_movies_path}?aph=${aph.trim().toUpperCase()}&page=${page}
        `)
        const $ = cheerio.load(popularPage.data)


        $('div.last_episodes > ul > li').each((i, el) => {
            list.push({
                animeId: $(el).find('p.name > a').attr('href').split('/')[2],
                animeTitle: $(el).find('p.name > a').attr('title'),
                animeImg: $(el).find('div > a > img').attr('src'),
                releasedDate: $(el).find('p.released').text().replace('Released: ', '').trim(),
                animeUrl: BASE_URL + "/" + $(el).find('p.name > a').attr('href')
            })
        })
        return list

    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const scrapeTopAiringAnime = async({ list = [], page = 1 }) => {
    try {
        if (page == -1) {

            let pageNum = 1
            let hasMore = true
            while (hasMore) {

                const popular_page = await axios.get(`
                ${popular_ongoing_url}?page=${pageNum}
                `)
                const $ = cheerio.load(popular_page.data)

                if ($('div.added_series_body.popular > ul > li').length == 0) {
                    hasMore = false
                    continue
                }
                $('div.added_series_body.popular > ul > li').each((i, el) => {
                    let genres = []
                    $(el).find('p.genres > a').each((i, el) => {
                        genres.push($(el).attr('title'))
                    })
                    list.push({
                        animeId: $(el).find('a:nth-child(1)').attr('href').split('/')[2],
                        animeTitle: $(el).find('a:nth-child(1)').attr('title'),
                        animeImg: $(el).find('a:nth-child(1) > div').attr('style').match('(https?:\/\/.*\.(?:png|jpg))')[0],
                        latestEp: $(el).find('p:nth-child(4) > a').text().trim(),
                        animeUrl: BASE_URL + "/" + $(el).find('a:nth-child(1)').attr('href'),
                        genres: genres
                    })
                })
                pageNum++

            }
            return list
        }

        const popular_page = await axios.get(`
        ${popular_ongoing_url}?page=${page}
        `)
        const $ = cheerio.load(popular_page.data)

        $('div.added_series_body.popular > ul > li').each((i, el) => {
            let genres = []
            $(el).find('p.genres > a').each((i, el) => {
                genres.push($(el).attr('title'))
            })
            list.push({
                animeId: $(el).find('a:nth-child(1)').attr('href').split('/')[2],
                animeTitle: $(el).find('a:nth-child(1)').attr('title'),
                animeImg: $(el).find('a:nth-child(1) > div').attr('style').match('(https?:\/\/.*\.(?:png|jpg))')[0],
                latestEp: $(el).find('p:nth-child(4) > a').text().trim(),
                animeUrl: BASE_URL + "/" + $(el).find('a:nth-child(1)').attr('href'),
                genres: genres
            })
        })

        return list
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const scrapeGenre = async({ list = [], genre, page = 1 }) => {
    try {
        genre = genre.trim().replace(/ /g, '-').toLowerCase()

        if (Genres.indexOf(genre) > -1) {
            const genrePage = await axios.get(`${BASE_URL}genre/${genre}?page=${page}`)
            const $ = cheerio.load(genrePage.data)

            $('div.last_episodes > ul > li').each((i, elem) => {
                list.push({
                    animeId: $(elem).find('p.name > a').attr('href').split('/')[2],
                    animeTitle: $(elem).find('p.name > a').attr('title'),
                    animeImg: $(elem).find('div > a > img').attr('src'),
                    releasedDate: $(elem).find('p.released').text().replace('Released: ', '').trim(),
                    animeUrl: BASE_URL + "/" + $(elem).find('p.name > a').attr('href')
                })
            })
            return list

        }
        return { error: "Genre Not Found" }

    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

// scrapeGenre({ genre: "cars", page: 1 }).then((res) => console.log(res))


/**
 * @param {string} id anime id.
 * @returns Resolves when the scraping is complete.
 * @example 
 * scrapeGoGoAnimeInfo({id: "naruto"})
 * .then((res) => console.log(res)) // => The anime information is returned in an Object.
 * .catch((err) => console.log(err))
 * 
 */
const scrapeAnimeDetails = async({ id }) => {
    try {
        let genres = []
        let epList = []

        const animePageTest = await external_axios_.get(`https://gogoanime.gg/category/${id}`)

        const $ = external_cheerio_.load(animePageTest.data)

        const animeTitle = $('div.anime_info_body_bg > h1').text()
        const animeImage = $('div.anime_info_body_bg > img').attr('src')
        const type = $('div.anime_info_body_bg > p:nth-child(4) > a').text()
        const desc = $('div.anime_info_body_bg > p:nth-child(5)').text().replace('Plot Summary: ', '')
        const releasedDate = $('div.anime_info_body_bg > p:nth-child(7)').text().replace('Released: ', '')
        const status = $('div.anime_info_body_bg > p:nth-child(8) > a').text()
        const otherName = $('div.anime_info_body_bg > p:nth-child(9)').text().replace('Other name: ', '').replace(/;/g, ',')

        $('div.anime_info_body_bg > p:nth-child(6) > a').each((i, elem) => {
            genres.push($(elem).attr('title').trim())
        })

        const ep_start = $("#episode_page > li").first().find('a').attr('ep_start')
        const ep_end = $('#episode_page > li').last().find('a').attr('ep_end')
        const movie_id = $('#movie_id').attr('value')
        const alias = $('#alias_anime').attr('value')

        const html = await external_axios_.get(`${list_episodes_url}?ep_start=${ep_start}&ep_end=${ep_end}&id=${movie_id}&default_ep=${0}&alias=${alias}`)
        const $$ = external_cheerio_.load(html.data);

        $$("#episode_related > li").each((i, el) => {
            epList.push({
                episodeId: $(el).find("a").attr("href").split('/')[1],
                episodeNum: $(el).find(`div.name`).text().replace('EP ', ''),
                episodeUrl: BASE_URL + $(el).find(`a`).attr('href').trim()
            })
        })

        return {
            animeTitle: animeTitle.toString(),
            type: type.toString(),
            releasedDate: releasedDate.toString(),
            status: status.toString(),
            genres: genres,
            otherNames: otherName,
            synopsis: desc.toString(),
            animeImg: animeImage.toString(),
            totalEpisodes: ep_end,
            episodesList: epList
        }




    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const scrapeSeason = async({ list = [], season, page = 1 }) => {
    try {
        const season_page = await axios.get(`
                ${seasons_url}
        ${season}?page=${page}
    `)
        const $ = cheerio.load(season_page.data)

        $('div.last_episodes > ul > li').each((i, el) => {
            list.push({
                animeId: $(el).find('div > a').attr('href').split('/')[2],
                animeTitle: $(el).find('div > a').attr('title'),
                animeImg: $(el).find('div > a > img').attr('src'),
                animeUrl: BASE_URL + "/" + $(el).find('div > a').attr('href'),
            })
        })

        return list
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

// scrapeAnimeDetails({ id: "naruto" }).then((res) => console.log(res))


const scrapeThread = async({ episodeId, page = 0 }) => {
    try {
        let threadId = null

        const thread_page = await axios.get(disqus_iframe(decodeURIComponent(episodeId)))
        const $ = cheerio.load(thread_page.data, { xmlMode: true })

        const thread = JSON.parse($('#disqus-threadData')[0].children[0].data)

        if (thread.code === 0 && thread.cursor.total > 0) {
            threadId = thread.response.thread.id
        }

        const thread_api_res = (await axios.get(disqus_api(threadId, page))).data

        return {
            threadId: threadId,
            currentPage: page,
            hasNextPage: thread_api_res.cursor.hasNext,
            comments: thread_api_res.response
        }

    } catch (err) {
        if (err.response.status === 400) {
            return { error: "Invalid page. Try again." }
        }
        return { error: err }
    }

}

const scrapeDownloadLinks = async({ episodeId }) => {

    if (!episodeId) {
        return { error: "No episode id provided" }
    }

    if (cachedDownloadLinks[episodeId]) {
        if (parseInt(new URL(cachedDownloadLinks[episodeId].sources[0].url).searchParams.get('expires')) < Date.now() + 1.08e+7) {
            return cachedDownloadLinks[episodeId]
        }
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
        const download_links = [];

        const e_page = await axios.get(`https://gogoanime.gg/${episodeId}`)

        const $ = cheerio.load(e_page.data)

        const d_link = $(`div.anime_video_body > div.download-anime > div > ul > li.dowloads > a`).attr("href")

        const d_page = await browser.newPage()
        await d_page.setUserAgent(userAgent.toString())
        await d_page.goto(d_link, { waitUntil: 'networkidle2' })

        const d_links = await d_page.$$eval('div.mirror_link:nth-child(1) > div.dowload', (links) => links.map(link => {
            return { quality: link.children[0].innerHTML.split('(')[1].split('P')[0] + 'p', url: link.children[0].getAttribute('href') }
        }))

        await Promise.all(d_links.map(async(obj, i) => {
            await axios.get(obj.url).catch(err => d_links.at(i).url = `${err.response.request._redirectable._options.href}`)
        }))

        cachedDownloadLinks[episodeId] = {
            headers: {
                Referer: DownloadReferer,
            },
            sources: d_links
        }

        await browser.close()

        return {
            headers: {
                Referer: DownloadReferer,
            },
            sources: [...d_links],
        }

    } catch (err) {
        await browser.close()
        return { error: err }
    }
}

/***/ }),

/***/ 2679:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NodeWebSocketTransport": () => (/* binding */ NodeWebSocketTransport)
});

// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/ws/lib/stream.js
var stream = __webpack_require__(8724);
// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/ws/lib/receiver.js
var receiver = __webpack_require__(7881);
// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/ws/lib/sender.js
var sender = __webpack_require__(485);
// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/ws/lib/websocket.js
var websocket = __webpack_require__(8999);
// EXTERNAL MODULE: ./node_modules/gogoanime-api/node_modules/ws/lib/websocket-server.js
var websocket_server = __webpack_require__(5764);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/ws/wrapper.mjs







/* harmony default export */ const wrapper = (websocket);

;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/generated/version.js
const packageVersion = '14.4.1';
//# sourceMappingURL=version.js.map
// EXTERNAL MODULE: external "dns"
var external_dns_ = __webpack_require__(9523);
;// CONCATENATED MODULE: ./node_modules/gogoanime-api/node_modules/puppeteer/lib/esm/puppeteer/node/NodeWebSocketTransport.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NodeWebSocketTransport_ws;
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class NodeWebSocketTransport {
    constructor(ws) {
        _NodeWebSocketTransport_ws.set(this, void 0);
        __classPrivateFieldSet(this, _NodeWebSocketTransport_ws, ws, "f");
        __classPrivateFieldGet(this, _NodeWebSocketTransport_ws, "f").addEventListener('message', (event) => {
            if (this.onmessage) {
                this.onmessage.call(null, event.data);
            }
        });
        __classPrivateFieldGet(this, _NodeWebSocketTransport_ws, "f").addEventListener('close', () => {
            if (this.onclose) {
                this.onclose.call(null);
            }
        });
        // Silently ignore all errors - we don't know what to do with them.
        __classPrivateFieldGet(this, _NodeWebSocketTransport_ws, "f").addEventListener('error', () => { });
    }
    static async create(urlString) {
        // TODO(jrandolf): Starting in Node 17, IPv6 is favoured over IPv4 due to a change
        // in a default option:
        // - https://github.com/nodejs/node/issues/40537,
        // Due to this, for Firefox, we must parse and resolve the `localhost` hostname
        // manually with the previous behavior according to:
        // - https://nodejs.org/api/dns.html#dnslookuphostname-options-callback
        // because of https://bugzilla.mozilla.org/show_bug.cgi?id=1769994.
        const url = new URL(urlString);
        if (url.hostname === 'localhost') {
            const { address } = await external_dns_.promises.lookup(url.hostname, { verbatim: false });
            url.hostname = address;
        }
        return new Promise((resolve, reject) => {
            const ws = new wrapper(url, [], {
                followRedirects: true,
                perMessageDeflate: false,
                maxPayload: 256 * 1024 * 1024,
                headers: {
                    'User-Agent': `Puppeteer ${packageVersion}`,
                },
            });
            ws.addEventListener('open', () => {
                return resolve(new NodeWebSocketTransport(ws));
            });
            ws.addEventListener('error', reject);
        });
    }
    send(message) {
        __classPrivateFieldGet(this, _NodeWebSocketTransport_ws, "f").send(message);
    }
    close() {
        __classPrivateFieldGet(this, _NodeWebSocketTransport_ws, "f").close();
    }
}
_NodeWebSocketTransport_ws = new WeakMap();
//# sourceMappingURL=NodeWebSocketTransport.js.map

/***/ })

};
;