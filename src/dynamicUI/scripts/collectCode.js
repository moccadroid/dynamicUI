import path from 'path';
import fs from 'fs';

function processContent(content) {
    // Remove import statements using regex
    let processedContent = content.replace(/^import.*?;/gm, '');
    // Remove empty lines
    processedContent = processedContent.replace(/^\s*[\r\n]/gm, '');
    return processedContent;
}

// Function to process TypeScript files
function processFiles(fileList) {
    let concatenatedContent = '';

    fileList.forEach(file => {
        // Extract filename without path
        const fileName = path.basename(file);
        // Read file content
        const fileContent = fs.readFileSync(file, 'utf8');
        // Remove imports from file content
        const contentWithoutImports = processContent(fileContent);
        // Add file name as comment
        concatenatedContent += `// File: ${fileName}\n\n${contentWithoutImports}\n\n`;
    });

    // Write concatenated content to new file
    const outputFileName = path.resolve(process.cwd(), './src/dynamicUI/ai/definitions/code.txt');
    fs.writeFileSync(outputFileName, concatenatedContent, 'utf8');
    console.log(`Concatenated files saved: ${outputFileName}`);
}

// List of TypeScript files to process
const fileList = [
    path.resolve(process.cwd(), './src/dynamicUI/components/ComponentConfig.ts'),
    path.resolve(process.cwd(), './src/dynamicUI/components/Section.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/parser/ParsedComponent.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/parser/ParsedLayout.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/state/SectionDataProvider.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/state/PathProvider.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/components/data/ListComponent.tsx'),
    path.resolve(process.cwd(), './src/dynamicUI/parser/validation/dictionary.ts')
    // Add more file paths as needed
];

// Process the files
processFiles(fileList);
