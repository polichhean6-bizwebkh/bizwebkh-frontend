const BASIC_DB_NAME = "se4hcBasicProposalPortalDB";
const BASIC_DB_VERSION = 1;
const BASIC_STORE = "submissions";

function openBasicDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(BASIC_DB_NAME, BASIC_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(BASIC_STORE)) {
        const store = db.createObjectStore(BASIC_STORE, { keyPath: "id" });
        store.createIndex("proposalCode", "proposalCode", { unique: true });
        store.createIndex("status", "status", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const BasicProposalDB = {
  async getAll() {
    const db = await openBasicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(BASIC_STORE, "readonly");
      const request = tx.objectStore(BASIC_STORE).getAll();
      request.onsuccess = () => resolve(request.result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  },
  async get(id) {
    const db = await openBasicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(BASIC_STORE, "readonly");
      const request = tx.objectStore(BASIC_STORE).get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  },
  async put(record) {
    const db = await openBasicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(BASIC_STORE, "readwrite");
      tx.objectStore(BASIC_STORE).put(record);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    });
  },
  async add(record) {
    const db = await openBasicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(BASIC_STORE, "readwrite");
      tx.objectStore(BASIC_STORE).add(record);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    });
  },
  async delete(id) {
    const db = await openBasicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(BASIC_STORE, "readwrite");
      tx.objectStore(BASIC_STORE).delete(id);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    });
  },
  async clearSamples() {
    const all = await this.getAll();
    await Promise.all(all.filter((item) => String(item.schoolCode || "").startsWith("BASIC-SAMPLE-")).map((item) => this.delete(item.id)));
  },
  async nextCode() {
    const all = await this.getAll();
    const max = all.reduce((highest, item) => {
      const match = String(item.proposalCode || "").match(/(\d+)$/);
      return match ? Math.max(highest, Number(match[1])) : highest;
    }, 0);
    return `SE4HC-BASIC-2026-${String(max + 1).padStart(4, "0")}`;
  }
};

window.BasicProposalDB = BasicProposalDB;
