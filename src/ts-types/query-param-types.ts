import { QueryKey } from "@tanstack/react-query";
import { Scalars } from "./generated";

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: Scalars['String'];
};

export type BroadcastParam = {
  limit: Scalars['Int'];
  page: Scalars['Int']
}

export type BroadcastParentDetailsParam = {
  yearLevel: Scalars['String'];
  college: Scalars['String'];
  classGroup: Scalars['String'];
}


export type GeneralQueryParam = {
  page?: Scalars["Int"];
  limit?: Scalars["Int"]
  text?: Scalars["String"];
}

export type ClassGroupParam = {
  yearGroup: Scalars['String'];
  collegeId: Scalars['String'];
}
