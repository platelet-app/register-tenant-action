"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDeleteTenant = exports.onUpdateTenant = exports.onCreateTenant = void 0;
exports.onCreateTenant = `
  subscription OnCreateTenant($filter: ModelSubscriptionTenantFilterInput) {
    onCreateTenant(filter: $filter) {
      id
      awsEnvName
      name
      config
      version
      createdAt
      updatedAt
    }
  }
`;
exports.onUpdateTenant = `
  subscription OnUpdateTenant($filter: ModelSubscriptionTenantFilterInput) {
    onUpdateTenant(filter: $filter) {
      id
      awsEnvName
      name
      config
      version
      createdAt
      updatedAt
    }
  }
`;
exports.onDeleteTenant = `
  subscription OnDeleteTenant($filter: ModelSubscriptionTenantFilterInput) {
    onDeleteTenant(filter: $filter) {
      id
      awsEnvName
      name
      config
      version
      createdAt
      updatedAt
    }
  }
`;
