# OpenLattice React Project

This coding task was created as part of a technical interview with OpenLattice in Redwood City, CA. The goal of this project was to visualize the EDM data in a meaningful way to allow people to traverse the data, which consists of:

- PropertyTypes
- EntityTypes
- AssociationTypes

## Getting Started

Below are some simple instructions to make sure you're able to run this project.

### Prerequisites

To run this, you will need to have Nodejs installed to use npm. Once you've navigated to the folder with the project, run the action below.

```
npm i
```

This will allow your computer to download all the dependencies I use throughout the project.

### Running the Program

After downloading the project and naviating to the respective folder, run the following command:

```
npm run app
```

This will open a tab in your default browser with the `http://localhost:9000` as the address.

## Features

The entire project consists of two different sections:

- EDM
- Namespace

Below you can read more into each section and how to traverse it.

### EDM

The EDM section of this application allows the user to look at all three different EDM types. Once an EDM is selected, the user will get a dropdown of all the data points for that respective selected EDM. The filter can also be used to find a data point that the user is looking for.

Once the user clicks a data point, the **Detailed View** will display all traits of the selected data point. For EntityType and AssociationType, we have another way of traversing the data and learning about each point that makes up EDM.

- From **EntityType**, you can click on a Key or Properties to get more information on that trait that makes up the EntityType you are looking at
- From **AssociationType**, you can see the same information as EntityType, but with addtional Source and Destination data that maps to PropertyType.

Feel free to click around and learn more about the EDM!

### Namespace

All PropertyTypes and EntityTypes (including Associations) have a namespace that their data belongs to. These namespaces are essentially "bins" of datapoints that have common traits, and I believed gave more insight on the data.

As you click PropertyTypes or EntityTypes, a bar graph is created above to show which bins have a larger size, and to show the user what is overall more common within the EDM data.

Any point from the Namespace section can be clicked to bring you back to the EDM page to give you more information on said data point.

## Built With

- [React](https://reactjs.org/) - JavaScript frontend framework
- [Redux](https://redux.js.org/) - Application state
- [React-Redux](https://github.com/reduxjs/react-redux) - Ability to use Redux with React

## Author

- **Andrew Pagan**

## Acknowledgements

- Thank you to OpenLattice for giving me this chance to show how I have grown over the past few months.
