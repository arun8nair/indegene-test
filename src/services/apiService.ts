import {
  BASE_URL,
  RAW_DATA_URL,
  APPLICATIONS_URL,
  RESOURCES_URL,
} from "./config";

export const fetchRawData = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${RAW_DATA_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching raw data:", error);
    throw error;
  }
};

export const fetchApplications = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${APPLICATIONS_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching applications data:", error);
    throw error;
  }
};

export const fetchApplicationItem = async (item: String): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${APPLICATIONS_URL}/${item}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching application item data:", error);
    throw error;
  }
};

export const fetchResources = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${RESOURCES_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resources data:", error);
    throw error;
  }
};

export const fetchResourceItem = async (item: String): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${RESOURCES_URL}/${item}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resource item data:", error);
    throw error;
  }
};
