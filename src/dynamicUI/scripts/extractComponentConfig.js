const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function extractInterfaces(sourceFilePath) {
    const fileContents = fs.readFileSync(sourceFilePath, 'utf8');
    const source = ts.createSourceFile(path.basename(sourceFilePath), fileContents, ts.ScriptTarget.Latest, true);

    const interfaces = {};
    source.forEachChild(node => {
        if (ts.isInterfaceDeclaration(node)) {
            let interfaceText = node.getText(); //.replace(/\n/g, ' ');
            //interfaceText = interfaceText.replace(/\s+/g, ' ');
            interfaces[node.name.text] = interfaceText;
        }
    });
    return interfaces;
}

function writeInterfacesToFile(interfaces, outputPath) {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(interfaces, null, 2), 'utf8');
}

const inputPath = path.resolve(__dirname, '../components/ComponentConfig.ts');
const outputPath = path.resolve(__dirname, '../ai/definitions/componentConfig.json');

const interfaces = extractInterfaces(inputPath);
writeInterfacesToFile(interfaces, outputPath);
