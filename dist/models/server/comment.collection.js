"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createCommentCollection;
var node_appwrite_1 = require("node-appwrite");
// grabbing names of database and collection
var name_1 = require("../name");
var config_1 = require("./config");
function createCommentCollection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // create collection
                return [4 /*yield*/, config_1.databases.createCollection(name_1.db, name_1.commentCollection, name_1.commentCollection, [
                        // these permissions are based on roles which van be modifies on appwrite
                        // by default 2 roles available
                        // 1. any = has read permission
                        // 2. user = who has all permissions
                        // any have only read permission
                        node_appwrite_1.Permission.read("any"),
                        // users have all
                        node_appwrite_1.Permission.read("users"),
                        node_appwrite_1.Permission.create("users"),
                        node_appwrite_1.Permission.update("users"),
                        node_appwrite_1.Permission.delete("users"),
                    ])];
                case 1:
                    // create collection
                    _a.sent();
                    console.log("Comment collection is created");
                    // creating attributes and indexes
                    return [4 /*yield*/, Promise.all([
                            config_1.databases.createStringAttribute(name_1.db, name_1.commentCollection, "content", 10000, true),
                            // new field
                            config_1.databases.createEnumAttribute(name_1.db, name_1.commentCollection, "type", ["answer", "question"], true),
                            config_1.databases.createStringAttribute(name_1.db, name_1.commentCollection, "typeId", 50, true),
                            config_1.databases.createStringAttribute(name_1.db, name_1.commentCollection, "authorId", 50, false),
                        ])];
                case 2:
                    // creating attributes and indexes
                    _a.sent();
                    console.log("Comment Attributes Created");
                    return [2 /*return*/];
            }
        });
    });
}
