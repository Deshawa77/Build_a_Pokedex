export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val,
    });
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    return this.#cache.get(key);
  }

  #reap(): void {
    const expirationTime = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < expirationTime) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
