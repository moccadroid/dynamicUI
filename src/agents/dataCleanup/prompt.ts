export const generatePrompt = (data: any, length: number = 1000) => {


  const systemPrompt = `
    Return only valid JSON.
    Compress the values of the fields { key: value } as much as possible without losing its meaning.
    For every array in the, only return a maximum of TWO representative entities of it. 
    If the data is truncated or corrupted try your best to repair it. Don't add any fields that aren't in the input data.
    Let's think step by step to make sure you follow all the rules.
  `;

  const userPrompt = `
  // DATA
  ${JSON.stringify({ data: data }).substring(0, length)}
  `;

  return { userPrompt, systemPrompt };
};
