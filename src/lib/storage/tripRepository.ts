import { db } from "./db";
import { initialTripData } from "../../data/initialTripData";
import type { TripItem, TripItemType } from "../../types/trip";

// This is the only module that talks to IndexedDB. Components/hooks must go
// through these functions instead of touching Dexie/localStorage directly.

function generateId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `trip-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function getAllItems(): Promise<TripItem[]> {
  return db.tripItems.toArray();
}

export async function getItemsByType(type: TripItemType): Promise<TripItem[]> {
  return db.tripItems.where("type").equals(type).toArray();
}

export async function createItem(item: Omit<TripItem, "id" | "createdAt" | "updatedAt"> & Partial<Pick<TripItem, "id">>): Promise<TripItem> {
  const now = new Date().toISOString();
  const newItem = {
    ...item,
    id: item.id ?? generateId(),
    createdAt: now,
    updatedAt: now
  } as TripItem;
  await db.tripItems.add(newItem);
  return newItem;
}

export async function updateItem(id: string, updates: Partial<Omit<TripItem, "id" | "createdAt">>): Promise<TripItem | undefined> {
  const existing = await db.tripItems.get(id);
  if (!existing) return undefined;
  const updated = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  } as TripItem;
  await db.tripItems.put(updated);
  return updated;
}

export async function deleteItem(id: string): Promise<void> {
  await db.tripItems.delete(id);
}

export async function seedInitialDataIfEmpty(): Promise<void> {
  const count = await db.tripItems.count();
  if (count === 0 && initialTripData.length > 0) {
    await db.tripItems.bulkAdd(initialTripData);
  }
}

export async function exportData(): Promise<TripItem[]> {
  return db.tripItems.toArray();
}

export async function importData(data: TripItem[]): Promise<void> {
  await db.tripItems.bulkPut(data);
}

export const tripRepository = {
  getAllItems,
  getItemsByType,
  createItem,
  updateItem,
  deleteItem,
  seedInitialDataIfEmpty,
  exportData,
  importData
};
