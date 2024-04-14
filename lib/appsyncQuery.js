"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantByName = exports.registerTenantQuery = void 0;
// amplify/backend/function/appsyncOperations/opt/appSyncRequest.js
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const core = __importStar(require("@actions/core"));
const sha256_js_1 = require("@aws-crypto/sha256-js");
const signature_v4_1 = require("@aws-sdk/signature-v4");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const node_fetch_1 = __importStar(require("node-fetch"));
const mutations_1 = require("./graphql/mutations");
const queries_1 = require("./graphql/queries");
const request = (queryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const apiURL = core.getInput("tenantApiUrl");
    const region = core.getInput("awsRegion");
    const accessKeyId = core.getInput("awsAccessKeyId");
    const secretAccessKey = core.getInput("awsSecretAccessKey");
    console.log("apiURL", apiURL);
    console.log("region", region);
    console.log("queryDetails", queryDetails);
    const endpoint = new URL(apiURL);
    const credentials = {
        accessKeyId,
        secretAccessKey,
    };
    const signer = new signature_v4_1.SignatureV4({
        credentials,
        region,
        service: "appsync",
        sha256: sha256_js_1.Sha256,
    });
    const requestToBeSigned = new protocol_http_1.HttpRequest({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            host: endpoint.host,
        },
        hostname: endpoint.host,
        body: JSON.stringify(queryDetails),
        path: endpoint.pathname,
    });
    const signed = yield signer.sign(requestToBeSigned);
    const request = new node_fetch_1.Request(endpoint, signed);
    return yield (0, node_fetch_1.default)(request);
});
const errorCheck = (body) => {
    if (body === null || body === void 0 ? void 0 : body.errors) {
        console.error(body === null || body === void 0 ? void 0 : body.errors);
        throw new Error(body === null || body === void 0 ? void 0 : body.errors[0].message);
    }
};
const registerTenantQuery = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield request({
        variables: input,
        query: mutations_1.registerTenant,
    });
    const body = yield response.json();
    errorCheck(body);
    return (_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.registerTenant;
});
exports.registerTenantQuery = registerTenantQuery;
const getTenantByName = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    const response = yield request({
        variables,
        query: queries_1.getTenantByTenantName,
    });
    const body = yield response.json();
    errorCheck(body);
    console.log("aaaa: ", (_c = (_b = body === null || body === void 0 ? void 0 : body.data) === null || _b === void 0 ? void 0 : _b.getTenantByTenantName) === null || _c === void 0 ? void 0 : _c.items);
    return ((_e = (_d = body === null || body === void 0 ? void 0 : body.data) === null || _d === void 0 ? void 0 : _d.getTenantByTenantName) === null || _e === void 0 ? void 0 : _e.items[0]) || null;
});
exports.getTenantByName = getTenantByName;
