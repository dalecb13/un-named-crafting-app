class AddPrivateInventoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AddPrivateInventoryError";
  }
}

export {
  AddPrivateInventoryError,
}
