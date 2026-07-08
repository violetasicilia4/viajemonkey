import type { TripItem } from "../../types/trip";

// Placeholder for a future remote backend. The app must keep working fully
// offline without any of these ever being called. Wire a real implementation
// (e.g. Supabase) behind this same interface when a backend is introduced.

export type SyncResult = {
  ok: boolean;
  syncedCount: number;
  message?: string;
};

export async function pushLocalChanges(_items: TripItem[]): Promise<SyncResult> {
  console.info("[syncService] pushLocalChanges: no remote backend configured yet.");
  return { ok: true, syncedCount: 0, message: "No-op: local-only mode." };
}

export async function pullRemoteChanges(): Promise<TripItem[]> {
  console.info("[syncService] pullRemoteChanges: no remote backend configured yet.");
  return [];
}

export async function resolveConflicts(local: TripItem[], _remote: TripItem[]): Promise<TripItem[]> {
  console.info("[syncService] resolveConflicts: no-op, local data wins in local-only mode.");
  return local;
}

export const syncService = {
  pushLocalChanges,
  pullRemoteChanges,
  resolveConflicts
};
