import { useCallback, useEffect, useState } from "react";
import { tripRepository } from "../lib/storage/tripRepository";
import type { TripItem, TripItemType } from "../types/trip";

export function useTripItems(type?: TripItemType) {
  const [items, setItems] = useState<TripItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await tripRepository.seedInitialDataIfEmpty();
      const data = type ? await tripRepository.getItemsByType(type) : await tripRepository.getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trip items.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (item: Parameters<typeof tripRepository.createItem>[0]) => {
      const created = await tripRepository.createItem(item);
      await refresh();
      return created;
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, updates: Parameters<typeof tripRepository.updateItem>[1]) => {
      const updated = await tripRepository.updateItem(id, updates);
      await refresh();
      return updated;
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await tripRepository.deleteItem(id);
      await refresh();
    },
    [refresh]
  );

  return { items, loading, error, refresh, create, update, remove };
}
