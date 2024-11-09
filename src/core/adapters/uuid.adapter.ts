// src/adapters/UuidAdapter.js
import { v4 as uuidv4 } from "uuid";

class UuidAdapter {
  // Generates a UUID
  generate() {
    return uuidv4();
  }
}

const uuid = new UuidAdapter();
export { uuid };
