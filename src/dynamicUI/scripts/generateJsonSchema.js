import { writeFileSync } from "fs";
import { resolve } from "path";
import { createGenerator } from "ts-json-schema-generator";
import path from "node:path";

async function generateMinifiedJsonSchema(fullPath, typeName, outputFile) {
    const config = {
        path: fullPath,
        tsconfig: resolve(process.cwd(), "tsconfig.json"), // Ensure correct path
        type: typeName,
        expose: 'export',
        jsDoc: 'extended',
        skipTypeCheck: false,
    };

    // Generate initial schema
    const generator = createGenerator(config);
    let schema = generator.createSchema(typeName);

    // Add conditional validation logic
    addConditionalLogic(schema);

    // Save the enhanced schema
    writeFileSync(outputFile, JSON.stringify(schema, null, 2), 'utf8');
    console.log(`Enhanced schema written to ${outputFile}`);
}

// Function to add conditional logic based on component type
function addConditionalLogic(schema) {
    const componentTypes = schema.definitions.ComponentConfig.properties.type.enum;
    const conditionalLogic = componentTypes.map(type => ({
        $ref: `#/definitions/${type}Properties`
    }));

    schema.definitions.ComponentConfig.properties.properties = {
        oneOf: conditionalLogic
    };
}

// Example usage with resolved paths
generateMinifiedJsonSchema(
    resolve(process.cwd(), './src/dynamicUI/components/ComponentConfig.ts'),
    'LayoutConfig',
    resolve(process.cwd(), './src/dynamicUI/parser/schema/componentConfig.schema.json')
);
