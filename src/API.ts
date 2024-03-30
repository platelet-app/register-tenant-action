enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}
export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};
export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};
export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelTenantFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  referenceIdentifier?: ModelStringInput | null;
  and?: Array<ModelTenantFilterInput | null> | null;
  or?: Array<ModelTenantFilterInput | null> | null;
  not?: ModelTenantFilterInput | null;
  _deleted?: ModelBooleanInput | null;
  tenantAdminId?: ModelIDInput | null;
};

export type RegisterTenantMutationVariables = {
  name?: string | null;
  emailAddress?: string | null;
  tenantName?: string | null;
};

export type GetTenantByTenantNameQueryVariables = {
  name: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelTenantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};
