class GetPrivateEnventoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AddPrivateInventoryError";
  }
}

class AddPrivateInventoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AddPrivateInventoryError";
  }
}

class GetProductError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GetProductError";
  }
}

class AddProductError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AddProductError";
  }
}

export {
  GetPrivateEnventoryError,
  AddPrivateInventoryError,
  GetProductError,
  AddProductError,
}
