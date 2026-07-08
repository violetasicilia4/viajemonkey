import Dexie, { type Table } from "dexie";
import type { TripItem } from "../../types/trip";

export class MonkeyTripDatabase extends Dexie {
  tripItems!: Table<TripItem, string>;

  constructor() {
    super("monkeytrip-db");
    this.version(1).stores({
      // Primary key "id", plus indexes used for filtering by category and recency.
      tripItems: "id, type, updatedAt"
    });
  }
}

export const db = new MonkeyTripDatabase();
