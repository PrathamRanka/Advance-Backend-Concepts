export class SagaCoordinator {
  private operations: string[] = [];

  add(operation: string) {
    this.operations.push(operation);
  }

  getTree() {
    return this.operations;
  }
}