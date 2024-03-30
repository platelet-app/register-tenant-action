"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTenant = void 0;
exports.registerTenant = `
  mutation RegisterTenant(
    $name: String
    $emailAddress: String
    $tenantName: String
  ) {
    registerTenant(
      name: $name
      emailAddress: $emailAddress
      tenantName: $tenantName
    ) {
      id
      name
      referenceIdentifier
      admin {
        id
        username
        cognitoId
        tenantId
        isPrimaryAdmin
        displayName
        name
        roles
        dateOfBirth
        riderResponsibility
        disabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      tenantAdminId
      __typename
    }
  }
`;
