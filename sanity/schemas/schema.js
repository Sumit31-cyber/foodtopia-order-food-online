// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import category from "./category";
import restaurant from "./restaurant";
import featured from "./featured";
import dish from "./dish";

// We import object and document schemas

export default createSchema({
  // We name our schema
  name: "default",
  types: schemaTypes.concat([category, restaurant, featured, dish]),
});
