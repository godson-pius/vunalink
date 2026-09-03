import type { DiagnosisRecord } from "./types";

const DATABASE_NAME = "vunalink";
const STORE_NAME = "diagnoses";
const DATABASE_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDiagnosis(record: DiagnosisRecord): Promise<void> {
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  database.close();
}

export async function getDiagnoses(): Promise<DiagnosisRecord[]> {
  const database = await openDatabase();
  const records = await new Promise<DiagnosisRecord[]>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve((request.result as DiagnosisRecord[]).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    request.onerror = () => reject(request.error);
  });
  database.close();
  return records;
}

export async function clearDiagnoses(): Promise<void> {
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  database.close();
}
