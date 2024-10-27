# Branded Types

Explore the concept of branded types in TypeScript using the Brand module. Understand the "data-last" and "data-first" variants, and learn to create branded types with runtime validation (refined) and without checks (nominal). Discover how to use and combine branded types to enforce type safety in your code.

Branded types are TypeScript types with an added type tag that helps prevent accidental usage of a value in the wrong context. They allow us to create distinct types based on an existing underlying type, enabling type safety and better code organization.

## The Problem with TypeScript's Structural Typing

TypeScript's type system is structurally typed, meaning that two types are considered compatible if their members are compatible. This can lead to situations where values of the same underlying type are used interchangeably, even when they represent different concepts or have different meanings.

Example:

```ts
type UserId = number;
type ProductId = number;

const getUserById = (id: UserId) => {
  // Logic to retrieve user
};

const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

const id: UserId = 1;
getProductById(id); // No type error, but this is incorrect usage
```

## How Branded Types Help

Branded types allow you to create distinct types from the same underlying type by adding a unique type tag, enforcing proper usage at compile-time.

Branding is accomplished by adding a symbolic identifier that distinguishes one type from another at the type level.

Example:

```ts
const BrandTypeId: unique symbol = Symbol.for("effect/Brand");

type ProductId = number & {
  readonly [BrandTypeId]: {
    readonly ProductId: "ProductId"; // unique identifier for ProductId
  };
};
```

Attempting to use a `UserId` in place of a `ProductId` results in an error:

```ts
const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

type UserId = number;

const id: UserId = 1;
getProductById(id); // Error: number cannot be used in place of ProductId
```

## Generalizing Branded Types

To enhance the versatility and reusability of branded types, they can be generalized using a standardized approach:

```ts
const BrandTypeId: unique symbol = Symbol.for("effect/Brand");

interface Brand<in out ID extends string | symbol> {
  readonly [BrandTypeId]: {
    readonly [id in ID]: ID;
  };
}

type ProductId = number & Brand<"ProductId">;
type UserId = number & Brand<"UserId">;
```

Utilizing the `Brand` interface from the Brand module:

```ts
import { Brand } from "effect";

type ProductId = number & Brand.Brand<"ProductId">;
type UserId = number & Brand.Brand<"UserId">;
```

Creating instances of these types directly leads to an error:

```ts
const id: ProductId = 1; // Error: Type 'number' is not assignable to type 'ProductId'
```

## Constructing Branded Types

The Brand module offers two core functions for constructing branded types: `nominal` and `refined`.

### nominal

The `nominal` function defines branded types that do not require runtime validations. It adds a type tag to the underlying type.

Example:

```ts
import { Brand } from "effect";

type UserId = number & Brand.Brand<"UserId">;
const UserId = Brand.nominal<UserId>();

const getUserById = (id: UserId) => {
  // Logic to retrieve user
};

type ProductId = number & Brand.Brand<"ProductId">;
const ProductId = Brand.nominal<ProductId>();

const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

// Correct usage
getProductById(ProductId(1));

// Incorrect usage
getProductById(1); // Error
getProductById(UserId(1)); // Error
```

### refined

The `refined` function creates branded types that include data validation. It requires a refinement predicate to check the validity of input data.

Example:

```ts
import { Brand } from "effect";

type Int = number & Brand.Brand<"Int">;

const Int = Brand.refined<Int>(
  (n) => Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`)
);

// Correct usage
const x: Int = Int(3);
console.log(x); // Output: 3

// Incorrect usage
const y: Int = Int(3.14); // throws error
```

## Combining Branded Types

The Brand module provides the `all` API to combine multiple branded types together:

```ts
import { Brand } from "effect";

type Int = number & Brand.Brand<"Int">;

const Int = Brand.refined<Int>(
  (n) => Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`)
);

type Positive = number & Brand.Brand<"Positive">;

const Positive = Brand.refined<Positive>(
  (n) => n > 0,
  (n) => Brand.error(`Expected ${n} to be positive`)
);

// Combine Int and Positive into PositiveInt
const PositiveInt = Brand.all(Int, Positive);
type PositiveInt = Brand.Brand.FromConstructor<typeof PositiveInt>;

// Valid positive integer
const good: PositiveInt = PositiveInt(10);

// Invalid cases
const bad1: PositiveInt = PositiveInt(-5); // throws error
const bad2: PositiveInt = PositiveInt(3.14); // throws error
```