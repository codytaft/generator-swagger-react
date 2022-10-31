import {
  generateSchemaTypes,
  generateFetchers,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  petstore: {
    from: {
      source: "url",
      url: "https://api.swaggerhub.com/apis/CODYTAFT/PetStore/1.0.0#/",
    },
    outputDir: "src/api/",
    to: async (context) => {
      const filenamePrefix = "petstore";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
