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

export {
  GetPrivateEnventoryError,
  AddPrivateInventoryError,
}
