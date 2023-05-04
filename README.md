# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





MY EXAMPLES
List of Issues by Series ID
https://comicvine.gamespot.com/api/volume/4050-5044/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&field_list=issues

https://comicvine.gamespot.com/api/volume/4050-3352/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&field_list=issues


List of Issues by Cover Date (exact Date)
https://comicvine.gamespot.com/api/issues/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&filter=cover_date:1993-07-31

List of Issues by Cover Date (date range)
https://comicvine.gamespot.com/api/issues/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&filter=cover_date:1993-07-30|1993-08-01

    List of Series by Character
https://comicvine.gamespot.com/api/volumes/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&filter=name:Doc%20Savage

https://comicvine.gamespot.com/api/search/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&resources=character&query=%22Doc%20Savage%22

Get Issue Info by ID
https://comicvine.gamespot.com/api/issue/4000-37524/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json
https://comicvine.gamespot.com/api/issue/4000-57511/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json


OTHERS
https://comicvine.gamespot.com/api/search/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&resources=volume&field_list=name&query=dead+man+logan



To find a list of volumes based on some text criteria:
This to search by series:  
https://comicvine.gamespot.com/api/volumes/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&filter=name:Secret%20Defenders

To find a set of issues based on some text criteria:
https://comicvine.gamespot.com/api/search/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json&sort=name:asc&resources=issue&query=%22Secret%20Defenders%22

To find a single issue based on an ID:
https://comicvine.gamespot.com/api/issue/4000-37524/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&format=json 




https://comicvine.gamespot.com/api/issues/?api_key=3d5a5f46a3fd926c0a82cdc9652ee7ec3570de63&limit=100&field_list=name,issue_number&filter=store_date:1984

DB BREAKDOWN
COLLECTION
- Name
- ID
    + ISSUE
        ID
        Series Name
        Comic Name
        Description
        Thumb
        ....

addCollection {
    ref.push({
        collectionName: collectionName
    })
}


addIssueCollection = issueID => {
    const ref = firebase
      .database()
      .ref(`collections/${COLLECTIONID}/${this.state.id}`);
    ref.push({ 
        issue: issueID,
        seriesName: seriesName,
        comicName: comicName,
        img: img,
        description: description
    });
  };



