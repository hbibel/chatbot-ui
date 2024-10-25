# Notes on Architecture, Principles and Code Style

## Component Library

`app/components/lib/` is a component library similar to many others because I
didn't want to settle on one as of now.

## Server State vs Client State

In accordance with Remix' recommendations, state that is persisted on the
server should not be replicated in the client's state without good reason.

Examples:

- A list of attached documents per chat is persisted on the server after
  upload. This data must be loaded from the loader function. If we have a
  requirement that each filename should be unique, we should show the user an
  error message before they try to upload a file with the same name again.
  This can be achieved by loading the already existing file names in the loader
  function.
