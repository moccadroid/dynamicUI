# DynamicUI
This is a demo project to show what can be achieved when using LLMs to generate UIs.
It was done in about a week and thus is by no means ready for any form of production!!

> [!CAUTION]
> You should not be using this... but if you want to play around with it, read on...

## Getting Started

Clone the repository to your local machine and then run:

```bash
npm run install && npm run dev
```

This is currently not connected to openai, so we first need to add our API key to `.env.local` like this:
```
OPENAI_API_KEY=<your openai api key goes here>
```

### Now we're ready to create stuff!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the editor.
This is the DynamicUI editor, where you create layouts from json data.

Click on `Sidebar` in the top right corner.

### Your collection
Here you can save your work. This includes the json data, and the generated layout. 

### Your prompt
Like with any other LLM, you can talk to it, and request layout changes.

`prompt: Visualize the data, and make all fields editable`

This will instruct the LLM to visualize the data as well as possible, and set up a form handler
that makes all fields (if possible) editable.
The results vary, because the LLM decides on its own what and how to visualize it. You can request specific things like:

`prompt: Include all login information`
`prompt: Move the profile image to the right of the text`

To see the demo data, click on "Open Data".

### DataViewer

Here you see your loaded data, change it, and it will reflect in the layout.
Obviously if you change the structure of the data (keys and objects), you will have to generate a new layout.

### LayoutViewer

Clicking on "Open Layout" will show you the LLM generated layout for your current data.
Sometimes the LLM gets things wrong, so the editor uses the JSON schema for our components,
to highlight any errors that might have happened. 
You can change anything here, as long as it creates a valid layout.

### Validations

This is a bit of an experimental (whoop whoop) feature, that allows to create yup validations for the formik handler around input components.
Play around with it, it might work, or sometimes it doesn't. More work on agent behavior is needed here.

### Undo / Redo

"Go Back", and "Go Forward" skip through the changes you've made.

### Component Selection

Here you can select which components the LLM has to create a UI. Deselecting components should preclude them from being used in the layout.
(might not work currently!) :D

### Fetch Data

To make it easier to plug data in (you can also just copy/paste your data into the editor),
you can paste a JSON API url here, and have dynamicUI figure out the data for you.
It will read until maxCharacters and then try to cleanup the data so we still work with a valid JSON.
You might want to play with maxCharacters a bit, depending on your endpoint.

### Debug Mode

Toggle this on, to hover over your layout elements, and be able to see the individual layouts of the components.
Clicking on the "Layout" button when hovering, will display the layout of this particular component for debugging purposes.

## Try it yourself

If you check [the demo pages](https://github.com/moccadroid/dynamicUI/tree/main/src/app/demo) in the app folder you can see it in action.
Here's a quick rundown of the basics.

To render a layout from data, all you need are 3 things:

#### Layout.json
Copy this from the layout editor when you're happy with the layout

#### Data.json
This is your data. It can come via an API call, or just be a hardcoded .json file

#### Section
Assuming you have the above, just plug them into a `<Section />` component and it will handle all the rest.
```jsx
  <Section layout={layout as LayoutConfig} data={data} />
```
You can use `Section` anywhere in your code. 
So you could write your own custom layouts, and just use `Section` for certain views, 
or create everything with `Section` and only use custom code in certain instances.
Match and choose however you like :) 


