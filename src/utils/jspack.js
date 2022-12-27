// utility pack and unpack functions to simplify magic
var common = {
  pack: function (method, dv, value, offset, c) {
    if (!Array.isArray(value)) value = [value];

    for (var i = 0; i < c; i++) dv[method](value[i], offset + i);
  },
  unpack: function (method, dv, offset, c) {
    var r = [];
    for (var i = 0; i < c; i++) r.push(dv[method](offset + i));

    return r;
  },
};

function isAlphaNumeric(b) {
  if (b >= '0' && b <= '9') return true;
  if (b >= 'A' && b <= 'Z') return true;
  if (b >= 'a' && b <= 'z') return true;
  return false;
}

// pack and unpacking for different types
var magic = {
  // byte array
  A: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      if (Array.isArray(value)) {
        common.pack('writeInt8', dv, ...value, offset, c);
      } else {
        common.pack('writeInt8', dv, value, offset, c);
      }
    },
    unpack: function (dv, offset, c, littleendian) {
      return [common.unpack('readInt8', dv, offset, c)];
    },
  },
  // padding byte
  x: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      for (var i = 0; i < c; i++) dv.writeUInt8(0, offset + i);
    },
    unpack: function (dv, offset, c, littleendian) {
      var r = [];
      for (var i = 0; i < c; i++) r.push(0);

      return r;
    },
  },
  // char
  c: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (var i = 0; i < c; i++)
        dv.writeUInt8(value[i].charCodeAt(0), offset + i);
    },
    unpack: function (dv, offset, c, littleendian) {
      var r = [];
      for (var i = 0; i < c; i++)
        r.push(String.fromCharCode(dv.readUInt8(offset + i)));

      return r;
    },
  },
  // LFS car name string
  C: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      var val = new String(value[0]);

      for (var i = 0; i < c; i++) {
        var code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.writeUInt8(code, offset + i);
      }
    },
    unpack: function (dv, offset, c, littleendian) {
      var r = [];
      for (var i = 0; i < 4; i++)
        r.push(String.fromCharCode(dv.readUInt8(offset + i)));

      if (
        isAlphaNumeric(r[0]) &&
        isAlphaNumeric(r[1]) &&
        isAlphaNumeric(r[2]) &&
        r[3] === '\x00'
      ) {
        return [r.join('')];
      } else {
        return [
          [
            dv.toString('hex', offset + 2, offset + 3),
            dv.toString('hex', offset + 1, offset + 2),
            dv.toString('hex', offset, offset + 1),
          ]
            .join('')
            .toUpperCase(),
        ];
      }
    },
  },
  // signed char
  b: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack('writeInt8', dv, value, offset, c);
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack('readInt8', dv, offset, c);
    },
  },
  // unsigned char
  B: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack('writeUInt8', dv, value, offset, c);
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack('readUInt8', dv, offset, c);
    },
  },
  // signed short
  h: {
    length: 2,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeInt16' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readInt16' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned short
  H: {
    length: 2,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeUInt16' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readUInt16' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // signed long
  i: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned long
  I: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeUInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readUInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  l: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned long
  L: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeUInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readUInt32' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // char[]
  s: {
    length: 1,
    pack: function (dv, value, offset, c, littleendian) {
      var val = new String(value[0]);

      for (var i = 0; i < c; i++) {
        var code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.writeUInt8(code, offset + i);
      }
    },
    unpack: function (dv, offset, c, littleendian) {
      var r = [];
      for (var i = 0; i < c; i++)
        r.push(String.fromCharCode(dv.readUInt8(offset + i)));

      return [r.join('')];
    },
  },
  // float
  f: {
    length: 4,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeFloat' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readFloat' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
  // double
  d: {
    length: 8,
    pack: function (dv, value, offset, c, littleendian) {
      common.pack(
        'writeDouble' + (littleendian ? 'LE' : 'BE'),
        dv,
        value,
        offset,
        c,
      );
    },
    unpack: function (dv, offset, c, littleendian) {
      return common.unpack(
        'readDouble' + (littleendian ? 'LE' : 'BE'),
        dv,
        offset,
        c,
      );
    },
  },
};

// pattern of stuff we're looking for
var pattern = '(\\d+)?([AxcCbBhHsfdiIlL])';

// determine the size of arraybuffer we'd need
var determineLength = function (fmt) {
  var re = new RegExp(pattern, 'g'),
    m,
    sum = 0;

  while ((m = re.exec(fmt)))
    sum +=
      (m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1])) *
      magic[m[2]].length;

  return sum;
};

// pack a set of values, starting at offset, based on format
var pack = function (fmt, values, offset) {
  var littleendian = fmt.charAt(0) == '<';
  offset = offset ? offset : 0;

  var ab = new Buffer.alloc(determineLength(fmt)),
    re = new RegExp(pattern, 'g'),
    m,
    c,
    l,
    i = 0;

  while ((m = re.exec(fmt))) {
    if (magic[m[2]] == undefined) throw new Error('Unknown format type');

    c = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
    l = magic[m[2]].length;

    if (offset + c * l > ab.length) return;

    var value = values.slice(i, i + 1);

    magic[m[2]].pack(ab, value, offset, c, littleendian);

    offset += c * l;
    i += 1;
  }

  return ab;
};

// unpack an arraybuffer, starting at offset, based on format
// returns an array
var unpack = function (fmt, ab, offset) {
  var littleendian = fmt.charAt(0) == '<',
    // eslint-disable-next-line no-redeclare
    offset = offset ? offset : 0;

  var results = [],
    re = new RegExp(pattern, 'g'),
    m,
    c,
    l;

  while ((m = re.exec(fmt))) {
    if (magic[m[2]] == undefined) throw new Error('Unknown format type');

    c = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
    l = magic[m[2]].length;

    if (offset + c * l > ab.length) return;

    results = results.concat(magic[m[2]].unpack(ab, offset, c, littleendian));

    offset += c * l;
  }

  return results;
};

export { determineLength, pack, unpack };
