const DB_NAME = "se4hcProposalDemoDB";
const DB_VERSION = 1;
const STORE_NAME = "proposals";

function openProposalDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("proposalCode", "proposalCode", { unique: true });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("submittedAt", "submittedAt", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, callback) {
  const db = await openProposalDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    const result = callback(store);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  }).finally(() => db.close());
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const ProposalDB = {
  async getAll() {
    const db = await openProposalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  },
  async get(id) {
    const db = await openProposalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  },
  async add(record) {
    return withStore("readwrite", (store) => store.add(record));
  },
  async put(record) {
    return withStore("readwrite", (store) => store.put(record));
  },
  async delete(id) {
    return withStore("readwrite", (store) => store.delete(id));
  },
  async nextProposalCode() {
    const all = await this.getAll();
    const max = all.reduce((highest, item) => {
      const match = String(item.proposalCode || "").match(/(\d+)$/);
      return match ? Math.max(highest, Number(match[1])) : highest;
    }, 0);
    return `SE4HC-2026-${String(max + 1).padStart(4, "0")}`;
  }
};

window.ProposalDB = ProposalDB;
