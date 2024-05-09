const path = require("path");
const fs = require('fs');

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
    const outputFileName = path.resolve(__dirname, '../ai/definitions/code.txt');
    fs.writeFileSync(outputFileName, concatenatedContent, 'utf8');
    console.log(`Concatenated files saved: ${outputFileName}`);
}

// List of TypeScript files to process
const fileList = [
    path.resolve(__dirname, '../components/ComponentConfig.ts'),
    path.resolve(__dirname, '../components/Section.tsx'),
    path.resolve(__dirname, '../parser/ParsedComponent.tsx'),
    path.resolve(__dirname, '../parser/ParsedLayout.tsx'),
    path.resolve(__dirname, '../state/SectionDataProvider.tsx'),
    path.resolve(__dirname, '../state/PathProvider.tsx'),
    path.resolve(__dirname, '../components/data/ListComponent.tsx')
    // Add more file paths as needed
];

// Process the files
processFiles(fileList);
