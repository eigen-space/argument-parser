[![Build Status](https://travis-ci.com/eigen-space/argument-parser.svg?branch=master)](https://travis-ci.com/eigen-space/argument-parser)

# About
 
This is a lightweight utility for parsing arguments passed to the script at running.

# Why

The main reasons why we decided to write our own parser were:
* Exclude additional dependencies.
* Add support for the list type argument.
* Get the minimum necessary functionality that meets our needs.

# How to use

```typescript
    import { ArgumentParser, ArgumentStore } from '@eigenspace/argument-parser';

    const parser = new ArgumentParser();
    const args: ArgumentStore = parser.get(process.argv.slice(2));
```

# Input arguments

| Parameter type | Type | Output | Description |
| ------ | ------ | ------ | ------ |
| $value | string | _: [$value] | Keyless values are added to a common array with key "_" |
| --$key | boolean | $key: true | A key without a value is interpreted as boolean |
| --$key=$value | string | $key: $value | Key-value pair, where the value is primitive |
| --$key[]=$value | string[] | $key: [$value] | Key-value pair, where the value is collection |

# Example

```node
 node script.js --booleanValue --param=valueWithKey valueWithoutKey --params[]=listItemValue
 
 // Output: ArgumentStore
 _: [valueWithoutKey],
 booleanValue: true,
 param: valueWithKey,
 params: [listItemValue]
```


# Why do we have that dev dependencies?

* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/helper-scripts` - used for publish package.
* `@types/*` - contains type definitions for specific library.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `husky` - used for configure git hooks.
* `jest` - testing framework to write unit specs (including snapshots).
* `lint-staged` - used for configure linters against staged git files.
* `ts-jest` - it lets you use Jest to test projects written in TypeScript.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.

# CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.