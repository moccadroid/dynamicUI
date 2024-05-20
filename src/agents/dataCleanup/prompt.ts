export const generateDataCleanupPrompt = (data: any, length: number = 1000) => {


  const systemPrompt = `
    Your job is to cleanup truncated JSON data.
    For every array in the, only return a maximum of TWO representative entities of it. 
    If the data is truncated or corrupted try your best to repair it.
    It's very important that you include ALL the fields that were in the original data.
    If data appears to be missing from objects, fill it up.
    Let's think step by step to make sure you follow all the rules.
  `;

  const userPrompt = `
  // DATA
  ${JSON.stringify({ data: data }).substring(0, length)}
  `;

  return { userPrompt, systemPrompt };
};
