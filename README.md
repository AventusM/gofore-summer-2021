# Gofore summer 2021

Frontend assignment. It serves as a user interface which collects project/donation data from an external API, and allows user to allocate donations and complete projects once they meet their individual funding target. The implementation process was relatively straightforward, as doing the assignment through the text order seemed to automatically cover a hefty amount of edge cases and traps related to this project. The data had some limitations though as in order to allow 1 donor to have 1 sum multiple times, use of [uuid](https://www.npmjs.com/package/uuid) library was necessary. Additionally, a notification component was added to tell the user whether attempting to complete / allocate funds to a project was successful or not.

As the scope of the project is relatively small, there are some architecture - related things to be updated if additional requirements are required to be implemented. State management is currently done with built-in combination of useState and useContext hooks which should be replaced either by something like [redux](https://redux.js.org/), or alternatively a library such as [react-query](https://react-query.tanstack.com/) if state management is mostly handling data from external sources.

Additional improvement suggestions include, but are not limited to the following list:
- Introducing Typescript
- Unit/integration tests
- Ref - objects instead of setTimeout - function for more consistent notification visibility

## Future work ideas
The very next thing that should be implemented is probably a form for adding additional funds as the total amount is completely reliant on the API.

## Requirements

You need [node](https://nodejs.org/en/) to run this project.

## Installation

Use the package manager npm to install dependencies.

```bash
npm install
```

## Usage

The following command will run the application

```bash
npm start
```

Run eslint for static analysis with the command below
```bash
npm run lint
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Anton Moroz
