import "./chunk-DC5AMYBS.js";

// node_modules/redux-persist/es/storage/getStorage.js
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function noop() {
}
var noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop
};
function hasStorage(storageType) {
  if ((typeof self === "undefined" ? "undefined" : _typeof(self)) !== "object" || !(storageType in self)) {
    return false;
  }
  try {
    var storage = self[storageType];
    var testKey = "redux-persist ".concat(storageType, " test");
    storage.setItem(testKey, "test");
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (true) console.warn("redux-persist ".concat(storageType, " test failed, persistence will be disabled."));
    return false;
  }
  return true;
}
function getStorage(type) {
  var storageType = "".concat(type, "Storage");
  if (hasStorage(storageType)) return self[storageType];
  else {
    if (true) {
      console.error("redux-persist failed to create sync storage. falling back to noop storage.");
    }
    return noopStorage;
  }
}

// node_modules/redux-persist/es/storage/createWebStorage.js
function createWebStorage(type) {
  var storage = getStorage(type);
  return {
    getItem: function getItem(key) {
      return new Promise(function(resolve, reject) {
        resolve(storage.getItem(key));
      });
    },
    setItem: function setItem(key, item) {
      return new Promise(function(resolve, reject) {
        resolve(storage.setItem(key, item));
      });
    },
    removeItem: function removeItem(key) {
      return new Promise(function(resolve, reject) {
        resolve(storage.removeItem(key));
      });
    }
  };
}

// node_modules/redux-persist/es/storage/index.js
var storage_default = createWebStorage("local");
export {
  storage_default as default
};
//# sourceMappingURL=redux-persist_es_storage.js.map
