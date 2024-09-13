![Advanced React & GraphQL](https://advancedreact.com/images/ARG/arg-facebook-share.png)

# Advanced React & GraphQL

This is course is being completed as professional development in order to increase my skills in:

- Next.js -> Frontend development
- GraphQL -> Data fetching & transmutation
- Component Testing
- Documentation / Technical Writing

## Starting Application

This application must use Node version 16. In order to run this app utilize nvm and switch to node version 16 or the app will display an SSL error and will not build

- nvm install @16
- nvm use 16
- npm run dev

## Writing Topics

I will track and research different topics or scenarios I encounter in this section and elaborate upon them as well as my solution below.

### Keystone

- Research and write out what Keystone is and how it is used
- breakdown the Keystone.ts file in the backend directory
- docs: https://keystonejs.com/docs/config/config

### Apollo Links

- Research and write out what Links are in Apollo and how they apply to this project
- docs: https://www.apollographql.com/docs/react/api/link/introduction/

### the `<fieldset/>` html element

- research and write out what this element is common used for
- show how it's used in this project
- docs:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset

### dynamic page rendering in Next.js

- research and write out the details behind dynamic page routing/rendering
- show how it's used in this project
- docs: https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

### Next/head for SOE injection

- research the package and write out how it's used in software development
- show how it's used in this project
- docs: https://nextjs.org/docs/pages/api-reference/components/head

### The `confirm()` method

- research and write out an explanation for the `confirm` method and how it is used
- show how it's used in this project and how it is different from a modal or dialog
- docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm

### Apollo Client hooks and their attributes

- research and write out an explanation for each hook is used
  - UseQuery
  - UseMutation
  - UseLazyQuery
- break down the different capabilities of th method like =>
  - the `update` callback
  - the `enabled` attribute
  - the `data` attribute
  - renaming return data via "aliases"
- use examples from the project to showcase useQuery and UseMutation hooks definition and utilization
- docs:
  - queries => https://www.apollographql.com/docs/react/data/queries/
  - mutations => https://www.apollographql.com/docs/react/data/mutations

### React Transition group package

- research and write an explanation for the animation package
- break down difference between using CSS traditional transitions and this package
- use examples from the project: sickfits\frontend\components\CartCount.js
- documentation: https://reactcommunity.org/react-transition-group/

### React Testing Library && Jest Package

- research and write an explanation for the Testing library and Framework
- breakdown the types of testing used in project:
  -- Component testing,
  -- Snapshot testing,
  -- Testing GraphQl queries
  -- Mocking Data
  -- Mocking #rd parties
- skipping tests it.only, fit, xit
  -- explain these terms or keywords and how they are helpful to testing flow
