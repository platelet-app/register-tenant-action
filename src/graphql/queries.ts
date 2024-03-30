export const getTenantByTenantName = /* GraphQL */ `
  query GetTenantByTenantName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getTenantByTenantName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        referenceIdentifier
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        tenantAdminId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
