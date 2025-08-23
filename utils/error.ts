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

export {
  GetPrivateEnventoryError,
  AddPrivateInventoryError,
  GetProductError,
}
