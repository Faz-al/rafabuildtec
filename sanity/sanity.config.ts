import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "RafaBuildTec",

  projectId: "ltqgehuq",
  dataset: "production",

  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
