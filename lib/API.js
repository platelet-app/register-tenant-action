"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAttributeTypes = void 0;
var ModelSortDirection;
(function (ModelSortDirection) {
    ModelSortDirection["ASC"] = "ASC";
    ModelSortDirection["DESC"] = "DESC";
})(ModelSortDirection || (ModelSortDirection = {}));
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes = exports.ModelAttributeTypes || (exports.ModelAttributeTypes = {}));
