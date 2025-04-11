import { browser } from '$app/environment';

export class LocalStorage<T> {
  #key: string;
  #defaultValue: T;
  #state = $state<T>();

  constructor(key: string, defaultValue: T) {
    this.#key = key;
    this.#defaultValue = defaultValue;

    // Initialize from localStorage if in browser
    let initialValue = defaultValue;
    if (browser) {
      try {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
          initialValue = JSON.parse(stored);
        }
      } catch (e) {
        // Use default on parse error
        console.error(`Failed to save value to localStorage for key "${this.#key}":`, e);
      }
    }

    // Create reactive state
    this.#state = initialValue;
  }

  get value(): T {
    return this.#state !== undefined ? this.#state : this.#defaultValue;
  }

  set value(newValue: T) {
    if (!browser) return;

    // Update state (triggers reactivity)
    this.#state = newValue;

    // Save to localStorage
    try {
      localStorage.setItem(this.#key, JSON.stringify(newValue));
    } catch (e) {
      console.error(`Failed to save to localStorage: ${e}`);
    }
  }

  delete() {
    if (!browser) return;
    this.#state = this.#defaultValue;
    localStorage.removeItem(this.#key);
  }
}
