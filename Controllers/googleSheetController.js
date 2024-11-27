export default async function googleSheetController() {
  try {
    const response = await fetch(process.env.GOOGLE_SHEET_API);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
