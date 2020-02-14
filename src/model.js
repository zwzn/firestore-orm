"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var query_builder_1 = require("./query-builder");
var Model = /** @class */ (function () {
    function Model() {
        this.original = {};
        this.attributes = {};
    }
    Model.builder = function () {
        var m = new this();
        return new query_builder_1.QueryBuilder(this, m.collection);
    };
    Model.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var m, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        m = new this();
                        return [4 /*yield*/, m.collection.doc(id).get()];
                    case 1:
                        doc = _a.sent();
                        Object.assign(m, __assign(__assign({}, doc.data()), { id: doc.id }));
                        m.postSave();
                        return [2 /*return*/, m];
                }
            });
        });
    };
    Model.subscribe = function (id, callback) {
        var _this = this;
        return (new this()).collection.doc(id).onSnapshot(function (doc) {
            var m = new _this();
            Object.assign(m, __assign(__assign({}, doc.data()), { id: doc.id }));
            m.postSave();
            callback(m);
        });
    };
    Model.field = function (options) {
        if (options === void 0) { options = {}; }
        return function (type, f) {
            var constructor = type.constructor;
            if (constructor.options === undefined) {
                constructor.options = {};
            }
            constructor.options[f] = options;
            return {
                get: function () {
                    if (this.attributes.hasOwnProperty(f)) {
                        return this.attributes[f];
                    }
                    return this.original[f];
                },
                set: function (value) {
                    if (this.original[f] === value) {
                        delete this.attributes[f];
                    }
                    else {
                        this.attributes[f] = value;
                    }
                }
            };
        };
    };
    Model.prototype.save = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var saveObject, _i, _b, key, value, options, docRef;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        saveObject = {};
                        this.saving();
                        for (_i = 0, _b = Object.keys(this.constructor.options); _i < _b.length; _i++) {
                            key = _b[_i];
                            value = this[key];
                            options = this.constructor.options[key];
                            if (value === undefined) {
                                continue;
                            }
                            if ((_a = options) === null || _a === void 0 ? void 0 : _a.readonly) {
                                continue;
                            }
                            saveObject[key] = value;
                        }
                        if (!(this.id === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.collection.add(saveObject)];
                    case 1:
                        docRef = _c.sent();
                        this.id = docRef.id;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.collection.doc(this.id).set(saveObject, { merge: true })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        this.postSave();
                        this.saved();
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.postSave = function () {
        this.original = __assign(__assign({}, this.original), this.attributes);
        this.attributes = {};
    };
    Model.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deleting();
                        if (this.id === undefined) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.collection.doc(this.id)["delete"]()];
                    case 1:
                        _a.sent();
                        this.deleted();
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.hasChanges = function () {
        return Object.keys(this.attributes).length > 0;
    };
    Model.prototype.toJSON = function () {
        return __assign(__assign({}, this.original), this.attributes);
    };
    Model.prototype.saving = function () {
        // this should stay empty
    };
    Model.prototype.saved = function () {
        // this should stay empty
    };
    Model.prototype.deleting = function () {
        // this should stay empty
    };
    Model.prototype.deleted = function () {
        // this should stay empty
    };
    return Model;
}());
exports.Model = Model;
